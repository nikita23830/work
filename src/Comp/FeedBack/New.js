import React from 'react'
import { Grid, Select, TextField, MenuItem, Button } from '@material-ui/core'
import { SECTION_FEEDBACK } from 'Comp/FeedBack/constants'

export const NewFeedBack = ({ multiline, newFeed, onChangeNewFeed, errorNewFeed, onCreateTicket }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={12}>
      <Select
        fullWidth
        color="primary"
        value={newFeed['type']}
        error={errorNewFeed['type']}
        onChange={onChangeNewFeed('type')}
      >
        <MenuItem value={-1} disabled>Тип обращения</MenuItem>
        <MenuItem value={0}>Вопрос</MenuItem>
        <MenuItem value={1}>Предложение</MenuItem>
        <MenuItem value={2}>Сообщение об ошибке</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Select
        fullWidth
        color="primary"
        value={newFeed['section']}
        error={errorNewFeed['section']}
        onChange={onChangeNewFeed('section')}
      >
        <MenuItem value={-1} disabled>Раздел</MenuItem>
        {SECTION_FEEDBACK.map((i, ind) => (
          <MenuItem value={ind}>{i[0]}</MenuItem>
        ))}
      </Select>
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        label="Тема"
        value={newFeed['title']}
        error={errorNewFeed['title']}
        onChange={onChangeNewFeed('title')}
        color="primary"
        fullWidth
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <TextField
        label="Текст тикета"
        color="primary"
        onChange={onChangeNewFeed('text')}
        value={newFeed['text']}
        error={errorNewFeed['text']}
        multiline
        fullWidth
        rows={multiline}
      />
    </Grid>
    <Grid item xs={12} sm={12}>
      <Button
        color="primary"
        fullWidth
        onClick={onCreateTicket}
      >
        Отправить
      </Button>
    </Grid>


  </Grid>
)
