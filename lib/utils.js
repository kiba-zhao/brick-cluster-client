/**
 * @fileOverview 工具类
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { RegistryClient } = require('./registry_client');
const { ListenerPlugin } = require('../plugins');
const clusterClient = require('cluster-client');
const { PACKAGE_NAME } = require('./constants');
const { definePlugin, defineProviderFactory, defineReady, Provider } = require('brick-engine');
const { EngineModule } = require('brick-engine'); // eslint-disable-line no-unused-vars

const MODULE_KEY = `${PACKAGE_NAME}:lib:utils`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

/**
 * 安装RegistryClient
 * @param {EngineModule} module 引擎模块
 * @param {Object} opts clusterClient构建可选项
 */
function setupRegistryClient(module, opts) {

  debug('setupRegistryClient %s', module, opts);

  defineProviderFactory(module, { id: RegistryClient, factory: () => clusterClient(RegistryClient, opts).create() });
  defineReady(module, { id: RegistryClient });
}

exports.setupRegistryClient = setupRegistryClient;

/**
 * 安装监听插件
 * @param {EngineModule} module
 */
function setupListenerPlugin(module) {

  debug('setupListenerPlugin %s', module);

  definePlugin(module, { deps: [{ id: Provider }], factory: ListenerPlugin });
}

exports.setupListenerPlugin = setupListenerPlugin;
