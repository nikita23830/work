import React from 'react'
import styled from 'styled-components'

export const ChangeBalance = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7.5V9" stroke="#99A9BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 15V16.5" stroke="#99A9BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.5 15H12.75C13.575 15 14.25 14.325 14.25 13.5C14.25 12.675 13.575 12 12.75 12H11.25C10.425 12 9.75 11.325 9.75 10.5C9.75 9.675 10.425 9 11.25 9H13.5" stroke="#99A9BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 4.5C16.125 4.5 19.5 7.875 19.5 12C19.5 16.125 16.125 19.5 12 19.5C7.875 19.5 4.5 16.125 4.5 12V9.75" stroke="#99A9BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.5 12.75L4.5 9.75L1.5 12.75" stroke="#99A9BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 1.5C17.775 1.5 22.5 6.225 22.5 12C22.5 17.775 17.775 22.5 12 22.5" stroke="#99A9BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const LeftArrow = ({ av }) => (
    <CustomSVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" av={av}>
        <path d="M14.7368 17.9055L14.9127 17.7145C15.0291 17.5881 15.0291 17.3837 14.9127 17.2573L10.0706 12.0015L14.9127 6.74304C15.0291 6.61663 15.0291 6.4122 14.9127 6.28579L14.7368 6.09481C14.6204 5.9684 14.4322 5.9684 14.3158 6.09481L9.08731 11.7702C8.9709 11.8966 8.9709 12.101 9.08731 12.2275L14.3158 17.9028C14.4322 18.0319 14.6204 18.0319 14.7368 17.9055Z" fill={av ? "#072D57" : "#B7C2CE"}/>
    </CustomSVG>
)

export const RightArrow = ({ av }) => (
    <CustomSVG width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" av={av}>
        <path d="M9.26316 17.9055L9.0873 17.7145C8.9709 17.5881 8.9709 17.3837 9.08731 17.2573L13.9294 12.0015L9.08731 6.74304C8.9709 6.61663 8.9709 6.4122 9.08731 6.28579L9.26316 6.09481C9.37957 5.9684 9.5678 5.9684 9.68421 6.09481L14.9127 11.7702C15.0291 11.8966 15.0291 12.101 14.9127 12.2275L9.68421 17.9028C9.5678 18.0319 9.37957 18.0319 9.26316 17.9055Z" fill={av ? "#072D57" : "#B7C2CE"}/>
    </CustomSVG>
)

export const Ellipse = ({ color }) => (
    <StyleEllipse width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="4" fill={color}/>
    </StyleEllipse>
)

const CustomSVG = styled.svg`{
    cursor: ${p=>p.av ? 'pointer' : 'not-allowed'}
}`

const StyleEllipse = styled.svg`{
    margin: 14px 4px 14px 16px;
}`