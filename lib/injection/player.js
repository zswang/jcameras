void (function() {
  var player
  if (window.jcameras_recorder) {
    window.jcameras_recorder.end()
  }
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
    /*<function name="Player">*/
    var Player = /** @class */ (function () {
        function Player(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this.records = [];
            this.handleResize = function () {
                var box = document.documentElement.getBoundingClientRect();
                _this.svg.style.height = String(Math.max(box.height, document.documentElement.scrollHeight));
            };
            this.options = __assign({ maxRecords: 100, hiddenCurrent: false }, options);
        }
        Player.prototype.start = function () {
            if (this.svg) {
                return;
            }
            var div = document.createElement('div');
            div.innerHTML = "<style>@-webkit-keyframes jcameras-player-dash{from{stroke-dashoffset:5}to{stroke-dashoffset:0}}@keyframes jcameras-player-dash{from{stroke-dashoffset:5}to{stroke-dashoffset:0}}.jcameras-player{z-index:2147483647;pointer-events:none;position:absolute;left:0;top:0;width:100%;box-sizing:border-box}.jcameras-player #mouse-double path,.jcameras-player #mouse-left path,.jcameras-player #mouse-middle path,.jcameras-player #mouse-right path{stroke:#000;fill:red}.jcameras-player #mouse path{fill:#fff}.jcameras-player #mouse path:nth-child(1){fill:#000}.jcameras-player .locus-back-path,.jcameras-player .locus-path{stroke:#000;fill:none}.jcameras-player .locus-back-path{stroke-dasharray:4 4;-webkit-animation:jcameras-player-dash .5s linear infinite;animation:jcameras-player-dash .5s linear infinite;stroke:#fff}.jcameras-player .drag-path{stroke:red;stroke-width:3;fill:none;stroke-dasharray:5 2}.jcameras-player .moving-points circle{stroke:none;fill:#000;opacity:.7}</style><svg class=\"jcameras-player\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <def>\n    <g id=\"mouse\" fill=\"#000000\" fill-rule=\"nonzero\">\n      <path d=\"M27.78125,0 C24.5932617,0 22,2.59375 22,5.78125 L22,16.2519531 C10.0558472,16.7773437 0.5,26.6556396 0.5,38.7265625 L0.5,57.5 C0.5,69.90625 10.5932617,80 23,80 C35.4067383,80 45.5,69.90625 45.5,57.5 L45.5,38.7265625 C45.5,26.6556396 35.9441528,16.7773437 24,16.2519531 L24,5.78125 C24,3.6962891 25.6962891,2 27.78125,2 C29.8662109,2 31.5625,3.6962891 31.5625,5.78125 L31.5625,8.9345703 C31.5625,12.1220703 34.1557617,14.7158203 37.34375,14.7158203 C40.5317383,14.7158203 43.125,12.1220703 43.125,8.9345703 L43.125,1.3164062 C43.125,0.7636718 42.6772461,0.3164062 42.125,0.3164062 C41.5727539,0.3164062 41.125,0.7636718 41.125,1.3164062 L41.125,8.9345703 C41.125,11.0195312 39.4287109,12.7158203 37.34375,12.7158203 C35.2587891,12.7158203 33.5625,11.0195312 33.5625,8.9345703 L33.5625,5.78125 C33.5625,2.59375 30.9692383,0 27.78125,0 Z M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z M23,78 C11.6962891,78 2.5,68.8037109 2.5,57.5 L2.5,41 L17.5233765,41 C17.7588501,43.8169556 20.1228638,46.0390625 23,46.0390625 C25.8771362,46.0390625 28.2411499,43.8169556 28.4766235,41 L43.5,41 L43.5,57.5 C43.5,68.8037109 34.3037109,78 23,78 Z M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z\" />\n      <path d=\"M23,78 C11.6962891,78 2.5,68.8037109 2.5,57.5 L2.5,41 L17.5233765,41 C17.7588501,43.8169556 20.1228638,46.0390625 23,46.0390625 C25.8771362,46.0390625 28.2411499,43.8169556 28.4766235,41 L43.5,41 L43.5,57.5 C43.5,68.8037109 34.3037109,78 23,78 Z\"/>\n      <path d=\"M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z\" />\n      <path d=\"M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z\" />\n      <path d=\"M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z\" />\n    </g>\n    <g id=\"mouse-right\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\"></use>\n      <path d=\"M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z\" />\n    </g>\n    <g id=\"mouse-left\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\"></use>\n      <path d=\"M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z\" />\n    </g>\n    <g id=\"mouse-double\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\"></use>\n      <path d=\"M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z\" />\n      <g transform=\"translate(-35,-10)\" stroke=\"red\">\n        <rect x=\"51.157\" y=\"4.625\" width=\"1.5\" height=\"7.908\" />\n        <rect x=\"51.157\" y=\"19.145\" width=\"1.5\" height=\"7.908\" />\n        <rect x=\"40.693\" y=\"15.089\" width=\"7.908\" height=\"1.5\" />\n        <rect x=\"55.213\" y=\"15.089\" width=\"7.908\" height=\"1.5\" />\n        <rect x=\"56.291\" y=\"8.729\" transform=\"matrix(0.7071 0.7071 -0.7071 0.7071 24.2772 -37.1987)\" width=\"1.5\" height=\"3.953\" />\n        <rect x=\"46.023\" y=\"18.995\" transform=\"matrix(-0.7071 -0.7071 0.7071 -0.7071 65.0172 68.8759)\" width=\"1.5\" height=\"3.955\" />\n        <rect x=\"46.024\" y=\"8.729\" transform=\"matrix(-0.7071 0.7071 -0.7071 -0.7071 87.418 -14.7974)\" width=\"1.5\" height=\"3.955\" />\n        <rect x=\"56.291\" y=\"18.996\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 1.8772 46.4769)\" width=\"1.5\" height=\"3.954\" />\n        <rect x=\"23.945\" y=\"4.625\" width=\"1.5\" height=\"7.908\" />\n        <rect x=\"23.945\" y=\"19.145\" width=\"1.5\" height=\"7.908\" />\n        <rect x=\"13.481\" y=\"15.089\" width=\"7.908\" height=\"1.5\" />\n        <rect x=\"28\" y=\"15.089\" width=\"7.909\" height=\"1.5\" />\n        <rect x=\"29.08\" y=\"8.73\" transform=\"matrix(0.7071 0.7071 -0.7071 0.7071 16.3073 -17.9569)\" width=\"1.5\" height=\"3.953\" />\n        <rect x=\"17.583\" y=\"20.221\" transform=\"matrix(0.7073 -0.7069 0.7069 0.7073 -9.0996 19.9658)\" width=\"3.955\" height=\"1.5\" />\n        <rect x=\"18.812\" y=\"8.727\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -1.8397 16.968)\" width=\"1.5\" height=\"3.955\" />\n        <rect x=\"29.078\" y=\"18.997\" transform=\"matrix(-0.7071 0.7071 -0.7071 -0.7071 65.7501 14.7128)\" width=\"1.5\" height=\"3.954\" />\n      </g>\n    </g>\n    <g id=\"mouse-middle\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\" />\n      <path d=\"M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z\" />\n    </g>\n    <g id=\"mouse-pointer\" transform=\"scale(0.2)\">\n      <path d=\"M89,43L12.3,10.1c-1.4-0.6-2.7,0.8-2.2,2.2L43,89c0.6,1.4,2.6,1.3,3.1-0.1l7.7-23l19.6,19.6c2.5,2.5,6.1,2.9,8.1,0.9  l4.8-4.8c2-2,1.6-5.6-0.9-8.1L65.8,53.8l23-7.7C90.3,45.6,90.4,43.6,89,43z\" />\n    </g>\n  </def>\n  <path class=\"locus-path\" />\n  <path class=\"locus-back-path\" />\n  <g class=\"moving-points\" />\n  <g class=\"click-points\" />\n  <path class=\"drag-path\" />\n  <g class=\"current\" transform=\"translate(-1000,-1000)\"><use xlink:href=\"#mouse-pointer\" /></g>\n</svg>";
            this.style = div.querySelector('style');
            document.body.appendChild(this.style);
            this.svg = div.querySelector('svg');
            document.body.appendChild(this.svg);
            this.locusPath = this.svg.querySelector('.locus-path');
            this.locusBackPath = this.svg.querySelector('.locus-back-path');
            this.movingPoints = this.svg.querySelector('.moving-points');
            this.clickPoints = this.svg.querySelector('.click-points');
            this.dragPath = this.svg.querySelector('.drag-path');
            this.current = this.svg.querySelector('.current');
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        };
        Player.prototype.end = function () {
            if (!this.svg) {
                return;
            }
            window.removeEventListener('resize', this.handleResize);
            this.style.parentNode.removeChild(this.style);
            this.svg.parentNode.removeChild(this.svg);
            this.svg = this.style = null;
        };
        Player.prototype.render = function () {
            if (!this.svg) {
                return;
            }
            var box = document.documentElement.getBoundingClientRect();
            var locus = [];
            var click = [];
            var moving = [];
            var drag = [];
            var point;
            var downPoint;
            var upPoint;
            this.records.forEach(function (item, index) {
                var targetBox = item.target.getBoundingClientRect();
                if (!targetBox.width || !targetBox.height) {
                    return;
                }
                point = {
                    x: item.position.x - box.left + targetBox.left,
                    y: item.position.y - box.top + targetBox.top,
                };
                if (point.x < 0 ||
                    point.y < 0 ||
                    point.x > box.width ||
                    point.y > Math.max(box.height, document.documentElement.scrollHeight)) {
                    return;
                }
                locus.push(point.x + "," + point.y);
                switch (item.type) {
                    case 'dblclick':
                        click.push("<use xlink:href=\"#mouse-double\" transform=\"translate(" + point.x + "," + point.y + ")\" />");
                        break;
                    case 'mousedown':
                        downPoint = point;
                        upPoint = null;
                        break;
                    case 'mouseup':
                        upPoint = point;
                        if (downPoint) {
                            drag.push("M " + downPoint.x + "," + downPoint.y + " L " + upPoint.x + "," + upPoint.y);
                            downPoint = null;
                        }
                        break;
                    case 'mousemove':
                        moving.push("<circle r=\"1.5\" cx=\"" + point.x + "\" cy=\"" + point.y + "\" />");
                        if (item.button) {
                            if (!downPoint) {
                                downPoint = point;
                            }
                            upPoint = point;
                        }
                        else {
                            if (downPoint && upPoint) {
                                drag.push("M " + downPoint.x + "," + downPoint.y + " L " + upPoint.x + "," + upPoint.y);
                                downPoint = null;
                            }
                        }
                        break;
                    case 'click':
                        click.push("<use xlink:href=\"#mouse-left\" transform=\"translate(" + point.x + "," + point.y + ")\" />");
                        break;
                    case 'mousewheel':
                        click.push("<use xlink:href=\"#mouse-middle\" transform=\"translate(" + point.x + "," + point.y + ")\" />");
                        break;
                    case 'contextmenu':
                        click.push("<use xlink:href=\"#mouse-right\" transform=\"translate(" + point.x + "," + point.y + ")\" />");
                        break;
                }
            });
            if (downPoint && upPoint) {
                drag.push("M " + downPoint.x + "," + downPoint.y + " L " + upPoint.x + "," + upPoint.y);
            }
            this.locusPath.setAttribute('d', locus.length ? "M" + locus.join(' ') : '');
            this.locusBackPath.setAttribute('d', locus.length ? "M" + locus.join(' ') : '');
            this.dragPath.setAttribute('d', drag.join(' '));
            this.movingPoints.innerHTML = moving.join('');
            this.clickPoints.innerHTML = click.join('');
            if (point && !this.options.hiddenCurrent) {
                this.current.setAttribute('transform', "translate(" + point.x + "," + point.y + ")");
            }
        };
        Player.prototype.push = function (record) {
            if (record.type === 'scroll' && this.options.fireEvent) {
                document.documentElement.scrollTop = record.scrollTop;
                document.documentElement.scrollLeft = record.scrollLeft;
                return;
            }
            if (!record.target) {
                return;
            }
            this.records.push(record);
            while (this.records.length > this.options.maxRecords) {
                this.records.shift();
            }
            this.render();
            if (record.type === 'click' && this.options.fireEvent) {
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                record.target.dispatchEvent(clickEvent);
            }
        };
        Player.prototype.clear = function () {
            this.records = [];
            this.current.setAttribute('transform', "translate(-1000,-1000)");
            this.render();
        };
        return Player;
    }()); /*</function>*/
    /*<function name="ElementPath">*/
    var ElementPath = /** @class */ (function () {
        function ElementPath(options) {
            this.options = __assign({ tags: {} }, options);
            if (typeof this.options.tags === 'string') {
                this.options.tags = this.options.tags
                    .trim()
                    .split(/[\s,]+/)
                    .reduce(function (tags, tagName, index) {
                    var char = String.fromCharCode(65 /* A */ + index);
                    tags[tagName] = char;
                    tags[char] = tagName;
                    return tags;
                }, {});
            }
        }
        /**
         * 获取元素的路径
         * @param node 元素
         * @example get():base
           ```html
           <div>
             <ul>
              <li class="li1">1</li>
              <li class="li2">2</li>
              <li class="li3">3</li>
             </ul>
           </div>
           ```
           ```js
           let ep = new ElementPath()
           let element = document.querySelector('.li1')
           console.log(ep.get(element))
           ```
         */
        ElementPath.prototype.get = function (node) {
            if (!node)
                return '';
            if (node === document.documentElement)
                return 'html';
            if (node === document.body)
                return 'body';
            var result = '';
            if (node.parentNode && node.parentNode !== document.body) {
                result = this.get(node.parentNode);
            }
            var count = 1;
            if (node.previousSibling) {
                var sibling = node.previousSibling;
                do {
                    if (sibling.nodeType === 1 && sibling.nodeName == node.nodeName) {
                        count++;
                    }
                    sibling = sibling.previousSibling;
                } while (sibling);
            }
            if (node.nodeType === 1) {
                var nodeName = node.nodeName.toLowerCase();
                var short = this.options.tags[nodeName];
                result += "" + (short ? short : (result ? '-' : '') + nodeName) + (count === 1 ? '' : count);
            }
            return result;
        };
        ElementPath.prototype.query = function (path) {
            var _this = this;
            var result = document.body;
            if (!path || path === 'body')
                return result;
            if (path === 'html')
                return document.documentElement;
            path.replace(/([A-Z]|h[1-6]|[a-z]+)(\d*)/g, function (all, tag, count) {
                if (!result)
                    return '';
                count = count || 1;
                var nodes = result.getElementsByTagName(/[A-Z]/.test(tag) ? _this.options.tags[tag] : tag);
                for (var i = 0, l = nodes.length; i < l; i++) {
                    var node = nodes[i];
                    if (node.parentNode === result && !--count) {
                        result = node;
                        break;
                    }
                }
                if (count)
                    result = null;
            });
            return result;
        };
        return ElementPath;
    }()); /*</function>*/
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
      if (row.type === 'scroll') {
        player.push({
          type: row.type,
          target: ep.query(row.path),
          time: row.time,
          scrollLeft: row.scrollLeft,
          scrollTop: row.scrollTop,
        })
      } else {
        player.push({
          type: row.type,
          target: ep.query(row.path),
          time: row.time,
          position: row.position,
          button: row.button,
          path: row.path,
        })
      }
      next()
    }, Math.min(row.time - lastRow.time, 1000))
    lastRow = row
  }
  var ep = new ElementPath({})
  player = new Player({
    hiddenCurrent: false,
    maxRecords: 500,
    fireEvent: true,
  })
  player.start()
  player.repaly = replay
  window.jcameras_player = player
  replay()
})()
