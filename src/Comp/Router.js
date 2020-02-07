import React from 'react'
import { Break } from 'Comp/Break'
import { Report } from 'Comp/Report'
import { RouterRating } from 'Comp/Rating/Router'
import RouterTest from 'Comp/Testing/router'
import Administartion from 'Comp/Admin'
import NewNews from 'Comp/NewNews'
import FeedBack from 'Comp/FeedBack'

const GetPageContent = props => {
  const { page } = props
  switch (page.pathname) {
    case '/': case '/news':
      return (
        <NewNews {...props} />
      );

    case '/break': 
      return (
        <Break {...props} />
      );
    case '/report/:units':
      return (
        <Report {...props} />
      )

    case '/test/:units':
      return (
        <RouterTest {...props} />
      );

  	case '/rating/:units':
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

    default: return (<h1>Not dev... Sorry By nikita23830</h1>)
  }
}

export default GetPageContent