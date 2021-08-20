/**
 * @fileOverview 代理进程模块
 * @name agent.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { defineProviderFactory } = require('brick-engine');
const { RegistryClient, setupRegistryClient, setupListenerPlugin, defineListener } = require('../../../..');

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
setupRegistryClient(Agent, { isLeader: true, isBroadcast: true });
setupListenerPlugin(Agent);
defineListener(Agent, { reg: { eventName: 'agent' }, method: 'onAgentEvent' });
