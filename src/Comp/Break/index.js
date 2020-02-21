import React from 'react'
import StatBreak from 'Comp/Break/StatBreak'
import RuleBreak from 'Comp/Break/RuleBreak'
import NewTableBreak from 'Comp/Break/NewTable'


export const Break = (props) => {
  if (props.level.break_lvl === 1) return <NewTableBreak {...props} />
  switch (props.page.search) {
    case '?stat':
      return <StatBreak {...props} />
    case '?rule':
      return <RuleBreak {...props} />
    default:
      return <NewTableBreak {...props} />
  }
}
