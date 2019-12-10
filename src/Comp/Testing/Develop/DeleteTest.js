import React from 'react'
import styled from 'styled-components'
import { Card, Typography, Button, Modal } from '@material-ui/core'

export const DeleteTest = ({ open, nameTest, onClose }) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
  >
    <StyleCard>
      <StyleTypography variant="h7" gutterBottom>
        Вы действительно желаете удалить тест "{nameTest}" ?
      </StyleTypography>
      <SubmitButton variant='outlined' color='secondary'>Удалить</SubmitButton>
      <CancelButton variant='outlined' color='primary' onClick={onClose(0)}>Отмена</CancelButton>
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
