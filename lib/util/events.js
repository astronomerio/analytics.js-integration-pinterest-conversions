'use strict';
var mapProduct = require('./mapProduct');

exports.addToCart = function(track) {
  var props = {
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
  };
  this.post('addtocart', props);
};

exports.checkout = function(track) {
  // map ecommerce spec products to pinterest products
  var ecomProducts = track.products();
  var lineItems =  ecomProducts.map(mapProduct);
  var props = {
    order_id: track.orderId() || '',
    order_quantity: track.total(),
    value: track.revenue() || 0,
    currency: track.currency(),
    line_items: lineItems
  };
  this.post('checkout', props);
};

exports.signUp = function(track) {
  var props = this.addProps(track);
  this.post('signup', props);
};

exports.lead = function(track) {
  var props = this.addProps(track);
  this.post('lead', props);
};

exports.watchVideo =  function(track) {
  var props = this.addProps(track);  
  props.video_title =  track.name() || '';
  this.post('watchvideo', props);
};

exports.search = function(track) {
  var props = this.addProps(track);
  props.search_query = track.properties().query || '';
  this.post('search', props);
};

exports.pageVisit = function(track) {
  var props = this.addProps(track);
  this.post('pagevisit', props);
};

exports.viewCategory = function(track) {
  var props = this.addProps(track);
  this.post('viewcategory', props);
};

exports.post = function(event, props) {
  window.pintrk('track', event, props);
};

exports.addProps = function(track) {
  return {
    value: track.price() || track.revenue() || '',
    order_quantity: track.quantity() || track.total() || 0,
    currency:track.currency() || '',
    property: track.properties().category || '',
    order_id: track.orderId() || '',
    promo_code: track.coupon() || '',
    lead_type: track.properties().accountType || '',
    line_items: []
  };
};
