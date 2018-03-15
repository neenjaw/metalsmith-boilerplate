// (function (){
//     'use strict';

//     const main = document.querySelector('body main');
//     const contact = document.querySelector('.contact');

//     const offsetCssvar = '--contact-scrollbar-offset';
//     const withOffset = '15px';
//     const withoutOffset = '0';

//     window.addEventListener('resize', (e) => {
//         if (main.scrollHeight > main.clientHeight) {
//             contact.style.setProperty(offsetCssvar, withOffset); 
//         } else {
//             contact.style.setProperty(offsetCssvar, withoutOffset); 
//         }
//     });

// }());