import React, { Component } from 'react'
import { withSnackbar } from "notistack";
import { Form, Field  } from "react-final-form";
import { TextField } from 'final-form-material-ui'
import styled from 'styled-components'
import arrayMutators from 'final-form-arrays'

import { showSnackbar } from 'Comp/Utils'
import { MenuTreeItem } from 'Comp/Testing/Develop/MenuTree'
import { ModalBlock, DeleteBlock } from 'Comp/Testing/Develop/Block/index'
import { TreePanel } from 'Comp/Testing/Develop/Panel'
import { Main } from 'Comp/Testing/Develop/Main/index'
import { DevelopProvider } from 'Comp/Testing/Develop/Context'
import { SettingDevelopTest } from 'Comp/Testing/Develop/setting'
import { CloseButton, SaveButton, CustomInputAdornment, RootEditor, NameTextField, TopCard } from 'Comp/Testing/Develop/Style'

class EditorTest extends Component {
	state={
		wTopCard: 100,
		hPanel: 100,
		tree: {},
		modal: false,
		tree: {
			name: 'АО Калуга Астрал',
			random: false,
			blockSum: 1,
			lastBlock: 0,
			mainBlock: undefined,
			settingNum: 0,
			blockList: ['b0'],
			quests: 1,
			lastQuest: 0,
			q0: {
				id: 'q0',
				name: '',
				uid: 'ad99',
				q: '',
				aList: ['a0'],
				a0: '',
				aLast: 0,
				type: 1, // 1 - 1, 0 - many
				aTrue: []
			},
			b0: {
				name: 'Блок 1',
				questSum: 1,
				quests: ['q0'],
				uid: 'b3',
			}
		},
		tempNameBlock: 'Новый блок',
		tempNameQuest: '',
		focus: 'q0',
		focusPath: undefined,
		targetMenuBlock: undefined,
		focusBlock: 'b0',
		tempNewNameBlock: undefined,
		modalEdit: false,
		permitDelete: false,
		requestBlockDelete: false,
		oneVariantAnsMain: true,
		openSettingPanel: false,
	}

	onChangeStateSettingPanel = () => this.setState({ openSettingPanel: !this.state.openSettingPanel })

	onModal = () => this.setState({ modal: !this.state.modal, targetMenuBlock: undefined });

	randomString(i) {
		let rnd = '';
		while (rnd.length < i)
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, i);
	};

	onNewBlock = (props) => {
		let { tree, tempNameBlock } = this.state;
		console.log(tree)
		const { enqueueSnackbar, closeSnackbar } = this.props
		if (tempNameBlock === '' || tempNameBlock === ' ') {
			showSnackbar({ enqueueSnackbar, text: 'Невозможно создать блок без названия', variant: 'warning', closeSnackbar })
			return 0
		}
		tree.blockSum = tree.blockSum + 1; // количество блоков
		tree.blockList.push(`b${tree.lastBlock + 1}`); // в массив блоков суем адрес
		tree[`b${tree.lastBlock + 1}`] = { // задаем новую ветку блока
			name: tempNameBlock, // название блока
			questSum: 1, // количество вопросов
			quests: [`q${tree.lastQuest + 1}`], // массив вопросов в блоке
			uid: this.randomString(10),
		}
		tree[`q${tree.lastQuest + 1}`] = {
			id: `q${tree.lastQuest + 1}`,
			name: '',
			uid: this.randomString(8),
			q: '',
			aList: ['a0'],
			a0: '',
			aLast: 0,
			type: 1,
			aTrue: []
		}
		tree.lastBlock = tree.lastBlock + 1
		tree.quests = tree.quests + 1;
		tree.lastQuest = tree.lastQuest + 1
		this.setState({ tree: tree, modal: false, tempNameBlock: '', focus: `q${tree.quests - 1}`, focusPath: `${tree.blockSum - 1}` })
	}

	componentDidMount() {
		let dt = {}
		dt.wTopCard = document.documentElement.clientWidth - 40
		dt.hPanel = document.documentElement.clientHeight - 160
		this.setState({ ...dt })
	}

	onChangeName = (e) => {
		const { focus } = this.state
		let tree = this.state.tree
		tree[focus].name = e.target.value
		this.setState({ tree: tree })
	}

	onFocusQuest = (e) => () => this.setState({ focus: e })

	onMenuTreeBlock = (e) => this.setState({ targetMenuBlock: e.currentTarget, focusBlock: e.currentTarget.id })

	onCloseMenuTreeBlock = () => this.setState({ targetMenuBlock: undefined })

	onNothingContext = (e) => e.preventDefault()

	onMenuAddQuest = (e) => this.setState({ targetMenuAddQuest: e.currentTarget })

	onCloseMenuAddQuest = () => this.setState({ targetMenuAddQuest: undefined })

	onChangeTempNameBlock = (e) => this.setState({ tempNameBlock: e.target.value })

	onNewQuestInBlock = (id) => () => {
		let uid = !id ? this.state.focusBlock : id
		let { tree } = this.state;
		tree[`q${tree.lastQuest + 1}`] = {
			id: `q${tree.lastQuest + 1}`,
			name: '',
			uid: this.randomString(8),
			q: '',
			aList: ['a0'],
			a0: '',
			aLast: 0,
			type: 1,
			aTrue: []
		}
		let t_arrQuest = tree[uid].quests
		t_arrQuest.push(`q${tree.lastQuest + 1}`)
		tree[uid] = {
			name: tree[uid].name,
			questSum: tree[uid].questSum + 1,
			uid: tree[uid].uid,
			quests: t_arrQuest
		}
		tree.quests = tree.quests + 1;
		tree.lastQuest = tree.lastQuest + 1
		this.setState({ tree: tree, targetMenuAddQuest: undefined, targetMenuBlock: undefined, focus: `q${tree.lastQuest}`, targetItemTree: undefined })
	}

	onChangeNameBlock = (e) => this.setState({ tempNewNameBlock: e.target.value })

	onModalEdit = () => this.setState({ modalEdit: !this.state.modalEdit, targetMenuBlock: undefined })

	onSaveEditBlock = () => {
		let tree = this.state.tree
		tree[this.state.focusBlock].name = this.state.tempNewNameBlock
		this.setState({ tree: tree, modalEdit: false })
	}

	onPreDeleteBlock = (bool) => async () => {
		const { focusBlock } = this.state
		const permitDelete = !bool ? false : true
		const { enqueueSnackbar, closeSnackbar } = this.props
		let tree = this.state.tree
		if ((tree[focusBlock].questSum === 1 && tree.blockSum > 1) || (tree.blockSum > 1 && permitDelete === true)) { // один вопрос - дропаем сразу
			tree[focusBlock].quests.map(i => delete tree[i]) // дропаем вопросы что в блоке
			tree.blockList = tree.blockList.filter(i => i !== focusBlock)
			delete tree[focusBlock]
			tree.blockSum = tree.blockSum - 1
			await this.setState({
				tree: tree,
				focusBlock: tree.blockList[0],
				focus: tree[tree.blockList[0]].quests[0],
				targetMenuBlock: undefined,
				permitDelete: false,
				requestBlockDelete: false
			})
		}
		else if (tree.blockSum > 1 && permitDelete === false) await this.setState({ requestBlockDelete: true, targetMenuBlock: undefined })
		else {
			await showSnackbar({ enqueueSnackbar, text: 'Невозможно удалить единственный блок', variant: 'warning', closeSnackbar })
			await this.setState({ targetMenuBlock: undefined })
		}
	}

	onChangeRequestDelete = () => this.setState({ requestBlockDelete: !this.state.requestBlockDelete })

	onMenuTreeItem = ({ block, item }) => (e) => this.setState({ targetItemTree: e.currentTarget, focusItemTree: item, focusBlock: block })

	onCloseMenuTreeItem = () => this.setState({ targetItemTree: undefined })

	onDeleteQuest = () => {
		const { enqueueSnackbar, closeSnackbar } = this.props
		let tree = this.state.tree
		const { focusBlock, focusItemTree } = this.state
		if (tree[focusBlock].questSum > 1) {
			tree.quests = tree.quests - 1
			tree[focusBlock].questSum = tree[focusBlock].questSum - 1
			tree[focusBlock].quests = tree[focusBlock].quests.filter(i => i !== focusItemTree)
			delete tree[focusItemTree]
			this.setState({ tree: tree,
				focusBlock: tree.blockList[0],
				focus: tree[tree.blockList[0]].quests[0],
				targetItemTree: undefined
			})
		} else {
			this.setState({ targetItemTree: undefined })
			showSnackbar({ enqueueSnackbar, text: 'Невозможно удалить единственный вопрос в блоке', variant: 'warning', closeSnackbar })
		}
	}

	onChangeVariantAnsMain = (e) => {
		let tree = this.state.tree
		const { focus } = this.state
		tree[focus].type = +e.target.checked
		tree[focus].aTrue = []
		this.setState({ tree: tree })
	}

	onNewAnsInQuest = () => {
		let tree = this.state.tree
		const { focus } = this.state
		tree[focus][`a${tree[focus].aLast + 1}`] =  ''
		tree[focus].aList.push(`a${tree[focus].aLast + 1}`)
		tree[focus].aLast = tree[focus].aLast + 1
		this.setState({ tree: tree })
	}

	onDeleteAnsInQuest = (id) => () => {
		const { enqueueSnackbar, closeSnackbar } = this.props
		const { focus } = this.state
		let tree = this.state.tree
		if (tree[focus].aList.length < 2) showSnackbar({ enqueueSnackbar, text: 'Невозможно удалить единственный ответ в вопросе', variant: 'warning', closeSnackbar })
		else {
			tree[focus].aList = tree[focus].aList.filter(i => i !== id)
			delete tree[focus][id]
			this.setState({ tree: tree })
		}
	}

	onChangeAnsQuest = (id) => (e) => {
		const { focus } = this.state
		let tree = this.state.tree
		tree[focus][id] = e.target.value
		this.setState({ tree: tree })
	}

	onChangeAnsTrue = (e) => {
		const { focus } = this.state
		let tree = this.state.tree
		if (tree[focus].type === 1) {
			tree[focus].aTrue = [e.target.value]
		} else {
			if (e.target.checked) tree[focus].aTrue.push(parseInt(e.target.value, 0))
			else tree[focus].aTrue = tree[focus].aTrue.filter(i => parseInt(e.target.value,0) !== parseInt(i,0))
		}
		this.setState({ tree: tree })
	}

	onChangeNameTest = (e) => {
		let tree = this.state.tree
		tree.name = e.target.value
		this.setState({ tree: tree })
	}

	onChangeRandomTest = (e) => {
		let tree = this.state.tree
		console.log(tree.random, e.target.checked)
		tree.random = e.target.checked
		this.setState({ tree: tree })
	}

	onChangeMainBlock = (e) => {
		let tree = this.state.tree
		tree.mainBlock = e.target.value
		this.setState({ tree: tree })
	}

	onChangeSettingNum = (e) => {
		console.log(e.target.value)
		let tree = this.state.tree
		tree.settingNum = e.target.value.replace(/[^0-9]/g, '');
		console.log(e.target.value, e.target.value.replace(/[^0-9]/g, ''))
		this.setState({ tree: tree })
	}
	
	bindFormApi = formApi => {
		this.formApi = formApi;
		const unsubscribe = () => {};
		return unsubscribe;
	};
	
	onSubmitForm = () => {}

	render () {
		const { wTopCard, hPanel, modal, tempNameBlock, focusPath, tree, focus, mainTreeMenu, modalEdit, focusBlock, tempNewNameBlock, requestBlockDelete, targetItemTree } = this.state
		const { onCloseEditor } = this.props
		return (
			<Form
				onSubmit={this.onSubmitForm}
				decorators={[this.bindFormApi]}
				mutators={{
					...arrayMutators
				}}
				render={({ handleSubmit, reset, submitting, pristine, values, form: { mutators: { push, remove }}, errors, touched }) => {
				return (
					<DevelopProvider value={{ ...this, push: push, remove: remove, values: values }}>
						<RootEditor>
							<TopCard w={wTopCard}>
								<CloseButton variant='outlined' color='secondary' onClick={onCloseEditor}>Закрыть редактор</CloseButton>
								<Field
									name={`${focus}.name`}
									label='Название вопроса'
									fullWidth
									required={true}
									component={StyledTextField}
									w={wTopCard}
									placeholder='Без названия'
									color='primary'
									variant='outlined'
								/>
								<SaveButton variant='outlined' color='primary' disabled>Сохранить</SaveButton>
							</TopCard>

							<TreePanel />
							<Main />

							<MenuTreeItem />
							<ModalBlock type='add' />
							<ModalBlock type='edit' />
							<DeleteBlock />

						</RootEditor>
						<SettingDevelopTest />
					</DevelopProvider>
				)}}
			/>
		)
	}
}

const StyledTextField = styled(TextField)` && {
	max-height: 40px;
	width: ${p=>p.w - 420}px;
}`

export default withSnackbar(EditorTest)
