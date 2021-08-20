/**
 * @fileOverview 监听插件测试
 * @name listener.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { MODULE_KEY, ListenerPlugin, defineListener } = require('../../plugins/listener');
const { RegistryClient } = require('../../lib/registry_client');
const { Provider } = require('brick-engine');
const faker = require('faker');

describe('plugins/listener', () => {

  it('MODULE_KEY', () => {
    expect(MODULE_KEY).toBe('brick-cluster-client:plugins:ListenerPlugin');
  });

  describe('ListenerPlugin', () => {

    /**  @type {ListenerPlugin} **/
    let plugin;

    /**  @type {Provider} **/
    let provider;

    beforeEach(() => {
      provider = new Provider();
      plugin = new ListenerPlugin(provider);
    });

    describe('match', () => {

      it('simple', () => {
        const target = () => {};
        defineListener(target, { method: faker.datatype.string() });

        expect(plugin.match(target)).toBeTruthy();

      });

    });

    describe('use', () => {

      it('simple', async () => {

        const client = new RegistryClient();
        provider.define(RegistryClient, [], () => client);

        const target = Symbol('target');
        const method = Symbol(faker.datatype.string());
        const listener = jest.fn();
        provider.define(target, [], () => ({ [method]: listener }));

        const eventName = faker.datatype.string();
        const reg = { eventName };
        const module = defineListener({}, { id: target, method, client: RegistryClient, reg });

        await plugin.use(module);

        const _reg = JSON.parse(faker.datatype.json());
        _reg.eventName = eventName;
        client.publish(_reg);
        expect(listener).toBeCalledTimes(1);
        expect(listener).toBeCalledWith(_reg);
      });

    });


  });

});
