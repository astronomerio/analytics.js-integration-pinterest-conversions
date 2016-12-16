var integration = require('@astronomerio/analytics.js-integration');
var mapProduct = require('./util/mapProduct');
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
    } 
    else {
        post(track.event(),{});
    }
};

Pinterest.prototype._reservedEvent = function (event, track) {
    switch (event) {
        case 'checkout':
            checkout(track);
            break;
        case 'sign_up':
            signUp(track);
            break;
        case 'lead' : 
            lead(track);
            break;
        case 'watch_video' : 
            watchVideo(track);
            break;
        case 'search' : 
            search(track);
            break;
        case 'page_visit' : 
            pageVisit(track);
            break;
        case 'view_category' : 
            viewCategory(track);
            break;
        case 'add_to_cart' : 
            addToCart(cart);
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
    var props = {
        property: track.properties().category || ''
    };
    post('viewcategory', props);
};

/**
 * Product Added.
 *  @param {Facade} track
 */

Pinterest.prototype.productAdded = function(track) {
    addToCart(track);
};


/**
 * Order Completed.
 *  @param {Facade} track
 */

Pinterest.prototype.orderCompleted = function(track) {
    checkout(track);
};

function addToCart(track) {
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
    post('addtocart', props);

}

function checkout(track) {
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
    post('checkout', props);
}

function signUp(track){
    var props = addProps(track);
    post('signup', props);
}

function lead(track){
    var props = addProps(track);
    post('lead', props);
}

function watchVideo(track){
    var props = addProps(track);
    post('watchvideo', props);
}

function search(track){
    var props = addProps(track);
    post('search', props);
}

function pageVisit(track){
    var props = addProps(track);
    post('pagevisit', props);
}

function viewCategory(track){
    var props = addProps(track);
    props.video_title =  track.name() || '';
    post('viewcategory', props);
}

function post(event, props){
    window.pintrk('track', event, props);
}


function addProps(track) {
    return {
        value: track.price() || track.revenue() || '',
        order_quantity: track.quantity() || track.total() || 0,
        currency:track.currency() || '',
        property: track.properties().category || '',
        search_query: track.query() || '',
        order_id: track.orderId() || '',
        promo_code: track.coupon() || '',
        lead_type: track.properties().accountType || '',
        line_items: lineItems || []
    };
}
