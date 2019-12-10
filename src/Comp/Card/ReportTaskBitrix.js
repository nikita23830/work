import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button, TextField} from '@material-ui/core'

class ReportTaskBitrix extends Component {

  render () {
    const { wMainBlock } = this.props
    return (
      <StyledCard w={wMainBlock}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Задачи Bitrix
          </Typography>
          <StyledSpan>
            <Typography>Номер задачи</Typography>
            <CustomTextField type='number' w={wMainBlock} />
          </StyledSpan>
          <StyledSpan>
            <STextField type='number' multiline rows='4' variant='outlined' label='коментарий' w={wMainBlock} />
          </StyledSpan>
        </CardContent>
        <AButton w={wMainBlock}>
          <CButton variant='outlined' color='primary' fullWidth>Отчет</CButton>
          <CButton variant='outlined' color='primary' fullWidth>Добавить</CButton>
        </AButton>
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
  width: ${p=>p.w - 200}px
  margin-top: -5px;
}`

const STextField = styled(TextField)` && {
  width: ${p=>p.w}px
}`

const AButton = styled.div` && {
  width: ${p=>p.w - 20}px
  margin: 10px;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0px;
  left: 0px;
}`

const CButton = styled(Button)` && {
  margin: 5px;
}`

export default ReportTaskBitrix
