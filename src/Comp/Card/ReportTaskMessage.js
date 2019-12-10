import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button, TextField} from '@material-ui/core'

class ReportTaskMessage extends Component {

  render () {
    const { wMainBlock } = this.props
    return (
      <StyledCard w={wMainBlock}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Ответы на почту
          </Typography>
          <StyledSpan>
            <Typography>Ответы с личной почты</Typography>
            <CustomTextField type='number' w={wMainBlock} />
          </StyledSpan>
          <StyledSpan>
            <Typography>Ответы с support</Typography>
            <CustomTextField type='number' w={wMainBlock} />
          </StyledSpan>
          <StyledSpan>
            <Typography>Ответы с ajOffice</Typography>
            <CustomTextField type='number' w={wMainBlock} />
          </StyledSpan>
        </CardContent>
        <AButton variant='outlined' color='primary' w={wMainBlock}>Создать отчет</AButton>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 10px;
  padding: 0px;
  height: 285px;
  position: relative;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  margin-bottom: 6px;
}`

const CustomTextField = styled(TextField)` && {
  width: ${p=>p.w - 240}px
  margin-top: -5px;
}`

const AButton = styled(Button)` && {
  width: ${p=>p.w - 20}px;
  margin: 10px;
  position: absolute;
  bottom: 0px;
  left: 0px;
}`

export default ReportTaskMessage
