import React from 'react'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import SettingDevelopTest from 'Comp/Testing/Develop/setting'
import { MenuAddQuest } from 'Comp/Testing/Develop/MenuTree'
import { NewTree } from 'Comp/Testing/Develop/Tree/index'
import { Panel, StyleDivTree, AddTreeButton, SetCard, TopSetCard } from 'Comp/Testing/Develop/Style'
import { BuildOutlined } from '@material-ui/icons'

export const TreePanel = (props) => {
	return (
    <DevelopConsumer>
    {context => {
      if (!context) return (<>Load...</>)
      else {
        const { hPanel, tree, targetMenuBlock, mainTreeMenu, targetMenuAddQuest, focus } = context.state
        return (
          <Panel h={hPanel} onContextMenu={context.onNothingContext}>
      			<MenuAddQuest />
      			<StyleDivTree>
      				<AddTreeButton variant='outlined' color='primary' onClick={context.onModal}>Добавить блок</AddTreeButton>
      				<AddTreeButton variant='outlined' color='primary' onClick={context.onMenuAddQuest}>Добавить вопрос</AddTreeButton>
      			</StyleDivTree>
      			<NewTree />
      			<SetCard onClick={context.onChangeStateSettingPanel}>
					<TopSetCard>
						Настройка
						<BuildOutlined size='small' />
					</TopSetCard>
				</SetCard>
      		</Panel>
        )
      }
    }}
    </DevelopConsumer>
	)
}
