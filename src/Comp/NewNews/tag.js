import React from 'react'
import styled from 'styled-components'
import { Modal, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'

export const AddTags = ({ onChange, value, show, valueLike, changeLike, sendPost, cancelTags }) => (
    <Modal
        open={show}
    >
        <DivBody>
            <DivTitle>Перед тем как опубликовать - заполните данные</DivTitle>
            <StyleTextField variant='outlined' value={value} onChange={onChange} label='Введите тэг данной новости (необязательно)' placeholder='# будет добавлена автоматически' />
            <StyleFormControlLabel
                control={
                    <Checkbox checked={valueLike} onChange={changeLike} value="like" color='primary' />
                }
                label="Разрешить оценивать данную новость"
            />
            <StyleButton color='primary' variant='outlined' onClick={sendPost}>Опубликовать</StyleButton>
            <CancelButton color='secondary' variant='outlined' onClick={cancelTags}>Отменить</CancelButton>
        </DivBody>
    </Modal>
)

const CancelButton = styled(Button)` && {
    position: absolute;
    width: 105px;
    height: 38px;
    right: 24px;
    top: 212px;
    text-transform: none;
}`

const StyleButton = styled(Button)` && {
    position: absolute;
    width: 105px;
    height: 38px;
    left: 24px;
    top: 212px;
    text-transform: none;
}`

const StyleFormControlLabel = styled(FormControlLabel)` && {
    position: absolute;
    top: 174px;
    height: 20px;
    width: 492px;
    left: 26px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #000000;
    user-select: none;
}`

const StyleTextField = styled(TextField)` && {
    position: absolute;
    width: 496px;
    height: 76px;
    left: 24px;
    top: 80px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #2285EE;
}`;

const DivTitle = styled.div`{
    position: absolute;
    width: 544px;
    height: 64px;
    left: 0px;
    top: 0px;
    background: #2285EE;
    border-radius: 4px 4px 0px 0px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF; 
    display: flex;
    justify-content: center;
    align-items: center;
}`;

const DivBody = styled.div`{
    position: absolute;
    width: 544px;
    height: 274px;
    left: calc(50% - 272px);
    top: calc(50% - 137px);
    background: #FFFFFF;
    border-radius: 4px 4px 0px 0px;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
    border-radius: 4px
}`;