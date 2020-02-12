if($(window).width() > 767){
    new WOW({
        offset: 100
    }).init();
}

var lastScrollTop = 0;

$(document).ready(function () {
    scrollConstruct();

    /**
    * Form Validation
    * @see  http://jqueryvalidation.org/validate/
    */
    $('.js-validation-form').each(function () {
        $(this).validate();
    });

    $('.js-contact-form').each(function () {
        var $form = $(this);
        $form.validate({
            submitHandler: function(form) {
                $.ajax({
                    type: "GET",
                    url: $(form).attr('action'),
                    data: $(form).serialize()
                }).done(function() {
                    form.reset();
                    $.fancybox.close();
                    $.fancybox.open(
                        '<div class="popup-window popup-window_alert">' +
                        '<div class="popup-window__alert-content">' +
                        '<div class="popup-window__alert-text">' +
                        '<div class="special-text">Thank you for reaching out to us. We will contact you within one working day</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                        );
                });
            }
        });
    });

    $('.js-subscribe-form').each(function () {
        var $form = $(this);
        $form.validate({
            submitHandler: function(form) {
                $.ajax({
                    type: "GET",
                    url: $(form).attr('action'),
                    data: $(form).serialize()
                }).done(function() {
                    form.reset();
                    $.fancybox.close();
                    $.fancybox.open(
                        '<div class="popup-window popup-window_alert">' +
                        '<div class="popup-window__alert-content">' +
                        '<div class="popup-window__alert-text">' +
                        '<div class="special-text">Thank you for subscribing<br> to our newsletter!</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                        );
                });
            }
        });
    });

    /**
    * Slick
    * @see  http://kenwheeler.github.io/slick/
    */
    mobileDevelopmentApps();

    $(window).resize(function(){
        mobileDevelopmentApps();
    });

    function mobileDevelopmentApps(){
        if($('.mobile-development__apps').length){
            if($(window).outerWidth() < 576){
                if(!$('.mobile-development__apps-list').hasClass('slick-slider')){
                    $('.mobile-development__apps-list').slick({
                        slidesToShow: 1,
                        arrows: false,
                        centerMode: true,
                        centerPadding: '20.3125%',
                    });
                }
            } else {
                if($('.mobile-development__apps-list').hasClass('slick-slider')){
                    $('.mobile-development__apps-list').slick('unslick');
                }
            }
        }
    }

    $('.main-slider__bg').each(function(){
        if($(this).find('.main-slider__bg-item').length > 1){
            $(this).slick({
                slidesToShow: 1,
                fade: true,
                autoplay: true,
                autoplaySpeed: 7000,
                arrows: false,
                dots: true,
            });
        }
    });

    $('.quote-slider').slick({
        slidesToShow: 1,
        fade: true,
        /*autoplay: true,*/
        autoplaySpeed: 7000,
        dots: true,
    });

    $('.case__reviews').slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        dots: true,
    });

    $('.gallery').each(function(i){
        var $gallery = $(this),
        $gallerySlider =  $gallery.find('.gallery__slider');
        $gallerySlider.addClass('gallery__slider_' + i);

        if($gallerySlider.children().length > 1){
            var $galleryThumbs = $('<div class="gallery__thumbs gallery__thumbs_'+ i +'" />');

            $gallerySlider.children().each(function(){
                $galleryThumbs.append($('<div class="gallery__thumbs-item"><span class="gallery__thumbs-item-inner"><img src="'+ ($(this).data('thumb') || $(this).find('img').attr('src') || $(this).find('img').data('lazy')) +'" /></span></div>'));
            });

            $gallery.append($galleryThumbs);

            $gallerySlider.slick({
                arrows: false,
                fade: true,
                asNavFor: '.gallery__thumbs_' + i,
            });

            $galleryThumbs.slick({
                slidesToShow: 6,
                focusOnSelect: true,
                swipeToSlide: true,
                centerMode: true,
                centerPadding: 0,
                asNavFor: '.gallery__slider_' + i,
                responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 4,
                    }
                }
                ]
            });
        }
    });

    $('.user-reviews').slick({
        slidesToShow: 3,
        responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
        ]
    });

    $(document).on('click', '.menu-btn', function (e) {
        noscrollStart();
        $('html').addClass('is-menu-open');
    });

    $(document).on('click', '.menu-popup__close, .menu-popup__bg', function (e) {
        $('html').removeClass('is-menu-open');
        noscrollFinish();
    });

    $('.js-target-link').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 700);
    });
});

/**
* Настройки Form Validation
*/
jQuery.validator.setDefaults({
    errorPlacement: function (error, element) {
        if ($(element).is(':checkbox') || $(element).is(':radio')) {
            error.insertAfter($(element).closest('label'));
        } else {
            error.insertAfter(element);
        }
    }
});

/**
* Настройки FancyBox
*/
$.extend(true, $.fancybox.defaults, {
    touch: false,
    autoFocus: false,
});

$(window).on('scroll', function(){
    scrollConstruct();

    if($('.numbers').length > 0 && !$('.numbers').hasClass('is-complete') && $(document).scrollTop() > $('.numbers .container').offset().top - $(window).height()){
        $('.numbers').addClass('is-complete');
        counter();
    }

    if($('#mobile-section').length){
        if($(document).scrollTop() + $(window).height() / 2 > $('#mobile-section').offset().top) {
            if(!$('.logo').hasClass('is-mobile')){
                var mobileSrc = $('.logo').find('img').attr('src').replace('logo.svg', 'logo-mobile.svg');
                $('.logo').addClass('is-mobile').find('img').attr('src', mobileSrc);
            }
        } else {
            if($('.logo').hasClass('is-mobile')){
                var softSrc = $('.logo').find('img').attr('src').replace('logo-mobile.svg', 'logo.svg');
                $('.logo').removeClass('is-mobile').find('img').attr('src', softSrc);
            }
        }
    }
});

function scrollConstruct(){
    var st = $(document).scrollTop();
    if (st > lastScrollTop){
        if(st > 100 && !$('html').hasClass('is-header-hide')){
            $('html').addClass('is-header-hide');
        }
    } else {
        if($('html').hasClass('is-header-hide')){
            $('html').removeClass('is-header-hide');
        }
    }
    lastScrollTop = st;
}

function counter() {
    var stepCount = 60,
    time = 1500,
    stepTime = time / stepCount,
    i = 0,
    int = setInterval(function() {
        $('.numbers__digit').each(function(){
            $(this).text(parseInt($(this).data('value') * i / stepCount));
        });
        i++;
        if (i > stepCount) {
            clearInterval(int);
            $('.numbers__digit').each(function(){
                $(this).text($(this).data('value'));
            });
        }
    }, stepTime);
}

/**
* Mobile Scroll Prevent
*/
var noscrollY = 0;

function noscrollStart() {
    noscrollY = $(document).scrollTop();
    $('body').css('top', - noscrollY + 'px');
    $('html').addClass('is-noscroll');
}

function noscrollFinish() {
    $('html').removeClass('is-noscroll');
    $(document).scrollTop(noscrollY);
    $('body').css('top', 'auto');
}