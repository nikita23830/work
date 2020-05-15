import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
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
import { TIMING } from 'Comp/Break/NewTable/tools'

class StatBreakList extends PureComponent {

  render() {
    const { list, delBreakWithListStat, drawer } = this.props
    return (
      <StyledCard drawer={drawer}>
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
                <TableCell>{TIMING[i.end][1]}:{addZero(TIMING[i.end][2])}</TableCell>
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
    )
  }
}

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
`;

const closeDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
`;

const StyledCard = styled(Card)` && {
  height: ${document.documentElement.clientHeight - 340}px;
  overflow-y: auto;
  position: absolute;
  right: 5px;
  top: 205px;
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
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
