import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

class MyBreakTemplate extends Component {

  render () {
    return (
      <StyledCard >
        <StyleCardContent>
          <Typography variant="h5" component="h2">
            Шаблоны
          </Typography> <br />
        </StyleCardContent>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: 300px;
  margin: 25px;
  height: 328px;
}`

const StyleCardContent = styled(CardContent)` && {
  position: relative;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default MyBreakTemplate
