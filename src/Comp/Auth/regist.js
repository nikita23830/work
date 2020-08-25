import React from 'react'
import styled from 'styled-components'
import { Card, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Link, Menu } from '@material-ui/core'
import { ErrorDiv, ErrorNullLogin } from 'Comp/Auth/logo'
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
  const { onAuthToReg, regist, errorRegist, listDept, manager, stepReg, regNextBlock } = props
  const FIELD = [{name: 'name', label: 'Имя'},{name: 'surname', label: 'Фамилия'},{name: 'login', label: 'Логин'},{name: 'pass', label: 'Пароль'},{name: 'email', label: 'E-mail'}]
  const GRAF = ['График 5/2', 'График 2/2', 'График "ночник"']

  return (
    <RegGrid container spacing={0}>
      <Grid item xs={12} sm={12}>
        <CardReg er={Object.keys(errorRegist).length > 0}>
          <RegTitle>Регистрация</RegTitle>

          {Object.keys(errorRegist).length > 0 && <DivLoggin>
            <DivPicErr><ErrorNullLogin /></DivPicErr>
            <DivTextErr>
              {errorRegist.login && 'Данный логин уже занят'}
              {(errorRegist.email && !errorRegist.login) && 'Данный e-mail уже занят'}
              {(!errorRegist.login && !errorRegist.email && Object.keys(errorRegist).length > 0) && 'Заполните все поля'} 
            </DivTextErr>
          </DivLoggin>}

          {stepReg === 0 && <>
            <Login placeholder='Логин' variant='outlined' color='primary' onBlur={props.checkLoginInReg} error={errorRegist.login} value={regist.login} onChange={e => props.chandeDataRegist('login', e.target.value)} />
            <Pass placeholder='Пароль' variant='outlined' color='primary' error={errorRegist.pass} value={regist.pass} onChange={e => props.chandeDataRegist('pass', e.target.value)} />
            <Email placeholder='E-mail' variant='outlined' color='primary' onBlur={props.checkEmailInReg} error={errorRegist.email} value={regist.email} onChange={e => props.chandeDataRegist('email', e.target.value)} />
          </>}

          {stepReg === 1 && <>
            <CustomSelect
              fullWidth
              value={regist.chart}
              error={Boolean(errorRegist['chart'])}
              onChange={e=>props.chandeDataRegist('chart', e.target.value)}
              variant='outlined'
              s={2}
            >
              <MenuItem value={-1} disabled>График работы</MenuItem>
              {GRAF.map((i, ind) => (
                <MenuItem value={ind}>{i}</MenuItem>
              ))}
            </CustomSelect>
            <CustomSelect
              fullWidth
              value={regist.dept}
              error={Boolean(errorRegist['dept'])}
              onChange={e=>props.chandeDataRegist('dept', e.target.value)}
              variant='outlined'
              s={1}
            >
              <MenuItem value={-1} disabled>Отдел</MenuItem>
              {listDept.map(i=>(
                <MenuItem value={i.id}>{i.dept_name}</MenuItem>
              ))}
            </CustomSelect>
            <CustomSelect
              fullWidth
              value={regist.manager}
              disabled={regist.dept === -1}
              error={Boolean(errorRegist['manager'])}
              onChange={e=>props.chandeDataRegist('manager', e.target.value)}
              variant='outlined'
              s={0}
            >
              <MenuItem value={-1} disabled>Руководитель</MenuItem>
              {(manager[regist.dept] && manager[regist.dept].length) ? manager[regist.dept].map(i=>(
                <MenuItem value={i.id}>{i.name}</MenuItem>
              )) : <MenuItem value='9999'><em>Нет действующих руководителей</em></MenuItem>}
            </CustomSelect>
          </>}

          {stepReg === 2 && <>
            <Name placeholder='Имя' variant='outlined' color='primary' error={errorRegist.name} value={regist.name} onChange={e => props.chandeDataRegist('name', e.target.value)} />
            <Surname placeholder='Фамилия' variant='outlined' color='primary' error={errorRegist.surname} value={regist.surname} onChange={e => props.chandeDataRegist('surname', e.target.value)} />
            <Bdate placeholder='Дата рождения' variant='outlined' color='primary' error={errorRegist.bdate} value={regist.bdate} onChange={e => props.chandeDataRegist('bdate', e.target.value)} maxlength={10} />
          </>}

          <ButtonBack onClick={props.onBackStep}>Назад</ButtonBack>
          <ButtonNext color='primary' variant="contained" onClick={props.onNextStep} disabled={regNextBlock}>Дальше</ButtonNext>

        </CardReg>
      </Grid>
    </RegGrid>
  )
  {/* return (
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
              error={Boolean(errorRegist[i.name])}
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
              error={Boolean(errorRegist['chart'])}
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
              error={Boolean(errorRegist['dept'])}
              onChange={e=>props.chandeDataRegist('dept', e.target.value)}
            >
              {listDept.map(i=>(
                <MenuItem value={i.id}>{i.dept_name}</MenuItem>
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
              error={Boolean(errorRegist['manager'])}
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
  ) */}
}

const DivTextErr = styled.div`{
  position: absolute;
  top: 11px;
  left: 48px;
}`

const DivPicErr = styled.div`{
  position: absolute;
  top: 11px;
  left: 16px;
}`

const DivLoggin = styled.div`{
  position: absolute;
  top: 73px;
  left: 44px;
  width: 256px;
  height: 40px;
  background: rgba(242, 70, 70, 0.1);
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #F24646;
}`

const CustomSelect = styled(Select)` && {
  width: 256px;
  height: 56px;
  position: absolute;
  bottom: ${p=>(p.s * 80) + 78}px;
  left: 44px;
}`

const ButtonNext = styled(Button)` && {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 172px;
  height: 48px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  background: #2285EE;
  border-radius: 0px;
} &&.MuiButton-containedPrimary:hover {
  background: #2285EE;
}`

const ButtonBack = styled(Button)` && {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 172px;
  height: 48px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  background: #FFFFFF;
  border-radius: 0px;
}`

const Bdate = styled(TextField)` && {
  position: absolute;
  bottom: 78px;
  left: 44px;
  width: 256px;
  height: 56px;
}`

const Email = styled(TextField)` && {
  position: absolute;
  bottom: 78px;
  left: 44px;
  width: 256px;
  height: 56px;
}`

const Surname = styled(TextField)` && {
  position: absolute;
  bottom: 158px;
  left: 44px;
  width: 256px;
  height: 56px;
}`

const Pass = styled(TextField)` && {
  position: absolute;
  bottom: 158px;
  left: 44px;
  width: 256px;
  height: 56px;
}`

const Name = styled(TextField)` && {
  position: absolute;
  bottom: 238px;
  left: 44px;
  width: 256px;
  height: 56px;
}`

const Login = styled(TextField)` && {
  position: absolute;
  bottom: 238px;
  left: 44px;
  width: 256px;
  height: 56px;
}`

const RegTitle = styled.span`{
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  position: absolute;
  top: 24px;
  left: 91px;
}`

const CardReg = styled(Card)` && {
  width: 344px;
  height: ${p=>p.er ? 429 : 381}px;
  position: relative;
}`

const RegGrid = styled(Grid)` && {
  width: 376px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`