// jpreLoader   ----------------------------------------
$("#main").jpreLoader({
    loaderVPos: "50%",
    autoClose: true
}, function () {
    $("#main").animate({
        opacity: "1"
    }, {
        queue: false,
        duration: 700,
        easing: "easeInOutQuad"
    });
});

// functions   ----------------------------------------
function initKrobs() {
    "use strict";
    // Author code here
    var a = new Swiper(".swiper-container", {
        speed: 1e3,
        initialSlide: 0,
        onSlideChangeStart: function (b) {
            $("nav .active").removeClass("active");
            $("nav  a").eq(a.activeIndex).addClass("active");
            $(".container").animate({
                scrollTop: 0
            }, {
                queue: false,
                duration: 1,
                easing: "easeInOutQuad"
            });
            var d = $(window).width();
            if (d < 979) setTimeout(function () {
                c();
            }, 600);
            if (1 == b.activeIndex) setTimeout(function () {
                $(".scroll-nav").animate({
                    left: 0
                });
                $(".scroll-nav a").each(function (a) {
                    var b = $(this);
                    setTimeout(function () {
                        b.animate({
                            left: 0
                        }, {
                            queue: false,
                            duration: 500,
                            easing: "easeInOutQuart"
                        });
                    }, 250 * a);
                });
            }, 1e3); else {
                $(".scroll-nav").animate({
                    left: "-50px"
                });
                $(".scroll-nav a").each(function (a) {
                    var b = $(this);
                    setTimeout(function () {
                        b.animate({
                            left: "-50px"
                        }, 300);
                    }, 150 * a);
                });
            }
        }
    });
    $("nav a.swp").on("touchstart mousedown", function (b) {
        b.preventDefault();
        $("nav .active").removeClass("active");
        $(this).addClass("active");
        a.swipeTo($(this).index());
    });
    $("nav a.swp").click(function (a) {
        a.preventDefault();
    });
    $(".start-button").click(function (b) {
        b.preventDefault();
        a.swipeTo(7);
    });
    $(".gw").click(function (b) {
        b.preventDefault();
        a.swipeTo(2);
    });
    $(".go-contact").click(function (b) {
        b.preventDefault();
        a.swipeTo(7);
    });
    $(".go-book").click(function (b) {
        b.preventDefault();
        a.swipeTo(6);
    });
    $(".arrow-left").on("click", function (b) {
        b.preventDefault();
        a.swipePrev();
    });
    $(".arrow-right").on("click", function (b) {
        b.preventDefault();
        a.swipeNext();
    });
// scroll nav   ----------------------------------------
    $(".scroll-nav a").bind("click", function (a) {
        a.preventDefault();
        $(".container").scrollTo($(this).attr("href"), 950, {
            easing: "swing",
            offset: -140,
            axis: "y"
        });
    });

// show hide navigation   ----------------------------------------
    function b() {
        $("nav").fadeIn(10);
        setTimeout(function () {
            $("nav").removeClass("vis");
        }, 10);
        $(".btn-menu-wrapper").addClass("nav-rotade");
    }

    function c() {
        $("nav").addClass("vis");
        setTimeout(function () {
            $("nav").fadeOut(10);
        }, 230);
        $(".btn-menu-wrapper").removeClass("nav-rotade");
    }

    $(".call-menu").click(function () {
        if ($("nav").hasClass("vis")) b(); else c();
        return false;
    });
    $(".tlt").textillate({
        loop: true,
        minDisplayTime: 2e3,
        initialDelay: 0,
        autoStart: true,
        "in": {
            effect: "flipInY",
            delayScale: 2.5,
            delay: 50,
            sync: false,
            shuffle: false,
            reverse: false
        },
        out: {
            effect: "flipOutY",
            delayScale: 2.5,
            delay: 50,
            sync: false,
            shuffle: false,
            reverse: false
        }
    });
// portfolio  ----------------------------------------
    $("#folio_container").mixitup({
        targetSelector: ".box",
        effects: ["fade", "rotateX"],
        easing: "snap",
        transitionSpeed: 700,
        layoutMode: "grid",
        targetDisplayGrid: "inline-block",
        targetDisplayList: "block"
    });
    $("#options li").click(function () {
        $("#options li").removeClass("actcat");
        $(this).addClass("actcat");
    });
// Magnific popup  ----------------------------------------
    $(".popup-with-move-anim").magnificPopup({
        type: "ajax",
        alignTop: true,
        overflowY: "scroll",
        fixedContentPos: true,
        fixedBgPos: false,
        closeBtnInside: false,
        midClick: true,
        modal: true,
        removalDelay: 600,
        mainClass: "my-mfp-slide-bottom",
        callbacks: {
            ajaxContentAdded: function () {
                $("#project-slider").owlCarousel({
                    navigation: true,
                    pagination: false,
                    slideSpeed: 300,
                    paginationSpeed: 400,
                    autoHeight: true,
                    singleItem: true
                });
            }
        }
    });
    $(".popup-youtube, .popup-vimeo").magnificPopup({
        disableOn: 700,
        type: "iframe",
        removalDelay: 600,
        mainClass: "my-mfp-slide-bottom"
    });
    $(".popup-gallery").magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        removalDelay: 600,
        mainClass: "my-mfp-slide-bottom",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });
    $(".image-popup").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        removalDelay: 600,
        mainClass: "my-mfp-slide-bottom",
        image: {
            verticalFit: true
        }
    });
    $(document).on("click", ".popup-modal-dismiss", function (a) {
        a.preventDefault();
        $.magnificPopup.close();
    });
// folio hover   ----------------------------------------
    $.fn.duplicate = function (a, b) {
        var c = [];
        for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
        return this.pushStack(c);
    };
    $("<span class='scale-callback transition2'></span>").duplicate(6).appendTo(".folio-overlay ");
    $(".box").hover(function () {
        var a = $(this);
        var b = $(this).find("div.folio-item");
        var c = $(this).find(".folio-item span.fol-but");
        var d = $(this).find(".folio-overlay span");
        var e = {
            queue: true,
            duration: 500,
            easing: "swing"
        };
        var f = {
            queue: true,
            duration: 900,
            easing: "easeInOutElastic"
        };
        if (a.hasClass("notvisible")) {
            b.stop(true, true).animate({
                opacity: "1"
            }, e);
            c.delay(350).animate({
                opacity: "1",
                bottom: "40%"
            }, f);
            setTimeout($.proxy(function () {
                d.each(function (a) {
                    var b = $(this);
                    setTimeout(function () {
                        b.removeClass("scale-callback");
                    }, 50 * a);
                });
            }, this), 250);
            a.removeClass("notvisible");
        } else {
            b.stop(true, true).animate({
                opacity: "0"
            }, f);
            c.animate({
                opacity: "0",
                bottom: "-50%"
            }, e);
            setTimeout($.proxy(function () {
                d.each(function (a) {
                    var b = $(this);
                    setTimeout(function () {
                        b.addClass("scale-callback");
                    }, 50 * a);
                });
            }, this), 250);
            a.addClass("notvisible");
        }
        return false;
    });
// owl carousel   ----------------------------------------
    var d = $("#about-slider");
    d.owlCarousel({
        navigation: false,
        slideSpeed: 500,
        pagination: false,
        autoHeight: true,
        singleItem: true,
        touchDrag: false,
        mouseDrag: false
    });
    $(".show-res").click(function () {
        d.trigger("owl.goTo", 1);
        $(".show-about , .show-ser").removeClass("cur");
        $(this).addClass("cur");
        $("div.skillbar-bg").each(function () {
            $(this).find(".custom-skillbar").delay(600).animate({
                width: $(this).attr("data-percent")
            }, 1500);
        });
    });
    $(".show-about").click(function () {
        d.trigger("owl.goTo", 0);
        $(".show-res , .show-ser").removeClass("cur");
        $(this).addClass("cur");
    });
    $(".show-ser").click(function () {
        d.trigger("owl.goTo", 2);
        $(".show-res, .show-about").removeClass("cur");
        $(this).addClass("cur");
    });
    var f = $("#testimonials-slider");
    f.owlCarousel({
        navigation: false,
        slideSpeed: 500,
        pagination: false,
        autoHeight: true,
        singleItem: true,
        touchDrag: false,
        mouseDrag: true
    });
    $(".testimonials-holder .next-slide").click(function () {
        f.trigger("owl.next");
    });
    $(".testimonials-holder .prev-slide").click(function () {
        f.trigger("owl.prev");
    });
    var g = $("#clients-slider");
    g.owlCarousel({
        navigation: false,
        slideSpeed: 500,
        pagination: true,
        autoHeight: true,
        items: 4,
        touchDrag: false,
        mouseDrag: true
    });
    $(".clients-holder .next-slide").click(function () {
        g.trigger("owl.next");
    });
    $(".clients-holder .prev-slide").click(function () {
        g.trigger("owl.prev");
    });
    $('.clients-holder').css({height: $('.to-top-holder').outerHeight(true)});
    var h = $(".about-image-slider");
    h.owlCarousel({
        navigation: false,
        slideSpeed: 500,
        pagination: false,
        autoHeight: true,
        singleItem: true,
        touchDrag: false,
        mouseDrag: true
    });
    $(".about-image .next-slide").click(function () {
        h.trigger("owl.next");
    });
    $(".about-image .prev-slide").click(function () {
        h.trigger("owl.prev");
    });
    var prsls = $("#single-slider");
    prsls.owlCarousel({
        navigation: false,
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        autoHeight: true,
        singleItem: true,
        touchDrag: true,
        mouseDrag: true
    });

    $(".slide-holder .next-slide").click(function () {
        prsls.trigger("owl.next");
    });
    $(".slide-holder .prev-slide").click(function () {
        prsls.trigger("owl.prev");
    });
// twitter  ----------------------------------------
    if ($("#twitter-feed").length) {
        $("#twitter-feed").tweet({
            username: "katokli3mmm",
            join_text: "auto",
            avatar_size: 0,
            count: 4
        });
        $("#twitter-feed").find("ul").addClass("twitter-slider");
        $("#twitter-feed").find("ul li").addClass("item");
        var e = $(".twitter-slider");
        e.owlCarousel({
            navigation: false,
            slideSpeed: 500,
            pagination: false,
            autoHeight: true,
            singleItem: true,
            touchDrag: false,
            mouseDrag: true
        });
        $(".twitter-holder .next-slide").click(function () {
            e.trigger("owl.next");
        });
        $(".twitter-holder .prev-slide").click(function () {
            e.trigger("owl.prev");
        });
    }
// Contact form  ----------------------------------------
    $("#contactform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                comments: $("#comments").val()
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactform input, #contactform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });
// subscribe   ----------------------------------------
    $(".subscriptionForm").submit(function () {
        var a = $("#subscriptionForm").val();
        $.ajax({
            url: "php/subscription.php",
            type: "POST",
            dataType: "json",
            data: {
                email: a
            },
            success: function (a) {
                if (a.error) $("#error").fadeIn(); else {
                    $("#success").fadeIn();
                    $("#error").hide();
                }
            }
        });
        return false;
    });
    $("#subscriptionForm").focus(function () {
        $("#error").fadeOut();
        $("#success").fadeOut();
    });
    $("#subscriptionForm").keydown(function () {
        $("#error").fadeOut();
        $("#success").fadeOut();
    });
// services   ----------------------------------------
    $(".services-holder a[data-ser=modal]").click(function (a) {
        a.preventDefault();
        var b = $(this).attr("href");
        $(b).fadeIn(500);
    });
    $("<span class='closeser transition2'></span>").appendTo(".services-info");
    $(".closeser").click(function () {
        $(".services-info").fadeOut();
    });
    $(".scroll-btn").on("click", function (a) {
        a.preventDefault();
        $(".container").animate({
            scrollTop: 0
        }, {
            queue: false,
            duration: 1e3,
            easing: "easeInOutQuad"
        });
    });
}

// ajax portfolio  ----------------------------------------
function initajaxjs() {
    $("#project-slider").owlCarousel({
        navigation: true,
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        autoHeight: true,
        singleItem: true,
        touchDrag: false,
        mouseDrag: true
    });
    $(".elemajax").each(function (a) {
        var b = $(this);
        setTimeout(function () {
            b.animate({
                top: "0",
                opacity: 1
            }, {
                duration: 1200,
                easing: "easeInOutQuart"
            });
        }, 350 * a);
        $(".popup-gallery-ajax").magnificPopup({
            type: "image",
            tLoading: "Loading image #%curr%...",
            removalDelay: 600,
            mainClass: "my-mfp-slide-bottom",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });
    });
}

$(window).load(function () {
    !function () {
        var a = $("#project-page-holder");
        var b = $(".open-project-link");
        index = b.length;
        $(".open-project-link").click(function () {
            $(".container").scrollTo("#options", 600, {
                axis: "y"
            });
            if ($(this).hasClass("actajax")) ; else {
                lastIndex = index;
                index = $(this).index();
                b.removeClass("actajax");
                $(this).addClass("actajax");
                var a = $(this).find("a.open-project").attr("href") + " .item-data";
                $("#project-page-data").animate({
                    opacity: 0
                }, 400, function () {
                    $("#project-page-data").load(a, function (a) {
                        var b = $(".helper");
                        var c = b.height();
                        $("#project-page-data").css({
                            height: ""
                        });
                    });
                    $("#project-page-data").animate({
                        opacity: 1
                    }, 400);
                });
                $("#project-page-holder").slideUp(600, function () {
                    $("#project-page-data").css("visibility", "visible");
                }).delay(500).slideDown(1e3, function () {
                    $("#project-page-data").fadeIn("slow", function () {
                        initajaxjs();
                    });
                });
            }
            return false;
        });
        $("#project_close").on("click", function (a) {
            a.preventDefault();
            $("#project-page-data").animate({
                opacity: 0
            }, 400, function () {
                $("#project-page-holder").slideUp(400);
                $(".project-page").find("iframe").remove();
            });
            $(".container").scrollTo("#options", 600, {
                axis: "y"
            });
            $(".open-project-link").removeClass("actajax");
            return false;
        });
    }();
});
// map   ----------------------------------------
var map;

var krobsmap = new google.maps.LatLng(6.443581, 3.419705);

function initialize() {
    var a = [{
        featureType: "water",
        elementType: "all",
        stylers: [{
            hue: "#cdcdcd"
        }, {
            saturation: -100
        }, {
            lightness: 18
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
            hue: "#e8e8e8"
        }, {
            saturation: -100
        }, {
            lightness: 18
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
            hue: "#fdfdfd"
        }, {
            saturation: -100
        }, {
            lightness: -1
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "road.local",
        elementType: "all",
        stylers: [{
            hue: "#fdfdfd"
        }, {
            saturation: -100
        }, {
            lightness: -1
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "poi.park",
        elementType: "all",
        stylers: [{
            hue: "#c0c0c0"
        }, {
            saturation: -100
        }, {
            lightness: -3
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            hue: "#c0c0c0"
        }, {
            saturation: -100
        }, {
            lightness: -3
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            hue: "#ffffff"
        }, {
            saturation: -100
        }, {
            lightness: -9
        }, {
            visibility: "on"
        }]
    }];
    var b = {
        zoom: 17,
        zoomControl: true,
        scaleControl: false,
        scrollwheel: false,
        disableDefaultUI: false,
        draggable: false,
        center: krobsmap,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "bestfromgoogle"]
        }
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), b);
    var c = {
        name: "krobsmap"
    };
    var d = new google.maps.StyledMapType(a, c);
    map.mapTypes.set("bestfromgoogle", d);
    map.setMapTypeId("bestfromgoogle");
    var e = new google.maps.MarkerImage("images/marker.png", new google.maps.Size(94, 94), new google.maps.Point(0, 0), new google.maps.Point(94, 94));
    var f = new google.maps.LatLng(40.761467, -73.956379);
    var g = new google.maps.Marker({
        position: f,
        map: map,
        icon: e,
        zIndex: 3
    });
}

function getTodayDate() {
    var dat = new Date();
    var month = new String(dat.getMonth());
    var day = new String(dat.getDay());
    if (month.length < 2) {
        month = "0" + (dat.getMonth() + 1);
    } else {
        month = dat.getMonth() + 1;
    }
    if (day.length == 1) {
        day = "0" + (dat.getDay() + 1);
    } else {
        day = dat.getDay() + 1;
    }
    return dat.getFullYear() + "-" + month + "-" + day;
}


var setMinValueForDateFields = function () {
    var fields = document.querySelectorAll('input[type="date"]');

    for (var field of fields) {
        field.setAttribute('min', getTodayDate());
    }

}
// init   ----------------------------------------
$(document).ready(function () {
    initKrobs();
    initajaxjs();
    setMinValueForDateFields();
});

function showSpaces(e) {
    var selected;

    if (isNaN(e)) selected = parseInt(e.selectedIndex);
    else {
        document.querySelector('select[name=type]').selectedIndex = e;
        selected = e;
    }

    changeForm(selected);
}

var forms = document.querySelectorAll('select[name=price]');

function changeForm(index) {
    for (var i = 0; i <= (forms.length - 1); i++) {
        forms[i].style.display = 'none';
        if (i == index) {
            forms[index].style.display = 'block';
        }
    }
}

var s;

function setProd(e) {
    s = (e.value);
}

var prod = [];
prod['1'] = {price: 35000, name: 'Per Night - White Room'};
prod['2'] = {price: 40000, name: 'Per Night - VE Signature Room'};
prod['3'] = {price: 5000, name: 'Per Hour'};
prod['4'] = {name: 'Per month per desk', price: 68500};
prod['5'] = {name: 'Per annum per desk', price: 800000};
prod['6'] = {name: 'Per hour', price: 20000};
prod['7'] = {name: 'Per event', price: 105000};

function displaySummary() {
    var f = $('form.booking input[name="name"]').val();
    var e = $('form.booking input[name="email"]').val();
    var m = $('form.booking input[name="mobile"]').val();
    var t = $('form.booking select[name="type"]').val();
    var x = $('form.booking input[name="period"]').val();
    var d = $('form.booking input[name="datefrom"]').val() + " " + $('form.booking input[name="timefrom"]').val();
    var c = $('form.booking textarea').val();

    var p = prod[s].price;
    var n = prod[s].name;

    $('#booking-modal .fullname').text(f);
    $('#booking-modal .email').text(e);
    $('#booking-modal .mobile').text(m);
    $('#booking-modal .type').text(t);
    $('#booking-modal .space').text(n);
    $('#booking-modal .date').text(d);
    $('#booking-modal .add_info').text(c);
    $('#booking-modal .price').text(p);
    $('#booking-modal .period').text(x);
    $('#booking-modal .total_price').text((p * x));
}

function submitBooking() {
    $('form.booking').submit();
}

$('.open-booking').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});