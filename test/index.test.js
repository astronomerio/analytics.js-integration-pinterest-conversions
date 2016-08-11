'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Pinterest = require('../lib/');

describe('Pinterest', function() {
  var analytics;
  var pinterest;
  var options = {
    events: {
      pageViewsTag: '6ZYzll7CrXN',
      signupsTag: 'SkltST0UIzk',
      bidsTag: 't3L8p332Jna',
      checkoutTag: 'eL19bCht8WC'
    }
  };

  beforeEach(function() {
    analytics = new Analytics();
    pinterest = new Pinterest(options);
    analytics.use(Pinterest);
    analytics.use(tester);
    analytics.add(pinterest);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    pinterest.reset();
    sandbox();
  });

  it('should have the correct settings', function() {
    analytics.compare(Pinterest, integration('Pinterest')
      .tag('<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid={{ tid }}&value=0.00&quantity=1"/>')
      .mapping('events'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#page', function() {
      beforeEach(function() {
        analytics.spy(pinterest, 'load');
      });
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.spy(pinterest, 'load');
      });

      it('should not send if event is not defined', function() {
        analytics.track('toString');
        analytics.didNotCall(pinterest.load);
      });
    });
  });
});
