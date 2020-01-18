import React from 'react'
import styled from 'styled-components'
import { withSnackbar } from 'notistack';
import { Card, Grid, TextField, Button, Typography, CircularProgress, Link, Collapse, Select, MenuItem } from '@material-ui/core'

import { Registration } from 'Comp/Auth/reg'
import { NotActual } from 'Comp/Auth/notActual'

class Auth extends React.Component {
  state={
    login: '',
    pass: '',
    loader: false,
    reg: false,
    listDept: [],
    manager: [],
    regist: {
      dept: -1,
      manager: -1,
    },
    errorRegist: {},
    notActual: false
  }

  checkAuth = async () => {
    const { login, pass } = this.state
    const { socket } = this.props
    await this.setState({ loader: true })
    await socket.emit('checkAuth', {login: login, pass: pass})
  }

  changeReg = () => this.setState({ reg: !this.state.reg })

  checkLoginInReg = (e) => this.props.socket.emit('checkLoginInReg', e.target.value)

  chandeDataRegist = (name, value) => {
    let error = this.state.errorRegist
    delete error[name]
    if (name === 'dept')
      this.setState({ regist: { ...this.state.regist, [name]: value, manager: -1 }, errorRegist: error })
    else this.setState({ regist: { ...this.state.regist, [name]: value }, errorRegist: error })
  }

  onRequestRegistration = () => {
    const { regist, errorRegist } = this.state
    const { socket, enqueueSnackbar } = this.props
    let error = checkRegist(regist, errorRegist)
    if (Object.keys(error).length > 0) {
      enqueueSnackbar(`Не все данные заполнены`, {variant: 'warning',autoHideDuration: 3000})
      this.setState({ errorRegist: error })
    } else socket.emit('requestRegistration', regist)
  }

  closeNotActual = () => this.setState({ login: '', pass: '', notActual: false })

  async componentDidMount() {
    const { socket, enqueueSnackbar, submit } = this.props
    const dept = ['Астрал Отчет', '1С-Отчетность']
    socket.emit('getAllToReg', '')
    await socket.on('checkAuth', (data) => { // проверка на авторизацию
      this.setState({ loader: false })
      if (!data.true) enqueueSnackbar(`Неверный логин или пароль`, {variant: 'warning',autoHideDuration: 3000})
      else {
        if (data.actual === 0) { this.setState({ notActual: true }); return 0; }
        enqueueSnackbar(`Успешная авторизация: ${data.surname} ${data.name}. Отдел: ${dept[data.dept]}`, {variant: 'success',autoHideDuration: 5000})
        submit(data.uid, this.state.login)
      }
    })
    await socket.on('send_error', (data) => { // прием ошибок
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000})
      this.setState({ loader: false })
    })
    await socket.on('getAllToReg', (data) => { // получаем данные для SELECT'ов регистрации
      let manager = []
      data.manager.map(i => {
        if (!manager[i.id_dept]) manager[i.id_dept]= [];
        manager[i.id_dept].push({ id: i.manager_id, name: `${i.surname} ${i.name}` })
      })
      for (let i = -1; i < manager.length; i++) { if (!manager[i]) manager[i] = [] }
      this.setState({ listDept: data.dept, manager: manager })
    })
    await socket.on('checkLoginInReg', (data) => { // проверка занятости логина
      if (!data.free) {
        enqueueSnackbar(`Введенный логин уже занят`, {variant: 'warning',autoHideDuration: 3000})
        this.setState({ errorRegist: { ...this.state.errorRegist, login: true } })
      }
    })
    await socket.on('requestRegistration', (data) => {
      if (data.success) {
        enqueueSnackbar(`Успешная регистрация`, {variant: 'success',autoHideDuration: 3000})
        this.setState({ regist:{dept: -1,manager: -1,name:'',surname:'',login:'',pass:''}, errorRegist:{}, reg:false })
      }
    })
  }

  render () {
    const { login, pass, loader, reg, manager, listDept, regist, errorRegist, notActual } = this.state
    if (notActual) return (
      <NotActual closeNotActual={this.closeNotActual} />
    )
    else return (
      <>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>
        <AuthCard reg={reg}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography>{reg ? 'Регистрация' : 'Авторизация'}</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Collapse in={!reg}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label='Логин'
                      value={login}
                      onChange={e => this.setState({ login: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label='Пароль'
                      type='password'
                      value={pass}
                      onChange={e => this.setState({ pass: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button color='primary' variant='outlined' onClick={this.checkAuth}>Войти</Button>
                  </Grid>
                </Grid>
              </Collapse>
              <CustomCollapse in={reg}>
                <Registration
                  manager={manager}
                  listDept={listDept}
                  regist={regist}
                  chandeDataRegist={this.chandeDataRegist}
                  onRequestRegistration={this.onRequestRegistration}
                  errorRegist={errorRegist}
                  checkLoginInReg={this.checkLoginInReg}
                />
              </CustomCollapse>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Link href='#' onClick={this.changeReg}>{reg ? 'Войти' : 'Зарегистрироваться'}</Link>
            </Grid>
          </Grid>
        </AuthCard>
      </>
    )
  }
}

export default withSnackbar(Auth)

const checkRegist = (regist, errorRegist) => {
  const temp = ['name', 'surname', 'login', 'pass']
  let result = { ...errorRegist }
  temp.forEach(i => { if (!regist[i]) result[i] = true })
  if (regist.name && regist.name.replace(/\s/g, '') === '') result.name = true
  if (regist.surname && regist.surname.replace(/\s/g, '') === '') result.surname = true
  if (regist.login && regist.login.replace(/\s/g, '') === '') result.login = true
  if (regist.pass && regist.pass.replace(/\s/g, '') === '') result.pass = true
  if (regist.dept === -1) result.dept = true
  if (regist.manager === -1) result.manager = true
  return result
}

const CustomCollapse = styled(Collapse)` && {
  position: relative;
}`

const AuthCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: ${p=>!p.reg ? '280px' : '310px'};
  padding: 10px;
}`

const CustomGrid = styled(Grid)` && {
  display: flex;
  flex-direction: row;
}`

const Loader = styled.div` {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  display: ${p=>p.loader ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1;
}`
