import React, { Component } from 'react'
import styled from 'styled-components'
import { withCookies, Cookies } from 'react-cookie';
import GetPageContent from 'Comp/Router'

import DefAppBar from 'Comp/AppBar'
import Auth from 'Comp/Auth'
import Loader from 'Comp/loader'
import Push from 'push.js'

import NewMenu from 'Comp/NewMenu'

class Main extends Component {

  state = {
    page: 0,
    drawer: true,
    needAuth: true,
    login: '',
    people_id: -1,
    loader: true,
    level: [0,0,0,0,0,0],
    prev_page: 0,
    openNews: false,
    people_name: ['', '']
  }

  onOpenNews = () => this.setState({ openNews: true })
  onCloseNews = () => this.setState({ openNews: false })

  openDrawer = () => this.setState({ drawer: !this.state.drawer })

  onChangePage = (index) => () => {
    this.setState({ prev_page: this.state.page, page: index })
	  localStorage.setItem('activePage', index)
  }

  onCheckAuth = async (uid, login) => {
    const { cookies, socket } = this.props
    await cookies.set('token', uid, { path: '/' });
    await this.setState({ needAuth: false })
    await socket.emit('addLogin', {type: 'login', login: login})
  }

  onBackPage = () => this.setState({ page: this.state.prev_page })

  onExit = () => {
    const { cookies } = this.props
    cookies.remove('token')
    window.location.reload()
  }

  async componentWillMount() {
    const { cookies, socket } = this.props
    const uid = cookies.get('token')
    if (uid) this.setState({ needAuth: false })
    let page = localStorage.getItem('activePage')
	  this.setState({ page: page === null ? 0 : +page })
  }

  async componentDidMount() {
    const { needAuth } = this.state
    const { cookies, socket, URL_SERVER } = this.props
    const uid = cookies.get('token')
    await socket.emit('newCon', '')
    if (!needAuth) await socket.emit('addLogin', {type: 'uid', uid: uid})
    await socket.on('addLogin', (data) => {
      this.setState({ login: data.login, people_id: data.people_id, loader: false, people_name: [data.name, data.surname] })
    })
    await socket.on('checkLevel', (data) => {
      this.setState({ level: data })
    })
    await socket.on('pushNotifNewNews', (data) => {
      Push.create("Появилась новая новость", {
          body: "Нажмите для открытия сайта",
          icon: `${URL_SERVER}/push`,
          timeout: 4000,
          onClick: function () {
              window.focus();
              this.close();
          }
      });
    })
  }

  render () {
    const { openDialogTable, page, drawer, needAuth, loader, people_id, level, openNews, people_name } = this.state
    const { socket, location } = this.props
    if (needAuth) return (
      <Auth socket={socket} submit={this.onCheckAuth}/>
    )
    else if (loader) return (
      <Loader />
    )
    else return (
      <>
        <DefAppBar
          openDrawer={this.openDrawer}
          onExit={this.onExit}
          onChangePage={this.onChangePage}
          page={location}
          drawer={drawer}
          level={level}
          onOpenNews={this.onOpenNews}
          people_name={people_name}
        />

        <NewMenu onChangePage={this.onChangePage} drawer={drawer} openDrawer={this.openDrawer} level={level} page={page}/>

        <StyleMainDiv>

          <GetPageContent 
            people_name={people_name}
            page={location}
            people_id={people_id}
            level={level}
            onBackPage={this.onBackPage}
            drawer={drawer}
            openNews={openNews}
            onOpenNews={this.onOpenNews}
            onCloseNews={this.onCloseNews}
          />

        </StyleMainDiv>
      </>
    )
  }
}



const StyleMainDiv = styled.div` && {
  min-width: 600px;
  height: 100%;
  margin-top: 5px;
}`

export default withCookies(Main)
