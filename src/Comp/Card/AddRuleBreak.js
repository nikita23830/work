import React, {Component} from 'react'
import styled from 'styled-components'
import {Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from '@material-ui/core'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';

class AddRuleBreak extends Component {

  state = {
    name: -1,
    type: -1,
    data_rule: -1,
    period: -1,
  	wMain: 100,
  	hMain: 100,
    rules: {name: [], type: [], period: []}
  }

  componentDidMount = async () => {
    const { socket } = this.context
    const { enqueueSnackbar } = this.props
    await socket.emit('getRules', '')
    let wMain = document.documentElement.clientWidth - 40
    this.setState({ wMain: wMain })

    await socket.on('getRules', (data) => {
      console.log(data)
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
    const { name, type, data_rule, period, wMain, rules } = this.state
    const DATE_RULE = [1,2,3,4,5,6,7,8,9,10]
    return (
      <>
        <StyledCard w={wMain}>
          <CardContent>
            <StyledSpan>

              <CustomSelect
                value={name}
                onChange={this.handleChange}
                inputProps={{
                  name: 'name',
                  id: 'first',
                }}
              >
				        <MenuItem value={-1} disabled><em>Правило</em></MenuItem>
                {rules.name.map(i => (
                  <MenuItem value={i.id}>{i.name_rule}</MenuItem>
                ))}
              </CustomSelect>

              <CustomLittleSelect
                value={type}
                onChange={this.handleChange}
                inputProps={{
                  name: 'type',
                  id: 'second',
                }}
              >
				        <MenuItem value={-1} disabled><em>Условие</em></MenuItem>
                {rules.type.map(i=>{
                  if (i.name_rule_id === name) return (
                    <MenuItem value={i.id}>{i.type_rule}</MenuItem>
                  )
                })}
              </CustomLittleSelect>

              <CustomLittleSelect
                value={period}
                onChange={this.handleChange}
                inputProps={{
                  name: 'period',
                  id: 'third',
                }}
              >
				        <MenuItem value={-1} disabled><em>Период</em></MenuItem>
                {rules.period.map(i=>{
                  if (i.type_rule_id === type) return (
                    <MenuItem value={i.id}>{i.period_rule}</MenuItem>
                  )
                })}
              </CustomLittleSelect>

              <CustomLittleSelect
                value={data_rule}
                onChange={this.handleChange}
                inputProps={{
                  name: 'data_rule',
                  id: 'four',
                }}
              >
				        <MenuItem value={-1} disabled><em>Значение</em></MenuItem>
                {DATE_RULE.map(i=>(
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
              </CustomLittleSelect>

              <StyleButton variant='outlined' color='primary'>Применить</StyleButton>

            </StyledSpan>
          </CardContent>
        </StyledCard>
      </>
    )
  }
}

const StyleButton = styled(Button)` && {
	width: 150px;
	height: 40px;
	margin-bottom: -5px;
}`

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 20px;
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
