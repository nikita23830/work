import React from 'react'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { AnsCard } from 'Comp/Testing/Develop/Style'
import { DevelopMainOneVariant } from 'Comp/Testing/Develop/AnsVariant/One'
import { DevelopMainManyVariant } from 'Comp/Testing/Develop/AnsVariant/Many'

export const AnswerCard = ({ checked }) => (
  <DevelopConsumer>
    {context => {
      if (!context) return (<>Load...</>)
      else {
        const { wTopCard, hPanel } = context.state
        return (
          <AnsCard w={wTopCard} h={hPanel}>
            {checked ? <DevelopMainOneVariant /> : <DevelopMainManyVariant />}
          </AnsCard>
        )
      }
    }}
  </DevelopConsumer>
)
