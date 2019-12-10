import React from 'react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { Bar, Pie } from 'react-chartjs-2';

export const EveryDayReportCalls = ({ wRoot, date }) => {
	return (
		<CallCard w={wRoot}>
			<Title>Количество звонков ({`${addZero(date.getDate())}.${addZero(date.getMonth()+1)}.${date.getFullYear()}`})</Title>
				<DiagramBlock>
					<Bar
						data={{
							labels: ['','',''],
							datasets: [
								{
									label: '',
									data: [150,323,310],
									backgroundColor: ['#0099ff', '#ff47b7', '#ffa45a'],
								}
							],
						}}
						options={{
							title: { enabled: false },
							legend: { display: false },
						}}
						height={200}
						width={220}
					/>
				</DiagramBlock>

				<CardBody w={wRoot}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell><ColorDiv c='#0099ff'/></TableCell>
								<TableCell>Шкляра</TableCell>
								<TableCell align='right'>150</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><ColorDiv c='#ff47b7'/></TableCell>
								<TableCell>Власова</TableCell>
								<TableCell align='right'>323</TableCell>
							</TableRow>
							<TableRow>
								<TableCell><ColorDiv c='#ffa45a'/></TableCell>
								<TableCell>Лобанова</TableCell>
								<TableCell align='right'>310</TableCell>
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
	height: 440px;
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
	width: ${p=>(p.w / 2) - 260}px;
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
