import React from 'react'
import { AppBar,
  Toolbar,
  IconButton,
  Button,
  Breadcrumbs,
  Link,
  Grid,
  Input,
  InputAdornment,
  Fab,
  Avatar,
  MenuItem,
  Menu
} from '@material-ui/core'
import { Search, Add, Notifications, NotificationsOff } from '@material-ui/icons';
import styled, { keyframes } from 'styled-components'
import { Notif } from 'Comp/AppBar/svg'
import { PAGES } from 'Comp/NewMenu/index'


class DefAppBar extends React.PureComponent {

  state = {
    notif: true,
    anchorMenu: null
  }

  onChangeNotif = () => this.setState({ notif: !this.state.notif })

  onMenuOpen = (e) => this.setState({ anchorMenu: e.currentTarget })
  onMenuClose = () => this.setState({ anchorMenu: null })

  onSearch = (e) =>  {
    console.log('Тут будет функция поиска по фразе: ', e.target.value)
  }

  render() {
    const { openDrawer, onExit, onChangePage, page, drawer, level, onOpenNews, people_name } = this.props
    const { notif, anchorMenu } = this.state
    const LEVEL_NEWS = level.news_lvl // поправить как внесу поправки в БД
    let currentPage = PAGES.filter(i => i.link === page.pathname)[0] && PAGES.filter(i => i.link === page.pathname)[0].name
    if (!currentPage) currentPage = page.pathname === '/' ? 'Новости' : '404 Not Found'
    return (
      <CustomAppBar position="static" lvl={level.level_id}>
        <CustomToolbar>
          <PageName drawer={drawer} lvl={level.level_id}>{currentPage}</PageName>
          <StyleInput
            level={LEVEL_NEWS}
            drawer={drawer}
            id="input-with-icon-adornment"
            placeholder='Поиск...'
            variant='filled'
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            onKeyPress={e=> e.key === 'Enter' ? this.onSearch(e) : ''}
          />
          {LEVEL_NEWS == 2 && <StyleFab color='primary' size='small' onClick={onOpenNews}>
            <Add />
          </StyleFab>}
          <StyleNotif><Notif /></StyleNotif>
          <StyleAvatar sizes='small' onClick={this.onMenuOpen} lvl={level.level_id}>{people_name[1].charAt(0)}{people_name[0].charAt(0)}</StyleAvatar>

        </CustomToolbar>

        <Menu
          id="simple-menu"
          anchorEl={anchorMenu}
          keepMounted
          open={Boolean(anchorMenu)}
          onClose={this.onMenuClose}
        >
          <MenuItem>Личный кабинет</MenuItem>
          <MenuItem onClick={onExit}>Выход</MenuItem>
        </Menu>

      </CustomAppBar>
    )
  }
}

const openDrawerNamePage = keyframes`
  0% {
    left: 104px;
  }
  100% {
    left: 294px;
  }
`;

const closeDrawerNamePage = keyframes`
  0% {
    left: 294px;
  }
  100% {
    left: 104px;
  }
`;

const openDrawerInput = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 505}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 695}px;
  }
`;

const closeDrawerInput = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 695}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 505}px;
  }
`;

const openDrawerInputLevel = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 564}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 754}px;
  }
`;

const closeDrawerInputLevel = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 754}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 564}px;
  }
`;

const StyleNotif = styled.span` && {
  position: absolute;
  top: 21px;
  right: 83px;
  cursor: pointer;
}`;

const StyleAvatar = styled(Avatar)` && {
  background: ${p=>p.lvl === 1 ? '#2285EE' : '#E9F3FD'};
  color: ${p=>p.lvl === 1 ? '#fff' : '#2285EE'};
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 24px;
}`;

const StyleFab = styled(Fab)` && {
  background: #2285EE;
  position: absolute;
  top: 12px;
  right: 120px;
  box-shadow: none;
} &&:hover {
  background: #2285EE;
  box-shadow: none;
}`;

const StyleInput = styled(Input)` && {
  height: 40px;
  background: #EBEEF1;
  border-radius: 4px;
  padding: 5px;
  border-bottom: none;
  position: absolute;
  top: 12px;
  right: ${p=>p.level !== 2 ? 125 : 184}px;
  animation: ${p=>p.drawer ? p.level === 2 ? openDrawerInputLevel : openDrawerInput : p.level === 2 ? closeDrawerInputLevel : closeDrawerInput} 0.2s linear both;
} &&:before {
  border-bottom: none;
} &&:after {
  border-bottom: none;
} &&:hover:not(.Mui-disabled):before {
  border-bottom: none;
}`;

const StyleGrid = styled(Grid)` && {
  display: flex;
  justify-content: ${p=> p.al ? 'flex-end' : 'center'};
  align-items: center;
}`;

const PageName = styled.span`{
  top: 0px;
  height: 64px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${p=>p.lvl === 1 ? '#fff' : '#072D57'};
  position: absolute;
  width: 276px;
  left: ${p=>p.drawer ? '270px' : '80px'};
  animation: ${p=>p.drawer ? openDrawerNamePage : closeDrawerNamePage} 0.2s linear both;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}`;

const CustomGrid = styled(Grid)` && {
  top: 4px;
  left: 260px;
  position: absolute;
  height: 64px;
  width: ${document.documentElement.clientWidth - 260}px;
}`;

const CustomAppBar = styled(AppBar)` && {
  background: ${p=>p.lvl === 1 ? '#2F363A' : '#FFFFFF'};
}`;

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
  position: relative;
}`

export default DefAppBar
