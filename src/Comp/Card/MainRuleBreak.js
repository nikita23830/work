import React, {Component} from 'react'
import styled from 'styled-components'
import {Card, CardContent, CardActions, Typography, Button, Table, TableRow, TableBody, TableCell, TableHead, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

class MainRuleBreak extends Component {

  state = {
    height: 100,
	width: 100,
  }

  componentDidMount () {
    let h = document.documentElement.clientHeight - 200
	let w = document.documentElement.clientWidth - 40
    this.setState({ height: h, width: w })
  }

  render () {
    const { height, width } = this.state
    return (
      <StyledCard h={height} w={width}>
        <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align='left'>Макс. отдыхов одновременно</TableCell>
              <TableCell align='left'>В час</TableCell>
              <TableCell align='left'>6:00</TableCell>
              <TableCell align='left'>1</TableCell>
              <TableCell align='right'>
                <IconButton aria-label="delete">
                  <Delete color='primary' />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='left'>Макс. отдыхов одновременно</TableCell>
              <TableCell align='left'>В час</TableCell>
              <TableCell align='left'>7:00</TableCell>
              <TableCell align='left'>2</TableCell>
              <TableCell align='right'>
                <IconButton aria-label="delete">
                  <Delete color='primary' />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='left'>Макс. отдыхов одновременно</TableCell>
              <TableCell align='left'>-</TableCell>
              <TableCell align='left'>-</TableCell>
              <TableCell align='left'>3</TableCell>
              <TableCell align='right'>
                <IconButton aria-label="delete">
                  <Delete color='primary' />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='left'>Промежуток между отдыхами</TableCell>
              <TableCell align='left'>-</TableCell>
              <TableCell align='left'>-</TableCell>
              <TableCell align='left'>60 мин.</TableCell>
              <TableCell align='right'>
                <IconButton aria-label="delete">
                  <Delete color='primary' />
                </IconButton>
              </TableCell>
            </TableRow>


          </TableBody>
        </Table>
        </CardContent>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 20px;
  height: ${p=>p.h}px;
  overflow-y: auto;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
}`

export default MainRuleBreak
