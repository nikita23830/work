import React, { Component } from 'react'
import { MainCard, TextMainCard, ChallengeTextLine, Logoline } from './style'
import {MonopolyConsumer} from 'Comp/Utils'

class BigCard extends Component {

  state = {
    flip: false,
    motion: true,
  }

  onOpenCard = () => {
    this.setState({ flip: true, motion: false })
    this.context.onOpenCard()
    setTimeout(() => {
      this.setState({ flip: false })
    }, 1800)
  }

  render () {
    const { wPole, gold, black, faceCard, openCard, slot, random, textChallange, priceChallange } = this.context.state
    const { flip, motion } = this.state
    return (
      <MainCard w={wPole} gold={gold} black={black} onClick={faceCard && !openCard ? this.onOpenCard : ''} openCard={!random} flip={flip}>
        {!openCard && <MainCardBlock faceCard={faceCard} />}
        {openCard && <Challenge w={wPole} slot={slot} textChallange={textChallange} priceChallange={priceChallange} />}
      </MainCard>
    )
  }
}

const MainCardBlock = ({ faceCard }) => {
  const imgsrc = faceCard ? 'https://35.img.avito.st/avatar/social/256x256/5233205335.jpg' : 'https://inok.ru/upload/medialibrary/4a3/ikonkaastral.png'
  const text = faceCard ? 'Нажмите для поворота карты' : 'Сделайте ход для получения карты'
  return (
    <>
      <img
        src={imgsrc}
        width='100px'
        height='100px'
      />
      <TextMainCard>{text}</TextMainCard>
    </>
  )
}

const Challenge = ({ w, slot, textChallange, priceChallange }) => {
  const black = slot === 6 || slot === 16 ? true : false
  const blackText = 'Вы пропускаете ход'
  return (
    <>
      <Logoline w={w}>
        <img
          src='https://35.img.avito.st/avatar/social/256x256/5233205335.jpg'
          width='100px'
          height='100px'
        />
        {!black && (
          <>
            <h4>{textChallange}</h4>
            <p>{priceChallange} баллов</p>
          </>
        )}
      </Logoline>
      <ChallengeTextLine w={w} black={black}>
        {black ? blackText : 'Тут описание задания'}
      </ChallengeTextLine>
    </>
  )
}


BigCard.contextType = MonopolyConsumer;

export default BigCard
