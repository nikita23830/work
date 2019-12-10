import React, { Component } from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Button } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { MenuTreeBlock } from 'Comp/Testing/Develop/MenuTree'

class NewTree extends Component{
  render() {
    const { h, tree, onFocusQuest, focus, onCloseMenuTreeBlock, targetMenuBlock, onMenuTreeBlock, onModal, onNewQuestInBlock, onModalEdit, onDeleteBlock, onMenuTreeItem, onCloseMenuTreeItem } = this.props
    return (
      <Root h={h}>
        <MenuTreeBlock target={targetMenuBlock} onClose={onCloseMenuTreeBlock} onModal={onModal} onNewQuestInBlock={onNewQuestInBlock} onModalEdit={onModalEdit} onDeleteBlock={onDeleteBlock} />

        {tree.blockList.map(i => {
          let focusBlock = tree[i].quests.indexOf(focus)
          return (
            <StyleExpansionPanel focusBlock={focusBlock}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id={i}
                onContextMenu={onMenuTreeBlock}
              >
                <Typography>{tree[i].name}</Typography>
              </ExpansionPanelSummary>
              <StyledExpansionPanelDetails>
                {tree[i].quests.map(j => (
                  <StyleButton focus={focus} uid={j} disableRipple variant='outlined' onClick={onFocusQuest(tree[j].id)} onContextMenu={onMenuTreeItem({ block: i, item: j })}>
                    {tree[j].name === '' ? (<em>Без названия</em>) : tree[j].name}
                  </StyleButton>
                ))}
              </StyledExpansionPanelDetails>
            </StyleExpansionPanel>
          )
        })}
      </Root>
    )
  }
}

export default NewTree

const Root = styled.div` {
  height: ${p=>p.h - 115}px;
  flex-grow: 1;
  max-width: 400px;
  margin: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  word-wrap: break-word;
}`

const StyleExpansionPanel = styled(ExpansionPanel)` && {
  border: 1px solid ${p => p.focusBlock !== -1 ? '#3f51b5' : '#c4c4c4'};
}`

const StyleButton = styled(Button)` && {
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid ${p => p.focus === p.uid ? '#3f51b5' : '#c4c4c4'};
  text-transform: none;
}`

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)` && {
  display: flex;
  flex-direction: column;
}`
