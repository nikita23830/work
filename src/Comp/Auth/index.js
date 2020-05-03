import React from 'react'
import styled, {keyframes} from 'styled-components'
import { withSnackbar } from 'notistack';
import { Grid } from '@material-ui/core'
import { Logo, LogoName, ErrorCircle, Main } from 'Comp/Auth/logo'
import { Registration } from 'Comp/Auth/regist'
import { NotActual } from 'Comp/Auth/notActual'
import { RestorePassword } from 'Comp/Auth/restore'
import SuccessRegistration from 'Comp/Auth/SuccessReg'
import { LinkRegistration,
  CustomLink,
  DivSvg,
  ErrorGrid,
  CustomError,
  StyleGrid,
  OrgName,
  BottomDiv,
  CustomTypography,
  CustomButton,
  CustomTextField,
  CustomTypographyTitle,
  LogoAndName,
  CustomGrid,
  StyleAuthCard,
  AuthorName
} from 'Comp/Auth/style'

class Auth extends React.Component {
  state={
    height: 100,
    login: '',
    pass: '',
    listDept: [],
    manager: [],
    regist: {
      dept: '',
      manager: undefined,
      chart: undefined
    },
    errorRegist: {},
    notActual: false,
    errorAuth: false,
    authToRestore: 0,
    restoreLogin: '',
    errorRestore: '',
    sendRestore: false,
    authToReg: false,
    notFoundLogin: false,
  }

  changeRestore = (e) => this.setState({ restoreLogin: e.target.value, errorRestore: '' })

  checkAuth = async () => {
    const { login, pass } = this.state
    const { socket } = this.props
    await socket.emit('checkAuth', {login: login, pass: pass})
  }

  checkLoginInReg = (e) => {
    if (e.target.value && e.target.value.replace(/\s/g, '') !== '')
      this.props.socket.emit('checkLoginInReg', e.target.value)
  }

  checkEmailInReg = (e) => {
    if (e.target.value && e.target.value.replace(/\s/g, '') !== '')
      this.props.socket.emit('checkEmainInReg', e.target.value)
  }

  chandeDataRegist = (name, value) => {
    let error = this.state.errorRegist
    delete error[name]
    if (name === 'dept')
      this.setState({ regist: { ...this.state.regist, [name]: value, manager: '' }, errorRegist: error })
    else this.setState({ regist: { ...this.state.regist, [name]: value }, errorRegist: error })
  }

  onRequestRegistration = () => {
    const { regist, errorRegist } = this.state
    const { socket, enqueueSnackbar } = this.props
    let error = checkRegist(regist, errorRegist)
    if (Object.keys(error).length > 0) {
      this.setState({ errorRegist: error })
    } else socket.emit('requestRegistration', regist)
  }

  restorePass = () => {
    const { restoreLogin, errorRestore } = this.state
    const { socket } = this.props
    if (!restoreLogin || (restoreLogin && restoreLogin.replace(/\s/g, '') === ''))
      this.setState({ errorRestore: 'Необходимо ввести логин' })
    else
      socket.emit('restorePass', restoreLogin)
  }

  changeSendRestore = () => this.setState({ sendRestore: false })

  closeNotActual = () => this.setState({ login: '', pass: '', notActual: false })

  onAuthToRestore = () => this.setState({ authToRestore: this.state.authToRestore === 1 ? 2 : 1 })

  onAuthToReg = () => this.setState({ authToReg: !this.state.authToReg })

  changeNotFoundLogin = () => this.setState({ notFoundLogin: false })

  async componentDidMount() {
    this.setState({ height: document.documentElement.clientHeight })

    const { socket, enqueueSnackbar, submit } = this.props
    const dept = ['Астрал Отчет', '1С-Отчетность']
    socket.emit('getAllToReg', '')
    await socket.on('checkAuth', (data) => { // проверка на авторизацию
      if (!data.true) this.setState({ errorAuth: true })
      else {
        if (data.actual === 0) { this.setState({ notActual: true }); return 0; }
        enqueueSnackbar(`Успешная авторизация: ${data.surname} ${data.name}. Отдел: ${dept[data.dept]}`, {variant: 'success',autoHideDuration: 5000, preventDuplicate: true})
        submit(data.uid, this.state.login)
      }
    })
    await socket.on('send_error', (data) => { // прием ошибок
      console.log('111')
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000})
      this.setState({ loader: false })
    })
    await socket.on('getAllToReg', (data) => { // получаем данные для SELECT'ов регистрации
      let manager = []
      data.manager.map(i => {
        if (!manager[i.id_dept]) manager[i.id_dept]= [];
        manager[i.id_dept].push({ id: i.id, name: `${i.surname} ${i.name}` })
      })
      for (let i = -1; i < manager.length; i++) { if (!manager[i]) manager[i] = [] }
      this.setState({ listDept: data.dept, manager: manager })
    })
    await socket.on('checkLoginInReg', (data) => { // проверка занятости логина
      if (!data.free)
        this.setState({ errorRegist: { ...this.state.errorRegist, login: 'Введенный логин уже занят' } })
    })
    await socket.on('checkEmainInReg', (data) => { // проверка занятости логина
      if (!data.free)
        this.setState({ errorRegist: { ...this.state.errorRegist, email: 'Введенный e-mail уже занят' } })
    })
    await socket.on('requestRegistration', (data) => {
      if (data.success)
        this.setState({ regist:{dept: -1,manager: -1,name:'',surname:'',login:'',pass:''}, errorRegist:{}, notActual: true, authToReg: false })
    })
    await socket.on('restorePass', (data) => {
      if (data.notFount) this.setState({ notFoundLogin: true })
      else this.setState({ sendRestore: true })
    })
  }

  render () {
    const { login, notFoundLogin, pass, manager, listDept, regist, errorRegist, notActual, height, errorAuth, authToRestore, restoreLogin, errorRestore, sendRestore, authToReg } = this.state
    return (
      <CustomGrid container spacing={0} h={height}>
        <CustomGrid item xs={12} sm={6}>

          {notActual && <SuccessRegistration  closeNotActual={this.closeNotActual} />}

          <RestorePassword {...this} />

          {authToReg && <Registration
            onAuthToReg={this.onAuthToReg}
            regist={regist}
            errorRegist={errorRegist}
            listDept={listDept}
            manager={manager}
            checkLoginInReg={this.checkLoginInReg}
            checkEmailInReg={this.checkEmailInReg}
            chandeDataRegist={this.chandeDataRegist}
            onRequestRegistration={this.onRequestRegistration}
          />}

          <LogoAndName>
            <Logo /><LogoName />
          </LogoAndName>
          {!authToReg && !notActual && <StyleAuthCard error={errorAuth} authToRestore={authToRestore} authToReg={authToReg}>
            <StyleGrid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <CustomTypographyTitle>Авторизация</CustomTypographyTitle>
              </Grid>
              {errorAuth && <ErrorGrid item xs={12} sm={12}>
                <ErrorCircle />
                <CustomError>Неверная пара логин/пароль</CustomError>
              </ErrorGrid>}
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  variant='outlined'
                  label='Логин'
                  name='login'
                  value={login}
                  onChange={e => this.setState({ login: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  variant='outlined'
                  label='Пароль'
                  type='password'
                  name='password'
                  value={pass}
                  onChange={e => this.setState({ pass: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomLink onClick={this.onAuthToRestore}>Забыли пароль?</CustomLink>
              </Grid>
              <Grid item xs={12} sm={5}>
                <CustomButton
                  variant='contained'
                  onClick={this.checkAuth}
                >
                  Войти
                </CustomButton>
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTypography>Нет аккаунта?</CustomTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LinkRegistration onClick={this.onAuthToReg}>Регистрация</LinkRegistration>
              </Grid>
            </StyleGrid>
          </StyleAuthCard>}
          <BottomDiv>
            <OrgName>АО «Калуга Астрал», 2020</OrgName>
            <AuthorName>Developed By N. Zhuravlev. Designer: D. Krylov</AuthorName>
          </BottomDiv>

        </CustomGrid>
        {/* тут заканчивается окно справо */}
        <CustomGrid item xs={12} sm={6} left>
          <DivSvg><Main /></DivSvg>
        </CustomGrid>
      </CustomGrid>
    )
  }
}

export default withSnackbar(Auth)

const checkRegist = (regist, errorRegist) => {
  const temp = ['name', 'surname', 'login', 'pass', 'email']
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let result = { ...errorRegist }
  temp.forEach(i => { if (!regist[i]) result[i] = true })
  if (regist.name && regist.name.replace(/\s/g, '') === '') result.name = true
  if (regist.surname && regist.surname.replace(/\s/g, '') === '') result.surname = true
  if (regist.login && regist.login.replace(/\s/g, '') === '') result.login = true
  if (regist.pass && regist.pass.replace(/\s/g, '') === '') result.pass = true
  if (regist.email && regist.email.replace(/\s/g, '') === '') result.email = true
  if (regist.dept === '') result.dept = true
  if (regist.manager === '') result.manager = true
  if (regist.chart === '') result.chart = true
  if (!re.test(regist.email)) result.email = true
  return result
}
