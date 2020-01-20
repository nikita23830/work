import React, { Component } from 'react'
import styled from 'styled-components'
import { withCookies, Cookies } from 'react-cookie';

import { Break } from 'Comp/Break'

import MainPage from 'Comp/MainPage'
import DefAppBar from 'Comp/AppBar'
import DefDrawer from 'Comp/Drawer'
import ChipCheckServer from 'Comp/ChipCheckServer'
import ReportTask from 'Comp/Report/ReportTask'
import EveryDayGame from 'Comp/Rating/EveryDayGame'
import AdminGame from 'Comp/Rating/AdminGame'
import Rating from 'Comp/Rating'
import Profile from 'Comp/Rating/Profile'
import EveryDayReport from 'Comp/Report/EveryDayReport'
import RatingShop from 'Comp/Rating/Shop'
import Auth from 'Comp/Auth'
import { CircularProgress } from '@material-ui/core'

import RouterTest from 'Comp/Testing/router'
import Administartion from 'Comp/Admin'


class Main extends Component {

  state = {
    page: 0,
    drawer: false,
    needAuth: true,
    login: '',
    people_id: -1,
    loader: true,
    level: [0,0,0,0,0,0],
    prev_page: 0
  }

  openDrawer = () => this.setState({ drawer: !this.state.drawer })

  onChangePage = (index) => () => {
    this.setState({ prev_page: this.state.page, page: index, drawer: false })
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
    const { cookies, socket } = this.props
    const uid = cookies.get('token')
    await socket.emit('newCon', '')
    if (!needAuth) await socket.emit('addLogin', {type: 'uid', uid: uid})
    await socket.on('addLogin', (data) => {
      this.setState({ login: data.login, people_id: data.people_id })
    })
    await socket.on('checkLevel', (data) => {
      console.log(data)
      this.setState({ level: data, loader: false })
    })
  }

  render () {
    const { openDialogTable, page, drawer, needAuth, loader, people_id, level } = this.state
    const { socket } = this.props
    if (needAuth) return (
      <Auth socket={socket} submit={this.onCheckAuth}/>
    )
    else if (loader) return (
      <Loader loader={true}>
        <CircularProgress />
      </Loader>
    )
    else return (
      <>
        <DefAppBar openDrawer={this.openDrawer} onExit={this.onExit} onChangePage={this.onChangePage} page={page}/>

        <DefDrawer onChangePage={this.onChangePage} drawer={drawer} openDrawer={this.openDrawer} level={level} />

        <StyleMainDiv>

          {getPageContent({ page: page, people_id: people_id, level: level })}

        <ChipCheckServer />
        </StyleMainDiv>
      </>
    )
  }
}

const getPageContent = props => {
  const { page } = props
  switch (page) {
    case 0:
      return (
        <MainPage {...props} />
      );

    case 1: case 2: case 3: case 4:
      return (
        <Break {...props} />
      );

    case 5:
      return (
        <ReportTask {...props} />
      )

	  case 8:
      return (
        <EveryDayReport {...props} />
      )

    case 10: case 11: case 12: case 13:
      return (
        <RouterTest {...props} />
      );

  	case 14:
        return (
          <Rating {...props} />
        );

  	case 15:
  	  return (
  		    <Profile {...props} />
  	  );

    case 16:
      return (
        <RatingShop {...props} />
      )

    case 17:
      return (
        <EveryDayGame {...props} />
      );

    case 18:
      return (
        <AdminGame {...props} />
      );

    case 20:
      return (
        <Administartion {...props} />
      )

    default: return (<h1>Not dev... Sorry By nikita23830</h1>)

  }
}

const StyleMainDiv = styled.div` && {
  min-width: 600px;
  height: 100%;
  margin-top: 5px;
}`

const Loader = styled.div` {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  display: ${p=>p.loader ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1;
}`

export default withCookies(Main)
