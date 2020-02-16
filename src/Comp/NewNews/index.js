import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FirstModal } from 'Comp/NewNews/FirstModal'
import { SocketConsumer } from 'ContextSocket/index'
import { CircleNews } from 'Comp/NewNews/svg'
import NewPost from 'Comp/NewNews/New'
import { withSnackbar } from 'notistack';
import { ListNews } from 'Comp/NewNews/ListNews'
import { OpenNewsRead } from 'Comp/NewNews/OpenNewsRead'

class NewNews extends React.Component {

  state = {
    newUser: localStorage.getItem('newUser'),
    newPost: false,
    news: [],
    imgNews: [],
    lastID: 0,
    readNews: 0,
    aviableMore: true,
    like: []
  }

  onClickNews = (id) => () => this.setState({ readNews: id })

  onNewUser = () => {
    this.setState({ newUser: true })
    localStorage.setItem('newUser', true)
  }

  getMoreNews = () => {
    const { socket } = this.context
    const { lastID } = this.state
    socket.emit('moreNews', lastID)
  }

  installLike = (id) => () => {
    const { socket } = this.context
    socket.emit('installLike', id)
  }

  deleteLike = (id) => () => {
    const { socket } = this.context
    socket.emit('deleteLike', id)
  }

  componentDidMount = async() => {
    const { socket } = this.context
    await socket.emit('getNews', {})
    await socket.on('getNews', data => {
      let lastID = Math.min.apply(null, data.news.map(i => i.id))
      this.setState({ news: data.news, imgNews: data.img, lastID: lastID })
    })
    await socket.on('moreNews', (data) => {
      if (data.news.length === 0) { this.setState({ aviableMore: false }); return 0; }
      let lastID = Math.min.apply(null, data.news.map(i => i.id))
      this.setState({ news: [...this.state.news, ...data.news], imgNews: [...this.state.imgNews, ...data.img], lastID: lastID })
    })
    await socket.on('getLike', (data) => {
      const { news } = this.state
      let like = []
      news.map((i, ind) => {
        if (!like[ind]) like[ind] = []
        like[ind] = data.filter(j => j.news_id === i.id)
      })
      this.setState({ like: [...this.state.like, ...like] })
    })
    await socket.on('send_error', (data) => {
      console.log(data)
    })
    await socket.on('newLike', (data) => {
      const { news } = this.state
      let newLike = [...this.state.like]
      news.forEach((i, ind) => {
        if (i.id === data.news_id) { if (!newLike[ind]) newLike[ind] = []; newLike[ind].push(data); }
      })
      this.setState({ like: newLike })
    })
    await socket.on('deleteLike', (data) => {
      const { news } = this.state
      let newLike = [...this.state.like]
      news.forEach((i, ind) => {
        if (i.id === data.id) { newLike[ind] = newLike[ind].filter(j => j.people_id !== data.people_id) }
      })
      this.setState({ like: newLike })
    })
  }

  render () {
    const { drawer, level, openNews, onOpenNews, onCloseNews, people_name, people_id } = this.props
    const { socket, URL_SERVER } = this.context
    const { newUser, news, imgNews, readNews, aviableMore, like } = this.state
    const LEVEL_NEWS = level.dev // поправить как внесу поправки в БД
    let imgReadNews = imgNews.filter(i => i.id_news === news[readNews].id)
    return (
      <>
        {openNews && <NewPost onCloseNews={onCloseNews} people_name={people_name} />}

        <RootNews drawer={drawer}>
          <FirstModal URL_SERVER={URL_SERVER} newUser={newUser} onNewUser={this.onNewUser} />
          {!Boolean(news.length) && <NotNews>
            <CircleNews level={LEVEL_NEWS}/>
            <StyleText>
              {LEVEL_NEWS === 2 ? <>Новости отсутствую.<br />
                <Customlink onClick={onOpenNews}>Добавьте свою первую новость</Customlink>
              ,<br /> чтобы она тут появилась</> :
              <>Новости отсутствую. <br />Администратор еще не добавил статьи и новости,<br /> пожалуйста напомните :)</>}
            </StyleText>
          </NotNews>}
          {Boolean(news.length) && <>
            <ListNews news={news} imgNews={imgNews} URL_SERVER={URL_SERVER} onClickNews={this.onClickNews} getMoreNews={this.getMoreNews} aviableMore={aviableMore} like={like} />
            <OpenNewsRead 
              URL_SERVER={URL_SERVER} 
              LEVEL_NEWS={LEVEL_NEWS} 
              news={news[readNews]} 
              imgReadNews={imgReadNews} 
              like={like} 
              readNews={readNews}
              people_id={people_id}
              installLike={this.installLike}
              deleteLike={this.deleteLike}
            />
          </>}
        </RootNews>
      </>
    )
  }
}

NewNews.contextType = SocketConsumer;
export default withSnackbar(NewNews)

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
