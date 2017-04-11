var host = 'http://tsi.lianjia.com:10100'

module.exports = {
  proxy: true,
  api: {
    '.*': {
      target: host,
      ajax:true,
      // bypass: function (req, res) {
      //   req.path = "/desktop" + req.path
      // },
      secure: false
    }
  }
}
