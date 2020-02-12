import React from 'react'
import styled, { keyframes } from 'styled-components'
import { CalendarIcon, VectorBack, VectorNext } from 'Comp/Break/NewTable/Svg'
import { AllBreak } from 'Comp/Break/NewTable/All'

function addZero(n) {
    return String("00" + n).slice(-2);
}

const isDateMonth = {
    '1': 'Января',
    '2': 'Февраля',
    '3': 'Марта',
    '4': 'Апреля',
    '5': 'Мая',
    '6': 'Июня',
    '7': 'Июля',
    '8': 'Августа',
    '9': 'Сентября',
    '10': 'Октября',
    '11': 'Ноября',
    '12': 'Декабря',
}

class NewTableBreak extends React.Component{

    state = {
        date: new Date(),
        activeTab: 0,
    }

    onChangeTab = (id) => () => this.setState({ activeTab: id })

    onNextDate = () => {
        const { date } = this.state
        let newDate = +date + 86400000
        this.setState({ date: new Date(newDate) })
    }

    onPrevDate = () => {
        const { date } = this.state
        let newDate = +date - 86400000
        this.setState({ date: new Date(newDate) })
    }

    render () {
        const { drawer } = this.props
        const { date, activeTab } = this.state
        let dateToCalendarDate = [addZero(date.getDate()), isDateMonth[date.getMonth()+1], date.getFullYear()]
        return (
            <Root drawer={drawer}>
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
                    {!Boolean(activeTab) && <AllBreak />}
                </DivBody>
            </Root>
        )
    }
}

export default NewTableBreak

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