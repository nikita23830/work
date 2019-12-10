import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableRow, Button, Tabs, Tab } from '@material-ui/core'
import Trend from 'react-trend';
import DiagramProfile from 'Comp/Rating/Profile/Diagram'
import { Textinfo } from 'Comp/Rating/Profile/Textinfo'

class Profile extends Component {

	state = {
		hMain: 100,
		wMain: 100,
		srcPerson: 'https://i0.wp.com/www.freeiconspng.com/uploads/account-icon-5.jpg?w=600',
		proc: [
			[75, 80, 100, 82],
			[78, 80, 100, 85],
			[30, 80, 100, 67],
			[10, 80, 100, 60],
			[50, 80, 100, 73],
			[62, 80, 100, 77],
			[100, 80, 100, 90],
			[81, 80, 100, 83],
			[63, 80, 100, 78],
			[17, 80, 100, 62],
			[59, 80, 100, 76],
			[72, 80, 100, 81]
		],
		datasets: [
			['6:15', 80, 0],
			['6:6', 80, 0],
			['6:20', 80, 0],
			['6:52', 80, 0],
			['10:59', 80, 0],
			['6:45', 80, 0],
			['6:32', 80, 0],
			['6:21', 80, 0],
			['6:59', 80, 0],
			['6:12', 80, 0],
			['6:32', 80, 0],
			['6:14', 80, 0],
		],
		procName: ['Показатель AHT', 'Прослушка', 'Притензии'],
		info: 0,
		month: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентярь','Октябрь','Ноябрь','Декабрь'],
		selMonth: 0,
		
	}
	
	changeMonth = e => this.setState({ selMonth: e.target.value })

	componentDidMount() {
		let dt = {}
		dt.wMain = document.documentElement.clientWidth - 2 // 2 ubrat
		dt.hMain = document.documentElement.clientHeight - 75

		this.setState({ ...dt })
	}
	
	changeInfo = (e) => () => this.setState({ info: e })

	render() {
		const { hMain, wMain, srcPerson, proc, procName, info, month, selMonth, datasets } = this.state
		return (
			<Root h={hMain} w={wMain}>
				<Photo>
					<img src={srcPerson} width='300px' height='300px' />
				</Photo>
				<Name w={wMain}>
					Тестов Тест Тестович
				</Name>
				<TopInfo w={wMain}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>День рождения</TableCell>
								<TableCell align='right'>01.01.1971</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Дата трудоустройства</TableCell>
								<TableCell align='right'>01.01.2013</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Отдел</TableCell>
								<TableCell align='right'>Астрал Отчет</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Руководитель</TableCell>
								<TableCell align='right'>ТестРукль Рукль Руклевич</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TopInfo>

				<Griphic h={hMain}>
					<StyleTextGraphic>Общий график</StyleTextGraphic>
					<Trend
						smooth
						autoDraw
						autoDrawDuration={0}
						autoDrawEasing="ease-out"
						data={[0,75,99,80,72,100]}
						gradient={['#00c6ff', '#F0F', '#FF0']}
						radius={25}
						height={hMain - 375}
						strokeWidth={2}
						strokecap={'butt'}
					  />
				</Griphic>

				<MainInfoBlock h={hMain} w={wMain}>
					<Tabs
					  value={info}
					  indicatorColor="primary"
					  textColor="primary"
					  variant="fullWidth"
					  aria-label="full width tabs example"
					>
					  <Tab label="Тескт" value={0} onClick={this.changeInfo(0)} />
					  <Tab label="Диаграмма" value={1} onClick={this.changeInfo(1)} />
					</Tabs>

					<DivInfoMain h={hMain} info={info}>
					
						{info === 0 && <Textinfo month={month} proc={proc} selMonth={selMonth} changeMonth={this.changeMonth} datasets={datasets}/>}
						{info === 1 && <DiagramProfile month={month} proc={proc} procName={procName} wMain={wMain} selMonth={selMonth} changeMonth={this.changeMonth} />}

					</DivInfoMain>

				</MainInfoBlock>

				<Balance h={hMain}>
					<CountBalance>
						<p>Баланс:</p>
						<p>∞ баллов</p>
					</CountBalance>

					<StyleButton color='primary' variant='outlined'>Подробный отчет изменений</StyleButton>
					<ListBalance h={hMain}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Дата</TableCell>
									<TableCell align='right'>Изменения</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ ∞</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>25.10.2019</TableCell>
									<TableCell align='right'>+ 5000</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</ListBalance>
				</Balance>

			</Root>
		)
	}
}

export default Profile

const Line = styled.div`{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 300px;
	font: 16pt normal Arial;
	color: #7c795d;
	height: 50px;
}`

const DivInfoMain = styled.div`{
	display: flex;
	flex-direction: row;
	align-items: ${p=>p.info === 0 ? 'flex-start' : 'center'};
	justify-content: space-between;
	height: ${p=>p.h - 365}px;
	overflow-y: ${p=>p.info === 0 ? 'scroll' : 'none'};
}`

const StyleTextGraphic = styled.div`{
	height: 50px;
	color: #7c795d;
	font-family: ‘MS Sans Serif’, serif;
	font-size: 16pt;
	font-weight: normal;
	display: flex;
	justify-content: center;
	align-items: center;
}`

const ListBalance = styled.div`{
	position: absolute;
	top: 60px;
	height: ${p=>p.h - 445}px;
	left: 10px;
	overflow-y: scroll;
	width: 280px;
}`

const StyleButton = styled(Button)` && {
	position: absolute;
	bottom: 5px;
	width: 280px;
	left: 10px;
	height: 50px;
}`

const CountBalance = styled.div`{
	position: absolute;
	top: 5px;
	display: flex;
	justify-content: space-between;
	width: 280px;
	left: 10px;
	font: 14pt normal Arial;
	height: 50px;
}`

const Griphic = styled.div`{
	position: absolute;
	top: 310px;
	left: 5px;
	width: 300px;
	height: ${p=>p.h - 315}px;
}`

const MainInfoBlock = styled.div`{
	position: absolute;
	top: 310px;
	left: 320px;
	width: ${p=>p.w - 640}px;
	height: ${p=>p.h - 315}px;
}`

const Balance = styled.div`{
	position: absolute;
	top: 310px;
	right: 5px;
	width: 300px;
	height: ${p=>p.h - 315}px;
	border: 1px solid #fff;
} &:hover {
	border: 1px solid #e0e0e0;
	box-shadow: 0px 0px 30px 0px #7c795d;
}`

const Root = styled.div` &&{
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	position: relative;
}`

const Photo = styled.div`{
	position: absolute;
	top: 5px;
	left: 5px;
	width: 300px;
	height: 300px;
}`

const Name = styled.div` && {
	position: absolute;
	top: 5px;
	left: 320px;
	width: ${p=>p.w - 325}px;
	height: 75px;
	color: #7c795d;
	font-family: ‘MS Sans Serif’, serif;
	font-size: 45px;
	font-weight: normal;
	line-height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
}`

const TopInfo = styled.div` {
	position: absolute;
	top: 90px;
	left: 320px;
	width: ${p=>p.w - 335}px;
	height: 205px;
	padding: 5px;
	user-select: none;
}`
