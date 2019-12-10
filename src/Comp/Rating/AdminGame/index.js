import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, TableRow, TableBody, TableCell, TableHead, Button } from '@material-ui/core'

class AdminGame extends Component {

  state = {
    wRoot: 100,
    hRoot: 100
  }

  componentDidMount() {
    let dt = {}
		dt.hRoot = document.documentElement.clientHeight - 70
		dt.wRoot = document.documentElement.clientWidth - 10
    this.setState({ ...dt })
  }

  render () {
    const { wRoot, hRoot } = this.state
    return (
      <CustomTable w={wRoot} h={hRoot}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Задание</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align='center'>Подтвердить</TableCell>
              <TableCell align='center'>Отклонить</TableCell>
              <TableCell align='center'>Откатить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>0</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Выполняется</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Ожидается решение</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Одобрено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth disabled>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth disabled>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Отклонено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth disabled>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth disabled>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Выполняется</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Ожидается решение</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Одобрено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth disabled>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth disabled>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Отклонено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth disabled>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth disabled>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>8</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Выполняется</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>9</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Ожидается решение</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>10</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Одобрено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth disabled>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth disabled>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>11</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Отклонено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth disabled>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth disabled>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>12</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Выполняется</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>13</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Ожидается решение</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>14</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Одобрено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>15</TableCell>
              <TableCell>Тестов Т</TableCell>
              <TableCell>[...]</TableCell>
              <TableCell>Отклонено</TableCell>
              <TableCell>
                <Button variant='outlined' color='primary' fullWidth>Подтвердить</Button>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='secondary' fullWidth>Отклонить</Button>
              </TableCell>
              <TableCell><Button variant='outlined' color='secondary' fullWidth>Откат</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CustomTable>
    )
  }
}

const CustomTable = styled.div`{
  width: ${p=>p.w}px;
  height: ${p=>p.h}px;
  overflow-y: scroll;
}`

export default AdminGame
