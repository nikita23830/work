import styled, { keyframes } from "styled-components"
import { Card, Button, TableCell, Table } from '@material-ui/core'

export const blink = keyframes`
  0% { background-color: #000 }
  100% { background-color: #fff }
`

export const fliphover = keyframes`
	0% { transform: rotateY(0) }
	33% { transform: rotateY(45deg) }
	66% { transform: rotateY(-45deg) }
	100% { transform: rotateY(0) }
`

export const flip = keyframes`
  0% { transform: rotateY(0) }
  50% { transform: rotateY(180deg) }
  100% { transform: rotateY(360deg) }
`

export const Logoline = styled.div`{
  width: ${p=>p.w - 540}px;
  height: 100px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font: 15pt bold Arial;
}`

export const ChallengeTextLine = styled.div`{
  width: ${p=>p.w - 540}px;
  height: 100px;
  font: 15pt bold Arial;
  text-align: ${p=>p.black ? 'center' : 'left'};
}`

export const Pole = styled(Card)` && {
	position: absolute;
	top: ${p=>p.t + 20}px
	left: ${p=>p.l + 20}px
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	border: 1px solid #9ea7da;
	display: flex;
	justify-content: space-between;
}`

export const CenterPole = styled.div `{
	height: ${p=>p.h}px;
	width: ${p=>p.w - 500}px;
	position: relative;
}`

export const LeftPole = styled.div `{
	height: ${p=>p.h}px;
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}`

export const RightPole = styled.div `{
	height: ${p=>p.h}px;
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}`

export const CubePole = styled.div `{
	margin: 4px
	min-height: 200px;
	min-width: 200px;
	max-height: 200px;
	max-width: 200px;
	height: 200px;
	width: 200px;
	border: 1px solid #000;
	border-radius: 10px;
	position: relative;
}`

export const DivCircle = styled.div `{
	width: 30px;
	height: 30px;
	border: 0px solid #000;
	border-radius: 50px;
	background-color: #000;
	position: absolute;
	top: ${p=>p.id === 1 || p.id === 2 || p.id === 3 ? '18.3' :
		p.id === 4 || p.id === 5 || p.id === 6 ? '84.9' :
		p.id === 7 || p.id === 8 || p.id === 9 ? '151.5' : '0'}px;
	left: ${p=>p.id === 1 || p.id === 4 || p.id === 7 ? '18.3' :
		p.id === 2 || p.id === 5 || p.id === 8 ? '84.9' :
		p.id === 3 || p.id === 6 || p.id === 9 ? '151.5' : '0'}px;
	animation: ${p=>p.go ? blink : ''} 0.${p=>p.id}s linear infinite;
  display: ${p=>p.v ? 'block' : 'none'};
}`

export const TextMainCard = styled.div` {
	margin-top: 10px;
	font: 14pt bold Arial;
}`

export const MainCard = styled(Card)` && {
	height: 240px;
	width: ${p=>p.w - 520}px;
  border: 2px solid ${p=>p.gold ? '#f9a602' : p.black ? '#000' : '#3f51b5'};
	background-color: ${p=>p.gold ? 'rgba(249,166,2,0.2)' : p.black ? 'rgba(0,0,0,0.4)' : '#fff'};
	margin: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 72pt;
	animation: ${p=>p.flip ? flip : ''} 2s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
	user-select: none;
	box-shadow: 11px 11px 5px 0px rgba(50, 50, 50, 0.75);
} &:hover {
	animation: ${p=>p.openCard ? fliphover : ''} ${p=>p.openCard ? '1.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both' : ''};
}`

export const HistoryLog = styled.div`{
	margin: 10px;
	width: ${p=>p.w - 520}px;
	height: ${p=>p.h - 360}px;
  overflow-y: scroll;
}`

export const FTableCell = styled(TableCell)` && {
  color: #f00;
  font-size: 16pt;
}`

export const STableCell = styled(TableCell)` && {
	color: #0f0;
  font-size: 16pt;
}`

export const TableCellH = styled(TableCell)` && {
	color: #616161;
}`

export const CustomTable = styled(Table)` && {
	user-select: none;
}`

export const ButtonPole = styled.div`{
	position: absolute;
	top: 260px;
	left: 0px;
	width: ${p=>p.w - 500}px;
	height: ${p=>p.h - 260}px;
	display: flex;
	align-items: center;
	justify-content: space-between;
  flex-direction: column;
}`

export const ButtonStep = styled(Button)`&& {
  margin-top: 30px;
  height: 50px;
  font: 16pt bold Arial;
} &:hover {
  box-shadow: 0px 0px 50px 0px rgba(0,0,158,1);
}`
