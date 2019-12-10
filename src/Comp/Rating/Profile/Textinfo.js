import React from 'react'
import { Table, TableCell, TableRow, TableBody, Select, MenuItem } from '@material-ui/core'

export const Textinfo = ({ month, proc, selMonth, changeMonth, datasets }) => {
	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell><Select color='primary' value={selMonth} onChange={changeMonth}>
						{month.map((i, ind) => (
							<MenuItem value={ind}>{i}</MenuItem>
						))}
					</Select></TableCell>
					<TableCell>
						Показатель
					</TableCell>
					<TableCell>
						Значение
					</TableCell>
					<TableCell>
						Норма
					</TableCell>
					<TableCell>
						Процент, %
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>{month[selMonth]}</TableCell>
					<TableCell>AHT</TableCell>
					<TableCell>{datasets[selMonth][0]}</TableCell>
					<TableCell>05:00</TableCell>
					<TableCell>{proc[selMonth][0]} %</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>{month[selMonth]}</TableCell>
					<TableCell>Прослушка</TableCell>
					<TableCell>{datasets[selMonth][1]}</TableCell>
					<TableCell>100</TableCell>
					<TableCell>{proc[selMonth][1]} %</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>{month[selMonth]}</TableCell>
					<TableCell>Притензии</TableCell>
					<TableCell>{datasets[selMonth][2]}</TableCell>
					<TableCell>0</TableCell>
					<TableCell>{proc[selMonth][2]} %</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}