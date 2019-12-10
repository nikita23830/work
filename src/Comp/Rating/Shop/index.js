import React, { Component } from 'react'
import styled from 'styled-components'
import { Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Fab,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Divider
} from '@material-ui/core'
import { ShopOutlined, DeleteOutlined } from '@material-ui/icons'
import { ShopCart } from './Cart'

class RatingShop extends Component {

  state = {
		hRoot: 100,
		wRoot: 100,
    showMe: false,
    balance: 5000,
    sort: 0,
    data: [
      {
        name: 'Жесткий диск 1000 Гб',
        price: 80000,
        img: 'https://pncengineering.com/2031-home_default/shadow-mini-external-256gb-usb-31-portable-solid-state-drive-ssd.jpg',
        uid: 4,
      },
	  {
        name: 'Жесткий диск 9000 Гб',
        price: 70000,
        img: 'https://pncengineering.com/2031-home_default/shadow-mini-external-256gb-usb-31-portable-solid-state-drive-ssd.jpg',
        uid: 5,
      },
	  {
        name: 'Жесткий диск 8000 Гб',
        price: 60000,
        img: 'https://pncengineering.com/2031-home_default/shadow-mini-external-256gb-usb-31-portable-solid-state-drive-ssd.jpg',
        uid: 6,
      },
	  {
        name: 'Жесткий диск 7000 Гб',
        price: 50000,
        img: 'https://pncengineering.com/2031-home_default/shadow-mini-external-256gb-usb-31-portable-solid-state-drive-ssd.jpg',
        uid: 7,
      },
	  {
        name: 'Жесткий диск 6000 Гб',
        price: 40000,
        img: 'https://pncengineering.com/2031-home_default/shadow-mini-external-256gb-usb-31-portable-solid-state-drive-ssd.jpg',
        uid: 8,
      }
    ],
    cart: [],
    openModal: false,
  }

  changeShowMe = (e) => this.setState({ showMe: e.target.checked })
  changeSort = (e) => this.setState({ sort: e.target.value })
  changeModal = () => this.setState({ openModal: !this.state.openModal })

  onChangeCart = (i) => () => {
	const { cart } = this.state
    let newCart = cart.filter(item => item.cuid !== i)
	this.setState({ cart: newCart })
  }

  addItemToCart = (i) => () => {
	const { cart, data } = this.state
	let newCart = cart
	data.map(j => { if (j.uid === i) newCart.push({ name: j.name, price: j.price, img: j.img, uid: j.uid, cuid: randomString(8) }) })
	this.setState({ cart: cart })
  }

  clearCart = () => this.setState({ cart: [] })

  componentDidMount() {
	let dt = {}
    dt.hRoot = document.documentElement.clientHeight - 86
	dt.wRoot = document.documentElement.clientWidth - 20

	this.setState({ ...dt })
  }

  render () {
    const { hRoot, wRoot, data, showMe, balance, sort, openModal, cart } = this.state
    let showMeData = []
    data.map((i, ind) => {
      if (showMe && i.price <= balance) showMeData.push(i)
      if (!showMe) showMeData.push(i)
    })

    return (
      <Root h={hRoot} w={wRoot}>
        <Panel>
          <FormControl>
              <CustomSelect
              variant='outlined'
              color='primary'
              value={sort}
              onChange={this.changeSort}
            >
              <MenuItem value={0}>Без сортировки</MenuItem>
              <MenuItem value={1}>Цена по возрастанию</MenuItem>
              <MenuItem value={2}>Цена по убыванию</MenuItem>
            </CustomSelect>
          </FormControl>

          <StyleFormControlLabel
            control={
              <Checkbox
                value="checkedB"
                color="primary"
                value={showMe}
                onChange={this.changeShowMe}
              />
            }
            label="Доступно мне"
          />

          <Balance>
            <BalanceText>Баланс: {balance} баллов</BalanceText>
            <StyleFab color='primary' variant='outlined' onClick={this.changeModal}>
              <ShopOutlined />
              Корзина
              <CountToShop>{cart.length}</CountToShop>
            </StyleFab>
          </Balance>

        </Panel>

        <Main w={wRoot} h={hRoot}>
          <Table>
            <TableBody>

              {showMeData.length === 0 && <TextNotFound>НЛО похитело товар. Следственные действия уже ведутся!</TextNotFound>}
              {showMeData.map((i, ind) => {
                const show = (ind % 4) === 0 ? true : false
                const arr = [0,1,2,3]
                const newData = sortArr(sort, showMeData)
                if (show) return (
                  <>
                    <CustomTableRow>
                      {arr.map(j => (
                        <>
                          {newData[ind + j] && <ItemShop wRoot={wRoot} i={newData[ind + j]} addItemToCart={this.addItemToCart} />}
                        </>
                      ))}
                    </CustomTableRow>
                  </>
                )
              })}

            </TableBody>
          </Table>
        </Main>

        <ShopCart
    			openModal={openModal}
    			changeModal={this.changeModal}
    			cart={cart}
    			onChangeCart={this.onChangeCart} 
    			clearCart={this.clearCart}
    		/>

      </Root>
    )
  }
}

export default RatingShop

const randomString = (i) => {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

const sortArr = (to, arr) => {
  let newArr = arr
  if (to === 1) {
    newArr.sort((a, b) => {
    	return a.price - b.price
    })
  } else if (to === 2) {
    newArr.sort((a, b) => {
    	return b.price - a.price
    })
  }
  return newArr
}

const ItemShop = ({ wRoot, i, addItemToCart }) => (
  <CustomTableCell w={wRoot}>
    <Item>
      <ItemName>{i.name}</ItemName>
      <ItemImg>
        <img src={i.img} />
      </ItemImg>
      <DivButton>
        <Price>{i.price} баллов</Price>
        <StyleButton color='primary' onClick={addItemToCart(i.uid)}>В корзину</StyleButton>
      </DivButton>
    </Item>
  </CustomTableCell>
)

const TextNotFound = styled.div `{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: 20pt normal Arial;
  width: 675px;
}`

const CountToShop = styled.div`{
  position: absolute;
  top: -10px;
  right: -10px;
  font: 12pt normal Arial;
  background-color: #f73579;
  border: 1px solid #f73579;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}`

const PriceCart = styled.div`{
  position: absolute;
  top: 5px;
  right: 5px
  border: 1px solid #3f51b5;
  border-radius: 15px
  padding: 0 20px 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
  font: 14pt normal Arial;
  color: #3f51b5;
}`

const ClearShop = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  left: 5px;
  height: 50px;
  width: 290px;
  font: 14pt normal Arial;
}`

const SendShop = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 50px;
  width: 290px;
  font: 14pt normal Arial;
}`

const StyleList = styled(List)` && {
  height: 405px;
  overflow-y: scroll;
  margin-top: 65px;
}`

const Cart = styled.div`{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 550px;
  background-color: #fff;
  border-radius: 15px;
}`

const CustomTableRow = styled(TableRow)` && {
  display: flex;
  flex-direction: row;
}`

const CustomTableCell = styled(TableCell)` && {
  display: flex;
  justify-content: center;
  flex-direction: row;
  max-width: ${p=>p.w / 4}px;
  width: ${p=>(p.w/4) - 40}px;
}`

const Price = styled.div`{
  width: 250px;
  height: 50px;
  font: 14pt normal Arial;
  display: flex;
  justify-content: center;
  align-items: center;
}`

const DivButton = styled.div`{
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}`

const StyleButton = styled(Button)` && {
  height: 50px;
  width: 125px;
  border-left: 1px solid #c4c4c4;
  display: none;
}`

const ItemImg = styled.div`{
  height: 250px;
  border-bottom: 1px solid #c4c4c4;
}`

const ItemName = styled.div`{
  height: 60px;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  font: 14pt normal Arial;
}`

const Item = styled.div`{
  width: 250px;
  height: 362px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
} &:hover {
  border: 1px solid #3f51b5;
  ${Price} { width: 125px; }
  ${StyleButton} { display: block; }
}`

const Main = styled.div`{
	width: ${p=>p.w}px;
	height: ${p=>p.h - 55}px;
  margin-top: 5px;
  overflow-y: scroll;
}`

const BalanceText = styled.div`{
  margin-right: 10px;
  height: 48px;
  border: 1px solid #3f51b5;
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;
  color: #3f51b5;
  user-select: none;
}`

const StyleFab = styled(Fab)` && {
  width: 150px;
  height: 50px;
  border-radius: 24px;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #fff;
  position: relative;
} &&:hover {
  border: 1px solid #3f51b5;
  background-color: #fff;
  color: #3f51b5;
  ${CountToShop} {
    border: 1px solid #f73579;
    background-color: #f73579;
    color: #fff;
  }
}`

const Balance = styled.div`{
  position: absolute;
  top: 0px;
  right: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  font: 16pt normal Arial;
}`

const Root = styled.div`{
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	margin: 10px;
  position: relative;
}`

const StyleInputLabel = styled(InputLabel)` && {
  margin-top: -8px;
  margin-left: 20px;
  background-color: #fff;
}`

const StyleFormControlLabel = styled(FormControlLabel)` && {
  width: 150px;
  margin: 0 5px 0 5px;
  height: 50px;
  user-select: none;
}`

const CustomSelect = styled(Select)` && {
  max-height: 50px;
  width: 250px;
  margin: 0 5px 0 5px;
}`

const Panel = styled.div`{
  height: 50px;
  text-align: left;
  position: relative;
}`
