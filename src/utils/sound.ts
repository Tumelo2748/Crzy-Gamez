class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;
  private playedSounds: Set<string> = new Set();

  private constructor() {
    // Initialize sound effects
    this.sounds = {
      whoosh: new Audio('/sounds/whoosh.mp3'),
      pop: new Audio('/sounds/pop.mp3'),
      fall: new Audio('/sounds/fall.mp3'),
      message: new Audio('/sounds/message.mp3'),
      success: new Audio('/sounds/success.mp3'),
    };

    // Preload all sounds
    Object.entries(this.sounds).forEach(([_, audio]) => {
      audio.load();
    });
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public play(soundName: string) {
    if (this.isMuted || this.playedSounds.has(soundName)) return;

    const sound = this.sounds[soundName];
    if (sound) {
      this.playedSounds.add(soundName);
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.log('Sound playback error:', error);
      });
    }
  }

  public resetPlayedSounds() {
    this.playedSounds.clear();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
  }

  public isSoundMuted() {
    return this.isMuted;
  }
}

export const soundManager = SoundManager.getInstance();
