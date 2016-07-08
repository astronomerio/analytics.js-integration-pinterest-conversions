![alt text](http://thechefkatrina.com/wp-content/uploads/2015/06/Pinterest-Business.jpg "Analytics.js Integration for Pinterest Conversion Tracking")

#Analytics.js Integration for [Pinterest Conversion Tracking](https://help.pinterest.com/en/articles/website-conversion-tracking), by [Astronomer.io](http://www.astronomer.io/).

##Configuration
Pinterest Conversion Tracking is easily setup on with your Pinterest for Business account.  Once your account is setup, simply provide the following parameters to your [Astronomer dashboard](https://app.astronomer.io/):

###Tag Name
The name of the conversion tracking tag you created in your Pinterest Business Account.  From your dashboard, you can find the tag names by clicking on Ads and then Conversion Tracking.

###Tracking ID (tid)
The tracking ID can be extracted from the `<img>` tag created by Pinterest.  Copy everything shown after the `tid=` until the next `&`.  In the example below, the tracking ID is `FGhuRS2YHwm`.  
```html
<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid=FGhuRS2YHwm&value=0.00&quantity=1"/>

##License

Released under the [MIT license](License.md).
