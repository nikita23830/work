import React, { Component } from 'react'
import styled, { keyframes } from "styled-components"
import Modal from 'react-awesome-modal'
import { IconButton, Typography } from '@material-ui/core'
import { CancelOutlined } from '@material-ui/icons'

class HistoryTestModal extends Component {

  render () {
    const { modal, changeStateModal } = this.props
    return (
      <CustomModal
        visible={modal}
        width="600"
        effect="fadeInUp"
      >
        <ModalText>
          <CustomTypography>АО 3 квартал 2019</CustomTypography>
          <CustomIconButton onClick={changeStateModal}>
            <CancelOutlined color='primary'/>
          </CustomIconButton>

          <ModalDivText>
            <TextQuest>Первый вопрос</TextQuest>
            <MyAns t={true}>Ваш ответ: Мой ответ</MyAns>
            <MyAns t={true}>Верный ответ: Мой ответ</MyAns>
            <hr />
            <TextQuest>Второй вопрос</TextQuest>
            <MyAns t={false}>Ваш ответ: Неверный ответ</MyAns>
            <MyAns t={true}>Верный ответ: Верный ответ</MyAns>
            <hr />
            <TextQuest>Первый вопрос</TextQuest>
            <MyAns t={true}>Ваш ответ: Мой ответ</MyAns>
            <MyAns t={true}>Верный ответ: Мой ответ</MyAns>
            <hr />
            <TextQuest>Второй вопрос</TextQuest>
            <MyAns t={false}>Ваш ответ: Неверный ответ</MyAns>
            <MyAns t={true}>Верный ответ: Верный ответ</MyAns>
            <hr />
            <TextQuest>Первый вопрос</TextQuest>
            <MyAns t={true}>Ваш ответ: Мой ответ</MyAns>
            <MyAns t={true}>Верный ответ: Мой ответ</MyAns>
            <hr />
            <TextQuest>Второй вопрос</TextQuest>
            <MyAns t={false}>Ваш ответ: Неверный ответ</MyAns>
            <MyAns t={true}>Верный ответ: Верный ответ</MyAns>
            <hr />
          </ModalDivText>

        </ModalText>
      </CustomModal>
    )
  }
}

const rotate = keyframes`
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
`

const opacity = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`

const CustomModal = styled(Modal)` && {
  max-height: 550px;
  opacity: 0;
  animation: ${p=>p.opacity ? opacity : ''} 2s ease both;
}`

const ModalDivText = styled.div `{
  margin: 10px;
  max-height: 550px;
  overflow-y: scroll;
  text-align: left;
  word-wrap: break-word;
}`

const TextQuest = styled.p `{
  font: 14pt bold Arial;
  word-wrap: break-word;
}`

const MyAns = styled.p `{
  font: 12pt normal Arial;
  word-wrap: break-word;
  color: ${p=>p.t ? '#0a5916' : '#f00'}
}`

const ModalText = styled.div `{
  padding: 10px;
  position: relative;
}`

const CustomIconButton = styled(IconButton)` && {
  position: absolute;
  top: 0px;
  right: 0px;
} &:hover {
  animation: ${rotate} 0.6s ease-in-out both;
}`

const CustomTypography = styled(Typography)` && {
  white-space: pre-wrap;
}`

export default HistoryTestModal
