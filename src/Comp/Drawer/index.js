import React, { Component } from 'react'
import { Typography,
  Button,
  Drawer,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import styled from 'styled-components'
import { ExpandMore, } from '@material-ui/icons'

class DefDrawer extends Component {

  render() {
    const { onChangePage, drawer, openDrawer, level } = this.props
    return (
      <Drawer anchor="left" open={drawer} onClose={openDrawer}>
        <StyledDrawer>
          <StyledButton variant='outlined' color='primary' onClick={onChangePage(0)}>Главная</StyledButton>

          {level[1] > 0 && <StyledExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyleTypography>Перерывы</StyleTypography>
            </ExpansionPanelSummary>
            <StyledExpansionPanelDetails>

              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(1)}>Главная</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(2)}>Мои перерывы</StyledButton>
              {level[1] === 2 && <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(3)}>Статистика</StyledButton>}
              {level[1] === 2 && <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(4)}>Правила</StyledButton>}

            </StyledExpansionPanelDetails>
          </StyledExpansionPanel>}

          {level[2] > 0 && <StyledExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyleTypography>Отчеты</StyleTypography>
            </ExpansionPanelSummary>
            <StyledExpansionPanelDetails>

              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(5)}>По задачам</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(6)}>Индивидуальные</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(7)}>По нагрузке</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(8)}>Ежедневные</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(9)}>Еженедельные</StyledButton>

            </StyledExpansionPanelDetails>
          </StyledExpansionPanel>}

          {level[3] > 0 && <StyledExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyleTypography>Тестирование (Alpha)</StyleTypography>
            </ExpansionPanelSummary>
            <StyledExpansionPanelDetails>

              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(10)}>Главная</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(11)}>История</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(12)}>Редактирование</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(13)}>Администрирование</StyledButton>

            </StyledExpansionPanelDetails>
          </StyledExpansionPanel>}

          {level[4] > 0 && <StyledExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <StyleTypography>Геймификация (Alpha)</StyleTypography>
            </ExpansionPanelSummary>
            <StyledExpansionPanelDetails>

              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(14)}>Главная</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(15)}>Моя профильт</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(16)}>Магазин</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(17)}>Ежедневная игра</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(18)}>Админ панель игры</StyledButton>
              <StyledButton variant='outlined' color='primary' exp={true} onClick={onChangePage(19)}>Администрирование</StyledButton>

            </StyledExpansionPanelDetails>
          </StyledExpansionPanel>}

          {level[0] === 1 && <StyledButton variant='outlined' color='primary' onClick={onChangePage(20)}>Администрирование</StyledButton>}

        </StyledDrawer>
      </Drawer>
    )
  }
}

const StyledDrawer = styled.div` && {
  min-width: 280px;
  padding: 10px;
  display: flex;
  flex-direction: column
  height: 100%;
  position: relative;
}`


const StyleTypography = styled(Typography)` && {
  color: #3f51b5
}`

const StyledButton = styled(Button)` && {
  width: ${props => !props.exp ? '320px' : '270px' };
  margin: 10px 0 10px 0;
  min-height: 50px;
}`

const StyledExpansionPanel = styled(ExpansionPanel)` && {
  width: 320px;
  margin: 10px 0 10px 0;
  border: 0.5px solid #9ea7da;
}`

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)` && {
  width: 270px;
  display: flex;
  flex-direction: column;
}`

export default DefDrawer
