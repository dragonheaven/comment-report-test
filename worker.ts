import { workerData, parentPort } from 'worker_threads'
import { analyzer } from './analyzer'

console.log(`${workerData}`);

parentPort?.postMessage(analyzer(workerData));