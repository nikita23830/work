import React from 'react'
import MainTable from 'Comp/Break/MainTable'
import MyBreak from 'Comp/Break/MyBreak'
import StatBreak from 'Comp/Break/StatBreak'
import RuleBreak from 'Comp/Break/RuleBreak'

export const Break = (props) => {
  switch (props.page.search) {
    case '?my': 
      return <MyBreak {...props} />
    case '?stat':
      return <StatBreak {...props} />
    case '?rule':
      return <RuleBreak {...props} />
    default:
      return <MainTable {...props} />
  }
}
