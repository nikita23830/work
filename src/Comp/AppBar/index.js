import React from 'react'
import { AppBar,
  Toolbar,
  Button,
  Breadcrumbs,
  Link,
  Grid,
  Input,
  InputAdornment,
  Avatar,
  MenuItem,
  Menu,
  Popper,
  ClickAwayListener,
  IconButton
} from '@material-ui/core'
import { Search, Add, ShoppingCartOutlined, Delete } from '@material-ui/icons';
import styled, { keyframes } from 'styled-components'
import { Notif } from 'Comp/AppBar/svg'
import { PAGES } from 'Comp/NewMenu/index'
import { withRouter } from 'react-router-dom'
import { SocketConsumer } from 'ContextSocket/index'

class DefAppBar extends React.PureComponent {

  state = {
    notif: true,
    anchorMenu: null,
    searchText: '',
    notifList: [],
    anchorElNotif: undefined
  }

  onChangeNotif = () => this.setState({ notif: !this.state.notif })

  onMenuOpen = (e) => this.setState({ anchorMenu: e.currentTarget })
  onMenuClose = () => this.setState({ anchorMenu: null })

  onSearch = () =>  {
    const { history } = this.props
    const { searchText } = this.state
    if (searchText.replace(/\s/g, '') !== '') {
      history.push(`/search?${searchText}`)
      this.setState({ searchText: '' })
    }
  }

  componentDidMount () {
    const { socket } = this.context
    const { location } = this.props
    socket.on('newExchangeReceive', (data) => {
      let newnotifList = [...this.state.notifList]
      if (location.pathname !== '/break') {
        newnotifList.push('[Перерывы] Новый запрос на обмен')
      }
      this.setState({ notifList: newnotifList })
    })
  }

  openNotif = (e) => {
    this.setState({ anchorElNotif: this.state.anchorElNotif === undefined ? e.currentTarget : undefined })
  }

  delNotif = (id) => {
    let newNotifList = this.state.notifList.filter((i, ind) => ind !== id)
    this.setState({ notifList: newNotifList })
  }

  render() {
    const { onExit, page, drawer, level, onOpenNews, people_name, history } = this.props
    const { anchorMenu, searchText, anchorElNotif, notifList } = this.state
    const LEVEL_NEWS = level.news_lvl // поправить как внесу поправки в БД
    let currentPage = PAGES.filter(i => i.link === page.pathname)[0] && PAGES.filter(i => i.link === page.pathname)[0].name
    if (!currentPage) currentPage = page.pathname === '/' ? 'Новости' : page.pathname === '/search' ? 'Поиск' : '404 Not Found'
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
            value={searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
            onKeyPress={e=> e.key === 'Enter' ? this.onSearch() : ''}
          />
          {LEVEL_NEWS == 2 && <StyleFab color='primary' size='small' onClick={onOpenNews}>
            <Add /> Новость
          </StyleFab>}
          <StyleShop onClick={() => history.push('/shop')}><CShoppingCartOutlined /></StyleShop>
          <StyleNotif onClick={this.openNotif} s={anchorElNotif === undefined && notifList.length > 0}><Notif /></StyleNotif>

          <Popper id='notif' open={Boolean(anchorElNotif)} anchorEl={anchorElNotif}>
            <ClickAwayListener onClickAway={this.openNotif}>
              <NotifList container spacing={2}>
                <NotifItemTop item xs={12}><NotifText>Уведомления</NotifText></NotifItemTop>
                {notifList.length === 0 && <NotifItem item xs={12}><NotifText>Новых уведомлений нет</NotifText></NotifItem>} 
                {notifList.length > 0 && notifList.map((i, ind) => (
                  <NotifItem item xs={12}>
                    <NotifText>{i}</NotifText>
                    <SIconButton aria-label="delete" onClick={() => this.delNotif(ind)}>
                      <Delete fontSize="small" />
                    </SIconButton>
                  </NotifItem>
                ))}
              </NotifList>
            </ClickAwayListener>
          </Popper>

          <StyleAvatar sizes='small' onClick={this.onMenuOpen} lvl={level.level_id}>{people_name[1].charAt(0)}{people_name[0].charAt(0)}</StyleAvatar>

        </CustomToolbar>

        <Menu
          id="simple-menu"
          anchorEl={anchorMenu}
          keepMounted
          open={Boolean(anchorMenu)}
          onClose={this.onMenuClose}
        >
          <MenuItem onClick={() => { history.push('/lk'); this.setState({ anchorMenu: undefined })}}>Личный кабинет</MenuItem>
          <MenuItem onClick={() => { history.push('/shop'); this.setState({ anchorMenu: undefined })}}>Магазин</MenuItem>
          <MenuItem onClick={onExit}>Выход</MenuItem>
        </Menu>

      </CustomAppBar>
    )
  }
}

const changeColor = keyframes`
  0% {
    color: #DDE2E8;
  }
  50% {
    color: #0097EC;
  }
  100% {
    color: #DDE2E8;
  }
`;

const SIconButton = styled(IconButton)` && {
  position: absolute;
  top: 2px;
  right: 0px;
}`

const NotifText = styled(Grid)` && {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  max-width: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`

const NotifItemTop = styled(Grid)` && {
  height: 50px;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  max-width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2285EE;
}`

const NotifItem = styled(Grid)` && {
  position: relative;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px 8px;
  max-width: 400px;
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #072D57;
  z-index: 1001;
} &&:hover {
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}`

const NotifList = styled(Grid)` && {
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  background: #fff;
  padding: 8px;
  min-width: 200px;
  max-width: 400px;
  z-index: 1000;
}`

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
    width: ${document.documentElement.clientWidth - 542}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 732}px;
  }
`;

const closeDrawerInput = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 732}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 542}px;
  }
`;

const openDrawerInputLevel = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 677}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 867}px;
  }
`;

const closeDrawerInputLevel = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 867}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 677}px;
  }
`;

const CShoppingCartOutlined = styled(ShoppingCartOutlined)` && {
  color: #B7C2CE;
}`

const StyleShop = styled.span` && {
  position: absolute;
  top: 21px;
  right: 120px;
  cursor: pointer;
  color: #C4C4C4;
} &:hover {
  ${CShoppingCartOutlined} {
    color: #2285EE;
  }
}`

const StyleNotif = styled.span` && {
  position: absolute;
  top: 21px;
  right: 83px;
  cursor: pointer;
  color: #DDE2E8;
  animation: ${p=>p.s ? changeColor : ''} 2s infinite linear;
}`;

const StyleAvatar = styled(Avatar)` && {
  background: ${p=>p.lvl > 0 ? '#2285EE' : '#E9F3FD'};
  color: ${p=>p.lvl > 0 ? '#fff' : '#2285EE'};
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 24px;
}`;

const StyleFab = styled(Button)` && {
  background: #2285EE;
  position: absolute;
  top: 12px;
  right: 157px;
  height: 40px;
  width: 120px;
  box-shadow: none;
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-transform: none;
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
  right: ${p=>p.level !== 2 ? 162 : 297}px;
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
  color: ${p=>p.lvl > 0 ? '#fff' : '#072D57'};
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
  background: ${p=>p.lvl > 0 ? '#2F363A' : '#FFFFFF'};
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

DefAppBar.contextType = SocketConsumer;
export default withRouter(DefAppBar)
