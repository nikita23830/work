import React from 'react'
import { IconButton } from '@material-ui/core'
import { Done, Clear } from '@material-ui/icons'
import { withSnackbar } from 'notistack'

class action extends React.Component{
  render() {
    const { key, closeSnackbar } = this.props
    console.log(this.props)
    return (
      <>
        <IconButton onClick={() => {  }}>
          <Done />
        </IconButton>
        <IconButton onClick={() => {  }}>
          <Clear />
        </IconButton>
      </>
    )
  }
}

export default withSnackbar(action)
