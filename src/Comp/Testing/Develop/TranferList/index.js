import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { DevelopConsumer } from 'Comp/Testing/Develop/Context'
import { StyleTransferList, ItemTransferList, ButtonTransferList, TransferButton } from 'Comp/Testing/Develop/Style'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

export const TranferList = () => (
	<DevelopConsumer>
		{context => {
			if (!context.state) return (<>Load...</>)
			else {
				return (
					<StyleTransferList>
						<ItemTransferList>
							<FormControlLabel
								control={
									<Checkbox color='primary' />
								}
								color='primary'
								label="Группа Тест 1"
							/>
							<FormControlLabel
								control={
									<Checkbox color='primary' />
								}
								color='primary'
								label="Группа Тест 2"
							/>
						</ItemTransferList>
						
						<ButtonTransferList>
							<TransferButton variant='outlined'>
								<NavigateBefore />
							</TransferButton>
							<TransferButton variant='outlined'>
								<NavigateNext />
							</TransferButton>
						</ButtonTransferList>
						
						<ItemTransferList>
							<FormControlLabel
								control={
									<Checkbox color='primary' />
								}
								color='primary'
								label="Группа Тест 3"
							/>
						</ItemTransferList>
					</StyleTransferList>
				)
			}
		}}
	</DevelopConsumer>
)