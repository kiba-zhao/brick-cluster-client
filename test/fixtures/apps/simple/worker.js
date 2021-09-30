/**
 * @fileOverview 工作进程模块
 * @name worker.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { defineProviderFactory } = require('brick-engine');
const { RegistryClient, clusterClientSetup, defineListener } = require('../../../..');

class Worker {

  /**
   * 工作进程模块构建函数
   * @param {RegistryClient} registry
   */
  constructor(registry) {
    registry.publish({ eventName: 'agent', msg: 'publish with worker' });
  }

  onWorkerEvent(reg) {
    console.log(`Worker Event ${JSON.stringify(reg)}`);
  }
}

exports.Worker = Worker;

defineProviderFactory(Worker, { deps: [{ id: RegistryClient }] });
defineListener(Worker, { reg: { eventName: 'worker' }, method: 'onWorkerEvent' });
clusterClientSetup(Worker, { registry: { isLeader: false, isBroadcast: true } });
