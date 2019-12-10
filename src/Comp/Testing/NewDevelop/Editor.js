import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { TextField } from 'final-form-material-ui'
import arrayMutators from 'final-form-arrays'

import { Form, Field  } from "react-final-form";

import { DevelopProvider } from 'Comp/Testing/NewDevelop/Context'
import { CloseButton, SaveButton, CustomInputAdornment, RootEditor, NameTextField, TopCard } from 'Comp/Testing/Develop/Style'
import { Main } from 'Comp/Testing/NewDevelop/Main'
import Tree from 'Comp/Testing/NewDevelop/Tree'

class EditorTest extends PureComponent {

	state = {
		wTopCard: 100,
		hPanel: 100,
	}

	componentDidMount() {
		let dt = {}
		dt.wTopCard = document.documentElement.clientWidth - 40
		dt.hPanel = document.documentElement.clientHeight - 160
		this.setState({ ...dt })
	}

	onSubmit = () => { }

	bindFormApi = formApi => {
		this.formApi = formApi;
		const unsubscribe = () => {};
		return unsubscribe;
	};

	render() {
		const { wTopCard, hPanel } = this.state
		return (
			<Form
				onSubmit={this.onSubmit}
				mutators={{ ...arrayMutators }}
				decorators={[this.bindFormApi]}
				initialValues={{
					block: [
						{
							name: 'Блок 1',
							quest: [
								{
									name: 'Вопрос 1',
									type: 'one',
									ans: []
								}
							]
						}
					],
					focus: '0',
					focusBlock: '0',
				}}
				render={({ handleSubmit, form: { mutators: { push, remove }}, submitting, pristine, values }) => {
					const { focus, focusBlock } = values
					return (
						<DevelopProvider value={{
							values: values,
							wTopCard: wTopCard,
							hPanel: hPanel,
							formApi: this.formApi,
							push: push,
							focus: values.focus,
							focusBlock: values.focusBlock
						}}>
							<RootEditor>
								<TopCard w={wTopCard}>
									<CloseButton variant='outlined' color='secondary'>Закрыть редактор</CloseButton>
									<Field
										name={`block[${focusBlock}].quest[${focus}].name`}
										component={StyledTextField}
										label='Название вопроса'
										fullWidth
										w={wTopCard}
										placeholder='Без названия'
										color='primary'
										variant='outlined'
										required={true}
									/>
									<SaveButton variant='outlined' color='primary' disabled>Сохранить</SaveButton>
								</TopCard>


									<Main />

									<Tree />
									{/*

									<MenuTreeItem />
									<ModalBlock type='add' />
									<ModalBlock type='edit' />
									<DeleteBlock />
									*/}
							</RootEditor>
						</DevelopProvider>
					)
				}}
			/>
		)
	}
}

const StyledTextField = styled(TextField)` && {
	max-height: 40px;
	width: ${p=>p.w - 420}px;
}`

export default EditorTest
