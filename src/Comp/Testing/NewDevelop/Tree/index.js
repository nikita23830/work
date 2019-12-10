import React from 'react'
import styled from 'styled-components'
import { DevelopConsumer, DevelopContext } from 'Comp/Testing/NewDevelop/Context'
import { Root } from 'Comp/Testing/Develop/Style'
import { BottomNavigation, BottomNavigationAction, Collapse, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { InsertDriveFileOutlined, AspectRatioOutlined, Add } from '@material-ui/icons'

class Tree extends React.Component {
  state={
    type: 0,
    update: true
  }

  onChangeType = (e, val) => this.setState({ type: val })

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
    newValues.block[focusBlock].quest.push({ name: 'Вопрос 1', type: 'one', ans: [] })
    formApi.change('block', newValues.block)
    this.setState({ update: !this.state.update })
  }

  render () {
    return (
      <DevelopConsumer>
        {context => {
          const { hPanel, formApi, values, focus, focusBlock } = context
          const { type } = this.state
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
                    <StyleListItem
                      button
                      onClick={() => {
                        formApi.change('focusBlock', index)
                        formApi.change('focus', 0)
                      }}
                      i={index}
                      active={focusBlock}
                    >
                      <StyleListItemText primary={i.name} i={index} active={focusBlock}/>
                    </StyleListItem>
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
                    <StyleListItem button onClick={() => formApi.change('focus', index)} i={index} active={focus}>
                      <StyleListItemText primary={i.name} i={index} active={focus}/>
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
export default Tree

const StyleCollapse = styled(Collapse)` && {
  max-height: ${p=>p.h - 66}px;
  overflow-y: auto;
}`

const StyleListItemText = styled(ListItemText)` && {
  color: ${p=>parseInt(p.active) === parseInt(p.i) ? '#fff' : '#000'}
}`

const StyleListItem = styled(ListItem)` && {
  background-color: ${p=>parseInt(p.active) === parseInt(p.i) ? '#3f51b5' : '#fff'}
} &&:hover {
  background-color: ${p=>parseInt(p.active) === parseInt(p.i) ? '#3f51b5' : '#fff'}
}`
