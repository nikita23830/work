import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { SocketProvider } from 'ContextSocket'
import Main from 'Comp'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import { withSnackbar } from 'notistack';

const URL_SERVER = 'http://localhost:4001'

// const URL_SERVER = '10.254.4.41:4001'
const socket = socketIOClient(URL_SERVER)

class App extends React.Component {

  state = {
    loader: false
  }

  componentDidMount = async () => {
    const { enqueueSnackbar } = this.props
    await socket.on('restart', async () => {
      enqueueSnackbar(`Сервер был перезапущен. Настройка...`, {variant: 'info',autoHideDuration: 3000})
      this.setState({ loader: true })
      sleep(5000);
      window.location.reload()
    })
    await socket.on('disconnect', (data) => {
      console.log('Сервер остановлен!')
    })
  }

  render () {
    const { loader } = this.state
    return (
      <SocketProvider value={{ socket: socket, URL_SERVER: URL_SERVER }}>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>
        <div className="App">
          <Main socket={socket} URL_SERVER={URL_SERVER} {...this.props} />
        </div>
      </SocketProvider>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default withSnackbar(App)

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
