import type from '../lib/type';
import * as sounds from '../lib/sounds';
import indicator from '../lib/indicator';
import trim from '../lib/trim';
import id from '../lib/id';
import humanize from '../lib/humanize';

export default class Chat {
  constructor({ me, them, pause, mute, entropy }) {
    this.id = id();
    this.pause = pause;
    this.mute = mute;
    this.queues = { me, them };
    this.queue = 'them';
    this.indicator = indicator();
    this.entropy = entropy;
  }

  bind() {
    this.dom = {
      chat: document.getElementById(`chat_${this.id}`),
      input: document.getElementById(`input_${this.id}`),
      messages: document.getElementsByClassName(`message_${this.id}`),
    };

    return this;
  }

  render() {
    this.el = this.template(this.id);
    return this;
  }

  run() {
    this.append();
  }

  message(x) {
    return `
      <div class='${this.queue} message message_${this.id}'>
        ${x}
      </div>
    `;
  }

  take() {
    return this.queues[this.queue].take();
  }

  cast(x) {
    return {
      them: `${humanize(x, this.entropy)}`,
      me: `${humanize(x, this.entropy)}`
    }[this.queue];
  }

  indicate() {
    this.dom.chat.appendChild(this.indicator);
    this.dom.chat.scrollTop = this.dom.chat.scrollHeight;
    return Promise.resolve(this.indicator);
  }

  sound() {
    return sounds[this.queue === 'me' ? 'send' : 'receive'].play();
  }

  clear() {
    this.dom.input.innerHTML = `
      <div class='placeholder'>Message</div>
    `;
  }

  toggle() {
    this.queue = this.queue === 'them' ? 'me' : 'them';
  }

  append() {
    this.take()
      .then(([message]) => {
        message = this.cast(message);
        const html = this.message(message);

        return this.queue === 'me'
          ? type(this.dom.input, message, [15, 250]).then(() => html)

          : this.indicate()
            .then(() => type(null, message, [5, 100]))
            .then(() => html);
      })

      .then(html => {
        if (this.queue === 'me') this.clear();

        // Play sound effects
        if (!this.mute) this.sound();

        // Remove indicator
        try {
          this.dom.chat.removeChild(this.indicator);
        } catch(e) {
          // Ignore
        }

        // Append message
        this.dom.chat.innerHTML += html;

        // Scroll to bottom of div
        this.dom.chat.scrollTop = this.dom.chat.scrollHeight;

        // Prune offscreen messages
        trim(this.dom.chat, this.dom.messages);

        // Apply conditional styling
        EQCSS.apply();

        // Toggle queues
        this.toggle();
      })
      .then(() =>
        setTimeout(this.append.bind(this), this.pause));
  }

  template() {
    return `
      <div id='app_${this.id}' class='app'>
        <div id='chat_${this.id}' class='chat'>
          <!-- Messages -->
        </div>

        <footer class='footer'>
          <div id='input_${this.id}' class='input'>
            <div class='placeholder'>
              Message
            </div>
          </div>
        </footer>
      </div>
    `;
  }
}
