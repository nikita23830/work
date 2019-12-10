import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

class MainPageBreak extends Component {

  render () {
    return (
      <StyledCard >
        <CardContent>
          <Typography variant="h5" component="h2">
            Перерывы
          </Typography> <br />
          <StyledSpan>
            <Typography variant="body2" component="p">
              Перерывов установлено:
            </Typography>
            <Typography variant="body2" component="p">
              16
            </Typography>
          </StyledSpan>
          <StyledSpan>
            <Typography variant="body2" component="p">
              Больше всего в:
            </Typography>
            <Typography variant="body2" component="p">
              11:00
            </Typography>
          </StyledSpan>
          <StyledSpan>
            <Typography variant="body2" component="p">
              Менеше всего в:
            </Typography>
            <Typography variant="body2" component="p">
              6:00
            </Typography>
          </StyledSpan>
          <StyledSpan>
            <Typography variant="body2" component="p">
              Запрос на доп. перерыв:
            </Typography>
            <Typography variant="body2" component="p">
              3
            </Typography>
          </StyledSpan>
        </CardContent>
        <CardActions>
          <Button size="small">Просмотреть</Button>
        </CardActions>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: 300px;
  margin: 25px;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default MainPageBreak
