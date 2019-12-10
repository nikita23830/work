import React, { Component } from 'react'
import { AppBar,
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

class DialogTable extends Component {

  render () {
    const {handleClose, openDialogTable} = this.props
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDialogTable}>
        <DialogTitle id="simple-dialog-title">Продолжительность перерыва</DialogTitle>
        <List>

          <ListItem button onClick={() => console.log('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="5 минут" />
          </ListItem>
          <ListItem button onClick={() => console.log('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="10 минут" />
          </ListItem>
          <ListItem button onClick={() => console.log('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <Add />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="15 минут" />
          </ListItem>
        </List>
      </Dialog>
    )
  }
}

export default DialogTable
