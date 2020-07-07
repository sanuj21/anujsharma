(function () {
  // DOM ELEMENTS
  const DOMElements = {
    headerMain: document.querySelector('.header__content__main__text--name'),
    projectItemArr: Array.from(
      document.querySelectorAll('.projects__list__item')
    ),
    whyMeContent: document.querySelector('.whyHire__content'),
  };

  function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = '';

    var cursorPosition = 0,
      tag = '',
      writingTag = false,
      tagOpen = false,
      typeSpeed = 150,
      tempTypeSpeed = 0;

    var type = function () {
      if (writingTag === true) {
        tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === '<') {
        tempTypeSpeed = 0;
        if (tagOpen) {
          tagOpen = false;
          writingTag = true;
        } else {
          tag = '';
          tagOpen = true;
          writingTag = true;
          tag += HTML[cursorPosition];
        }
      }
      if (!writingTag && tagOpen) {
        tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
        if (HTML[cursorPosition] === ' ') {
          tempTypeSpeed = 0;
        } else {
          tempTypeSpeed = Math.random() * typeSpeed + 50;
        }
        t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === '>') {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
        writingTag = false;
        if (tagOpen) {
          var newSpan = document.createElement('span');
          t.appendChild(newSpan);
          newSpan.innerHTML = tag;
          tag = newSpan.firstChild;
        }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
        setTimeout(type, tempTypeSpeed);
      }
    };

    return {
      type: type,
    };
  }

  // Handling Animation Typing
  typewriter = setupTypewriter(DOMElements.headerMain);
  ////////////

  // PROJECT ITEM INFO
  const handleClickProjectItem = (el) => {
    return (e) => {
      if (
        e.target.matches('.projects__list__item__infoBtn') ||
        e.target.matches('.projects__list__item__infoBtn *')
      ) {
        el.querySelector('.projects__list__item__info').classList.toggle(
          'projects__list__item__info--show'
        );
        el.querySelector(
          '.projects__list__item__infoBtn__close'
        ).classList.toggle('displayBlock');
        el.querySelector(
          '.projects__list__item__infoBtn__text'
        ).classList.toggle('displayNone');

        el.querySelector('.projects__list__item__infoBtn').classList.toggle(
          'projects__list__item__infoBtn--closeStyle'
        );

        //////////////
      }
    };
  };

  DOMElements.projectItemArr.forEach((el) => {
    el.addEventListener('click', handleClickProjectItem(el));
  });

  // WAITING TILL IMAGE LOADS
  document.body.classList.add('js-loading');
  window.addEventListener('load', () => {
    document.body.classList.remove('js-loading');
    setTimeout(typewriter.type, 3000);
  });
  ////////////////

  // SCROLL IN IMAGES

  // DEBOUNCE FUNC TO CALL FUNC (AFTER DELAY)

  // FN -> takes function, wait -> for ml before execution
  const debounce = function (fn, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;

      const later = () => {
        timeout = null;
        if (!immediate) {
          fn.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(later, wait);

      if (callNow) fn.apply(this, args);
    };
  };

  // END OF DEBOUNCE FUNC

  const slideConfig = (item, classActive) => {
    const itemHeight = Number(getComputedStyle(item).height.split('px')[0]);
    const itemBottom = item.offsetTop + itemHeight;
    const slideInAt = window.scrollY + window.innerHeight - itemHeight / 6;
    const isScrolled = slideInAt > item.offsetTop;
    const isPastItem = window.scrollY > itemBottom;
    if (isScrolled && !isPastItem) {
      item.classList.add(classActive);
    } else {
      item.classList.remove(classActive);
    }
  };

  const slideInSections = () => {
    DOMElements.projectItemArr.forEach((item) => {
      slideConfig(item, 'projects__list__item--active');
    });

    slideConfig(DOMElements.whyMeContent, 'whyHire__content--active');
  };

  window.addEventListener('scroll', debounce(slideInSections));
})();
