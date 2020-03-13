import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Card, Grid, Typography, Fab, Button, Checkbox } from '@material-ui/core'
import { Cached } from '@material-ui/icons'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';
import { ReqCard } from 'Comp/Admin/RequestCard'
import Forbidden from 'Comp/Forbidden'

class Administartion extends React.Component {

  state = {
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
    const { reqList, reqCheckList, disabledButton } = this.state
    const { level, drawer } = this.props
    if (level[0] === 0) return (<Forbidden {...this.props}/>)
    else return (
      <Root drawer={drawer} level={level.level_id}>
        <RequestCard>
          <ReqCard
            socket={this.context.socket}
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

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 72}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 260}px;
  }
`;

const closeDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 260}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 72}px;
  }
`;

const Root = styled.div` {
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
  height: ${document.documentElement.clientHeight - 65}px;
  position: absolute;
  top: 64px;
  right: 0px;
  background: ${p=>p.level === 1 ? '#E5E5E5' : '#222'};
}`

const RequestCard = styled(Card)` && {
  width: 480px;
  height: ${document.documentElement.clientHeight - 95}px;
  padding: 10px;
  margin: 5px 0 0 5px;
}`
