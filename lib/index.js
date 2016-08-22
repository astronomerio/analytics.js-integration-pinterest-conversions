var integration = require('analytics.js-integration');

/**
 * Expose `Pinterest Conversions` integration.
 */

var Pinterest = module.exports = integration('Pinterest')
  .assumesPageview()
  .tag('pixel', '<img src="//ct.pinterest.com/?tid={{ pixel }}&value=0.00&quantity=1"/>')
  .option('events');

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
  var events = self.options.events;
  for (var key in events) {
    var pixel = events[key];
    self.load('pixel', {pixel : pixel});
  }
};