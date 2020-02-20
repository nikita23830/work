import React from 'react'
import styled, { keyframes } from 'styled-components'
import { WhiteLogo, LogoCube, Circle, Vector, VectorDown, LittleCircle, NewsSvg, BreakSvg, SettingSvg, FeedBackSvg } from 'Comp/NewMenu/svg'
import { Grid, Collapse } from '@material-ui/core'
import { animationCollapseOpen, animationCollapseClose } from 'Comp/NewMenu/style'
import { Link } from 'react-router-dom'

export const PAGES = [
  {
    id: 0,
    name: 'Новости',
    multi: false,
    link: '/news',
    level: 'news_lvl',
    svg: <NewsSvg />
  },
  {
    name: 'Перерывы',
    multi: true,
    level: 'break_lvl',
    link: '/break',
    svg: <BreakSvg />,
    page: [
      {
        id: 1,
        name: 'Главная',
        multi: false,
        link: '/break',
        level: 1
      },
      {
        id: 3,
        name: 'Статистика',
        multi: false,
        link: '/break?stat',
        level: 2
      },
      {
        id: 4,
        name: 'Правила',
        multi: false,
        link: '/break?rule',
        level: 2
      }
    ]
  },
  {
    id: 20,
    name: 'Администрирование',
    multi: false,
    link: '/administration',
    level: 'manager',
    svg: <SettingSvg />
  },
  {
    id: 21,
    name: 'Обратная связь',
    multi: false,
    link: '/feedback',
    svg: <FeedBackSvg />
  },
]

class NewMenu extends React.PureComponent{

  state={
    collapse: [false,false,false,false,false,false,false,false],
  }


  openCollapse = (i) => () => {
    let newCollapse = this.state.collapse
    newCollapse[i] = !newCollapse[i]
    this.setState({ collapse: newCollapse })
  }

  changeCollapse = () => this.setState({ collapse: !this.state.collapse })
  changeCollapse2 = () => this.setState({ collapse2: !this.state.collapse2 })

  render() {
    const { collapse } = this.state
    const { drawer, openDrawer, onChangePage, page, level } = this.props
    return(
      <CustomDrawer open={drawer} lvl={level.level_id}>
        <TopDrawer onClick={openDrawer} open={drawer}>
          <WhiteLogo />
          {drawer && <LogoName>Техподдержка</LogoName>}
          {drawer && <DivCube><LogoCube /></DivCube>}
        </TopDrawer>
        <StyleGridMenu container spacing={1} open={drawer}>

          {PAGES.map((i, ind) => {
            let collapseBreak = (drawer && i.name === 'Перерывы' && level.break_lvl === 2) ? true : false
            let visible = i.level === 'manager' ? Boolean(level[i.level]) ? true : false : true
            if (visible) return (
              <CustomGrid item xs={12} sm={12} drawer={drawer} open={collapse[ind]} col={i.multi ? i.page.length-1 : 1}>
                <ClickedZone onClick={collapseBreak && this.openCollapse(ind)} drawer={drawer} to={!collapseBreak && i.link}>
                  <CustomMenuIcon>
                    {i.svg}
                  </CustomMenuIcon>
                  {drawer && <CustomMenuText lvl={level.level_id}>{i.name}</CustomMenuText>}
                  {(drawer && i.multi) && <CustomVector onClick={this.openCollapse(ind)}>
                    {collapseBreak && <> {collapse[ind] ? <VectorDown /> : <Vector />} </>}
                  </CustomVector>}
                </ClickedZone>
                {collapseBreak && <CustomCollapse in={collapse[ind]}>
                  <CollapsedGrid container spacing={1} open={drawer}>
                    {i.page.map((i, ind) => (
                        <CustomGrid item xs={12} sm={12}>
                          <ClickedZoneLittle to={i.link && page.pathname !== i.link && i.link}>
                            <CustomMenuIcon little={true} >
                              <LittleCircle />
                            </CustomMenuIcon>
                            <CustomMenuText lvl={level.level_id}>{i.name}</CustomMenuText>
                          </ClickedZoneLittle>
                        </CustomGrid>
                    ))}
                  </CollapsedGrid>
                </CustomCollapse>}
              </CustomGrid>
            )
          })}

        </StyleGridMenu>
      </CustomDrawer>
    )
  }
}

export default NewMenu

const openDrawerAnim = keyframes`
  0% {
    width: 72px;
  }
  100% {
    width: 260px;
  }
`;

const closeDrawerAnim = keyframes`
  0% {
    width: 260px;
  }
  100% {
    width: 72px;
  }
`;

const ClickedZone = styled(Link)`{
  z-index: 2;
  position: absolute;
  width: ${p=>p.drawer ? '260px' : '72px'};
  top: 4px;
  left: 0px;
  height: 40px;
}`;

const CustomCollapse = styled(Collapse)` && {
  position: absolute;
  top: 48px;
}`

const CollapsedGrid = styled(Grid)` && {
  width: ${p=>p.open ? '260px' : '72px'};
}`

const CustomVector = styled.span`{
  position: absolute;
  width: 12px;
  height: 6px;
  top: 12px;
  right: 21px;
}`

const CustomMenuText = styled.span`{
  position: absolute;
  width: 190px;
  height: 40px;
  left: 64px;
  top: 0px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${p=>p.lvl === 1 ? '#FFFFFF' : '#2285EE'};
  user-select: none;
  text-align: left;
  display: flex;
  align-items: center;
}`

const CustomMenuIcon = styled.span`{
  position: absolute;
  width: ${p=>p.little ? '4px' : '23px'};
  top: ${p=>p.little ? '11px' : '0px'};
  left: ${p=>p.little ? '34px' : '24px'};
  height: ${p=>p.little ? '40px' : '40px'};
  margin-top: ${p=>p.little ? '-10px' : '0px'};
  display: flex;
  justify-content: center;
  align-items: center;
}`

const ClickedZoneLittle = styled(Link)` && {
  min-height: 48px;
  height: 48px;
  position: relative;
  cursor: pointer;
  width: 72px;
}`;

const CustomGrid = styled(Grid)` && {
  min-height: 48px;
  height: 48px;
  position: relative;
  width: ${p=>p.open ? '260px' : '72px'};
  cursor: pointer;
  text-align: left;
  animation: ${p=> (p.open && p.drawer) ? animationCollapseOpen[p.col] : animationCollapseClose[p.col]} 0.2s linear both;
}`;

const StyleGridMenu = styled(Grid)` && {
  position: absolute;
  left: 0px;
  top: 80px;
  width: ${p=>p.open ? '260px' : '72px'};
}`;

const DivCube = styled.p`{
  position: absolute;
  top: 20px;
  right: 16px;
  margin-top: 0px;
}`;

const LogoName = styled.p`{
  position: absolute;
  width: 136px;
  height: 25px;
  right: 52px;
  top: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  margin-top: 0px;
}`

const TopDrawer = styled.div`{
  position: absolute;
  width: ${p=>p.open ? '260px' : '72px'};
  height: 64px;
  left: 0px;
  top: 0px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  background: #2285EE;
  animation: ${p=>p.open ? openDrawerAnim : closeDrawerAnim} 0.2s linear both;
  user-select: none;
}`

const CustomDrawer = styled.div` {
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${p=>p.open ? '260px' : '72px'};
  height: ${document.documentElement.clientHeight}px;
  z-index: 51;
  background-color: ${p=>p.lvl === 1 ? '#2F363A' : '#FFFFFF'};
  display: block;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  animation: ${p=>p.open ? openDrawerAnim : closeDrawerAnim} 0.2s linear both;
} &&@media {
  height: ${document.documentElement.clientHeight}px;
}`
