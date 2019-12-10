import React, { Component } from 'react'
import styled from 'styled-components'
import { Diagram } from 'Comp/Diagram'
import { Table, TableBody, TableCell, TableRow, Button, Select, MenuItem } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { Bar, Pie } from 'react-chartjs-2';
import { EveryDayReportCalls } from 'Comp/Card/EveryDayReportCalls'
import { EveryDayReportPSA } from 'Comp/Card/EveryDayReportPSA'
import { PanelEveryDayReport } from 'Comp/Report/EveryDayReport/panel'

import { DayAht,
	DayFcr,
	DayUdPodk,
	DayAwt,
	DayCrm,
	ProcTransfer,
	DayBreak,
	DayCall,
	DayBreak4,
	DayCloseReq,
	DayGra,
	DayReady,
	DayReplayReq
} from 'Comp/Card/Report/router'

class EveryDayReport extends Component {

	state = {
		hRoot: 100,
		wRoot: 100,
		data: [150,323,310],
		date: new Date(),
		otdel: 'AO',
		otdData: [
			{
				name: 'Астрал Отчет',
				id: 'AO'
			},
			{
				name: '1С-Отчетность',
				id: '1C'
			},
		],
	}

	componentDidMount() {
		let dt = {}
		dt.hRoot = document.documentElement.clientHeight - 106
		dt.wRoot = document.documentElement.clientWidth - 40

		this.setState({ ...dt })
	}

	changeDate = (e) => this.setState({ date: e })
	changeOtdel = (e) => this.setState({ otdel: e.target.value })

	render () {
		const { hRoot, wRoot, data, date, otdel, otdData } = this.state;
		const color = ['#0099ff', '#ff47b7', '#ffa45a', '#755d9a', '#FF4D4D', '#0067a5', '#dcf1fa']
		const max = Math.max.apply(null, data)
		const datasets = []
		data.map(i => datasets.push(Math.round((i / max) * 100)))

		return (

			<Root h={hRoot} w={wRoot}>
				<StaticUpBLock w={wRoot}>

					<EveryDayReportCalls wRoot={wRoot} date={date} />

					<EveryDayReportPSA wRoot={wRoot} date={date} />

				</StaticUpBLock>
				<Main h={hRoot} w={wRoot}>
					<DayAht data={[290, 300, 310]} color={['#0099ff', '#ff47b7', '#ffa45a']} />
					<DayGra data={[80, 90, 85]} color={['#0099ff', '#ff47b7', '#ffa45a']} />
					<DayFcr data={[5, 10, 15]} color={['#0099ff', '#ff47b7', '#ffa45a']} />
					<DayUdPodk data={[50, 70, 150]} color={['#0099ff', '#ff47b7', '#ffa45a']} />

				</Main>
				<PanelEveryDayReport
					wRoot={wRoot}
					otdel={otdel}
					otdData={otdData}
					changeOtdel={this.changeOtdel}
					changeDate={this.changeDate}
					date={date}
				/>
			</Root>
		)
	}
}

export default EveryDayReport







const Card = styled.div`{
	border: 1px solid #3f51b5;
	width: 200px;
	height: 240px;
	border-radius: 15px;
	margin: 0 5px 5px 5px;
	z-index: 999;
}`

const Main = styled.div`{
	width: ${p=>p.w}px;
	height: ${p=>p.h - 305}px;
	margin-top: 10px;
	overflow-y: scroll;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
}`

const Root = styled.div`{
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	margin: 10px;
	padding: 10px;
}`

const StaticUpBLock = styled.div`{
	width: ${p=>p.w}px;
	height: 250px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}`
