import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { People, Coffee } from 'Comp/Break/NewTable/Svg'

export const AllBreak = () => (
    <Container container spacing={1}>
        {Hour.map(i => (
            <>
                <CustomGrid item xs={12} sm={12}>
                        <TimeZone>{i}:00</TimeZone>
                </CustomGrid>
                {Minuts.map(j=>(
                    <CustomGrid item xs={12} sm={2}>
                        {i !== '07' && <Free i={i} j={j} />}
                        {i === '07' && <My i={i} j={j} />}
                    </CustomGrid>
                ))}
            </>
        ))}
    </Container>
)

const My = ({ i, j }) => (
    <MyTable>
        <IconCoffee><Coffee /></IconCoffee>
        
        <TextCoffee>Можно выпить кофейку</TextCoffee>
    </MyTable>
)

const Free = ({ i, j }) => (
    <TableButton>
        <IconPeople><People /></IconPeople>
        <CountPeople>10</CountPeople>
        <TimeButton>{i}:{j}</TimeButton>
    </TableButton>
)

const Minuts = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
const Hour = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']

const TextCoffee = styled.span`{
    position: absolute;
    right: 11.04%;
    width: 83px;
    top: 14px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.4px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
}`

const IconCoffee = styled.span`{
    position: absolute;
    left: 11.04%;
    top: 10px;
}`

const MyTable = styled.div`{
    width: 100%;
    height: 52px;
    min-width: 163px;
    border: 1px dashed #B7C2CE;
    box-sizing: border-box;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
}`

const TimeButton = styled.span`{
    position: absolute;
    right: 18px;
    top: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    text-align: right;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #2285EE;
}`

const CountPeople = styled.span`{
    position: absolute;
    left: 44px;
    top: 20px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #2285EE; 
}`

const IconPeople = styled.span`{
    position: absolute;
    top: 16px;
    left: 20px;
}`

const CustomGrid = styled(Grid)` && {
    min-height: 20px;
    position: relative;
}`

const TableButton = styled.div`{
    width: 100%;
    height: 52px;
    min-width: 163px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    background: #FFFFFF;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
}`

const TimeZone = styled.span`{
    position: absolute;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: right;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #B7C2CE;
}`

const Container = styled(Grid)` && {
    position: absolute;
    top: 16px;
    left: 16px;
    width: calc(100% - 16px);
    margin-right: 16px;
    max-height: ${document.documentElement.clientHeight - 161}px;
    text-align: left;
    overflow-y: auto;
}`