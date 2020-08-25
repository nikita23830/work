import React from 'react'
import { Card, Button } from '@material-ui/core'
import { Arrow, OrangeMail } from 'Comp/Auth/logo'
import styled, { keyframes } from 'styled-components'
import { chengeColor, MailDivBox, AuthButton, RepeatButton, TextSuccess, TitleSuccess, StyleCardSuccessReg, DivBack, ArrowText } from 'Comp/Auth/style'

class SuccessRegistration extends React.Component {

  state = {
    color: '#2285EE',
    colorText: '#FFFFFF',
    repeat: false,
  }

  changeColor = async () => {
    this.setState({ color: '#E9F3FD', colorText: '#B7C2CE', repeat: true })
  }

  render() {
    const { color, colorText, repeat } = this.state
    return (
      <StyleCardSuccessReg>
        <TitleSuccess>Ожидается подтверждение!</TitleSuccess>
        <TextSuccess>Обратитесь к руководителю, чтобы он принял вашу заявку для авторизации</TextSuccess>
        <RepeatButton variant='contained' clr={color} clrt={colorText} onClick={color === '#2285EE' && this.changeColor}>Выслать повторно</RepeatButton>
        <AuthButton variant='contained' onClick={this.props.closeNotActual}>Авторизоваться</AuthButton>
        <MailDivBox>
          <OrangeMail repeat={repeat} />
        </MailDivBox>
      </StyleCardSuccessReg>
    )
  }
}

export default SuccessRegistration
