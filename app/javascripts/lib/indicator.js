export default () => {
  const indicator = document.createElement('div');
  indicator.className = 'indicator';
  indicator.innerHTML = `
    <span>●</span>
    <span>●</span>
    <span>●</span>
  `;
  return indicator;
};
