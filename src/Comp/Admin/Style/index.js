import styled from 'styled-components'
import { Grid, Typography } from '@material-ui/core'

export const RequestGrid = styled(Grid)` && {
  height: ${document.documentElement.clientHeight - 180}px;
  overflow-y: scroll;
  overflow-x: hidden;
}`

export const CustomGrid = styled(Grid)` && {
  height: 58px;
}`

export const CustomTypography = styled(Typography)` && {
  height: 42px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}`
