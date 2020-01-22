import React, { Component } from 'react'
import { AppBar,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CircularProgress
} from '@material-ui/core'
import styled from 'styled-components'
import DialogTable from 'Comp/DialogTable'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';
import { setTable, TIMING, COLORS } from 'Comp/Break/MainTable/tools'

class MainTable extends Component {

  state={
    hMain: 100,
    endpoint: "localhost:4001",
    dialog: false,
    hour: 0,
    min: 0,
    login: '',
    table: {},
    state: false,
    loader: true,
  }

  randomString(i) {
		let rnd = '';
		while (rnd.length < i)
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, i);
	};

  onRules = (e) => {
    const { enqueueSnackbar } = this.props
    e.preventDefault()
    enqueueSnackbar(`Невозможно установить перерыв. Причина: Правила`, {variant: 'warning',autoHideDuration: 3000})
  }

  onClick = (id) => async () => {
    const { enqueueSnackbar } = this.props
    const { login, table } = this.state
    const { socket } = this.context
    await this.setState({ loader: true })
    let id_cell = undefined
    let error = 0
    TIMING.map(i => { if (i[3] === id) id_cell = i[0] })
    for (let i = id_cell; i <= id_cell+2; i++) {
      if (i>-1 && i<204 && (table[TIMING[i][3]] === COLORS[0] || table[TIMING[i][3]] === COLORS[3])) error = 1
    }
    if (error === 1) {
      enqueueSnackbar(`Невозможно установить перерыв. Причина: Правила`, {variant: 'warning',autoHideDuration: 3000})
      await this.setState({ loader: false })
    }
    else
      await socket.emit('SetInTableBreak', { login: login, type: 3, set: id })
  }

  onDialog = (h, m) => (e) => {
    e.preventDefault()
    this.setState({ dialog: !this.state.dialog, hour: h, min: m })
  }

  onClickCustom = (type) => async () => {
    const { enqueueSnackbar } = this.props
    const { hour, min, login, table } = this.state
    const { socket } = this.context
    await this.setState({ loader: true, dialog: false })
    let id_cell = undefined
    let error = 0
    TIMING.map(i => { if (i[3] === `${hour}_${min}`) id_cell = i[0] })
    for (let i = id_cell; i <= id_cell+type-1; i++) {

      if (i>-1 && i<204 && (table[TIMING[i][3]] === COLORS[0] || table[TIMING[i][3]] === COLORS[3])) error = 1
    }
    if (error === 1) {
      enqueueSnackbar(`Невозможно. Причина: задет закрытый участок времени`, {variant: 'warning',autoHideDuration: 3000})
      await this.setState({ loader: false })
    }
    else
      await socket.emit('SetInTableBreak', { login: login, type: type, set: `${hour}_${min}` })
  }

  onPlug = (e) => e.preventDefault();

  async componentDidMount () {
    const { socket } = this.context
    const { enqueueSnackbar, people_id } = this.props
    let hMain = (document.documentElement.clientHeight - 73) / 13
    await this.setState({ hMain: hMain, login: this.randomString(5) })

    await socket.on('updateTable', (data) => {
      let table = setTable(data, people_id)
      this.setState({ table: table, loader: false })
    })

    await socket.on('send_error', (data) => {
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {
        variant: data.name,
        autoHideDuration: 6000,
        preventDuplicate: true
      })
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000,preventDuplicate: true})
      this.setState({ loader: false })
    })
    await socket.emit('updateTable', {})
  }

  render() {
    const { hMain, dialog, table } = this.state
    const timeH = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
    const timeM = ['00','05','10','15','20','25','30','35','40','45','50','55']

    const { onContextMenu, handleClose, openDialogTable } = this.props
    const { loader } = this.state
    return (
      <>
        <Loader loader={loader}>
          <CircularProgress />
        </Loader>

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
                  let click = true
                  if (table[t_colorData] === '#FFFF00' || table[t_colorData] === '#0099ff' || table[t_colorData] === '#FF6666') click = false
                  return (
                    <StyledTableCell
                      color={table[t_colorData]}
                      id={t_colorData}
                      onContextMenu={!click ? this.onRules : this.onDialog(hour, min)}
                      onClick={!click ? this.onRules : this.onClick(t_colorData)}
                    >
                      {hour}:{min}
                    </StyledTableCell>
                  )
                })}
                </StyleTableRow>
            ))}

          </TableBody>
        </StyleTable>

        <DialogTable handleClose={this.onDialog} openDialogTable={dialog} onClickCustom={this.onClickCustom} />
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

const Loader = styled.div` {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.5);
  display: ${p=>p.loader ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1;
}`

MainTable.contextType = SocketConsumer;
export default withSnackbar(MainTable)
