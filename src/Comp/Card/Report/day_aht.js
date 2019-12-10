import React from 'react'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2';

export const OutDayAht = ({ data, color }) => (
	<Card >
		<Bar
			data={{ 
				labels: ['','',''],
				datasets: [{
					label: 'AHT',
					data: data,
					backgroundColor: color,
					barPercentage: 0.5,
					barThickness: 6,
					maxBarThickness: 8,
					minBarLength: 2,
				}],
			}}
			options={{
				scales: {
					yAxes: [{
						ticks: {
							min: 0,
							stepSize: 50,
						}
					}]
				}
			}}
			height={260}
			width={200}
		/>
	</Card>
)

const Card = styled.div`{
	border: 1px solid #3f51b5;
	width: 200px;
	height: 240px;
	border-radius: 15px;
	margin: 0 5px 5px 5px;
	z-index: 999;
}`
