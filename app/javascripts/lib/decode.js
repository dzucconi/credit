let element = document.createElement('div');

export const stripTags = str => {
  str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
  str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
  return str;
};

export default str => {
  if (str && typeof str === 'string') {
    element.innerHTML = stripTags(str);
    str = element.textContent;
    element.textContent = '';
  }
  return str;
};
