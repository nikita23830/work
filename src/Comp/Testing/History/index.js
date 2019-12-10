import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, TextField, Button, Table, TableCell, TableRow, TableHead, TableBody, MenuItem } from '@material-ui/core'
import HistoryTestModal from './HistoryModal'

class HistoryTesting extends Component {

	state = {
		hSearch: 100,
		wSearch: 100,
		searchTest: '',
		balSearch: '',
		modal: false,
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
		const { wSearch, hSearch, searchTest, balSearch, modal } = this.state
		const bal = ['<10','>10 и <20','>20 и <30','>30 и <40','>40 и <50','>50 и <60','>60 и <70','>70 и <80','>80 и <90','>90',]
		return (
			<>
				<SearchTest w={wSearch}>
					<NameTextField
						label='Наименование'
						variant='outlined'
						value={searchTest}
						color='primary'
						name='searchTest'
						w={wSearch}
						select
						onChange={this.changeSearch}
					>
						<MenuItem value="">Все</MenuItem>
						<MenuItem value={1}>АО 3 квартал 2019</MenuItem>
					</NameTextField>
					<SumTextField
						label='Набрано баллов'
						variant='outlined'
						value={balSearch}
						color='primary'
						name='balSearch'
						w={wSearch}
						select
						onChange={this.changeSearch}
					>
						<MenuItem value="">Все</MenuItem>
						{bal.map(i => (<MenuItem value={i}>{i}</MenuItem>))}
					</SumTextField>
				</SearchTest>
				<HistoryList w={wSearch} h={hSearch}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Наименование</TableCell>
								<TableCell>Дата</TableCell>
								<TableCell>Набрано</TableCell>
								<TableCell>Максимум</TableCell>
								<TableCell>Затрачено времени</TableCell>
								<TableCell>Допустимое время</TableCell>
								<TableCell>Просмотреть</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>АО 3 квартал 2019</TableCell>
								<TableCell>09.10.2019</TableCell>
								<TableCell>89</TableCell>
								<TableCell>90</TableCell>
								<TableCell>00:05:00</TableCell>
								<TableCell>01:40:00</TableCell>
								<TableCell>
									<Button variant='outlined' color='primary' fullWidth onClick={this.changeStateModal}>
										Просмотреть
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>АО 3 квартал 2019</TableCell>
								<TableCell>09.10.2019</TableCell>
								<TableCell>89</TableCell>
								<TableCell>90</TableCell>
								<TableCell>00:05:00</TableCell>
								<TableCell>01:40:00</TableCell>
								<TableCell>
									<Button variant='outlined' color='primary' fullWidth>
										Просмотреть
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</HistoryList>

				<HistoryTestModal modal={modal} changeStateModal={this.changeStateModal} />
			</>
		)
	}
}

const NameTextField = styled(TextField)` && {
	width: ${p=>p.w - 260}px;
	height: 40px;
	text-align: left;
}`

const SumTextField = styled(TextField)` && {
	width: 250px;
	height: 40px;
	text-align: left;
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

export default HistoryTesting
