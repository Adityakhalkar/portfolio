export class BeatDetector {
	private audioContext: AudioContext;
	private analyser: AnalyserNode;
	private dataArray: Uint8Array;
	private source: AudioBufferSourceNode | null = null;
	private isPlaying: boolean = false;
	private beatThreshold: number = 1.5;
	private beatDecay: number = 0.98;
	private beatHoldTime: number = 60;
	private beatHoldCounter: number = 0;
	private beatCallback: (() => void) | null = null;
  
	constructor(private audioUrl: string) {
	  this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
	  this.analyser = this.audioContext.createAnalyser();
	  this.analyser.fftSize = 256;
	  this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
	}
  
	async load(): Promise<void> {
	  const response = await fetch(this.audioUrl);
	  const arrayBuffer = await response.arrayBuffer();
	  const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
	  this.source = this.audioContext.createBufferSource();
	  this.source.buffer = audioBuffer;
	  this.source.connect(this.analyser);
	  this.analyser.connect(this.audioContext.destination);
	}
  
	play(callback: () => void): void {
	  if (!this.source) return;
	  this.beatCallback = callback;
	  this.source.start(0);
	  this.isPlaying = true;
	  this.detectBeats();
	}
  
	pause(): void {
	  if (this.source) {
		this.source.stop();
		this.isPlaying = false;
	  }
	}
  
	private detectBeats(): void {
	  if (!this.isPlaying) return;
  
	  this.analyser.getByteFrequencyData(this.dataArray);
	  let sum = 0;
	  for (let i = 0; i < this.dataArray.length; i++) {
		sum += this.dataArray[i];
	  }
	  const average = sum / this.dataArray.length;
  
	  if (average > this.beatThreshold && this.beatHoldCounter === 0) {
		this.beatCallback?.();
		this.beatHoldCounter = this.beatHoldTime;
	  } else {
		if (this.beatHoldCounter > 0) {
		  this.beatHoldCounter--;
		}
		this.beatThreshold *= this.beatDecay;
		if (this.beatThreshold < 0.5) {
		  this.beatThreshold = 0.5;
		}
		if (average > this.beatThreshold) {
		  this.beatThreshold = average;
		}
	  }
  
	  requestAnimationFrame(() => this.detectBeats());
	}
  }