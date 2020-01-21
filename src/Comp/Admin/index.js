import React from 'react'
import styled from 'styled-components'
import { Card, Grid, Typography, Fab, Button, Checkbox } from '@material-ui/core'
import { Cached } from '@material-ui/icons'
import { SocketConsumer } from '../../ContextSocket/index'
import { withSnackbar } from 'notistack';
import { ReqCard } from './RequestCard'
import Forbidden from '../Forbidden'

class Administartion extends React.Component {

  state = {
    rootHeight: 100,
    roowWidth: 100,
    reqList: [],
    reqCheckList: {},
    disabledButton: true
  }

  acceptRequestReg = () => {
    const { socket } = this.context
    const { reqCheckList } = this.state
    socket.emit('acceptRequestReg', reqCheckList)
  }

  declineRequestReg = () => {
    const { socket } = this.context
    const { reqCheckList } = this.state
    socket.emit('declineRequestReg', reqCheckList)
  }

  changeReqCheckList = (id) => (e) => {
    let resReqCheckList = {...this.state.reqCheckList}
    if (!e.target.checked) delete resReqCheckList[id]
    else resReqCheckList[id] = true
    this.setState({ reqCheckList: resReqCheckList, disabledButton: Object.keys(resReqCheckList).length === 0 })
  }

  componentDidMount = async () => {
    const { socket } = this.context
    const { enqueueSnackbar } = this.props
    await socket.emit('getListRequestReg', '')
    let h = document.documentElement.clientHeight - 90
    let w = document.documentElement.clientWidth - 20
    await this.setState({ rootHeight: h, roowWidth: w })

    await socket.on('getListRequestReg', (data) => {
      this.setState({ reqList: data })
    })

    await socket.on('acceptRequestReg', (data) => {
      enqueueSnackbar('Заявки успешно одобрены', {variant: 'success',autoHideDuration: 3000})
      this.setState({ reqCheckList: {}, disabledButton: true })
    })
    await socket.on('declineRequestReg', (data) => {
      enqueueSnackbar('Заявки успешно удалены', {variant: 'success',autoHideDuration: 3000})
      this.setState({ reqCheckList: {}, disabledButton: true })
    })

    await socket.on('send_error', (data) => {
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000})
    })
  }

  render () {
    const { rootHeight, roowWidth, reqList, reqCheckList, disabledButton } = this.state
    const { level } = this.props
    if (level[0] === 0) return (<Forbidden {...this.props}/>)
    else return (
      <Root h={rootHeight} w={roowWidth}>
        <RequestCard h={rootHeight}>
          <ReqCard
            socket={this.context.socket}
            rootHeight={rootHeight}
            reqList={reqList}
            reqCheckList={reqCheckList}
            changeReqCheckList={this.changeReqCheckList}
            disabledButton={disabledButton}
            declineRequestReg={this.declineRequestReg}
            acceptRequestReg={this.acceptRequestReg}
          />
        </RequestCard>
      </Root>
    )
  }
}

Administartion.contextType = SocketConsumer;
export default withSnackbar(Administartion)

const Root = styled.div` {
  width: ${p=>p.w}px;
  height: ${p=>p.h}px;
  padding: 10px;
}`

const RequestCard = styled(Card)` && {
  width: 480px;
  height: ${p=>p.h-20}px;
  padding: 10px;
}`
