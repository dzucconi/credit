import times from '../lib/times';
import rand from '../lib/rand';

export default class Greeter {
  constructor() {
    this.variants = [
      'hey',
      'hi',
      'hey',
      'hi',
      'hello',
      'yo',
      'yo',
      'yo',
      'sup',
      'whats up',
      'hows it going',
      'what',
    ];
  }

  repeat(char, max) {
    return times(Math.floor(rand(0, max))).map(() => char).join('');
  }

  hey() {
    return 'h' + this.repeat('e', 3) + this.repeat('y', 7);
  }

  hi() {
    return 'h' + this.repeat('i', 5);
  }

  hello() {
    return 'hel' + this.repeat('l', 3) + this.repeat('o', 7);
  }

  yo() {
    return 'y' + this.repeat('o', 7);
  }

  thanks() {
    let x = Math.random() < 0.5 ? 'thanks' : 'thx';

    if (x === 'thanks') {
      x = x + this.repeat('s', 5);
    }

    return x;
  }

  hows() {
    return Math.random() < 0.5 ? 'hows' : 'how’s';
  }

  whats() {
    return Math.random() < 0.5 ? 'whats' : 'what’s';
  }

  cast(x) {
    return x + (Math.random() < 0.5 ? this.repeat('.', 2) : this.repeat('?', 2));
  }

  take() {
    let message = this.variants[Math.floor(rand(0, this.variants.length))];

    message = message.replace(/hey/g, this.hey());
    message = message.replace(/hi/g, this.hi());
    message = message.replace(/hello/g, this.hello());
    message = message.replace(/yo/g, this.yo());
    message = message.replace(/hows/g, this.hows());
    message = message.replace(/whats/g, this.whats());

    message = this.cast(message);

    return Promise.resolve([message, false]);
  }
}
