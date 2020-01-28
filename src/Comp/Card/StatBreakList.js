import React, {Component} from 'react'
import styled from 'styled-components'
import {Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TIMING } from 'Comp/Break/MainTable/tools'

class StatBreakList extends Component {

  state = {
    heightList: 0
  }

  componentDidMount () {
    let height = `${document.documentElement.clientHeight - 370}px`
    this.setState({ heightList: height })
  }

  render() {
    const { heightList } = this.state
    const { list, delBreakWithListStat } = this.props
    return (
      <>
        <StyledCard height={heightList}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>Начало перерыва</TableCell>
                <TableCell>Конец перерыва</TableCell>
                <TableCell>Продолжительность</TableCell>
                <TableCell>Руководитель</TableCell>
                <TableCell>Удалить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(i => (
                <TableRow>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{TIMING[i.start][1]}:{addZero(TIMING[i.start][2])}</TableCell>
                  <TableCell>{TIMING[i.end][1]}:{addZero(TIMING[i.end+1][2])}</TableCell>
                  <TableCell>{i.array.length * 5} мин.</TableCell>
                  <TableCell>{i.mName}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={delBreakWithListStat}>
                      <Delete color='primary' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </StyledCard>
      </>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: 100%;
  margin: 0 20px 20px 20px;
  height: ${props => props.height};
  overflow-y: auto;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

function addZero(n) {
    return String("00" + n).slice(-2);
}

export default StatBreakList
