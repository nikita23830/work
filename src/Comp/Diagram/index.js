import React, { Component } from 'react'
import styled from 'styled-components'
import ReactMinimalPieChart from 'react-minimal-pie-chart'

export const Diagram = ({ num, proc, label }) => {
  const color = ['#0099ff', '#ff47b7', '#ffa45a', '#755d9a', '#FF4D4D', '#0067a5', '#dcf1fa']
  const radius = [50, 47, 44, 41, 38, 35, 32]
  const a_proc = 100 - proc
  return (
    <StyleReactMinimalPieChart
      animate={true}
      animationDuration={500}
      animationEasing="ease-out"
      cx={50}
      cy={50}
      data={[
        {
          color: color[num],
          title: '',
          value: proc
        },
        {
          color: '#ffffff',
          title: '',
          value: a_proc
        }
      ]}
      label={false}
      labelPosition={10}
      lengthAngle={360}
      lineWidth={5}
      onClick={undefined}
      onMouseOut={undefined}
      onMouseOver={undefined}
      paddingAngle={0}
      radius={radius[num]}
      ratio={1}
      rounded={false}
      startAngle={0}
      width='220px'
      height='220px'
    />
  )
}

const StyleReactMinimalPieChart = styled(ReactMinimalPieChart)` && {
	width: ${p=>p.width};
	height: ${p=>p.height};
	position: absolute;
	top: 0px;
	left: 0px;
}`
