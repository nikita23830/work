import React from 'react'
import styled from 'styled-components'
import { Card, Typography, Button } from '@material-ui/core'

class Forbidden extends React.Component {

  render () {
    return (
      <ForbiddenCard>
        <CustomTypography variant="h5" component="h2">Нет доступа</CustomTypography>
        <Typography variant="body2" component="p">Error 403 Forbidden. Нет прав для промотра</Typography>
        <Button color='primary' fullWidth onClick={this.props.onBackPage}>Назад</Button>
      </ForbiddenCard>
    )
  }
}

export default Forbidden

const ForbiddenCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 160px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`

const CustomTypography = styled(Typography)` && {
  color: #ff3333;
}`
