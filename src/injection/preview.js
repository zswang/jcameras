void (function() {
  /*<jdists import="../../lib/index.js" />*/
  if (window.jcameras_preview) {
    window.jcameras_preview.replay()
    return
  }

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

  window.jcameras_preview = {
    replay: function () {
      player.clear()
    }
  }
})()
