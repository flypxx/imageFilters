let page = {
  init: function() {
    console.log(123)
    this.eventInit()
    this.drawSignature()
  },
  drawSignature: function() {
    let newImg = new Image()
    console.log('sign')
  },
  eventInit: function() {
    document.querySelector('#selectBtn').addEventListener('click', function() {
      document.querySelector('#imageFile').click()
    })
    document.querySelector('#imageFile').addEventListener('change', this.setImage)
    document.querySelector('#imageEle').addEventListener('load', this.drawImage)
    document.querySelector('#beautyWords').addEventListener('blur', this.setText)
  },
  drawImage: function() {
    let canvas = document.querySelector('#magicPicture')
    if (canvas.getContext) {
      const IMG_HEIGHT = 182
      const IMG_WIDTH = 310
      const cvsX = 5
      const cvsY = 5
      let context = canvas.getContext('2d')
      let imgEle = document.querySelector('#imageEle')
      let width = imgEle.width
      let height = imgEle.height
      let imgX = 0
      let imgY = 0
      let imgWidth = 0
      let imgHeight = 0
      let ratio = width / IMG_WIDTH
      let subHeight = parseInt(height / ratio)
      if (subHeight <= IMG_HEIGHT) {
        ratio = height / IMG_HEIGHT
        imgX = (width / ratio - IMG_WIDTH) / 2 * ratio
        imgWidth = IMG_WIDTH * ratio
        imgY = 0
        imgHeight = height
        context.clearRect(cvsX, cvsY, IMG_WIDTH, IMG_HEIGHT)
        context.drawImage(imgEle, imgX, imgY, imgWidth, imgHeight, cvsX, cvsY, IMG_WIDTH, IMG_HEIGHT)
      } else {
        imgX = 0
        imgWidth = width
        imgY = (subHeight - IMG_HEIGHT) / 2 * ratio
        imgHeight = IMG_HEIGHT * ratio
        context.clearRect(cvsX, cvsY, IMG_WIDTH, IMG_HEIGHT)
        context.drawImage(imgEle, imgX, imgY, imgWidth, imgHeight, cvsX, cvsY, IMG_WIDTH, IMG_HEIGHT)
      }
    }
  },
  setImage: function() {
    // 读取图片
    console.log(this.files)
    var file = this.files[0]
    var fileName = file.name;
    var fileSize = file.size;
    if (!/image\/\w+/.test(file.type)) {
      console.log('只允许选择图片')
      return
    } else if (fileSize > 1024 * 1024) {
      console.log('图片太大啦')
      return
    } else {
      var reader = new FileReader()
      reader.onload = function (e) {
        document.querySelector('#imageEle').src = this.result
      }
      reader.readAsDataURL(file)
    }
  },
  setText: function() {
    let text = this.value
    let canvas = document.querySelector('#magicPicture')
    if (canvas.getContext) {
      const right = 304
      const top = 209
      let context = canvas.getContext('2d')
      context.textAlign = 'right'
      context.font = 'normal normal normal 12px'
      let textArr = text.split('\n')
      textArr = textArr.length > 4 ? textArr.slice(0, 4) : textArr
      context.clearRect(5, 197, 315, 305)
      for (let i = 0, len = textArr.length; i < len; i++) {
        context.fillText(textArr[i], right, top + i * 24)
      }
    }
  }
}

page.init()
