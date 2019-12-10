import React, {Component} from 'react'
import styled from 'styled-components'
import { FormControl, FormLabel, FormControlLabel, FormHelperText, Radio, RadioGroup, Typography } from '@material-ui/core'

class RButtonAnswerTesting extends Component {

  state = {
    value: '',
  }

  handleChange = (e) => this.setState({ value: e.target.value })

  render () {
    const {value} = this.state
    const ans = ['Первый', 'Второй', 'Третий', 'Четвертый', 'Пятый', 'Шестой', 'Седьмой', 'Восьмой', 'Девятый']
    return (
      <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender2" value={value} onChange={this.handleChange}>

          {ans.map(i => (
            <FormControlLabel
              value={i}
              control={<Radio color="primary" />}
              label={<Customp>{i}</Customp>}
            />
          ))}

        </RadioGroup>
      </FormControl>
    )
  }
}

const Customp = styled.p` && {
  font-size: 9pt;
  white-space: pre-wrap;
}`

export default RButtonAnswerTesting
