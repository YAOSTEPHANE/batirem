/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-beta2): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

import { defineJQueryPlugin, emulateTransitionEnd, getTransitionDurationFromElement, reflow } from './util';
import Data from './dom/data';
import EventHandler from './dom/event-handler';
import Manipulator from './dom/manipulator';

/**
 * ------------------------------------------------------------------------
 * Constants
 * --------------------------------
