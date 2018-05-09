/*<remove>*/
import { IRecordEvent } from './recorder'
/*</remove>*/

/*<function name="IPlayerOptions">*/
export interface IPlayerOptions {
  maxRecords?: number
  hiddenCurrent?: boolean
} /*</function>*/

/*<function name="Player">*/
class Player {
  svg: SVGElement
  style: HTMLStyleElement

  options: IPlayerOptions
  records: IRecordEvent[] = []

  locusPath: SVGPathElement
  movingPoints: SVGGElement
  clickPoints: SVGGElement
  menuPoints: SVGGElement
  wheelPoints: SVGGElement
  dragPath: SVGPathElement
  current: SVGGElement

  constructor(options: IPlayerOptions = {}) {
    this.options = { maxRecords: 100, hiddenCurrent: false, ...options }
  }

  handleResize = () => {
    let box = document.documentElement.getBoundingClientRect()
    this.svg.style.height = String(box.height)
  }

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
    this.movingPoints = this.svg.querySelector('.moving-points')
    this.clickPoints = this.svg.querySelector('.click-points')
    this.menuPoints = this.svg.querySelector('.menu-points')
    this.wheelPoints = this.svg.querySelector('.wheel-points')
    this.dragPath = this.svg.querySelector('.drag-path')
    this.current = this.svg.querySelector('.current')

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  end() {
    if (!this.svg) {
      return
    }
    window.removeEventListener('resize', this.handleResize)
    this.style.parentNode.removeChild(this.style)
    this.svg.parentNode.removeChild(this.svg)
    this.svg = this.style = null
  }

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
      point = {
        x: item.position.x - box.left + targetBox.left,
        y: item.position.y - box.top + targetBox.top,
      }
      locus.push(`${point.x},${point.y}`)
      switch (item.type) {
        case 'mousemove':
          moving.push(`<circle r="1.5" cx="${point.x}" cy="${point.y}" />`)
          if (item.button) {
            if (!downPoint) {
              downPoint = point
            }
            upPoint = point
          } else {
            if (downPoint) {
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
    if (downPoint) {
      drag.push(`M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`)
    }

    this.locusPath.setAttribute('d', `M${locus.join(' ')}`)
    this.dragPath.setAttribute('d', drag.join(' '))
    this.movingPoints.innerHTML = moving.join('')
    this.clickPoints.innerHTML = click.join('')
    if (point && !this.options.hiddenCurrent) {
      this.current.setAttribute('transform', `translate(${point.x},${point.y})`)
    }
  }

  push(record: IRecordEvent) {
    this.records.push(record)
    while (this.records.length > this.options.maxRecords) {
      this.records.shift()
    }
    this.render()
  }
} /*</function>*/

export { Player }
