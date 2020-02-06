import React from 'react'
import styled, { keyframes } from 'styled-components'

export const CircleNews = ({ level }) => (
  <Customsvg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" cur={level === 2 ? true : false}>
    <circle cx="128" cy="128" r="128" fill="#D5EAFF"/>
    <path d="M142.751 109.499H115.363L134.125 98.6666C134.722 98.3218 135.488 98.5272 135.833 99.1242L140.066 106.457C140.412 107.055 141.176 107.26 141.774 106.914C142.372 106.569 142.577 105.805 142.231 105.207L137.998 97.8742C136.964 96.0836 134.666 95.468 132.875 96.5017L110.39 109.484C110.382 109.489 110.374 109.494 110.366 109.499H99.7501C97.6823 109.499 96 111.181 96 113.249V156.25C96 158.318 97.6823 160 99.7501 160H142.751C144.819 160 146.501 158.318 146.501 156.25V113.249C146.501 111.181 144.819 109.499 142.751 109.499ZM144.001 156.25C144.001 156.939 143.44 157.5 142.751 157.5H99.7501C99.0609 157.5 98.5001 156.939 98.5001 156.25V113.249C98.5001 112.56 99.0609 111.999 99.7501 111.999H142.751C143.44 111.999 144.001 112.56 144.001 113.249V156.25Z" fill="#88C2FF"/>
    <path d="M151.913 122.063C151.681 121.831 151.358 121.697 151.03 121.697C150.701 121.697 150.378 121.831 150.146 122.063C149.914 122.296 149.78 122.618 149.78 122.947C149.78 123.276 149.913 123.598 150.146 123.831C150.379 124.063 150.701 124.197 151.03 124.197C151.358 124.197 151.681 124.063 151.913 123.831C152.146 123.598 152.28 123.276 152.28 122.947C152.28 122.618 152.146 122.296 151.913 122.063Z" fill="#88C2FF"/>
    <path d="M159.498 135.114L154.326 126.156C153.981 125.558 153.217 125.353 152.619 125.698C152.021 126.043 151.816 126.808 152.161 127.406L157.333 136.364C157.678 136.961 157.473 137.727 156.876 138.071L148.837 142.713C148.239 143.058 148.034 143.822 148.379 144.42C148.611 144.821 149.031 145.045 149.463 145.045C149.675 145.045 149.89 144.991 150.087 144.878L158.126 140.236C159.916 139.203 160.532 136.905 159.498 135.114Z" fill="#88C2FF"/>
    <path d="M128.884 115.865C128.652 115.633 128.329 115.499 128.001 115.499C127.672 115.499 127.349 115.633 127.117 115.865C126.884 116.098 126.751 116.42 126.751 116.749C126.751 117.078 126.884 117.4 127.117 117.633C127.349 117.865 127.672 117.999 128.001 117.999C128.329 117.999 128.652 117.865 128.884 117.633C129.117 117.4 129.251 117.078 129.251 116.749C129.251 116.42 129.117 116.098 128.884 115.865Z" fill="#88C2FF"/>
    <path d="M139.251 115.499H134.376C133.685 115.499 133.126 116.059 133.126 116.749C133.126 117.439 133.685 117.999 134.376 117.999H138.001V135.821L128.077 125.897C127.842 125.662 127.524 125.531 127.193 125.531C126.861 125.531 126.544 125.662 126.309 125.897L119.687 132.519C119.199 133.007 119.199 133.799 119.687 134.287C120.175 134.775 120.966 134.775 121.455 134.287L127.193 128.548L137.992 139.347C137.995 139.35 137.998 139.353 138.001 139.355V145.499H106.268L115.343 136.425L122.084 143.166C122.572 143.654 123.364 143.654 123.852 143.166C124.34 142.678 124.34 141.886 123.852 141.398L116.227 133.773C115.992 133.539 115.674 133.407 115.343 133.407C115.011 133.407 114.694 133.539 114.459 133.773L104.5 143.732V117.999H121.251C121.941 117.999 122.501 117.439 122.501 116.749C122.501 116.059 121.941 115.499 121.251 115.499H103.25C102.56 115.499 102 116.059 102 116.749V146.749C102 147.44 102.56 147.999 103.25 147.999H139.251C139.941 147.999 140.501 147.44 140.501 146.749V116.749C140.501 116.059 139.941 115.499 139.251 115.499Z" fill="#88C2FF"/>
    <path d="M114.209 120.874C112.003 120.874 110.209 122.668 110.209 124.874C110.209 127.08 112.003 128.874 114.209 128.874C116.414 128.874 118.209 127.08 118.209 124.874C118.209 122.668 116.414 120.874 114.209 120.874ZM114.209 126.374C113.382 126.374 112.709 125.701 112.709 124.874C112.709 124.047 113.382 123.374 114.209 123.374C115.036 123.374 115.709 124.047 115.709 124.874C115.709 125.701 115.036 126.374 114.209 126.374Z" fill="#88C2FF"/>
  </Customsvg>
)

export const Arrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 12.5304C4.17678 12.2375 4.17678 11.7626 4.46967 11.4697L9.24264 6.69672C9.53553 6.40383 10.0104 6.40383 10.3033 6.69672C10.5962 6.98961 10.5962 7.46449 10.3033 7.75738L6.81066 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H6.81066L10.3033 16.2427C10.5962 16.5356 10.5962 17.0104 10.3033 17.3033C10.0104 17.5962 9.53553 17.5962 9.24264 17.3033L4.46967 12.5304Z" fill="#072D57"/>
  </svg>
)

export const Dots = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.8945 2 10 2.89453 10 4C10 5.10547 10.8945 6 12 6C13.1055 6 14 5.10547 14 4C14 2.89453 13.1055 2 12 2ZM12 10C10.8945 10 10 10.8945 10 12C10 13.1055 10.8945 14 12 14C13.1055 14 14 13.1055 14 12C14 10.8945 13.1055 10 12 10ZM12 18C10.8945 18 10 18.8945 10 20C10 21.1055 10.8945 22 12 22C13.1055 22 14 21.1055 14 20C14 18.8945 13.1055 18 12 18Z" fill="#99A9BA"/>
  </svg>
)

export const Pro = () => (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="7.07104" width="2" height="10" rx="1" transform="rotate(-45 0 7.07104)" fill="#99A9BA"/>
    <rect x="1.41406" y="8.48535" width="2" height="10" rx="1" transform="rotate(-135 1.41406 8.48535)" fill="#99A9BA"/>
    <rect width="2" height="10" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 20.4854 7.07104)" fill="#99A9BA"/>
    <rect width="2" height="10" rx="1" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 19.0713 8.48535)" fill="#99A9BA"/>
  </svg>
)

export const Photo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C2.44772 6 2 6.44772 2 7V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V7C22 6.44772 21.5523 6 21 6H3ZM12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 15.7614 9.23858 18 12 18Z" fill="#99A9BA"/>
    <path d="M7 6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6H7Z" fill="#99A9BA"/>
    <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" fill="#99A9BA"/>
  </svg>
)

export const Circle1 = () => (
  <Circle1svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="#FFD600"/>
  </Circle1svg>
)

export const Circle2 = () => (
  <Circle2svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="#2285EE"/>
  </Circle2svg>
)

export const Circle3 = () => (
  <Circle3svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="#00B54E"/>
  </Circle3svg>
)

export const Circle4 = () => (
  <Circle4svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="#F24646"/>
  </Circle4svg>
)

const animation1 = keyframes`
  0% {
    width: 32px;
    height: 32px;
    left: 56px;
    top: 8px;
  }
  25% {
    width: 8px;
    height: 8px;
    left: 68px;
    top: 20px;
  }
  50% {
    width: 8px;
    height: 8px;
    left: 68px;
    top: 20px;
  }
  75% {
    width: 8px;
    height: 8px;
    left: 68px;
    top: 20px;
  }
  100% {
    width: 32px;
    height: 32px;
    left: 56px;
    top: 8px;
  }
`;

const animation2 = keyframes`
  0% {
    width: 8px;
    height: 8px;
    left: 68px;
    top: 68px;
  }
  25% {
    width: 32px;
    height: 32px;
    left: 56px;
    top: 56px;
  }
  50% {
    width: 8px;
    height: 8px;
    left: 68px;
    top: 68px;
  }
  75% {
    width: 8px;
    height: 8px;
    left: 68px;
    top: 68px;
  }
  100% {
    width: 8px;
    height: 8px;
  }
`;

const animation3 = keyframes`
  0% {
    width: 8px;
    height: 8px;
  }
  25% {
    width: 8px;
    height: 8px;
    left: 20px;
    top: 68px;
  }
  50% {
    width: 32px;
    height: 32px;
    left: 8px;
    top: 56px;
  }
  75% {
    width: 8px;
    height: 8px;
    left: 20px;
    top: 68px;
  }
  100% {
    width: 8px;
    height: 8px;
    left: 20px;
    top: 68px;
  }
`;

const animation4 = keyframes`
  0% {
    width: 8px;
    height: 8px;
    left: 20px;
    top: 20px;
  }
  25% {
    width: 8px;
    height: 8px;
  }
  50% {
    width: 8px;
    height: 8px;
    left: 20px;
    top: 20px;
  }
  75% {
    width: 32px;
    height: 32px;
    left: 8px;
    top: 8px;
  }
  100% {
    width: 8px;
    height: 8px;
    left: 20px;
    top: 20px;
  }
`;

const Circle1svg = styled.svg`{
  animation: ${animation1} 1s linear infinite;
  position: absolute;
  left: 68px;
  top: 20px;
}`

const Circle2svg = styled.svg`{
  animation: ${animation2} 1s linear infinite;
  position: absolute;
  left: 68px;
  top: 68px;
}`

const Circle3svg = styled.svg`{
  animation: ${animation3} 1s linear infinite;
  position: absolute;
  left: 20px;
  top: 68px;
}`

const Circle4svg = styled.svg`{
  animation: ${animation4} 1s linear infinite;
  position: absolute;
  left: 20px;
  top: 20px;
}`

const Customsvg = styled.svg`{
  cursor: ${p=>p.cur ? 'pointer' : 'default'};
}`
