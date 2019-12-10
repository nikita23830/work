import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, TableBody, TableCell, TableRow, Select, MenuItem } from '@material-ui/core'
import { Diagram } from 'Comp/Diagram'

class DiagramProfile extends Component {
	
	state={
		value: 0,
	}
	
	changeValue = e => {
		console.log(e)
		this.setState({ value: e.target.value })
	}
	
	render() {
		const { proc, procName, wMain, month, selMonth, changeMonth } = this.props
		const { value } = this.state
		return (
			<>
				<StyleDivDiagram>
					<Diagram num={0} proc={proc[selMonth][0]} />
					<Diagram num={1} proc={proc[selMonth][1]} />
					<Diagram num={2} proc={proc[selMonth][2]} />
					<Procent>
						<Select value={selMonth} color='primary' onChange={changeMonth}>
							{month.map((i, ind) => (
								<MenuItem value={ind}>{i} {proc[ind][3]} %</MenuItem>
							))}
						</Select>
					</Procent>
				</StyleDivDiagram>
				<StyleDivDiagramDescribe w={wMain}>
					
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Индикатор</TableCell>
								<TableCell>Значение</TableCell>
								<TableCell>Показатель</TableCell>
							</TableRow>
							{procName.map((i, index) => (
								<TableRow>
									<TableCell><ColorDiv c={index}/></TableCell>
									<TableCell>{proc[selMonth][index]}%</TableCell>
									<TableCell>{i}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</StyleDivDiagramDescribe>
			</>
		)
	}
}

export default DiagramProfile

const StyleDivDiagram = styled.div`{
	height: 220px;
	width: 220px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}`

const StyleDivDiagramDescribe = styled.div`{
	height: 220px;
	width: ${p=>p.w - 840}px;
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	padding-left: 20px;
}`

const ColorDiv = styled.div`{
	width: 20px;
	height: 10px;
	background-color: ${p=>p.c === 0 ? '#0099ff' : p.c === 1 ? '#ff47b7' : '#ffa45a'};
	margin-top: 5px;
}`

const Procent = styled.div`{
	font: 24pt normal;
	color: #7c795d;
	margin-left: 15px;
}`