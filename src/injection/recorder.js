void (function() {
  if (window.jcameras_player) {
    window.jcameras_player.clear()
  }
  if (window.jcameras_recorder) {
    return
  }
  var exports = {}
  var __assign =
    (this && this.__assign) ||
    Object.assign ||
    function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  /*<jdists encoding="fndep" depend="Recorder" import="../../lib/index.js" />*/
  /*<jdists encoding="fndep" depend="ElementPath" import="../../node_modules/element-path/lib/index.js" />*/
  var records = { cursor: 0, rows: [] }
  // try {
  //   records = JSON.parse(sessionStorage[document.location.href])
  // } catch (ex) {
  //   records = { cursor: 0, rows: [] }
  // }
  var ep = new ElementPath({})
  window.jcameras_recorder = new Recorder({
    onRecord: function(e) {
      records.rows.push({
        type: e.type,
        path: ep.get(e.target),
        time: e.time,
        position: e.position,
        button: e.button,
      })
      sessionStorage[document.location.href] = JSON.stringify(records)
    },
  }).start()
})()
