import * as errors from './errors';

export default (x, entropy) =>
  x.split('').map(x => {
    if (errors.probability(entropy)) x = errors.transposition(x);
    if (errors.probability(entropy)) x = errors.caps(x);

    return x;
  }).join('');
