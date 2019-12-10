import React from 'react'
import { Field  } from "react-final-form";
import { TextField } from 'final-form-material-ui'
import styled from 'styled-components'
import { RadioGroup, Table, TableBody, TableRow, TableCell, IconButton, Radio } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { RTableCell, StyleFormControlLabel, AddAnsButton } from 'Comp/Testing/Develop/Style'

export const DevelopMainOneVariant = () => (
	<DevelopConsumer>
		{context => {
			if (!context) return (<>Load...</>)
			else {
				const { wTopCard, tree, focus } = context.state
				return (
					<Table>
						<TableBody>
							<FieldArray name={`${focus}.ans`}>
							{({ fields }) => 
								fields.map((name, index) => (
									<TableRow>
										<RTableCell align='center'>
											<StyleFormControlLabel 
												control={<Field 
													type='radio' 
													color='primary' 
													name={`${focus}.true`} 
													value={`a${index}`}
													component={RadioFormField} 
												/>}
											/>
										</RTableCell>
										<TableCell>
											<Field
												name={`${name}.text`}
												component={AnsTextField}
												label='Ответ'
												color='primary'
												w={wTopCard} 
												multiline
											/>
										</TableCell>
										<RTableCell align='center'>
											<IconButton onClick={() => fields.remove(index)}>
												<Delete color='secondary' />
											</IconButton>
										</RTableCell>
									</TableRow>
								))
							}
							</FieldArray>
							<TableRow>
								<TableCell colSpan={3}>
									<AddAnsButton color="primary" onClick={() => context.push(`${focus}.ans`, undefined)}>
										Добавить ответ
									</AddAnsButton>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				)
			}
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

export const AnsTextField = styled(TextField)` && {
	width: ${p=>p.w - 530}px;
	margin-left: 0px;
	margin-top: 0px;
}`