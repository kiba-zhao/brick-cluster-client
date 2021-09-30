/**
 * @fileOverview 库目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { RegistryClient } = require('./registry_client');
const { clusterClientSetup } = require('./utils');

module.exports = { RegistryClient, clusterClientSetup };
