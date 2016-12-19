'use strict';
var integration = require('@astronomerio/analytics.js-integration');
var util = require('./util/events');
var each = require('@ndhoule/each');
/**
 * Expose `Pinterest Conversions` integration.
 */
var Pinterest = module.exports = integration('Pinterest')
.global('pintrk')
.option('tagId', '')
.mapping('reservedMappings');
/**
 * Initialize Pinterest.
 *
 * @param {Facade} page
 */

Pinterest.prototype.initialize = function() {
  // code snippet from Pinterest
  !(function(e) {
    if (!window.pintrk) {
      window.pintrk = function() {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
      };
      var n = window.pintrk;
      n.queue = [];
      n.version = '3.0';
      var t = document.createElement('script');
      t.async = !0;
      t.src = e;
      var r = document.getElementsByTagName('script')[0];
      r.parentNode.insertBefore(t, r);
    }
  }('https://s.pinimg.com/ct/core.js'));

  this.ready();
};

Pinterest.prototype.loaded = function() {
  return !!(document.body && window.pintrk);
};

/**
 * Track a page view.
 *
 * @param {Facade} page
 */

Pinterest.prototype.page = function(page) {
  var tagId = this.options.tagId;
  window.pintrk('load', tagId);
  window.pintrk('page', {
    page_name: page.name() || page.title() || '',
    page_category: page.category() || page.path() || ''
  });
};

Pinterest.prototype.track = function(track) {
  var self = this;
  var reservedMappings = this.reservedMappings(track.event());

  if (reservedMappings.length > 0) {
    each(function(mapping) {
      self._reservedEvent(mapping, track);
    }, reservedMappings);
  } else {
    util.post(track.event(),'');
  }
};

Pinterest.prototype._reservedEvent = function(event, track) {
  switch (event) {
  case 'checkout':
    util.checkout(track);
    break;
  case 'sign_up':
    util.signUp(track);
    break;
  case 'lead' : 
    util.lead(track);
    break;
  case 'watch_video' : 
    util.watchVideo(track);
    break;
  case 'search' : 
    util.search(track);
    break;
  case 'page_visit' : 
    util.pageVisit(track);
    break;
  case 'view_category' : 
    util.viewCategory(track);
    break;
  case 'add_to_cart' : 
    util.addToCart(track);
    break;
  case 'custom' :
    util.custom(track);
    break;
  default:
    break;
  }
};

/**
 * Product List Viewed.
 *  @param {Facade} track
 */

Pinterest.prototype.productListViewed = function(track) {
  util.viewCategory(track);
};

/**
 * Product Added.
 *  @param {Facade} track
 */

Pinterest.prototype.productAdded = function(track) {
  util.addToCart(track);
};


/**
 * Order Completed.
 *  @param {Facade} track
 */

Pinterest.prototype.orderCompleted = function(track) {
  util.checkout(track);
};

Pinterest.prototype.productsSearched = function(track) {
  util.search(track);
};
