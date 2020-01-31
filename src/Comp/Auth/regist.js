import React from 'react'
import styled from 'styled-components'
import { Card, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Link } from '@material-ui/core'
import { ErrorDiv } from 'Comp/Auth/logo'

export const Registration = (props) => {
  const { onAuthToReg, regist, errorRegist, listDept, manager } = props
  const FIELD = [{name: 'name', label: 'Имя'},{name: 'surname', label: 'Фамилия'},{name: 'login', label: 'Логин'},{name: 'pass', label: 'Пароль'},{name: 'email', label: 'E-mail'}]
  const GRAF = ['График 5/2', 'График 2/2', 'График "ночник"']
  return (
    <StyleCard errors={Object.keys(errorRegist).length > 0 ? true : false}>
      <RegName>Регистрация</RegName>
      <CustomGrid container spacing={2}>
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
              <CustomButton variant='contained' onClick={props.onRequestRegistration}>Зарегистрироваться</CustomButton>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomText>У вас есть аккаунт?</CustomText>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLink onClick={onAuthToReg}>Войти</CustomLink>
            </Grid>
          </BottomGrid>
        </Grid>
      </CustomGrid>
    </StyleCard>
  )
}

const StyleFormControl = styled(FormControl)` && {
  text-align: left;
}`

const BottomGrid = styled(Grid)` && {
  margin-top: 20px;
}`

const StyleTextField = styled(TextField)` && {
  min-height: 75px;
}`

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
  height: ${p=>p.errors ? '605px' : '557px'};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}`
