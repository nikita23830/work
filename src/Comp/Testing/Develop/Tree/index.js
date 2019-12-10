import React, { Component } from 'react'
import { ExpansionPanelSummary, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { MenuTreeBlock } from 'Comp/Testing/Develop/MenuTree'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { StyleButton, Root, StyleExpansionPanel, StyledExpansionPanelDetails } from 'Comp/Testing/Develop/Style'

export const NewTree = () => (
  <DevelopConsumer>
    {context => {
      if (!context.state) return (<>Load...</>)
      else {
        const { hPanel, tree, focus, targetMenuBlock } = context.state
        return (
          <Root h={hPanel}>
            <MenuTreeBlock />
            {tree.blockList.map(i => {
              let focusBlock = tree[i].quests.indexOf(focus)
              return (
                <StyleExpansionPanel focusBlock={focusBlock}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id={i}
                    onContextMenu={context.onMenuTreeBlock}
                  >
                    <Typography>{tree[i].name}</Typography>
                  </ExpansionPanelSummary>
                  <StyledExpansionPanelDetails>
                    {tree[i].quests.map(j => (
                      <StyleButton
                        focus={focus}
                        uid={j}
                        disableRipple
                        variant='outlined'
                        onClick={context.onFocusQuest(tree[j].id)}
                        onContextMenu={context.onMenuTreeItem({ block: i, item: j })}
                      >
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
    }}
  </DevelopConsumer>
)
