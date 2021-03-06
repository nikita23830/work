import React from 'react'
import NewTableBreak from 'Comp/Break/NewTable'
import { Report } from 'Comp/Report'
import { RouterRating } from 'Comp/Rating/Router'
import RouterTest from 'Comp/Testing/router'
import Administartion from 'Comp/Admin'
import NewNews from 'Comp/NewNews'
import FeedBack from 'Comp/FeedBack'
import Search from 'Comp/Search'
import Lk from 'Comp/lk'
import Shop from 'Comp/Market'

import { Redirect } from 'react-router-dom'

const GetPageContent = props => {
  const { page } = props
  switch (page.pathname) {
    case '/': case '/news':
      return (
        <NewNews {...props} />
      );

    case '/break': 
      return (
        <NewTableBreak {...props} />
      );
    case '/report/:id':
      return (
        <Report {...props} />
      )

    case '/test/:id':
      return (
        <RouterTest {...props} />
      );

  	case '/rating/:id':
        return (
          <RouterRating {...props} />
        );

    case '/administration':
      return (
        <Administartion {...props} />
      )

    case '/feedback':
      return (
        <FeedBack {...props} />
      )
    
    case '/search':
      return (
         <Search {...props} />
      )

    case '/lk':
      return (
        <Lk {...props} />
      )
    
    case '/shop':
      return (
        <Shop {...props} />
      )

    default: return (<Redirect to='/' />)
  }
}

export default GetPageContent