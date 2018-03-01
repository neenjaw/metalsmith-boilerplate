(function () {
    'use strict';

    //get contact element, set contact constants
    const contact = document.querySelector('.contact'),
        link = document.querySelector('.contact .link'),
        contactActiveClass = 'link-active',
        contactInactive = 'contact',
        contactActive = '<a href="mailto:tim@neenjaw.com?Subject=Got%20your%20contact%20from%20neenjaw.com">tim@neenjaw.com</a>';

    //when the contact is clicked
    contact.addEventListener('mouseover', contactClickHandler);

    function contactClickHandler(event) {
        link.classList.add(contactActiveClass);
    }

    //when the mouse leaves the contact
    contact.addEventListener('mouseleave', contactMouseoutHandler);

    function contactMouseoutHandler(event) {
        link.classList.remove(contactActiveClass);

        link.innerHTML = contactInactive;
    }

    //when the contact transitions
    contact.addEventListener('transitionend', contactTransitionHandler);
    // contact.addEventListener("transitionstart", contactTransitionHandler);

    function contactTransitionHandler(event) {
        //only change the link to the active text when the transtion ends and the active class is present
        if (link.classList.contains(contactActiveClass)) {
            link.innerHTML = contactActive;
        }
    }
}());
