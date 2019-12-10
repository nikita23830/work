import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { MenuItem } from '@material-ui/core'
import { Panel, CustomButton, CustomMuiPickersUtilsProvider, CustomSelect } from 'Comp/Report/EveryDayReport/styled'

export const PanelEveryDayReport = ({ wRoot, otdel, otdData, changeOtdel, changeDate, date }) => (
	<Panel w={wRoot}>
		<CustomButton color='primary' variant='outlined'>Получить Excel</CustomButton>

		<CustomMuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				variant="inline"
				format="dd.MM.yyyy"
				margin="normal"
				id="date-picker-inline"	
				value={date}
				onChange={changeDate}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</CustomMuiPickersUtilsProvider>
			
		<CustomSelect color='primary' variant='outlined' value={otdel} onChange={changeOtdel}>
			{otdData.map(i => (
				<MenuItem value={i.id}>{i.name}</MenuItem>
			))}
		</CustomSelect>


		<CustomButton color='primary' variant='outlined'>Добавить виджет</CustomButton>
	</Panel>
)