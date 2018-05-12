/*<function name="Recorder">*/
export const events = [
  'mousemove',
  'mousedown',
  'mouseup',

  'contextmenu',
  'click',
  'dblclick',

  'mousewheel',
  'scroll',
]

export interface IRecordEvent {
  /**
   * 事件类型
   */
  type:
    | 'mousemove'
    | 'mousedown'
    | 'mouseup'
    | 'contextmenu'
    | 'click'
    | 'dblclick'
    | 'mousewheel'
    | string
  /**
   * 元素坐标
   */
  target?: HTMLElement
  scrollLeft?: number
  scrollTop?: number
  /**
   * 坐标
   */
  position?: {
    /**
     * 鼠标在元素内坐标
     */
    x: number
    y: number
    /**
     * 鼠标在元素内比率坐标
     */
    tx: number
    ty: number
  }
  /**
   * 事件发生的时间
   */
  time: number
  /**
   * 滚动尺度
   */
  deltaX?: number
  deltaY?: number
  /**
   * 按钮
   */
  button?: number
  /**
   * 事件是否已经派发
   */
  fired?: boolean
}

export interface IRecorderOptions {
  thinning?: number
  onRecord?: {
    (event: IRecordEvent)
  }
  onStart?: { () }
  onEnd?: { () }
  onFilter?: { (element: HTMLElement): boolean }
}

class Recorder {
  // #region 成员
  options: IRecorderOptions

  /**
   * 记录开始时间
   */
  startAt: number = null

  lastRecord: IRecordEvent = null

  timer: any
  // #endregion

  constructor(options: IRecorderOptions = {}) {
    this.options = {
      thinning: 200,
      ...options,
    }
  }

  /**
   * 事件处理
   */
  handleEvent = (e: MouseEvent) => {
    // #region 事件记录
    if (!this.options.onRecord) {
      return
    }
    const { type, target } = e
    let node = target as Node
    while (
      node &&
      [Node.DOCUMENT_NODE, Node.ELEMENT_NODE].indexOf(node.nodeType) < 0
    ) {
      //text
      node = node.parentNode
    }
    let element = node as HTMLElement
    if (this.options.onFilter && !this.options.onFilter(element)) {
      return
    }

    let time = Date.now() - this.startAt
    let record: IRecordEvent
    if (type === 'scroll') {
      let ui = e as UIEvent
      record = {
        type: type,
        time: time,
        target: element,
        scrollLeft: document.documentElement.scrollLeft,
        scrollTop: document.documentElement.scrollTop,
      }
    } else {
      let box = element.getBoundingClientRect()
      let x = e.clientX - box.left
      let y = e.clientY - box.top
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
        button:
          e.which ||
          (e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0),
      }
    }

    const emit = record => {
      if (record && !record.fired) {
        this.options.onRecord(record)
        record.fired = true
      }
    }

    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }

    if ('mousewheel' === type) {
      record.deltaX = e['deltaX'] as number
      record.deltaY = e['deltaY'] as number
    }

    // 高频事件
    if (['mousemove', 'mousewheel'].indexOf(type) >= 0) {
      if (this.lastRecord) {
        // 有历史记录
        if (
          this.lastRecord.target === record.target &&
          this.lastRecord.button === record.button &&
          time - this.lastRecord.time <= this.options.thinning
        ) {
          this.timer = setTimeout(() => {
            this.timer = null
            this.lastRecord = null
            emit(record)
          }, this.options.thinning)
          return
        }
      } else {
        emit(record)
        this.lastRecord = record
        return
      }
    }
    emit(this.lastRecord)
    this.lastRecord = null
    // #endregion
    emit(record)
  }

  /**
   * 开始记录
   */
  start() {
    if (this.startAt) {
      return
    }
    this.startAt = Date.now()
    if (this.options.onStart) {
      this.options.onStart()
    }
    events.forEach(type => {
      document.addEventListener(type, this.handleEvent)
    })
  }

  /**
   * 结束记录
   */
  end() {
    if (!this.startAt) {
      return
    }
    this.startAt = null
    if (this.options.onEnd) {
      this.options.onEnd()
    }
    events.forEach(type => {
      document.removeEventListener(type, this.handleEvent)
    })
  }
} /*</function>*/

export { Recorder }
