import React from 'react'
import styled from 'styled-components'

import StatBreakMain from 'Comp/Card/StatBreakMain'
import StatBreakList from 'Comp/Card/StatBreakList'
import MyBreakTemplate from 'Comp/Card/MyBreakTemplate'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';
import { TIMING_ZONE, TIMING } from 'Comp/Break/NewTable/tools'

class StatBreak extends React.PureComponent {

  state={
    list: [],
    diag: [],
  }

  delBreakWithListStat = () => this.props.enqueueSnackbar('Функционал временно недоступен', {variant: 'info',autoHideDuration: 4000})

  componentWillMount() {
    this.setState({ diag: clearDiag() })
  }

  async componentDidMount() {
    const { socket } = this.context
    const { enqueueSnackbar, date } = this.props
    socket.emit('fullListBreak', +date)

    await socket.on('fullListBreak', (data) => {
      let result = getNormalArrayBreak(data.listbreak)
      let diag = clearDiag()

      result.map(i => {
        TIMING_ZONE.map((j, index) => {
          if (j.indexOf(i.start) !== -1) diag[index].uv = diag[index].uv + 1
        })
      })

      this.setState({ list: getFullReport(result, data.people), diag: diag })
    })

    await socket.on('updateTable', (data) => {
      socket.emit('fullListBreak', +this.props.date)
      this.setState({ list: [] })
    })

    await socket.on('send_error', (data) => {
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {variant: data.name,autoHideDuration: 6000})
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000})
    })
  }

  render () {
    const { list, diag } = this.state
    const { drawer, loader } = this.props
    return (
      <>
        <StatBreakMain diag={diag} drawer={drawer} />
        <StyledDiv>

          {!loader && <StatBreakList list={list} delBreakWithListStat={this.delBreakWithListStat} drawer={drawer} />}

        </StyledDiv>
      </>
    )
  }
}

const getFullReport = (list, data) => {
  let result = [...list]
  list.map((i, index) => {
    data.map(j => {
      if (i.people === j.people_id) {
        result[index].name = `${j.surname} ${j.name.substr(0,1)}.`;
        result[index].manager = j.manager_id;
        result[index].mName = '-';
      }
      if (result[index].manager === j.people_id) {
        result[index].mName = `${j.surname} ${j.name.substr(0,1)}.`;
      }
    })
  })
  return result
}

const getNormalArrayBreak = (data) => {
  let result = []
  let temp_index = -1
  data.map((i, index) => {
    switch (i.start_end) {
      case 0: { result[temp_index].array.push(i.timing_id); return 0; }
      case 1: { temp_index = result.length; result.push({start: i.timing_id, people: i.people_id, array: [i.timing_id]}); return 0; }
      case 2: { result[temp_index].end = i.timing_id+1; result[temp_index].array.push(i.timing_id); return 0; }
      case 3: { result.push({start: i.timing_id, people: i.people_id, end: i.timing_id, array: [i.timing_id]}); return 0; }
    }
  })
  return result
}

const clearDiag = () => {
  let result = []
  TIMING_ZONE.map(i => {
    result.push({
      name: `${TIMING[i[0]][1]}:${addZero(TIMING[i[0]][2])}`,
      uv: 0
    })
  })
  return result
}

const StyledDiv = styled.div` && {
  display: flex;
  flex-direction: row;
}`

const StyleDivInfo = styled.div` && {
  display: flex;
  flex-direction: column;
}`

function addZero(n) {
    return String("00" + n).slice(-2);
}


StatBreak.contextType = SocketConsumer;
export default withSnackbar(StatBreak)
