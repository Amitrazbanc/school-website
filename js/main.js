// Main JavaScript functionality for Saraswati School Website
jQuery(document).ready(function($) {
    'use strict';

    // Mobile Menu Toggle
    $('.menu-toggle').click(function() {
        $('#primary-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Dropdown Menu Toggle for Mobile
    $('.menu-item-has-children > a').click(function(e) {
        if ($(window).width() <= 768) {
            e.preventDefault();
            $(this).parent().toggleClass('active').find('.sub-menu').slideToggle();
        }
    });

    // Initialize Slider
    if ($('#slider-pro-3-122').length) {
        $('#slider-pro-3-122').sliderPro({
            width: 1200,
            height: 500,
            autoplay: true,
            autoplayOnHover: 'pause',
            autoplayDelay: 5000,
            arrows: true,
            buttons: true,
            smallSize: 500,
            mediumSize: 1000,
            largeSize: 3000,
            fade: true,
            thumbnailArrows: true,
            thumbnailWidth: 10,
            thumbnailHeight: 10,
            thumbnailsPosition: 'bottom',
            centerImage: true,
            imageScaleMode: 'cover',
            allowScaleUp: true,
            startSlide: 0,
            loop: true,
            slideDistance: 5,
            autoplayDirection: 'normal',
            touchSwipe: true,
            fullScreen: true
        });
    }

    // Smooth Scroll for anchor links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Search Form Functionality
    $('.search-form').submit(function(e) {
        e.preventDefault();
        var searchTerm = $(this).find('.search-field').val();
        if (searchTerm.trim() !== '') {
            // In a real implementation, this would redirect to search results
            alert('Searching for: ' + searchTerm);
        }
    });

    // Table Row Hover Effect
    $('.notices-table tbody tr').hover(
        function() {
            $(this).addClass('highlighted');
        },
        function() {
            $(this).removeClass('highlighted');
        }
    );

    // Copy Protection (similar to original site)
    var image_save_msg = 'You are not allowed to save images!';
    var no_menu_msg = 'Context Menu disabled!';
    var smessage = "Content is protected !!";

    function disableEnterKey(e) {
        var elemtype = e.target.tagName;
        elemtype = elemtype.toUpperCase();
        
        if (elemtype === "TEXT" || elemtype === "TEXTAREA" || elemtype === "INPUT" || elemtype === "PASSWORD" || elemtype === "SELECT" || elemtype === "OPTION" || elemtype === "EMBED") {
            elemtype = 'TEXT';
        }
        
        if (e.ctrlKey) {
            var key = e.which || e.keyCode;
            if (elemtype !== 'TEXT' && (key === 97 || key === 65 || key === 67 || key === 99 || key === 88 || key === 120 || key === 26 || key === 85 || key === 86 || key === 83 || key === 43 || key === 73)) {
                show_wpcp_message('You are not allowed to copy content or view source');
                return false;
            }
        }
        return true;
    }

    function disable_copy(e) {
        var e = e || window.event;
        var elemtype = e.target.tagName;
        elemtype = elemtype.toUpperCase();
        
        if (elemtype === "TEXT" || elemtype === "TEXTAREA" || elemtype === "INPUT" || elemtype === "PASSWORD" || elemtype === "SELECT" || elemtype === "OPTION" || elemtype === "EMBED") {
            elemtype = 'TEXT';
        }
        
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        
        if (elemtype !== "TEXT") {
            if (smessage !== "" && e.detail === 2) {
                show_wpcp_message(smessage);
            }
            if (isSafari) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    function disable_copy_ie() {
        var e = e || window.event;
        var elemtype = window.event.srcElement.nodeName;
        elemtype = elemtype.toUpperCase();
        
        if (elemtype === "IMG") {
            show_wpcp_message('You are not allowed to save images!');
            return false;
        }
        if (elemtype !== "TEXT" && elemtype !== "TEXTAREA" && elemtype !== "INPUT" && elemtype !== "PASSWORD" && elemtype !== "SELECT" && elemtype !== "OPTION" && elemtype !== "EMBED") {
            return false;
        }
        return true;
    }

    function reEnable() {
        return true;
    }

    function show_wpcp_message(message) {
        if (message !== "") {
            // Create toast notification instead of alert
            var toast = $('<div class="wpcp-toast">' + message + '</div>');
            $('body').append(toast);
            toast.css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: '#ff5062',
                color: '#fff',
                padding: '15px 20px',
                borderRadius: '5px',
                zIndex: '9999',
                fontSize: '14px'
            });
            
            setTimeout(function() {
                toast.fadeOut(function() {
                    $(this).remove();
                });
            }, 3000);
        }
    }

    // Apply copy protection
    document.onkeydown = disableEnterKey;
    document.onselectstart = disable_copy_ie;
    if (navigator.userAgent.indexOf('MSIE') === -1) {
        document.onmousedown = disable_copy;
        document.onclick = reEnable;
    }

    // Disable selection
    function disableSelection(target) {
        if (typeof target.onselectstart !== "undefined") {
            target.onselectstart = disable_copy_ie;
        } else if (typeof target.style.MozUserSelect !== "undefined") {
            target.style.MozUserSelect = "none";
        } else {
            target.onmousedown = function() { return false; };
            target.style.cursor = "default";
        }
    }

    // Disable right click
    document.oncontextmenu = function() {
        show_wpcp_message('Right click is disabled!');
        return false;
    };

    // Disable drag and drop
    document.ondragstart = function() { return false; };

    // Apply unselectable class
    $('body').addClass('unselectable');

    // Window resize handler
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('#primary-menu').removeClass('active');
            $('.menu-toggle').removeClass('active');
            $('.sub-menu').removeAttr('style');
            $('.menu-item-has-children').removeClass('active');
        }
    });

    // Scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            if ($('#scroll-to-top').length === 0) {
                $('<button id="scroll-to-top"><i class="fa fa-arrow-up"></i></button>')
                    .css({
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        background: '#4a8eff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        zIndex: '999',
                        display: 'none'
                    })
                    .appendTo('body')
                    .click(function() {
                        $('html, body').animate({ scrollTop: 0 }, 800);
                    });
            }
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });

    // Add loading state for images
    $('img').each(function() {
        $(this).on('load', function() {
            $(this).addClass('loaded');
        });
    });

    // Initialize tooltips and popovers if needed
    $('[title]').hover(function() {
        var title = $(this).attr('title');
        $(this).attr('data-title', title).removeAttr('title');
        
        var tooltip = $('<div class="tooltip">' + title + '</div>');
        tooltip.css({
            position: 'absolute',
            background: '#333',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '3px',
            fontSize: '12px',
            zIndex: '9999'
        });
        
        $('body').append(tooltip);
        
        var position = $(this).offset();
        tooltip.css({
            top: position.top - tooltip.outerHeight() - 5,
            left: position.left + ($(this).outerWidth() / 2) - (tooltip.outerWidth() / 2)
        });
        
        tooltip.fadeIn();
    }, function() {
        $('.tooltip').remove();
        var title = $(this).attr('data-title');
        $(this).attr('title', title).removeAttr('data-title');
    });

    // Print functionality
    window.addEventListener('beforeprint', function() {
        // Hide non-printable elements
        $('.header-social-wrapper, #main-nav, .search-section, .sp-arrows, .sp-buttons, .sp-full-screen-button').hide();
    });

    window.addEventListener('afterprint', function() {
        // Show hidden elements
        $('.header-social-wrapper, #main-nav, .search-section, .sp-arrows, .sp-buttons, .sp-full-screen-button').show();
    });

    // Analytics tracking (placeholder)
    function trackEvent(category, action, label) {
        // In a real implementation, this would send data to Google Analytics or similar
        console.log('Event:', category, action, label);
    }

    // Track button clicks
    $('button, a').click(function() {
        var text = $(this).text().trim();
        if (text) {
            trackEvent('User Interaction', 'Click', text);
        }
    });

});