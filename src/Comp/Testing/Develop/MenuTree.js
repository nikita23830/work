/* Здесь представленный компоненты открывающиеся при нажатии ПКМ в дереве разработки тестирования */
import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'

/* Меню при ПКМ на блок */
export const MenuTreeBlock = () => (
	<DevelopConsumer>
		{context => {
			if (!context.state) return (<>Load...</>)
			else {
				const { targetMenuBlock } = context.state
				return (
					<Menu
						id="simple-menu"
				    anchorEl={targetMenuBlock}
				    keepMounted
				    open={Boolean(targetMenuBlock)}
				    onClose={context.onClose}
				  >
						<MenuItem onClick={context.onNewQuestInBlock()}>Создать новый вопрос</MenuItem>
						<MenuItem onClick={context.onModal}>Создать новый блок</MenuItem>
						<hr width="100%" />
				    <MenuItem onClick={context.onModalEdit}>Переименовать</MenuItem>
				    <MenuItem onClick={context.onPreDeleteBlock()}>Удалить</MenuItem>
				  </Menu>
				)
			}
		}}
	</DevelopConsumer>
)

/* Меню при добавлении вопроса через вверхную кнопку */
export const MenuAddQuest = () => (
	<DevelopConsumer>
		{context => {
			if (!context.state) return (<>Load...</>)
			else {
				const { targetMenuAddQuest, tree } = context.state
				return (
					<Menu
						id="simple-menu"
				    anchorEl={targetMenuAddQuest}
				    keepMounted
				    open={Boolean(targetMenuAddQuest)}
				    onClose={context.onCloseMenuAddQuest}
						PaperProps={{
				    	style: {
				    		maxHeight: 48 * 4.5,
				      	width: 300,
				      },
				    }}
				   >
						{tree.blockList.map(i => (
							<MenuItem onClick={context.onNewQuestInBlock(i)}>{tree[i].name}</MenuItem>
						))}
				  </Menu>
				)
			}
		}}
	</DevelopConsumer>
)

/* Меню при ПКМ на вопрос */
export const MenuTreeItem = () => (
	<DevelopConsumer>
		{context => {
			if (!context.state) return (<>Load...</>)
			else {
				const { targetItemTree, focusBlock } = context.state
				return (
					<Menu
						id="simple-menu"
				    anchorEl={targetItemTree}
				    keepMounted
				    open={Boolean(targetItemTree)}
				    onClose={context.onCloseMenuTreeItem}
						onContextMenu={context.onNothingContext}
				  >
						<MenuItem onClick={context.onNewQuestInBlock(focusBlock)}>Создать новый вопрос</MenuItem>
						<hr width="100%" />
				    <MenuItem onClick={context.onDeleteQuest}>Удалить</MenuItem>
				  </Menu>
				)
			}
		}}
	</DevelopConsumer>
)
