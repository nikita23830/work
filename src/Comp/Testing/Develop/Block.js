import React from 'react'
import styled from 'styled-components'
import { Typography, TextField, Button, Card } from '@material-ui/core'
import Modal from 'react-awesome-modal'

export const ModalBlock = ({ type, visible, value, onCustomChange, onClose, onClick }) => {
  return (
    <Modal
      visible={visible}
      width="600"
      effect="fadeInUp"
    >
      <ModalText>
        <Typography variant="h5">{type === 'add' ? 'Создание блока вопросов' : 'Редактирование блока вопросов'}</Typography>
        <ModalTextField
          label='Введите название блока'
          variant='outlined'
          color='primary'
          value={value}
          onChange={onCustomChange}
        />
        <ButtonModal>
          <CloseButton
            variant='outlined'
            color='secondary'
            onClick={onClose}
          >
            Отмена
          </CloseButton>
          <SaveButton
            variant='outlined'
            color='primary'
            onClick={onClick}
          >
            {type === 'add' ? 'Создать' : 'Сохранить'}
          </SaveButton>
        </ButtonModal>
      </ModalText>
    </Modal>
  )
}

export const DeleteBlock = ({ open, name, onClick, onClose }) => (
  <Modal
    width="600"
    effect="fadeInUp"
    visible={open}
  >
    <StyleCard>
      <StyleTypography variant="h7" gutterBottom>
        Вы действительно желаете удалить блок "{name}" ?
      </StyleTypography>
      <SubmitButton variant='outlined' color='secondary' onClick={onClick(true)}>Удалить</SubmitButton>
      <CancelButton variant='outlined' color='primary' onClick={onClose}>Отмена</CancelButton>
    </StyleCard>
  </Modal>
)

const StyleTypography = styled(Typography)` && {
  width: 800px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}`

const SubmitButton = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 390px;
  height: 50px;
  border-radius: 4px 4px 4px 40px;
}`

const CancelButton = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 390px;
  height: 50px;
  border-radius: 4px 4px 40px 4px;
}`

const StyleCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 200px;
  border-right: 5px solid #1C6EA4;
  border-left: 5px solid #1C6EA4;
  border-radius: 40px;
  padding: 20px;
}`

const ModalText = styled.div` {
	height: 200px;
	width: 600px;
	position: relative;
	margin: 10px;
}`

const ModalTextField = styled(TextField)` && {
	width: 500px;
	margin-top: 20px;
}`

const ButtonModal = styled.div` {
	position: absolute;
	left: 0px;
	bottom: 0px;
	width: 580px;
	height: 60px;
	display: flex;
	justify-content: space-between;
}`

const CloseButton = styled(Button)` && {
	height: 55px;
	width: 200px;
}`

const SaveButton = styled(Button)` && {
	height: 55px;
	width: 200px;
}`
