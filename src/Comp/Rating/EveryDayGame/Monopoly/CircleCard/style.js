import styled, { keyframes } from "styled-components"
import { Card } from '@material-ui/core'

export const MLine = styled.div`{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0px;
}`

export const CCard = styled(Card)` && {
	margin: 5px;
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	border: 1px solid ${p=>p.gold ? '#f9a602' : p.black ? '#000' : '#9ea7da'};
	background-color: ${p=>p.gold ? 'rgba(249,166,2,0.2)' : p.black ? 'rgba(0,0,0,0.4)' : '#fff'};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50pt;
	position: relative;
} &:hover {
	box-shadow: 0px 0px 50px 0px ${p=>p.gold ? 'rgba(249,166,2,1)' : p.black ? 'rgba(0,0,0,1)' : 'rgba(0,0,158,1)'};
}`
