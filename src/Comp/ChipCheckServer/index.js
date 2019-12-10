import React, { Component } from 'react'
import { Chip,
  Avatar,
} from '@material-ui/core'
import styled, { keyframes } from "styled-components"
import { Done, Cached } from '@material-ui/icons'

class ChipCheckServer extends Component {


  render () {
    return (
      <>
      </>
    )
  }
}

const StyledChip = styled(Chip)` && {
  width: 23px;
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 1301
  height: 25px;
  padding-left: 15px;
}`

const keyFrames = keyframes`
  0% {
    transform: rotate(-360deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`

const CustomAvatar = styled(Avatar)` && {
  animation: ${keyFrames} 1s linear 0s normal none infinite running;
}`

export default ChipCheckServer
