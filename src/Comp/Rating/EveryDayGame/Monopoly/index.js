import React, { Component } from 'react'
import styled, { keyframes } from "styled-components"
import { withSnackbar } from "notistack";
import { showSnackbar } from 'Comp/Utils'
import { Card, Button } from '@material-ui/core'
import CircleCard from 'Comp/Rating/EveryDayGame/Monopoly/CircleCard'
import MonopolyPole from './Pole'
import {MonopolyProvider} from 'Comp/Utils';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Monopoly extends Component {

	state={
		hRoot: 100,
		wRoot: 100,
		hCard: 100,
		wCard: 100,
		hPole: 100,
		wPole: 100,
		faceCard: false,
		slot: 1,
		randomGo: false,
		random: 0,
		randomArr: [],
    gold: false,
    black: false,
    openCard: false,
    textChallange: 'Тут описание задания',
    priceChallange: 150
	}

  onOpenCard = () => {
    setTimeout(() => {
      this.setState({ openCard: true })
    }, 1450)
  }

	componentDidMount() {
		let dt = {}
		dt.hRoot = document.documentElement.clientHeight - 70
		dt.wRoot = document.documentElement.clientWidth - 10
		dt.wCard = (dt.wRoot - 154) / 7
		dt.hCard = (dt.hRoot - 154) / 7
		dt.hPole = dt.hRoot - (dt.hCard * 2) - 40
		dt.wPole = dt.wRoot - (dt.wCard * 2) - 40
		this.setState({ ...dt })

		/*setTimeout(
	    function() {
	        this.setState({ faceCard: false });
	    }
	    .bind(this), 1000
		);*/
	}

  onChangeMainCard = () => {
    const { slot } = this.state
    const { enqueueSnackbar, closeSnackbar } = this.props
    this.setState({ faceCard: true, gold: slot === 1 || slot === 11 ? true : false, black: slot === 6 || slot === 16 ? true : false })
    if (slot === 1 || slot === 11) showSnackbar({ enqueueSnackbar, text: '+50 баллов за золотую карту', variant: 'success', closeSnackbar })
  }

	changePos = async () => {
		const { slot, random } = this.state
    const newSlot = slot + random
		for (let i = slot; i <= newSlot; i++) {
			await sleep(200)
			this.setState({ slot: i > 20 ? i - 20 : i })
		}
    this.onChangeMainCard()
	}

	randomInteger = () => {
	  let rand = 1 - 0.5 + Math.random() * (6 - 1 + 1);
	  return Math.round(rand);
	}

	onMove = async () => {
		this.setState({ randomGo: true, randomArr: [9,9] })
		setTimeout(() => {
			let number = [this.randomInteger(), this.randomInteger()]
			this.setState({ random: number[0] + number[1], randomArr: number, randomGo: false })
      this.changePos()
		}, 2000)
	}

	getCoordSlot = ({ wRoot, hRoot, wCard, hCard }) => {
		let dt = {}
		let wWithCard = (wRoot - 60 - (6 * wCard) - 20) / 4
		let hWithCard = (hRoot - 60 - (6 * hCard)) / 4
		const coords = [1,2,3,4,5,6,20,7,19,8,18,9,17,10,16,15,14,13,12,11]
		const pomeha = [0,3,6,9,12,15]
		let coord = {}
		let num = 1

		for (let y = 1; y <= 6; y++) {
			let xmax = y === 1 || y === 6 ? 6 : 2
			for (let x = 1; x <= xmax; x++) {
				if (y === 1 && x === 1) dt[num] = [(5 + (wCard / 2)) - 40, (5 + (hCard / 2)) - 53] // first pos

				if (y === 1 && x > 1) dt[num] = [(dt[num - 1][0] + wWithCard + wCard), dt[1][1]] // first line

				if (y > 1 && y < 6) {
					if (y === 2) dt[num] = [x === 1 ? dt[1][0] : dt[6][0], dt[1][1] + hWithCard + hCard] // second line
					if (y === 3) dt[num] = [x === 1 ? dt[7][0] : dt[8][0], dt[7][1] + hWithCard + hCard]
					if (y === 4) dt[num] = [x === 1 ? dt[9][0] : dt[10][0], dt[9][1] + hWithCard + hCard]
					if (y === 5) dt[num] = [x === 1 ? dt[11][0] : dt[12][0], dt[11][1] + hWithCard + hCard]
				}
				if (y === 6) dt[num] = [dt[x][0], dt[13][1] + hWithCard + hCard]
				num++
			}
		}
		coords.map((i, index) => { coord[i] = dt[index + 1] })
		return coord
	}


	render() {
		const { hRoot, wRoot, wCard, hCard, hPole, wPole, faceCard, slot, randomGo, randomArr, gold, black } = this.state
		const coord = this.getCoordSlot({ hRoot, wRoot, wCard, hCard })
		return (
      <MonopolyProvider value={{ ...this }}>
  			<Root h={hRoot} w={wRoot}>
  				<CircleCard hCard={hCard} wCard={wCard} getCoordSlot={this.getCoordSlot}/>

  				<MonopolyPole hPole={hPole} wPole={wPole} hCard={hCard} wCard={wCard} random={randomArr} randomGo={randomGo} onMove={this.onMove} gold={gold} black={black} faceCard={faceCard}/>

  				<FigureDiv coord={coord} slot={slot} ref={figure => this.figure = figure} >♙</FigureDiv>
  			</Root>
      </MonopolyProvider>
		)
	}
}

const Root = styled.div`{
	width: ${p=>p.w}px;
	height: ${p=>p.h}px;
	margin-left: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}`

const FigureDiv = styled.div`{
	position: absolute;
	top: ${p => p.coord[p.slot][1]}px
	left: ${p => p.coord[p.slot][0]}px
	font-size: 60pt;
	user-select: none;
}`

export default withSnackbar(Monopoly)
