import React, { Component } from 'react'
import { Calendar } from 'react-datepicker2';
import styled from 'styled-components'
import { Card } from '@material-ui/core'

import ReportTaskMessage from 'Comp/Card/ReportTaskMessage'
import ReportTaskBitrix from 'Comp/Card/ReportTaskBitrix'
import ReportTaskRedmine from 'Comp/Card/ReportTaskRedmine'
import ReportTaskBitrixList from 'Comp/Card/ReportTaskBitrixList'

export default class ReportTask extends Component {

  state = {
    hMain: 100,
    wMain: 100,
    wMainBlock: 100,
  }

  componentDidMount() {
    let dt = {}
    dt.hMain = document.documentElement.clientHeight - 90
    dt.wMain = document.documentElement.clientWidth - 390
    dt.wMainBlock = (dt.wMain - 60) / 3
    this.setState({ ...dt })
  }

  render () {
    const { hMain, wMain, wMainBlock } = this.state
    let customheight = hMain - 326
    let customwidth = wMain - 20
    console.log(customwidth, customheight)
    return (
      <RootDiv>
        <BlockCalendar h={hMain}>
          <Calendar
            isGregorian={true}
            onChange={value => { this.setState({ date: value.locale('es').format('DD.MM.YYYY') }) }}
          />
        </BlockCalendar>
        <MainTask h={hMain} w={wMain}>
          <MaintTaskAdd>
            <ReportTaskMessage wMainBlock={wMainBlock} />
            <ReportTaskBitrix wMainBlock={wMainBlock} />
            <ReportTaskRedmine wMainBlock={wMainBlock} />
          </MaintTaskAdd>
          <MaintTaskAdd>
            <ReportTaskBitrixList customwidth={customwidth} customheight={customheight} />

          </MaintTaskAdd>
        </MainTask>
      </RootDiv>
    )
  }
}

const RootDiv = styled.div` && {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}`

const MaintTaskAdd = styled.div` && {
  display: flex;
  flex-direction: row;
}`

const BlockCalendar = styled(Card)` && {
  width: 350px;
  height: ${p=>p.h}px;
  margin: 10px;
}`

const MainTask = styled(Card)` && {
  width: ${p=>p.w}px;
  height: ${p=>p.h}px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}`
