import rand from './rand';
import decode from './decode';

export default (el, message, range = [15, 250]) => {
  const letters = decode(message).split('')
    .map(letter => `<span class='letter'>${letter}</span>`)
    .concat([' ', ' ', ' ']);

  el && (el.innerHTML = letters.shift());

  return letters.reduce((promise, letter) =>
    promise.then(() => new Promise(resolve => {
      setTimeout(() =>
        resolve(el && (el.innerHTML += letter))
      , rand(range[0], range[1]));
    })), Promise.resolve(true));
};
