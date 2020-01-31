import React from 'react'
import { Card, TextField, Button } from '@material-ui/core'
import styled, { keyframes } from 'styled-components'
import { Arrow, Mail } from 'Comp/Auth/logo'
import { authToRestoreRestore, authToRestoreBackRestore } from 'Comp/Auth/index'

export const RestorePassword = ({ authToRestore, onAuthToRestore, restoreLogin, changeRestore, onRestore, errorRestore, sendRestore }) => (
  <StyleCard authToRestore={authToRestore} sendRestore={sendRestore}>
    {!sendRestore && <>
      <DivBack onClick={onAuthToRestore}>
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
        onChange={changeRestore}
      />
      <ButtonRestore
        variant='contained'
        onClick={onRestore}
      >
        Восстановить
      </ButtonRestore>
    </>}
    {sendRestore && <>
      <DivBack onClick={onAuthToRestore}>
        <Arrow />
        <ArrowText>Назад</ArrowText>
      </DivBack>
      <SuccussRestoreTitle>Проверьте электронную почту</SuccussRestoreTitle>
      <SuccussRestoreText>Мы выслали вам на почту новый пароль.</SuccussRestoreText>
      <MailBox><Mail /></MailBox>
    </>}
  </StyleCard>
)

const MailBox = styled.div`{
  position: absolute;
  width: 157px;
  height: 174px;
  left: 331px;
  top: 84px;
}`

const SuccussRestoreText = styled.p`{
  text-align: left;
  position: absolute;
  width: 243px;
  height: 38px;
  left: 44px;
  top: 191px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

const SuccussRestoreTitle = styled.p`{
  text-align: left;
  position: absolute;
  width: 234px;
  height: 66px;
  left: 44px;
  top: 113px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000
}`

const DivBack = styled.div` {
  position: absolute;
  top: 32px;
  left: 44px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}`

const ButtonRestore = styled(Button)` && {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 44px;
  top: 245px;
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
  background: #2285EE;
} &&:hover {
  background: #2285EE;
}`

const RestoreTextField = styled(TextField)` && {
  position: absolute;
  width: 435px;
  height: 76px;
  left: 44px;
  top: 151px;
}`

const TitleRestore = styled.p`{
  position: absolute;
  height: 33px;
  left: 44px;
  top: 88px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
  margin-top: 0px;
}`

const ArrowText = styled.p` {
  width: 41px;
  height: 18px;
  margin-top: 11px;
  margin-bottom: 11px;
  font-family: Manrope3;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

const StyleCard = styled(Card)` && {
  position: absolute;
  width: 524px;
  height: ${p=>p.sendRestore ? '290px' : '317px'};
  left: 50%;
  top: 50%;
  visibility: hidden;
  transform: translate(-50%, -50%);
  animation: ${p=>p.authToRestore === 1 ? authToRestoreRestore : p.authToRestore === 2 ? authToRestoreBackRestore : ''} 0.2s linear both;
}`
