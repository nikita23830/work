import React from 'react'
import { Typography, TextField, Button, Card } from '@material-ui/core'
import Modal from 'react-awesome-modal'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { SubmitButton, StyleTypography, CancelButton, StyleCard, ModalText, ModalTextField, ButtonModal, CloseButton, SaveButton } from 'Comp/Testing/Develop/Style'

export const ModalBlock = ({ type }) => (
  <DevelopConsumer>
    {context => {
      if (!context.state) return (<>Load...</>)
      else {
        const { modal, tempNameBlock, modalEdit, tempNewNameBlock } = context.state
        return (
          <Modal visible={type === 'add' ? modal : modalEdit} width="600" effect="fadeInUp">
            <ModalText>
              <Typography variant="h5">{type === 'add' ? 'Создание блока вопросов' : 'Редактирование блока вопросов'}</Typography>
              <ModalTextField
                label='Введите название блока'
                variant='outlined'
                color='primary'
                value={type === 'add' ? tempNameBlock : tempNewNameBlock}
                onChange={type === 'add' ? context.onChangeTempNameBlock : context.onChangeNameBlock}
              />
              <ButtonModal>
                <CloseButton
                  variant='outlined'
                  color='secondary'
                  onClick={type === 'add' ? context.onModal : context.onModalEdit}
                >
                  Отмена
                </CloseButton>
                <SaveButton
                  variant='outlined'
                  color='primary'
                  onClick={type === 'add' ? context.onNewBlock : context.onSaveEditBlock}
                >
                  {type === 'add' ? 'Создать' : 'Сохранить'}
                </SaveButton>
              </ButtonModal>
            </ModalText>
          </Modal>
        )
      }
    }}
  </DevelopConsumer>
)

export const DeleteBlock = () => (
  <DevelopConsumer>
    {context => {
      if (!context.state) return (<>Load...</>)
      else {
        const { requestBlockDelete, tempNewNameBlock, tree, focusBlock } = context.state
        return (
          <Modal width="600" effect="fadeInUp" visible={requestBlockDelete}>
            <StyleCard>
              <StyleTypography variant="h7" gutterBottom>
                Вы действительно желаете удалить блок "{tree[focusBlock].name}" ?
              </StyleTypography>
              <SubmitButton variant='outlined' color='secondary' onClick={context.onPreDeleteBlock(true)}>Удалить</SubmitButton>
              <CancelButton variant='outlined' color='primary' onClick={context.onChangeRequestDelete}>Отмена</CancelButton>
            </StyleCard>
          </Modal>
        )
      }
    }}
  </DevelopConsumer>
)
