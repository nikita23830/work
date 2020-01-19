import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button, Table, TableRow, TableBody, TableCell, TableHead, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';

class MainRuleBreak extends Component {

  state = {
    height: 100,
	  width: 100,
    rule: []
  }

  componentDidMount = async () => {
    const { socket } = this.context
    const { enqueueSnackbar } = this.props
    await socket.emit('getListRule', '')
    let h = document.documentElement.clientHeight - 200
	  let w = document.documentElement.clientWidth - 40
    this.setState({ height: h, width: w })

    await socket.on('getListRule', (data) => {
      this.setState({ rule: data })
    })

    await socket.on('send_error', (data) => { // прием ошибок back-end'a
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000})
      this.setState({ loader: false })
    })
  }

  render () {
    const { height, width, rule } = this.state
    return (
      <StyledCard h={height} w={width}>
        <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align='left'>Макс. отдыхов одновременно</TableCell>
              <TableCell align='left'>В час</TableCell>
              <TableCell align='left'>6:00</TableCell>
              <TableCell align='left'>1</TableCell>
              <TableCell align='right'>
                <IconButton aria-label="delete">
                  <Delete color='primary' />
                </IconButton>
              </TableCell>
            </TableRow>

            {rule.map(i => {
              <TableRow>
                <TableCell align='left'>Макс. отдыхов одновременно</TableCell>
                <TableCell align='left'>В час</TableCell>
                <TableCell align='left'>6:00</TableCell>
                <TableCell align='left'>1</TableCell>
                <TableCell align='right'>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>
            })}


          </TableBody>
        </Table>
        </CardContent>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 20px;
  height: ${p=>p.h}px;
  overflow-y: auto;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

MainRuleBreak.contextType = SocketConsumer;
export default withSnackbar(MainRuleBreak)
