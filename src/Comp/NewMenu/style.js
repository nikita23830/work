import React from 'react'
import styled, { keyframes } from 'styled-components'

const openCollapseOne = keyframes`{
  0% {
    height: 48px;
  }
  100% {
    height: 96px;
  }
}`

const closeCollapseOne = keyframes`{
  0% {
    height: 96px;
  }
  100% {
    height: 48px;
  }
}`

const openCollapseTwo = keyframes`{
  0% {
    height: 48px;
  }
  100% {
    height: 144px;
  }
}`

const closeCollapseTwo = keyframes`{
  0% {
    height: 144px;
  }
  100% {
    height: 48px;
  }
}`

const openCollapseThree = keyframes`{
  0% {
    height: 48px;
  }
  100% {
    height: 192px;
  }
}`

const closeCollapseThree = keyframes`{
  0% {
    height: 192px;
  }
  100% {
    height: 48px;
  }
}`

const openCollapseFour = keyframes`{
  0% {
    height: 48px;
  }
  100% {
    height: 240px;
  }
}`

const closeCollapseFour = keyframes`{
  0% {
    height: 240px;
  }
  100% {
    height: 48px;
  }
}`

const openCollapseFive = keyframes`{
  0% {
    height: 48px;
  }
  100% {
    height: 288px;
  }
}`

const closeCollapseFive = keyframes`{
  0% {
    height: 288px;
  }
  100% {
    height: 48px;
  }
}`

const openCollapseSix = keyframes`{
  0% {
    height: 48px;
  }
  100% {
    height: 336px;
  }
}`

const closeCollapseSix = keyframes`{
  0% {
    height: 336px;
  }
  100% {
    height: 48px;
  }
}`

export const animationCollapseOpen = [
  openCollapseOne,
  openCollapseTwo,
  openCollapseThree,
  openCollapseFour,
  openCollapseFive,
  openCollapseSix,
]

export const animationCollapseClose = [
  closeCollapseOne,
  closeCollapseTwo,
  closeCollapseThree,
  closeCollapseFour,
  closeCollapseFive,
  closeCollapseSix
]
