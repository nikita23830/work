import styled from 'styled-components'
import { Button, Select } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

export const Panel = styled.div`{
	width: ${p=>p.w}px;
	max-height: 60px;
	position: absolute;
	bottom: 5px;
	display: flex;
	justify-content: space-between;
}`

export const CustomButton = styled(Button)` && {
	height: 50px;
	width: 250px;
}`

export const CustomMuiPickersUtilsProvider = styled(MuiPickersUtilsProvider)` && {
	max-height: 50px;
	width: 250px;
	margin-top: -10px;
}`

export const CustomSelect = styled(Select)` && {
	height: 50px;
	width: 250px;
}`