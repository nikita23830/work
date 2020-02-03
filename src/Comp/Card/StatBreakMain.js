import React, {Component} from 'react'
import styled, { keyframes } from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import { BarChart } from "reaviz";
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, LabelList
} from 'recharts';

class MainPageDiagram extends Component {
  state = {
    chartWidth: 0,
  }

  render() {
    const { diag, drawer } = this.props
    return (
      <StyledCard ref={(card) => { this.card = card; }} drawer={drawer}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Количество перерывов
          </Typography> <br />
          <ComposedChart
            width={drawer ? document.documentElement.clientWidth - 305 : document.documentElement.clientWidth - 115}
            height={150}
            data={diag}
            margin={{
              top: 10, right: 0, bottom: -10, left: -40,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="uv" barSize={45} fill="#413ea0" >
              <LabelList content={renderCustomizedLabel} />
            </Bar>
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </CardContent>
      </StyledCard>
    )
  }
}

const renderCustomizedLabel = (props) => {
  const {
    x, y, width, height, value,
  } = props;
  const radius = 10;

  return (
    <g>
      <Styletext x={x + width / 2} y={y - radius} textAnchor="middle" dominantBaseline="middle">
        {value}
      </Styletext>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Customdiv>
        <p>{`${label}`}</p>
        <p>{`${payload[0].value}`}</p>
      </Customdiv>
    );
  }

  return null;
};

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
`;

const closeDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
`;

const Styletext = styled.text` && {
  font-size: 8pt;
  font-family: 'Times New Roman',
  color: #000;
}`

const StyledCard = styled(Card)` && {
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
  position: absolute;
  top: 70px;
  right: 5px;
}`

const Customdiv = styled.div` && {
  border: 0px;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.85)
}`

export default MainPageDiagram
