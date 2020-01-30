import React from 'react'
import styled from 'styled-components'
import { Grid, TextField, Select, MenuItem, Button } from '@material-ui/core'

export const Registration = (props) => {
  const { regist, errorRegist, listDept, manager } = props
  const FIELD = [{name: 'name', label: 'Имя'},{name: 'surname', label: 'Фамилия'},{name: 'login', label: 'Логин'},{name: 'pass', label: 'Пароль'}]
  return (
    <>
      <Grid container spacing={2}>
        {FIELD.map(i => (
          <Grid item xs={12} sm={6}>
            <TextField
              value={regist[i.name]}
              color='primary'
              fullWidth
              onChange={e => props.chandeDataRegist(i.name, e.target.value)}
              label={i.label}
              error={errorRegist[i.name]}
              onBlur={i.name === 'login' && props.checkLoginInReg}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={12}>
          <TextField
            value={regist.email}
            color='primary'
            fullWidth
            onChange={e => props.chandeDataRegist('email', e.target.value)}
            onBlur={props.checkEmailInReg}
            label='E-mail'
            error={errorRegist.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            value={regist.dept}
            error={errorRegist.dept}
            onChange={e=>props.chandeDataRegist('dept', e.target.value)}
          >
            <MenuItem value={-1} disabled>Отдел</MenuItem>
            {listDept.map(i=>(
              <MenuItem value={i.id}>{i.name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            value={regist.manager}
            disabled={regist.dept === -1}
            error={errorRegist.manager}
            onChange={e=>props.chandeDataRegist('manager', e.target.value)}
          >
            <MenuItem value={-1} disabled>Руководитель</MenuItem>
            {manager[regist.dept] && manager[regist.dept].map(i=>(
              <MenuItem value={i.id}>{i.name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Select
            fullWidth
            value={regist.chart}
            error={errorRegist.chart}
            onChange={e=>props.chandeDataRegist('chart', e.target.value)}
          >
            <MenuItem value={-1} disabled>График</MenuItem>
            <MenuItem value={0}>График 5/2</MenuItem>
            <MenuItem value={1}>График 2/2</MenuItem>
            <MenuItem value={2}>График "ночник"</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            color='primary'
            variant='outlined'
            onClick={props.onRequestRegistration}
          >
            Регистрация
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
