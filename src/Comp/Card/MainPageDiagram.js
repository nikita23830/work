import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import { BarChart } from "reaviz";


class MainPageDiagram extends Component {

  render() {
    return (
      <StyledCard >
        <CardContent>
          <Typography variant="h5" component="h2">
            Нагрузка
          </Typography> <br />
          <BarChart width={290} height={80} data={categoryData} />
        </CardContent>
        <CardActions>
          <Button size="small">Просмотреть</Button>
        </CardActions>
      </StyledCard>
    )
  }
}

const categoryData = [
  {
    key: "8:00",
    data: 11
  },
  {
    key: "9:00",
    data: 7
  },
  {
    key: "10:00",
    data: 3
  },
  {
    key: "11:00",
    data: 20
  },
  {
    key: "12:00",
    data: 30
  },
  {
    key: "13:00",
    data: 10
  },
  {
    key: "14:00",
    data: 5
  },
  {
    key: "15:00",
    data: 14
  },
  {
    key: "16:00",
    data: 11
  },
  {
    key: "17:00",
    data: 13
  },
  {
    key: "18:00",
    data: 7
  },
  {
    key: "19:00",
    data: 3
  },
  {
    key: "20:00",
    data: 1
  },

];

const StyledCard = styled(Card)` && {
  width: 300px;
  margin: 25px;
}`

export default MainPageDiagram
