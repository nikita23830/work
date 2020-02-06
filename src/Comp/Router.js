import React from 'react'
import { Break } from 'Comp/Break'
import { Report } from 'Comp/Report'
import { RouterRating } from 'Comp/Rating/Router'
import RouterTest from 'Comp/Testing/router'
import Administartion from 'Comp/Admin'
import NewNews from 'Comp/NewNews'
import FeedBack from 'Comp/FeedBack'

export const getPageContent = props => {
  const { page } = props
  switch (page) {
    case 0:
      return (
        <NewNews {...props} />
      );

    case 1: case 2: case 3: case 4:
      return (
        <Break {...props} />
      );

    case 5: case 6: case 7: case 8:
      return (
        <Report {...props} />
      )

    case 10: case 11: case 12: case 13:
      return (
        <RouterTest {...props} />
      );

  	case 14: case 15: case 16: case 17: case 18:
        return (
          <RouterRating {...props} />
        );

    case 20:
      return (
        <Administartion {...props} />
      )

    case 21:
      return (
        <FeedBack {...props} />
      )

    default: return (<h1>Not dev... Sorry By nikita23830</h1>)
  }
}
