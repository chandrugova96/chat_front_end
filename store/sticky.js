

export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 50) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const stickyHeader1 = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky1');
    if (header !== null) {
        if (number >= 1) {
            header.classList.add('header--sticky1');
        } else {
            header.classList.remove('header--sticky1');
        }
    }
};