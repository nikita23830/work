import React from 'react'
import styled, { keyframes } from 'styled-components'
import { CalendarIcon, VectorBack, VectorNext } from 'Comp/Break/NewTable/Svg'
import { AllBreak } from 'Comp/Break/NewTable/All'
import { SocketConsumer } from 'ContextSocket/index'
import { setTable, TIMING, isDateMonth, addZero } from 'Comp/Break/NewTable/tools'
import { Circle1, Circle2, Circle3, Circle4 } from 'Comp/NewNews/svg'
import { ModalBreak } from 'Comp/Break/NewTable/Modal'
import { withSnackbar } from 'notistack';
import MyBreak from 'Comp/Break/NewTable/MyBreak'

class NewTableBreak extends React.PureComponent{

    state = {
        date: new Date(),
        activeTab: 0,
        loader: true,
        table: {},
        variantTime: 2,
        modalTime: false,
        tempTime: '',
        blockedTime: 0, // 0 -ничего не блочим, 1 - блочим 15 минут, 2 - блочим 10 минут и 15 минут,
        myBreak: []
    }

    onChangeTab = (id) => () => this.setState({ activeTab: id })

    onNextDate = () => {
        const { date } = this.state
        const { socket } = this.context
        let newDate = +date + 86400000
        socket.emit('updateTable', newDate)
        this.setState({ date: new Date(newDate), loader: true })
    }

    onPrevDate = () => {
        const { date } = this.state
        const { socket } = this.context
        let newDate = +date - 86400000
        socket.emit('updateTable', newDate)
        this.setState({ date: new Date(newDate), loader: true })
    }

    onChangeModal = () => this.setState({ modalTime: !this.state.modalTime })

    onChangeVariantTime = (i) => () => this.setState({ variantTime: i })

    onClickedTime = (id) => () => {
        const { table } = this.state
        let index = TIMING.filter(i => i[3] === id)[0][0] // ID timing
        let count = [table[TIMING[index+1][3]].key, table[TIMING[index+2][3]].key].filter(i=>i>0)
        let variantTime = 2 - count.length
        this.setState({ modalTime: true, tempTime: id, blockedTime: count.length, variantTime: variantTime })
    }

    onSendMyBreak = () => {
        const { socket } = this.context
        const { tempTime, variantTime, date } = this.state
        socket.emit('SetInTableBreak', { type: variantTime+1 , set: tempTime, date: +date })
        this.setState({ modalTime: false, loader: true })
    }

    componentDidMount = async () => {
        const { enqueueSnackbar, people_id } = this.props
        const { socket } = this.context
        await socket.emit('updateTable', undefined)
        socket.on('updateTable', (data) => {
            let table = setTable(data, people_id)
            let temp_my = Object.keys(table).filter(i => table[i].key === 1) // выделили ячейки в которых есть мои перерывы
            temp_my = temp_my.map(i => {
                let t_return = table[i].data.filter(j => j.people_id == people_id)
                return t_return[0]
            }) // получили массив именно моих перерывов
            let my = [] 
            let temp_id = 0
            temp_my.forEach(i => {
                switch (i.start_end) {
                    case 1: { my[temp_id] = { ids: [i.id], timing: [i.timing_id] }; return 0; }
                    case 0: { my[temp_id].ids.push(i.id); my[temp_id].timing.push(i.timing_id); return 0; }
                    case 2: { my[temp_id].ids.push(i.id); my[temp_id].timing.push(i.timing_id); temp_id = temp_id + 1; return 0; }
                    case 3: { my[temp_id] = { ids: [i.id], timing: [i.timing_id] }; temp_id = temp_id + 1; return 0; }
                }
            }) // немного преобразовали для удобства
            this.setState({ table: table, loader: false, myBreak: my })
        })
        socket.on('send_error', (data) => {
            if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {
              variant: data.name,
              autoHideDuration: 6000,
              preventDuplicate: true
            })
            else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000,preventDuplicate: true})
            this.setState({ loader: false })
        })
    }

    render () {
        const { drawer } = this.props
        const { date, activeTab, table, loader, variantTime, modalTime, blockedTime, myBreak } = this.state
        let dateToCalendarDate = [addZero(date.getDate()), isDateMonth[date.getMonth()+1], date.getFullYear()]
        return (
            <Root drawer={drawer}>
                {loader && <Loader><Circle1 /><Circle2 /><Circle3 /><Circle4 /></Loader>}
                <ModalBreak 
                    time={variantTime}
                    onChange={this.onChangeVariantTime} 
                    modalTime={modalTime} 
                    onChangeModal={this.onChangeModal}
                    blockedTime={blockedTime}
                    onSendMyBreak={this.onSendMyBreak}
                />
                <DivHead>
                    <Calendar><CalendarIcon /></Calendar>
                    <CalendarText>
                        <VectorBackClicked onClick={this.onPrevDate}>
                            <VectorBack />
                        </VectorBackClicked>
                        <CalendarDate>
                            {dateToCalendarDate[0]} {dateToCalendarDate[1]} {dateToCalendarDate[2]}
                        </CalendarDate>
                        <VectorNextClicked onClick={this.onNextDate}>
                            <VectorNext />
                        </VectorNextClicked>
                        <AllTab active={activeTab === 0} onClick={this.onChangeTab(0)}>Все</AllTab>
                        <MyTab active={activeTab === 1} onClick={this.onChangeTab(1)}>Мои перерывы</MyTab>
                    </CalendarText>
                </DivHead>
                <DivBody>
                    {!Boolean(activeTab) && !loader && <AllBreak table={table} onClickedTime={this.onClickedTime} />}
                    {activeTab === 1 && !loader && <MyBreak myBreak={myBreak} date={date}/>}
                </DivBody>
            </Root>
        )
    }
}

NewTableBreak.contextType = SocketConsumer;
export default withSnackbar(NewTableBreak)

const animation = keyframes`
  0% {
    transform: rotate(0)
  }
  50% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const Loader = styled.div`{
    position: absolute;
    width: 96px;
    height: 96px;
    top: 50%;
    left: 50%;
    animation: ${animation} 3s linear infinite;
    z-index: 10
  }`

const MyTab = styled.span`{
    position: absolute;
    width: 156px;
    height: 62px;
    left: 303px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.active ? '#2285EE' : '#9A9BAE'};
    border-bottom: ${p=>p.active ? 2 : 0}px solid #2285EE;
    cursor: pointer;
}`

const AllTab = styled.span`{
    position: absolute;
    width: 74px;
    height: 62px;
    left: 228px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.active ? '#2285EE' : '#9A9BAE'};
    border-bottom: ${p=>p.active ? 2 : 0}px solid #2285EE;
    cursor: pointer;
}`;

const VectorNextClicked = styled.span`{
    position: absolute;
    width: 24px;
    height: 24px;
    left: 178px;
    top: 20px;
    cursor: pointer;
}`

const VectorBackClicked = styled.span`{
    position: absolute;
    width: 24px;
    height: 24px;
    left: 24px;
    top: 20px;
    cursor: pointer;
}`

const CalendarDate = styled.span`{
    position: absolute;
width: 122px;
height: 19px;
left: 52px;
top: 22px;
font-family: Manrope3;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 19px;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #99A9BA;
text-align: center;
}`

const CalendarText = styled.span`{
    position: absolute;
    top: 0px;
    left: 64px;
    width: 226px;
    height: 64px;
    border-right: 1px solid #E9F3FD;\
    user-select: none;
}`

const Calendar = styled.span`{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 63px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #E9F3FD;
    cursor: pointer;
}`

const DivBody = styled.div`{
    position: absolute;
    left: 0px;
    top: 64px;
    width: 100%;
    height: ${document.documentElement.clientHeight - 129}px;
    background: #F0F4F7;
}`

const DivHead = styled.div`{
    position: absolute;
    width: 100%;
    height: 64px;
    left: 0;
    top: 0px;
    background: #FFFFFF;
}`

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 70}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 260}px;
  }
`;

const closeDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 260}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 70}px;
  }
`;

const Root = styled.div`{
    position: absolute;
    top: 65px;
    right: 0px;
    height: ${document.documentElement.clientHeight - 65}px;
    animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
}`