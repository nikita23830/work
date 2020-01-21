import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Button, Grid, Typography, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import { SocketConsumer } from '../../ContextSocket/index'
import { withSnackbar } from 'notistack';

class MainRuleBreak extends Component {

  state = {
    height: 100,
	  width: 100,
    rule: []
  }

  deleteRule = (id) => async() => {
    const { socket } = this.context
    socket.emit('deleteRule', id)
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
          {rule.map(i => (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <CustomTypography>{i.name_rule}</CustomTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTypography>{i.type_rule}</CustomTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTypography>{i.period_rule}</CustomTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <CustomTypography>{i.data}</CustomTypography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton aria-label="delete" onClick={this.deleteRule(i.gid)}>
                  <Delete color='primary' />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </StyledCard>
    )
  }
}

const CustomTypography = styled(Typography)` && {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}`

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 20px;
  height: ${p=>p.h}px;
  overflow-y: auto;
}`

MainRuleBreak.contextType = SocketConsumer;
export default withSnackbar(MainRuleBreak)
