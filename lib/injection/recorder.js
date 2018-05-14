void (function() {
  if (window.jcameras_player) {
    window.jcameras_player.end()
    window.jcameras_player.clear()
  }
  if (window.jcameras_recorder) {
    window.jcameras_recorder.start()
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
    /*<function name="Recorder">*/
    exports.events = [
        'mousemove',
        'mousedown',
        'mouseup',
        'contextmenu',
        'click',
        'dblclick',
        'mousewheel',
        'scroll',
    ];
    var Recorder = /** @class */ (function () {
        // #endregion
        function Recorder(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            /**
             * 记录开始时间
             */
            this.startAt = null;
            this.lastRecord = null;
            /**
             * 事件处理
             */
            this.handleEvent = function (e) {
                // #region 事件记录
                if (!_this.options.onRecord) {
                    return;
                }
                var type = e.type, target = e.target;
                var node = target;
                while (node &&
                    [Node.DOCUMENT_NODE, Node.ELEMENT_NODE].indexOf(node.nodeType) < 0) {
                    //text
                    node = node.parentNode;
                }
                var element = node;
                if (_this.options.onFilter && !_this.options.onFilter(element)) {
                    return;
                }
                var time = Date.now() - _this.startAt;
                var record;
                if (type === 'scroll') {
                    var ui = e;
                    record = {
                        type: type,
                        time: time,
                        target: element,
                        scrollLeft: document.documentElement.scrollLeft,
                        scrollTop: document.documentElement.scrollTop,
                    };
                }
                else {
                    var box = element.getBoundingClientRect();
                    var x = e.clientX - box.left;
                    var y = e.clientY - box.top;
                    record = {
                        type: type,
                        target: element,
                        position: {
                            x: x,
                            y: y,
                            tx: x / box.width,
                            ty: y / box.height,
                        },
                        time: time,
                        button: e.which ||
                            (e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0),
                    };
                }
                var emit = function (record) {
                    if (record && !record.fired) {
                        _this.options.onRecord(record);
                        record.fired = true;
                    }
                };
                if (_this.timer) {
                    clearTimeout(_this.timer);
                    _this.timer = null;
                }
                if ('mousewheel' === type) {
                    record.deltaX = e['deltaX'];
                    record.deltaY = e['deltaY'];
                }
                // 高频事件
                if (['mousemove', 'mousewheel'].indexOf(type) >= 0) {
                    if (_this.lastRecord) {
                        // 有历史记录
                        if (_this.lastRecord.target === record.target &&
                            _this.lastRecord.button === record.button &&
                            time - _this.lastRecord.time <= _this.options.thinning) {
                            _this.timer = setTimeout(function () {
                                _this.timer = null;
                                _this.lastRecord = null;
                                emit(record);
                            }, _this.options.thinning);
                            return;
                        }
                    }
                    else {
                        emit(record);
                        _this.lastRecord = record;
                        return;
                    }
                }
                emit(_this.lastRecord);
                _this.lastRecord = null;
                // #endregion
                emit(record);
            };
            this.options = __assign({ thinning: 200 }, options);
        }
        /**
         * 开始记录
         */
        Recorder.prototype.start = function () {
            var _this = this;
            if (this.startAt) {
                return;
            }
            this.startAt = Date.now();
            if (this.options.onStart) {
                this.options.onStart();
            }
            exports.events.forEach(function (type) {
                document.addEventListener(type, _this.handleEvent);
            });
        };
        /**
         * 结束记录
         */
        Recorder.prototype.end = function () {
            var _this = this;
            if (!this.startAt) {
                return;
            }
            this.startAt = null;
            if (this.options.onEnd) {
                this.options.onEnd();
            }
            exports.events.forEach(function (type) {
                document.removeEventListener(type, _this.handleEvent);
            });
        };
        return Recorder;
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
  var records = { cursor: 0, rows: [] }
  // try {
  //   records = JSON.parse(sessionStorage[document.location.href])
  // } catch (ex) {
  //   records = { cursor: 0, rows: [] }
  // }
  var ep = new ElementPath({})
  var recorder = new Recorder({
    onRecord: function(e) {
      if (e.type === 'scroll') {
        records.rows.push({
          type: e.type,
          path: ep.get(e.target),
          time: e.time,
          scrollLeft: e.scrollLeft,
          scrollTop: e.scrollTop,
        })
      } else {
        records.rows.push({
          type: e.type,
          path: ep.get(e.target),
          time: e.time,
          position: e.position,
          button: e.button,
        })
      }
      sessionStorage[document.location.href] = JSON.stringify(records)
    },
  })
  recorder.start()
  window.jcameras_recorder = recorder
})()
