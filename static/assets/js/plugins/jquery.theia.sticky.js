/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */

(function($) {
    const THEIA_STICKY_SIDEBAR = (function() {
        const DEFAULTS = {
            'containerSelector': '',
            'additionalMarginTop': 100,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern',
            'defaultPosition': 'relative',
            'namespace': 'TSS'
        };

        function validateOptions(options) {
            options.additionalMarginTop = Number.parseInt(options.additionalMarginTop, 10) || 0;
            options.additionalMarginBottom = Number.parseInt(options.additionalMarginBottom, 10) || 0;
            return options;
        }

        function tryInitOrHookIntoEvents(options, $that) {
            const success = tryInitOrHookIntoEvents.init(options, $that);

            if (!success) {
                console.warn(`TSS: Body width smaller than options.minWidth. Init is delayed.`);

                $(window).on('scroll.' + options.namespace, function() {
                    return function() {
                        const success = tryInitOrHookIntoEvents.init(options, $that);

                        if (success) {
                            $(this).unbind(event);
                        }
                    };
                }(options, $that));
                $(window).on('resize', Debounce(function() {
                    return function() {
                        const success = tryInitOrHookIntoEvents.init(options, $that);

                        if (success) {
                            $(this).unbind(event);
                        }
                    };
                }(options, $that), 100));
            }
        }

        tryInitOrHookIntoEvents.init = function() {
            const success = tryInit
