/**
 * @fileOverview 包目录文件
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { RegistryClient, clusterClientSetup } = require('./lib');
const { ListenerPlugin, defineListener } = require('./plugins');

module.exports = { RegistryClient, clusterClientSetup, ListenerPlugin, defineListener };
