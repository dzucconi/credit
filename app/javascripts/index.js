import parameters from 'queryparams';
import times from './lib/times';
import Chat from './models/chat';
import Greeter from './models/greeter';

window.parameters = parameters;

export default () => {
  const { amount, pause, mute, invert, entropy } = parameters({
    amount: Math.floor(window.innerWidth / 320) || 1,
    pause: 1000,
    mute: false,
    invert: false,
    entropy: 0.0165,
  });

  document.body.setAttribute('data-invert', invert);

  const DOM = {
    container: document.getElementById('container'),
  };

  const them = new Greeter;
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
