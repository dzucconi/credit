import * as is from './is';

export default (el, nodes) =>
  Array.prototype.filter.call(nodes, is.offscreen)
    .map(node => el.removeChild(node));
