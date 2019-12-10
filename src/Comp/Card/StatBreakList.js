import React, {Component} from 'react'
import styled from 'styled-components'
import {Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

class StatBreakList extends Component {

  state = {
    heightList: 0
  }

  componentDidMount () {
    let height = `${document.documentElement.clientHeight - 370}px`
    this.setState({ heightList: height })
  }

  render() {
    const { heightList } = this.state
    return (
      <>
        <StyledCard height={heightList}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>Начало перерыва</TableCell>
                <TableCell>Конец перерыва</TableCell>
                <TableCell>Продолжительность</TableCell>
                <TableCell>Руководитель</TableCell>
                <TableCell>Удалить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell><a href='#'>Тестов Т.</a></TableCell>
                <TableCell>11:50</TableCell>
                <TableCell>12:05</TableCell>
                <TableCell>15 минут</TableCell>
                <TableCell>Шкляр С.</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete color='primary' />
                  </IconButton>
                </TableCell>
              </TableRow>


            </TableBody>
          </Table>

        </StyledCard>
      </>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: 100%;
  margin: 0 20px 20px 20px;
  height: ${props => props.height};
  overflow-y: auto;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default StatBreakList
