import React from 'react'
import styled from 'styled-components'
import { Grid, Tooltip, IconButton } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Delete, Cancel, Done } from '@material-ui/icons';
import { SocketConsumer } from 'ContextSocket/index'
import { TIMING, addZero } from 'Comp/Break/NewTable/tools'
import { NotFountExchange } from 'Comp/Break/NewTable/Svg'

class ExchangeBreak extends React.PureComponent {

    state = {
        sender: [],
        receiver: [],
        people: {},
        timing: {}
    }

    async componentDidMount() {
        const { socket } = this.context
        socket.emit('getExchange', {})
        socket.on('getExchange', (data) => {
            if (data.empty) return 0;
            let newTiming = {}
            let newPeople = {}
            data.timing.map(i => newTiming[i.id] = i.timing_id )
            data.people.map(i => newPeople[i.id] = {name: i.name, surname: i.surname})
            this.setState({ sender: data.sender, receiver: data.receiver, people: newPeople, timing: newTiming })
            console.log(data.sender, newTiming)
        })
    }

    render() {
        const statusItem = { 0: {
                color: '#F57920',
                text: 'Без ответа',
                fullText: 'На данный запрос еще не получен на сервер ответ.'
            }, 1: {
                color: '#09932F',
                text: 'Одобрено',
                fullText: 'На данный запрос на сервер получен положительный ответ.'
            }, 2: {
                color: '#CA000C',
                text: 'Отклонено',
                fullText: 'На данный запрос на сервер получен отрицательный ответ.'
            }, 3: {
                color: '#CA000C',
                text: 'Отозвано',
                fullText: 'Данный запрос был отозван отправителем/администрацией.'
        } }
        const { onChangeTab } = this.props
        const { receiver, timing, people, sender } = this.state
        console.log(sender, timing)
        return (
            <>
                <InQuest>
                    <Title>Входящие запросы</Title>
                    <MuiThemeProvider theme={theme}>
                    {!Boolean(receiver.length) && <NotFound><NFText>Новых заявок не найдено</NFText><NotFountExchange /></NotFound>}
                    {Boolean(receiver.length) && <GridList container spacing={2}>
                        {receiver.map((i, ind) => (
                            <ItemList item xs={12}>
                                <ItemText>
                                    Обмен перерыва &nbsp;
                                    <Tooltip title={`Ваш перерыв в ${addZero(TIMING[timing[i.break_id_receiver]][1])}:${addZero(TIMING[timing[i.break_id_receiver]][2])} длительностью ${i.r_length*5} минут на перерыв в ${addZero(TIMING[timing[i.break_id_sender]][1])}:${addZero(TIMING[timing[i.break_id_sender]][2])} длительностью ${i.s_length*5} минут. Нажмите для просмотра своих перерывов`}>
                                        <TimeItem onClick={onChangeTab(1)}>{addZero(TIMING[timing[i.break_id_sender]][1])}:{addZero(TIMING[timing[i.break_id_sender]][2])}</TimeItem>
                                    </Tooltip>
                                    &nbsp;с&nbsp;
                                    <Tooltip title={`Отправитель запроса: ${people[i.sender_id].surname} ${people[i.sender_id].name}. Нажмите чтобы перейти в профиль сотрудника`}><TimeItem>{people[i.sender_id].surname} {people[i.sender_id].name[0]}.</TimeItem></Tooltip>
                                </ItemText>
                                {!Boolean(i.success) && <Tooltip title="Одобрить обмен"><AcceptItem color='primary'><Done color='primary' fontSize="small"/></AcceptItem></Tooltip>}
                                {!Boolean(i.success) && <Tooltip title="Отклонить запрос"><DeleteItem color='secondary'><Cancel color='secondary' fontSize="small"/></DeleteItem></Tooltip>}
                                {Boolean(i.success) && <Tooltip title={`Статус запроса: ${statusItem[i.success].text}. ${statusItem[i.success].fullText}`}><StatusItem v={statusItem[i.success].color}>{statusItem[i.success].text}</StatusItem></Tooltip>}
                                {Boolean(i.success) &&  <Tooltip title="Удалить запрос"><DeleteItem color='secondary'><Delete color='secondary' fontSize="small"/></DeleteItem></Tooltip>}
                            </ItemList>
                        ))}
                    </GridList>}
                    </MuiThemeProvider>
                </InQuest>
                <OutQuest>
                    <Title>Исходящие запросы</Title>
                    <MuiThemeProvider theme={theme}>
                    {!Boolean(sender.length) && <NotFound><NFText>Новых заявок не найдено</NFText><NotFountExchange /></NotFound>}
                    {Boolean(sender.length) && <GridList container spacing={2}>
                        {sender.map((i, ind) => (
                            <ItemList item xs={12}>
                                <ItemText>
                                    Обмен перерыва &nbsp;
                                    <Tooltip title={`Ваш перерыв в ${addZero(TIMING[timing[i.break_id_sender]][1])}:${addZero(TIMING[timing[i.break_id_sender]][2])} длительностью ${i.s_length*5} минут на перерыв в ${addZero(TIMING[timing[i.break_id_receiver]][1])}:${addZero(TIMING[timing[i.break_id_receiver]][2])} длительностью ${i.r_length*5} минут. Нажмите для просмотра своих перерывов`}>
                                        <TimeItem onClick={onChangeTab(1)}>{addZero(TIMING[timing[i.break_id_receiver]][1])}:{addZero(TIMING[timing[i.break_id_receiver]][2])}</TimeItem>
                                    </Tooltip>
                                    &nbsp;с&nbsp;
                                    <Tooltip title={`Получатель запроса: ${people[i.receiver_id].surname} ${people[i.receiver_id].name}. Нажмите чтобы перейти в профиль сотрудника`}><TimeItem>{people[i.receiver_id].surname} {people[i.receiver_id].name[0]}.</TimeItem></Tooltip>
                                </ItemText>
                                <Tooltip title={`Статус запроса: ${statusItem[i.success].text}. ${statusItem[i.success].fullText}`}><StatusItem v={statusItem[i.success].color}>{statusItem[i.success].text}</StatusItem></Tooltip>
                                <Tooltip title="Отозвать запрос"><DeleteItem color='secondary'><Delete color='secondary' fontSize="small"/></DeleteItem></Tooltip>
                            </ItemList>
                        ))}
                    </GridList>}
                    </MuiThemeProvider>
                </OutQuest>
            </>
        )
    }
}

ExchangeBreak.contextType = SocketConsumer;
export default ExchangeBreak

const NFText = styled.span`{
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-family: Manrope3;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    width: 200px
}`

const NotFound = styled.div`{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}`

const StatusItem = styled.span`{
    position: absolute;
    top: 6px;
    width: 90px;
    right: 50px;
    border: 1px solid ${p=>p.v};
    color: ${p=>p.v};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 9px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    padding: 10px;
    cursor: default;
}`

const AcceptItem = styled(IconButton)` && {
    position: absolute;
    top: 0px;
    right: 45px;
}`

const DeleteItem = styled(IconButton)` && {
    position: absolute;
    top: 0px;
    right: 0px;
}`

const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "13px",
        }
      }
    }
});

const TimeItem = styled.span`{
    border-bottom: 1px dashed #000;
    cursor: help;
}`

const ItemText = styled.span` {
    position: absolute;
    top: 13px;
    left: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #000000;
    text-align: left;
    display: flex;
    flex-direction: row;
    cursor: default;
    user-select: none;
}`

const ItemList = styled(Grid)` && {
    height: 45px;
    position: relative;
    border-bottom: 1px solid #A7A8A9;
}`

const GridList = styled(Grid)`&& {
    position: absolute;
    top: 40px;
    left: 10px;
    width: calc(100% - 20px);
    max-height: calc(100% - 50px);
    overflow-y: auto;
    margin: 0px;
}`

const Title = styled.span`{
    position: absolute;
    width: 250px;
    height: 15.38px;
    left: 10px;
    top: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    text-align: left;
}`

const InQuest = styled.div`{
    position: absolute;
    width: calc(50% - 15px);
    height: calc(100% - 20px);
    left: 10px;
    top: 10px;
    background: #FFFFFF;
    border-radius: 5px;
}`

const OutQuest = styled.div`{
    position: absolute;
    width: calc(50% - 15px);
    height: calc(100% - 20px);
    right: 10px;
    top: 10px;
    background: #FFFFFF;
    border-radius: 5px;
}`