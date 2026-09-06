document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');


  // Mobile navigation
  if (menuButton && menu) {

    const closeMenu = () => {
      menuButton.classList.remove('is-open');
      menu.classList.remove('is-open');

      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );
    };


    menuButton.addEventListener('click', () => {

      const open =
        menuButton.getAttribute(
          'aria-expanded'
        ) === 'true';


      menuButton.setAttribute(
        'aria-expanded',
        String(!open)
      );


      menuButton.classList.toggle(
        'is-open',
        !open
      );


      menu.classList.toggle(
        'is-open',
        !open
      );

    });


    menu
      .querySelectorAll('a')
      .forEach(link =>
        link.addEventListener(
          'click',
          closeMenu
        )
      );


    window.addEventListener(
      'resize',
      () => {

        if (window.innerWidth > 780) {
          closeMenu();
        }

      }
    );

  }



  // Smooth scrolling
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener(
        'click',
        event => {

          const id =
            anchor.getAttribute('href');


          if (!id || id === '#') {
            return;
          }


          const target =
            document.querySelector(id);


          if (!target) {
            return;
          }


          event.preventDefault();


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          window.scrollTo({

            top:
              target
                .getBoundingClientRect()
                .top
              +
              window.scrollY
              -
              headerHeight
              -
              10,

            behavior:
              window.matchMedia(
                '(prefers-reduced-motion: reduce)'
              ).matches

                ? 'auto'
                : 'smooth'

          });

        }
      );

    });



  // Reveal elements while scrolling
  const items =
    document.querySelectorAll(
      '.reveal'
    );


  if (
    'IntersectionObserver' in window
    &&
    !window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {

    const observer =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add('is-visible');


              observer
                .unobserve(
                  entry.target
                );

            }

          });

        },

        {
          threshold: 0.06
        }

      );


    items.forEach(
      item =>
        observer.observe(item)
    );

  } else {

    items.forEach(
      item =>
        item.classList.add(
          'is-visible'
        )
    );

  }

});