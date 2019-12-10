import React from 'react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { Bar, Pie } from 'react-chartjs-2';

export const EveryDayReportPSA = ({ wRoot, date }) => {
	return (
		<CallCard w={wRoot}>
			<Title>PSA ({`${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear()}`})</Title>
				<DiagramBlock>
					<Pie
						data={{
							labels: ['','',''],
							datasets: [
								{
									label: '',
									data: [835,15],
									backgroundColor: ['#08A919', '#DA1C1C'],
								}
							],
						}}
						options={{
							title: { enabled: false },
							legend: { display: false },
						}}
						height={170}
						width={220}
					/>
				</DiagramBlock>

				<CardBody w={wRoot}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Индикатор</TableCell>
								<TableCell>Значение</TableCell>
								<TableCell>Показатель</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><ColorDiv c='#08A919'/></TableCell>
								<TableCell>Принятые</TableCell>
								<TableCell align='right'>835</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><ColorDiv c='#DA1C1C'/></TableCell>
								<TableCell>Пропущенные</TableCell>
								<TableCell align='right'>15</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardBody>
			<More w={wRoot}>Подробнее</More>
		</CallCard>
	)
}

const addZero = (int) => {
	return int < 10 ? "0" + int : int
}

const DiagramBlock = styled.div`{
	position: relative;
	width: 220px;
	height: 390px;
	margin-left: 10px;
}`

const CallCard = styled.div`{
	width: ${p=>(p.w / 2) - 10}px;
	height: 250px;
	border: 1px solid #3f51b5;
	border-radius: 15px;
	position: relative;
}`

const Title = styled.div`{
	font: 20pt normal Arial;
	color: #7c795d;
	height: 35px;
}`

const CardBody = styled.div`{
	position: absolute;
	top: 40px;
	right: 5px;
	height: 170px;
	width: ${p=>(p.w / 2) - 240}px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	overflow-y: scroll;
}`

const ColorDiv = styled.div`{
	width: 20px;
	height: 10px;
	background-color: ${p=>p.c};
	margin-top: 5px;
}`

const More = styled.div`{
	position: absolute;
	bottom: 0px;
	height: 35px;
	border-top: 1px solid #3f51b5;
	cursor: pointer;
	font: 20pt normal Arial;
	color: #3f51b5;
	width: ${p=>(p.w / 2) - 10}px;
	user-select: none;
}`
