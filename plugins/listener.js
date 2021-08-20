/**
 * @fileOverview 监听器插件
 * @name listener.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { PACKAGE_NAME } = require('../lib/constants');
const { RegistryClient } = require('../lib/registry_client');
const { Provider, createDefineFunction, createExtractFunction } = require('brick-engine');
const { isObject, isSymbol, isString } = require('util');

const MODULE_KEY = `${PACKAGE_NAME}:plugins:ListenerPlugin`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

const LISTENER_PROVIDER = Symbol('LISTENER_PROVIDER');
const LISTENER_SCOPE = Symbol('LISTENER_SCOPE');

const extractListenerMetadata = createExtractFunction('extractListenerMetadata', { scope: LISTENER_SCOPE });

class ListenerPlugin {

  /**
   * 监听插件构造函数
   * @see {@link module:lib/provider~Provider} 提供器类
   * @class
   * @param {Provider} provider 提供器实例
   */
  constructor(provider) {

    debug('constructor %s', provider);

    assert(
      provider instanceof Provider,
      `[${MODULE_KEY}] constructor Error: wrong provider`
    );

    this[LISTENER_PROVIDER] = provider;
  }

  /**
   *检查是否为匹配模块
   * @see {@link module:lib/engine~EngineModule} 引擎模块类型
   * @param {EngineModule} module 检查的模块
   * @return {boolean} true:匹配/false:不匹配
   */
  match(module) {

    debug('match %s', module);

    const metadataQueue = extractListenerMetadata(module);
    return metadataQueue.length > 0 && metadataQueue.every(isListenerMetadata);
  }

  /**
   *使用模块方法
   * @see {@link module:lib/engine~EngineModule} 引擎模块类型
   * @param {EngineModule} module 使用的模块
   */
  async use(module) {

    debug('use %s', module);

    const metadataQueue = extractListenerMetadata(module);
    const promises = [];
    for (const metadata of metadataQueue) {
      const id = metadata.id || module;
      const method = metadata.method;
      const client = metadata.client || RegistryClient;
      const reg = metadata.reg;
      promises.push(subscribe(this, client, reg, id, method));
    }
    await Promise.all(promises);

  }
}

exports.ListenerPlugin = ListenerPlugin;

/**
 * 监听元数据类型
 * @see {@link module:lib/provider~ProviderStoreKey} 提供器唯一标识符类型
 * @typedef {Object} ListenerMetadata
 * @property {ProviderStoreKey} [client] 客户端对象id
 * @property {any} [reg] 订阅数据
 * @property {ProviderStoreKey} [id] 目标对象id
 * @property {string | Symbol} method 响应方法
 */

/**
 * 是否为监听元数据
 * @param {ListenerMetadata} metadata 元数据
 * @return {boolean} true:是/false:否
 */
function isListenerMetadata(metadata) {
  if (!isObject(metadata)) { return false; }
  if (!isString(metadata.method) && !isSymbol(metadata.method)) { return false; }
  return true;
}

/**
 * 订阅函数
 * @param {ListenerPlugin} plugin 监听插件对象
 * @param {ProviderStoreKey} clientId 客户端注入Id
 * @param {Object} reg 注册参数
 * @param {ProviderStoreKey} id 目标对象Id
 * @param {string | Symbol} method 监听方法
 */
async function subscribe(plugin, clientId, reg, id, method) {

  debug('subscribe %s %s %s %s %s', clientId, reg, id, method);

  const provider = plugin[LISTENER_PROVIDER];

  const [ client, module ] = await provider.require({ id: clientId }, { id });
  const listener = module[method].bind(module);
  client.subscribe(reg, listener);
}

/**
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/listener~ListenerMetadata} 监听元数据类型
 * @type {function(EngineModule,RegistryMetadata):EngineModule}
 */
const _defineListener = createDefineFunction('defineListener', { scope: LISTENER_SCOPE });

/**
 * 定义监听器
 * @see {@link module:lib/engine~EngineModule} 引擎模块类型
 * @see {@link module:plugins/listener~ListenerMetadata} 监听元数据类型
 * @param {EngineModule} target 引擎模块对象
 * @param {...ListenerMetadata} metadatas 监听元数据
 * @return {EngineModule} 引擎模块对象
 */
function defineListener(target, ...metadatas) {

  debug('defineListener %s, %s', target, metadatas);

  assert(
    metadatas.length > 0 && metadatas.every(isListenerMetadata),
    `[${MODULE_KEY}] defineListener Error:  wrong metadata args`
  );
  return _defineListener(target, ...metadatas);
}

exports.defineListener = defineListener;
