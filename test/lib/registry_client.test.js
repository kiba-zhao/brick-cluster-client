/**
 * @fileOverview 注册器客户端测试
 * @name registry_client.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { MODULE_KEY, RegistryClient } = require('../../lib/registry_client');
const { EventEmitter } = require('events'); // eslint-disable-line no-unused-vars
const faker = require('faker');

describe('lib/registry_client', () => {

  it('MODULE_KEY', () => {
    expect(MODULE_KEY).toBe('brick-cluster-client:lib:RegistryClient');
  });

  describe('RegistryClient', () => {

    /** @type{RegistryClient & EventEmitter} **/
    let client;

    beforeEach(() => {
      client = new RegistryClient();
    });

    describe('subscribe', () => {

      it('success', () => {
        const eventName = faker.datatype.string();
        const listener = jest.fn();

        client.subscribe({ eventName }, listener);
        expect(client.listeners(eventName)).toEqual([ listener ]);
      });

      it('failed', () => {
        const eventName = faker.datatype.array();
        const listener = jest.fn();

        const WRONG_REG =
              `[${MODULE_KEY}] subscribe Error: wrong reg`;
        expect(() => client.subscribe({ eventName }, listener)).toThrow(WRONG_REG);
      });

    });

    describe('publish', () => {

      it('success', () => {
        const eventName = faker.datatype.string();
        const listener = jest.fn();
        const reg = JSON.parse(faker.datatype.json());
        reg.eventName = eventName;

        client.subscribe({ eventName }, listener);
        client.publish(reg);

        expect(listener).toBeCalledTimes(1);
        expect(listener).toBeCalledWith(reg);
      });


      it('failed', () => {

        const eventName = faker.datatype.array();

        const WRONG_REG =
              `[${MODULE_KEY}] publish Error: wrong reg`;
        expect(() => client.publish({ eventName })).toThrow(WRONG_REG);
      });

    });
  });

});
