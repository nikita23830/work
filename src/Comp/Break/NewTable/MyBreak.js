import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { Coffee, Delete, InstallBreakIcon, SrVrBreakIcon, CountBreakIcon, FreeTimeIcon } from 'Comp/Break/NewTable/Svg'
import { EmojiFoodBeverageOutlined } from '@material-ui/icons'
import { addZero, TIMING, isDateMonth } from 'Comp/Break/NewTable/tools'
import { SocketConsumer } from 'ContextSocket/index'

class MyBreak extends React.PureComponent {

    state = {
        curDate: new Date(),
    }

    onDelete = (i) => () => {
        const { socket } = this.context
        socket.emit('deleteMyBreak', i.ids)
    }

    render() {
        const { myBreak, date } = this.props
        const { curDate } = this.state
        let dateToDeleteDate = [addZero(curDate.getDate()), isDateMonth[curDate.getMonth()+1], curDate.getFullYear()]
        const count = myBreak.reduce((res, el) => res + el.ids.length, 0)
        let srvr = Math.round(myBreak.reduce((res, el) => res + el.ids.length, 0) / myBreak.length * 5) // среднее время
        return (
            <Container container spacing={3}>
                <GridList item xs={12} sm={6}>
                    <TextTitle>Установленные перерывы</TextTitle>
                    <ListGrid container spacing={0}>
                        {myBreak.map(i => (
                            <Grid item xs={12} sm={12}>
                                <ColorTime>
                                    <CoffeeIcon><EmojiFoodBeverageOutlined/></CoffeeIcon>
                                    <Timing>в {addZero(TIMING[i.timing[0]][1])}:{addZero(TIMING[i.timing[0]][2])} на {i.ids.length * 5} минут</Timing>
                                    {date.join(",") === dateToDeleteDate.join(",") && <DeleteIcon onClick={this.onDelete(i)}><Delete /></DeleteIcon>}
                                </ColorTime>
                            </Grid>
                        ))}
                    </ListGrid>
                </GridList>
                <GridList item xs={12} sm={6}>
                    <TextTitle>Статистика</TextTitle>
                    <InstallBreak>
                        <InstallBreakIcon />
                        <InstallCount>{myBreak.length}</InstallCount>
                    </InstallBreak>
                    <SrVrBreak>
                        <SrVrBreakIcon />
                        <SrVrBreakText>{!Math.round(count / myBreak.length * 5) ? 0 : Math.round(count / myBreak.length * 5)} мин</SrVrBreakText>
                    </SrVrBreak>
                    <CountBreak>
                        <CountBreakIcon />
                        <CountBreakText>{count * 5} мин</CountBreakText>
                    </CountBreak>
                    <FreeTime disabled={count === 9}>
                        <FreeTimeIcon disabled={count === 9} />
                        <FreeTimeText>{(9 - count) * 5} мин</FreeTimeText>
                    </FreeTime>
                </GridList>
            </Container>
        )
    }
}

MyBreak.contextType = SocketConsumer;
export default MyBreak;

const FreeTimeText = styled.span`{
    position: absolute;
    width: 200px;
    height: 66px;
    left: 50px;
    top: -12px;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 66px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    display: flex;
    align-items: flex-start;
    text-align: left
}`;

const FreeTime = styled.span` && {
    position: absolute;
    top: 227px;
    right: 69px;
    color: ${p=> p.disabled ? '#99A9BA' : '#2285EE'};
}`

const CountBreakText = styled.span`{
    position: absolute;
    width: 200px;
    height: 66px;
    left: 50px;
    top: -12px;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 66px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
    display: flex;
    align-items: flex-start;
    text-align: left
}`;

const CountBreak = styled.span`{
    position: absolute;
    top: 227px;
    left: 34px;
}`

const SrVrBreakText = styled.span`{
    position: absolute;
    width: 200px;
    height: 66px;
    left: 40px;
    top: -17px;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 66px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
    display: flex;
    align-items: flex-start;
    text-align: left
}`;


const SrVrBreak = styled.span`{
    position: absolute;
    top: 102px;
    right: 69px;
}`

const InstallCount = styled.span`{
    position: absolute;
    width: 100px;
    height: 66px;
    left: 93px;
    top: -10px;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 66px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
    display: flex;
    align-items: flex-start;
    text-align: left
}`;

const InstallBreak = styled.span`{
    position: absolute;
    top: 95px;
    left: 59px;
}`

const DeleteIcon = styled.span`{
    position: absolute;
    width: 24px;
    height: 24px;
    right: 24px;
    top: 20px;
    cursor: pointer;
}`

const Timing = styled.span`{
    position: absolute;
    width: 150px;
    height: 19px;
    left: 72px;
    top: 22px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    text-align: left;
}`

const CoffeeIcon = styled.span`{
    position: absolute;
    left: 24px;
    top: 20px;
}`

const ListGrid = styled(Grid)` && {
    position: absolute;
    top: 59px;
    left: 0px;
}`

const ColorTime = styled.div`{
    height: 65px;
    background: #fff;
    color: #072D57;
    border: 1px solid #E9F3FD;
    position: relative;
    cursor: default;
} &:hover {
    color: #2285EE;
    background: #E9F3FD;
}`

const TextTitle = styled.span`{
    position: absolute;
    width: 192px;
    height: 19px;
    left: 24px;
    top: 20px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    text-align: left;
}`

const GridList = styled(Grid)` && {
    background: #FFFFFF;
    border-radius: 4px;
    width: 100%;
    height: ${document.documentElement.clientHeight - 140}px;
    position: relative;
    border: 5px solid #F0F4F7;
}`

const Container = styled(Grid)` && {
    position: absolute;
    top: 16px;
    left: 16px;
    width: calc(100% - 16px);
    max-height: ${document.documentElement.clientHeight - 140}px;
    overflow-y: auto;
    user-select: none;
}`