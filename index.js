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
            $('.content').each(function () {
                if($(this).height() > 0)
                    $(this).height(0);
            })
            $prev_container.animate({ opacity: 1 }, 500);
            $next_container.removeClass('next');
            $next_container.addClass('prev');
            $active_container.removeClass('active');
            $active_container.addClass('next');
            $prev_container.removeClass('prev');
            $prev_container.addClass('active');
        }, 500);

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
            $('.content').each(function () {
                if($(this).height() > 0)
                    $(this).height(0);
            })
            $next_container.animate({ opacity: 1 }, 500);
            $prev_container.removeClass('prev');
            $prev_container.addClass('next');
            $next_container.removeClass('next');
            $next_container.addClass('active');
            $active_container.removeClass('active');
            $active_container.addClass('prev');
        }, 500);

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

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.8592512, lng: 24.8742251 },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#e5c163"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#c4c4c4"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#e5c163"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e5c163"
                    },
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#e5c163"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#575757"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#999999"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ],
    });

    new google.maps.Marker({
        position: { lat: 44.8592512, lng: 24.8742251 },
        map,
        title: "Casa Sattler",
        icon: 'assets/pin.png'
    });
}

window.initMap = initMap;