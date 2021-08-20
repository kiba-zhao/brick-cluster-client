/**
 * 注册元数据类型
 */
export type RegistryMetadata = {
    /**
     * 注册器类Id
     */
    id?: any;
    /**
     * 构建工厂
     */
    factory?: Function;
    /**
     * 构建可选参数
     */
    opts: any;
    /**
     * 构建可选参数
     */
    delegates: string[];
    /**
     * 创建参数
     */
    args: any[];
};
export const MODULE_KEY: string;
export class RegistryPlugin {
    /**
     * 注册器插件构造函数
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
    [REGISTRY_PROVIDER]: Provider;
}
/**
 * 定义注册器元数据
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/registry~RegistryMetadata} 注册元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...RegistryMetadata} metadatas ready元数据
 * @return {EngineModule} 引擎模块对象
 */
export function defineRegistry(target: any, ...metadatas: RegistryMetadata[]): any;
declare const REGISTRY_PROVIDER: unique symbol;
import { Provider } from "brick-engine";
export {};
