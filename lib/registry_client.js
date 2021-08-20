/**
 * @fileOverview 注册器客户端
 * @name registry_client.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const Base = require('sdk-base');
const { PACKAGE_NAME } = require('./constants');
const { isObject, isString } = require('lodash');

const MODULE_KEY = `${PACKAGE_NAME}:lib:RegistryClient`;
exports.MODULE_KEY = MODULE_KEY;
const debug = require('debug')(MODULE_KEY);

class RegistryClient extends Base {


  /**
   * 注册器插件构造函数
   * @see {@link module:lib/provider~Provider} 提供器类
   * @class
   * @param {Provider} provider 提供器实例
   */
  constructor(...args) {

    debug('constructor %s', args);

    super(...args);
    this.ready(true);
  }

  subscribe(reg, listener) {

    debug('subscribe %s, %s', reg, listener);

    assert(
      isReg(reg),
      `[${MODULE_KEY}] subscribe Error: wrong reg`
    );

    const { eventName } = reg;
    this.on(eventName, listener);

  }

  publish(reg) {

    debug('publish %s', reg);

    assert(
      isReg(reg),
      `[${MODULE_KEY}] publish Error: wrong reg`
    );

    const { eventName } = reg;
    this.emit(eventName, reg);
  }

}

exports.RegistryClient = RegistryClient;

function isReg(reg) {
  return isObject(reg) && isString(reg.eventName);
}
