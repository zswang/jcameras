declare class Player {
    svg: SVGElement;
    style: HTMLStyleElement;
    options: IPlayerOptions;
    records: IRecordEvent[];
    locusPath: SVGPathElement;
    locusBackPath: SVGPathElement;
    movingPoints: SVGGElement;
    clickPoints: SVGGElement;
    menuPoints: SVGGElement;
    wheelPoints: SVGGElement;
    doublePoints: SVGGElement;
    dragPath: SVGPathElement;
    current: SVGGElement;
    constructor(options?: IPlayerOptions);
    /**
     * 窗体尺寸改变响应
     */
    handleResize: () => void;
    /**
     * 开始播放
     */
    start(): void;
    /**
     * 结束播放
     */
    end(): void;
    /**
     * 渲染图层
     */
    render(): void;
    /**
     * 增加行为记录
     * @param record 行为记录
     */
    push(record: IRecordEvent): void;
    /**
     * 清空画布
     */
    clear(): void;
}
export interface IPlayerOptions {
    /** 最多显示的记录数 */
    maxRecords?: number;
    /** 是否隐藏当前鼠标 */
    hiddenCurrent?: boolean;
    /** 是否派发事件 */
    fireEvent?: boolean;
}
export declare const events: string[];
export interface IRecordEvent {
    /**
     * 事件类型
     */
    type: 'mousemove' | 'mousedown' | 'mouseup' | 'contextmenu' | 'click' | 'dblclick' | 'mousewheel' | string;
    /**
     * 元素坐标
     */
    target?: HTMLElement;
    scrollLeft?: number;
    scrollTop?: number;
    /**
     * 坐标
     */
    position?: {
        /**
         * 鼠标在元素内坐标
         */
        x: number;
        y: number;
        /**
         * 鼠标在元素内比率坐标
         */
        tx: number;
        ty: number;
    };
    /**
     * 事件发生的时间
     */
    time: number;
    /**
     * 滚动尺度
     */
    deltaX?: number;
    deltaY?: number;
    /**
     * 按钮
     */
    button?: number;
    /**
     * 事件是否已经派发
     */
    fired?: boolean;
}
export interface IRecorderOptions {
    thinning?: number;
    onRecord?: {
        (event: IRecordEvent);
    };
    onStart?: {
        ();
    };
    onEnd?: {
        ();
    };
    onFilter?: {
        (element: HTMLElement): boolean;
    };
}
declare class Recorder {
    options: IRecorderOptions;
    /**
     * 记录开始时间
     */
    startAt: number;
    lastRecord: IRecordEvent;
    timer: any;
    constructor(options?: IRecorderOptions);
    /**
     * 事件处理
     */
    handleEvent: (e: MouseEvent) => void;
    /**
     * 开始记录
     */
    start(): void;
    /**
     * 结束记录
     */
    end(): void;
}
declare class Parser {
    options: IParserOptions;
    constructor(options?: IParserOptions);
    parse(expr: string): any;
    stringify(session: ISession): string;
}
export interface ICommonEvent {
    type: string;
    time: number;
    path: string;
    extend: number;
}
export interface IPointEvent extends ICommonEvent {
    position: {
        x: number;
        y: number;
    };
}
export interface IScrollEvent extends ICommonEvent {
    scroll: {
        left: number;
        top: number;
    };
}
export interface IResizeEvent extends ICommonEvent {
    size: {
        width: number;
        height: number;
    };
}
export interface ISession {
    session: string;
    seq: number;
    timestamp: number;
    events: ICommonEvent[];
}
export interface IParserOptions {
    prefix?: string;
    version?: number;
}
export { Player, Recorder, Parser };
