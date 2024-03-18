(function($) {
    'use strict';

    // Product Details
    function productDetails() {
        $('.product-image-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: '.slider-nav-thumbnails',
        });

        $('.slider-nav-thumbnails').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.product-image-slider',
            dots: false,
            focusOnSelect: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
        });

        // Remove active class from all thumbnail slides
        $sliderNavThumbnails = $('.slider-nav-thumbnails .slick-slide');
        $sliderNavThumbnails.removeClass('slick-active');

        // Set active class to first thumbnail slides
        $sliderNavThumbnails.eq(0).addClass('slick-active');

        // On before slide change match active thumbnail to current slide
        $productImageSlider = $('.product-image-slider');
        $productImageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var mySlideNumber = nextSlide;
            $sliderNavThumbnails.removeClass('slick-active');
            $sliderNavThumbnails.eq(mySlideNumber).addClass('slick-active');

            var img = $($productImageSlider.slick('slickGoTo', mySlideNumber)).find("img");
            if ($(window).width() > 768) {
                try {
                    $(img).elevateZoom({
                        zoomType: "inner",
                        cursor: "crosshair",
                        zoomWindowFadeIn: 500,
                        zoomWindowFadeOut: 750
                    });
                } catch (e) {
                    console.error('Error calling elevateZoom:', e);
                }
            }
        });

        //Elevate Zoom
        $productImageSlider.on('init', function() {
            if ($(window).width() > 768) {
                $img = $productImageSlider.find(".slick-active img");
                try {
                    $img.elevateZoom({
                        zoomType: "inner",
                        cursor: "crosshair",
                        zoomWindowFadeIn: 500,
                        zoomWindowFadeOut: 750
                    });
                } catch (e) {
                    console.error('Error calling elevateZoom:', e);
                }
            }
        });

        //Filter color/Size
        $('.list-filter').each(function() {
            $(this).find('a').on('click', function(event) {
                event.preventDefault();
                $(this).parent().siblings().removeClass('active');
                $(this).parent().toggleClass('active');
                $(this).parents('.attr-detail').find('.current-size').text($(this).text());
                $(this).parents('.attr-detail').find('.current-color').text($(this).attr('data-color'));
            });
        });

        //Qty Up-Down
        $('.detail-qty').each(function() {
            var qtyval = parseInt($(this).find(".qty-val").val(), 10);

            $('.qty-up').on('click', function(event) {
                event.preventDefault();
                qtyval = qtyval + 1;
                $(this).prev().val(qtyval);
            });

            $(".qty-down").on("click", function(event) {
                event.preventDefault();
                qtyval = qtyval - 1;
                if (qtyval > 1) {
                    $(this).next().val(qtyval);
                } else {
                    qtyval = 1;
                    $(this).next().val(qtyval);
                }
            });
        });

        $('.dropdown-menu .cart_list').on('click', function(event) {
            event.stopPropagation();
        });
    }

    //Load functions
    $(document).ready(function() {
        productDetails();
    });

})(jQuery);
