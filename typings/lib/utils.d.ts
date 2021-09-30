/**
 * 安装可选项
 */
export type SetupOpts = {
    /**
     * 默认注册器构建参数
     */
    registry?: any;
    /**
     * 启用监听插件
     */
    listener?: boolean;
};
export const MODULE_KEY: string;
/**
 * 安装可选项
 * @typedef {Object} SetupOpts
 * @property {Object} [registry] 默认注册器构建参数
 * @property {Boolean} [listener] 启用监听插件
 */
/**
 * clusterClient插件安装
 * @param {EngineModule} module 引擎模块
 * @param {SetupOpts} [opts] 安装可选项
 */
export function clusterClientSetup(module: any, opts?: SetupOpts): void;
