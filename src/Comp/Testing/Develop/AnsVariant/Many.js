import React from 'react'
import { RadioGroup, Table, TableBody, TableRow, TableCell, IconButton, Checkbox } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TextField } from 'final-form-material-ui'
import styled from 'styled-components'
import { Field, FieldRenderProps } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { RTableCell, AddAnsButton } from 'Comp/Testing/Develop/Style'

export const DevelopMainManyVariant = () => (
	<DevelopConsumer>
		{context => {
			const { wTopCard, tree, focus } = context.state
			return (
				<Table>
					<TableBody>
						<FieldArray name={`${focus}.ans`}>
							{({ fields }) => 
								fields.map((name, index) => (
									<TableRow>
										<RTableCell align='center'>
											<Field
												name={`${focus}.true`} 
												component={CheckboxWrapper}
												value={`a${index}`}
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
		}}
	</DevelopConsumer>
)

const CheckboxWrapper: React.SFC<FieldRenderProps> = ({
	input: {checked, name, onChange, ...restInput},
	meta,
	...rest
}) => (
	<StyleCheckbox
		{...rest}
		name={name}
		inputProps={restInput}
		onChange={onChange}
		checked={checked}
	/>
);

export const StyleCheckbox = styled(Checkbox)` && {
	width: 20px;
}`

export const AnsTextField = styled(TextField)` && {
	width: ${p=>p.w - 530}px;
	margin-left: 0px;
	margin-top: 0px;
}`