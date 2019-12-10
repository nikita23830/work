import React, { Component } from 'react'
import styled, { keyframes } from "styled-components"
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import {MonopolyConsumer} from 'Comp/Utils'
import { Pole, LeftPole, CenterPole, RightPole, CubePole, DivCircle, MainCard, ButtonPole, ButtonStep, HistoryLog, FTableCell, STableCell, TableCellH, CustomTable } from './style'
import BigCard from './BigCard'

class MonopolyPole extends Component {

  state = {
    blockBut: false,
  }

  onMove = () => {
    this.setState({ blockBut: true })
    this.context.onMove()
  }

  render () {
    const { hPole, wPole, hCard, wCard, random, randomGo, gold, black, faceCard, randomArr, openCard } = this.context.state
    const { blockBut } = this.state
    return (
      <Pole h={hPole} w={wPole} t={hCard} l={wCard}>

        <LeftPole h={hPole}>
          <Cube randomGo={randomGo} random={randomArr} n={0}/>
        </LeftPole>

        <CenterPole h={hPole} w={wPole}>
          <BigCard />
          <ButtonDiv hPole={hPole} wPole={wPole} onMove={this.onMove} blockBut={blockBut} />
        </CenterPole>

        <RightPole h={hPole}>
          <Cube randomGo={randomGo} random={randomArr} n={1}/>
        </RightPole>

      </Pole>
    )
  }
}

const Cube = ({ random, randomGo, n }) => {
  const cube = [1,2,3,4,5,6,7,8,9]
  const cubeNum = {1:[5],2:[1,9],3:[1,5,9],4:[1,3,7,9],5:[1,3,5,7,9],6:[1,3,4,6,7,9],9:[1,2,3,4,5,6,7,8,9]}
  let dt = random[0] ? cubeNum[random[n]] : []

  let vis = cube.map(i => {
    let v_temp = false
    dt.map(i2 => { if (i === i2) v_temp = true })
    return v_temp
  })
  if (!random[0]) vis = [true, true, true, true, true, true, true, true, true]
  return (
    <CubePole>
      {cube.map(i => {
        return (
          <DivCircle id={i} go={randomGo} v={vis[i - 1]}></DivCircle>
        )
      })}
    </CubePole>
  )
}

const ButtonDiv = ({ wPole, hPole, onMove, blockBut }) => {
  return (
    <ButtonPole h={hPole} w={wPole}>
      <ButtonStep variant='outlined' color='primary' onClick={!blockBut ? onMove : ''} disabled={blockBut} fullWidth>Сделать ход</ButtonStep>
      <HistoryLog h={hPole} w={wPole}>

        <CustomTable>
          <TableHead>
            <TableRow>
              <TableCellH>#</TableCellH>
              <TableCellH>Задание</TableCellH>
              <TableCellH align="right">Выполнено</TableCellH>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Первое задание</TableCell>
              <STableCell align="right">✔</STableCell>
            </TableRow>

            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Второе задание</TableCell>
              <FTableCell align="right">✗</FTableCell>
            </TableRow>

            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Первое задание</TableCell>
              <STableCell align="right">✔</STableCell>
            </TableRow>

            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Второе задание</TableCell>
              <FTableCell align="right">✗</FTableCell>
            </TableRow>

          </TableBody>
        </CustomTable>

      </HistoryLog>
    </ButtonPole>
  )
}

MonopolyPole.contextType = MonopolyConsumer;
export default MonopolyPole
