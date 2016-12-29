import { Howl } from 'howler';

export const send = new Howl({
  src: ['sounds/send.mp3'],
  volume: 0.25,
});

export const receive = new Howl({
  src: ['sounds/receive.mp3'],
  volume: 0.25,
});
