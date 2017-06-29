let page = {
  init: function() {
    console.log(123)
    this.eventInit()
  },
  eventInit: function() {
    document.querySelector('#selectBtn').addEventListener('click', function() {
      document.querySelector('#imageFile').click()
    })
  }
}

page.init()
