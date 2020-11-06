import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const List = React.memo(function List({ addBadge, items, inBadge, removeBadge, URL_SERVER, cat }) {
    return (
        <Root>
            {items.map((i,ind) => {
                let res = false
                inBadge.map(j => { if (j.id === i.id) res = true })
                let src = i.hvimage ? `${URL_SERVER}/marketimg/${i.image}` : `${URL_SERVER}/image/item.png`
                if (cat === 0 || i.cat === cat) return (
                    <Item onContextMenu={(e) => e.preventDefault()}>
                        <ItemImg src={src} />
                        <ItemText>{i.name}</ItemText>
                        <Price>{i.price} б.</Price>
                        <Buy s={res} onClick={() => res ? removeBadge(i.id) : addBadge(i)}>{res ? 'Отменить' : 'Купить'}</Buy>
                    </Item>
                )
            })}
        </Root>    
    )
})

const Buy = styled(Button)` && {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 129px;
    height: 56px;
    background: ${p=>p.s ? '#C5202F' : '#5368B9'};
    color: #fff;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    text-transform: none;
    border-radius: 0px;
    border-bottom-right-radius: 5px;
    display: block;
} &&.MuiButton-root:hover {
    background: ${p=>p.s ? '#C5202F' : '#5368B9'};
}`

const Price = styled.span`{
    position: absolute;
    bottom: 0px;
    left: 16px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: #5368B9;
    justify-content: center;
    cursor: default;
    display: flex;
    width: 113px;
    height: 56px;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
}`

const ItemText = styled.span`{
    position: absolute;
    top: 169px;
    left: 25px;
    width: 208px;
    max-width: 208px;
    max-height: 84px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 18px;
    color: #B7C2CE;
    text-align: center;
    cursor: default;
}`

const ItemImg = styled.img`{
    position: absolute;
    top: 25px;
    left: 50px;
    width: 183px;
    height: 136px;
}`

const Item = styled.div`{
    position: relative;
    margin: 8px;
    width: 258px;
    min-width: 258px;
    max-width: 258px;
    height: 317px;
    min-height: 317px;
    max-height: 317px;
    background: #fff;
    border-radius: 5px;
}`

const Root = styled.div`{
    position: absolute;
    top: 355px;
    left: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 371px);
    max-height: calc(100% - 371px);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 8px;
}`