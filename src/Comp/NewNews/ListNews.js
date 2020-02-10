import React from 'react'
import styled from 'styled-components'
import { Grid, Card } from '@material-ui/core'
import { LittleCirclePost } from 'Comp/NewNews/svg'

export const ListNews = () => {
    const data = 'В квалификационном раунде мы убедимся, что вы не только умеете решать дизайн-задачи, но и замечаете ошибки в материалах к ним bbbbbbbbb bbbbbbbbbbbbb bbbbbbbbbb bbbbbbbbbbbbb bbbbbbbb bbbbbbb'
    const trit = data.length > 125
    return (
        <ContainerGrid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <CardNews>
                    <Title>Титл новости</Title>
                    <AuthorPost>Тестов Тест</AuthorPost>
                    <LittleCirclePost />
                    <DatePost>09.02.2020</DatePost>
                    <DataPost>{data.substr(0, 125)}{trit && '...'}</DataPost>
                </CardNews>
            </Grid>
        </ContainerGrid>
    )
}

const DataPost = styled.span`{
    position: absolute;
    width: 361px;
    height: 57px;
    left: 24px;
    top: 87px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #1D3F66;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
}`

const DatePost = styled.span`{
    position: absolute;
    width: 52px;
    height: 14px;
    left: 108px;
    top: 61px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #B7C2CE;
}`

const AuthorPost = styled.span`{
    position: absolute;
    width: 66px;
    height: 14px;
    left: 24px;
    top: 61px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #B7C2CE;
}`

const Title = styled.span`{
    position: absolute;
    max-width: 361px;
    white-space: nowrap;
    overflow: hidden;
    height: 33px;
    left: 24px;
    top: 24px;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const CardNews = styled(Card)` && {
    width: 658px;
    height: 216px;
    position: relative;
}`

const ContainerGrid = styled(Grid)` && {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 685px;
    height: ${document.documentElement.clientHeight - 80}px;
    overflow-y: scroll;
}`