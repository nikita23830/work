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
  IconButton,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

class MyBreakMain extends Component {

  render() {
    const { list, deleteMyBreak } = this.props
    return (
      <StyledCard>
        <Typography variant="h5" component="h2">
          Установленные перерывы:
        </Typography> <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Начало перерыва</TableCell>
              <TableCell align='left'>Продолжительность</TableCell>
              <TableCell align='right'>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((i, index) => (
              <TableRow>
                <TableCell align='left'>{i[0]}</TableCell>
                <TableCell align='left'>{i[1]}</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label="delete">
                    <Delete color='primary' onClick={deleteMyBreak(index)}/>
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

const StyledCard = styled(Card)` && {
  width: 100%;
  margin: 5px;
  height: ${document.documentElement.clientHeight - 84}px;
  overflow-y: auto;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

const Loader = styled.div` {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  display: ${p=>p.loader ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1;
}`

export default MyBreakMain
