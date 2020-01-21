import React, { Component } from 'react'
import styled from 'styled-components'

import AddRuleBreak from '../../Card/AddRuleBreak'
import MainRuleBreak from '../../Card/MainRuleBreak'
import MyBreakTemplate from '../../Card/MyBreakTemplate'

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
