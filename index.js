const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Meniu Bucatarie",
    "Meniu Bar",
    "Cartea Vinurilor",
];

let time = new Date(), morph = 0, cooldown = 0, init = 0, next = 1, active = 0, isAnimating = false;

$('.pre').click(function () {
    if (!isAnimating) {
        isAnimating = true;

        $active_card = $('.my-card.active');
        $next_card = $('.my-card.next');
        $prev_card = $('.my-card.prev');

        $active_container = $('.container_items.active');
        $next_container = $('.container_items.next');
        $prev_container = $('.container_items.prev');

        $prev_card.removeClass('prev');
        $prev_card.addClass('active');
        $next_card.removeClass('next');
        $next_card.addClass('prev');
        $active_card.removeClass('active');
        $active_card.addClass('next');

        $next_container.animate({ opacity: 0 }, 500);
        $active_container.animate({ opacity: 0 }, 500);

        setTimeout(() => {
            $prev_container.animate({ opacity: 1 }, 500); -
            $next_container.removeClass('next');
            $next_container.addClass('prev');
            $active_container.removeClass('active');
            $active_container.addClass('next');
            $prev_container.removeClass('prev');
            $prev_container.addClass('active');
        }, 500);

        $(".content").each(function () {
            $(this).animate({ height: 0 }, 500);
        })

        if (active == 0)
            active = 2;
        else
            active--;
        next = active;
        cooldown = 0;
        time = new Date();

        animate();
    }
});

$('.urm').click(function () {
    if (!isAnimating) {
        isAnimating = true;

        $active_card = $('.my-card.active');
        $next_card = $('.my-card.next');
        $prev_card = $('.my-card.prev');

        $active_container = $('.container_items.active');
        $next_container = $('.container_items.next');
        $prev_container = $('.container_items.prev');

        $prev_card.removeClass('prev');
        $prev_card.addClass('next');
        $next_card.removeClass('next');
        $next_card.addClass('active');
        $active_card.removeClass('active');
        $active_card.addClass('prev');

        $prev_container.animate({ opacity: 0 }, 500);
        $active_container.animate({ opacity: 0 }, 500);

        setTimeout(() => {
            $next_container.animate({ opacity: 1 }, 500); -
                $prev_container.removeClass('prev');
            $prev_container.addClass('next');
            $next_container.removeClass('next');
            $next_container.addClass('active');
            $active_container.removeClass('active');
            $active_container.addClass('prev');
        }, 500);

        $(".content").each(function () {
            $(this).animate({ height: 0 }, 500);
        })

        if (active == 2)
            active = 0;
        else
            active++;
        next = active;
        cooldown = 0;
        time = new Date();

        animate();
    }
});

elts.text1.textContent = texts[init];
elts.text2.textContent = texts[init];
elts.text2.style.opacity = '0%';

function doMorph() {
    morph = -cooldown;

    if (morph > 1) {
        cooldown = 1;
        fraction = 1;
    }

    setMorph(morph);
}

function setMorph(fraction) {
    elts.text2.style.opacity = `${(fraction - 0.5) * 200}%`;

    fraction = 1 - fraction;
    elts.text1.style.opacity = `${(fraction - 0.5) * 200}%`;

    elts.text1.textContent = texts[init];
    elts.text2.textContent = texts[next];
}

function finish() {
    morph = 0;
    isAnimating = false;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    if (cooldown <= 0)
        requestAnimationFrame(animate);
    else
        init = next;

    let newTime = new Date();
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0)
        doMorph();
    else
        finish();
}

function autoHeightAnimate(element, time) {
    var autoHeight = element.css('height', 'fit-content').height();
    element.height(0);
    element.stop().animate({ height: autoHeight }, time);
}

$(document).ready(function () {
    $(window).on("load", function () {
        $('.text_center').first().animate({ 'opacity': 0 }, 1000);

        setTimeout(() => {
            $('.loader').css({ 'opacity': 0, 'pointer-events': 'none' });
            $('body').css({ 'overflow-y': 'visible' });
        }, 1000);
    });

    $(window).scroll(function () {
        window.lastScrollTime = new Date().getTime();

        if (window.scrollY > 300)
            $('.scroll_to_top').addClass('active');
        else
            $('.scroll_to_top').removeClass('active');
    });

    $('.collapsible').each(function () {
        $(this).click(function () {
            var content = $(this).next();

            if (content.height() != 0)
                content.animate({ height: 0 }, 500);
            else {
                $(".content").each(function () {
                    $(this).animate({ height: 0 }, 500);
                })

                if (content.height() == 0)
                    autoHeightAnimate(content, 500);
                else
                    content.animate({ height: 0 }, 500);
            }
        })
    });
})

function isScrolling() {
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + 200;
}

function scrollToTop() {
    if (!isScrolling())
        window.scrollTo({ top: 0, behavior: "smooth" });
}