var integration = require('@astronomerio/analytics.js-integration');
var mapProduct = require('./util/mapProduct');

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
  window.pintrk('load', tagId);
  window.pintrk('page', {
    page_name: page.name() || page.title() || '',
    page_category: page.category() || page.path() || ''
  });
};

Pinterest.prototype.track = function(track) {
};

/**
 * Product List Viewed.
 *  @param {Facade} track
 */

Pinterest.prototype.productListViewed = function(track) {
  window.pintrk('viewcategory', {
    property: track.properties().category || ''
  });
};

/**
 * Product Added.
 *  @param {Facade} track
 */

Pinterest.prototype.productAdded = function(track) {
  addToCart(track);
};

Pinterest.prototype.orderCompleted = function(track) {
  checkout(track);
};


function addToCart(track) {
  window.pintrk('addtocart', {
    value: track.price() || 0,
    order_quantity: track.quantity(),
    currency: track.currency(),
    line_items: [{
      product_name: track.name() || '',
      product_id: track.productId(),
      product_category: track.category() || '',
      product_variant_id: track.properties().variant || '',
      product_price: track.price() || 0,
      product_quantity: track.quantity(),
      product_brand: track.properties().brand || ''
    }]
  });
}

function checkout(track) {
  // map ecommerce spec products to pinterest products
  var ecomProducts = track.products();
  var lineItems =  ecomProducts.map(mapProduct);
  window.pintrk('checkout', {
    order_id: track.orderId() || '',
    order_quantity: track.total(),
    value: track.revenue() || 0,
    currency: track.currency(),
    line_items: lineItems
  });
}
