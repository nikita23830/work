import React, { Component } from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

import MyBreakMain from '../../Card/MyBreakMain'
import MyBreakGInfo from '../../Card/MyBreakGInfo'
import MyBreakTemplate from '../../Card/MyBreakTemplate'
import { SocketConsumer } from '../../../ContextSocket/index'
import { checkBreakList } from './tools'

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
    return (
      <StyledDiv>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>

        <MyBreakMain deleteMyBreak={this.deleteMyBreak} list={list}/>

        <StyleDivInfo>
          <MyBreakGInfo list={list}/>
        </StyleDivInfo>
      </StyledDiv>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
}`

const StyleDivInfo = styled.div` && {
  display: flex;
  flex-direction: column;
}`

MyBreak.contextType = SocketConsumer;
export default MyBreak
