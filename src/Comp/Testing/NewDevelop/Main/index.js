import React from 'react'
import { Field  } from "react-final-form";
import { FormControlLabel, Switch, Radio, RadioGroup, FormControl } from '@material-ui/core'
import { TextField } from 'final-form-material-ui'
import styled from 'styled-components'

import { DevelopConsumer } from 'Comp/Testing/NewDevelop/Context'
import { AnswerCard } from 'Comp/Testing/NewDevelop/Main/AnswerCard'
import { MainCard, StyleDivMain } from 'Comp/Testing/Develop/Style'

export const Main = () => (
  <DevelopConsumer>
    {context => {
      const { wTopCard, hPanel, focus, values, focusBlock } = context
      const rows = 1 + ((hPanel / 2) - 96) / 19
		  return (
  			<MainCard w={wTopCard} h={hPanel}>
      			<Field
              name={`block[${focusBlock}].quest[${focus}].quest`}
      		    multiline
      		    margin="normal"
      			  variant="outlined"
      		    rows={rows}
      		    w={wTopCard}
      		    h={hPanel}
      		    label="Текст вопроса"
  					  component={QuestTextField}
      			/>

      			<StyleDivMain w={wTopCard}>
              <FormControlLabel
                control={<Field
                  type='radio'
                  color='primary'
                  name={`block[${focusBlock}].quest[${focus}].type`}
                  value={`one`}
                  component={RadioFormField}
                />}
                label='Один вариант'
              />
              <FormControlLabel
                control={<Field
                  type='radio'
                  color='primary'
                  name={`block[${focusBlock}].quest[${focus}].type`}
                  value={`many`}
                  component={RadioFormField}
                />}
                label='Несколько вариантов'
              />
      			</StyleDivMain>

      			<AnswerCard />
      		</MainCard>
        )
    }}
	 </DevelopConsumer>
)

const RadioFormField = ({
  input: { checked, value, name, onChange, ...otherInput },
  meta,
  ...other
}) => (
  <Radio
    {...other}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    inputProps={otherInput}
  />
);

export const QuestTextField = styled(TextField)` && {
	width: ${p=>p.w - 350}px;
	margin: 10px 0px 0px 4px;
}`
