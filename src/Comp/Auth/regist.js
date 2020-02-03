import React from 'react'
import styled from 'styled-components'
import { Card, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Link } from '@material-ui/core'
import { ErrorDiv } from 'Comp/Auth/logo'
import { StyleFormControl,
  BottomGrid,
  StyleTextField,
  CustomLinkReg,
  CustomText,
  CustomButtonReg,
  CustomInputLabel,
  StyleSelect,
  CustomGridReg,
  RegName,
  StyleCardReg
} from 'Comp/Auth/style'

export const Registration = (props) => {
  const { onAuthToReg, regist, errorRegist, listDept, manager } = props
  const FIELD = [{name: 'name', label: 'Имя'},{name: 'surname', label: 'Фамилия'},{name: 'login', label: 'Логин'},{name: 'pass', label: 'Пароль'},{name: 'email', label: 'E-mail'}]
  const GRAF = ['График 5/2', 'График 2/2', 'График "ночник"']
  return (
    <StyleCardReg errors={Object.keys(errorRegist).length > 0 ? true : false}>
      <RegName>Регистрация</RegName>
      <CustomGridReg container spacing={2}>
        {Object.keys(errorRegist).length > 0 && <Grid item xs={12} sm={12}>
          <ErrorDiv />
        </Grid>}
        {FIELD.map(i => (
          <Grid item xs={12} sm={6}>
            <StyleTextField
              label={i.label}
              variant='outlined'
              color='primary'
              value={regist[i.name]}
              helperText={i.name === 'login' ? errorRegist.login : i.name === 'email' ? errorRegist.email : ''}
              onChange={e => props.chandeDataRegist(i.name, e.target.value)}
              onBlur={i.name === 'login' ? props.checkLoginInReg : i.name === 'email' ? props.checkEmailInReg : ''}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <StyleFormControl variant="outlined" fullWidth>
            <CustomInputLabel id="grafic-regist">График</CustomInputLabel>
            <Select
              fullWidth
              value={regist.chart}
              onChange={e=>props.chandeDataRegist('chart', e.target.value)}
            >
              {GRAF.map((i, ind) => (
                <MenuItem value={ind}>{i}</MenuItem>
              ))}
            </Select>
          </StyleFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyleFormControl variant="outlined" fullWidth>
            <CustomInputLabel id="grafic-regist">Отдел</CustomInputLabel>
            <Select
              fullWidth
              value={regist.dept}
              onChange={e=>props.chandeDataRegist('dept', e.target.value)}
            >
              {listDept.map(i=>(
                <MenuItem value={i.id}>{i.name}</MenuItem>
              ))}
            </Select>
          </StyleFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyleFormControl variant="outlined" fullWidth>
            <CustomInputLabel id="grafic-regist">Руководитель</CustomInputLabel>
            <Select
              fullWidth
              value={regist.manager}
              disabled={regist.dept === -1}
              onChange={e=>props.chandeDataRegist('manager', e.target.value)}
            >
              {(manager[regist.dept] && manager[regist.dept].length) ? manager[regist.dept].map(i=>(
                <MenuItem value={i.id}>{i.name}</MenuItem>
              )) : <MenuItem value=''><em>Не выбрано</em></MenuItem>}
            </Select>
          </StyleFormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <BottomGrid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <CustomButtonReg variant='contained' onClick={props.onRequestRegistration}>Зарегистрироваться</CustomButtonReg>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomText>У вас есть аккаунт?</CustomText>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLinkReg onClick={onAuthToReg}>Войти</CustomLinkReg>
            </Grid>
          </BottomGrid>
        </Grid>
      </CustomGridReg>
    </StyleCardReg>
  )
}
