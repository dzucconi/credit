import times from '../lib/times';
import rand from '../lib/rand';

export default class Thanker {
  constructor() {
    this.variants = [
      'thanks',
      'thank you',
      'no, thank you',
      'thank you so much',
      'seriously, thank you so much',
      'ok, but thanks',
      'thank ye',
      'no no thank you',
      'a huge thank you',
      'thanks again',
    ];
  }

  repeat(char, max) {
    return times(Math.floor(rand(0, max))).map(() => char).join('');
  }

  no() {
    return 'n' + this.repeat('o', 5);
  }

  so() {
    return 's' + this.repeat('o', 5);
  }

  you() {
    return Math.random() < 0.5 ? 'you' : 'u';
  }

  thanks() {
    let x = Math.random() < 0.5 ? 'thanks' : 'thx';

    if (x === 'thanks') {
      x = x + this.repeat('s', 5);
    }

    return x;
  }

  seriously() {
    return Math.random() < 0.5 ? 'seriously' : 'srsly';
  }

  cast(x) {
    return x + this.repeat('!', 5);
  }

  take() {
    let message = this.variants[Math.floor(rand(0, this.variants.length))];

    message = message.replace(/no/g, this.no());
    message = message.replace(/so/g, this.so());
    message = message.replace(/you/g, this.you());
    message = message.replace(/thanks/g, this.thanks());
    message = message.replace(/seriously/g, this.seriously());

    message = this.cast(message);

    return Promise.resolve([message, false]);
  }
}
