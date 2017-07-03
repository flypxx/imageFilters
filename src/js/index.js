let page = {
  init: function() {
    this.clearRect()
    this.eventInit()
    // this.drawSignature()
    this.drawQrcode()
  },
  clearRect() {
    let canvas = document.querySelector('#magicPicture')
    if (canvas.getContext) {
      let context = canvas.getContext('2d')
      context.fillStyle = '#fff'
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
  },
  drawQrcode() {
    let qrcode = document.querySelector('#qrcodeEle').children
    if (qrcode.length) {
      document.querySelector('#qrcodeEle').removeChild(qrcode[0])
    }
    $('#qrcodeEle').qrcode({
      render: 'canvas',
      text: '我本应该是一个正经的二维码',
      width: 60,
      height: 60,
      background: '#fff',
      foreground: '#000'
    })
    let canvas = document.querySelector('#magicPicture')
    if (canvas.getContext) {
      let context = canvas.getContext('2d')
      let qrcodeCvs = document.querySelector('#qrcodeEle').children[0]
      let ctx = qrcodeCvs.getContext('2d')
      let qrcodeData = ctx.getImageData(0, 0, 60, 60)
      context.putImageData(qrcodeData, 245, 310, 0, 0, 60, 60)
    }
  },
  // drawSignature: function() {
  //   const imageLen = 4
  //   let newImg = new Image()
  //   let num = parseInt(Math.random() * imageLen)
  //   newImg.src = `../img/name${num}.png`;
  //   let canvas = document.querySelector('#magicPicture')
  //   if (canvas.getContext) {
  //     let context = canvas.getContext('2d')
  //     newImg.onload = function() {
  //       context.drawImage(newImg, 15, 310, 60, 60)
  //     }
  //   }
  // },
  eventInit: function() {
    document.querySelector('#selectBtn').addEventListener('click', function() {
      document.querySelector('#imageFile').click()
    })
    document.querySelector('#imageFile').addEventListener('change', this.setImage)
    document.querySelector('#imageEle').addEventListener('load', this.drawImage)
    document.querySelector('#beautyWords').addEventListener('blur', this.setText)
    document.querySelector('#saveBtn').addEventListener('click', this.saveImage)
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
  saveImage: function() {
    let myCanvas = document.querySelector('#magicPicture')
    let imageData = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=foobar.png")
    /**
     * 在本地进行文件保存
     * @param  {String} data     要保存到本地的图片数据
     * @param  {String} filename 文件名
     */
    let saveFile = function(data, filename) {
      let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      save_link.href = data
      save_link.download = filename
      let event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      save_link.dispatchEvent(event)
    }
    saveFile(imageData, 'magic-picture.png')
  },
  setImage: function() {
    // 读取图片
    console.log(this.files)
    var file = this.files[0]
    var fileName = file.name
    var fileSize = file.size
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
      context.clearRect(5, 197, 310, 96)
      for (let i = 0, len = textArr.length; i < len; i++) {
        context.fillText(textArr[i], right, top + i * 24)
      }
    }
  }
}

page.init()
