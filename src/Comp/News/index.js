import React from 'react'
import styled from 'styled-components'
import { Card, Typography, Button, Modal, Grid, Fab } from '@material-ui/core'
import { Favorite, FavoriteBorder, Add, Close, DeleteOutlined } from '@material-ui/icons'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';
import EditorNews from 'Comp/News/Editor'

class News extends React.Component {

  state = {
    width: 100,
    height: 100,
    news: [],
    img: [],
    imgModalVis: false,
    imgModal: {news: -1, img: -1},
    openEditor: false,
    last_id: 0,
    aviableMore: true,
    likeNews: [],
    mylikeNews: []
  }

  onChangeImgModal = (n, i) => () => {
    this.setState({ imgModalVis: !this.state.imgModalVis, imgModal: { news: n, img: i } })
  }

  onCloseEditor = async () => {
    const { socket } = this.context
    await socket.emit('getNews', '')
    this.setState({ openEditor: false })
  }

  onDownloadNews = async () => {
    const { socket } = this.context
    const { last_id } = this.state
    await socket.emit('moreNews', last_id)
  }

  deleteNews = (i) => async () => {
    const { socket } = this.context
    socket.emit('deleteNews', i)
  }

  installLike = (i) => async () => {
    const { socket } = this.context
    socket.emit('installLike', i)
  }

  deleteLike = (i) => async () => {
    const { socket } = this.context
    socket.emit('deleteLike', i)
  }

  componentDidMount = async ()  => {
    const { socket } = this.context
    const { enqueueSnackbar, people_id } = this.props
    await socket.emit('getNews', '')
    let h = document.documentElement.clientHeight - 110
    let w = document.documentElement.clientWidth - 40
    this.setState({ width: w, height: h })

    await socket.on('getNews', ({ news, img }) => {
      let last_id = Math.min.apply(null, news.map(i => i.id))
      let resultImg = []
      img.map(i => {
        if (!resultImg[i.id_news]) resultImg[i.id_news] = []
        resultImg[i.id_news].push(i)
      })
      for (let i = 0; i < resultImg.length; i++) { if (!resultImg[i]) resultImg[i] = [] }
      this.setState({ news: news, img: resultImg, last_id: last_id })
    })

    await socket.on('moreNews', ({ news, img }) => {
      if (news.length === 0 ) { this.setState({ aviableMore: false }); return 0 }
      let last_id = Math.min.apply(null, news.map(i => i.id))
      let resultImg = [...this.state.img]
      img.map(i => {
        if (!resultImg[i.id_news]) resultImg[i.id_news] = []
        resultImg[i.id_news].push(i)
      })
      for (let i = 0; i < resultImg.length; i++) { if (!resultImg[i]) resultImg[i] = [] }
      this.setState({ news: [...this.state.news, ...news], img: resultImg, last_id: last_id })
    })

    await socket.on('deleteNews', (data) => {
      let newNews = [...this.state.news].filter(i=> i.id !== data)
      this.setState({ news: newNews})
    })

    await socket.on('send_error', (data) => {
      console.log(data)
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {
        variant: data.name,
        autoHideDuration: 6000,
        preventDuplicate: true
      })
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000,preventDuplicate: true})
    })

    await socket.on('getLike', (data) => {
      let likeNews = []
      let mylikeNews = []
      data.map(i=>{
        if (!likeNews[i.news_id]) likeNews[i.news_id] = 0
        if (i.people_id === people_id) mylikeNews[i.news_id] = true
        likeNews[i.news_id]++;
      })
      for (let i = 0; i < likeNews.length; i++) { if (!likeNews[i.news_id]) likeNews[i.news_id] = 0 }
      this.setState({ likeNews: likeNews, mylikeNews: mylikeNews })
    })
  }

  render () {
    const { width, height, news, img, imgModal, imgModalVis, openEditor, aviableMore, likeNews, mylikeNews } = this.state
    return (
      <Root w={width} h={height}>

        {!openEditor && <ListNews h={height} d={openEditor}>
          {news.map((i, ind) => (
            <WrapNews>
              <NewsBlock>
                <Typography variant="h5" component="h2">{i.title}</Typography>
                {i.text && <>
                  <hr width="100%" />
                  <CustomTypography variant="body2" component="p">{i.text}</CustomTypography>
                </>}
                <hr width="100%" />
                <NewsImage data={img} index={i.id} onClick={this.onChangeImgModal} />
                <BottomNews>
                  <DateText>{i.date}</DateText>
                  <LikeButton
                    variant="outlined"
                    color={mylikeNews[i.id] ? 'secondary' : "primary"}
                    endIcon={
                      mylikeNews[i.id]
                      ? <Favorite color="secondary" />
                      : <FavoriteBorder color="secondary" />
                    }
                    onClick={!mylikeNews[i.id] ? this.installLike(i.id) : this.deleteLike(i.id)}
                  >
                    {likeNews[i.id] ? likeNews[i.id] : 0}
                  </LikeButton>
                </BottomNews>
              </NewsBlock>
              <DeleteNews
                color='secondary'
                size='small'
                onClick={this.deleteNews(i.id)}
              >
                <DeleteOutlined />
              </DeleteNews>
              <Author>{i.surname} {i.name}</Author>
            </WrapNews>
          ))}
          {aviableMore && <PostLoadNews>
            <Button color='primary' fullWidth onClick={this.onDownloadNews}>Загрузить еще</Button>
          </PostLoadNews>}
        </ListNews>}

        {openEditor && <EditorNews onCloseEditor={this.onCloseEditor} />}

        <Modal
          open={imgModalVis}
          onClose={this.onChangeImgModal(-1, -1)}
        >
          {imgModal && imgModal.news !== -1 &&
            <CustomBigImg src={`http://localhost:4001/uploads/${img[imgModal.news][imgModal.img].filename}`} h={height} w={width} onClick={this.onChangeImgModal(-1, -1)}/>
          }
        </Modal>

        <ButAddNews color={openEditor ? 'secondary' : 'primary'} onClick={() => this.setState({ openEditor: !openEditor })}>
          {openEditor ? <Close /> : <Add />}
        </ButAddNews>

      </Root>
    )
  }
}

News.contextType = SocketConsumer;
export default withSnackbar(News)

const NewsImage = ({ data, index, onClick }) => {
  if (!data[index]) return '';
  else if (data[index].length === 0) return '';
  else {
    if (data[index].length === 1) {
      return <Customimg src={`http://localhost:4001/uploads/${data[index][0].filename}`} onClick={onClick(index, 0)} />
    } else {
      return (
        <>
          <Customimg src={`http://localhost:4001/uploads/${data[index][0].filename}`} onClick={onClick(index, 0)} />
          <Grid container spacing={2}>
            {data[index].map((i, ind) => (
              <Grid item xs={12} sm={3}>
                {data[index][ind] && ind > 0 &&
                  <CustomLittleImg src={`http://localhost:4001/uploads/${data[index][ind].filename}`} onClick={onClick(index, ind)} />
                }
              </Grid>
            ))}
          </Grid>
        </>
      )
    }
  }
}

const DeleteNews = styled(Fab)` && {
  position: absolute;
   top: 15px;
   right: 5px;
}`

const PostLoadNews = styled.div` {
  margin-top: 20px;
  margin-bottom: 20px;
}`

const ButAddNews = styled(Fab)` && {
  position: absolute;
  bottom: 10px;
  right: 10px;
}`

const CustomLittleImg = styled.img` {
  max-width: 150px;
  max-height: 150px;
  cursor: pointer;
}`

const CustomBigImg = styled.img` {
  max-height: ${p=>p.h+110}px;
  max-width: ${p=>p.w+40}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`

const Customimg = styled.img` {
  max-width: 500px;
  max-height: 500px;
  cursor: pointer;
}`

const DateText = styled(Typography)` && {
  height: 50px;
  color: #7D7C7C;
  font-size: 10pt;
  display: flex;
  align-items: flex-end;
}`

const CustomTypography = styled(Typography)` && {
  white-space: pre-line;
}`

const WrapNews = styled.div` {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
}`

const Author = styled.div` {
  position: absolute;
  top: 10px;
  right: -28px;
  padding: 5px;
  writing-mode: tb-rl;
  font-size: 10pt;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 120px;
}`

const LikeButton = styled(Button)` && {
  height: 50px;
  width: 150px;
}`

const BottomNews = styled.div` {
  height: 50px;
  display: flex;
  justify-content: space-between;
}`

const NewsBlock = styled(Card)` && {
  width: 710px;
  border: 1px solid #3f51b5;
  min-height: 137px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}`

const Root = styled.div` {
  position: relative;
  width: ${p=>p.w}px;
  height: ${p=>p.h}px;
  padding: 20px;
}`

const ListNews = styled.div` {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 850px;
  height: ${p=>p.h}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  overflow-y: scroll;
}`
