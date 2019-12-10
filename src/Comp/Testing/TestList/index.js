import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

class TestList extends Component {

  state = {
    width: 100,
    height: 100
  }

  componentDidMount () {
    let w = document.documentElement.clientWidth - 30
    let h = document.documentElement.clientHeight - 100
    this.setState({ width: w, height: h })
  }

  render() {
    const { width, height } = this.state
    return (
      <>
        <StyledCard width={width} height={height}>
          <CardContent>

            <CustomCardList width={width}>
              <p>АО 3 квартал 2019</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

            <CustomCardList width={width}>
              <p>ОФД 4й квартал 2018</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

            <CustomCardList width={width}>
              <p>Промежуточное тестирование сотрудников отдела Астрал Отчет (май 2018)</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

            <CustomCardList width={width}>
              <p>Промежуточный  тест Астрал.ОФД (июнь 2018)</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

            <CustomCardList width={width}>
              <p>Тест ФРДО март 2018</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

            <CustomCardList width={width}>
              <p>ЭДО 1 квартал 2019</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

            <CustomCardList width={width}>
              <p>ЭДО 2 квартал 2019</p>
              <Button variant='outlined' color='primary'>
                Приступить
              </Button>
            </CustomCardList>

          </CardContent>
        </StyledCard>
      </>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: ${props => `${props.width}px`}
  height: ${props => `${props.height}px`}
  margin: 10px;
  padding: 0px;
  overflow-y: scroll;
}`

const CustomCardList = styled(Card)` && {
  width: ${props => `${props.width - 70}px`}
  height: 30px;
  margin-top: 10px;
  cursor: pointer;
  align-items: center;
  display: flex;
  padding: 10px;
  user-select: none;
  justify-content: space-between;
} &:hover {
  background-color: rgba(236,236,236,0.7);
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default TestList
