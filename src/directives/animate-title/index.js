/* eslint-disable no-param-reassign */
export default {
  mounted: (el, { arg, value }) => {
    const list = Array.isArray(value) ? value : Array(2).fill(value || 'Animate Words');
    const frequency = +arg || 5000;
    const wrapperEl = document.createElement('span');

    wrapperEl.classList.add('v-animate-title');

    list.forEach((item, index) => {
      const title = `${item}.`;
      const titleEl = document.createElement('b');

      titleEl.classList.add('word');

      if (index === 0) titleEl.classList.add('word--visible');

      title.split('').forEach((letter) => {
        const letterEl = document.createElement('i');

        letterEl.classList.add('letter', 'letter--out');
        letterEl.innerText = letter;

        titleEl.appendChild(letterEl);
      });

      wrapperEl.appendChild(titleEl);
    });

    el.innerHTML = '';
    el.appendChild(wrapperEl);

    const processing = () => {
      [...wrapperEl.children].forEach(({ children }, wordInx) => {
        [...children].forEach((letter, letterInx) => {
          setTimeout(
            () => letter.classList.toggle('letter--out'),
            wordInx * frequency + letterInx * 50,
          );
          setTimeout(
            () => letter.classList.toggle('letter--out'),
            (wordInx + 1) * frequency + letterInx * 50,
          );
        });
      });
    };

    processing();
    el.refInterval = setInterval(processing, list.length * frequency);
  },
  beforeUnmount(el) {
    el.refInterval = null;
  },
};
