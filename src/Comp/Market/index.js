import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Search, SettingsOutlined, FavoriteBorder, LocalMallOutlined } from '@material-ui/icons';
import { NotLikePopular } from 'Comp/Market/svg'
import { Button, Grid, Badge } from '@material-ui/core';
import { List } from 'Comp/Market/list'
import { SocketConsumer } from 'ContextSocket/index'
import { BadgeMarket } from 'Comp/Market/badge'

class Shop extends React.PureComponent {

    state = {
        page: -1,
        cat: 0,
        inBadge: [],
        items: [],
        categorList: [{id: 0, text: 'Главная', name: 'SYSTEM', surname: '', active: true}],
        empty: true,
        anchorElBadge: undefined
    }

    onChangePage = (id) => (e) => this.setState({ page: id })

    addBadge = (id) => {
      const { items } = this.state
      let newInBadge = [...this.state.inBadge]
      newInBadge.push(id)
      this.setState({ inBadge: newInBadge })
    }

    removeBadge = (id) => {
      const { items } = this.state
      let newInBadge = [...this.state.inBadge]
      newInBadge = newInBadge.filter(item => item.id !== id)
      this.setState({ inBadge: newInBadge })
    }

    openBadge = (e) => {
      this.setState({ anchorElBadge: this.state.anchorElBadge ? undefined : e.currentTarget })
    }

    componentDidMount() {
      const { socket } = this.context
      socket.emit('getMarket', {});
      socket.on('getMarket', (data) => {
        if (data.empty) { return 0; }
        let newCatList = [{id: 0, text: 'Главная', name: 'SYSTEM', surname: '', active: true}, ...data.cat]
        let newMarketItem = [...data.item]
        this.setState({ categorList: newCatList, items: newMarketItem })
      })
    }

    render () {
        const { page, cat, inBadge, items, categorList, anchorElBadge } = this.state
        const { drawer, level } = this.props
        return (
            <Root p={drawer}>
                <SearchPanel p={drawer}>
                    <CustomSearch />

                    <DivPr />
                    <SettingsOutlinedSt onClick={this.onChangePage(0)} s={page === 0}/>
                    <SetTitle onClick={this.onChangePage(0)} s={page === 0}>Настройка</SetTitle>
                    <FavoriteBorderSt onClick={this.onChangePage(1)} s={page === 1}/>
                    <LikeTitle onClick={this.onChangePage(1)} s={page === 1}>Избранное</LikeTitle>
                    <LocalMallOutlinedSt onClick={this.onChangePage(2)} s={Boolean(anchorElBadge)} onClick={this.openBadge}/>
                    <ShopTitle onClick={this.onChangePage(2)} s={Boolean(anchorElBadge)}>
                      <CBadge badgeContent={inBadge.length} color="primary" onClick={this.openBadge}>Корзина</CBadge>
                    </ShopTitle>
                </SearchPanel>
                <Popular p={drawer}>
                    <NotLikePopular />
                    <PopularTitle s={price(inBadge) > level.balance}>Стоимость корзины: {price(inBadge)} балов</PopularTitle>
                    <PopularText>Баланс: {level.balance} балов</PopularText>
                    <PopularButton variant='contained' color='primary'>История изменения баланса</PopularButton>
                </Popular>
                <ListCategories p={drawer}>
                    <SGrid container spacing={1}>
                        {categorList.map((i, ind) => (
                          <Grid item xs={12}>
                            <ItemList a={ind === cat} onClick={() => this.setState({ cat: ind })}>{i.text}</ItemList>
                          </Grid>
                        ))}
                    </SGrid>
                </ListCategories>
                <List addBadge={this.addBadge} items={items} inBadge={inBadge} removeBadge={this.removeBadge} URL_SERVER={this.props.URL_SERVER} cat={cat} />
                
                <BadgeMarket open={Boolean(anchorElBadge)} anchorEl={anchorElBadge} onClose={this.openBadge} />

            </Root>
        )
    }
}

const price = (bad) => {
  let r = 0
  bad.forEach(i => {
    r = r + i.price
  })
  return r
}

const CBadge = styled(Badge)` && {  
} && .MuiBadge-anchorOriginTopRightRectangle {
  transform: scale(1) translate(100%, -70%);
} && .MuiBadge-badge {
  z-index: 0;
}`

export const onDrawerSearch = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 104}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 292}px;
  }
`;

export const onCloseDrawerSearch = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 292}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 104}px;
  }
`;

export const onDrawerPanel = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 918}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 1106}px;
  }
`;

export const onCloseDrawerPanel = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 1106}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 918}px;
  }
`;

export const onOpenDrawerPopular = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 72}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 260}px;
  }
`;

export const onCloseDrawerPopular = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 260}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 72}px;
  }
`;

const Root = styled.div` {
    position: absolute;
    top: 64px;
    right: 0px;
    overflow-x: hidden;
    animation: ${p=>p.p ? onOpenDrawerPopular : onCloseDrawerPopular} 0.2s linear both;
    height: ${document.documentElement.clientHeight - 64}px;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
} &::-webkit-scrollbar { 
  width: 0px; 
  background: transparent;
}`


const SGrid = styled(Grid)` && {
    margin: 24px;
    width: 232px;
}`

const ItemList = styled.div`{
    width: 100%;
    height: 24px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.a ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
} &:hover {
    color: ${p=>p.a ? '#FA2E8A' : '#2285EE'};
}`

const ListCategories = styled.div`{
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 88px;
    right: 16px;
    height: 256px;
    background: #FFFFFF;
    border-radius: 4px;
    animation: ${p=>p.p ? onDrawerPanel : onCloseDrawerPanel} 0.2s linear both;
}`

const PopularButton = styled(Button)` && {
    position: absolute;
    top: 152px;
    left: 56px;
    width: 236px;
    height: 42px;
    background: #5368B9;
    text-transform: none;
    font-family: Manrope3;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
}`

const PopularText = styled.div`{
    position: absolute;
    top: 93px;
    left: 56px;
    width: 194px;
    height: 38px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
    text-align: left;
    user-select: none;
}`

const PopularTitle = styled.div`{
    position: absolute;
    top: 56px;
    left: 56px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    display: flex;
    align-items: center;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.s ? '#C5202F' : '#072D57'};
    user-select: none;
}`

const Popular = styled.div`{
    position: absolute;
    top: 88px;
    left: 16px;
    width: ${document.documentElement.clientWidth - 568}px; 
    height: 256px;
    border-radius: 4px;
    text-align: left;
}`

const ShopTitle = styled.div`{
    position: absolute;
    top: 23px;
    right: 24px;
    width: 57px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.s ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
    user-select: none;
}`

const LocalMallOutlinedSt = styled(LocalMallOutlined)` && {
    position: absolute;
    top: 20px;
    right: 89px;
    color: ${p=>p.s ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
}`

const LikeTitle = styled.div`{
    position: absolute;
    top: 23px;
    right: 137px;
    width: 75px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.s ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
    user-select: none;
}`

const FavoriteBorderSt = styled(FavoriteBorder)` && {
    position: absolute;
    top: 20px;
    right: 220px;
    color: ${p=>p.s ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
}`

const SetTitle = styled.div`{
    position: absolute;
    top: 23px;
    right: 232px;
    width: 115px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.s ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
    user-select: none;
}`

const SettingsOutlinedSt = styled(SettingsOutlined)` && {
    position: absolute;
    top: 20px;
    right: 355px;
    color: ${p=>p.s ? '#5368B9' : '#B7C2CE'};
    cursor: pointer;
}`

const DivPr = styled.div`{
    position: absolute;
    width: 1px;
    height: 56px;
    right: 414px;
    top: 4px;
    background: #ECF5F9;
    border-radius: 1px;
}`

const CustomSearch = styled(Search)` && {
    position: absolute;
    top: 20px;
    left: 20px;
}`

const SearchPanel = styled.div`{
    position: absolute;
    top: 13px;
    right: 16px;
    background: #FFFFFF;
    border-radius: 4px;
    animation: ${p=>p.p ? onDrawerSearch : onCloseDrawerSearch} 0.2s linear both;
    height: 64px;
}`

Shop.contextType = SocketConsumer;
export default Shop