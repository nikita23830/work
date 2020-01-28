import React, {Component} from 'react'
import styled from 'styled-components'

import MainPageBreak from 'Comp/Card/MainPageBreak'
import MainPageTask from 'Comp/Card/MainPageTask'
import MainPageReport from 'Comp/Card/MainPageReport'
import MainPageDiagram from 'Comp/Card/MainPageDiagram'

class MainPage extends Component {

  render() {
    return (
      <>
        <StyleDiv>
          <MainPageBreak />

          <MainPageTask />
        </StyleDiv>

        <StyleDiv>
          <MainPageReport />

          <MainPageDiagram />
        </StyleDiv>
      </>
    )
  }
}

const StyleDiv = styled.div` && {
  display: flex;
  justify-content: space-around;
}`

export default MainPage
