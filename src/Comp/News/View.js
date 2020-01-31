import React from 'react'
import { Modal, Card, Grid, Typography, IconButton } from '@material-ui/core'
import { FavoriteBorder } from '@material-ui/icons'
import styled from 'styled-components'

export const ViewNews = ({ viewNews, onViewNews, URL_SERVER }) => (
  <Modal
    open={viewNews}
    onClose={onViewNews}
  >
    <CardViewNews>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={7}>
          <Styledimg src={`${URL_SERVER}/newsview`} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant='h6' component='h2'>Коллеги, сегодня наш дружный коллектив покидает Елена Стржемеская!</Typography>
          <Typography variant="body2" component="p">За три года работы Елена смогла подняться по карьерной лестнице с обычного специалиста до руководителя группы! Лена проявила себя как добрый и отзывчивый человек, с которым всегда было приятно работать. Удивительно, как эта, казалось бы, хрупкая девушка долгое время одна формировала работу группы, и у неё это отлично получалось! Лена могла подбодрить любого сотрудника и никому не отказывала в помощи. Но теперь Лена идет дальше и её путь только вперёд.
Давайте все вместе пожелаем ей целеустремленности и удачи на новом месте!!!</Typography>
        </Grid>
        <CustomBottomGrid item xs={12} sm={12}>
          <p>30.01.2020</p>
          <p>Тество Тест</p>
          <p>999
            <IconButton color='secondary'><FavoriteBorder /></IconButton>
          </p>
        </CustomBottomGrid>
      </Grid>
    </CardViewNews>
  </Modal>
)

const CustomBottomGrid = styled(Grid)` && {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}`

const CardViewNews = styled(Card)` && {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 480px;
  overflow-y: auto;
  overflow-x: none;
  padding: 15px;
}`

const Styledimg = styled.img` {
  max-width: 400px;
  max-height: 400px;
}`
