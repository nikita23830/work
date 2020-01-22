import React from 'react'
import MainTable from 'Comp/Break/MainTable'
import MyBreak from 'Comp/Break/MyBreak'
import StatBreak from 'Comp/Break/StatBreak'
import RuleBreak from 'Comp/Break/RuleBreak'
import Forbidden from 'Comp/Forbidden'

export const Break = (props) => {
  switch (props.page) {
    case 1: {
      if (props.level[1] === 0) return <Forbidden {...props}/>
      else return <MainTable {...props} />
    }
    case 2: {
      if (props.level[1] === 0) return <Forbidden {...props}/>
      else return <MyBreak {...props} />
    }
    case 3: {
      if (props.level[1] < 2) return <Forbidden {...props}/>
      else return <StatBreak {...props} />
    }
    case 4: {
      if (props.level[1] < 2) return <Forbidden {...props}/>
      else return <RuleBreak {...props} />
    }
  }
}
