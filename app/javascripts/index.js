import parameters from 'queryparams';
import times from './lib/times';
import Chat from './models/chat';
import Thanker from './models/thanker';

window.parameters = parameters;

export default () => {
  const { amount, pause, mute, invert, entropy } = parameters({
    amount: 1,
    pause: 1000,
    mute: false,
    invert: false,
    entropy: 0.033,
  });

  document.body.setAttribute('data-invert', invert);

  const DOM = {
    container: document.getElementById('container'),
  };

  const them = new Thanker;
  const me = them;

  const chats = times(amount)
    .map(() =>
      new Chat({
        me,
        them,
        pause,
        mute,
        entropy,
      })
    );

  DOM.container.innerHTML = chats.map(chat => chat.render().el).join('');

  chats.map(chat => chat.bind().run());
};
