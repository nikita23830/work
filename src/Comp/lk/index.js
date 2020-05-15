import React from 'react'
import styled, {keyframes} from 'styled-components'
import { Avatar, Grid, Input, InputAdornment, Tabs, Tab } from '@material-ui/core'
import { AttachMoney, FindReplace } from '@material-ui/icons'
import { ChangeBalance, LeftArrow, RightArrow, Ellipse } from 'Comp/lk/svg'
import { Donut } from 'Comp/lk/donut'
import { SocketConsumer } from 'ContextSocket'
import { Link } from 'react-router-dom'

class Lk extends React.Component {

    state = {
        param: {
            AHT: {
                name: 'AHT',
                text: '6:15',
                proc: 75,
                color: '#2285EE'
            },
            wiretap: {
                name: 'Прослушка',
                text: '80%',
                proc: 80,
                color: '#FFBE18'
            },
            mistake: {
                name: 'Притензии',
                text: '0',
                proc: 100,
                color: '#FF1818'
            }
        },
        diag: undefined,
        manager: '',
        dataDiag: [{color: '#EBEEF1', title: '', value: 100 }],
        date: new Date,
        balanceMiniHistory: [],
    }

    onViewDiag = (id) => () => {
        const { param } = this.state
        this.setState({ 
            diag: param[id], 
            dataDiag: [
                {color: param[id].color, title: '', value: param[id].proc },
                {color: '#EBEEF1', title: '', value: 100-param[id].proc },
            ] 
        })
    }

    onLeaveDiag = () => {
        this.setState({ diag: undefined, dataDiag: [{color: '#EBEEF1', title: '', value: 100 }] })
    }

    componentDidMount = async () => {
        const { socket } = this.context
        socket.emit('getMyManager', '')
        socket.emit('getBalance', '')
        await socket.on('getMyManager', (data) => {
            let link = `user/${data.id}`
            this.setState({ manager: data.empty ? '-' : <Link to={link}>{data.name}</Link> })
        })
        await socket.on('getBalance', (data) => {
            let balanceMiniHistory = []
            data.map(i => {
                balanceMiniHistory.push({
                    action: i.replenish ? 'replenish' : 'debiting',
                    author: `${i.name} ${i.surname}`,
                    reason: i.reason,
                    sum: i.shift
                })             
            })
            this.setState({ balanceMiniHistory: balanceMiniHistory })
        })
    }

    render () {
        const { drawer, level, people_name } = this.props
        const { param, diag, dataDiag, manager, date, balanceMiniHistory } = this.state
        let bdate = new Date(level.bdate)
        const headAttr = [
            {name: 'Дата рождения', attr: `${addZero(bdate.getDate())}.${addZero(bdate.getMonth()+1)}.${bdate.getFullYear()}`}, 
            {name: 'Отдел', attr: level.dept_name}, 
            {name: 'Руководитель', attr: manager }, 
            {name: 'Telegram', attr: level.telegram ? `@${level.telegram}` : 'Не указан'}
        ]
        let newPrevDate = date.getMonth() === 0 ? [date.getFullYear()-1,11,1] : [date.getFullYear(),date.getMonth()-1,1]
        let newNextDate = date.getMonth() === 11 ? [date.getFullYear()+1,0,1] : [date.getFullYear(),date.getMonth()+1,1]
        const monthList = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        return (
            <>
                <Head drawer={drawer}>
                    <Face>{people_name[1][0]}{people_name[0][0]}</Face>
                    <HeadName>{people_name[1]} {people_name[0]}</HeadName>
                    <HeadInfo container spacing={2}>
                        {headAttr.map(i => ( <Grid item xs={12} sm={12}><TitleG>{i.name}</TitleG><TextG>{i.attr}</TextG></Grid> ))}
                    </HeadInfo>
                </Head>
                <Balance>
                    <BAvatar><AttachMoney color='primary'/></BAvatar>
                    <BTitle>Баланс</BTitle>
                    <BCount>{level.balance} баллов</BCount>
                </Balance>
                <BHistory container spacing={1}>
                    {balanceMiniHistory.map(i => (
                        <BHistoryItem item xs={12} sm={12}>
                            <BHItemLogo><ChangeBalance /></BHItemLogo>
                            <BHItemTitle>{i.author}</BHItemTitle>
                            <BHItemReason>{i.reason}</BHItemReason>
                            <BHItemSum>{i.action === 'replenish' ? '+' : '-'} {i.sum},<BHItemSumDop>00</BHItemSumDop></BHItemSum>
                            <BHItemAction col={i.action === 'replenish' ? 1 : 0}>{i.action === 'replenish' ? 'Пополнение' : 'Списание'}</BHItemAction>
                        </BHistoryItem>
                    ))}
                </BHistory>
                <Main drawer={drawer}>
                    <Search>
                        <Navig>
                            <div onClick={() => this.setState({ date: new Date(newPrevDate[0],newPrevDate[1],newPrevDate[2]) })}><LeftArrow av={true} /></div>
                            <p>{monthList[date.getMonth()]} {date.getFullYear()}</p>
                            <div onClick={() => this.setState({ date: new Date(newNextDate[0],newNextDate[1],newNextDate[2]) })}><RightArrow av={true} /></div>
                        </Navig>
                        <SearchString
                            endAdornment={<InputAdornment position="end"><FindReplace /></InputAdornment>}
                            placeholder='Найдите любые события и операции'
                        />
                    </Search>
                    <CTabs value={0} indicatorColor="primary" textColor="primary">
                        <CTab label="Показатели" />
                    </CTabs>
                    <CardList>
                        {Object.keys(param).map(i => (
                            <Cards onMouseEnter={this.onViewDiag(i)} onMouseLeave={this.onLeaveDiag} color={param[i].color}>
                                <Ellipse color={param[i].color} />
                                <CardsTitle>{param[i].name}</CardsTitle>
                                <CardsParam>{param[i].text}</CardsParam>
                                <CardsProc>{param[i].proc}%</CardsProc>
                            </Cards>
                        ))}
                    </CardList>
                    <CustomDonut>
                        <Donut dataDiag={dataDiag} diag={diag} />
                    </CustomDonut>
                </Main>
            </>
        )
    }
}

function addZero(n) {
    return String("00" + n).slice(-2);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

const CustomDonut = styled.span` && {
    position: absolute;
    width: 165px;
    max-width: 165px;
    height: 165px;
    max-height: 165px;
    right: 24px;
    top: 120px;
}`

const CardsProc = styled.span`{
    height: 20px;
    margin: 8px 16px 8px 4px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #B7C2CE;
}`

const CardsParam = styled.span`{
    height: 20px;
    margin: 8px 4px 8px 4px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const CardsTitle = styled.span`{
    height: 20px;
    margin: 8px 4px 8px 4px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const Cards = styled.span`{
    position: relative;
    margin: 2px;
    border: 1px solid #EBEEF1;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    height: 36px;
    cursor: pointer;
    background: #fff;
    user-select: none;
} :hover {
    background: rgba(${p=>hexToRgb(p.color)},0.2)
}`

const CardList = styled.span` && {
    position: absolute;
    top: 114px;
    left: 22px;
    max-width: calc(100% - 235px);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}`

const CTabs = styled(Tabs)` && {
    width: 100%;
    height: 40px;
    position: absolute;
    top: 58px;
    left: 0px;
}`

const CTab = styled(Tab)` && {
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #1D3F66;
    text-transform: none;
}`

const SearchString = styled(Input)` && {
    position: absolute;
    left: 184px;
    top: 0px;
    height: 44px;
    width: calc(100% - 194px);
} &&.MuiInput-underline:before {
    border: 0px;
} &&.MuiInput-underline:hover:not(.Mui-disabled):before {
    border: 0px;
}`

const Navig = styled.span`{
    position: absolute;
    width: 160px;
    height: 24px;
    left: 12px;
    top: 10px;
    background: #FFFFFF;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: Manrope3;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 14px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    user-select: none;
}`

const Search = styled.span`{
    position: absolute;
    width: calc(100% - 16px);
    height: 44px;
    left: 8px;
    top: 8px;
    background: #F0F4F7;
    border-radius: 4px;
}`

const openDrawerMain = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 512}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 700}px;
  }
`;

const closeDrawerMain = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 700}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 512}px;
  }
`;

const Main = styled.div`{
    position: absolute;
    animation: ${p=>p.drawer ? openDrawerMain : closeDrawerMain} 0.2s linear both;
    height: ${document.documentElement.clientHeight - 272}px;
    right: 424px;
    top: 256px;
    background: #FFFFFF;
    border-radius: 4px;
}`

const BHItemAction = styled.span`{
    position: absolute;
    width: 75px;
    height: 17px;
    right: 12px;
    top: 37px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.col ? '#00B54E' : '#F24646'};
}`

const BHItemSum = styled.span`{
    position: absolute;
    max-width: 69px;
    height: 19px;
    left: 315px;
    top: 18px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #000000;
}`

const BHItemSumDop = styled.span`{
    color: #99A9BA;
}`

const BHItemReason = styled.span`{
    position: absolute;
    max-width: 211px;
    height: 19px;
    left: 77px;
    top: 35px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`

const BHItemTitle = styled.span`{
    position: absolute;
    width: 200px;
    height: 17px;
    left: 77px;
    top: 18px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
}`

const BHItemLogo = styled(Avatar)` && {
    position: absolute;
    width: 44px;
    height: 44px;
    left: 22px;
    top: 14px;
    background: #EBEEF1;
}`

const BHistoryItem = styled(Grid)` && {
    border-top: 1px solid #EBEEF1;
    height: 70px;
    position: relative;
}`

const BHistory = styled(Grid)` && {
    position: absolute;
    width: 396px;
    max-height: ${document.documentElement.clientHeight - 366}px;
    right: 20px;
    top: 350px;
    background: #FFFFFF;
    border-radius: 4px;
    overflow-y: auto;
}`

const BCount = styled.span`{
    position: absolute;
    max-width: 306px;
    height: 25px;
    left: 78px;
    top: 41px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
}`

const BTitle = styled.span` {
    position: absolute;
    width: 65px;
    height: 25px;
    left: 78px;
    top: 16px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
}`

const BAvatar = styled(Avatar)` && {
    position: absolute;
    width: 44px;
    height: 44px;
    left: 22px;
    top: 19px;
    background: #fff;
}`

const Balance = styled.div`{
    position: absolute;
    width: 396px;
    height: 82px;
    right: 16px;
    top: 256px;
    background: #2285EE;
    border-radius: 4px;
}`

const HeadName = styled.span`{
    position: absolute;
    top: 13px;
    left: 168px;
    width: 348px;
    height: 33px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    text-align: left;
}`

const TextG = styled.span`{
    max-width: ${document.documentElement.clientWidth-579}px;
    height: 20px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const TitleG = styled.span`{
    max-width: 111px;
    height: 20px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
    margin-right: 5px;
}`

const HeadInfo = styled(Grid)` && {
    position: absolute;
    top: 54px;
    left: 176px;
    width: ${document.documentElement.clientWidth - 460}px;
    text-align: left;
} &&.MuiGrid-spacing-xs-2 > .MuiGrid-item{
    padding: 0px;
}`

const openDrawerHead = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 104}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 292}px;
  }
`;

const closeDrawerHead = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 292}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 104}px;
  }
`;

const Head = styled.div`{
    position: absolute;
    animation: ${p=>p.drawer ? openDrawerHead : closeDrawerHead} 0.2s linear both;
    height: 164px;
    top: 80px;
    right: 16px;
    background: #fff;
}`

const Face = styled(Avatar)` && {
    position: absolute;
    width: 124px;
    height: 124px;
    top: 20px;
    left: 24px;
    font-size: 4.25rem;
    background: #2285EE;
    color: #fff;
}`

Lk.contextType = SocketConsumer;
export default Lk