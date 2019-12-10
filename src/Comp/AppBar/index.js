import React, { Component } from 'react'
import { AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import styled from 'styled-components'
import { Menu } from '@material-ui/icons'


class DefAppBar extends Component {

  render() {
    const { openDrawer } = this.props
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer}>
            <Menu />
          </IconButton>
          Меню
        </Toolbar>
      </AppBar>
    )
  }
}

export default DefAppBar
