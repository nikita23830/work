import React from 'react'
import styled, { keyframes } from 'styled-components'
import { WhiteLogo, LogoCube, Circle, Vector, VectorDown, LittleCircle } from 'Comp/NewMenu/svg'
import { Grid, Collapse } from '@material-ui/core'
import { animationCollapseOpen, animationCollapseClose } from 'Comp/NewMenu/style'

const PAGES = [
  {
    id: 0,
    name: 'Главная',
    multi: false,
    level: 1
  },
  {
    name: 'Перерывы',
    multi: true,
    level: 1,
    page: [
      {
        id: 1,
        name: 'Главная',
        multi: false,
        level: 1
      },
      {
        id: 2,
        name: 'Мои перерывы',
        multi: false,
        level: 1
      },
      {
        id: 3,
        name: 'Статистика',
        multi: false,
        level: 2
      },
      {
        id: 4,
        name: 'Правила',
        multi: false,
        level: 2
      }
    ]
  },
  {
    id: 20,
    name: 'Администрирование',
    multi: false,
    level: 1
  },
  {
    id: 21,
    name: 'FeedBack',
    multi: false,
  },
]

class NewMenu extends React.Component{

  state={
    height: 100,
    collapse: [false,false,false,false,false,false,false,false],
    collapse2: false
  }

  componentDidMount() {
    this.setState({
      height: document.documentElement.clientHeight
    })
  }

  openCollapse = (i) => () => {
    let newCollapse = this.state.collapse
    newCollapse[i] = !newCollapse[i]
    this.setState({ collapse: newCollapse })
  }

  changeCollapse = () => this.setState({ collapse: !this.state.collapse })
  changeCollapse2 = () => this.setState({ collapse2: !this.state.collapse2 })

  render() {
    const { height, collapse, collapse2 } = this.state
    const { drawer, openDrawer, onChangePage } = this.props
    return(
      <CustomDrawer open={drawer} h={height}>
        <TopDrawer onClick={openDrawer} open={drawer}>
          <WhiteLogo />
          {drawer && <LogoName>Техподдержка</LogoName>}
          {drawer && <DivCube><LogoCube /></DivCube>}
        </TopDrawer>
        <StyleGridMenu container spacing={1} open={drawer}>

          {PAGES.map((i, ind) => (
            <CustomGrid item xs={12} sm={12} drawer={drawer} open={collapse[ind]} col={i.multi ? i.page.length-1 : 1}>
              <ClickedZone onClick={i.id !== undefined ? onChangePage(i.id) : this.openCollapse(ind)} drawer={drawer}>
                <CustomMenuIcon>
                  <Circle />
                </CustomMenuIcon>
                {drawer && <CustomMenuText>{i.name}</CustomMenuText>}
                {(drawer && i.multi) && <CustomVector onClick={i.id !== undefined ? onChangePage(i.id) : this.openCollapse(ind)}>
                  {collapse[ind] ? <VectorDown /> : <Vector />}
                </CustomVector>}
              </ClickedZone>
              {(drawer && i.multi) && <CustomCollapse in={collapse[ind]}>
                <CollapsedGrid container spacing={1} open={drawer}>

                  {i.page.map((i, ind) => (
                    <CustomGrid item xs={12} sm={12} onClick={onChangePage(i.id)}>
                      <CustomMenuIcon little={true} >
                        <LittleCircle />
                      </CustomMenuIcon>
                      <CustomMenuText>{i.name}</CustomMenuText>
                    </CustomGrid>
                  ))}

                </CollapsedGrid>
              </CustomCollapse>}


            </CustomGrid>
          ))}

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

const ClickedZone = styled.div`{
  z-index: 2;
  position: absolute;
  width: ${p=>p.drawer ? '260px' : '72px'};
  top: 0px;
  left: 0px;
  height: 48px;
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
  top: 16px;
  right: 21px;
}`

const CustomMenuText = styled.span`{
  position: absolute;
  width: 150px;
  height: 19px;
  left: 64px;
  top: 14px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  user-select: none;
  text-align: left;
}`

const CustomMenuIcon = styled.span`{
  position: absolute;
  top: ${p=>p.little ? '22px' : '12px'};
  left: ${p=>p.little ? '34px' : '24px'};
  height: ${p=>p.little ? '4px' : '24px'};
  margin-top: ${p=>p.little ? '-10px' : '0px'};
}`

const CustomGrid = styled(Grid)` && {
  min-height: 48px;
  height: 48px;
  position: relative;
  width: ${p=>p.open ? '260px' : '72px'};
  cursor: pointer;
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
  font-family: Manrope3;
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
  height: ${p=>p.h}px;
  z-index: 51;
  background-color: #FFFFFF;
  display: block;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  animation: ${p=>p.open ? openDrawerAnim : closeDrawerAnim} 0.2s linear both;
}`
