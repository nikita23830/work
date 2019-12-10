import React, {Component} from 'react'
import styled, { keyframes } from "styled-components"
import { Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  TextField,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core'
import { Delete, Edit, CancelOutlined } from '@material-ui/icons'
import Modal from 'react-awesome-modal';

class ReportTaskBitrixList extends Component {

  state = {
    vis: 0,
    modal: false,
  }

  changeStateModal = () => this.setState({ modal: !this.state.modal })

  render () {
    const { customwidth, customheight } = this.props
    const { vis, modal } = this.state
    return (
      <StyledCard w={customwidth} h={customheight}>
        
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>

              <Select
                value={vis}
                onChange={(e) => this.setState({ vis: e.target.value })}
              >
                <MenuItem value={0}>Все</MenuItem>
                <MenuItem value={1}>Bitrix</MenuItem>
                <MenuItem value={2}>Redmine</MenuItem>
              </Select>

            </TableCell>
            <TableCell>№ задачи</TableCell>
            <TableCell>Коментарий</TableCell>
            <TableCell>Открыть</TableCell>
            <TableCell>Редактировать</TableCell>
            <TableCell>Удалить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vis !== 2 && <TableRow>
            <TableCell>Bitrix</TableCell>
            <TableCell>000000</TableCell>
            <TableCell>
              <IconButton color='primary' onClick={this.changeStateModal}>[...]</IconButton>
            </TableCell>
            <TableCell>
              <Button color='primary' 
                onClick={() => window.open('https://portal.keydisk.ru/company/personal/user/11330/tasks/task/view/000000/', '_blank')}
              >
                Открыть задачу
              </Button>
            </TableCell>
            <TableCell><SlideIconButton color='primary'><Edit /></SlideIconButton></TableCell>
            <TableCell><SlideIconButton color='primary'><Delete color='secondary'/></SlideIconButton></TableCell>
          </TableRow>}

          {vis !== 1 && <TableRow>
            <TableCell>Redmine</TableCell>
            <TableCell>000000</TableCell>
            <TableCell>
              <IconButton color='primary' onClick={this.changeStateModal}>[...]</IconButton>
            </TableCell>
            <TableCell>
              <Button color='primary' 
                onClick={() => window.open('https://redmine.keydisk.ru/issues/000000', '_blank')}
              >
                Открыть задачу
              </Button>
            </TableCell>
            <TableCell><SlideIconButton color='primary'><Edit /></SlideIconButton></TableCell>
            <TableCell><SlideIconButton color='primary'><Delete color='secondary'/></SlideIconButton></TableCell>
          </TableRow>}

          
        </TableBody>
      </Table>

      <Modal 
        visible={modal}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={this.changeStateModal}
      >
        <ModalText>
          <CustomTypography>Здесь отображаются коментарии</CustomTypography>
          <CustomIconButton onClick={this.changeStateModal}>
            <CancelOutlined color='primary'/>
          </CustomIconButton>
        </ModalText>
      </Modal>

      </StyledCard>
    )
  }
}

const rotate = keyframes`
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
`

const SlideIconButton = styled(IconButton)` && {
} &:hover {
  animation: ${rotate} 0.6s ease-in-out both;
}`

const ModalText = styled.div `{
  padding: 10px;
  position: relative;
}`

const CustomIconButton = styled(IconButton)` && {
  position: absolute;
  top: 0px;
  right: 0px;
} &:hover {
  animation: ${rotate} 0.6s ease-in-out both;
}`

const CustomTypography = styled(Typography)` && {
  white-space: pre-wrap;
}`

const StyledCard = styled(Card)` && {
  width: ${p=>p.w}px;
  margin: 10px;
  padding: 0px;
  height: ${p=>p.h}px;
  overflow-y: scroll;
}`

const StyledSpan = styled.span` && {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  margin-bottom: 6px;
}`

const CustomTextField = styled(TextField)` && {
  width: ${p=>p.w - 240}px
  margin-top: -5px;
}`

const STextField = styled(TextField)` && {
  width: ${p=>p.w}px
}`

const AButton = styled.div` && {
  width: ${p=>p.w - 20}px
  margin: 10px;
  display: flex;
  flex-direction: row;
}`

const CButton = styled(Button)` && {
  margin: 5px;
}`

export default ReportTaskBitrixList
