const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

let texts;
var url = window.location.pathname;
url = url.substring(url.lastIndexOf("/") + 1);

if (url.startsWith("en")) {
    texts = [
        "Kitchen Menu",
        "Bar Menu",
        "Wine Book",
        "Whiskey Menu",
        "Bookings",
    ];
} else {
    texts = [
        "Meniu Bucatarie",
        "Meniu Bar",
        "Cartea Vinurilor",
        "Meniu Whiskey",
        "Rezervari",
    ];
}

let time = new Date(), morph = 0, cooldown = 0, init = 0, next = 1, active = 0, isAnimating = false;

$('.pre').click(function () {
    if (!isAnimating) {
        isAnimating = true;

        $active_card = $('.my-card.active');
        $next_card = $('.my-card.next');
        $prev_card = $('.my-card.prev');
        $inactive_prev_card = $('.my-card.inactive_prev');
        $inactive_next_card = $('.my-card.inactive_next');

        $active_container = $('.container_items.active');
        $next_container = $('.container_items.next');
        $prev_container = $('.container_items.prev');
        $inactive_next_container = $('.container_items.inactive_next');
        $inactive_prev_container = $('.container_items.inactive_prev');

        $prev_card.removeClass('prev');
        $prev_card.addClass('active');
        $next_card.removeClass('next');
        $next_card.addClass('inactive_next');
        $active_card.removeClass('active');
        $active_card.addClass('next');
        $inactive_next_card.removeClass('inactive_next');
        $inactive_next_card.addClass('inactive_prev');
        $inactive_prev_card.removeClass('inactive_prev');
        $inactive_prev_card.addClass('prev');

        $next_container.animate({ opacity: 0 }, 500);
        $active_container.animate({ opacity: 0 }, 500);

        setTimeout(() => {
            $('.content').each(function () {
                if ($(this).height() > 0)
                    $(this).height(0);
            })
            $prev_container.animate({ opacity: 1 }, 500);
            $prev_container.removeClass('prev');
            $prev_container.addClass('active');
            $next_container.removeClass('next');
            $next_container.addClass('inactive_next');
            $active_container.removeClass('active');
            $active_container.addClass('next');
            $inactive_next_container.removeClass('inactive_next');
            $inactive_next_container.addClass('inactive_prev');
            $inactive_prev_container.removeClass('inactive_prev');
            $inactive_prev_container.addClass('prev');
        }, 500);

        if (active == 0)
            active = 4;
        else
            active--;
        next = active;

        if (url.startsWith("en")) {
            if (active == 0) {
                $('.pre').text("← BOOKINGS");
                $('.urm').text("BAR →");
            } else if (active == 1) {
                $('.pre').text("← KITCHEN");
                $('.urm').text("WINES →");
            } else if (active == 2) {
                $('.pre').text("← BAR");
                $('.urm').text("WHISKEY →");
            } else if (active == 3) {
                $('.pre').text("← WINES");
                $('.urm').text("BOOKINGS →");
            } else {
                $('.pre').text("← WHISKEY");
                $('.urm').text("KITCHEN →");
            }
        } else {
            if (active == 0) {
                $('.pre').text("← REZERVARI");
                $('.urm').text("BAR →");
            } else if (active == 1) {
                $('.pre').text("← BUCATARIE");
                $('.urm').text("VINURI →");
            } else if (active == 2) {
                $('.pre').text("← BAR");
                $('.urm').text("WHISKEY →");
            } else if (active == 3) {
                $('.pre').text("← VINURI");
                $('.urm').text("REZERVARI →");
            } else {
                $('.pre').text("← WHISKEY");
                $('.urm').text("BUCATARIE →");
            }
        }

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
        $inactive_prev_card = $('.my-card.inactive_prev');
        $inactive_next_card = $('.my-card.inactive_next');

        $active_container = $('.container_items.active');
        $next_container = $('.container_items.next');
        $prev_container = $('.container_items.prev');
        $inactive_next_container = $('.container_items.inactive_next');
        $inactive_prev_container = $('.container_items.inactive_prev');

        $prev_card.removeClass('prev');
        $prev_card.addClass('inactive_prev');
        $next_card.removeClass('next');
        $next_card.addClass('active');
        $active_card.removeClass('active');
        $active_card.addClass('prev');
        $inactive_next_card.removeClass('inactive_next');
        $inactive_next_card.addClass('next');
        $inactive_prev_card.removeClass('inactive_prev');
        $inactive_prev_card.addClass('inactive_next');

        $prev_container.animate({ opacity: 0 }, 500);
        $active_container.animate({ opacity: 0 }, 500);

        setTimeout(() => {
            $('.content').each(function () {
                if ($(this).height() > 0)
                    $(this).height(0);
            })
            $next_container.animate({ opacity: 1 }, 500);
            $prev_container.removeClass('prev');
            $prev_container.addClass('inactive_prev');
            $next_container.removeClass('next');
            $next_container.addClass('active');
            $active_container.removeClass('active');
            $active_container.addClass('prev');
            $inactive_next_container.removeClass('inactive_next');
            $inactive_next_container.addClass('next');
            $inactive_prev_container.removeClass('inactive_prev');
            $inactive_prev_container.addClass('inactive_next');
        }, 500);

        if (active == 4)
            active = 0;
        else
            active++;
        next = active;

        if (url.startsWith("en")) {
            if (active == 0) {
                $('.pre').text("← BOOKINGS");
                $('.urm').text("BAR →");
            } else if (active == 1) {
                $('.pre').text("← KITCHEN");
                $('.urm').text("WINES →");
            } else if (active == 2) {
                $('.pre').text("← BAR");
                $('.urm').text("WHISKEY →");
            } else if (active == 3) {
                $('.pre').text("← WINES");
                $('.urm').text("BOOKINGS →");
            } else {
                $('.pre').text("← WHISKEY");
                $('.urm').text("KITCHEN →");
            }
        } else {
            if (active == 0) {
                $('.pre').text("← REZERVARI");
                $('.urm').text("BAR →");
            } else if (active == 1) {
                $('.pre').text("← BUCATARIE");
                $('.urm').text("VINURI →");
            } else if (active == 2) {
                $('.pre').text("← BAR");
                $('.urm').text("WHISKEY →");
            } else if (active == 3) {
                $('.pre').text("← VINURI");
                $('.urm').text("REZERVARI →");
            } else {
                $('.pre').text("← WHISKEY");
                $('.urm').text("BUCATARIE →");
            }
        }

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
    elts.text2.style.opacity = `${(fraction - 0.2) * 500}%`;

    fraction = 1 - fraction;
    elts.text1.style.opacity = `${(fraction - 0.8) * 500}%`;

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

$(document).ready(function () {
    const io = new IntersectionObserver((entries) =>
        entries.forEach((entry) => {
            if (entry.target.hasAttribute("data-src")) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    io.unobserve(image);
                }
            } else
                io.unobserve(entry.target);
        })
    );

    document.querySelectorAll("img").forEach((element) => io.observe(element));

    $(window).on("load", function () {
        $('.text_center').first().animate({ 'opacity': 0 }, 1000);

        setTimeout(() => {
            $('.loader').css({ 'opacity': 0, 'pointer-events': 'none' });
            $('body').css({ 'overflow-y': 'visible' });
            $('html').css({ 'overflow-y': 'visible' });
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
                content.css({ "max-height": 0 });
            else {
                if (content.height() == 0)
                    content.css({ "max-height": content.prop("scrollHeight") });
                else
                    content.css({ "max-height": 0 });
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