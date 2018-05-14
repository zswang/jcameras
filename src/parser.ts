/*<function name="IParserOptions">*/
export interface ICommonEvent {
  type: string
  time: number
  path: string
  extend: number
}

export interface IPointEvent extends ICommonEvent {
  position: {
    x: number
    y: number
  }
}

export interface IScrollEvent extends ICommonEvent {
  scroll: {
    left: number
    top: number
  }
}

export interface IResizeEvent extends ICommonEvent {
  size: {
    width: number
    height: number
  }
}

export interface ISession {
  session: string
  seq: number
  timestamp: number
  events: ICommonEvent[]
}

export interface IParserOptions {
  prefix?: string
  version?: number
}
/*</function>*/

/*<function name="Parser">*/
class Parser {
  options: IParserOptions

  constructor(options: IParserOptions = {}) {
    this.options = {
      prefix: 'ca',
      version: 0,
      ...options,
    }
  }

  parse(expr: string): any {
    return null
  }

  stringify(session: ISession): string {
    function short(value: number, len: number) {
      return `000000000${(value || 0).toString(36)}`.slice(-len)
    }
    let result = `${this.options.prefix}${short(this.options.version, 2)}${
      session.session
    }${short(session.seq, 2)}${short(
      Math.floor(session.timestamp / 1000) % 2821109907455 /* {36}zzzzzzzz */,
      8
    )}`
    return result
  }
} /*</function>*/

export { Parser }
