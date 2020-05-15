import React, {Component} from 'react'
import styled, { keyframes } from 'styled-components'
import {Card, CardContent, CardActions, Button, Grid, Typography, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';

class MainRuleBreak extends Component {

  state = {
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
    const { rule } = this.state
    const { drawer } = this.props
    return (
      <StyledCard drawer={drawer}>
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

const CustomTypography = styled(Typography)` && {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}`

const StyledCard = styled(Card)` && {
  height: ${document.documentElement.clientHeight - 230}px;
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
  overflow-y: auto;
  position: absolute;
  right: 5px;
  top: 95px;
}`

MainRuleBreak.contextType = SocketConsumer;
export default withSnackbar(MainRuleBreak)
