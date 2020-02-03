import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Card, Grid, TextField, Typography, MenuItem, Button, Collapse, Chip } from '@material-ui/core'
import { NewFeedBack } from 'Comp/FeedBack/New'
import { SocketConsumer } from 'ContextSocket'
import { withSnackbar } from 'notistack';
import { TYPE_FEEDBACK, STATUS_FEEDBACK, SECTION_FEEDBACK } from 'Comp/FeedBack/constants'

class FeedBack extends React.Component {

  state={
    width: 100,
    height: 100,
    newFeed: { type: -1, section: -1 },
    errorNewFeed: {},
    vis: -1,
    tickets: {
      new: [],
      accept: [],
      reject: []
    },
    viewTicket: {}
  }

  onCreateTicket = () => {
    const { newFeed } = this.state
    const { enqueueSnackbar } = this.props
    const { socket } = this.context
    let errorNewFeed = checkFieldFeed(newFeed)
    if (Object.keys(errorNewFeed).length > 0) {
      this.setState({ errorNewFeed: errorNewFeed })
      enqueueSnackbar('Обязательные поля не заполнены', {variant: 'warning',autoHideDuration: 6000})
    } else {
      this.setState({ newFeed: { type: -1, section: -1, text: '', title: '' } })
      socket.emit('onCreateTicket', newFeed)
    }
  }

  onChangeNewFeed = (name) => (e) => {
    let errorNewFeed = this.state.errorNewFeed
    delete errorNewFeed[name]
    this.setState({
      newFeed: { ...this.state.newFeed, [name]: e.target.value },
      errorNewFeed: errorNewFeed
    })
  }

  onViewTicket = (sec, i) => (e) => {
    const { tickets } = this.state
    this.setState({ vis: i, viewTicket: tickets[TYPE_FEEDBACK[sec].val][i] })
  }

  componentDidMount = async () => {
    const { socket } = this.context
    await socket.emit('getTickets')
    await socket.on('getTickets', (data) => {
      let newTickets = { new: [], accept: [], reject: [] }
      data.map(i => {
        switch (i.type) {
          case 0: { newTickets['new'].push(i); return 0; }
          case 1: { newTickets['accept'].push(i); return 0; }
          case 2: { newTickets['reject'].push(i); return 0; }
          default: return 0;
        }
      })
      this.setState({ tickets: newTickets })
    })
  }

  render () {
    const { newFeed, vis, tickets, viewTicket, errorNewFeed } = this.state
    const { drawer } = this.props
    const multiline = Math.round((document.documentElement.clientHeight - 377) / 19)
    const TYPEFEED = ['Вопрос', 'Предложение', 'Сообщить об ошибке']
    return (
      <Root drawer={drawer}>
        <NewFeed>
          <Collapse in={vis === -1}>
            <NewFeedBack
              multiline={multiline}
              onChangeNewFeed={this.onChangeNewFeed}
              newFeed={newFeed}
              errorNewFeed={errorNewFeed}
              onCreateTicket={this.onCreateTicket}
            />
          </Collapse>
          <Collapse in={vis !== -1}>
            {vis !== -1 && <ViewTicket>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><Chip label={STATUS_FEEDBACK[viewTicket.status][0]} color={STATUS_FEEDBACK[viewTicket.status][1]}/></Grid>
                <Grid item xs={12} sm={6}>
                  <Button color='primary' onClick={this.onViewTicket(0, -1)}>Создать новый</Button>
                </Grid>
                <Grid item xs={12} sm={6}><Chip label={TYPEFEED[viewTicket.typefeed]} color='primary'/></Grid>
                <Grid item xs={12} sm={6}><Chip label={SECTION_FEEDBACK[viewTicket.section][0]} color='primary'/></Grid>
                <hr width="100%" />
                <Grid item xs={12} sm={12}>
                  <TextField multiline label="Обращение" InputProps={{readOnly: true}} fullWidth value={viewTicket.text}/>
                </Grid>
                <hr width="100%" />
                {viewTicket.answerg === 1 && <Grid item xs={12} sm={12}>
                  <TextField multiline label="Ответ" InputProps={{readOnly: true}} fullWidth value={viewTicket.answer}/>
                </Grid>}
              </Grid>
            </ViewTicket>}
          </Collapse>
        </NewFeed>
        <HistoryFeed drawer={drawer}>
          {TYPE_FEEDBACK.map((j, index) => (
            <ColumnHistory>
              <Typography variant="h5" component="h2">{j.name}</Typography>
              {tickets[j.val].map((i, ind) => (
                <HistoryFeedBlock type={index} onClick={this.onViewTicket(index,ind)}>{i.title}</HistoryFeedBlock>
              ))}
            </ColumnHistory>
          ))}
        </HistoryFeed>
      </Root>
    )
  }
}

const openDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
`;

const closeDrawer = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 270}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 80}px;
  }
`;

const openDrawerHistory = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 620}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 810}px;
  }
`;

const closeDrawerHistory = keyframes`
  0% {
    width: ${document.documentElement.clientWidth - 810}px;
  }
  100% {
    width: ${document.documentElement.clientWidth - 620}px;
  }
`;

const ColumnHistory = styled.div` {
  width: ${p=>(p.w-570)/3}px;
  overflow-y: none;
  overflow-x: none;
}`

const ViewTicket = styled.div` {

}`

const HistoryFeedBlock = styled(MenuItem)` && {
  border: 1px solid ${p=>p.type === 0 ? '#949494' : p.type === 1 ? '#3f51b5' : '#f50057' };
  background-color: ${p=>p.type === 0 ? 'rgba(148,148,148,0.3)' : p.type === 1 ? 'rgba(63,81,181,0.3)' : 'rgba(245,0,87,0.3)' };
  border-radius: 15px;
  white-space: pre-wrap;
  margin: 10px 0 10px 0;
}`

const HistoryFeed = styled(Card)` && {
  animation: ${p=>p.drawer ? openDrawerHistory : closeDrawerHistory} 0.2s linear both;
  height: ${document.documentElement.clientHeight - 95}px;
  padding: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}`

const Root = styled.div`{
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
  height: ${document.documentElement.clientHeight - 110}px;
  position: absolute;
  right: 5px;
  top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}`

const NewFeed = styled(Card)` && {
  width: 480px;
  height: ${document.documentElement.clientHeight - 95}px;
  padding: 10px;
}`

const checkFieldFeed = (data) => {
  let result = {}
  if (data.type === -1) result.type = true
  if (data.section === -1) result.section = true
  if (!data.title || (data.title && data.title.replace(/\s/g, '') === '')) result.title = true
  if (!data.text || (data.text && data.text.replace(/\s/g, '') === '')) result.text = true
  return result
}

FeedBack.contextType = SocketConsumer;
export default withSnackbar(FeedBack)
