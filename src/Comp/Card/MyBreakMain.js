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

class MyBreakMain extends Component {

  state={
    hMain: 100,
    wMain: 100,
  }

  componentDidMount () {
    let hMain = document.documentElement.clientHeight - 84
    let wMain = (document.documentElement.clientWidth - 20) / 2
    this.setState({ hMain: hMain, wMain: wMain })
  }

  render() {
    const { hMain, wMain } = this.state
    return (
      <>
        <StyledCard h={hMain} w={wMain}>
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
              <TableRow>
                <TableCell align='left'>11:50</TableCell>
                <TableCell align='left'>15 минут</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              

            </TableBody>
          </Table>

        </StyledCard>
      </>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 5px;
  height: ${p=>p.h}px;
  overflow-y: auto;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default MyBreakMain
