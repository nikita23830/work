import React from 'react'
import styled, {keyframes} from 'styled-components'
import { withSnackbar } from 'notistack';
import { Card, Grid, TextField, Button, Typography, CircularProgress, Link, Collapse, Select, MenuItem } from '@material-ui/core'
import { Logo, LogoName, ErrorCircle, Main } from 'Comp/Auth/logo'
import { Registration } from 'Comp/Auth/regist'
import { NotActual } from 'Comp/Auth/notActual'
import { RestorePassword } from 'Comp/Auth/restore'

class Auth extends React.Component {
  state={
    height: 100,
    login: '',
    pass: '',
    loader: false,
    reg: false,
    listDept: [],
    manager: [],
    regist: {
      dept: -1,
      manager: -1,
      chart: -1
    },
    errorRegist: {},
    notActual: false,
    needLogin: false,
    errorAuth: false,
    authToRestore: 0,
    restoreLogin: '',
    errorRestore: '',
    sendRestore: false,
    authToReg: false
  }

  changeRestore = (e) => this.setState({ restoreLogin: e.target.value, errorRestore: '' })

  checkAuth = async () => {
    const { login, pass } = this.state
    const { socket } = this.props
    await this.setState({ loader: true })
    await socket.emit('checkAuth', {login: login, pass: pass})
  }

  changeReg = () => this.setState({ reg: !this.state.reg })

  checkLoginInReg = (e) => this.props.socket.emit('checkLoginInReg', e.target.value)

  checkEmailInReg = (e) => this.props.socket.emit('checkEmainInReg', e.target.value)

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

  restorePass = () => {
    const { restoreLogin, errorRestore } = this.state
    const { socket } = this.props
    if (!restoreLogin || (restoreLogin && restoreLogin.replace(/\s/g, '') === ''))
      this.setState({ errorRestore: 'Необходимо ввести логин' })
    else {
      socket.emit('restorePass', restoreLogin)
      this.setState({ sendRestore: true })
    }
  }

  closeNotActual = () => this.setState({ login: '', pass: '', notActual: false })

  onAuthToRestore = () => this.setState({ authToRestore: this.state.authToRestore === 1 ? 2 : 1 })

  onAuthToReg = () => this.setState({ authToReg: !this.state.authToReg })

  async componentDidMount() {
    this.setState({ height: document.documentElement.clientHeight })

    const { socket, enqueueSnackbar, submit } = this.props
    const dept = ['Астрал Отчет', '1С-Отчетность']
    socket.emit('getAllToReg', '')
    await socket.on('checkAuth', (data) => { // проверка на авторизацию
      if (!data.true) this.setState({ errorAuth: true })
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
        manager[i.id_dept].push({ id: i.id, name: `${i.surname} ${i.name}` })
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
    await socket.on('checkEmainInReg', (data) => { // проверка занятости логина
      if (!data.free) {
        enqueueSnackbar(`Введенный e-mail уже занят`, {variant: 'warning',autoHideDuration: 3000})
        this.setState({ errorRegist: { ...this.state.errorRegist, email: true } })
      }
    })
    await socket.on('requestRegistration', (data) => {
      if (data.success) {
        enqueueSnackbar(`Успешная регистрация`, {variant: 'success',autoHideDuration: 3000})
        this.setState({ regist:{dept: -1,manager: -1,name:'',surname:'',login:'',pass:''}, errorRegist:{}, reg:false })
      }
    })
    await socket.on('restorePass', (data) => {
      enqueueSnackbar(`Новый пароль направлен на почту`, {variant: 'success',autoHideDuration: 3000})
    })
  }

  render () {
    const { login, pass, loader, reg, manager, listDept, regist, errorRegist, notActual, needLogin, height, errorAuth, authToRestore, restoreLogin, errorRestore, sendRestore, authToReg } = this.state
    if (notActual) return (
      <NotActual closeNotActual={this.closeNotActual} />
    )
    else return (
      <CustomGrid container spacing={0} h={height}>
        <CustomGrid item xs={12} sm={6}>

          <RestorePassword
            authToRestore={authToRestore}
            onAuthToRestore={this.onAuthToRestore}
            restoreLogin={restoreLogin}
            changeRestore={this.changeRestore}
            onRestore={this.restorePass}
            errorRestore={errorRestore}
            sendRestore={sendRestore}
          />

          {authToReg && <Registration
            authToReg={authToReg}
            onAuthToReg={this.onAuthToReg}
          />}

          <LogoAndName>
            <Logo /><LogoName />
          </LogoAndName>
          {!authToReg && <StyleAuthCard error={errorAuth} authToRestore={authToRestore} authToReg={authToReg}>
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
                  value={login}
                  error={needLogin}
                  onChange={e => this.setState({ login: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomTextField
                  variant='outlined'
                  label='Пароль'
                  type='password'
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
  if (regist.dept === -1) result.dept = true
  if (regist.manager === -1) result.manager = true
  if (regist.chart === -1) result.chart = true
  if (!re.test(regist.email)) result.email = true
  return result
}

const authToRestoreAuth = keyframes`
  0% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
  100% {
    transform: translate(-150%, -50%);
    visibility: hidden;
  }
`;

const authToRestoreBackAuth = keyframes`
  0% {
    transform: translate(-150%, -50%);
    visibility: hidden;
  }
  100% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
`;

export const authToRestoreRestore = keyframes`
  0% {
    transform: translate(50%, -50%);
    visibility: hidden;
  }
  100% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
`;

export const authToRestoreBackRestore = keyframes`
  0% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
  100% {
    transform: translate(50%, -50%);
    visibility: hidden;
  }
`;

const DivSvg = styled.div`{
  position: absolute;
  width: 552px;
  height: 670px;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}`

const ErrorGrid = styled(Grid)` && {
  display: flex;
  flex-direction: row;
}`

const CustomError = styled.p` {
  margin: 11px 0px 11px 5px;
  width: 199px;
  height: 18px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #F24646;
}`

const StyleGrid = styled(Grid)` && {
  position: absolute;
  top: 124px;
  left: 44px;
  width: 467px;
  padding: 0px;
}`

const OrgName = styled.p`{
  position: absolute;
  width: 152px;
  height: 17px;
  left: calc(50% - 152px/2 - 127.5px);
  top: 16px;
  font-family: Manrope3;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

const BottomDiv = styled.div` {
  position: absolute;
  width: 100%;
  height: 48px;
  left: 0px;
  bottom: 0px;
}`

const CustomTypography = styled(Typography)` && {
  margin-top: 9px;
  width: 99px;
  height: 19px;
  font-family: Manrope3;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

const CustomButton = styled(Button)` && {
  width: 164px;
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
  margin-bottom: 44px;
} &&:hover {
  background: #2285EE;
}`

const CustomTextField = styled(TextField)` && {
  width: 435px;
  height: 56px;
}`

const CustomTypographyTitle = styled(Typography)` && {
  width: 250px;
  height: 50px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
  font-feature-settings: 'pnum' on, 'lnum' on;
}`

const LogoAndName = styled.div` {
  position: absolute;
  top: 44px;
  left: 44px;
  width: 108px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}`

const CustomGrid = styled(Grid)` && {
  height: ${p=>p.h}px;
  width: ${p=>p.item ? '50%' : '100%'};
  background-color: ${p=>p.left ? '#F5F8FF' : '#fff'};
  position: relative;
  overflow-x: none;
  overflow-y: none;
}`

const StyleAuthCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 524px;
  height: ${p=>!p.error ? '517px' : '565px'};
  animation: ${p=>
    p.authToRestore === 1
    ? authToRestoreAuth
    : p.authToRestore === 2
      ? authToRestoreBackAuth
      : ''
  } 0.2s linear both;
}`

const LinkRegistration = styled(Link)` && {
  margin-top: 9px;
  width: 90px;
  height: 19px;
  font-family: Manrope3;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  cursor: pointer;
  user-select: none;
}`

const CustomLink = styled(Link)` && {
  width: 113px;
  height: 19px;
  font-family: Manrope3;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  cursor: pointer;
  user-select: none;
}`

const CustomCollapse = styled(Collapse)` && {
  position: relative;
}`

const AuthCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: ${p=>!p.reg ? '280px' : '430px'};
  padding: 10px;
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
