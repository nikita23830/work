import React from 'react'
import styled from 'styled-components'
import { Modal } from '@material-ui/core'
import { ModalClock, CloseModalIcon } from 'Comp/Break/NewTable/Svg'

const TIMES = ['5 мин', '10 мин', '15 мин']

export const ModalBreak = React.memo(function ModalBreak({ time, onChange, onChangeModal, modalTime, blockedTime, onSendMyBreak }) {
    return (
        <Modal
            open={modalTime}
        >
            <RootModal>
                <TextTitle><ModalClock /></TextTitle>
                <CloseModal onClick={onChangeModal}><CloseModalIcon /></CloseModal>
                {TIMES.map((i, ind) => {
                    let disabled = false
                    if (blockedTime === 2) disabled = ind < 1 ? false : true
                    if (blockedTime === 1) disabled = ind < 2 ? false : true
                    return (
                        <Button ind={ind} act={time} onClick={!disabled && onChange(ind)} disabled={disabled}>{i}</Button>
                    )
                })}
                <SuccessButton onClick={onSendMyBreak}>Выбрать</SuccessButton>
            </RootModal>
        </Modal>
    )
})

const SuccessButton = styled.div`{
    position: absolute;
    width: 256px;
    height: 43px;
    left: 0px;
    top: 95px;
    background: #2285EE;
    border-radius: 0px 0px 4px 4px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #FFFFFF;
    flex: none;
    order: 0;
    align-self: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}`

const Button = styled.span`{
    position: absolute;
    width: 85.33px;
    height: 46px;
    left: ${p=>p.ind * 85}px;
    top: 50px;
    background: ${p=>p.act === p.ind ? '#E9F3FD' : p.disabled ? '#99A9BA' : '#FFFFFF'};
    border: 1px solid #E9F3FD;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${p=>p.disabled ? 'not-allowed' : 'pointer'};
    color: ${p=>p.act === p.ind ? '#2285EE' : p.disabled ? '#FFFFFF' : '#99A9BA'};
}`

const CloseModal = styled.span`{
    position: absolute;
    width: 24px;
    height: 24px;
    left: 216px;
    top: 14px;
    cursor: pointer;
}`

const TextTitle = styled.span`{
    position: absolute;
    left: 16px;
    top: 14px;
}`

const RootModal = styled.div`{
    position: absolute;
    width: 256px;
    height: 138px;
    left: calc(50% - 128px);
    top: calc(50% - 69px);
    background: #FFFFFF;
    box-shadow: 0px 16px 56px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}`