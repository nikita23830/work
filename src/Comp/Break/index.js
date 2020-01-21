import React from 'react'
import MainTable from './MainTable'
import MyBreak from './MyBreak'
import StatBreak from './StatBreak'
import RuleBreak from './RuleBreak'
import Forbidden from '../Forbidden'

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
