import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button} from '@material-ui/core'

import RButtonAnswerTesting from 'Comp/Button/RButtonAnswerTesting'

class TestList extends Component {

  state = {
    width: 100,
    height: 100,
    hCardInfo: 100,
    wCardMain: 100,
    hCardMain: 100,
    hCardListQuest: 100,
  }

  componentDidMount () {
    let data = {}
    data.width = document.documentElement.clientWidth - 30
    data.height = document.documentElement.clientHeight - 100
    data.hCardInfo = data.height - 78
    data.hCardMain = data.height - 310
    data.wCardMain = data.width - 340
    data.hCardListQuest = data.height - 320
    this.setState({ ...data })
  }

  render() {
    const { width, height, hCardInfo, wCardMain, hCardMain, hCardListQuest } = this.state
    console.log(this.state)
    return (
      <>
        <StyledCard width={width} height={height} ref={card => this.card = card}>
          <CardContent>
            <Typography color='primary' variant='h5'>АО 3 квартал 2019</Typography>

            <ContentMainBlock>

              <CardInfo hCardMain={hCardInfo}>

                <DivInfoMain>
                  <Typography>Время на тест: 1:45:00</Typography>
                  <Typography>Осталось времени: 1:22:00</Typography>
                  <hr />
                  <Typography>Всего вопросов: 90</Typography>
                  <Typography>Отвечено вопросов: 12</Typography>
                  <Typography>Из них верно: 11</Typography>
                  <hr />
                  <Button variant='outlined' color='secondary' fullWidth>Завершить тест</Button>
                </DivInfoMain>

                <DivListQuest hCardListQuest={hCardListQuest}>
                  <LButton variant='outlined' color='primary' a={true} t={true}>Вопрос 1</LButton>
                  <LButton variant='outlined' color='primary'>Вопрос 2</LButton>
                  <LButton variant='outlined' color='primary' a={true} t={false}>Вопрос 3</LButton>
                  <LButton variant='outlined' color='primary'>Вопрос 4</LButton>
                  <LButton variant='outlined' color='primary'>Вопрос 5</LButton>
                  <LButton variant='outlined' color='primary'>Вопрос 6</LButton>
                </DivListQuest>

              </CardInfo>

              <QABlock>
                <CardMain wCardMain={wCardMain}>Выберите верный ответ</CardMain>

                <CardAnswer hCardMain={hCardMain}>

                  <RButtonAnswerTesting />

                </CardAnswer>
                <CardAnswerButton wCardMain={wCardMain}>
                  <AButton color='primary' variant='outlined'>Ответить</AButton>
                  <AButton color='secondary' variant='outlined'>Пропустить</AButton>
                </CardAnswerButton>
              </QABlock>

              

            </ContentMainBlock>

          </CardContent>

          <NumQuest>Вопрос № 3</NumQuest>
        </StyledCard>
      </>
    )
  }
}

const NumQuest = styled.div` {
  position: absolute;
  top: 5px;
  right: 15px;
  width: 100px;
  border: 1px solid #3f51b5;
  border-radius: 5px;
  font: 14pt normal Arial;
  color: #3f51b5;
  padding: 5px;
  cursor: default;
  user-select: none;
}`

const LButton = styled(Button)` && {
  margin-top: 2px;
  margin-bottom: 2px;
  border-color: ${p=>p.a && p.t ? '#01680B' : p.a && !p.t ? '#E51111' : '#3f51b5'}
  color: ${p=>p.a && p.t ? '#01680B' : p.a && !p.t ? '#E51111' : '#3f51b5'}
} &:hover {
  border-color: ${p=>p.a && p.t ? 'rgba(0,104,11,0.4)' 
    : p.a && !p.t ? 'rgba(229,17,17,0.4)' 
    : 'rgba(63,81,181,0.4)'
  }
}`


const StyledCard = styled(Card)` && {
  width: ${props => `${props.width}px`}
  height: ${props => `${props.height}px`}
  margin: 10px;
  padding: 0px;
  position: relative;
}`

const CardMain = styled(Card)` && {
  width: ${props => `${props.wCardMain}px`};
  height: 133px;
  border: 1px #3f51b5 solid;
  overflow-y: scroll;
  user-select: none;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
} &:hover {
  box-shadow: 0px 0px 15px 0px rgba(63, 81, 181, 1);
}`

const CardAnswer = styled(Card)` && {
  width: ${props => `${props.wCardMain}px`};
  height: ${props => `${props.hCardMain}px`};
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  user-select: none;
  overflow-y: none;
  overflow-y: scroll;
  border: 1px #3f51b5 solid;
} &:hover {
  box-shadow: 0px 0px 15px 0px rgba(63, 81, 181, 1);
}`

const CardInfo = styled(Card)` && {
  width: 270px;
  height: ${props => `${props.hCardMain}px`};
  padding: 1px;
  position: relative;
  border: 1px #3f51b5 solid;
} &:hover {
  box-shadow: 0px 0px 15px 0px rgba(63, 81, 181, 1);
}`

const CardAnswerButton = styled(Card)` && {
  width: width: ${props => `${props.wCardMain}px`};
  height: 60px;
  margin-top: 5px;
  border: 1px #3f51b5 solid;
  display: flex;
  justify-content: space-between;
} &:hover {
  box-shadow: 0px 0px 15px 0px rgba(63, 81, 181, 1);
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

const QABlock = styled.div` && {
  margin: 0px;
  padding: 0px;
}`

const AButtonAnswerTesting = styled.div` && {
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 50px;
  width: 250px;
  display: flex;
  justify-content: flex-end;
}`

const DivListQuest = styled.div` && {
  text-align: left;
  overflow-y: scroll;
  height: ${props => `${props.hCardListQuest}px`};
  padding: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
}`

const AButton = styled(Button)` && {
  height: 50px;
  margin: 5px;
  width: 250px;
}`

const DivInfoMain = styled.div` && {
  width: 250px;
  height: 200px;
  text-align: left;
  padding: 10px;
}`

const ContentMainBlock = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default TestList
