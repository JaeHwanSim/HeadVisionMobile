import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';


interface ServerInfo {
    id: string;
    name: string;
    host: string;
    port: number;
    url: string;
}

export class DiscoveryStore {
    discoverdServers: ServerInfo[] = [];
    selectedServer: ServerInfo | null = null;
    isSearching: boolean = false;
    error: string | null = null;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    startDiscovery() {
        this.isSearching = true;
        this.error = null;

        //TODO: 서버 검색 로직 추가 with Bonjour
    }

    stopDiscovery() {
        this.isSearching = false;
    }

    addDiscoveredServer(server: ServerInfo) {
        if (!this.discoverdServers.find(s => s.id === server.id)) {
            this.discoverdServers.push(server);
        }
    }

    selectServer(serverId: string) {
        this.selectedServer = this.discoverdServers.find(s => s.id === serverId) || null;
        if (this.selectedServer) {
            this.rootStore.streamingStore.setStreamUrl(this.selectedServer.url);
        }
    }

    clearServers() {
        this.discoverdServers = [];
        this.selectedServer = null;
    }

    setError(error: string) {
        this.error = error;
        this.isSearching = false;
    }
}