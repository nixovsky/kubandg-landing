document.addEventListener('DOMContentLoaded', () => {
    const animEl = document.querySelectorAll('anim-el');

    const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('load');
            observer.unobserve(entry.target)
          }
        })
      }
      const options = {
        rootMargin: '0px 0px 75px 0px',
        threshold: 0,
      }

      const observer = new IntersectionObserver(callback, options);

      animEl.forEach((element)=> {observer.observe(element)})      
});