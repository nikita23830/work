import React from 'react'
import { Modal, Card, Button } from '@material-ui/core'
import styled from 'styled-components'


export const FirstModal = ({ URL_SERVER, newUser, onNewUser }) => (
  <Modal
    open={!newUser}
  >
    <ModalCard>
      <HelloTitle>Добро пожаловать в личное пространство!</HelloTitle>
      <HelloText>Здесь вы можете отслуживать последние новости своей компании, бронировать перерывы и еще много классных функций</HelloText>
      <CalendarGoogle src={`${URL_SERVER}/image/calendar.png`}/>
      <TitleSt1>Планирование вашего времени</TitleSt1>
      <TextSt1>Предоставляет возможность следить за вашими событиями и помогает планировать перерывы</TextSt1>
      <NewsGoogle src={`${URL_SERVER}/image/news.png`}/>
      <TitleSt2>Последние новости вашей компании</TitleSt2>
      <TextSt2>Интересные статьи, новости - в персональной ленте на стартовом экране на вашем компьтере</TextSt2>
      <DriverGoogle src={`${URL_SERVER}/image/drive.png`}/>
      <TitleSt3>Удобно и просто, просто начните</TitleSt3>
      <TextSt3>Удобный интерфейс поможет вам быстро освоится в нащей программе и через пару минут вы будете себя чувствовать как дома</TextSt3>
      <CustomButtom onClick={onNewUser}>Начать прямо сейчас!</CustomButtom>
    </ModalCard>
  </Modal>
)

const CustomButtom = styled(Button)` && {
  position: absolute;
  width: 182px;
  height: 34px;
  left: 280px;
  top: 427px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  flex: none;
  order: 0;
  align-self: center;
  text-transform: none;
  background: #2285EE;
} &&:hover {
  background: #2285EE;
}`;

const TextSt3 = styled.span`{
  position: absolute;
  width: 207px;
  height: 99px;
  left: 494px;
  top: 314px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

const TitleSt3 = styled.span` {
  position: absolute;
  width: 207px;
  height: 44px;
  left: 494px;
  top: 258px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

const TextSt2 = styled.span`{
  position: absolute;
  width: 207px;
  height: 99px;
  left: 267px;
  top: 314px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

const TitleSt2 = styled.span` {
  position: absolute;
  width: 207px;
  height: 44px;
  left: 267px;
  top: 258px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

const TextSt1 = styled.span`{
  position: absolute;
  width: 207px;
  height: 99px;
  left: 40px;
  top: 314px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

const TitleSt1 = styled.span` {
  position: absolute;
  width: 207px;
  height: 44px;
  left: 40px;
  top: 258px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`

const DriverGoogle = styled.img` {
  position: absolute;
  top: 171px;
  left: 494px;
}`

const NewsGoogle = styled.img` {
  position: absolute;
  top: 171px;
  left: 267px;
}`

const CalendarGoogle = styled.img` {
  position: absolute;
  top: 171px;
  left: 40px;
}`

const HelloText = styled.span` {
  position: absolute;
  width: 474px;
  height: 38px;
  left: 133px;
  top: 101px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
}`

const ModalCard = styled(Card)` && {
  position: absolute;
  width: 742px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`;

const HelloTitle = styled.span`{
  position: absolute;
  width: 545px;
  height: 33px;
  left: 98px;
  top: 56px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
}`;
