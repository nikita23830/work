import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SocketConsumer } from 'ContextSocket'
import { withSnackbar } from 'notistack';
import { Send, NoMessage, MailBox, DeleteIcon, CreateTicketIcon } from 'Comp/FeedBack/Svg'
import { Grid, Avatar, Input, InputAdornment, Button } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { MessageBodyPlace } from 'Comp/FeedBack/MessageBody';
import NewModalChats from 'Comp/FeedBack/New'
import { withRouter } from 'react-router-dom'

class FeedBack extends React.PureComponent {

  state={
    activeTab: 0,
    textOpenMessage: '',
    chats: [],
    createModal: false,
    admin: false
  }

  onChangeTabs = (id) => () => {
    const { chats } = this.state
    const { history } = this.props
    this.setState({ activeTab: id })
    history.push(`/feedback?chats=${chats[id].id}`)
    if (chats[id].msg.length > 0 && this.message) this.message.scrollTo(0, 10000000)
  }

  sendMessage = () => {
    const { textOpenMessage, activeTab, chats } = this.state
    const { socket } = this.context
    if (textOpenMessage.replace(/\s/g, '') !== '') {
      socket.emit('sendMessageToChat', {chat: chats[activeTab].id, text: textOpenMessage, date: +new Date()})
      this.setState({ textOpenMessage: '' })
    }
  }

  changeStatusTicket = () => {
    const { chats, activeTab } = this.state
    const { socket } = this.context
    socket.emit('changeStatusTicket', chats[activeTab])
  }

  componentDidMount = async () => {
    const { socket } = this.context
    const { location } = this.props
    await socket.emit('getChatList', '');
    await socket.on('getChatList', (data) => {
      if (data.empty) { return 0; }
      let chats = [...data.chats]
      chats.forEach(i => {
        if (!i.msg) i.msg = data.message.filter(j => j.feedback_id === i.id)
      })

      let activeChats = 0
      let urlChats = parseInt(getAllUrlParams().chats, 10)
      chats.forEach((i, ind) => {
        if (urlChats && i.id === urlChats) activeChats = ind
      })

      this.setState({ chats: chats, createModal: false, admin: data.admin, activeTab: activeChats })
      if (chats[0].msg.length > 0 && this.message) this.message.scrollTo(0, 10000000)
    })
    await socket.on('getNewMessage', (data) => {
      let chats = [...this.state.chats]
      chats.forEach(i => { if (i.id === data.chat) i.msg.push(data) }) 
      this.setState({ chats: chats })
      if (chats[this.state.activeTab].msg.length > 0 && this.message) this.message.scrollTo(0, 10000000)
    })
    await socket.on('checkChatsCount', () => socket.emit('getChatList', '') )
    await socket.on('changeStatusTicket', (data) => {
      let { chats } = this.state
      let newChats = []
      chats.map((i, index) => {
        if (i.id !== data.id) newChats.push(chats[index])
        else if (!data.delete) newChats[index] = {...chats[index], close: data.newState}
      })
      this.setState({ chats: newChats })
    })
  }

  render () {
    const { drawer, level, history } = this.props
    const { activeTab, chats, textOpenMessage, createModal, admin } = this.state
    return (
      <Body drawer={drawer} level={level.level_id}>
        {createModal && <NewModalChats onClose={() => this.setState({ createModal: false})} socket={this.context.socket} />}
        <Header level={level.level_id}>
          <SendTab>
            <TextSendTab>Обращения</TextSendTab>
            <CountSendTab>{chats.length}</CountSendTab>
          </SendTab>
          {!admin && <CreateTicket onClick={() => this.setState({ createModal: true })}>
            <CreateTicketIcon />
          </CreateTicket>}
        </Header>
        {!Boolean(chats.length) && <NoMessage />}
        {Boolean(chats.length) && <BodyTickets>
            <ListTicket container spacing={1}>
              {chats.map((i, ind) => {
                return (
                  <ListItem item xs={12} sm={12} active={activeTab === ind} onClick={this.onChangeTabs(ind)}>
                    <TitleList active={activeTab === ind}>{i.title}</TitleList>
                    {i.close && <LockOutlinedIcon active={activeTab === ind} />}
                  </ListItem>
                )
              })}

            </ListTicket>
            <LineTickets />
            <HeaderTicket>
              <StyledAvatar>{admin ? `${chats[activeTab].surname[0]}${chats[activeTab].name[0]}` : 'КР'}</StyledAvatar>
              <HeaderName>{admin ? `${chats[activeTab].surname} ${chats[activeTab].name}` : 'Команда разработчиков'}</HeaderName>
              <CloseTicket onClick={this.changeStatusTicket}>{!chats[activeTab].close ? 'Закрыть обращение' : 'Открыть обращение'}</CloseTicket>
            </HeaderTicket>
            <MessagesTicket container spacing={1} ref={message => this.message = message}>
              <MessageBodyPlace chats={chats} activeTab={activeTab} lvl={this.props.level.level_id}/>              
            </MessagesTicket>
            <SendMessage>
              {!chats[activeTab].close && <StyleTextField 
                placeholder='Напишите Ваше сообщение...' 
                fullWidth 
                value={textOpenMessage}
                onChange={e => this.setState({ textOpenMessage: e.target.value })}
                disabled={chats[activeTab].close}
                endAdornment={
                  <StyleInputAdornment position="end" onClick={this.sendMessage}>
                    <Send />
                  </StyleInputAdornment>
                }
                onKeyPress = {press => press.key === 'Enter' && this.sendMessage()}
              />}
              {chats[activeTab].close && <CloseText>Вы больше не можете писать по этому вопросу, так как Ваша проблема решена. Пожалуйста создайте новое обращение.</CloseText>}
            </SendMessage>
        </BodyTickets>}
      </Body> 
    )
  }
}

const CloseTicket = styled(Button)` && {
  position: absolute;
  right: 10px;
  top: 10px;
  background: #2285EE;
  color: #fff;
  width: 200px;
  padding: 9px;
  text-transform: none;
} &&:hover {
  background: #2285EE;
  color: #fff;
}`

const CloseText = styled.span`{
  position: absolute;
  max-width: calc(100% - 407px);
  height: 33px;
  left: 24px;
  bottom: 19px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  display: flex;
  align-items: center;
  justify-content: center;
}`

const LockOutlinedIcon = styled(LockOutlined)` && {
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${p=>p.active ? '#2285EE' : '#072D57'};
}`

const CountSendTab = styled.span`{
  position: absolute;
  left: 103px;
  top: 10px;
  min-width: 30px;
  max-width: 35px;
  height: 20px
  background: #2285EE;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`

const TitleList = styled.span`{
  position: absolute;
  width: 250px;
  height: 20px;
  left: 16px;
  top: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${p=>p.active ? '#2285EE' : '#072D57'};
  text-align: left;
}`

const StyleInputAdornment = styled(InputAdornment)` && {
  cursor: pointer;
}`

const StyleTextField = styled(Input)` && {
  padding: 2px 10px 2px 10px;
  border-bottom: none;
  background: #EBEEF1;
  border-radius: 4px;
  color: #072D57;
} &&:before {
  border-bottom: none;
} &&:after {
  border-bottom: none;
} &&:hover:not(.Mui-disabled):before {
  border-bottom: none;
}`

const SendMessage = styled.div`{
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 41px;
  max-height: 41px;
  width: calc(100% - 359px);
  border-top: 1px solid #E9F3FD;
  padding: 12px 16px 12px 16px;
}`

const MessagesTicket = styled(Grid)` && {
  position: absolute;
  top: 70px;
  right: 20px;
  max-height: ${document.documentElement.clientHeight - 290}px;
  width: calc(100% - 358px);
  overflow-y: auto;
  overflow-x: hidden;
}`

const HeaderName = styled.span`{
  position: absolute;
  top: 22px;
  left: 64px; 
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
}`

const StyledAvatar = styled(Avatar)` && {
  position: absolute;
  left: 16px;
  top: 12px;
  background: #E9F3FD;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
}`

const HeaderTicket = styled.span`{
  position: absolute;
  width: calc(100% - 325px);
  height: 64px;
  left: 325px;
  top: 0px;
  border-bottom: 1px solid #E9F3FD;
}`

const LineTickets = styled.div`{
  position: absolute;
  width: 1px;
  height: ${document.documentElement.clientHeight - 160}px;
  left: 325px;
  top: 0px;
  background: #E9F3FD;
}`

const ListItem = styled(Grid)` && {
  width: 320px;
  height: 64px;
  border-left: 4px solid ${p=>p.active ? '#2285EE' : '#F8FBFF'};
  margin: 2px 0 2px 0;
  cursor: pointer;
  background: ${p=>p.active ? '#F8FBFF' : '#FAFAFA'};
  position: relative;
  user-select: none;
}`

const ListTicket = styled(Grid)` && {
  position: absolute;
  left: 5px;
  width: 324px;
  top: 5px;
  max-height: ${document.documentElement.clientHeight - 160}px;
  overflow-y: auto;
}`

const BodyTickets = styled.div`{
  position: absolute;
  top: 81px;
  left: 16px;
  background: #fff;
  width: calc(100% - 32px);
  height: ${document.documentElement.clientHeight - 160}px;
  border-radius: 4px;
}`

const CreateTicket = styled.div`{
  cursor: pointer;
  position: absolute;
  width: 162px;
  height: 64px;
  top: 0px;
  right: 0px;
}`

const TextSendTab = styled.span`{
  position: absolute;
  width: 100px;
  height: 18px;
  left: 16px;
  top: 11px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  flex: none;
  order: 0;
  align-self: center;
}`

const SendTab = styled.span`{
  position: absolute;
  width: 149px;
  height: 40px;
  left: 16px;
  top: 12px;
  color: #2285EE;
  cursor: default;
  user-select: none;
  background: #E9F3FD;
  border-radius: 4px;
}`

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 70}px;
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
    width: ${document.documentElement.clientWidth - 70}px;
  }
`;

const Body = styled.div`{
  position: absolute;
  height: ${document.documentElement.scrollHeight - 64}px;
  right: 0px;
  top: 64px;
  background: ${p=>p.level === 0 ? '#E5E5E5' : '#222'};
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
  display: flex;
  justify-content: center;
  align-items: center;
}`

const Header = styled.div`{
  position: absolute;
  width: 100%
  height: 65px;
  left: 0px;
  top: 1px;
  background: ${p=>p.level === 0 ? '#ffffff' : '#2F363A'};
}`

const getAllUrlParams = (url) => {
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  let obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    let arr = queryString.split('&');
    arr.forEach((i,ind) => {
      let a = i.split('=');
      let paramNum = undefined;
      let paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      let paramValue = typeof(a[1])==='undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(paramValue);
        }
        else {
          obj[paramName][paramNum] = paramValue;
        }
      }
      else {
        obj[paramName] = paramValue;
      }
    })
  }
  return obj;
}

FeedBack.contextType = SocketConsumer;
export default withRouter(FeedBack)
