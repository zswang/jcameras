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
    constructor(options?: IRecorderOptions);
    startAt: number;
    lastRecord: IRecordEvent;
    timer: any;
    handleEvent: (e: MouseEvent) => void;
    start(): void;
    end(): void;
}
export { Player, Recorder };
