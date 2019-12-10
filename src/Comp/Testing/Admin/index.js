import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, Table, TableRow, TableBody, TableCell, TableHead, Select, FormControl, InputLabel } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

class AdminTest extends Component {

  state = {
    hMain: 100,
    wMain: 100
  }

  componentDidMount() {
    let hMain = document.documentElement.clientHeight - 104
    let wMain = document.documentElement.clientWidth - 40
    this.setState({ hMain: hMain, wMain: wMain })
  }

  render() {
    const { hMain, wMain } = this.state

    const date = new Date()

    const dataTable = [
      {
        id: 1,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 2,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 3,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 4,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 5,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 6,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 7,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 8,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 9,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
      {
        id: 10,
        name: 'Тестов Тест Тестович',
        nameT: 'АО 3 квартал 2019',
        nameO: 'АО',
        date: `${date.getDate()}.${+date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        time: '00:05:00',
        bal: '97'
      },
    ]

    return (
      <StyleCard h={hMain} w={wMain}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№ Записи в БД</TableCell>
              <TableCell>
                <StyleFormControl>
                  <InputLabel htmlFor="select-fio">ФИО сотрудника</InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: 'ФИО сотрудника',
                      id: 'select-fio',
                    }}
                    value={0}
                  >
                    <option value="" />
                    <option value={1}>Тестов Тест Тестович</option>
                    <option value={2}>Тестов2 Тест2</option>
                  </Select>
                </StyleFormControl>
              </TableCell>
              <TableCell>
                <StyleFormControl>
                  <InputLabel htmlFor="select-test">Название теста</InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: 'Название теста',
                      id: 'select-test',
                    }}
                    value={0}
                  >
                    <option value="" />
                    <option value={1}>АО 3 квартал 2019</option>
                    <option value={2}>АО 4 квартал 2019</option>
                  </Select>
                </StyleFormControl>
              </TableCell>
              <TableCell>
                <StyleFormControl>
                  <InputLabel htmlFor="select-otdel">Отдел</InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: 'Отдел',
                      id: 'select-otdel',
                    }}
                    value={0}
                  >
                    <option value="" />
                    <option value={1}>Астрал Отчет</option>
                    <option value={2}>1С-Отчетность</option>
                  </Select>
                </StyleFormControl>
              </TableCell>
              <TableCell>
                <StyleMuiPickersUtilsProvider utils={DateFnsUtils}>
                  <StyleKeyboardDatePicker
                    variant="inline"
                    format="dd.MM.yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={new Date()}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </StyleMuiPickersUtilsProvider>
              </TableCell>
              <TableCell>Затраченное время</TableCell>
              <TableCell>Процент</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map(i=>(
              <TableRow>
                <TableCell>{i.id}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.nameT}</TableCell>
                <TableCell>{i.nameO}</TableCell>
                <TableCell>{i.date}</TableCell>
                <TableCell>{i.time}</TableCell>
                <TableCell>{i.bal}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyleCard>
    )
  }
}

const StyleKeyboardDatePicker = styled(KeyboardDatePicker)` && {
  width: 150px;
  margin-top: 5px;
}`

const StyleMuiPickersUtilsProvider = styled(MuiPickersUtilsProvider)` && {
  width: 150px;
  margin-top: -20px;
}`

const StyleFormControl = styled(FormControl)` && {
  margin-top: -20px;
}`

const StyleCard = styled(Card)` && {
  height: ${p=>p.h}px;
  width: ${p=>p.w}px;
  margin: 20px;
  overflow-y: scroll;
  position: relative;
}`

export default AdminTest
