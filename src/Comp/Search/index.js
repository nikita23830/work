import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Grid } from '@material-ui/core' 
import { SocketConsumer } from 'ContextSocket/index'
import { withRouter } from 'react-router-dom'

class Search extends React.Component {

    componentDidMount = () => {
        const { socket } = this.context
        const { search } = this.props.page
        let searchText = encodeURI(search)
        if (!search || search === '?') { this.props.history.push('/'); return 0; } // если пустой запрос то кидаем на новости
        socket.emit('searchGlobal', search.slice(1))
        socket.on('searchGlobal', (data) => {
            console.log(data)
        })
    }

    render() {
        const { drawer } = this.props
        return (
            <RootNews drawer={drawer}>
                {/*!Boolean(news.length) && <NotNews>
                    <CircleNews level={LEVEL_NEWS}/>
                    <StyleText>
                    {LEVEL_NEWS === 2 ? <>Новости отсутствую.<br />
                        <Customlink onClick={onOpenNews}>Добавьте свою первую новость</Customlink>
                    ,<br /> чтобы она тут появилась</> :
                    <>Новости отсутствую. <br />Администратор еще не добавил статьи и новости,<br /> пожалуйста напомните :)</>}
                    </StyleText>
                    </NotNews>*/}
                <ListNews
                    container 
                    spacing={1}
                />
                <OpenNewsRead 

                />
            </RootNews>
        )
    }
}

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
    background: #E5E5E5;
}`

const OpenNewsRead = styled.div`{
    position: absolute;
    top: 12px;
    left: 721px;
    width: calc(100% - 737px);
    height: ${document.documentElement.clientHeight - 80}px;
    overflow-y: auto;
    background: #fff;
}`

Search.contextType = SocketConsumer;
export default withRouter(Search)