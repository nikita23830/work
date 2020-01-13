import React, { Component } from 'react'
import styled from 'styled-components'

import StatBreakMain from 'Comp/Card/StatBreakMain'
import StatBreakList from 'Comp/Card/StatBreakList'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'
import { SocketConsumer } from 'ContextSocket/index'

class StatBreak extends Component {

  componentDidMount() {
    console.log(this.context)
  }

  render () {
    return (
      <>

        <StatBreakMain />
        <StyledDiv>

          <StatBreakList />

        </StyledDiv>
      </>
    )
  }
}


const StyledDiv = styled.div` && {
  display: flex;
  flex-direction: row;
}`

const StyleDivInfo = styled.div` && {
  display: flex;
  flex-direction: column;
}`

StatBreak.contextType = SocketConsumer;
export default StatBreak
