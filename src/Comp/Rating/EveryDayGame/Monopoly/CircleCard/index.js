import React, { Component } from 'react'
import { MLine, CCard } from 'Comp/Rating/EveryDayGame/Monopoly/CircleCard/style'

export default class CircleCard extends Component {

  render () {
    const circle = [1,2,3,4,5,6]
    const { hCard, wCard } = this.props
    return (
      <>
        {circle.map(i=> (
          <MLine>
            <MLineList line={i === 1 || i === 6 ? true : false} index={i} hCard={hCard} wCard={wCard} />
          </MLine>
        ))}
      </>
    )
  }
}

export const MLineList = ({ line, index, hCard, wCard }) => {
  const first = [1,2,3,4,5,6]
  const second = [1,2]
  switch (line) {
    case true:
      return ( <> {first.map(i => ( <MCard
        hCard={hCard}
        wCard={wCard}
        gold={(index === 1 && i === 1) || (index === 6 && i === 6) ? true : false}
        black={(index === 1 && i === 6) || (index === 6 && i === 1) ? true : false}
      /> ))} </> )
    case false:
      return ( <> {second.map(i => ( <MCard
        hCard={hCard}
        wCard={wCard}
      /> ))} </> )
  }
}

export const MCard = ({ hCard, wCard, gold, black, ind1, ind2 }) => (
  <CCard h={hCard} w={wCard} gold={gold} black={black}>
    <img
      src='https://35.img.avito.st/avatar/social/256x256/5233205335.jpg'
      width='25px'
      height='25px'
    />
  </CCard>
)
