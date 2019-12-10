import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

class MainPageTask extends Component {

  render() {
    return (
      <>
        <StyledCard >
          <CardContent>
            <Typography variant="h5" component="h2">
              Задачи и письма
            </Typography> <br />
            <StyledSpan>
              <Typography variant="body2" component="p">
                Решено задач:
              </Typography>
              <Typography variant="body2" component="p">
                16
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Отвечено писем:
              </Typography>
              <Typography variant="body2" component="p">
                11
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Решено задач в 3 группах:
              </Typography>
              <Typography variant="body2" component="p">
                6
              </Typography>
            </StyledSpan>
            <StyledSpan>
              <Typography variant="body2" component="p">
                Решено задач в оффлайн:
              </Typography>
              <Typography variant="body2" component="p">
                10
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

export default MainPageTask
