'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var each = require('each');

/**
 * Expose `Pinterest`.
 */

var Pinterest = module.exports = integration('Pinterest')
  .tag('<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid={{ tid }}&value=0.00&quantity=1"/>')
  .mapping('events');

/**
 * Initialize.
 *
 * @api public
 */

Pinterest.prototype.initialize = function() {
  this.ready();
};

Pinterest.prototype.loaded = function() {
  return true;
};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

Pinterest.prototype.track = function(track) {
  var events = this.events(track.event());
  var self = this;
  each(events, function(tid) {
    self.fire(tid);
  });
};

/** 
 * Fire Pixel
*/

Pinterest.prototype.fire = function(tid){
  var src = 'https://ct.pinterest.com/?tid=' + tid + '&value=0.00&quantity=1';
  var pixel = document.createElement('img');
  pixel.setAttribute('height', 1);
  pixel.setAttribute('width', 1);
  pixel.style.display = 'none';
  pixel.setAttribute('alt', '');
  pixel.setAttribute('src', src);
  document.body.appendChild(pixel);
};
