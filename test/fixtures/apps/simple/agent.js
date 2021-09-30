/**
 * @fileOverview 代理进程模块
 * @name agent.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { defineProviderFactory } = require('brick-engine');
const { RegistryClient, clusterClientSetup, defineListener } = require('../../../..');

class Agent {
  /**
   * 代理进程模块构建函数
   * @param {RegistryClient} registry
   */
  constructor(registry) {
    this.registry = registry;
  }

  onAgentEvent(reg) {
    console.log(`Agent Event ${JSON.stringify(reg)}`);
    this.registry.publish({ eventName: 'worker', msg: 'publish with agent' });
  }

}

exports.Agent = Agent;

defineProviderFactory(Agent, { deps: [{ id: RegistryClient }] });
defineListener(Agent, { reg: { eventName: 'agent' }, method: 'onAgentEvent' });
clusterClientSetup(Agent, { registry: { isLeader: true, isBroadcast: true }, listener: true });
