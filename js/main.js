gsap.registerPlugin(ScrollTrigger);


let locoScroll;
let pageId;
let WORK;
let rect;
let workPos;
let mRg;

const body = document.body;
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
//const container = select('.site-main');
const loader = select('.js-loader');
const loaderInner = select('#js-loader__inner');
const progressBar = select('.js-loader__progress');
const loaderMask = select('.js-loader__mask');

// show loader on page load
gsap.set(loader, { autoAlpha: 1 });

// scale loader down
// gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'});


initPageTransitions();

function pageTransitionIn({ container }) {
    // timeline to stretch the loader over the whole screen
    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power2.inOut'
        }
    });
    tl
        // .set(loaderInner, { autoAlpha: 0 })
        .fromTo(loader, { yPercent: -100 }, { yPercent: 0 })
        .fromTo(loaderMask, { yPercent: 80 }, { yPercent: 0 }, 0)
        .to(container, { y: 150 }, 0);
    return tl;
}

function pageTransitionOut({ container },) {
    // timeline to move loader away down
    const tl = gsap.timeline({
        defaults: {
            // delay: 1,
            duration: 1,
            ease: 'power2.inOut'
        },
        onComplete: () => initScript()
    });
    tl
        .to(loader, { yPercent: 100 })
        .to(loaderMask, { yPercent: -80 }, 0)
        .from(container, { y: -150 }, 0);
    return tl;
}

function initPageTransitions() {

    //let scroll;

    // do something before the transition starts
    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
        // update locomotive scroll
        locoScroll.update();
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {

        // if(pageId != 'home'){
        //     console.log(1);
        //     window.scrollTo(0, 0);
        // }
    });

    barba.init({
        sync: true,
        // debug: true,
        timeout: 7000,
        transitions: [{
            name: 'overlay-transition',
            once(data) {
                // do something once on the initial page load
                initSmoothScroll(data.next.container);
                pageId = data.next.namespace;
                main_script();
                preloader_move();
                if (pageId == 'home') {
                    WORK = document.querySelector('#work');
                    rect = WORK.getBoundingClientRect();
                    workPos = rect.top;
                    mRg = window.innerWidth * 2.29 / 100;
                    first_load_home();
                    initLoader(data.next.namespace);
                } else {
                    initLoader(data.next.namespace);
                }
            },
            async leave(data) {
                // animate loading screen in
                pageTransitionIn(data.current);
                await delay(1000);
                // data.current.container.remove();
            },
            async enter(data) {
                // animate loading screen away
                pageTransitionOut(data.next);
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
                locoScroll.destroy();
                initSmoothScroll(data.next.container);
                main_script();
                pageId = data.next.namespace;
                if (pageId == 'home') {
                    WORK = document.querySelector('#work');
                    rect = WORK.getBoundingClientRect();
                    workPos = rect.top;
                    mRg = window.innerWidth * 2.29 / 100;
                }
            }

        }]
    });

    function initSmoothScroll(container) {

        locoScroll = new LocomotiveScroll({
            el: container.querySelector('[data-scroll-container]'),
            smooth: true,
            tablet: { smooth: true },
            smartphone: { smooth: true },
            multiplier: 0.5
        });

        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        locoScroll.on('scroll', ScrollTrigger.update);

        // tell ScrollTrigger to use these proxy methods for the '[data-scroll-container]' element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy('[data-scroll-container]', {

            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },

            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: container.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed'
        });

        /**
         * Remove Old Locomotive Scrollbar
         */

        //  scrollbar[0].remove();
        const scrollbar = selectAll('.c-scrollbar');

        // console.log(scrollbar);

        if (scrollbar.length > 1) {
            // console.log(scrollbar);
            scrollbar[0].remove();
        }

        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

    }
}

function initLoader() {

    // const tlLoaderIn = gsap.timeline({
    //     id: 'tlLoaderIn',
    //     defaults: {
    //     duration: 1.1,
    //     ease: 'power2.out'
    //     },
    //     onComplete: () => initScript() 
    // });
    gsap.set(loader, { yPercent: -100 });
    initScript();
    // tlLoaderIn
    // //.set(loaderContent, {autoAlpha: 1})
    // .to(loaderInner, {
    //     scaleY: 1,
    //     transformOrigin: 'bottom',
    //     ease: 'power1.inOut'
    // });

    const tlLoaderOut = gsap.timeline({
        id: 'tlLoaderOut',
        defaults: {
            duration: 1.2,
            ease: 'power2.inOut'
        },
        delay: 1
    });

    tlLoaderOut
        .from('.site-main', { y: 150 }, 0.2);

    if (pageId != 'home') {
        const tlLoader = gsap.timeline();
        tlLoader.add(tlLoaderOut);
    }
    // initScript(namespace);
}

function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}



/**
 * Fire all scripts on page load
 */
function initScript() {
    select('body').classList.remove('is-loading');

    if (pageId == 'home') {
        home_script();
    } else {
        sub_script();
    }
}

//initPageTransitions();



CustomEase.create("customEase", ".3,.86,.36,.95");
CustomEase.create("strongEase", ".9,0,.1,1");

const tll = gsap.timeline({
    paused: 'true'
});

tll.to('#percent', {
    duration: .35,
    color: '#99FF00',
    ease: 'strongEase',
    delay: .5,
});

tll.to('#percent', {
    duration: .35,
    ease: 'strongEase',
    scale: 0,
    opacity: 0,
    delay: .5,
});

tll.to('#hi', {
    opacity: 1,
    duration: .5,
    ease: 'customEase',
});

tll.to('#hi', {
    opacity: 0,
    duration: .5,
    ease: 'customEase',
    delay: .5,
});

tll.to('#imntq', {
    opacity: 1,
    duration: .5,
    ease: 'customEase',
});

tll.to('#imntq', {
    opacity: 0,
    duration: .5,
    ease: 'customEase',
    delay: .5,
});

tll.to('#preloader', {
    duration: 1,
    ease: 'customEase',
    height: '0%',
});

var width = 0;
var id;

function preloader_move() {
    id = setInterval(frame, 25);
}

function frame() {
    if (width >= 100) {
        clearInterval(id);
        tll.play();
    } else {
        width++;
        document.getElementById('percent').innerHTML = width;
    }
}

function first_load_home() {

    gsap.set('#menu-link span, #logo img', { y: '-100% - 2.29vw', opacity: 0, });
    gsap.set('#bottomleft, #bottomright', { y: '5.49vw', opacity: 0, });
    gsap.set('.behind-dp', { opacity: 0, });

    const text_line = new SplitType('.text-lines', { types: 'lines' });

    const text_line1 = new SplitType('.text-lines .line', { types: 'lines' });

    tll.from('.text-lines .line .line', {
        y: '100%',
        duration: .75,
        stagger: .2,
    });

    tll.fromTo('#ntq',
        {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            webkitClipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            webkitClipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1,
            ease: 'strongEase',
        }
    );

    tll.to('.behind-dp', {
        opacity: 1,
        duration: 0,
    });

    tll.to('nav ul span, #logo img', {
        y: '0%',
        opacity: 1,
        duration: .7,
        ease: 'customEase',
        delay: -0.75,
    });

    tll.to('#bottomleft, #bottomright', {
        y: '0%',
        opacity: 1,
        duration: .7,
        ease: 'customEase',
        delay: -0.5,
    });
}

function tilt_effect() {
    VanillaTilt.init(document.querySelectorAll(".bigtilt"), {
        max: 20,
        scale: 1.1,
        speed: 1500
    });
}

function ntq_scale() {
    gsap.to('#ntq', {
        scale: 7.5,
        opacity: 0,
        transformOrigin: "50% 28%",
        scrollTrigger: {
            scroller: '[data-scroll-container]',
            trigger: '#ntq',
            start: 'top top',
            end: window.innerHeight * 1.2,
            scrub: true,
            // markers: {
            //     startColor: 'purple',
            //     endColor: 'fuchsia',
            //     fontSize: '3rem',
            // },
        }
    });
}

function text_reveal() {
    const target1 = document.querySelector('.text-reveal-1');
    const results1 = Splitting({ target: target1, by: 'lines' });
    const target2 = document.querySelector('.text-reveal-2');
    const results2 = Splitting({ target: target2, by: 'lines' });

    results1[0].lines.forEach((line) => {
        // console.log(line);
        gsap.from(line, {
            opacity: 0,
            y: '100%',
            ease: "power4.out",
            scrollTrigger: {
                scroller: '[data-scroll-container]',
                trigger: line,
                start: 'top 90%',
                end: 'top 65%',
                scrub: true,
                // markers: {
                //     startColor: 'purple',
                //     endColor: 'fuchsia',
                //     fontSize: '3rem',
                // },
            }
        });
    });

    results2[0].lines.forEach((line) => {
        gsap.from(line, {
            opacity: 0,
            y: '100%',
            ease: "power4.out",
            scrollTrigger: {
                scroller: '[data-scroll-container]',
                trigger: line,
                start: 'top 80%',
                end: 'top 40%',
                scrub: true,
            }
        });
    });
}

function project_color() {
    $('.project').hover(function () {
        var Color = $(this).attr('data-color');
        $('#container').css('background', Color);
        $('.project').click(function () {
            $('.c-loader__mask').css('background', Color);
        });
    });
    $('.project').mouseleave(function () {
        $('#container').css('background', '#08060A');
        $('.c-loader__mask').css('background', '#08060A');
    });
}

function image_hover() {

    const image = document.querySelectorAll('.project-images img');
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.08;

    const xSet = gsap.quickSetter(image, "x", "px");
    const ySet = gsap.quickSetter(image, "y", "px");

    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX - mRg;
        mouse.y = e.clientY + locoScroll.scroll.instance.scroll.y - workPos;
    });

    var deltaX = 0;
    var deltaY = 0;

    gsap.ticker.add(() => {

        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

        pos.x += (mouse.x - pos.x - deltaX) * dt;
        pos.y += (mouse.y - pos.y - deltaY) * dt;
        xSet(pos.x);
        ySet(pos.y);
    });

    gsap.utils.toArray('#work a').forEach(category => {
        let { label } = category.dataset;

        category.addEventListener('mouseenter', () => {
            deltaX = $(`img[alt=${label}]`).width() / 2;
            deltaY = $(`img[alt=${label}]`).height() / 2;

            gsap.to(`img[alt=${label}]`, { opacity: 1, scale: 1 })
            gsap.set(`img[alt=${label}]`, { zIndex: 4 })
            gsap.set(`a[data-label=${label}]`, { zIndex: 5 })
        })

        category.addEventListener('mouseleave', () => {
            gsap.to(`img[alt=${label}]`, { opacity: 0, zIndex: -1, scale: .5 })
            gsap.set(`a[data-label=${label}]`, { zIndex: 0 })
        })
    })
}

function item_lines() {

    gsap.utils.toArray('#work .project-lines').forEach(line => {
        gsap.from(line, {
            transformOrigin: "0%",
            scaleX: 0,
            scrollTrigger: {
                scroller: '[data-scroll-container]',
                trigger: line,
                start: 'top bottom',
                end: 'top 33.33%',
                scrub: true,
            }
        });
    })
}

function contact_rec() {
    gsap.from('#our-dream', {
        y: '100%',
        ease: 'customEase',
        duration: 1,
        scrollTrigger: {
            scroller: '[data-scroll-container]',
            trigger: '#our-dream',
            start: 'top 85%',
            toggleActions: 'restart none none reverse',
        }
    });
}

function title_reveal() {

    // tll.to('#project-type, #title-line, #tags img, #tags boxed', {
    //     y: '0%',
    //     opacity: 1,
    //     duration: .75,
    //     ease: 'customEase',
    // });

    // tll.to('.button', {
    //     y: '0%',
    //     opacity: 1,
    //     duration: .75,
    //     ease: 'customEase',
    // });

    // tll.to('#first-img', {
    //     y: '0%',
    //     opacity: 1,
    //     duration: 1,
    //     ease: 'customEase',
    // });
}

function main_script() {
    custom_cursor();
    tilt_effect();
    // $('.c-loader__mask').css('background', Color);
}

function home_script() {
    ntq_scale();
    text_reveal();
    project_color();
    image_hover();
    item_lines();
    contact_rec();
}

function sub_script() {
    sub_page_load();
    // console.log(locoScroll.scroll);
    let passPos = 0;
    locoScroll.on('scroll',
        function () {
            // console.log(locoScroll.scroll.instance.scroll.y);
            if (locoScroll.scroll.instance.scroll.y > 0 && locoScroll.scroll.instance.scroll.y > passPos) {
                $('subnav').addClass('title-onScroll');
                $('#title').addClass('text40');
                $('#title').removeClass('text100 textoutline');
                passPos = locoScroll.scroll.instance.scroll.y;
            }
            else if (locoScroll.scroll.instance.scroll.y <= 50 && locoScroll.scroll.instance.scroll.y < passPos) {
                $('subnav').removeClass('title-onScroll');
                $('#title').removeClass('text40');
                $('#title').addClass('text100 textoutline');
                passPos = locoScroll.scroll.instance.scroll.y;
            } else { passPos = locoScroll.scroll.instance.scroll.y; }
        })

    gsap.utils.toArray('.detail-img').forEach(img => {
        gsap.from(img, {
            y: '10vw',
            opacity: 0,
            duration: 1.5,
            ease: 'customEase',
            stagger: .5,
            scrollTrigger: {
                scroller: '[data-scroll-container]',
                trigger: img,
                start: 'top 98%',
                toggleActions: 'restart none none reverse',
            }
        });
    })

    let BOTTOM = document.querySelector('#bottom-work');
    let Rect = BOTTOM.getBoundingClientRect();
    let bottomPos = Rect.top;
    let mrg = window.innerWidth * 2.29 / 100;

    const subImage = document.querySelectorAll('#bottom-work .project-images img');
    const subPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const subMouse = { x: subPos.x, y: subPos.y };
    const speed = 0.08;

    const subxSet = gsap.quickSetter(subImage, "x", "px");
    const subySet = gsap.quickSetter(subImage, "y", "px");

    window.addEventListener("mousemove", e => {
        subMouse.x = e.clientX - mrg;
        subMouse.y = e.clientY + locoScroll.scroll.instance.scroll.y - bottomPos;
    });

    var deltaX = 0;
    var deltaY = 0;

    gsap.ticker.add(() => {

        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

        subPos.x += (subMouse.x - subPos.x - deltaX) * dt;
        subPos.y += (subMouse.y - subPos.y - deltaY) * dt;
        subxSet(subPos.x);
        subySet(subPos.y);
    });

    gsap.utils.toArray('#bottom-work a').forEach(category => {
        let { label } = category.dataset;

        category.addEventListener('mouseenter', () => {
            deltaX = $(`img[alt=${label}]`).width() / 2;
            deltaY = $(`img[alt=${label}]`).height() * 0.85;

            gsap.to(`img[alt=${label}]`, { opacity: 1, scale: 1 })
            gsap.set(`img[alt=${label}]`, { zIndex: 4 })
            gsap.set(`a[data-label=${label}]`, { zIndex: 5 })
        })

        category.addEventListener('mouseleave', () => {
            gsap.to(`img[alt=${label}]`, { opacity: 0, zIndex: -1, scale: .5 })
            gsap.set(`a[data-label=${label}]`, { zIndex: 0 })
        })
    })
}

function sub_page_load() {
    title_reveal();
}
