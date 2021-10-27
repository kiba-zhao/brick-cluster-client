/**
 * @fileOverview cluster-client装饰器工厂
 * @name cluster_client.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { EngineModule } = require('brick-engine'); // eslint-disable-line no-unused-vars
const { ListenerMetadata } = require('../plugins/listener'); // eslint-disable-line no-unused-vars
const { defineListener } = require('../plugins/listener');
const { PACKAGE_NAME } = require('../lib/constants');

const MODULE_KEY = `${PACKAGE_NAME}:decorators:ClusterClient`;
const debug = require('debug')(MODULE_KEY);

/**
 * cluster-client装饰器工厂方法
 * @param {...ListenerMetadata} metadatas cluster-client元数据
 * @return {function(EngineModule):void} cluster-client装饰器
 */
function ClusterClient(...metadatas) {

  debug('ClusterClient %s', metadatas);

  return function(target) {
    defineListener(target, ...metadatas);
  };

}

exports.ClusterClient = ClusterClient;
