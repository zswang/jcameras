/*<remove>*/
import { IRecordEvent } from './recorder'
/*</remove>*/

/*<function name="IPlayerOptions">*/
export interface IPlayerOptions {
  /** 最多显示的记录数 */
  maxRecords?: number
  /** 是否隐藏当前鼠标 */
  hiddenCurrent?: boolean
  /** 是否派发事件 */
  fireEvent?: boolean
} /*</function>*/

/*<function name="Player">*/
class Player {
  // #region 成员
  svg: SVGElement
  style: HTMLStyleElement

  options: IPlayerOptions
  records: IRecordEvent[] = []

  locusPath: SVGPathElement
  locusBackPath: SVGPathElement
  movingPoints: SVGGElement
  clickPoints: SVGGElement
  menuPoints: SVGGElement
  wheelPoints: SVGGElement
  doublePoints: SVGGElement
  dragPath: SVGPathElement
  current: SVGGElement
  // #endregion

  constructor(options: IPlayerOptions = {}) {
    this.options = { maxRecords: 100, hiddenCurrent: false, ...options }
  }

  /**
   * 窗体尺寸改变响应
   */
  handleResize = () => {
    let box = document.documentElement.getBoundingClientRect()
    this.svg.style.height = String(
      Math.max(box.height, document.documentElement.scrollHeight)
    )
  }

  /**
   * 开始播放
   */
  start() {
    if (this.svg) {
      return
    }
    let div = document.createElement('div')
    div.innerHTML = `<style><!--jdists encoding="less,autoprefixer,clean-css" import="./player.less" /--></style><!--jdists import="./player.svg" /-->`
    this.style = div.querySelector('style')
    document.body.appendChild(this.style)
    this.svg = div.querySelector('svg')
    document.body.appendChild(this.svg)

    this.locusPath = this.svg.querySelector('.locus-path')
    this.locusBackPath = this.svg.querySelector('.locus-back-path')
    this.movingPoints = this.svg.querySelector('.moving-points')
    this.clickPoints = this.svg.querySelector('.click-points')

    this.dragPath = this.svg.querySelector('.drag-path')
    this.current = this.svg.querySelector('.current')

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  /**
   * 结束播放
   */
  end() {
    if (!this.svg) {
      return
    }
    window.removeEventListener('resize', this.handleResize)
    this.style.parentNode.removeChild(this.style)
    this.svg.parentNode.removeChild(this.svg)
    this.svg = this.style = null
  }

  /**
   * 渲染图层
   */
  render() {
    if (!this.svg) {
      return
    }
    let box = document.documentElement.getBoundingClientRect()

    let locus = []
    let click = []
    let moving = []
    let drag = []
    let point
    let downPoint
    let upPoint
    this.records.forEach((item, index) => {
      let targetBox = item.target.getBoundingClientRect()
      if (!targetBox.width || !targetBox.height) {
        return
      }
      point = {
        x: item.position.x - box.left + targetBox.left,
        y: item.position.y - box.top + targetBox.top,
      }
      if (
        point.x < 0 ||
        point.y < 0 ||
        point.x > box.width ||
        point.y > Math.max(box.height, document.documentElement.scrollHeight)
      ) {
        return
      }
      locus.push(`${point.x},${point.y}`)
      switch (item.type) {
        case 'dblclick':
          click.push(
            `<use xlink:href="#mouse-double" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
        case 'mousedown':
          downPoint = point
          upPoint = null
          break
        case 'mouseup':
          upPoint = point
          if (downPoint) {
            drag.push(
              `M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`
            )
            downPoint = null
          }
          break
        case 'mousemove':
          moving.push(`<circle r="1.5" cx="${point.x}" cy="${point.y}" />`)
          if (item.button) {
            if (!downPoint) {
              downPoint = point
            }
            upPoint = point
          } else {
            if (downPoint && upPoint) {
              drag.push(
                `M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`
              )
              downPoint = null
            }
          }
          break
        case 'click':
          click.push(
            `<use xlink:href="#mouse-left" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
        case 'mousewheel':
          click.push(
            `<use xlink:href="#mouse-middle" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
        case 'contextmenu':
          click.push(
            `<use xlink:href="#mouse-right" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
      }
    })
    if (downPoint && upPoint) {
      drag.push(`M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`)
    }

    this.locusPath.setAttribute('d', locus.length ? `M${locus.join(' ')}` : '')
    this.locusBackPath.setAttribute(
      'd',
      locus.length ? `M${locus.join(' ')}` : ''
    )
    this.dragPath.setAttribute('d', drag.join(' '))
    this.movingPoints.innerHTML = moving.join('')
    this.clickPoints.innerHTML = click.join('')

    if (point && !this.options.hiddenCurrent) {
      this.current.setAttribute('transform', `translate(${point.x},${point.y})`)
    }
  }

  /**
   * 增加行为记录
   * @param record 行为记录
   */
  push(record: IRecordEvent) {
    if (!this.svg) {
      return
    }
    if (record.type === 'scroll' && this.options.fireEvent) {
      document.documentElement.scrollTop = record.scrollTop
      document.documentElement.scrollLeft = record.scrollLeft
      return
    }
    if (!record.target) {
      return
    }
    this.records.push(record)
    while (this.records.length > this.options.maxRecords) {
      this.records.shift()
    }
    this.render()
    if (record.type === 'click' && this.options.fireEvent) {
      var clickEvent = document.createEvent('MouseEvents')
      clickEvent.initMouseEvent(
        'click',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      record.target.dispatchEvent(clickEvent)
    }
  }

  /**
   * 清空画布
   */
  clear() {
    if (!this.svg) {
      return
    }
    this.records = []
    this.current.setAttribute('transform', `translate(-1000,-1000)`)
    this.render()
  }
} /*</function>*/

export { Player }
