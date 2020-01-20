import React from 'react'
import Rating from 'Comp/Rating'
import Profile from 'Comp/Rating/Profile'
import RatingShop from 'Comp/Rating/Shop'
import EveryDayGame from 'Comp/Rating/EveryDayGame'
import AdminGame from 'Comp/Rating/AdminGame'

export const RouterRating = (props) => {
  switch (props.page) {
    case 14:
      return <Rating {...props} />
    case 15:
      return <Profile {...props} />
    case 16:
      return <RatingShop {...props} />
    case 17:
      return <EveryDayGame {...props} />
    case 18:
      return <AdminGame {...props} />
  }
}
