import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

class MainPageReport extends Component {

  render() {
    return (
      <>
        <StyledCard >
          <CardContent>
            <Typography variant="h5" component="h2">
              Ежедневные отчеты
            </Typography> <br />
            <StyledSpan>
              <Typography variant="body2" component="p">
                Среднее AHT:
              </Typography>
              <Typography variant="body2" component="p">
                00:05:03
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Среднее AHT 1 группа:
              </Typography>
              <Typography variant="body2" component="p">
                00:05:01
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Среднее AHT 2 группа:
              </Typography>
              <Typography variant="body2" component="p">
                00:05:05
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Среднее AHT 3 группа:
              </Typography>
              <Typography variant="body2" component="p">
                00:05:03
              </Typography>
            </StyledSpan>
          </CardContent>
          <CardActions>
            <Button size="small">Просмотреть</Button>
          </CardActions>
        </StyledCard>
      </>
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

export default MainPageReport
