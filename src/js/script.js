document.addEventListener('DOMContentLoaded', () => {
  const animEl = document.querySelectorAll('.anim-el');

  console.log(animEl);

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('element')
        entry.target.classList.add('load');
        observer.unobserve(entry.target);
      }
    })
  }
  const options = {
    rootMargin: '0px 0px -50% 0px',
    threshold: 0,
  }

  const observer = new IntersectionObserver(callback, options);

  animEl.forEach((element) => { observer.observe(element) });


  class ItcAccordion {
    constructor(target, config) {
      this._el = typeof target === 'string' ? document.querySelector(target) : target;
      const defaultConfig = {
        alwaysOpen: true,
        duration: 350
      };
      this._config = Object.assign(defaultConfig, config);
      this.addEventListener();
    }
    addEventListener() {
      this._el.addEventListener('click', (e) => {
        const elHeader = e.target.closest('.accordion__header');
        if (!elHeader) {
          return;
        }
        if (!this._config.alwaysOpen) {
          const elOpenItem = this._el.querySelector('.accordion__item_show');
          if (elOpenItem) {
            elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
          }
        }
        this.toggle(elHeader.parentElement);
      });
    }
    show(el) {
      const elBody = el.querySelector('.accordion__body');
      if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
        return;
      }
      elBody.style['display'] = 'block';
      const height = elBody.offsetHeight;
      elBody.style['height'] = 0;
      elBody.style['overflow'] = 'hidden';
      elBody.style['transition'] = `height ${this._config.duration}ms ease`;
      elBody.classList.add('collapsing');
      el.classList.add('accordion__item_slidedown');
      elBody.offsetHeight;
      elBody.style['height'] = `${height}px`;
      window.setTimeout(() => {
        elBody.classList.remove('collapsing');
        el.classList.remove('accordion__item_slidedown');
        elBody.classList.add('collapse');
        el.classList.add('accordion__item_show');
        elBody.style['display'] = '';
        elBody.style['height'] = '';
        elBody.style['transition'] = '';
        elBody.style['overflow'] = '';
      }, this._config.duration);
    }
    hide(el) {
      const elBody = el.querySelector('.accordion__body');
      if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
        return;
      }
      elBody.style['height'] = `${elBody.offsetHeight}px`;
      elBody.offsetHeight;
      elBody.style['display'] = 'block';
      elBody.style['height'] = 0;
      elBody.style['overflow'] = 'hidden';
      elBody.style['transition'] = `height ${this._config.duration}ms ease`;
      elBody.classList.remove('collapse');
      el.classList.remove('accordion__item_show');
      elBody.classList.add('collapsing');
      window.setTimeout(() => {
        elBody.classList.remove('collapsing');
        elBody.classList.add('collapse');
        elBody.style['display'] = '';
        elBody.style['height'] = '';
        elBody.style['transition'] = '';
        elBody.style['overflow'] = '';
      }, this._config.duration);
    }
    toggle(el) {
      el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
  }
  new ItcAccordion(document.querySelector('.accordion'), {
    alwaysOpen: true
  });

  const formInputs = document.querySelectorAll('.form__input');
  formInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (input.value != ''){
        input.classList.add('valid');
      }
      else{
        input.classList.remove('valid');
      }
    });
  });

  const popUpBtns = document.querySelectorAll('.popup-btn');
  const popUp = document.querySelector('.modal-form');
  const closeModal = popUp.querySelector('.modal-close-btn');
  popUpBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
      popUp.classList.remove('close');
      popUp.classList.add('open');
    });
  });
  closeModal.addEventListener('click', () => {
    document.body.style.overflow = 'visible';
    popUp.classList.remove('open')
    popUp.classList.add('close');
  });
  popUp.addEventListener('click', (e) => {
    if(e.target === popUp && popUp.classList.contains('open')){
      document.body.style.overflow = 'visible';
      popUp.classList.remove('open')
      popUp.classList.add('close');
    }
  });
});