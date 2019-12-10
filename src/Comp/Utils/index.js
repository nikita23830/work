import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'

const MonopolyContext = React.createContext();

export const showSnackbar = async ({ enqueueSnackbar, text, variant, closeSnackbar }) => {
  enqueueSnackbar(text, {
    variant: variant,
    persist: true,
    action: (key) => (
      <StyledIconButton onClick={() => { closeSnackbar(key) }}>
        <DeleteOutline />
      </StyledIconButton>
    )
  })
}

const StyledIconButton = styled(IconButton)` && {
  color: #fff;
}`

export const MonopolyProvider = MonopolyContext.Provider
export const MonopolyConsumer = MonopolyContext.Consumer
