import React, { Component } from 'react'
import styled from 'styled-components'

import MyBreakMain from 'Comp/Card/MyBreakMain'
import MyBreakGInfo from 'Comp/Card/MyBreakGInfo'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'

class MyBreak extends Component {

  render () {
    return (
      <StyledDiv>
        <MyBreakMain />

        <StyleDivInfo>
          <MyBreakGInfo />
        </StyleDivInfo>
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

export default MyBreak
