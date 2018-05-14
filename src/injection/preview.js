void (function() {
  /*<jdists import="../../lib/index.js" />*/
  var player = new jcameras.Player({
    hiddenCurrent: true,
    maxRecords: 500,
  })
  player.start()

  new jcameras.Recorder({
    onRecord: function(e) {
      player.push(e)
    },
  }).start()
})()
