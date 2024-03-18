/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
    defineJQueryPlugin,
    emulateTransitionEnd,
    findShadowRoot,
    getTransitionDurationFromElement,
    getUID,
    isElement,
    isRTL,
    noop,
} from './util'
import Data from './dom/data'
import EventHandler from './dom/event-handler'
import Manipulator from './dom/manipulator'
import SelectorEngine from './dom/selector-engine'
import BaseComponent from './base-component'

// Add @types/* dependencies here
import Popper from '@popperjs/core'
import sanitizeHtml from 'sanitize-html'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------
