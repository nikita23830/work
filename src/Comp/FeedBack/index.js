import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SocketConsumer } from 'ContextSocket'
import { withSnackbar } from 'notistack';
import { Send, NoMessage, MailBox, DeleteIcon } from 'Comp/FeedBack/Svg'
import { Grid } from '@material-ui/core'

class FeedBack extends React.Component {

  state={
    activeTab: 0,
    message: [
      [{
        id: 0,
        title: 'test',
        text: 'test text'
      }],
      []
    ]
  }

  onChangeTabs = (id) => () => this.setState({ activeTab: id })

  render () {
    const { drawer } = this.props
    const { activeTab, message } = this.state
    return (
      <Body drawer={drawer}>
        <Header>
          <SendTab index={0} activeTab={activeTab} onClick={this.onChangeTabs(0)}>
            <StyleSend>
              <Send active={activeTab === 0} />
            </StyleSend>
            <TextSendTab>Открытые</TextSendTab>
          </SendTab>
          <SendTab index={1} activeTab={activeTab} onClick={this.onChangeTabs(1)}>
            <TextSendTab>Закрытые</TextSendTab>
          </SendTab>
        </Header>
        {!Boolean(message[activeTab].length) && <NoMessage />}

        {Boolean(message[activeTab].length) && <StyleGrid container spacing={1} drawer={drawer}>
          <CustomGrid items xs={12} sm={12}>
            <SpanMail><MailBox /></SpanMail>
            <SpanTitle>Не добавлено ни одного приложения</SpanTitle>
            <SpanText>Здраствуйте, pingwin4iks@gmail.com! Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались</SpanText>
            <SpanDelete><DeleteIcon /></SpanDelete>
          </CustomGrid>
          <CustomGrid items xs={12} sm={12}>
            <SpanMail><MailBox /></SpanMail>
            <SpanTitle>Не добавлено ни одного приложения</SpanTitle>
            <SpanText>Здраствуйте, pingwin4iks@gmail.com! Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались</SpanText>
            <SpanDelete><DeleteIcon /></SpanDelete>
          </CustomGrid>
          <CustomGrid items xs={12} sm={12}>
            <SpanMail><MailBox /></SpanMail>
            <SpanTitle>Не добавлено ни одного приложения</SpanTitle>
            <SpanText>Здраствуйте, pingwin4iks@gmail.com! Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались</SpanText>
            <SpanDelete><DeleteIcon /></SpanDelete>
          </CustomGrid>
          <CustomGrid items xs={12} sm={12}>
            <SpanMail><MailBox /></SpanMail>
            <SpanTitle>Не добавлено ни одного приложения</SpanTitle>
            <SpanText>Здраствуйте, pingwin4iks@gmail.com! Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались</SpanText>
            <SpanDelete><DeleteIcon /></SpanDelete>
          </CustomGrid>
          <CustomGrid items xs={12} sm={12}>
            <SpanMail><MailBox /></SpanMail>
            <SpanTitle>Не добавлено ни одного приложения</SpanTitle>
            <SpanText>Здраствуйте, pingwin4iks@gmail.com! Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались Вы зарегистрировались</SpanText>
            <SpanDelete><DeleteIcon /></SpanDelete>
          </CustomGrid>
        </StyleGrid>}
      </Body> 
    )
  }
}

const SpanDelete = styled.span`{
  position: absolute;
  top: 20px;
  right: 20px;
  display: none;
  cursor: pointer;
}`

const SpanText = styled.span`{
  position: absolute;
  width: ${document.documentElement.clientWidth - 739}px;
  height: 19px;
  left: 384px;
  top: 23px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA
}`

const SpanTitle = styled.span`{
  position: absolute;
  width: 300px;
  height: 19px;
  left: 68px;
  top: 23px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
}`

const SpanMail = styled.span`{
  position: absolute;
  width: 24px;
  height: 24px;
  left: 20px;
  top: 20px;
}`

const CustomGrid = styled(Grid)` && {
  height: 65px;
  position: relative;
  background: #FFFFFF;
} &&:hover {
  ${SpanDelete} {
    display: block;
  }
}`

const onOpenDrawerStyleGrid = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 97}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 287}px;
  }
`

const onCloseDrawerStyleGrid = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 287}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 97}px;
  }
`

const StyleGrid = styled(Grid)` && {
  position: absolute;
  animation: ${p=>p.drawer ? onOpenDrawerStyleGrid : onCloseDrawerStyleGrid} 0.2s linear both;
  height: ${document.documentElement.clientHeight - 155}px;
  left: 16px;
  top: 80px;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: none;
}`

const StyleSend = styled.span`{
  position: absolute;
  width: 24px;
  height: 24px;
  left: 24px;
  top: 20px;
}`

const TextSendTab = styled.span`{
  position: absolute;
  width: 106px;
  height: 19px;
  left: 56px;
  top: 22px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  text-align: left;
}`

const SendTab = styled.span`{
  position: absolute;
  width: 186px;
  height: 63px;
  left: ${p=>p.index * 186}px;
  top: 0px;
  border-bottom: ${p=>p.activeTab === p.index ? 2 : 0}px solid #2285EE;
  color: ${p=>p.activeTab === p.index ? '#2285EE' : '#99A9BA'};
  cursor: pointer;
  user-select: none;
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
  background: #E5E5E5;
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
  background: #FFFFFF;
}`

FeedBack.contextType = SocketConsumer;
export default withSnackbar(FeedBack)
