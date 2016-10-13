var integration = require('@astronomerio/analytics.js-integration');

/**
 * Expose `Pinterest Conversions` integration.
 */

var Pinterest = module.exports = integration('Pinterest')
.global('pintrk')
.option('tagId', '')
.option('events');

/**
 * Initialize Pinterest.
 *
 * @param {Facade} page
 */

Pinterest.prototype.initialize = function() {
  // code snippet from Pinterest
  !function(e) {
    if (!window.pintrk) {
      window.pintrk = function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments))
      };

      var n = window.pintrk;
      n.queue = [];
      n.version = "3.0";
      var t = document.createElement("script");
      t.async = !0;
      t.src = e;
      var r = document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t, r);
    }
  }("https://s.pinimg.com/ct/core.js");

  this.ready();
};

/**
 * Has the Pinterest library been loaded yet?
 *
 * @return {Boolean}
 */

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
  pintrk('load', tagId);
  pintrk('page', {
    'page_name': page.name() || page.title() || '',
    'page_category': page.category() || page.path() || ''
  });
};

/**
 * Product List Viewed.
 * Supported event properties:
 * - list_id
 * - category
 * - products
 * - products.$.product_id
 */ 

Pinterest.prototype.productListViewed = function (track) {
    pintrk('viewcategory', {
        property: track.properties().category || ''
    });
};

/**
 * Track an event.
 *
 * @param {Facade} track
 */

Pinterest.prototype.track = function(track) {
  console.log('calling track');
};

Pinterest.prototype.orderCompleted = function (track) {
  console.log('completed order');
};
