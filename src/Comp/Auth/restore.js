import React from 'react'
import { Card, TextField, Button } from '@material-ui/core'
import styled, { keyframes } from 'styled-components'
import { Arrow, Mail } from 'Comp/Auth/logo'
import { authToRestoreRestore, authToRestoreBackRestore } from 'Comp/Auth/style'
import { SocketConsumer } from 'ContextSocket/index'
import { TitleNotFound,
  TextNotFound,
  NotFoundSvg,
  MailBox,
  SuccussRestoreText, 
  SuccussRestoreTitle,
  DivBack,
  ButtonRestore,
  RestoreTextField,
  TitleRestore,
  ArrowText,
  StyleCard
} from 'Comp/Auth/style'

export const RestorePassword = (props) => {
  const { authToRestore, restoreLogin, errorRestore, sendRestore, notFoundLogin } = props.state
  return (
    <SocketConsumer>
    {(socket) => (
      <StyleCard authToRestore={authToRestore} sendRestore={sendRestore}>
        {(!sendRestore && !notFoundLogin) && <>
          <DivBack onClick={props.onAuthToRestore}>
            <Arrow />
            <ArrowText>Назад</ArrowText>
          </DivBack>
          <TitleRestore>Восстановление пароля</TitleRestore>
          <RestoreTextField
            variant='outlined'
            color='primary'
            label='Логин'
            value={restoreLogin}
            error={errorRestore}
            helperText={errorRestore}
            onChange={props.changeRestore}
          />
          <ButtonRestore
            variant='contained'
            onClick={props.restorePass}
          >
            Восстановить
          </ButtonRestore>
        </>}
        {notFoundLogin && <>
          <DivBack onClick={props.changeNotFoundLogin}>
            <Arrow />
            <ArrowText>Назад</ArrowText>
          </DivBack>
          <TitleNotFound>Ошибка восстановления</TitleNotFound>
          <TextNotFound>Пользователь с таким логином не найден.</TextNotFound>
          <NotFoundSvg src={`${socket.URL_SERVER}/image/notfound.png`} />
        </>}
        {sendRestore && <>
          <DivBack onClick={props.changeSendRestore}>
            <Arrow />
            <ArrowText>Назад</ArrowText>
          </DivBack>
          <SuccussRestoreTitle>Проверьте электронную почту</SuccussRestoreTitle>
          <SuccussRestoreText>Мы выслали вам на почту новый пароль.</SuccussRestoreText>
          <MailBox><Mail /></MailBox>
        </>}
      </StyleCard>
    )}
    </SocketConsumer>
  )
}
