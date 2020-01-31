import React from 'react'
import styled from 'styled-components'
import { Card, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Link } from '@material-ui/core'
import { authToRegRegist, authToRegBackRegist } from 'Comp/Auth'

export const Registration = ({ onAuthToReg }) => {
  const FIELD = ['Имя', 'Фамилия', 'Логин', 'Пароль', 'E-mail']
  const FIELDSELECT = ['График', 'Руководитель', 'Отдел']
  return (
    <StyleCard>
      <RegName>Регистрация</RegName>
      <CustomGrid container spacing={4}>
        {FIELD.map(i => (
          <Grid item xs={12} sm={6}>
            <TextField label={i} variant='outlined' color='primary' />
          </Grid>
        ))}
        {FIELDSELECT.map(i => (
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <CustomInputLabel id="grafic-regist">{i}</CustomInputLabel>
              <Select
                labelId="grafic-regist"
                fullWidth
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12} sm={5}>
          <CustomButton variant='contained'>Зарегистрироваться</CustomButton>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomText>У вас есть аккаунт?</CustomText>
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomLink onClick={onAuthToReg}>Войти</CustomLink>
        </Grid>
      </CustomGrid>
    </StyleCard>
  )
}

const CustomLink = styled(Link)` && {
  width: 42px;
  height: 19px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  margin-top: 10px;
  cursor: pointer;
}`;

const CustomText = styled.p`{
  width: 135px;
  height: 20px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
  margin-top: 10px;
}`

const CustomButton = styled(Button)` && {
  height: 40px;
  background: #2285EE;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-transform: none;
} &&:hover {
  background: #2285EE;
}`;

const CustomInputLabel = styled(InputLabel)` && {
  background-color: #fff;
  padding: 4px;
}`

const StyleSelect = styled(Select)` && {
  text-align: left;
}`

const CustomGrid = styled(Grid)` && {
  position: absolute;
  width: 464px;
  left: 44px;
  top: 89px;
}`

const RegName = styled.p`{
  position: absolute;
  width: 162px;
  height: 33px;
  left: 44px;
  top: 32px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  margin-top: 0px;
}`

const StyleCard = styled(Card)` && {
  position: absolute;
  width: 524px;
  height: 537px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}`
