import React, { Component } from 'react'
import styled from 'styled-components'

import AddRuleBreak from 'Comp/Card/AddRuleBreak'
import MainRuleBreak from 'Comp/Card/MainRuleBreak'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'

class RuleBreak extends Component {

  render () {
    const { onChangeTab, level } = this.props
    if (!Boolean(level)) onChangeTab(0)()
    return (
      <>
        <AddRuleBreak {...this.props} />

        <MainRuleBreak {...this.props} />
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
