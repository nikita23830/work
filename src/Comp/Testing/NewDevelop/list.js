import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, Table, TableBody, TableHead, TableRow, TableCell, IconButton, FormControl, InputLabel, Select } from '@material-ui/core'
import { Visibility, Edit, Delete } from '@material-ui/icons'
import DevPreView from 'Comp/Testing/NewDevelop/DevPreView'
import { DeleteTest } from 'Comp/Testing/NewDevelop/DeleteTest'
import Editor from 'Comp/Testing/NewDevelop/Editor'

class DevelopList extends Component {

	state = {
		hMain: 100,
		wMain: 100,
		showDevPreView: false,
		deleteTest: '',
		showDelete: false,
		list: 0,
		editID: 0,
	}

	componentDidMount() {
		let hMain = document.documentElement.clientHeight - 104
		let wMain = document.documentElement.clientWidth - 40
		this.setState({ hMain: hMain, wMain: wMain })
	}

	onDevPreView = () => this.setState({ showDevPreView: !this.state.showDevPreView })
	showDelete = (e) => () => this.setState({ deleteTest: 'АО 3 квартал 2019', showDelete: !this.state.showDelete })
	onOpenEditor = () => this.setState({ list: 0 })
	onCloseEditor = () => this.setState({ list: 1 })

	render() {
		const { wMain, hMain, showDevPreView, showDelete, deleteTest, list, editID } = this.state

		const data = [
			{
				id: 1,
				name: 'АО 3 квартал 2019',
				eNum: 206,
				outNum: 100
			},
		]

		if (list === 0 ) return (
			<Editor onCloseEditor={this.onCloseEditor} />
		)
		else return (
			<StyleCard h={hMain} w={wMain}>
				<DevPreView showDevPreView={showDevPreView} onDevPreView={this.onDevPreView} />
				<DeleteTest open={showDelete} nameTest={deleteTest} onClose={this.showDelete} />

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell>
								<StyleFormControl>
								  <InputLabel htmlFor="select-test">Название теста</InputLabel>
								  <Select
									native
									inputProps={{
									  name: 'Название теста',
									  id: 'select-test',
									}}
									value={0}
								  >
										<option value="" />
										<option value={1}>АО 3 квартал 2019</option>
										<option value={2}>АО 4 квартал 2019</option>
								  </Select>
								</StyleFormControl>
							</TableCell>
							<TableCell align='center'>Заданное кол-во вопросов</TableCell>
							<TableCell align='center'>Выходное кол-во вопросов</TableCell>
							<TableCell align='center'>Просмотр</TableCell>
							<TableCell align='center'>Редактировать</TableCell>
							<TableCell align='center'>Удалить</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(i=>(
							<TableRow>
								<TableCell>{i.id}</TableCell>
								<TableCell>{i.name}</TableCell>
								<TableCell align='center'>{i.eNum}</TableCell>
								<TableCell align='center'>{i.outNum}</TableCell>
								<TableCell align='center'>
									<IconButton onClick={this.onDevPreView}>
										<Visibility color='primary' />
									</IconButton>
								</TableCell>
								<TableCell align='center'>
									<IconButton onClick={this.onOpenEditor}>
										<Edit color='primary' />
									</IconButton>
								</TableCell>
								<TableCell align='center'>
									<IconButton onClick={this.showDelete(1)}>
										<Delete color='primary' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

			</StyleCard>
		)
	}
}

const StyleCard = styled(Card)` && {
	height: ${p=>p.h}px;
	width: ${p=>p.w}px;
	margin: 20px;
	overflow-y: scroll;
	position: relative;
}`

const StyleFormControl = styled(FormControl)` && {
  margin-top: -20px;
}`

export default DevelopList
