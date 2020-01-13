import React, { Component } from 'react'
import styled from 'styled-components'
import { withCookies, Cookies } from 'react-cookie';
import MainTable from 'Comp/MainTable'
import MainPage from 'Comp/MainPage'
import DefAppBar from 'Comp/AppBar'
import DefDrawer from 'Comp/Drawer'
import MyBreak from 'Comp/MyBreak'
import StatBreak from 'Comp/StatBreak'
import RuleBreak from 'Comp/RuleBreak'
import ChipCheckServer from 'Comp/ChipCheckServer'
import ReportTask from 'Comp/Report/ReportTask'
import EveryDayGame from 'Comp/Rating/EveryDayGame'
import AdminGame from 'Comp/Rating/AdminGame'
import Rating from 'Comp/Rating'
import Profile from 'Comp/Rating/Profile'
import EveryDayReport from 'Comp/Report/EveryDayReport'
import RatingShop from 'Comp/Rating/Shop'
import Auth from 'Comp/Auth'

import RouterTest from 'Comp/Testing/router'


class Main extends Component {

  state = {
    page: 0,
    drawer: false,
    needAuth: true,
    login: '',
    people_id: -1,
  }

  openDrawer = () => this.setState({ drawer: !this.state.drawer })

  onChangePage = (index) => () => {
    this.setState({ page: index, drawer: false })
	  localStorage.setItem('activePage', index)
  }

  onCheckAuth = async (uid, login) => {
    const { cookies, socket } = this.props
    await cookies.set('token', uid, { path: '/' });
    await this.setState({ needAuth: false })
    await socket.emit('addLogin', {type: 'login', login: login})
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
      this.setState({ login: data.login, people_id: data.people_id})
    })
  }

  render () {
    const { openDialogTable, page, drawer, needAuth } = this.state
    const { socket } = this.props
    if (needAuth) return (
      <Auth socket={socket} submit={this.onCheckAuth}/>
    )
    else return (
      <>
        <DefAppBar openDrawer={this.openDrawer} />

        <DefDrawer onChangePage={this.onChangePage} drawer={drawer} openDrawer={this.openDrawer}/>

        <StyleMainDiv>

          {getPageContent({ page })}

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

    case 1:
      return (
        <MainTable {...props} />
      );

    case 2:
      return (
        <MyBreak {...props} />
      );

    case 3:
      return (
        <StatBreak {...props} />
      );

    case 4:
      return (
        <RuleBreak {...props} />
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

    default: return (<h1>Not dev... Sorry By nikita23830</h1>)

  }
}

const StyleMainDiv = styled.div` && {
  min-width: 600px;
  height: 100%;
  margin-top: 5px;
}`


export default withCookies(Main)
