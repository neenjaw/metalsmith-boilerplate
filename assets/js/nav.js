const Nav = (function () {

    //reference vars
    const config = {
        nav: {
            selector: '.neenjaw-nav',
            prop: {
                width: '--dropdown-width',
                height: '--dropdown-height',
                top: '--dropdown-top',
                left: '--dropdown-left',
            }
        },
        dropdowns: {
            selector: '.nav-items > li',
            class: {
                enter: 'enter',
                active: 'active',
            }
        },
        background: {
            selector: '.background',
            class: {
                open: 'open',
                active: 'active'
            }
        }
    };

    const local = {
        isMenuOpen: false,
        dropdowns: undefined,
        background: undefined,
        nav: undefined
    };

    function handleEnter() {
        // get the dropdown associated with the mouseenter event
        const dropdown = this.querySelector('.dropdown');

        // start the drop down animation
        this.classList.add(config.dropdowns.class.enter);
        // create a delayed addition of the active class
        setTimeout(() => this.classList.contains(config.dropdowns.class.enter) &&
            this.classList.add(config.dropdowns.class.active), 150);

        // get reference coords
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = local.nav.getBoundingClientRect();

        // calculate the coords of the background
        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top,
            left: dropdownCoords.left - navCoords.left
        };

        // keep track of global menu state
        local.isMenuOpen = true;

        // // set the postion / size
        local.nav.style.setProperty(config.nav.prop.left, `${coords.left}px`);
        local.nav.style.setProperty(config.nav.prop.top, `${coords.top}px`);

        local.nav.style.setProperty(config.nav.prop.width, `${coords.width}px`);
        local.nav.style.setProperty(config.nav.prop.height, `${coords.height}px`);

        // create a delayed addition of the open/active classes, allows for instantaneous
        // transition the first time, but then a smooth translation from between the 
        // menu options for the times thereafter.
        setTimeout(() => {
            return local.isMenuOpen &&
                local.background.classList.add(config.background.class.active, config.background.class.open);
        }, 30);

    }

    function handleLeave() {
        // remove the dropdown enter and active classes
        this.classList.remove(config.dropdowns.class.enter, config.dropdowns.class.active);

        // keep track of the global menu state
        local.isMenuOpen = false;
        // remove the active class to hide the background
        setTimeout(() => !local.isMenuOpen && local.background.classList.remove(config.background.class.active), 30);
        // remove the open class to make it so that when mouse re-enters it will just appear 
        // where it needs to without the translation transformation 
        setTimeout(() => !local.isMenuOpen && local.background.classList.remove(config.background.class.open), 200);
    }

    function init(conf) {
        local.dropdowns = document.querySelectorAll(config.dropdowns.selector);
        local.background = document.querySelector(config.background.selector);
        local.nav = document.querySelector(config.nav.selector);

        local.isMenuOpen = false;

        local.nav.style.setProperty(config.nav.prop.left, '0px');
        local.nav.style.setProperty(config.nav.prop.top, '0px');

        local.nav.style.setProperty(config.nav.prop.width, '0px');
        local.nav.style.setProperty(config.nav.prop.height, '0px');

        local.dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', handleEnter);
            dropdown.addEventListener('mouseleave', handleLeave);
        });
    }

    return {
        init, config, local
    };
}());