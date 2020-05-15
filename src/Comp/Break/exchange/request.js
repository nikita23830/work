import React from 'react'
import { Modal, Grid, Tooltip, Radio } from '@material-ui/core';
import styled from 'styled-components'
import { TimeIcon } from 'Comp/Break/NewTable/Svg'
import { TIMING, addZero } from 'Comp/Break/NewTable/tools'

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

class RequestExchange extends React.PureComponent {

    state = {
        receive: undefined,
        breaks: undefined,
        error: {
            status: false,
            field: undefined
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const { open } = this.props
        if (open !== nextProps.open) this.setState({ error: {status: false, field: undefined}, receive: undefined, breaks: undefined })
    }

    onChangeReceive = (e) => this.setState({ receive: e.target.value, error: { status: false } })
    onChangeBreak = (e) => this.setState({ breaks: e.target.value, error: { status: false } })
    
    onCreate = () => {
        const { receive, breaks } = this.state
        const { socket, table, myBreak, exchangeRowID } = this.props
        if (!receive || !breaks) this.setState({ error: { status: true, field: !receive ? 'receive' : 'breaks' } })
        else socket.emit('exchangeSend', {receive: table[exchangeRowID].data[receive], break: myBreak[breaks]})
    }

    render () {
        const { open, onClose, exchangeRowID, table, myBreak, onChangeTab } = this.props
        const { receive, breaks, error } = this.state
        const start_time = []
        if (open) table[exchangeRowID].data.map((i, ind) => {
            if (i.start_end === 1) start_time.push(i.timing_id)
            else if (i.start_end === 0) start_time.push(i.timing_id-1)
            else if (i.start_end === 2) start_time.push(i.timing_id-2)
            else start_time.push(i.timing_id)
        })
        return (
            <Modal
                open={open}
                onClose={onClose()}
            >
                <Root error={error.status}> 
                    <MuiThemeProvider theme={theme}>
                    <IconTime><TimeIcon /></IconTime>
                    <IconTitle>Запрос на обмен</IconTitle>

                    {error.status && <Error>Допущена ошибка при создании запроса</Error>}

                    <ReceiveTitle error={error.field === 'receive'}>Выберите получателя</ReceiveTitle>
                    <ReceiveList>
                        <ReceiveListItems container spacing={2}>
                            {open && table[exchangeRowID].data.map((i, ind) => (
                                <ReceiveItem item xs={12}>
                                    <CRadio name="receiveExchange" color='primary' value={ind} checked={parseInt(receive)===ind} onChange={this.onChangeReceive}/>
                                    <Tooltip title={`${i.surname} ${i.name}`}><ReceiveItemPeople>{i.surname} {i.name[0]}.</ReceiveItemPeople></Tooltip>
                                    &nbsp;в&nbsp; 
                                    <Tooltip title={`С ${addZero(TIMING[start_time[ind]][1])}:${addZero(TIMING[start_time[ind]][2])} до ${addZero(TIMING[start_time[ind]+i.length][1])}:${addZero(TIMING[start_time[ind]+i.length][2])} (длительность: ${i.length*5} минут)`}>
                                        <ReceiveItemTime>{addZero(TIMING[start_time[ind]][1])}:{addZero(TIMING[start_time[ind]][2])}</ReceiveItemTime>
                                    </Tooltip>
                                </ReceiveItem>
                            ))}
                        </ReceiveListItems>
                    </ReceiveList>

                    <BreakTitle error={error.field === 'breaks'}>Выберите свой перерыв</BreakTitle>
                    <BreakList>
                        <ReceiveListItems container spacing={2}>
                            {myBreak.map((i, ind) => (
                                <ReceiveItem item xs={12}>
                                    <CRadio name="receiveExchange" color='primary' value={ind} checked={parseInt(breaks)===ind} onChange={this.onChangeBreak}/>
                                    <Tooltip title="Нажмите для просмотра своих перерывов"><BreakItem onClick={onChangeTab(1)}>
                                        {addZero(TIMING[i.timing[0]][1])}:{addZero(TIMING[i.timing[0]][2])} - {addZero(TIMING[i.timing[i.timing.length-1]+1][1])}:{addZero(TIMING[i.timing[i.timing.length-1]+1][2])} ({i.timing.length*5} мин)
                                    </BreakItem></Tooltip>
                                </ReceiveItem>
                            ))}
                        </ReceiveListItems>
                    </BreakList>
                    
                    <Tooltip title="В текущей версии сайта обмен возможен только с идентичными по длине перерывами"><InfoPanel>Есть временные ограничения</InfoPanel></Tooltip>
                    <Create onClick={this.onCreate}>Создать</Create>
                    </MuiThemeProvider>
                </Root>
            </Modal>
        )
    }
}

export default RequestExchange

const Error = styled.div`{
    position: absolute;
    width: 250px;
    left: 0px;
    top: 41px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #F24646;
    border-top: 3px solid #F24646;
    border-bottom: 3px solid #F24646;
    padding: 3px 3px 3px 3px;
    user-select: none;
    cursor: default;
    text-align: center;
}`

const Create = styled.div`{
    position: absolute;
    width: 256px;
    height: 43px;
    left: 0px;
    bottom: -1px;
    background: #2285EE;
    border-radius: 0px 0px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
    cursor: pointer;
}`

const InfoPanel = styled.span`{
    position: absolute;
    width: 250px;
    left: 0px;
    bottom: 48px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    border-top: 3px solid #F98700;
    border-bottom: 3px solid #F98700;
    padding: 3px 3px 3px 3px;
    user-select: none;
    cursor: help;
    text-align: center;
}`

const BreakItem = styled.span`{
    margin-left: 5px;
    border-bottom: 1px dashed #000;
    cursor: help;
}`

const BreakList = styled.div`{
    position: absolute;
    width: 240px;
    height: 150px
    max-height: 135px;
    overflow-y: auto;
    left: 7px;
    bottom: 86px;
    background: #FFFFFF;
    border: 1px solid #072D57;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 5px 15px 5px 15px;
    overflow-x: hidden;
}`

const BreakTitle = styled.span`{
    position: absolute;
    width: 164px;
    height: 14px;
    left: 14px;
    bottom: 215px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.error ? '#F24646' : '#072D57'};
    background: #fff;
    text-align: center;
    z-index: 1;
    font-family: Roboto;
}`

const CRadio = styled(Radio)` && {
    padding: 0px;
    max-height: 24px;
    height: 24px;
}`

const ReceiveItemPeople = styled.span`{
    border-bottom: 1px dashed #000;
    cursor: help;
    margin-left: 5px;
    max-width: 125px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`

const ReceiveItemTime = styled.span`{
    border-bottom: 1px dashed #000;
    cursor: help;
}`

const ReceiveItem = styled(Grid)` && {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #000000;
    display: flex;
    align-items: center;
    max-height: 40px;
}`

const ReceiveListItems = styled(Grid)` && {
    position: absolute;
    top: 18px;
    left: 7px;
    max-width: 240px;
    overflow-x: hidden;
}`

const ReceiveTitle = styled.span`{
    position: absolute;
    width: 150px;
    height: 14px;
    left: 14px;
    bottom: 362px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.error ? '#F24646' : '#072D57'}
    background: #fff;
    text-align: center;
    z-index: 1;
    font-family: Roboto;
}`

const ReceiveList = styled.div`{
    position: absolute;
    width: 240px;
    height: 150px
    max-height: 135px;
    overflow-y: auto;
    left: 7px;
    bottom: 233px;
    background: #FFFFFF;
    border: 1px solid #072D57;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 5px 15px 5px 15px;
    overflow-x: hidden;
}`

const IconTitle = styled.span`{
    position: absolute;
    width: 130px;
    height: 16px;
    left: 43px;
    top: 18px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 16px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    text-align: left;
    font-family: Roboto;
}`

const IconTime = styled.div`{
    position: absolute;
    width: 24px;
    height: 24px;
    left: 16px;
    top: 14px;
}`

const Root = styled.div`{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
    width: 256px;
    height: ${p=>p.error ? 453 : 418}px;
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