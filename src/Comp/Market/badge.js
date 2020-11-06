import React from 'react'
import { Popper, ClickAwayListener, Grid, IconButton, Avatar } from '@material-ui/core'
import styled from 'styled-components'
import { Add, Remove } from '@material-ui/icons'


export const BadgeMarket = React.memo(function BadgeMarket({ open, anchorEl, onClose }) {
    
    return (
        <Popper id='marketbadge' open={open} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={onClose}>
                <Root>
                    <TopBadge>
                        <Span>Баланс: -100 б.</Span>
                        <Span>Общая стоимость: 100 б.</Span>
                    </TopBadge>
                    <CGrid container spacing={1}>
                        <IGrid items xs={12}>
                            <TextItem>тест тест тест тест тест тест тест тест тест тест тест тест тест тест тест тест тест </TextItem>
                            <SIconButton aria-label="delete" size="small" s={0}>
                                <Remove fontSize="inherit" />
                            </SIconButton>
                            <Count>1</Count>
                            <SIconButton aria-label="delete" size="small" s={1}>
                                <Add fontSize="inherit" />
                            </SIconButton>
                            <Summ>100 б</Summ>
                        </IGrid>
                    </CGrid>
                </Root>
            </ClickAwayListener>
        </Popper>
    )
});

const Summ = styled.div`{
    
}`

const Count = styled(Avatar)` && {
    position: absolute;
    top: 12px;
    left: 250px;
    width: 24px;
    height: 24px;
    font-size: 13pt;
} &&.MuiAvatar-colorDefault {
    background: #5368B9;
}`

const SIconButton = styled(IconButton)` && {
    position: absolute;
    top: 12px;
    left: ${p=>(p.s * 60) + 220}px;
}`

const TextItem = styled.div`{
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    margin: 15px 0px 15px 10px;
    max-width: 200px;
    width: 200px;
}`

const IGrid = styled(Grid)` && {
    height: 50px;
    position: relative;
    border-bottom: 1px solid #E9F3FD;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}`

const CGrid = styled(Grid)` && {
    width: 100%;
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
}`

const TopBadge = styled.div`{
    display: flex;
    flex-direction: row;
}`

const Span = styled.div`{
    height: 50px;
    width: 250px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
    display: flex;
    justify-content: center;
    align-items: center;
}`

const Root = styled.div`{
    width: 500px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
    padding: 20px;
    background: #fff;
    border-radius: 5px;
}`