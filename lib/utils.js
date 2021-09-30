/**
 * @fileOverview 工具类
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { RegistryClient } = require('./registry_client');
const { ListenerPlugin } = require('../plugins');
const clusterClient = require('cluster-client');
const { PACKAGE_NAME } = require('./constants');
const { definePlugin, defineProviderFactory, defineReady, Provider } = require('brick-engine');
const { EngineModule } = require('brick-engine'); // eslint-disable-line no-unused-vars
const { isObject } = require('util');


const MODULE_KEY = `${PACKAGE_NAME}:lib:utils`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

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
function clusterClientSetup(module, opts = {}) {

  debug('clusterClientSetup %s %s', module, opts);

  assert(
    isObject(opts),
    `[${MODULE_KEY}] clusterClientSetup Error: wrong opts`
  );

  if (isObject(opts.registry)) {

    defineProviderFactory(module, { id: RegistryClient, factory: () => clusterClient(RegistryClient, opts.registry).create() });
    defineReady(module, { id: RegistryClient });

  }

  if (opts.listener !== false) {
    definePlugin(module, { deps: [{ id: Provider }], factory: ListenerPlugin });
  }

}

exports.clusterClientSetup = clusterClientSetup;
