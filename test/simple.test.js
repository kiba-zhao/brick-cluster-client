/**
 * @fileOverview 示例测试
 * @name simple.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const path = require('path');
const coffee = require('coffee');
const { ChildProcess } = require('child_process'); // eslint-disable-line no-unused-vars

describe('simple', () => {

  const brickClusterBin = require.resolve('../node_modules/.bin/brick-cluster');
  const cwd = path.join(__dirname, 'fixtures', 'apps', 'simple');

  it('start cluster', async () => {

    jest.useFakeTimers();
    const cf = coffee.fork(brickClusterBin, [], { cwd, env: { ...process.env } })
      .expect('stdout', /Agent/)
      .expect('stdout', /Worker/)
      .expect('code', 0);
    jest.runAllTicks();
    jest.useRealTimers();
    /** @type {ChildProcess} **/
    const proc = cf.proc;
    setTimeout(() => { proc.emit('close', 0); }, 1000);
    jest.clearAllTimers();
    await cf.end();
    proc.kill();

  });
});
