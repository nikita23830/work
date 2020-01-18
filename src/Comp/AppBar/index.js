import React, { Component } from 'react'
import { AppBar,
  Toolbar,
  IconButton,
  Button,
  Breadcrumbs,
  Link
} from '@material-ui/core'
import styled from 'styled-components'
import { Menu, ExitToApp } from '@material-ui/icons'


class DefAppBar extends Component {

  render() {
    const { openDrawer, onExit, onChangePage, page } = this.props
    return (
      <AppBar position="static">
        <CustomToolbar>
          <Button
            variant="contained"
            startIcon={<Menu/>}
            onClick={openDrawer}
          >
            Меню
          </Button>
          {page > 0 && page < 3 && <CustomBreadcrumbs aria-label="breadcrumb">
            <CustomLink href='#' page={page === 1 ? true : false} onClick={onChangePage(1)}>Таблица перерывов</CustomLink>
            <CustomLink href='#' page={page === 2 ? true : false} onClick={onChangePage(2)}>Мои перерывы</CustomLink>
          </CustomBreadcrumbs>}
          <Button
            variant="contained"
            endIcon={<ExitToApp/>}
            onClick={onExit}
          >
            Выйти
          </Button>
        </CustomToolbar>
      </AppBar>
    )
  }
}

const CustomBreadcrumbs = styled(Breadcrumbs)` && {
  color: #fff
}`

const CustomLink = styled(Link)` && {
  color: ${p=>p.page ? '#fff' : '#B7B4B4'};
  cursor: pointer;
  font-weight: ${p=>p.page ? 'bolder' : 'normal'};
}`

const CustomToolbar = styled(Toolbar)` && {
  display: flex;
  justify-content: space-between;
}`

export default DefAppBar
