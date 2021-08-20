/**
 * @fileOverview 示例目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { defineApplication, defineModule } = require('brick-engine');
const { defineCluster } = require('brick-cluster');
const { Worker } = require('./worker');
const { Agent } = require('./agent');

const app = {};

defineApplication(exports, app);
defineModule(app, Agent);
defineModule(app, Worker);
defineCluster(Agent, { name: 'CLUSTER_CLIENT_TEST_AGENT', env: { CLUSTER_CLIENT_TEST_AGENT: 1 } });
defineCluster(Worker, { name: 'CLUSTER_CLIENT_TEST_WORKER', env: { CLUSTER_CLIENT_TEST_WORKER: 1 } });
