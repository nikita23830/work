import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Card, Link, Grid, Typography, Button, TextField, FormControl, InputLabel, Select } from '@material-ui/core'

export const authToRestoreAuth = keyframes`
  0% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
  100% {
    transform: translate(-150%, -50%);
    visibility: hidden;
  }
`;

export const authToRestoreBackAuth = keyframes`
  0% {
    transform: translate(-150%, -50%);
    visibility: hidden;
  }
  100% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
`;

export const authToRestoreRestore = keyframes`
  0% {
    transform: translate(50%, -50%);
    visibility: hidden;
  }
  100% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
`;

export const authToRestoreBackRestore = keyframes`
  0% {
    transform: translate(-50%, -50%);
    visibility: visible;
  }
  100% {
    transform: translate(50%, -50%);
    visibility: hidden;
  }
`;

export const LinkRegistration = styled(Link)` && {
  margin-top: 9px;
  width: 90px;
  height: 19px;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  cursor: pointer;
  user-select: none;
}`

export const CustomLink = styled(Link)` && {
  width: 113px;
  height: 19px;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  cursor: pointer;
  user-select: none;
}`

export const DivSvg = styled.div`{
  position: absolute;
  width: 552px;
  height: 670px;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
}`

export const ErrorGrid = styled(Grid)` && {
  display: flex;
  flex-direction: row;
}`

export const CustomError = styled.p` {
  margin: 11px 0px 11px 5px;
  width: 199px;
  height: 18px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #F24646;
}`

export const StyleGrid = styled(Grid)` && {
  position: absolute;
  top: 44px;
  left: 44px;
  width: 467px;
  padding: 0px;
}`

export const OrgName = styled.p`{
  position: absolute;
  width: 152px;
  height: 17px;
  left: calc(50% - 152px/2 - 127.5px);
  top: 16px;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

export const AuthorName = styled.p`{
  position: absolute;
  height: 17px;
  left: calc(50% - 49px/2 + 102px);
  top: 16px;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA
}`

export const BottomDiv = styled.div` {
  position: absolute;
  width: 100%;
  height: 48px;
  left: 0px;
  bottom: 0px;
}`

export const CustomTypography = styled(Typography)` && {
  margin-top: 9px;
  width: 99px;
  height: 19px;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

export const CustomButton = styled(Button)` && {
  width: 164px;
  height: 40px;
  background: #2285EE;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  margin-bottom: 44px;
} &&:hover {
  background: #2285EE;
}`

export const CustomTextField = styled(TextField)` && {
  width: 435px;
  height: 56px;
}`

export const CustomTypographyTitle = styled(Typography)` && {
  width: 250px;
  height: 50px;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;
  font-feature-settings: 'pnum' on, 'lnum' on;
}`

export const LogoAndName = styled.div` {
  position: absolute;
  top: 44px;
  left: 44px;
  width: 108px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}`

export const CustomGrid = styled(Grid)` && {
  height: ${p=>p.h}px;
  width: ${p=>p.item ? '50%' : '100%'};
  background-color: ${p=>p.left ? '#F5F8FF' : '#fff'};
  position: relative;
  overflow-x: none;
  overflow-y: none;
}`

export const StyleAuthCard = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 524px;
  height: ${p=>!p.error ? '437px' : '485px'};
  animation: ${p=>
    p.authToRestore === 1
    ? authToRestoreAuth
    : p.authToRestore === 2
      ? authToRestoreBackAuth
      : ''
  } 0.2s linear both;
}`

export const TitleNotFound = styled.p`{
  position: absolute;
  width: 222px;
  height: 33px;
  left: 44px;
  top: 104px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
  text-align: left;
}`

export const TextNotFound = styled.p`{
  position: absolute;
  width: 203px;
  height: 38px;
  left: 44px;
  top: 189px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #F24646;
  text-align: left;
}`

export const NotFoundSvg = styled.img`{
  position: absolute;
  width: 224px;
  height: 194px;
  left: 266px;
  top: 32px;
}`

export const MailBox = styled.div`{
  position: absolute;
  width: 157px;
  height: 174px;
  left: 331px;
  top: 84px;
}`

export const SuccussRestoreText = styled.p`{
  text-align: left;
  position: absolute;
  width: 243px;
  height: 38px;
  left: 44px;
  top: 191px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

export const SuccussRestoreTitle = styled.p`{
  text-align: left;
  position: absolute;
  width: 234px;
  height: 66px;
  left: 44px;
  top: 113px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000
}`

export const DivBack = styled.div` {
  position: absolute;
  top: 32px;
  left: 44px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}`

export const ButtonRestore = styled(Button)` && {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 44px;
  top: 245px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  background: #2285EE;
} &&:hover {
  background: #2285EE;
}`

export const RestoreTextField = styled(TextField)` && {
  position: absolute;
  width: 435px;
  height: 76px;
  left: 44px;
  top: 151px;
}`

export const TitleRestore = styled.p`{
  position: absolute;
  height: 33px;
  left: 44px;
  top: 88px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
  margin-top: 0px;
}`

export const ArrowText = styled.p` {
  width: 41px;
  height: 18px;
  margin-top: 11px;
  margin-bottom: 11px;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
}`

export const StyleCard = styled(Card)` && {
  position: absolute;
  width: 524px;
  height: ${p=>p.sendRestore ? '290px' : '317px'};
  left: 50%;
  top: 50%;
  visibility: hidden;
  transform: translate(-50%, -50%);
  animation: ${p=>p.authToRestore === 1 ? authToRestoreRestore : p.authToRestore === 2 ? authToRestoreBackRestore : ''} 0.2s linear both;
}`

export const chengeColor = keyframes`
  0% {
    background: #E9F3FD;
  }
  100% {
    background: #2285EE;
  }
`;

export const MailDivBox = styled.div`{
  position: absolute;
  top: 123px;
  left: 331px;
  width: 174px;
  height: 157px;
}`

export const AuthButton = styled(Button)` && {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 44px;
  top: 295px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-transform: none;
  background: #2285EE;
} &&:hover {
  background: #2285EE;
}`;

export const RepeatButton = styled(Button)` && {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 44px;
  top: 243px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${p=>p.clrt};
  text-transform: none;
  background: ${p=>p.clr};
} &&:hover {
  background: ${p=>p.clr};
}`;

export const TextSuccess = styled.p`{
  position: absolute;
  width: 243px;
  height: 57px;
  left: 44px;
  top: 162px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
  text-align: left
}`

export const TitleSuccess = styled.p`{
  position: absolute;
  width: 222px;
  height: 66px;
  left: 44px;
  top: 84px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #000000;
  text-align: left
}`

export const StyleCardSuccessReg = styled(Card)` && {
  position: absolute;
  width: 532px;
  height: 367px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`

export const StyleFormControl = styled(FormControl)` && {
  text-align: left;
}`

export const BottomGrid = styled(Grid)` && {
  margin-top: 20px;
}`

export const StyleTextField = styled(TextField)` && {
  min-height: 75px;
}`

export const CustomLinkReg = styled(Link)` && {
  width: 42px;
  height: 19px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-decoration-line: underline;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #2285EE;
  margin-top: 10px;
  cursor: pointer;
}`;

export const CustomText = styled.p`{
  width: 135px;
  height: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #99A9BA;
  margin-top: 10px;
}`

export const CustomButtonReg = styled(Button)` && {
  height: 40px;
  background: #2285EE;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #FFFFFF;
  text-transform: none;
} &&:hover {
  background: #2285EE;
}`;

export const CustomInputLabel = styled(InputLabel)` && {
  background-color: #fff;
  padding: 4px;
}`

export const StyleSelect = styled(Select)` && {
  text-align: left;
}`

export const CustomGridReg = styled(Grid)` && {
  position: absolute;
  width: 464px;
  left: 44px;
  top: 89px;
}`

export const RegName = styled.p`{
  position: absolute;
  width: 162px;
  height: 33px;
  left: 44px;
  top: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #072D57;
  margin-top: 0px;
}`

export const StyleCardReg = styled(Card)` && {
  position: absolute;
  width: 524px;
  height: ${p=>p.errors ? '605px' : '557px'};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}`
