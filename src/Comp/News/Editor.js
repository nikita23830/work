import React from 'react'
import styled from 'styled-components'
import { Card, TextField, Button, Grid, Chip, Modal } from '@material-ui/core'
import { PaletteOutlined } from '@material-ui/icons'
import FileReader from 'filereader'
import { SocketConsumer } from 'ContextSocket/index'
import { withSnackbar } from 'notistack';
import axios from "axios";

class EditorNews extends React.Component {

  state = {
    image: [],
    imgNotModifer: [],
    width: 100,
    height: 100,
    imgModalVis: false,
    imgModal: false,
    title: '',
    text: ''
  }

  onPublic = async () => {
    const { imgNotModifer, title, text } = this.state
    const { socket } = this.context
    const { enqueueSnackbar, onCloseEditor } = this.props
    if (title.replace(/\s/g, '') === '')
      enqueueSnackbar(`Невозможно опубилковать новость без названия`, {variant: 'warning',autoHideDuration: 3000})
    else if (text.replace(/\s/g, '') === '' && imgNotModifer.length === 0)
      enqueueSnackbar(`Невозможно опубилковать новость без текста или изображений`, {variant: 'warning',autoHideDuration: 3000})
    else {
      let dataForm = new FormData();
      dataForm.set("data", JSON.stringify({ title: title, text: text, colImg: imgNotModifer.length }));
      imgNotModifer.map((i, ind) => {
        dataForm.set(`img${ind}`, imgNotModifer[ind]);
      })

      await axios({
        method: "post",
        url: `http://3.136.56.168:4001/newNews`,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: dataForm
      })
    }
  }

  onChangeNews = (name) => (e) => this.setState({ [name]: e.target.value })

  onDownloadFile = (event) => {
    const { image, imgNotModifer } = this.state
    //if (image.length >= 10) { // alert }
    let newImage = [...image]
    let file = event.target.files[0]
    let reader = new FileReader();

    reader.onload = (e => {
      this.setState({ image: [...image, e], imgNotModifer: [...imgNotModifer, file] })
    })(file);
    reader.readAsDataURL(file);
  }

  onChangeImgModal = (i) => () => this.setState({ imgModalVis: !this.state.imgModalVis, imgModal: i })

  deleteImage = (i) => () => {
    let newImage = this.state.image.filter((j, ind) => ind !== i)
    this.setState({ image: newImage })
  }

  componentDidMount = async () => {
    const { enqueueSnackbar, onCloseEditor } = this.props
    const { socket } = this.context
    let h = document.documentElement.clientHeight - 110
    let w = document.documentElement.clientWidth - 40
    this.setState({ width: w, height: h })

    await socket.on('send_error', (data) => {
      if (data.name) enqueueSnackbar(`${data.severity}: ${data.routine}. Code: ${data.code}`, {
        variant: data.name,
        autoHideDuration: 6000,
        preventDuplicate: true
      })
      else enqueueSnackbar(data, {variant: 'error',autoHideDuration: 6000,preventDuplicate: true})
    })

    await socket.on('newNews', (data) => {
      console.log(data)
      if (data === 'ok') {
        enqueueSnackbar(`Новость успешно опубликована`, {variant: 'success',autoHideDuration: 3000, preventDuplicate: true})
        onCloseEditor()
      }
    })
  }

  render () {
    const { image, width, height, imgModalVis, imgModal, title, text } = this.state
    return (
      <NewsCard>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField label="Название новости" color='primary' fullWidth value={title} onChange={this.onChangeNews('title')}/>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Тект новости"
              multiline
              fullWidth
              value={text}
              onChange={this.onChangeNews('text')}
            />
          </Grid>

          {image.map((i, ind) => (
            <Grid item xs={12} sm={4}>
              <Chip
                icon={<PaletteOutlined />}
                label={<CustomLabel>{i.name}</CustomLabel>}
                id={ind}
                color='primary'
                onClick={this.onChangeImgModal(ind)}
                onDelete={this.deleteImage(ind)}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={4}>
            <Fileinput
              accept="image/x-png,image/gif,image/jpeg, image/jpg"
              id="contained-button-file"
              onChange={this.onDownloadFile}
              type="file"
              value=''
            />
            <label htmlFor="contained-button-file">
              <Button
                component="span"
                color='primary'
              >
                Добавить изображение
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  color='primary'
                  fullWidth
                  onClick={this.onPublic}
                >
                  Опубликовать
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Modal
          open={imgModalVis}
          onClose={this.onChangeImgModal(-1)}
        >
          {imgModalVis &&
            <CustomBigImg src={URL.createObjectURL(image[imgModal])} h={height} w={width} onClick={this.onChangeImgModal(-1)}/>
          }
        </Modal>

      </NewsCard>
    )
  }
}


const CustomBigImg = styled.img` {
  max-height: ${p=>p.h+110}px;
  max-width: ${p=>p.w+40}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`

const CustomLabel = styled.p` {
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`

const Littleimg = styled.img` {
  max-width: 50px;
  max-height: 50px;
}`

const Fileinput = styled.input` {
  display: none;
}`

const NewsCard = styled(Card)` && {
  width: 700px;
  max-height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  padding: 20px;
  overflow-y: scroll;
}`

EditorNews.contextType = SocketConsumer;
export default withSnackbar(EditorNews)

function randomString(i) {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};
