import React from 'react'
import { Modal, ListItem, ListItemText, ListItemAvatar, IconButton, Divider } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { Cart, PriceCart, StyleList, ClearShop, SendShop } from './styled'

export const ShopCart = ({ openModal, changeModal, cart, onChangeCart, clearCart }) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={openModal}
    onClose={changeModal}
  >
    <Cart>

      <PriceCart>Позиций: {cart.length} | Сумма: {price(cart)}</PriceCart>

      <StyleList>

        {cart.map((i, ind) => {
          const price = `Стоимость: ${i.price}`
          return (
            <>
              <ListItem>
                <ListItemText primary={i.name} secondary={price} />
                <ListItemAvatar>
                  <IconButton>
                    <DeleteOutlined color='secondary' onClick={onChangeCart(i.cuid)} />
                  </IconButton>
                </ListItemAvatar>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          )
        })}

      </StyleList>

      <ClearShop color='secondary' variant='outlined' onClick={clearCart}>Очистить корзину</ClearShop>
      <SendShop color='primary' variant='outlined' disabled>Купить</SendShop>

    </Cart>
  </Modal>
)

const price = (arr) => {
  let summ = 0;
  arr.map(i => summ = summ + i.price )
  return summ
}
