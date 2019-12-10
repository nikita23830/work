import React from 'react'
import styled from 'styled-components'
import { RadioGroup, Table, TableBody, TableRow, TableCell, FormControlLabel, Radio, TextField, Checkbox, IconButton, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

export const DevelopMainOneVariant = ({ wTopCard, tree, focus, onNewAnsInQuest, onDeleteAnsInQuest, onChangeAnsQuest, onChangeAnsTrue }) => (
	<RadioGroup aria-label="gender" name="gender1" value={parseInt(tree[focus].aTrue[0],0)}>
		<Table>
			<TableBody>
				{tree[focus].aList.map((i, index) => (
					<TableRow>
						<RTableCell align='center'>
							<StyleFormControlLabel value={index} onClick={onChangeAnsTrue} control={<Radio color='primary' />} />
						</RTableCell>
						<TableCell>
							<AnsTextField label='Ответ' color='primary' w={wTopCard} multiline value={tree[focus][i]} onChange={onChangeAnsQuest(i)} />
						</TableCell>
						<RTableCell align='center'>
							<IconButton onClick={onDeleteAnsInQuest(i)}>
								<Delete color='secondary' />
							</IconButton>
						</RTableCell>
					</TableRow>
				))}
				<TableRow>
					<TableCell colSpan={3}>
						<AddAnsButton color="primary" onClick={onNewAnsInQuest}>
							Добавить ответ
						</AddAnsButton>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</RadioGroup>
)

export const DevelopMainManyVariant = ({ wTopCard, tree, focus, onNewAnsInQuest, onDeleteAnsInQuest, onChangeAnsQuest, onChangeAnsTrue }) => (
	<Table>
		<TableBody>
			{tree[focus].aList.map((i, index) => {
				let checked = false
				tree[focus].aTrue.map(j => {if (parseInt(j,0) === index) checked = true})
				return (
					<TableRow>
						<RTableCell align='center'>
							<StyleCheckbox color='primary' onChange={onChangeAnsTrue} value={index} checked={checked}/>
						</RTableCell>
						<TableCell>
							<AnsTextField label='Ответ' color='primary' w={wTopCard} multiline value={tree[focus][i]} onChange={onChangeAnsQuest(tree[focus][i])} />
						</TableCell>
						<RTableCell align='center'>
							<IconButton onClick={onDeleteAnsInQuest(i)}>
								<Delete color='secondary' />
							</IconButton>
						</RTableCell>
					</TableRow>
				)
			})}
			<TableRow>
				<TableCell colSpan={3}>
					<AddAnsButton color="primary" onClick={onNewAnsInQuest}>
						Добавить ответ
					</AddAnsButton>
				</TableCell>
			</TableRow>
		</TableBody>
	</Table>
)

const AddAnsButton = styled(Button)` && {
	width: 150px;
	border-bottom: 1px solid #3f51b5;
	margin: 15px;
}`

const StyleCheckbox = styled(Checkbox)` && {
	width: 20px;
}`

const RTableCell = styled(TableCell)` && {
	width: 65px;
	min-width: 65px;
	max-width: 65px;
	padding-right: 0px;
	padding-left: 0px;
}`

const StyleFormControlLabel = styled(FormControlLabel)` && {
	width: 65px;
	display: flex;
	justify-content: center;
	margin-left: -1px;
	margin-right: -10px;
}`

const AnsTextField = styled(TextField)` && {
	width: ${p=>p.w - 530}px;
	margin-left: 0px;
	margin-top: 0px;
}`
