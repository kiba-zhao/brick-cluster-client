/**
 * 监听元数据类型
 */
export type ListenerMetadata = {
    /**
     * 客户端对象id
     */
    client?: any;
    /**
     * 订阅数据
     */
    reg?: any;
    /**
     * 目标对象id
     */
    id?: any;
    /**
     * 响应方法
     */
    method: string | Symbol;
};
export const MODULE_KEY: string;
export class ListenerPlugin {
    /**
     * 监听插件构造函数
     * @see {@link module:lib/provider~Provider} 提供器类
     * @class
     * @param {Provider} provider 提供器实例
     */
    constructor(provider: Provider);
    /**
     *检查是否为匹配模块
     * @see {@link module:lib/engine~EngineModule} 引擎模块类型
     * @param {EngineModule} module 检查的模块
     * @return {boolean} true:匹配/false:不匹配
     */
    match(module: any): boolean;
    /**
     *使用模块方法
     * @see {@link module:lib/engine~EngineModule} 引擎模块类型
     * @param {EngineModule} module 使用的模块
     */
    use(module: any): Promise<void>;
    [LISTENER_PROVIDER]: Provider;
}
/**
 * 定义监听器
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/listener~ListenerMetadata} 监听元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...ListenerMetadata} metadatas 监听元数据
 * @return {EngineModule} 引擎模块对象
 */
export function defineListener(target: any, ...metadatas: ListenerMetadata[]): any;
declare const LISTENER_PROVIDER: unique symbol;
import { Provider } from "brick-engine";
export {};
