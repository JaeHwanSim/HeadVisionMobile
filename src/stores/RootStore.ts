import { makeAutoObservable } from 'mobx';
import { StreamingStore } from './StreamingStore';
import { DiscoveryStore } from './DiscoveryStore';

export class RootStore {
    streamingStore: StreamingStore;
    discoveryStore: DiscoveryStore;

    constructor() {
        this.streamingStore = new StreamingStore(this);
        this.discoveryStore = new DiscoveryStore(this);

        makeAutoObservable(this);
    }
}