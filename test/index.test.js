var Analytics = require('@astronomerio/analytics.js-core').constructor;
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Pinterest = require('../lib/');

describe('Pinterest', function() {
  var analytics;
  var pinterest;
  var options = {
    events: {
      signup: 'BZ7FQQpqexJ',
      bids: '22345678',
      checkouts: '32345678',
      pageVisits: '42345678'
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
                      .global('pintrk')
                      .option('tagId', '')
                      .tag('pixel', '<img src="//ct.pinterest.com/?tid={{ pixel }}&value=0.00&quantity=1"/>')
                      .option('events'));
  });

  it('should load', function (done) {
    analytics.load(pinterest, done);
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
    });

    describe('#page', function () {
      beforeEach(function () {
        analytics.stub(window.pintrk.queue, 'push');
      });

      it('should call page', function () {
        analytics.page();
        analytics.called(window.pintrk.queue.push);
      });
    });

    describe('#track', function () {
      it('should call track', function () {
        analytics.track('Product List Viewed');
      });
    });
  });
});
