# brick-cluster-client #
基于[brick-engine](https://github.com/kiba-zhao/brick-engine)的[cluster-client](https://github.com/node-modules/cluster-client#readme)工具包.用于给[brick-engine](https://github.com/kiba-zhao/brick-engine)多进程应用程序提供Leader/Follower功能支持.

```
+--------+   +--------+
| Client |   | Client |   ...
+--------+   +--------+
    |  \     /   |
    |    \ /     |
    |    / \     |
    |  /     \   |
+--------+   +--------+
| Server |   | Server |   ...
+--------+   +--------+

```

## Install ##

``` shell
npm install --save brick-cluster-client
```

## Usage ##

``` javascript

const { defineProviderFactory } = require('brick-engine');
const {RegistryClient, setupRegistryClient, setupListenerPlugin, defineListener } = require('brick-cluster-client');

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

// 定义Agent对象构建工厂
defineProviderFactory(Agent, { deps: [{ id: RegistryClient }] });
// 安装RegistryClient
setupRegistryClient(Agent, { isLeader: true, isBroadcast: true });
// 安装监听器插件
setupListenerPlugin(Agent);
// 定义绑定监听事件
defineListener(Agent, { reg: { eventName: 'agent' }, method: 'onAgentEvent' });

```

## Documentations ##
使用`jsdoc`生成注释文档

``` shell
git clone https://github.com/kiba-zhao/brick-cluster-client.git
cd brick-cluster
npm install
npm run docs
open docs/index.html
```

## License ##
[MIT](LICENSE)
