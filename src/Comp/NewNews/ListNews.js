import React from 'react'
import styled from 'styled-components'
import { Grid, Card } from '@material-ui/core'
import { LittleCirclePost } from 'Comp/NewNews/svg'
import { FavoriteBorderOutlined } from '@material-ui/icons'

export const ListNews = ({ news, imgNews }) => {
    const data = '...'
    const trit = false
    return (
        <ContainerGrid container spacing={2}>
            {news.map(i => {
                let noImg = !Boolean(imgNews.filter(j => j.id_news === i.id).length)
                return (
                    <CustomGrid item xs={12} sm={noImg ? 6 : 12}>
                        <CardNews noImg={noImg}>
                            <Title noImg={noImg}>{i.title}</Title>
                            <AuthorPost>{i.surname} {i.name}</AuthorPost>
                            <LittleCirclePost />
                            <DatePost>{i.date}</DatePost>
                            <DataPost noImg={noImg}>{i.text.substr(0, 125)}{i.text.length > 125 && '...'}</DataPost>
                            {i.islike && <>
                                <StyleLike><FavoriteBorderOutlined /></StyleLike>
                                <ColLike>666</ColLike>
                            </>}
                            {i.tags && <StyleTags noImg={noImg}>#{i.tags}</StyleTags>}
                            {!noImg && <StyleImg src='http://10.254.4.41:4001/uploads/1' />}
                        </CardNews>
                    </CustomGrid>
                )
            })}
        </ContainerGrid>
    )
}

const CustomGrid = styled(Grid)` && {
    max-height: 225px;
}`

const StyleImg = styled.img`{
    position: absolute;
    width: 225px;
    max-width: 225px;
    height: 166px;
    max-height: 166px;
    left: 409px;
    top: 24px;    
}`

const StyleTags = styled.span`{
    position: absolute;
    width: 200px;
    max-width: 200px;
    overflow: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 19px;
    right: ${p=>p.noImg ? '24px' : '273px'};
    top: 171px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #DDE2E8;
    text-align: right;
    cursor: default;
}`

const ColLike = styled.span`{
    position: absolute;
    width: 19px;
    height: 19px;
    left: 56px;
    top: 171px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
}`

const StyleLike = styled.span`{
    position: absolute;
    width: 24px;
    height: 24px;
    left: 24px;
    top: 168px;
    cursor: pointer;
}`

const DataPost = styled.span`{
    position: absolute;
    width: ${p=>p.noImg ? '265px' : '361px'};
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
    text-align: left;
}`

const Title = styled.span`{
    position: absolute;
    max-width: ${p=>p.noImg ? '270px' : '361px'};
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
    width: ${p=>p.noImg ? '323px' : '658px'};
    height: 216px;
    position: relative;
}`

const ContainerGrid = styled(Grid)` && {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 705px;
    max-height: ${document.documentElement.clientHeight - 80}px;
    overflow-y: auto;
}`