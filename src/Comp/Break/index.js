import React from 'react'
import MainTable from 'Comp/Break/MainTable'
import MyBreak from 'Comp/Break/MyBreak'
import StatBreak from 'Comp/Break/StatBreak'
import RuleBreak from 'Comp/Break/RuleBreak'

export const Break = (props) => {
  switch (props.page) {
    case 1:
      return <MainTable {...props} />
    case 2:
      return <MyBreak {...props} />
    case 3:
      return <StatBreak {...props} />
    case 4:
      return <RuleBreak {...props} />
  }
}
