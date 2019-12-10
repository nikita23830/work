import React, { Component } from 'react'
import Monopoly from 'Comp/Rating/EveryDayGame/Monopoly'

export default class EveryDayGame extends Component {

  render () {
    const game = 1 // менять в настройках
    switch (game) {
      case 1: return <Monopoly />

      default: return <h1>404 Not found</h1>

    }
  }
}
