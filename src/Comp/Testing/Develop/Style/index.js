import styled from 'styled-components'
import { Card, Button, TextField, TableCell, InputLabel, FormControlLabel, Checkbox, ExpansionPanel, ExpansionPanelDetails, Typography, InputAdornment, TreeItem , TreeView} from '@material-ui/core'

export const SettingFormControlLabel = styled(FormControlLabel)` && {
	margin-bottom: 5px;
}`

export const SettingInputLabel = styled(InputLabel)` && {
	margin-left: 10px;
}`

export const TransferButton = styled(Button)` && {
	margin-top: 10px;
	margin-bottom: 10px;
}`

export const ButtonTransferList = styled.div` {
	width: 40px;
	height: 200px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}`

export const StyleTransferList = styled.div` && {
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}`

export const ItemTransferList = styled(Card)` && {
	width: 410px;
	min-width: 410px;
	max-width: 410px;
	height: 160px;
	overflow-y: scroll;
	padding: 20px;
	display: flex;
	flex-direction: column;
}`

export const LineSetting = styled.div` {
	display: flex;
	justify-content: space-between;
}`

export const SettingCard = styled(Card)` && {
	width: 1000px;
	height: 560px;
	overflow-y-scroll;
	padding: 0px 20px 20px 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	user-select: none;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
}`

export const TopSetCard = styled.div`{
	display: flex;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	user-select: none;
	height: 38px;
	border-bottom: 1px solid #ececec;
}`

export const SetCard = styled(Card)` && {
	height: 38px;
	border: 1px solid #ececec;
	position: absolute;
	bottom: 0px;
	right: 0px;
	width: 348px;
}`

export const TopCard = styled(Card)` && {
	width: ${p=>p.w}px;
	height: 55px
	padding: 10px;
	margin: 0 0 10px 10px;
	display: flex;
	justify-content: space-between;
}`

export const NameTextField = styled(TextField)` && {
	max-height: 40px;
	width: ${p=>p.w - 420}px;
}`

export const RootEditor = styled.div` {
	position: relative;
}`

export const CustomInputAdornment = styled(InputAdornment)` && {
	max-width: 300px;
	min-width: 50px;
	width: 100%;
}`

export const SaveButton = styled(Button)` && {
	height: 55px;
	width: 200px;
}`

export const CloseButton = styled(Button)` && {
	height: 55px;
	width: 200px;
}`

export const ButtonModal = styled.div` {
	position: absolute;
	left: 0px;
	bottom: 0px;
	width: 580px;
	height: 60px;
	display: flex;
	justify-content: space-between;
}`

export const ModalTextField = styled(TextField)` && {
	width: 500px;
	margin-top: 20px;
}`

export const ModalText = styled.div` {
	height: 200px;
	width: 600px;
	position: relative;
	margin: 10px;
}`

export const StyleCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 200px;
  border-right: 5px solid #1C6EA4;
  border-left: 5px solid #1C6EA4;
  border-radius: 40px;
  padding: 20px;
}`

export const CancelButton = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 390px;
  height: 50px;
  border-radius: 4px 4px 40px 4px;
}`

export const SubmitButton = styled(Button)` && {
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 390px;
  height: 50px;
  border-radius: 4px 4px 4px 40px;
}`

export const StyleTypography = styled(Typography)` && {
  width: 800px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}`

export const Panel = styled(Card)` && {
	width: 350px;
	height: ${p=>p.h}px;
	position: absolute;
	right: 10px;
}`

export const StyleDivTree = styled.div` {
	height: 50px;
	margin-bottom: 5px;
	display: flex;
	flex-direction: row;
}`

export const AddTreeButton = styled(Button)` && {
	width: 165px;
	height: 50px;
	margin: 0px 5px 0px 5px;
	font-size: 9pt;
}`

export const AnsCard = styled(Card)` && {
	width: ${p=>p.w - 350}px;
	height: ${p=>(p.h / 2) - 20}px
	border: 1px solid #c4c4c4;
	margin: 0px 0px 10px 4px;
	overflow-y: scroll;
	user-select: none;
}`

export const MainCard = styled(Card)` && {
	width: ${p=>p.w - 340}px;
	height: ${p=>p.h}px;
	position: absolute;
	left: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}`

export const QuestTextField = styled(TextField)` && {
	width: ${p=>p.w - 350}px;
	margin: 10px 0px 0px 4px;
}`

export const StyleDivMain = styled.div` {
	width: ${p=>p.w - 390}px;
	height: 50px;
	display: flex;
	justify-content: flex-start;
	padding: 0px 20px 0px 20px;
	flex-direction: row;
}`

export const RTableCell = styled(TableCell)` && {
	width: 65px;
	min-width: 65px;
	max-width: 65px;
	padding-right: 0px;
	padding-left: 0px;
}`

export const StyleFormControlLabel = styled(FormControlLabel)` && {
	width: 65px;
	display: flex;
	justify-content: center;
	margin-left: -1px;
	margin-right: -10px;
}`

export const AnsTextField = styled(TextField)` && {
	width: ${p=>p.w - 530}px;
	margin-left: 0px;
	margin-top: 0px;
}`

export const AddAnsButton = styled(Button)` && {
	width: 150px;
	border-bottom: 1px solid #3f51b5;
	margin: 15px;
}`

export const StyleCheckbox = styled(Checkbox)` && {
	width: 20px;
}`

export const StyleButton = styled(Button)` && {
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid ${p => p.focus === p.uid ? '#3f51b5' : '#c4c4c4'};
  text-transform: none;
}`

export const Root = styled(Card)` && {
  height: ${p=>p.h - 11}px;
  flex-grow: 1;
	border-bottom: 1px solid #3f51b5;
	border-top: 1px solid #3f51b5;
  max-width: 340px;
	min-width: 340px;
	width: 340px;
  margin: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
  word-wrap: break-word;
	position: absolute;
	right: 0px;
}`

export const StyleExpansionPanel = styled(ExpansionPanel)` && {
  border: 1px solid ${p => p.focusBlock !== -1 ? '#3f51b5' : '#c4c4c4'};
}`

export const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)` && {
  display: flex;
  flex-direction: column;
}`
