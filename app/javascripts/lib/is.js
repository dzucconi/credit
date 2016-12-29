export const offscreen = el =>
  el.getBoundingClientRect().bottom < 0;

export const touch = () =>
  'ontouchstart' in window || 'onmsgesturechange' in window;
