import React from 'react'
import MainTable from 'Comp/Break/MainTable'
import MyBreak from 'Comp/Break/MyBreak'
import StatBreak from 'Comp/Break/StatBreak'
import RuleBreak from 'Comp/Break/RuleBreak'

import NewTableBreak from 'Comp/Break/NewTable'

export const Break = (props) => {
  switch (props.page.search) {
    case '?stat':
      return <StatBreak {...props} />
    case '?rule':
      return <RuleBreak {...props} />
    default:
      return <NewTableBreak {...props} />
  }
}
