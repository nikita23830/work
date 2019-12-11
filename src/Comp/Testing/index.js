import React, { Component } from 'react'
import styled from 'styled-components'

import TestList from 'Comp/Testing/TestList'
import ActiveTest from 'Comp/Testing/ActiveTest'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'

class Testing extends Component {

  state = {
    activeTest: 1,
  }

  render () {
    const { activeTest } = this.state
    return (
      <StyledDiv>
        {activeTest ? <ActiveTest /> : <TestList />}
      </StyledDiv>
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

export default Testing
