/*========= Wow Js =========*/
/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/
(function() {
    var a, b, c, d, e, f = function(fn, context) {
        return function() {
            return fn.apply(context, arguments)
        }
    },
    g = [].indexOf || function(searchElement /*, fromIndex */ ) {
        'use strict';
        if (this === void 0 || this === null) throw new TypeError();
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof searchElement === 'number') {
            t = Array(len);
        } else {
            var n = t.constructor.prototype;
            var k = n.hasOwnProperty;
            for (var i = 0; i < len; i++) {
                if (k.call(n, i)) t[i] = n[i];
            }
        }
        var fromIndex = arguments[1];
        if (fromIndex === void 0) fromIndex = 0; else if (fromIndex < 0) fromIndex = Math.max(0, len + fromIndex);
        for (; fromIndex < len; fromIndex++) {
            if (t[fromIndex] === searchElement) return fromIndex;
        }
        return -1;
    };
    b = function() {
        function a() {}
        a.prototype.extend = function(source, destination) {
            var key;
            for (key in source) {
                destination[key] = source[key];
            }
            return destination;
        };
        a.prototype.isMobile = function(agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };
        a.prototype.createEvent = function(eventName, bubbles, cancelable, detail) {
            var event;
            if (bubbles === void 0) bubbles = false;
            if (cancelable === void 0) cancelable = false;
            if (detail === void 0) detail = null;
            if (document.createEvent) {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, bubbles, cancelable, detail);
            } else if (document.createEventObject) {
                event = document.createEventObject();
                event.eventType = eventName;
            } else {
                event = document.createEvent('Event');
                event.initEvent(eventName, bubbles, cancelable);
            }
            return event;
        };
        a.prototype.emitEvent = function(element, event) {
            if (element.dispatchEvent) {
                return element.dispatchEvent(event);
            } else {
                return event.in
