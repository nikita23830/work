import React from 'react'
import styled from 'styled-components'
import ReactMinimalPieChart from 'react-minimal-pie-chart'

export const Donut = ({ dataDiag, diag }) => {
    return (
        <>
            <StyleReactMinimalPieChart
                animate={true}
                animationDuration={1500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={dataDiag}
                label={false}
                labelPosition={10}
                lengthAngle={360}
                lineWidth={5}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={46}
                ratio={1}
                rounded={false}
                startAngle={0}
                width='165px'
                height='165px'
            />
            {!diag && <TextInDonut color={dataDiag[0].color}>
                Наведите курсор на карточку показателя
            </TextInDonut>}
            {diag && <>
                <TitleDonut>Среднее значение</TitleDonut>
                <AttrDonut>{diag.text}</AttrDonut>
                <ProcDonut>{diag.proc}%</ProcDonut>
            </>}
        </>
    )
}

const ProcDonut = styled.span`{
    position: absolute;
    width: 51px;
    height: 19px;
    left: 58px;
    bottom: 40px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
}`

const AttrDonut = styled.span`{
    position: absolute;
    width: 113px;
    height: 25px;
    left: 28px;
    top: 74px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #072D57;
}`

const TitleDonut = styled.span`{
    position: absolute;
    top: 53px;
    left: 29px;
    font-family: Manrope3;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
}`

const TextInDonut = styled.span`{
    position: absolute;
    top: 31px;
    left: 27px;
    width: 113px;
    color: #99A9BA;
}`

const StyleReactMinimalPieChart = styled(ReactMinimalPieChart)` && {
	width: 165px;
	height: 165px;
	position: absolute;
	top: 0px;
    left: 0px;
    transform: scale(1, 1) rotate(270deg);    
}`