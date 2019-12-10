import React from 'react'
import styled from 'styled-components'
import { List, Button } from '@material-ui/core'

export const Cart = styled.div`{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 550px;
  background-color: #fff;
  border-radius: 15px;
}`

export const StyleList = styled(List)` && {
  height: 405px;
  overflow-y: scroll;
  margin-top: 65px;
}`

export const PriceCart = styled.div`{
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

export const ClearShop = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  left: 5px;
  height: 50px;
  width: 290px;
  font: 14pt normal Arial;
}`

export const SendShop = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 50px;
  width: 290px;
  font: 14pt normal Arial;
}`
