import React from 'react'
import { DevelopConsumer } from 'Comp/Testing/NewDevelop/Context'
import { AnsCard } from 'Comp/Testing/Develop/Style'
import { DevelopMainOneVariant } from 'Comp/Testing/NewDevelop/AnsVariant/One'
import { DevelopMainManyVariant } from 'Comp/Testing/NewDevelop/AnsVariant/Many'

export const AnswerCard = ({ checked }) => (
  <DevelopConsumer>
    {context => {
      const { wTopCard, hPanel, focus, values, focusBlock } = context
      return (
        <AnsCard w={wTopCard} h={hPanel}>
          {values.block[focusBlock].quest[focus].type === 'one' ? <DevelopMainOneVariant /> : <DevelopMainManyVariant />}
        </AnsCard>
      )
    }}
  </DevelopConsumer>
)
