import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { CircularProgress, Grid } from '@material-ui/core'

import MyBreakMain from 'Comp/Card/MyBreakMain'
import MyBreakGInfo from 'Comp/Card/MyBreakGInfo'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'
import { SocketConsumer } from 'ContextSocket/index'
import { checkBreakList } from 'Comp/Break/MyBreak/tools'

class MyBreak extends Component {

  state={
    list: [],
    loader: true,
  }

  deleteMyBreak = (id) => async () => {
    const { list } = this.state
    const { socket } = this.context
    await this.setState({ loader: true })
    await socket.emit('deleteMyBreak', list[id][2])
  }

  componentDidMount = async () => {
    const { socket } = this.context
    await socket.emit('getMyBreak', '')
    await socket.on('getMyBreak', async (data) => {
      if (data.wait) {
        await sleep(500);
        await socket.emit('getMyBreak', '')
      }
      else {
        await this.setState({ list: checkBreakList(data.data), loader: false })
      }
    })
    await socket.on('send_error', async (data) => {
      console.log('error', data)
    })
  }

  render () {
    const { list, loader } = this.state
    const { drawer } = this.props
    return (
      <StyledDiv drawer={drawer}>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <MyBreakMain deleteMyBreak={this.deleteMyBreak} list={list}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyleDivInfo>
              <MyBreakGInfo list={list}/>
            </StyleDivInfo>
          </Grid>
        </Grid>
      </StyledDiv>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
`;

const closeDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
`;

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

const StyledDiv = styled.div` && {
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 10px;
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
}`

const StyleDivInfo = styled.div` && {
  display: flex;
  flex-direction: column;
}`

MyBreak.contextType = SocketConsumer;
export default MyBreak
