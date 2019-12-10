import React, { Component } from 'react'
import styled from 'styled-components'

import AddRuleBreak from 'Comp/Card/AddRuleBreak'
import MainRuleBreak from 'Comp/Card/MainRuleBreak'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'

class RuleBreak extends Component {

  render () {
    return (
      <>
        <AddRuleBreak />

        <MainRuleBreak />

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

export default RuleBreak
