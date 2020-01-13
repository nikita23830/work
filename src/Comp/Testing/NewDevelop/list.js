import React, { Component } from 'react'
import styled from 'styled-components'
import { Card,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	TextField,
	Collapse,
	Checkbox,
	FormControlLabel,
	Grid,
	MenuItem,
} from '@material-ui/core'
import { Visibility, Edit, Delete, MemoryOutlined } from '@material-ui/icons'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

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
		list: -1,
		editID: -1,
		data: [
			{
				id: 1,
				name: 'АО 3 квартал 2019',
				eNum: 206,
				outNum: 100,
				dataIn: '18.12.2019',
				dataOut: '19.12.2019',
				create: 't.testov',
				otd: 'Астрал Отчет',
				tree: {
					block: [
						{
							name: 'Блок 23',
							quest: [
								{
									name: 'Вопрос 1',
									type: 'one',
									ans: [{text: 'alalal'},{text: 'rowe'}],
									true: 'a1'
								}
							]
						}
					],
					focus: 0,
					focusBlock: 0,
					loader: false
				}
			},
		]
	}

	componentDidMount() {
		let hMain = document.documentElement.clientHeight - 104
		let wMain = document.documentElement.clientWidth - 40
		this.setState({ hMain: hMain, wMain: wMain })
	}

	onDevPreView = () => this.setState({ list: -1 })
	showDelete = (e) => () => this.setState({ deleteTest: 'АО 3 квартал 2019', showDelete: !this.state.showDelete })
	onCloseEditor = () => this.setState({ editID: -1 })

	onSaveTree = (json) => async() => {
		const { editID, data } = this.state
		console.log(data[editID].tree, json)
		data[editID].tree = json
		await this.setState({ data: data })
	}

	render() {
		const { wMain, hMain, showDevPreView, showDelete, deleteTest, list, editID, data } = this.state

		if (editID !== -1 ) return (
			<Editor onCloseEditor={this.onCloseEditor} tree={data[editID].tree} onSaveTree={this.onSaveTree}/>
		)

		else return (
			<StyleCard h={hMain} w={wMain}>

			<DevPreView
				showDevPreView={list === -1 ? false : true}
				onDevPreView={this.onDevPreView}
				data={data[list]}
			/>
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
							<TableCell align='center'>Настройка</TableCell>
							<TableCell align='center'>Удалить</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((i, index)=>(
							<>
								<TableRow>
									<TableCell>{i.id}</TableCell>
									<TableCell>{i.name}</TableCell>
									<TableCell align='center'>{i.eNum}</TableCell>
									<TableCell align='center'>{i.outNum}</TableCell>
									<TableCell align='center'>
										<IconButton onClick={() => this.setState({ list: index })}><Visibility color='primary' /></IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={() => this.setState({ editID: index })}>	<Edit color='primary' /></IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={()=>{}}><MemoryOutlined color='primary' /></IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={this.showDelete(index)}><Delete color='primary' /></IconButton>
									</TableCell>
								</TableRow>
								<TableRow><TableCell colSpan={8}>

									<Collapse in={true}>
										<Grid container spacing={3}>
											<StyleGrid item xs={12} sm={12}>
												<TextField label='Название теста' fullWidth />
											</StyleGrid>
											<StyleGrid item xs={12} sm={4}>
												<FormControlLabel
									        control={
									          <Checkbox value="checkedA" color='primary' />
									        }
									        label="Использовать рандомайзер"
									      />
											</StyleGrid>
											<StyleGrid item xs={12} sm={8}>
												<Select
													labelId="main-block-setting"
													id="main-block-setting"
													fullWidth
													value={0}
												>
													<MenuItem value={0}><em>Основной блок</em></MenuItem>
													<MenuItem value={20}>Twenty</MenuItem>
													<MenuItem value={30}>Thirty</MenuItem>
												</Select>
											</StyleGrid>
											<StyleGrid item xs={12} sm={4}>
												<TextField color='primary' label='Количество вопросов' fullWidth />
											</StyleGrid>
											<StyleGrid item xs={12} sm={4}>
												<CustomFormControl fullWidth>
													<MuiPickersUtilsProvider utils={DateFnsUtils}>
														<KeyboardDatePicker
															fullWidth
															disableToolbar
															label='Дата начало теста'
															variant="inline"
															format="dd.MM.yyyy"
															margin="normal"
															id="date-picker-inline"
															KeyboardButtonProps={{
																'aria-label': 'change date',
															}}
														/>
													</MuiPickersUtilsProvider>
												</CustomFormControl>
											</StyleGrid>
											<StyleGrid item xs={12} sm={4}>
												<CustomFormControl fullWidth>
													<MuiPickersUtilsProvider utils={DateFnsUtils}>
														<KeyboardDatePicker
															disableToolbar
															fullWidth
															label='Дата окончания теста'
															variant="inline"
															format="dd.MM.yyyy"
															margin="normal"
															id="date-picker-inline"
															KeyboardButtonProps={{
																'aria-label': 'change date',
															}}
														/>
													</MuiPickersUtilsProvider>
												</CustomFormControl>
											</StyleGrid>
										</Grid>

									</Collapse>

								</TableCell></TableRow>
							</>
						))}
					</TableBody>
				</Table>

			</StyleCard>
		)
	}
}

const StyleGrid = styled(Grid)` && {
	height: 80px;
	display: flex;
	align-items: center;
}`

const CustomFormControl = styled(FormControl)` && {
	margin-top: -16px;
}`

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
