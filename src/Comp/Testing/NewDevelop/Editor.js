import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { TextField } from 'final-form-material-ui'
import arrayMutators from 'final-form-arrays'
import { CircularProgress } from '@material-ui/core'
import { SnackbarProvider, withSnackbar } from 'notistack';

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

	onSubmit = async (json) => {
		const { enqueueSnackbar, onSaveTree } = this.props
		await onSaveTree(json)()
		enqueueSnackbar(`Сохранено`, {variant: 'success',autoHideDuration: 3000})
	}

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
				initialValues={this.props.tree}
				render={({ handleSubmit, form: { mutators: { push, remove }}, submitting, pristine, values }) => {
					const { focus, focusBlock, loader } = values
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

							<Loader in={loader}>
								<CircularProgress />
							</Loader>

							<RootEditor>
								<TopCard w={wTopCard}>
									<CloseButton variant='outlined' color='secondary' onClick={this.props.onCloseEditor}>Закрыть редактор</CloseButton>
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
									<SaveButton variant='outlined' color='primary' onClick={() => this.formApi.submit()}>Сохранить</SaveButton>
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

const Loader = styled.div` {
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(255,255,255,0.8);
	position: absolute;
	justify-content: center;
	align-items: center;
	top: 0px;
	display: ${p=>p.in ? 'flex' : 'none'};
}`

export default withSnackbar(EditorTest)
