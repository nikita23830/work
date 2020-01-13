import React from 'react'
import styled from 'styled-components'
import { withSnackbar } from 'notistack';
import { Card, Grid, TextField, Button, Typography, CircularProgress } from '@material-ui/core'

class Auth extends React.Component {

  state={
    login: '',
    pass: '',
    loader: false,
  }

  checkAuth = async () => {
    const { login, pass } = this.state
    const { socket } = this.props
    await this.setState({ loader: true })
    await socket.emit('checkAuth', {login: login, pass: pass})
  }

  async componentDidMount() {
    const { socket, enqueueSnackbar, submit } = this.props
    await socket.on('checkAuth', (data) => {
      this.setState({ loader: false })
      if (!data.true) enqueueSnackbar(`Неверный логин или пароль`, {variant: 'warning',autoHideDuration: 3000})
      else submit(data.uid, this.state.login)
    })
  }

  render () {
    const { login, pass, loader } = this.state
    return (
      <>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>
        <AuthCard>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography>Авторизация</Typography>
            </Grid>
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
        </AuthCard>
      </>
    )
  }
}

export default withSnackbar(Auth)

const AuthCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 240px;
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
