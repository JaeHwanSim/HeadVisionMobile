import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';

export class StreamingStore {
    isRecording: boolean = false;
    streamUrl: string | null = null;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setStreamUrl(url: string) {
        this.streamUrl = url;
    }

    setRecording(recording: boolean) {
        this.isRecording = recording;
    }
}
