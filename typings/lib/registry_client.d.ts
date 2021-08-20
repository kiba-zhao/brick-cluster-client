export const MODULE_KEY: string;
export class RegistryClient {
    /**
     * 注册器插件构造函数
     * @see {@link module:lib/provider~Provider} 提供器类
     * @class
     * @param {Provider} provider 提供器实例
     */
    constructor(...args: any[]);
    subscribe(reg: any, listener: any): void;
    publish(reg: any): void;
}
