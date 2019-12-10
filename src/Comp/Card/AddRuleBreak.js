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

class AddRuleBreak extends Component {

  state = {
    first: 0,
    second: 0,
    four: 0,
    third: 0,
	wMain: 100,
	hMain: 100,
  }

  componentDidMount () {
    let wMain = document.documentElement.clientWidth - 40
    this.setState({ wMain: wMain })
  }


  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { first, second, four, third, wMain } = this.state
    return (
      <>
        <StyledCard w={wMain}>
          <CardContent>
            <StyledSpan>

              <CustomSelect
                value={first}
                onChange={this.handleChange}
                inputProps={{
                  name: 'first',
                  id: 'first',
                }}
              >
				<MenuItem value={0} disabled><em>Правило</em></MenuItem>
                <MenuItem value={1}>Макс. отдыхов одновременно</MenuItem>
                <MenuItem value={2}>Промежуток между отдыхами</MenuItem>
              </CustomSelect>

              <CustomLittleSelect
                value={second}
                onChange={this.handleChange}
                inputProps={{
                  name: 'second',
                  id: 'second',
                }}
              >
				<MenuItem value={0} disabled><em>Условие</em></MenuItem>
                <MenuItem value={1}>В час</MenuItem>
                <MenuItem value={2}>Сотрудник</MenuItem>
              </CustomLittleSelect>

              <CustomLittleSelect
                value={third}
                onChange={this.handleChange}
                inputProps={{
                  name: 'third',
                  id: 'third',
                }}
              >
				<MenuItem value={0} disabled><em>Период</em></MenuItem>
                <MenuItem value={1}>6:00</MenuItem>
                <MenuItem value={2}>7:00</MenuItem>
              </CustomLittleSelect>

              <CustomLittleSelect
                value={four}
                onChange={this.handleChange}
                inputProps={{
                  name: 'four',
                  id: 'four',
                }}
              >
				<MenuItem value={0} disabled><em>Значение</em></MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
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

export default AddRuleBreak
