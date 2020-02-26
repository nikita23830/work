import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { FavoriteBorderOutlined, Favorite, DeleteForeverOutlined } from '@material-ui/icons'


export const OpenNewsRead = ({ URL_SERVER, LEVEL_NEWS, news, imgReadNews, like, readNews, people_id, installLike, deleteLike, dissableLike }) => {
    let myLike = !dissableLike && like[readNews] ? like[readNews].filter(i => i.people_id === people_id) : []
    return (
        <Root>
            <CustomGrid container spacing={3}>
                <Title item xs={12} sm={12}>{news.title}</Title>
                <Author item xs={12} sm={6}>{news.surname} {news.name}</Author>
                <Date item xs={12} sm={6}>{news.date}</Date>
                {imgReadNews.map(i => (
                    <Grid item xs={12} sm={12}>
                       <ImageNews src={`${URL_SERVER}/uploads/${i.filename}`} />
                    </Grid>
                ))}
                <TextNews item xs={12} sm={12}>{news.text}</TextNews>
            </CustomGrid>
            {!dissableLike && news.islike && <>
                {Boolean(myLike.length) ? <LikeInstall color='secondary' onClick={deleteLike(news.id)} /> : <LikeIcon onClick={installLike(news.id)}/>}
            
                <LikeCount>{like[readNews] ? like[readNews].length : 0}</LikeCount>
            </>}
            {LEVEL_NEWS === 2 && <DeleteForeverOutlinedIcon color='secondary' />}
        </Root>
    )
}

const DeleteForeverOutlinedIcon = styled(DeleteForeverOutlined)` && {
    position: absolute;
    bottom: 25px;
    right: 25px;
    cursor: pointer;
}`

const LikeInstall = styled(Favorite)` && {
    position: absolute;
    bottom: 25px;
    left: 25px;
    cursor: pointer;
}`

const LikeCount = styled.span`{
    position: absolute;
    bottom: 27px;
    left: 55px;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #1D3F66;
}`

const LikeIcon = styled(FavoriteBorderOutlined)` && {
    position: absolute;
    bottom: 25px;
    left: 25px;
    cursor: pointer;
    color: #2285EE;
}`

const TextNews = styled(Grid)` && {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #1D3F66;
    text-align: left;
}`

const ImageNews = styled.img` {
    max-width: 100%;
}`

const Date = styled(Grid)` && {
    text-align: right;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #B7C2CE;
}`

const Author = styled(Grid)` && {
    text-align: left;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #B7C2CE;
}`

const Title = styled(Grid)` && {
    text-align: left;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const CustomGrid = styled(Grid)` && {
    position: absolute;
    left: 24px;
    width: calc(100% - 16px);
    top: 20px;
    max-height: calc(100% - 85px);
    overflow-y: auto;
    overflow-x: hidden;
}`

const Root = styled.div`{
    position: absolute;
    top: 12px;
    left: 721px;
    width: calc(100% - 737px);
    height: ${document.documentElement.clientHeight - 80}px;
    overflow-y: auto;
    background: #fff;
}`