import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Arrow, Dots, Circle1, Circle2, Circle3, Circle4, Pro, Photo } from 'Comp/NewNews/svg'
import { Avatar, Button, Input, Menu, MenuItem, Popper, Grow, Paper, ClickAwayListener, MenuList, Modal } from '@material-ui/core'

/*
<Loader>
  <Circle1 />
  <Circle2 />
  <Circle3 />
  <Circle4 />
</Loader>
*/

class NewPost extends React.Component {

  state = {
    menu: undefined,
    title: '',
    text: '',
    modalDel: false,
    file: undefined
  }

  onDelete = () => this.setState({ modalDel: true })

  onPreClose = () => {
    this.setState({ title: '', text: '', file: undefined })
    this.props.onCloseNews()
  }

  onCloseModal = () => this.setState({ modalDel: false })
  onOpenMenu = (e) => this.setState({ menu: e.currentTarget })
  onCloseMenu = () => this.setState({ menu: undefined })

  render() {
    const { menu, title, text, modalDel } = this.state
    const { onCloseNews } = this.props
    return (
      <Root>
        <Popper open={Boolean(menu)} anchorEl={menu} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.onCloseMenu}>
                  <MenuList autoFocusItem={Boolean(menu)} id="menu-list-grow" onKeyDown={() => {}}>
                    <MenuItem onClick={this.onDelete}>Удалить новость</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Header>
          <ArrowDiv onClick={this.onDelete}><Arrow /></ArrowDiv>
          <CustomAvatar>TT</CustomAvatar>
          <NameAuthor>Тестов Тест</NameAuthor>
          <MenuDots onClick={this.onOpenMenu}><Dots /></MenuDots>
          <CreateButton>Опубликовать</CreateButton>
        </Header>
        <MainNew>
          <TitleInput placeholder='Заголовок' fullWidth multiline value={title} onChange={e => this.setState({ title: e.target.value })}/>
          <TextInput placeholder='Текст' fullWidth multiline value={text} onChange={e => this.setState({ text: e.target.value })} />
        </MainNew>

        <PhotoEdit><Photo /></PhotoEdit>
        <ProEdit><Pro /></ProEdit>

        <Modal
          open={modalDel}
        >
          <ModalDelete>
            <TitleDelete>Удалить {title.replace(/\s/g, '') === '' ? 'новость?' : `"${title}"?`}</TitleDelete>
            <YesDelButton onClick={this.onPreClose}>Да</YesDelButton>
            <NoDelButton onClick={this.onCloseModal}>Нет</NoDelButton>
          </ModalDelete>
        </Modal>
      </Root>
    )
  }
}

export default NewPost

const NoDelButton = styled(Button)` && {
  position: absolute;
  width: 63px;
  height: 38px;
  left: 299px;
  top: 89px;
  background: #FFFFFF;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
} &&:hover {
  background: #2285EE;
  color: #FFFFFF;
}`;

const YesDelButton = styled(Button)` && {
  position: absolute;
  width: 55px;
  height: 38px;
  left: 232px;
  top: 89px;
  background: #FFFFFF;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  text-transform: none;
} &&:hover {
  background: #2285EE;
  color: #FFFFFF;
}`;

const TitleDelete = styled.span`{
  position: absolute;
  width: 550px;
  height: 33px;
  left: 23px;
  top: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}`

const ModalDelete = styled.div`{
  position: absolute;
  width: 594px;
  height: 159px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFF;
  border-radius: 4px;
}`

const PhotoEdit = styled.span`{
  position: absolute;
  width: 24px;
  height: 24px;
  left: calc(50% - 426px);
  top: 178px;
  cursor: pointer;
}`

const ProEdit = styled.span`{
  position: absolute;
  width: 24px;
  height: 24px;
  left: calc(50% - 386px);
  top: 183px;
}`

const TextInput = styled(Input)` && {
  min-height: 58px;
  max-height: 256px;
  font-style: normal;
  font-weight: normal;

  border-bottom: none;
  font-size: 18px;
  line-height: 25px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
} &&:before {
  border-bottom: none;
} &&:after {
  border-bottom: none;
} &&:hover:not(.Mui-disabled):before {
  border-bottom: none;
}`;

const TitleInput = styled(Input)` && {
  min-height: 58px;
  max-height: 256px;
  border-bottom: none;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
} &&:before {
  border-bottom: none;
} &&:after {
  border-bottom: none;
} &&:hover:not(.Mui-disabled):before {
  border-bottom: none;
}`;

const MainNew = styled.div`{
  position: absolute;
  width: 603px;
  height: ${document.documentElement.clientHeight - 108}px;
  left: 50%;
  transform: translateX(-50%);
  top: 108px;
  overflow-y: auto;
}`;

const animation = keyframes`
  0% {
    transform: rotate(0)
  }
  50% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const Loader = styled.div`{
  position: absolute;
  width: 96px;
  height: 96px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${animation} 3s linear infinite;
}`

const CreateButton = styled(Button)` && {
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  position: absolute;
  width: 165px;
  height: 38px;
  left: 841px;
  top: 19px;
  background: #2285EE;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-transform: none;
} &&:hover {
  background: #2285EE;
}`;

const MenuDots = styled.span`{
  position: absolute;
  width: 24px;
  height: 24px;
  left: 806px;
  top: 26px;
  cursor: pointer;
}`;

const NameAuthor = styled.span`{
  position: absolute;
  width: 191px;
  height: 33px;
  left: 255px;
  top: 22px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  text-align: left;
}`;

const CustomAvatar = styled(Avatar)` && {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 763px;
  top: 18px;
  background: #E9F3FD;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
}`;

const ArrowDiv = styled.span`{
  position: absolute;
  width: 24px;
  height: 24px;
  left: 0px;
  top: 26px;
  cursor: pointer;
}`

const Root = styled.div`{
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 52;
  width: 100%;
  height: ${document.documentElement.clientHeight}px;
  background: #fff;
}`

const Header = styled.div`{
  position: absolute;
  width: 1006px;
  height: 76px;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
}`
