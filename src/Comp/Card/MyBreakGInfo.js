import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

class MyBreakGInfo extends Component {

  render() {
    const { list } = this.props
    return (
      <>
        <StyledCard>
          <StyleCardContent>
            <Typography variant="h5" component="h2">
              Общая информация
            </Typography> <br />
            <StyledSpan>
              <Typography variant="body2" component="p">
                Установлено перерывов:
              </Typography>
              <Typography variant="body2" component="p">
                {list.length}
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Среднее время перерыва:
              </Typography>
              <Typography variant="body2" component="p">
                {sred(list)}
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Установлено времени:
              </Typography>
              <Typography variant="body2" component="p">
                {sum(list)}
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Осталось свободно:
              </Typography>
              <Typography variant="body2" component="p">
                {ost(list)}
              </Typography>
            </StyledSpan>
          </StyleCardContent>
        </StyledCard>
      </>
    )
  }
}

const sum = (data) => {
  let result = 0;
  data.map(i => {
    result = result + (i[2].length * 5)
  })
  return `${result} мин.`
}

const ost = (data) => {
  let result = 45;
  data.map(i => {
    result = result - (i[2].length * 5)
  })
  return `${result} мин.`
}

const sred = (data) => {
  let arr = []
  data.map(i => arr.push(i[2].length))
  let sum = arr.reduce((a, b) => a + b, 0);
  return `${Math.round((sum/arr.length)*5)} мин.`
}

const StyledCard = styled(Card)` && {
  width: calc(100% - 5px);
  margin: 5px;
  height: ${((document.documentElement.clientHeight - 84) / 2)-15}px;
}`

const StyleCardContent = styled(CardContent)` && {
  height: ${((document.documentElement.clientHeight - 84) / 2)-65}px;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default MyBreakGInfo
