import React, { Component} from 'react'
import styled from 'styled-components'
import { Card, Modal, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Button } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

class DevPreView extends Component {

	render() {
		const { showDevPreView, onDevPreView, data } = this.props
		return (
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={showDevPreView}
			 >
				{data && <ModalDiv>
					<StyleCard>
						<HeadBlock>
							<LiHead><p>Название</p><p>{data.name}</p></LiHead>
							<LiHead><p>Заданное количество вопросов</p><p>{data.eNum}</p></LiHead>
							<LiHead><p>Выходное количество вопросов</p><p>{data.outNum}</p></LiHead>
							<LiHead><p>Количество блоков</p><p>{data.tree && data.tree.block.length}</p></LiHead>
							<LiHead><p>Дата открытия теста</p><p>{data.dataIn}</p></LiHead>
							<LiHead><p>Дата закрытия теста</p><p>{data.dataOut}</p></LiHead>
							<LiHead><p>Создан</p><p>{data.create}</p></LiHead>
							<LiHead><p>Редактирован</p><p>{data.create}</p></LiHead>
							<LiHead><p>Указан отдел</p><p>{data.otd}</p></LiHead>
							<LiHead><p>Основной блок</p><p>-</p></LiHead>
						</HeadBlock>

						{data && data.tree && data.tree.block.map(i => (
							<ExpansionPanel>
								<ExpansionPanelSummary
									expandIcon={<ExpandMore />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography>{i.name}</Typography>
								</ExpansionPanelSummary>
								<StyleExpansionPanelDetails>
									{i.quest.map(j => (
										<>
											<BodyBlock>
												<BlockQ>{j.name === '' ? <em>Без названия</em> : j.name}</BlockQ>
												<BlockA>
													{j.ans.map((k, kIndex) => {
														let kTrue = j.true.indexOf(`a${kIndex}`) === -1 ? false : true
														return (
															<Ans true={kTrue}>{k.text}</Ans>
														)
													})}
												</BlockA>
											</BodyBlock>
											<hr width="100%"/>
										</>
									))}
								</StyleExpansionPanelDetails>
							</ExpansionPanel>
						))}


					</StyleCard>

					<CloseButton variant='outlined' color='secondary' onClick={onDevPreView}>Закрыть</CloseButton>
				</ModalDiv>}
			  </Modal>
		)
	}
}

const StyleExpansionPanelDetails = styled(ExpansionPanelDetails)` && {
	display: flex;
	flex-direction: column;
}`

const Ans = styled.div` {
	border: 1px solid ${p=>p.true ? '#01A40C' : '#FF0000'};
	margin-bottom: 5px;
	padding: 4px;
	border-radius: 5px;
}`

const BodyBlock = styled.div` {
	display: flex;
	flex-direction: row;
	margin-bottom: 5px;
	margin-top: 5px;
}`

const BlockQ = styled.div` {
	border-left: 5px solid #1C6EA4;
	border-radius: 15px 0px 0px 15px;
	border-right: 1px solid #1C6EA4;
	width: 455px;
	padding: 5px;
}`

const BlockA = styled.div` {
	width: 455px;
	padding: 5px;
	display: flex;
	flex-direction: column;
	border-right: 5px solid #1C6EA4;
	border-radius: 0px 15px 15px 0px;
	border-left: 1px solid #1C6EA4;
}`

const CloseButton = styled(Button)` && {
	position: absolute;
	bottom: 5px;
	right: 5px;
	height: 50px;
	width: 490px;
}`

const HeadBlock = styled.div` {
	margin: 5px 5px 10px 5px;
	border-bottom: 1px solid black;
	height: 360px;
}`

const LiHead = styled.div` {
	margin: 3px;
	display: flex;
	justify-content: space-between;
	height: 30px;
}`

const ModalDiv = styled(Card)` && {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1000px;
	height: 570px;
}`

const StyleCard = styled(Card)` && {
	width: 1000px;
	height: 500px;
	overflow-y: scroll;
}`

export default DevPreView
