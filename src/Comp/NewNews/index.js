import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FirstModal } from 'Comp/NewNews/FirstModal'
import { SocketConsumer } from 'ContextSocket/index'
import { CircleNews } from 'Comp/NewNews/svg'
import NewPost from 'Comp/NewNews/New'

class NewNews extends React.Component {

  state = {
    newUser: localStorage.getItem('newUser'),
    newPost: false
  }

  onNewUser = () => {
    this.setState({ newUser: true })
    localStorage.setItem('newUser', true)
  }

  onCreatePost = () => this.setState({ newPost: true })

  render () {
    const { drawer, level, openNews, onOpenNews, onCloseNews } = this.props
    const { socket, URL_SERVER } = this.context
    const { newUser, newPost } = this.state
    const LEVEL_NEWS = level.dev // поправить как внесу поправки в БД
    return (
      <>
        {openNews && <NewPost onCloseNews={onCloseNews} />}

        <RootNews drawer={drawer}>
          <FirstModal URL_SERVER={URL_SERVER} newUser={newUser} onNewUser={this.onNewUser} />
          <NotNews>
            <CircleNews level={LEVEL_NEWS}/>
            <StyleText>
              {LEVEL_NEWS === 2 ? <>Новости отсутствую.<br />
                <Customlink onClick={onOpenNews}>Добавьте свою первую новость</Customlink>
              ,<br /> чтобы она тут появилась</> :
              <>Новости отсутствую. <br />Администратор еще не добавил статьи и новости,<br /> пожалуйста напомните :)</>}
            </StyleText>
          </NotNews>
        </RootNews>
      </>
    )
  }
}

NewNews.contextType = SocketConsumer;
export default NewNews

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

const Customlink = styled.span`{
  color: #2285EE;
  text-decoration: underline;
  cursor: pointer;
}`

const StyleText = styled.p`{
  width: 311px;
  height: 57px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

const NotNews = styled.div` {
  position: absolute;
  width: 311px;
  height: 329px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}`

const RootNews = styled.div` {
  position: absolute;
  top: 65px;
  right: 0px;
  width: ${p=>p.drawer ? document.documentElement.clientWidth - 260 : document.documentElement.clientWidth - 72}px;
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
  height: ${document.documentElement.clientHeight - 65}px;
  background: #E5E5E5;
}`
