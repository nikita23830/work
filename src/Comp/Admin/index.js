import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Card, Grid, IconButton, Tooltip } from '@material-ui/core'
import { Done, DeleteOutline, Autorenew } from '@material-ui/icons'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';
import { Circle1, Circle2, Circle3, Circle4 } from 'Comp/NewNews/svg'
import { NotRequest } from 'Comp/Admin/Style/svg'
import { Redirect } from 'react-router-dom'

class Administartion extends React.Component {

  state = {
    reqList: [],
    loader: true
  }

  acceptRequestReg = (id) => () => {
    const { socket } = this.context
    socket.emit('acceptRequestReg', id)
    this.setState({ loader: true })
  }

  declineRequestReg = (id) => () => {
    const { socket } = this.context
    socket.emit('declineRequestReg', id)
    this.setState({ loader: true })
  }

  onUpdate = () => {
    const { socket } = this.context
    socket.emit('getListRequestReg', '')
    this.setState({ loader: true })
  }

  componentDidMount = async () => {
    const { socket } = this.context
    const { enqueueSnackbar } = this.props
    await socket.emit('getListRequestReg', '')

    await socket.on('getListRequestReg', (data) => {
      this.setState({ reqList: data, loader: false })
    })

    await socket.on('acceptRequestReg', (data) => {
      enqueueSnackbar('Заявка успешно одобрена', {variant: 'success',autoHideDuration: 3000, preventDuplicate: true})
    })
    await socket.on('declineRequestReg', (data) => {
      enqueueSnackbar('Заявка успешно удалена', {variant: 'success',autoHideDuration: 3000, preventDuplicate: true})
    })

    await socket.on('send_error', (data) => {
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000, preventDuplicate: true})
    })
  }

  render () {
    const { reqList, loader } = this.state
    const { level, drawer } = this.props
    const chart = ['5/52', '2/2', '"ночник"']
    if (level.level_id === 0) return (<Redirect to='/' />)
    return (
      <Root drawer={drawer} level={level.level_id}>
        <RequestCard>
          <TitleRequest>Запросы на регистрацию</TitleRequest>
          <Tooltip title='Обновить список заявок'>
            <Update disabled={loader} onClick={this.onUpdate}><Autorenew color='primary' /></Update>
          </Tooltip>
          {loader && <Loader><Circle1 /><Circle2 /><Circle3 /><Circle4 /></Loader>}

          {!loader && !Boolean(reqList.length) && <NotFoundRequest>
            <NotRequest />
            <NotFoundText>Новых заявок не найдено, попробуйте обновить список</NotFoundText>
          </NotFoundRequest>}

          <ReqList container spacing={2}>

            {!loader && Boolean(reqList.length) && reqList.map(i => (
              <ReqListCard item xs={12} sm={12}>
                <Name>{i.surname} {i.name} (график: {chart[i.chart]})</Name>
                <Tooltip title='Одобрить заявку'>
                  <AcceptIconButton color='primary' onClick={this.acceptRequestReg(i.id)}>
                    <Done color='primary' />
                  </AcceptIconButton>
                </Tooltip>
                <Tooltip title='Удалить заявку'>
                  <CancelIconButton color='secondary' onClick={this.declineRequestReg(i.id)}>
                    <DeleteOutline color='secondary' />
                  </CancelIconButton>
                </Tooltip>
              </ReqListCard>
            ))}

          </ReqList>

        </RequestCard>
      </Root>
    )
  }
}

Administartion.contextType = SocketConsumer;
export default withSnackbar(Administartion)

const Update = styled(IconButton)` && {
  position: absolute;
  top: 5px;
  right: 10px;
}`

const animation = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0)
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg)
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg)
  }
`;

const Loader = styled.div`{
  position: absolute;
  width: 96px;
  height: 96px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${animation} 3s linear infinite;
  z-index: 10
}`

const NotFoundText = styled.span`{
  width: 200px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: Manrope3;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #1D3F66;
}`

const NotFoundRequest = styled.div`{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px
}`

const CancelIconButton = styled(IconButton)` && {
  position: absolute;
  right: 10px;
  top: 0px;
  display: none;
}`

const AcceptIconButton = styled(IconButton)` && {
  position: absolute;
  right: 60px;
  top: 0px;
  display: none;
}`

const Name = styled.span`{
  width: 325px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`

const ReqListCard = styled(Grid)` && {
  position: relative;
  height: 50px;
  border: 1px solid #DDE2E8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  text-align: left;
  cursor: default;
} :hover {
  ${Name} {
    width: 195px;
  }
  ${AcceptIconButton} {
    display: block;
  }
  ${CancelIconButton} {
    display: block;
  }
}`

const ReqList = styled(Grid)` && {
  position: absolute;
  top: 69px;
  left: 20px;
  width: 345px;
  max-height: calc(100% - 75px);
  overflow-y: auto;
}`

const TitleRequest = styled.span`{
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

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
}`

const RequestCard = styled(Card)` && {
  width: 350px;
  height: ${document.documentElement.clientHeight - 95}px;
  padding: 10px;
  top: 5px;
  left: 5px;
  position: absolute;
}`
