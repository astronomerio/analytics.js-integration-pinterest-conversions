![alt text](http://thechefkatrina.com/wp-content/uploads/2015/06/Pinterest-Business.jpg "Analytics.js Integration for Pinterest Conversion Tracking")

#Analytics.js Integration for [Pinterest Conversion Tracking](https://help.pinterest.com/en/articles/website-conversion-tracking), by [Astronomer.io](http://www.astronomer.io/).

##Configuration
Pinterest Conversion Tracking is easily setup on with your Pinterest for Business account.  Once your account is setup, simply provide the following parameters to your [Astronomer dashboard](https://app.astronomer.io/):

### Sample analytics.js Track Call
This will be mapped to the Pinterest tracking code below.
```javascript

```

### Sample Pinterest Track Call
```javascript
pintrk('track', 'checkout', {
  value: 10.00,
  order_quantity: 2,
  currency: 'USD',
  line_items: [
    {
      product_name: 'Parker Boots',
      product_id: '1414',
      product_price: 5.00,
      product_quantity: 1
    },
    {
      product_name: 'Parker Sandals'
      product_id: 'ABC',
      product_price: 5.00,
      product_quantity: 1
    }
  ]
});
```

### All Possible Fieds for Pinterest
```javascript
{
  value: string,
  order_quantity: number,
  currency: string,
  property: string,
  search_query: string,
  order_id: string,
  promo_code: string,
  video_title: string,
  lead_type: string,
  line_items: [
    {
      product_name: string,
      product_id: string,
      product_category: string,
      product_variant_id: string,
      product_variant: string,
      product_price: string,
      product_quantity: number,
      product_brand: string
    }
  ]
}
```

##License
Released under the [MIT license](License.md).
