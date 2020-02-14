import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { Coffee, Delete } from 'Comp/Break/NewTable/Svg'
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
            </Container>
        )
    }
}

MyBreak.contextType = SocketConsumer;
export default MyBreak

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
}`

const GridList = styled(Grid)` && {
    background: #FFFFFF;
    border-radius: 4px;
    width: 100%;
    height: ${document.documentElement.clientHeight - 140}px;
    position: relative;
}`

const Container = styled(Grid)` && {
    position: absolute;
    top: 16px;
    left: 16px;
    width: calc(100% - 16px);
    max-height: ${document.documentElement.clientHeight - 140}px;
    overflow-y: auto;
}`