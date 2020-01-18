import React from 'react'
import styled from 'styled-components'
import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core'

export const NotActual = (props) => (
  <NotActualCard>
    <CardContent>
      <CustomTypography variant="h5" component="h2">Авторизация невозможна</CustomTypography>
    </CardContent>
    <Typography variant="body2" component="p">
      Ваш руководитель еще не принял заявку. Необходимо обратиться к руководителю
    </Typography>
    <CardActions>
      <Button color='primary' onClick={props.closeNotActual}>Закрыть</Button>
    </CardActions>
  </NotActualCard>
)

const NotActualCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 150px;
}`

const CustomTypography = styled(Typography)` && {
  color: #ff3333;
}`
