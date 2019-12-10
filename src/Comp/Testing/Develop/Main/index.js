import React from 'react'
import { Field  } from "react-final-form";
import { FormControlLabel, Switch } from '@material-ui/core'
import { TextField } from 'final-form-material-ui'
import styled from 'styled-components'

import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { AnswerCard } from 'Comp/Testing/Develop/Main/AnswerCard'
import { MainCard, StyleDivMain } from 'Comp/Testing/Develop/Style'

export const Main = () => (
  <DevelopConsumer>
    {context => {
      const { wTopCard, hPanel, oneVariantAnsMain, tree, focus } = context.state
      const rows = 1 + ((hPanel / 2) - 96) / 19
    	const checked = tree[focus].type
		return (
			<MainCard w={wTopCard} h={hPanel}>
    			<Field
					name={`${focus}.quest`}				
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
    					control={
    						<Switch
    							checked={tree[focus].type}
    							onChange={context.onChangeVariantAnsMain}
    							value="checkedB"
    							color="primary"
    						/>
    					}
    					label="Один вариант верный"
    				/>
    			</StyleDivMain>

    			<AnswerCard checked={checked} />
    		</MainCard>
      )
    }}
	</DevelopConsumer>
)

export const QuestTextField = styled(TextField)` && {
	width: ${p=>p.w - 350}px;
	margin: 10px 0px 0px 4px;
}`