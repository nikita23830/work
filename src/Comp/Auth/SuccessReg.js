import React from 'react'
import { Card, Button } from '@material-ui/core'
import { Arrow, OrangeMail } from 'Comp/Auth/logo'
import styled from 'styled-components'

export const SuccessRegistration = (props) => (
  <StyleCard>
    <DivBack onClick={props.closeNotActual}>
      <Arrow />
      <ArrowText>Назад</ArrowText>
    </DivBack>
    <TitleSuccess>Ожидается подтверждение!</TitleSuccess>
    <TextSuccess>Обратитесь к руководителю, чтобы он принял вашу заявку для авторизации</TextSuccess>
    <RepeatButton variant='contained'>Выслать повторно</RepeatButton>
    <AuthButton variant='contained' onClick={props.closeNotActual}>Авторизоваться</AuthButton>
    <MailDivBox>
      <OrangeMail />
    </MailDivBox>
  </StyleCard>
)

const MailDivBox = styled.div`{
  position: absolute;
  top: 123px;
  left: 331px;
  width: 174px;
  height: 157px;
}`

const AuthButton = styled(Button)` && {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 44px;
  top: 295px;
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
  background: #2285EE;
} &&:hover {
  background: #2285EE;
}`;

const RepeatButton = styled(Button)` && {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 44px;
  top: 243px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #B7C2CE;
  text-transform: none;
  background: #E9F3FD;
} &&:hover {
  background: #E9F3FD;
}`;

const TextSuccess = styled.p`{
  position: absolute;
  width: 243px;
  height: 57px;
  left: 44px;
  top: 162px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

const TitleSuccess = styled.p`{
  position: absolute;
  width: 222px;
  height: 66px;
  left: 44px;
  top: 84px;
  font-family: Manrope3;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
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

const DivBack = styled.div` {
  position: absolute;
  top: 32px;
  left: 44px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}`

const StyleCard = styled(Card)` && {
  position: absolute;
  width: 532px;
  height: 367px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`
