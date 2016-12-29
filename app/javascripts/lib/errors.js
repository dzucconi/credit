import keyboard from './keyboard';
import sample from './sample';

export const transposition = x => {
  const surrounding = keyboard[x];
  if (!surrounding) return x;
  return sample(surrounding.split(''));
};

export const caps = x =>
  x.toUpperCase();

export const probability = float =>
  Math.random() > (1.0 - float);
