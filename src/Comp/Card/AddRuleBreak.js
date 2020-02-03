import React, {Component} from 'react'
import styled, { keyframes } from 'styled-components'
import {Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@material-ui/core'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';

class AddRuleBreak extends Component {

  state = {
    name: -1,
    type: -1,
    data_rule: -1,
    period: -1,
    rules: {name: [], type: [], period: []}
  }

  addRule = () => {
    const { name, type, period, data_rule } = this.state
    const { socket } = this.context
    const { enqueueSnackbar } = this.props
    let error = false
    if ([name, type, period, data_rule].indexOf(-1) > -1) {
      if (type === 3 && [name,data_rule].indexOf(-1) === -1) error = false
      else error = true
    } else error = false
    if (!error) {
      socket.emit('addRule', {name: name, type: type, period: period, data: data_rule})
    } else {
      enqueueSnackbar('Некорректно заполнены условия правила', {variant: 'warning',autoHideDuration: 3000})
    }
  }

  componentDidMount = async () => {
    const { socket } = this.context
    const { enqueueSnackbar } = this.props
    await socket.emit('getRules', '')

    await socket.on('getRules', (data) => {
      this.setState({ rules: data })
    })

    await socket.on('send_error', (data) => { // прием ошибок back-end'a
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000})
      this.setState({ loader: false })
    })
  }


  handleChange = (e) => {
    if (e.target.name === 'name') this.setState({ name: e.target.value, type: -1, period: -1, data_rule: -1 })
    if (e.target.name === 'type') this.setState({ type: e.target.value, period: -1, data_rule: -1 })
    if (e.target.name === 'period') this.setState({ period: e.target.value, data_rule: -1 })
    if (e.target.name === 'data_rule') this.setState({ data_rule: e.target.value })
  }

  render() {
    const { name, type, data_rule, period, rules } = this.state
    const { drawer } = this.props
    const DATE_RULE = [1,2,3,4,5,6,7,8,9,10]
    return (
      <StyledCard drawer={drawer}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Select
                  value={name}
                onChange={this.handleChange}
                inputProps={{
                  name: 'name',
                  id: 'first',
                }}
                fullWidth
              >
  			        <MenuItem value={-1} disabled><em>Правило</em></MenuItem>
                {rules.name.map(i => (
                  <MenuItem value={i.id}>{i.name_rule}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Select
                  value={type}
                onChange={this.handleChange}
                inputProps={{
                  name: 'type',
                  id: 'second',
                }}
                fullWidth
              >
  			        <MenuItem value={-1} disabled><em>Условие</em></MenuItem>
                {rules.type.map(i=>{
                  if (i.name_rule_id === name) return (
                    <MenuItem value={i.id}>{i.type_rule}</MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Select
                value={period}
                onChange={this.handleChange}
                inputProps={{
                  name: 'period',
                  id: 'third',
                }}
                fullWidth
              >
  			        <MenuItem value={-1} disabled><em>Период</em></MenuItem>
                {rules.period.map(i=>{
                  if (i.type_rule_id === type) return (
                    <MenuItem value={i.id}>{i.period_rule}</MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Select
                value={data_rule}
                onChange={this.handleChange}
                inputProps={{
                  name: 'data_rule',
                  id: 'four',
                }}
                fullWidth
              >
  			        <MenuItem value={-1} disabled><em>Значение</em></MenuItem>
                {DATE_RULE.map(i=>(
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant='outlined' color='primary' fullWidth onClick={this.addRule}>Применить</Button>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
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

const StyleButton = styled(Button)` && {
	width: 150px;
	height: 40px;
	margin-bottom: -5px;
}`

const StyledCard = styled(Card)` && {
  position: absolute;
  right: 5px;
  top: 70px;
  animation: ${p=>p.drawer ? openDrawer : closeDrawer} 0.2s linear both;
}`

const CustomSelect = styled(Select)` && {
  width: 300px;
  margin-left: 10px;
  margin-right: 10px;
}`

const CustomLittleSelect = styled(Select)` && {
  width: 150px;
  margin-left: 10px;
  margin-right: 10px;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}`

AddRuleBreak.contextType = SocketConsumer;
export default withSnackbar(AddRuleBreak)
