import React, { Component } from 'react'
import styled from 'styled-components'
import { TextField, Button, Table, TableBody, TableCell, TableRow, Card, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core'
import Modal from 'react-awesome-modal';

class Rating extends Component {
	
	state = {
		wMain: 100,
		hMain: 100,
		searchName: '',
		searchOtdel: 0,
		modal: false,
		dontShow: false,
		list: {
			count: 10,
			list: ['l0','l1','l2','l3','l4','l5','l6','l7','l8','l9'],
			l0: {
				name: 'Иванов Иван Иванович',
				otdel: 'AO',
				balance: 600,
				uid: 0,
			},
			l1: {
				name: 'Петров Иван Иванович',
				otdel: '1C',
				balance: 600,
				uid: 1,
			},
			l2: {
				name: 'Сидоров Иван Иванович',
				otdel: 'AO',
				balance: 600,
				uid: 2,
			},
			l3: {
				name: 'Козлов Иван Иванович',
				otdel: '1C',
				balance: 600,
				uid: 3,
			},
			l4: {
				name: 'Пеньков Иван Иванович',
				otdel: '1C',
				balance: 600,
				uid: 4,
			},
			l5: {
				name: 'Кузнецов Иван Иванович',
				otdel: '1C',
				balance: 600,
				uid: 5,
			},
			l6: {
				name: 'Попов Иван Иванович',
				otdel: 'AO',
				balance: 600,
				uid: 6,
			},
			l7: {
				name: 'Соколов Иван Иванович',
				otdel: 'AO',
				balance: 600,
				uid: 7,
			},
			l8: {
				name: 'Михайлов Иван Иванович',
				otdel: 'AO',
				balance: 600,
				uid: 8,
			},
			l9: {
				name: 'Новиков Иван Иванович',
				otdel: 'AO',
				balance: 600,
				uid: 9,
			},
		}
	}
	
	changeStateModal = () => this.setState({ modal: !this.state.modal })
	
	dontShow = () => {
		localStorage.setItem('RatingShowNews', this.state.dontShow ? 1 : 0)
		this.setState({ dontShow: !this.state.dontShow })
	}
	
	componentDidMount() {
		let dt = {}
		dt.wMain = document.documentElement.clientWidth - 20
		dt.hMain = document.documentElement.clientHeight - 175
		let item = localStorage.getItem('RatingShowNews')
		let modal = item === null || item === '1' ? true : false 

		this.setState({ ...dt, modal: modal })
	}
	
	render() {
		const { wMain, hMain, searchName, searchOtdel, list, dontShow, modal } = this.state
		
		return (
			<>
				<SearchBlock w={wMain}>
					<StyledTextField 
						label='Поиск' 
						variant='outlined' 
						color='primary' 
						w={wMain} 
						value={searchName} 
						onChange={(e) => this.setState({ searchName: e.target.value })}
					/>
					<StyledSelect 
						variant='outlined' 
						color='primary' 
						value={searchOtdel} 
						onChange={(e) => this.setState({ searchOtdel: e.target.value })}
					>
						<MenuItem value={0}>Все</MenuItem>
						<MenuItem value='AO'>Астрал Отчет</MenuItem>
						<MenuItem value='1C'>1С Отчетность</MenuItem>
					</StyledSelect>
				</SearchBlock>
				<MainBlock w={wMain} h={hMain}>
					<Table>
						<TableBody>
						
							{list.list.map(item => {
								let vis = (searchOtdel === 0 || searchOtdel === list[item].otdel) ? true : false
								vis = vis && list[item].name.indexOf(searchName) > -1 ? true : false
								if (vis) return (
									<TableRow>
										<TableCell>{list[item].name}</TableCell>
										<TableCell>{list[item].otdel}</TableCell>
										<TableCell align='right'>{list[item].balance} баллов</TableCell>
									</TableRow>
								)
							})}
							
						</TableBody>
					</Table>
				</MainBlock>
				
				
				<Modal 
					visible={modal}
					width="400"
					height="300"
					effect="fadeInUp"
				>
					<ModalText>
					
						<Logo>
							<img src='https://35.img.avito.st/avatar/social/256x256/5233205335.jpg' width="150px" height="150px" />
						</Logo>
						<Title>Наибольшее число баллов за прошлый месяц получил(а) Тестов Тест</Title>
						
						<Count>10000 баллов</Count>
						
						<StyleFormControlLabel
							control={
								<Checkbox checked={dontShow} value="checkedA" />
							}
							label="Больше не показывать"
							onClick={this.dontShow}
						/>
						<CloseButton variant='outlined' color='primary' onClick={this.changeStateModal}>Закрыть</CloseButton>
					</ModalText>
				</Modal>
			</>
		)
	}
}

export default Rating

const Count = styled.p`{
	position: absolute;
	top: 140px;
	left: 10px;
	height: 80px;
	width: 380px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #f50057;
}`

const Title = styled.p`{ 
	position: absolute;
	top: 0px;
	right: 10px;
	width: 215px;
	height: 145px;
	display: flex;
	align-items: center;
	word-wrap: break-word; 
}`

const Logo = styled.div`{
	position: absolute;
	top: 5px;
	left: 5px;
	width: 150px;
	height: 150px;
}`

const StyleFormControlLabel = styled(FormControlLabel)` && {
	position: absolute;
	bottom: 10px;
	left: 10px;
	user-select: none;
}`

const CloseButton = styled(Button)` && {
	position: absolute;
	bottom: 10px;
	right: 10px;
}`

const ModalText = styled.div `{
  padding: 10px;
  position: relative;
  width: 380px;
  height: 280px;
}`

const HeadTableCell = styled(TableCell)` && {
	font: 14pt normal Arial;
	color: #757575;
}`


const MainBlock = styled.div`{
	width: ${p=>p.w - 20}px;
	height: ${p=>p.h}px;
	margin: 10px;
	border: 1px solid #9fa8da;
	border-radius: 5px;
	padding: 10px;
	overflow-y: scroll;
}`

const SearchBlock = styled.div`{
	width: ${p=>p.w}px;
	display: flex;
	justify-content: space-between;
	margin: 10px;
}`

const StyledSelect = styled(Select)` && {
	width: 250px;
}`

const StyledTextField = styled(TextField)` && {
	width: ${p=>p.w - 270}px;
}`