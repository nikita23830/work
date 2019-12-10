import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, TextField, Button, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import EditorTest from 'Comp/Testing/Develop/editor'

class DevelopTest extends Component {

	state = {
		hSearch: 100,
		wSearch: 100,
		searchTest: '',
		balSearch: '',
		modal: false,
		editor: true,
	}

	componentDidMount() {
		let dt = {}
		dt.wSearch = document.documentElement.clientWidth - 40
		dt.hSearch = document.documentElement.clientHeight - 190
		this.setState({ ...dt })
	}

	changeStateModal = () => this.setState({ modal: !this.state.modal })

	changeSearch = (e) => this.setState({ [e.target.name]: e.target.value })

	render () {
	const { wSearch, hSearch, searchTest, balSearch, modal, editor } = this.state
	if (editor) return <EditorTest />
	else return (
			<>
				<SearchTest w={wSearch}>
					<NameTextField
						label='Наименование'
						variant='outlined'
						value={searchTest}
						color='primary'
						name='searchTest'
						w={wSearch}
						onChange={this.changeSearch}
					/>
					<SearchButton variant='outlined' color='primary'>Поиск</SearchButton>
					<SearchButton variant='outlined' color='primary'>Создать</SearchButton>
				</SearchTest>
				<HistoryList w={wSearch} h={hSearch}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Наименование</TableCell>
								<TableCell align='center'>Максимум</TableCell>
								<TableCell align='center'>Допустимое время</TableCell>
								<TableCell align='center'>Просмотреть</TableCell>
								<TableCell align='center'>Редактировать</TableCell>
								<TableCell align='center'>Удалить</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>АО 3 квартал 2019</TableCell>
								<TableCell align='center'>90</TableCell>
								<TableCell align='center'>01:40:00</TableCell>
								<TableCell>
									<Button variant='outlined' color='primary' fullWidth onClick={this.changeStateModal}>
										Просмотреть
									</Button>
								</TableCell>
								<TableCell>
									<Button variant='outlined' color='primary' fullWidth onClick={this.changeStateModal}>
										Редактировать
									</Button>
								</TableCell>
								<TableCell align='center'>
									<IconButton variant='outlined' color='secondary' onClick={this.changeStateModal}>
										<DeleteOutlined color='secondary' />
									</IconButton>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>АО 3 квартал 2019</TableCell>
								<TableCell align='center'>90</TableCell>
								<TableCell align='center'>01:40:00</TableCell>
								<TableCell>
									<Button variant='outlined' color='primary' fullWidth onClick={this.changeStateModal}>
										Просмотреть
									</Button>
								</TableCell>
								<TableCell>
									<Button variant='outlined' color='primary' fullWidth onClick={this.changeStateModal}>
										Редактировать
									</Button>
								</TableCell>
								<TableCell align='center'>
									<IconButton variant='outlined' color='secondary' onClick={this.changeStateModal}>
										<DeleteOutlined color='secondary' />
									</IconButton>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</HistoryList>
			</>
		)
	}
}

const NameTextField = styled(TextField)` && {
	width: ${p=>p.w - 340}px;
	height: 40px;
	text-align: left;
}`

const SumTextField = styled(TextField)` && {
	width: 250px;
	height: 40px;
	text-align: left;
}`

const SearchButton = styled(Button)` && {
	width: 150px;
	height: 55px;
}`

const SearchTest = styled(Card)` && {
	margin-left: 10px;
	margin-bottom: 10px;
	width: ${p=>p.w}px;
	height: 60px;
	padding: 10px;
	display: flex;
	justify-content: space-between;
}`

const HistoryList = styled(Card)` && {
	margin-left: 10px;
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	padding: 10px;
}`

export default DevelopTest
