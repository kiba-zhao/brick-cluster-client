export const MODULE_KEY: string;
/**
 * 安装RegistryClient
 * @param {EngineModule} module 引擎模块
 * @param {Object} opts clusterClient构建可选项
 */
export function setupRegistryClient(module: any, opts: any): void;
/**
 * 安装监听插件
 * @param {EngineModule} module
 */
export function setupListenerPlugin(module: any): void;
