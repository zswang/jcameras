void (function() {
  var player

  if (window.jcameras_player) {
    player = window.jcameras_player
    player.repaly()
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
  /*<jdists encoding="fndep" depend="Player" import="../../lib/index.js" />*/
  /*<jdists encoding="fndep" depend="ElementPath" import="../../node_modules/element-path/lib/index.js" />*/

  var lastRow
  var records
  var timer
  function replay() {
    clearTimeout(timer)
    lastRow = { time: 0 }
    try {
      records = JSON.parse(sessionStorage[document.location.href])
    } catch (ex) {
      records = { cursor: 0, rows: [] }
    }
    player.clear()
    next()
  }
  function next() {
    var row = records.rows[records.cursor++]
    if (!row) {
      return
    }
    timer = setTimeout(function() {
      timer = null
      player.push({
        type: row.type,
        target: ep.query(row.path),
        time: row.time,
        position: row.position,
        button: row.button,
      })
      next()
    }, Math.min(row.time - lastRow.time, 1000))
    lastRow = row
  }

  var ep = new ElementPath({})
  player = new Player({
    hiddenCurrent: false,
    maxRecords: 500,
  })
  player.start()
  player.repaly = replay

  window.jcameras_player = player
  replay()
})()
