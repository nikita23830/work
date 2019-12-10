import React, { Component } from 'react'
import { AppBar,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@material-ui/core'
import styled from 'styled-components'
import DialogTable from 'Comp/DialogTable'

class MainTable extends Component {

  state={
    hMain: 100,
  }

  componentDidMount () {
    let hMain = (document.documentElement.clientHeight - 73) / 13
    this.setState({ hMain: hMain })
  }

  render() {
    const timeH = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
    const timeM = ['00','05','10','15','20','25','30','35','40','45','50','55']
    const colorData = {
      '6_10': '#ff8680',
      '6_15': '#ff8680',
      '6_20': '#ff8680',
    }

    const { hMain } = this.state
    const { onContextMenu, handleClose, openDialogTable } = this.props
    return (
      <>
        <StyleTable>
          <TableHead>
            <StyleTableRow hCell={hMain} head={true}>
              { timeH.map(i => ( <StyledTableCell head={true} >{i}:00</StyledTableCell> )) }
            </StyleTableRow>
          </TableHead>
          <TableBody>

            { timeM.map(min => (
                <StyleTableRow hCell={hMain}>
                {timeH.map(hour => {
                  let t_colorData = `${hour}_${min}`
                  return (
                    <StyledTableCell
                      color={colorData[t_colorData]}
                      id={t_colorData}
                      onContextMenu={colorData[t_colorData] === '#ff8680' ? '' : onContextMenu(hour, min)}
                    >
                      {hour}:{min}
                    </StyledTableCell>
                  )
                })}
                </StyleTableRow>
            ))}

          </TableBody>
        </StyleTable>

        <DialogTable handleClose={handleClose} openDialogTable={openDialogTable} />
      </>
    )
  }
}

const StyleTable = styled(Table)` && {
  padding: 0px;
}`

const StyleTableRow = styled(TableRow)` && {
  height: ${p => p.hCell}px;
  border-bottom: ${p => p.head ? '5px solid black' : ''}
}`

const StyledTableCell = styled(TableCell)` && {
  background-color: ${p => p.color ? p.color : p.head ? '#fff' : '#98f598'};
  max-width: 0px;
  padding: 7px 14px 7px 14px;
  cursor: ${p => p.color === '#ff8680' ? 'not-allowed' : 'pointer'};
  user-select: none;
  border: ${p => p.head ? '1px solid black' : '0.5px solid #e0e0e0'};
  font: ${props => props.head ? '14pt bold' : '12pt'};
  text-align: center;
} &:hover {
  background-color: ${props => props.color === '#ff8680' ? '#ff8680' : !props.head ? '#e0e0e0' : '#fff'}
  box-shadow: ${props => !props.head ? '0 0 10px 0px rgba(0,0,0,0.5)' : ''}
}`


export default MainTable
