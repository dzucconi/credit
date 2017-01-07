import * as errors from './errors';

export default (sentence, entropy) => {
  const letters = sentence.split('');

  return letters.map(letter => {
    if (errors.probability(entropy)) letter = errors.transposition(letter);
    if (errors.probability(entropy)) letter = errors.caps(letter);
    if (errors.probability(entropy)) letter = errors.omit(letter);
    if (errors.probability(entropy)) letter = errors.double(letter);

    return letter;
  }).join('');
};
