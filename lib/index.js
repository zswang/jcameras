var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (root, factory) {
    /* istanbul ignore next */
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    } else { factory(null, root["jcameras"] = {}); }
})(this, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Player = /** @class */ (function () {
        function Player(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this.records = [];
            this.handleResize = function () {
                var box = document.documentElement.getBoundingClientRect();
                _this.svg.style.height = String(box.height);
            };
            this.options = __assign({ maxRecords: 100, hiddenCurrent: false }, options);
        }
        Player.prototype.start = function () {
            if (this.svg) {
                return;
            }
            var div = document.createElement('div');
            div.innerHTML = "<style>@-webkit-keyframes jcameras-player-dash{from{stroke-dashoffset:5}to{stroke-dashoffset:0}}@keyframes jcameras-player-dash{from{stroke-dashoffset:5}to{stroke-dashoffset:0}}.jcameras-player{pointer-events:none;position:absolute;left:0;top:0;width:100%;box-sizing:border-box}.jcameras-player #mouse-left path,.jcameras-player #mouse-middle path,.jcameras-player #mouse-right path{stroke:#000;fill:red}.jcameras-player #mouse path{fill:#fff}.jcameras-player #mouse path:nth-child(1){fill:#000}.jcameras-player .locus-path{stroke:#000;fill:none;stroke-dasharray:3 2;-webkit-animation:jcameras-player-dash .5s linear infinite;animation:jcameras-player-dash .5s linear infinite}.jcameras-player .drag-path{stroke:#4682b4;stroke-width:3;fill:none;stroke-dasharray:5 2}.jcameras-player .moving-points circle{stroke:none;fill:#000;opacity:.7}</style><svg class=\"jcameras-player\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <def>\n    <g id=\"mouse\" fill=\"#000000\" fill-rule=\"nonzero\">\n      <path d=\"M27.78125,0 C24.5932617,0 22,2.59375 22,5.78125 L22,16.2519531 C10.0558472,16.7773437 0.5,26.6556396 0.5,38.7265625 L0.5,57.5 C0.5,69.90625 10.5932617,80 23,80 C35.4067383,80 45.5,69.90625 45.5,57.5 L45.5,38.7265625 C45.5,26.6556396 35.9441528,16.7773437 24,16.2519531 L24,5.78125 C24,3.6962891 25.6962891,2 27.78125,2 C29.8662109,2 31.5625,3.6962891 31.5625,5.78125 L31.5625,8.9345703 C31.5625,12.1220703 34.1557617,14.7158203 37.34375,14.7158203 C40.5317383,14.7158203 43.125,12.1220703 43.125,8.9345703 L43.125,1.3164062 C43.125,0.7636718 42.6772461,0.3164062 42.125,0.3164062 C41.5727539,0.3164062 41.125,0.7636718 41.125,1.3164062 L41.125,8.9345703 C41.125,11.0195312 39.4287109,12.7158203 37.34375,12.7158203 C35.2587891,12.7158203 33.5625,11.0195312 33.5625,8.9345703 L33.5625,5.78125 C33.5625,2.59375 30.9692383,0 27.78125,0 Z M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z M23,78 C11.6962891,78 2.5,68.8037109 2.5,57.5 L2.5,41 L17.5233765,41 C17.7588501,43.8169556 20.1228638,46.0390625 23,46.0390625 C25.8771362,46.0390625 28.2411499,43.8169556 28.4766235,41 L43.5,41 L43.5,57.5 C43.5,68.8037109 34.3037109,78 23,78 Z M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z\" />\n      <path d=\"M23,78 C11.6962891,78 2.5,68.8037109 2.5,57.5 L2.5,41 L17.5233765,41 C17.7588501,43.8169556 20.1228638,46.0390625 23,46.0390625 C25.8771362,46.0390625 28.2411499,43.8169556 28.4766235,41 L43.5,41 L43.5,57.5 C43.5,68.8037109 34.3037109,78 23,78 Z\"/>\n      <path d=\"M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z\" />\n      <path d=\"M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z\" />\n      <path d=\"M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z\" />\n    </g>\n    <g id=\"mouse-right\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\"></use>\n      <path d=\"M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z\" />\n    </g>\n    <g id=\"mouse-left\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\"></use>\n      <path d=\"M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z\" />\n    </g>\n    <g id=\"mouse-middle\" transform=\"scale(0.3) translate(-25,-30)\">\n      <use xlink:href=\"#mouse\" />\n      <path d=\"M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z\" />\n    </g>\n    <g id=\"mouse-pointer\" transform=\"scale(0.2)\">\n      <path d=\"M89,43L12.3,10.1c-1.4-0.6-2.7,0.8-2.2,2.2L43,89c0.6,1.4,2.6,1.3,3.1-0.1l7.7-23l19.6,19.6c2.5,2.5,6.1,2.9,8.1,0.9  l4.8-4.8c2-2,1.6-5.6-0.9-8.1L65.8,53.8l23-7.7C90.3,45.6,90.4,43.6,89,43z\" />\n    </g>\n  </def>\n  <path class=\"locus-path\" />\n  <g class=\"moving-points\" />\n  <g class=\"click-points\" />\n  <g class=\"menu-points\" />\n  <g class=\"wheel-points\" />\n  <path class=\"drag-path\" />\n  <g class=\"current\" transform=\"translate(-1000,-1000)\"><use xlink:href=\"#mouse-pointer\" /></g>\n</svg>";
            this.style = div.querySelector('style');
            document.body.appendChild(this.style);
            this.svg = div.querySelector('svg');
            document.body.appendChild(this.svg);
            this.locusPath = this.svg.querySelector('.locus-path');
            this.movingPoints = this.svg.querySelector('.moving-points');
            this.clickPoints = this.svg.querySelector('.click-points');
            this.menuPoints = this.svg.querySelector('.menu-points');
            this.wheelPoints = this.svg.querySelector('.wheel-points');
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
                point = {
                    x: item.position.x - box.left + targetBox.left,
                    y: item.position.y - box.top + targetBox.top,
                };
                locus.push(point.x + "," + point.y);
                switch (item.type) {
                    case 'mousemove':
                        moving.push("<circle r=\"1.5\" cx=\"" + point.x + "\" cy=\"" + point.y + "\" />");
                        if (item.button) {
                            if (!downPoint) {
                                downPoint = point;
                            }
                            upPoint = point;
                        }
                        else {
                            if (downPoint) {
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
            if (downPoint) {
                drag.push("M " + downPoint.x + "," + downPoint.y + " L " + upPoint.x + "," + upPoint.y);
            }
            this.locusPath.setAttribute('d', "M" + locus.join(' '));
            this.dragPath.setAttribute('d', drag.join(' '));
            this.movingPoints.innerHTML = moving.join('');
            this.clickPoints.innerHTML = click.join('');
            if (point && !this.options.hiddenCurrent) {
                this.current.setAttribute('transform', "translate(" + point.x + "," + point.y + ")");
            }
        };
        Player.prototype.push = function (record) {
            this.records.push(record);
            while (this.records.length > this.options.maxRecords) {
                this.records.shift();
            }
            this.render();
        };
        return Player;
    }()); /*</function>*/
    exports.Player = Player;
    /*<function name="Recorder">*/
    exports.events = {
        mousemove: 'm',
        mousedown: 'd',
        mouseup: 'u',
        contextmenu: 'r',
        click: 'c',
        dblclick: 'l',
        mousewheel: 'w',
    };
    var Recorder = /** @class */ (function () {
        function Recorder(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this.startAt = null;
            this.lastRecord = null;
            this.handleEvent = function (e) {
                if (!_this.options.onRecord) {
                    return;
                }
                var type = e.type, target = e.target;
                var node = target;
                while (node && node.nodeType !== Node.ELEMENT_NODE) {
                    //text
                    node = node.parentNode;
                }
                var element = node;
                if (_this.options.onFilter && !_this.options.onFilter(element)) {
                    return;
                }
                var time = Date.now() - _this.startAt;
                var box = element.getBoundingClientRect();
                var x = e.clientX - box.left;
                var y = e.clientY - box.top;
                var record = {
                    type: type,
                    target: element,
                    position: {
                        x: x,
                        y: y,
                        tx: x / box.width,
                        ty: y / box.height,
                    },
                    time: time,
                    button: e.which || (e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0),
                };
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
                    record.detail = e.detail;
                }
                // 高频事件
                if (['mousemove', 'mousewheel'].indexOf(type) >= 0) {
                    if (_this.lastRecord) {
                        // 有历史记录
                        if (_this.lastRecord.target === target &&
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
                emit(record);
            };
            this.options = __assign({ thinning: 200 }, options);
        }
        Recorder.prototype.start = function () {
            var _this = this;
            this.startAt = Date.now();
            if (this.options.onStart) {
                this.options.onStart();
            }
            Object.keys(exports.events).forEach(function (type) {
                document.addEventListener(type, _this.handleEvent);
            });
        };
        Recorder.prototype.end = function () {
            var _this = this;
            this.startAt = null;
            if (this.options.onEnd) {
                this.options.onEnd();
            }
            Object.keys(exports.events).forEach(function (type) {
                document.removeEventListener(type, _this.handleEvent);
            });
        };
        return Recorder;
    }()); /*</function>*/
    exports.Recorder = Recorder;
});
