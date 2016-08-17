var integration = require('analytics.js-integration');
var each = require('each');

/**
 * Expose `DoubleClick` integration.
 */

var Pinterest = module.exports = integration('Pinterest')
  .assumesPageview()
  .mapping('events');

/**
 * Initialize Pinterest.
 *
 * @param {Facade} page
 */

Pinterest.prototype.initialize = function() {
  this.ready();
};

/**
 * Has the Pinterest library been loaded yet?
 *
 * @return {Boolean}
 */

Pinterest.prototype.loaded = function() {
  return true;
};

/**
 * Track a page view.
 *
 * @param {Facade} page
 */

Pinterest.prototype.page = function() {

};

/**
 * Track an event.
 *
 * @param {Facade} track
 */

Pinterest.prototype.track = function(track) {
  var self = this;
  var events = this.events(track.event());
  each(function(pixel) {
    self.fire(pixel);
  }, events);
};

/**
 * Fire the pixel.
 */

Pinterest.prototype.fire = function(pixel) {

  var src = 'https://ct.pinterest.com/?tid='+ pixel + '&value=0.00&quantity=1';

  var flDiv = document.head.appendChild(document.createElement('img'));
  flDiv.style.height = '1';
  flDiv.style.width = '1';
  flDiv.style.display = 'none';
  flDiv.setAttribute('alt', '');
  flDiv.setAttribute('src', src);
};