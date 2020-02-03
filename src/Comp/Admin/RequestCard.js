import React from 'react'
import { Grid, Typography, Fab, Checkbox, Button } from '@material-ui/core'
import { Cached } from '@material-ui/icons'
import { RequestGrid, CustomGrid, CustomTypography } from 'Comp/Admin/Style'

export const ReqCard = (props) => (
  <Grid container spacing={1}>
    <Grid item xs={12} sm={10}>
      <Typography variant="h5" component="h2">Запросы на регистрацию</Typography>
    </Grid>
    <Grid item xs={12} sm={2}>
      <Fab
        color='primary'
        size="small"
        onClick={() => props.socket.emit('getListRequestReg','')}
      >
        <Cached />
      </Fab>
    </Grid>

    <RequestGrid item xs={12} sm={12}>
      <Grid container spacing={2}>
      {props.reqList.map(i => (
        <>
          <CustomGrid item xs={12} sm={2}>
            <Checkbox value={props.reqCheckList[i.id]} color='primary' onChange={props.changeReqCheckList(i.id)}/>
          </CustomGrid>
          <CustomGrid item sm={12} sm={10}>
            <CustomTypography variant="body2" component="p">
              {i.name} {i.surname}
            </CustomTypography>
          </CustomGrid>
        </>
      ))}
      </Grid>
    </RequestGrid>

    <Grid item xs={12} sm={6}>
      <Button
        color='secondary'
        fullWidth
        disabled={props.disabledButton}
        onClick={props.declineRequestReg}
      >
        Удалить
      </Button>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Button
        color='primary'
        fullWidth
        disabled={props.disabledButton}
        onClick={props.acceptRequestReg}
      >
        Одобрить
      </Button>
    </Grid>

  </Grid>
)
