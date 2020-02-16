import React from 'react'
import { Modal, TextField, Select, MenuItem, Button } from '@material-ui/core'
import styled, { keyframes } from 'styled-components'
import { EmptyCircle } from 'Comp/FeedBack/Svg'
import { BugReportOutlined, ContactSupportOutlined, EmojiObjectsOutlined, Close } from '@material-ui/icons'

export const TYPE = [
    {
        title: 'Баг',
        icon: <BugReportOutlined color='primary' />
    },
    {
        title: 'Вопрос',
        icon: <ContactSupportOutlined color='primary' />
    },
    {
        title: 'Улучшение',
        icon: <EmojiObjectsOutlined color='primary' />
    }
]

class NewModalChats extends React.PureComponent {

    state = {
        title: '',
        type: 0,
        errorTitle: false,
        errorType: false
    }

    onCreate = () => {
        const { title, type } = this.state
        const { socket } = this.props
        let errorTitle = title.replace(/\s/g, '') === '' ? true : false
        let errorType = type === 0 ? true : false
        if (errorTitle || errorType)
            this.setState({ errorTitle: errorTitle, errorType: errorType })
        else
            socket.emit('onCreateChat', {title: title, type: type})
    }

    render () {
        const {title, type, errorTitle, errorType} = this.state
        return (
            <Modal
                open={true}
            >
                <NewChats>
                    <CloseModal color='secondary' onClick={this.props.onClose}/>
                    <Title>Создание обращения</Title>
                    <Hr />
                    <StyleTextField label='Введите тему' value={title} onChange={e=>this.setState({ title: e.target.value, errorTitle: false })} error={errorTitle}/>
                    <StyleSelect label='Тип' value={type} onChange={e=>this.setState({ type: e.target.value, errorType: false })} error={errorType}>
                        <MenuItem disabled value={0}>
                            <EmptyCircle />
                            <Styledp>Тип</Styledp>
                        </MenuItem>
                        {TYPE.map((i, ind) => (
                            <MenuItem value={ind+1}>
                                {i.icon}
                                <Styledp>{i.title}</Styledp>
                            </MenuItem>
                        ))}
                    </StyleSelect>
                    <StyleButton onClick={this.onCreate}>Создать</StyleButton>
                </NewChats>
            </Modal>
        )
    }
}

export default NewModalChats

const Anim = keyframes`{
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}`

const CloseModal = styled(Close)` && {
    position: absolute;
    top: 18px;
    right: 18px;
    cursor: pointer;
} &&:hover {
    animation: ${Anim} 0.6s ease-in-out both;
}`

const StyleButton = styled(Button)` && {
    position: absolute;
    background: #2285EE;
    text-transform: none;
    left: 20px;
    bottom: 16px;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
} &&:hover {
    background: #2285EE;
}`

const Styledp = styled.p`{
    margin: 0px 10px 0px 10px;
}`

const StyleSelect = styled(Select)` && {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    width: 264px;
    height: 42px;
    left: 16px;
    top: 115px;
    .MuiInputBase-inputSelect {
        padding-right: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}`

const StyleTextField = styled(TextField)` && {
    position: absolute;
    width: 264px;
    height: 42px;
    left: 16px;
    top: 59px;
}`

const Hr = styled.span`{
    position: absolute;
    width: 296px;
    height: 1px;
    left: 0px;
    top: 58px;
    background: #E9F3FD;
}`

const Title = styled.span`{
    position: absolute;
    width: 156px;
    height: 19px;
    left: 20px;
    top: 20px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const NewChats = styled.div`{
    position: absolute;
    width: 296px;
    height: 220px;
    left: calc(50% - 148px);
    top: calc(50% - 104px);
    background: #FFFFFF;
    border-radius: 4px;
}`
