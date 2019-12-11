import React from 'react'
import styled from 'styled-components'
import { Field  } from "react-final-form";
import { TextField } from 'final-form-material-ui'
import { BottomNavigation, BottomNavigationAction, Collapse, List, ListItem, ListItemText, ListItemIcon, Fab } from '@material-ui/core'
import { InsertDriveFileOutlined, AspectRatioOutlined, Add, EditOutlined, DeleteOutlined, Done } from '@material-ui/icons'
import { SnackbarProvider, withSnackbar } from 'notistack';

import action from 'Comp/Testing/NewDevelop/Snackbar'
import { DevelopConsumer, DevelopContext } from 'Comp/Testing/NewDevelop/Context'
import { Root } from 'Comp/Testing/Develop/Style'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Tree extends React.Component {
  state={
    type: 0,
    update: true,
    edit: -1,
    requestDel: -1,
  }

  onChangeType = (e, val) => this.setState({ type: val, requestDel: -1 })

  onAddBlock = () => {
    const { formApi, values } = this.context
    let newValues = values
    newValues.block.push({ name: 'Новый блок', quest: [{ name: 'Новый вопрос', type: 'one', ans: [] }] })
    formApi.change('block', newValues.block)
    this.setState({ update: !this.state.update })
  }

  onAddQuest = () => {
    const { formApi, values, focusBlock } = this.context
    let newValues = values
    newValues.block[focusBlock].quest.push({ name: '', type: 'one', ans: [] })
    formApi.change('block', newValues.block)
    this.setState({ update: !this.state.update })
  }

  onChangeFocusBlock = (index) => () => {
    this.context.formApi.change('focusBlock', index)
    this.context.formApi.change('focus', 0)
  }

  onDeleteBlock = (ind) => async () => {
    const { requestDel, update } = this.state
    const { values, formApi } = this.context
    const { enqueueSnackbar } = this.props
    const name = values.block[ind].name
    if (requestDel === -1) {
      if (values.block.length === 1) enqueueSnackbar(`Невозможно удалить единственный блок`, {variant: 'info',autoHideDuration: 3000})
      else { enqueueSnackbar(`Для удаления блока '${name}' нажмите на кнопку удаления повторно`, {variant: 'info',autoHideDuration: 3000})
        this.setState({ requestDel: ind }) }}
    else if (requestDel !== ind) { enqueueSnackbar(`Для удаления блока '${name}' нажмите на кнопку удаления повторно`, {variant: 'info',autoHideDuration: 3000})
      this.setState({ requestDel: ind }) }
    else if (requestDel === ind) {
      await formApi.change('loader', true)
      let newValues = values.block.filter((i, index) => { return index !== requestDel })
      await this.block0.click()
      await sleep(1000)
      await formApi.change('block', newValues)
      await formApi.change('loader', false)
      await this.setState({ update: !this.state.update, requestDel: -1 })
    }
  }

  onDeleteQuest = (ind) => async () => {
    const { requestDel, update } = this.state
    const { values, formApi, focusBlock } = this.context
    const { enqueueSnackbar } = this.props
    const name = values.block[focusBlock].quest[ind].name
    if (requestDel === -1) {
      if (values.block[focusBlock].quest.length === 1) enqueueSnackbar(`Невозможно удалить единственный вопрос`, {variant: 'info',autoHideDuration: 3000})
      else { enqueueSnackbar(`Для удаления вопроса '${name}' нажмите на кнопку удаления повторно`, {variant: 'info',autoHideDuration: 3000})
        this.setState({ requestDel: ind }) }}
    else if (requestDel !== ind) { enqueueSnackbar(`Для удаления вопроса '${name}' нажмите на кнопку удаления повторно`, {variant: 'info',autoHideDuration: 3000})
      this.setState({ requestDel: ind }) }
    else if (requestDel === ind) {
      await formApi.change('loader', true)
      let newValues = { ...values }
      newValues.block[focusBlock].quest = newValues.block[focusBlock].quest.filter((i, index) => { return index !== requestDel })
      await this.quest0.click()
      await sleep(1000)
      await formApi.change('block', newValues.block)
      await formApi.change('loader', false)
      await this.setState({ update: !this.state.update, requestDel: -1 })
    }
  }

  render () {
    return (
      <DevelopConsumer>
        {context => {
          const { hPanel, formApi, values, focus, focusBlock } = context
          const { type, edit } = this.state
          return (
              <Root h={hPanel}>
                <BottomNavigation
                  showLabels
                  value={type}
                  onChange={this.onChangeType}
                >
                  <BottomNavigationAction label="Блоки" icon={<AspectRatioOutlined />} />
                  <BottomNavigationAction label="Вопросы" icon={<InsertDriveFileOutlined />} />
                </BottomNavigation>

                <StyleCollapse in={!type} h={hPanel}> {/* block */}
                  <List component="nav" aria-label="secondary mailbox folders">
                    {values.block.map((i, index) => (
                      <>
                        {index === edit && <StyleEditBlock>
                          <Field
                            name={`block[${focusBlock}].name`}
                            component={StyleTextField}
                            label='Название блока'
                            color='secondary'
                            required={true}
                          />
                          <BlockSave onClick={() => this.setState({ edit: -1 })}><Done color='primary' /></BlockSave>
                        </StyleEditBlock>}

                        {index !== edit && <StyleListItem
                          button
                          onClick={this.onChangeFocusBlock(index)}
                          i={index}
                          ref={block => this[`block${index}`] = block}
                          active={focusBlock}
                          edit={edit}
                        >
                          <StyleListItemText i={index} active={focusBlock}>
                            <StyleName> {/* если этого index нет на редактирование то отобразить default */}
                              <BlockName>{i.name}</BlockName>
                              <BlockEdit
                                onClick={() => this.setState({ edit: index })}
                              >
                                <EditOutlined color='primary' />
                              </BlockEdit>
                              <BlockDelete
                                onClick={this.onDeleteBlock(index)}
                              >
                                <DeleteOutlined color='secondary' />
                              </BlockDelete>
                            </StyleName>
                          </StyleListItemText>
                        </StyleListItem>}
                      </>
                    ))}
                    <ListItem button onClick={this.onAddBlock}>
                      <ListItemIcon>
                        <Add color='primary' />
                      </ListItemIcon>
                      <ListItemText primary='Добавить блок' />
                    </ListItem>
                  </List>
                </StyleCollapse>

                <StyleCollapse in={type} h={hPanel}>
                  <List component="nav" aria-label="secondary mailbox folders">
                    {values.block[focusBlock].quest.map((i, index) => (
                      <StyleListItem
                        button
                        onClick={() => formApi.change('focus', index)}
                        i={index}
                        active={focus}
                        ref={quest => this[`quest${index}`] = quest}
                      >
                        <StyleListItemText i={index} active={focus}>
                          <StyleName>
                            <QuestName>{!i.name ? <em>Без названия</em> : i.name}</QuestName>
                            <BlockDelete
                              onClick={this.onDeleteQuest(index)}
                            >
                              <DeleteOutlined color='secondary' />
                            </BlockDelete>
                          </StyleName>
                        </StyleListItemText>
                      </StyleListItem>
                    ))}
                    <ListItem button onClick={this.onAddQuest}>
                      <ListItemIcon>
                        <Add color='primary' />
                      </ListItemIcon>
                      <ListItemText primary='Добавить вопрос' />
                    </ListItem>
                  </List>
                </StyleCollapse>

              </Root>
          )
        }}
      </DevelopConsumer>
    )
  }
}

Tree.contextType = DevelopConsumer;
export default withSnackbar(Tree)

const StyleCollapse = styled(Collapse)` && {
  max-height: ${p=>p.h - 66}px;
  overflow-y: auto;
}`

const StyleListItemText = styled(ListItemText)` && {
  color: ${p=>parseInt(p.active) === parseInt(p.i) ? '#fff' : '#000'};
}`

const StyleListItem = styled(ListItem)` && {
  background-color: ${p=>(parseInt(p.active) === parseInt(p.i) && parseInt(p.i) !== parseInt(p.edit)) ? '#3f51b5' : '#fff'};
  border: 1px solid ${p=>(parseInt(p.active) === parseInt(p.i) && parseInt(p.i) === parseInt(p.edit)) ? '#3f51b5' : '#fff'};
  position: relative;
} &&:hover {
  background-color: ${p=>(parseInt(p.active) === parseInt(p.i) && parseInt(p.i) !== parseInt(p.edit)) ? '#3f51b5' : '#fff'};
}`

const StyleName = styled.div` {
  max-width: 308px;
  display: flex;
  flex-direction: row;
}`

const BlockName = styled.div` {
  width: 208px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
}`

const QuestName = styled.div` {
  width: 258px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
}`

const BlockEdit = styled.div` && {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: #fff;
  justify-content: center;
  margin: 0px 5px 0px 5px;
}`

const BlockDelete = styled.div` && {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: #fff;
  justify-content: center;
  margin: 0px 5px 0px 5px;
}`

const BlockSave = styled.div` && {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  border: 1px solid #3f51b5;
  background-color: #fff;
  justify-content: center;
  margin-left: 20px;
  margin-top: 4px;
  cursor: pointer;
}`

const StyleTextField = styled(TextField)` && {
  color: #fff;
  border-color: #3f51b5;
  width: 258px;
}`

const StyleEditBlock = styled.div` {
  width: 305px;
  height: 58px;
  display: flex;
  flex-direction: row;
  padding: 8px 16px 8px 16px;
  border: 1px solid #3f51b5;
  user-select: none
}`
