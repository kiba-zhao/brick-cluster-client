/**
 * cluster-client装饰器工厂方法
 * @param {...ListenerMetadata} metadatas cluster-client元数据
 * @return {function(EngineModule):void} cluster-client装饰器
 */
export function ClusterClient(...metadatas: ListenerMetadata[]): (arg0: any) => void;
import { ListenerMetadata } from "../plugins/listener";
