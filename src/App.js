import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import { SocketProvider } from 'ContextSocket'
import Main from 'Comp'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import { withSnackbar } from 'notistack';
const socket = socketIOClient("192.168.31.232:4001")

class App extends React.Component {

  state = {
    loader: false
  }

  componentDidMount = async () => {
    const { enqueueSnackbar } = this.props
    await socket.on('restart', async () => {
      enqueueSnackbar(`Сервер перезапущен. Настройка...`, {variant: 'info',autoHideDuration: 3000})
      this.setState({ loader: true })
      sleep(5000);
      window.location.reload()
    })
  }

  render () {
    const { loader } = this.state
    return (
      <SocketProvider value={{ socket: socket }}>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>
        <div className="App">
          <Main socket={socket} />
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
