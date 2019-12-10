import React, { Component } from 'react'
import { Modal, Typography, Checkbox, FormControl, Select, TextField } from '@material-ui/core'
import { SettingCard, LineSetting, SettingInputLabel, SettingFormControlLabel } from 'Comp/Testing/Develop/Style'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { TranferList } from 'Comp/Testing/Develop/TranferList'

export const SettingDevelopTest = () => (
	<DevelopConsumer>
		{context => {
			if (!context.state) return (<>Load...</>)
			else {
				const { openSettingPanel, tree } = context.state
				return (
					<Modal open={openSettingPanel} onClose={context.onChangeStateSettingPanel}>
						<SettingCard>
							<TextField
								required
								label="Название теста"
								margin="normal"
								variant='outlined'
								value={tree.name}
								onChange={context.onChangeNameTest}
							/>
							<SettingFormControlLabel
								control={
									<Checkbox 
										color='primary' 
										onChange={context.onChangeRandomTest}
										checked={tree.random}
									/>
								}
								color='primary'
								label="Использование рандомайзера"
							/>
							<FormControl>
								<SettingInputLabel id="develop-setting-main-block">Основной блок</SettingInputLabel>
								<Select
									required
									native
									labelId="develop-setting-main-block"
									variant='outlined'
									value={tree.mainBlock}
									onChange={context.onChangeMainBlock}
								>
									<option value="" />
									{tree.blockList.map(i => (
										<option value={i}>{tree[i].name}</option>
									))}
								</Select>
							</FormControl>
							<TextField
								required
								label="Количество вопросов"
								margin="normal"
								variant='outlined'
								value={tree.settingNum}
								onChange={context.onChangeSettingNum}
							/>
							<TextField
								required
								label="Время прохождения"
								margin="normal"
								type="number"
								variant='outlined'
							/>
							<TextField
								required
								label="Действителен с"
								margin="normal"
								type="number"
								variant='outlined'
							/>
							<TextField
								required
								label="Действителен по"
								margin="normal"
								type="number"
								variant='outlined'
							/>
							<hr width="10%" />
							<Typography variant='h7'>Доступен для</Typography>
							<TranferList />
						</SettingCard>
					</Modal>
				)
			}
		}}
	</DevelopConsumer>
)