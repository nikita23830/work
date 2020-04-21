import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Grid } from '@material-ui/core' 
import { SocketConsumer } from 'ContextSocket/index'
import { withRouter } from 'react-router-dom'
import { OpenNewsRead } from 'Comp/NewNews/OpenNewsRead'
import { addZero } from 'Comp/Break/NewTable/tools'
import { Circle1, Circle2, Circle3, Circle4 } from 'Comp/NewNews/svg'

class Search extends React.Component {

  state = {
    news: [],
    img: [],
    read: 0,
    lastSearch: '',
    empty: true,
    loader: true
  }

    componentDidMount = () => {
        const { socket } = this.context
        const { search } = this.props.page
        let searchText = encodeURI(search)
        if (!search || search === '?') { this.props.history.push('/'); return 0; } // если пустой запрос то кидаем на новости
        socket.emit('searchGlobal', search.slice(1))
        this.setState({ lastSearch: search.slice })
        socket.on('searchGlobal', (data) => {
          if (data.empty) this.setState({ empty: true, loader: false })
          else this.setState({ news: data.news, img: data.img, empty: false, loader: false })
        })
        socket.on('send_error', (data) => {
          console.log(data)
      })
    }

    componentWillReceiveProps(nextProps) {
      const { lastSearch } = this.state
      const { page } = nextProps
      const { socket } = this.context
      if (page.search !== lastSearch) {
        socket.emit('searchGlobal', page.search.slice(1)) 
        this.setState({ loader: true })
      }
    }

    render() {
        const { drawer, level, page } = this.props
        const { URL_SERVER } = this.context
        const { news, img, read, empty, loader } = this.state
        return (
            <RootNews drawer={drawer} level={level.level_id}>
                {loader && <Loader><Circle1 /><Circle2 /><Circle3 /><Circle4 /></Loader>}
                {/*!Boolean(news.length) && <NotNews>
                    <CircleNews level={LEVEL_NEWS}/>
                    <StyleText>
                    {LEVEL_NEWS === 2 ? <>Новости отсутствую.<br />
                        <Customlink onClick={onOpenNews}>Добавьте свою первую новость</Customlink>
                    ,<br /> чтобы она тут появилась</> :
                    <>Новости отсутствую. <br />Администратор еще не добавил статьи и новости,<br /> пожалуйста напомните :)</>}
                    </StyleText>
                    </NotNews>*/}
                {!empty && <ListNews container spacing={1}>
                  {news.map((i, ind) => (
                    <Result item xs={12} sm={12} onClick={() => this.setState({ read: ind })}>
                      <ResultTitle>{i.title}</ResultTitle>
                      <ResultText>{i.text}</ResultText>
                      <AuthorAndDate>
                        {i.surname} {i.name} {i.date}
                      </AuthorAndDate>
                    </Result>
                  ))}
                </ListNews>}
                {!empty && news.length > 0 && <OpenNewsRead
                  URL_SERVER={URL_SERVER}
                  LEVEL_NEWS={level.news_lvl}
                  news={news[read]}
                  imgReadNews={img.filter(i => i.id_news === news[read].id)} 
                  like={[]} 
                  readNews={read} 
                  people_id={0} 
                  installLike={() => {}} 
                  deleteLike={() => {}} 
                  dissableLike={true}
                />}
            </RootNews>
        )
    }
}

const animation = keyframes`
  0% {
    transform: rotate(0)
  }
  50% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const Loader = styled.div`{
  position: absolute;
  width: 96px;
  height: 96px;
  top: 50%;
  left: 50%;
  animation: ${animation} 3s linear infinite;
  z-index: 10
}`

const AuthorAndDate = styled.span`{
  position: absolute;
  right: 16px;
  top: 17px;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #B7C2CE;
}`

const ResultText = styled.span`{
  position: absolute;
  top: 45px;
  left: 16px;
  max-width: calc(100% - 32px);
  max-height: 34px;
  overflow: hidden; 
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #1D3F66;
  text-align: left;
}`

const ResultTitle = styled.span`{
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  position: absolute;
  top: 12px;
  left: 16px;
  max-width: 361px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  text-align: left;
}`

const Result = styled(Grid)` && {
  height: 100px;
  background: #FFFFFF;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  margin: 2px;
}`

const ListNews = styled(Grid)` && {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 705px;
    max-height: ${document.documentElement.clientHeight - 80}px;
    overflow-y: auto;
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

const RootNews = styled.div`{
    position: absolute;
    top: 65px;
    right: 0px;
    width: ${p=>p.drawer ? document.documentElement.clientWidth - 260 : document.documentElement.clientWidth - 72}px;
    animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
    height: ${document.documentElement.clientHeight - 65}px;
    background: ${p=>p.level === 0 ? '#ffffff' : '#2F363A'};
}`

Search.contextType = SocketConsumer;
export default withRouter(Search)