
!function(t){var e=-1,a=-1,o=function(t){return parseFloat(t)||0},i=function(e){var a=t(e),i=null,n=[];return a.each(function(){var e=t(this),a=e.offset().top-o(e.css("margin-top")),r=n.length>0?n[n.length-1]:null;null===r?n.push(e):Math.floor(Math.abs(i-a))<=1?n[n.length-1]=r.add(e):n.push(e),i=a}),n},n=function(e){var a={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(a,e):("boolean"==typeof e?a.byRow=e:"remove"===e&&(a.remove=!0),a)},r=t.fn.matchHeight=function(e){var a=n(e);if(a.remove){var o=this;return this.css(a.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(o)}),this}return this.length<=1&&!a.target?this:(r._groups.push({elements:this,options:a}),r._apply(this,a),this)};r.version="master",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,r._afterUpdate=null,r._rows=i,r._parse=o,r._parseOptions=n,r._apply=function(e,a){var s=n(a),h=t(e),c=[h],l=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"inline-flex"!==a&&(a="block"),e.data("style-cache",e.attr("style")),e.css({display:a,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),c=i(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(c,function(e,a){var i=t(a),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&i.length<=1)return void i.css(s.property,"");i.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"inline-flex"!==a&&(a="block");var o={display:a};o[s.property]="",e.css(o),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),e.css("display","")})}i.each(function(){var e=t(this),a=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(a+=o(e.css("border-top-width"))+o(e.css("border-bottom-width")),a+=o(e.css("padding-top"))+o(e.css("padding-bottom"))),e.css(s.property,n-a+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(l/p*t("html").outerHeight(!0)),this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var a=t(this),o=a.attr("data-mh")||a.attr("data-match-height");e[o]=o in e?e[o].add(a):a}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(o,i){if(i&&"resize"===i.type){var n=t(window).width();if(n===e)return;e=n}o?-1===a&&(a=setTimeout(function(){s(i),a=-1},r._throttle)):s(i)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})}(jQuery);

if ((typeof Shopify) === 'undefined') { Shopify = {}; }
if (!Shopify.formatMoney) {
    Shopify.formatMoney = function(cents, format) {
        var value = '',
            placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
            formatString = (format || this.money_format);

        if (typeof cents == 'string') {
            cents = cents.replace('.','');
        }

        function defaultOption(opt, def) {
            return (typeof opt == 'undefined' ? def : opt);
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = defaultOption(precision, 2);
            thousands = defaultOption(thousands, ',');
            decimal   = defaultOption(decimal, '.');

            if (isNaN(number) || number == null) {
                return 0;
            }

            number = (number/100.0).toFixed(precision);

            var parts   = number.split('.'),
                dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                cents   = parts[1] ? (decimal + parts[1]) : '';

            return dollars + cents;
        }
        if(formatString != undefined) {
            switch(formatString.match(placeholderRegex)[1]) {
                case 'amount':
                    value = formatWithDelimiters(cents, 2);
                    break;
                case 'amount_no_decimals':
                    value = formatWithDelimiters(cents, 0);
                    break;
                case 'amount_with_comma_separator':
                    value = formatWithDelimiters(cents, 2, '.', ',');
                    break;
                case 'amount_no_decimals_with_comma_separator':
                    value = formatWithDelimiters(cents, 0, '.', ',');
                    break;
            }

            return formatString.replace(placeholderRegex, value);
        } else {
            return cents;
        }
    };
}

if (!Shopify.resizeImage) {
    Shopify.resizeImage=function(e,t){
        try{
            if("original"==t)
                return e;
            var n = e.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
            return n[1]+"_"+t+"."+n[2]
        } catch(r) {
            return e;
        }
    }
}

window.timber = window.timber || {};

timber.init = function () {
  
  timber.cacheSelectors();
  timber.loginForms();
};

timber.cacheSelectors = function () {
  timber.cache = {
    $html                    : $('html'),
    $body                    : $(document.body),
    $navigation              : $('#AccessibleNav'),
    $mobileSubNavToggle      : $('.mobile-nav__toggle'),
    $changeView              : $('.change-view'),
    $productImage            : $('#ProductPhotoImg'),
    $thumbImages             : $('#ProductThumbs').find('a.product-single__thumbnail'),
    $recoverPasswordLink     : $('#RecoverPassword'),
    $hideRecoverPasswordLink : $('#HideRecoverPasswordLink'),
    $recoverPasswordForm     : $('#RecoverPasswordForm'),
    $customerLoginForm       : $('#CustomerLoginForm'),
    $passwordResetSuccess    : $('#ResetSuccess')
  };
};

timber.loginForms = function() {
  function showRecoverPasswordForm() {
    timber.cache.$recoverPasswordForm.removeClass('hide');
    timber.cache.$recoverPasswordForm.show();
    timber.cache.$customerLoginForm.addClass('hide');
    timber.cache.$customerLoginForm.hide();
  }

  function hideRecoverPasswordForm() {
    timber.cache.$recoverPasswordForm.addClass('hide');
    timber.cache.$recoverPasswordForm.hide();
    timber.cache.$customerLoginForm.removeClass('hide');
    timber.cache.$customerLoginForm.show();
  }

  timber.cache.$recoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    showRecoverPasswordForm();
  });

  timber.cache.$hideRecoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    hideRecoverPasswordForm();
  });

  // Allow deep linking to recover password form
  if (timber.getHash() == '#recover') {
    showRecoverPasswordForm();
  }
};

timber.getHash = function () {
  return window.location.hash;
};

timber.qtySelectors = function() {
    var numInputs = $('input[type="number"]');

    if (numInputs.length) {
        numInputs.each(function() {
            var $el = $(this),
                currentQty = $el.val(),
                inputName = $el.attr('name'),
                inputId = $el.attr('id');

            var itemAdd = currentQty + 1,
                itemMinus = currentQty - 1,
                itemQty = currentQty;

            var source   = $("#JsQty").html(),
                template = Handlebars.compile(source),
                data = {
                    key: $el.data('id'),
                    itemQty: itemQty,
                    itemAdd: itemAdd,
                    itemMinus: itemMinus,
                    inputName: inputName,
                    inputId: inputId
                };
            $el.after(template(data)).remove();
        });

        $('.js-qty__adjust').on('click', function() {
            var $el = $(this),
                id = $el.data('id'),
                $qtySelector = $el.siblings('.js-qty__num'),
                qty = parseInt($qtySelector.val().replace(/\D/g, ''));

            if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {

            } else {
                qty = 1;
            }

            if ($el.hasClass('js-qty__adjust--plus')) {
                qty += 1;
            } else {
                qty -= 1;
                if (qty <= 1) qty = 1;
            }

            $qtySelector.val(qty);
        });
    }
};

timber.setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

timber.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

timber.eraseCookie = function (name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

timber.modalBox = function () {
    var modal;
    var modalHTML;
    var btn = $("[data-toggle='modal']");
    var close = $("[data-toggle='close-modal']");

    $(btn).click(function(e){
        e.preventDefault();
        modal = $($(this).data('target'));
        if($(window).width() > 767){
            var width = "600px";
        } else {
            var width = "90%";
        }
        $(modal).find('.modal-content').css('width', width);
        $(modal).addClass("in");
        modalHTML = $(this).data('target').replace("#", "");
    });

    $(close).click(function(e){
        e.preventDefault();
        $(modal).removeClass("in");
    });


    window.onclick = function(event) {
        if (event.target.id == modalHTML) {
            $(modal).removeClass("in");
        }
    }
};

timber.modalBoxSize = function () {
    var modal;
    var modalHTML;
    var btn = $("[data-toggle='modal_size']");
    var close = $("[data-toggle='close-modal']");

    $(btn).click(function(e){
        e.preventDefault();
        modal = $($(this).data('target'));
        if($(window).width() > 767){
            var width = "600px";
        } else {
            var width = "90%";
        }
        $(modal).find('.modal-content').css('width', width);
        $(modal).addClass("in");
        modalHTML = $(this).data('target').replace("#", "");
    });

    $(close).click(function(e){
        e.preventDefault();
        $(modal).removeClass("in");
    });

    window.onclick = function(event) {
        if (event.target.id == modalHTML) {
            $(modal).removeClass("in");
        }
    }
};



timber.estimateTimer = function () {
    if ($('#estimateTimer').length) {
        var startTime = new Date();
        var endTime = new Date(startTime.getFullYear()+"/"+(startTime.getMonth()+1)+"/"+startTime.getDate()+' 16:00:00');
        var timer_time = Math.round((endTime - startTime) / 60000);

        var tomorrow = new Date();
        var date_one_days = $('#estimateTimer').parent("b").find(".dateEstimate").data("date");
        //tomorrow.setDate(tomorrow.getDate() + $('#estimateTimer').parent("b").find(".dateEstimate").data("date"));

        if(timer_time <= 0){
            endTime.setDate(endTime.getDate() + 1);
            timer_time = Math.round((endTime - startTime) / 60000);
            tomorrow.setDate(tomorrow.getDate() + 1);
        }

        var excludeDays = "SUN";
        excludeDays = excludeDays.split(" ");
        $.each(excludeDays, function(key, daySingle){
            if(daySingle === "SUN"){
                excludeDays[key] = 0;
            }
            if(daySingle === "MON"){
                excludeDays[key] = 1;
            }
            if(daySingle === "TUE"){
                excludeDays[key] = 2;
            }
            if(daySingle === "WED"){
                excludeDays[key] = 3;
            }
            if(daySingle === "THU"){
                excludeDays[key] = 4;
            }
            if(daySingle === "FRI"){
                excludeDays[key] = 5;
            }
            if(daySingle === "SAT"){
                excludeDays[key] = 6;
            }
        });
        if(excludeDays.length >= 7){
            excludeDays = [];
        }
        var count_one = 0;
        do {
            tomorrow.setDate(tomorrow.getDate() + 1);
            if($.inArray(tomorrow.getDay(), excludeDays) <= -1){
                count_one++;
            }
        } while($.inArray(tomorrow.getDay(), excludeDays) > -1 || count_one < date_one_days);
        var fmt = new DateFmt();
        $(".dateEstimate").html(fmt.format(tomorrow,"%w %n %d"));

        var hours = Math.floor(timer_time / 60);
        var minutes = Math.floor(timer_time % 60);
        var day_wek = fmt.format(tomorrow,"%y") +' '+hours+':'+minutes;
        var countDownDate = new Date(day_wek).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Output the result in an element with id="demo"
            document.getElementById("estimateTimer").innerHTML =hours + " Hours " + minutes + " Minutes";

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                //document.getElementById("estimateTimer").innerHTML = "EXPIRED";
            }
        }, 100);


    }
};

timber.validateQty = function (qty) {
    if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
        // We have a valid number!
    } else {
        // Not a number. Default to 1.
        qty = 1;
    }
    return qty;
};

$(document).on('change', '.addCart-product-qty .ajaxcart__qty-num', function() {
    var line = $(this).data('line');
    var qty = $(this).val();
    setTimeout(function() {
        var $body = $(document.body),
            params = {
                type: 'POST',
                url: '/cart/change.js',
                data: 'quantity=' + qty + '&line=' + line,
                dataType: 'json',
                success: function(cart) {
                    $.ajax({
                        type: 'GET',
                        url: '/cart.js',
                        cache: false,
                        dataType: 'json',
                        success: function(cart) {
                            timber.cartUpdatePopupModel(cart);
                        }
                    });
                }
            };
        jQuery.ajax(params);
    }, 250);
});

timber.geoIP = function () {
    $(function(){
        var countriesWithCurrency = {"AD": "EUR", "AE": "AED", "AF": "AFN", "AG": "XCD", "AI": "XCD", "AL": "ALL", "AM": "AMD", "AO": "AOA", "AR": "ARS", "AS": "USD", "AT": "EUR", "AU": "AUD", "AW": "AWG", "AX": "EUR", "AZ": "AZN", "BA": "BAM", "BB": "BBD", "BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BQ": "USD", "BR": "BRL", "BS": "BSD", "BT": "INR", "BV": "NOK", "BW": "BWP", "BY": "BYR", "BZ": "BZD", "CA": "CAD", "CC": "AUD", "CD": "CDF", "CF": "XAF", "CG": "XAF", "CH": "CHE", "CI": "XOF", "CK": "NZD", "CL": "CLF", "CM": "XAF", "CN": "CNY", "CO": "COP", "CR": "CRC", "CU": "CUC", "CV": "CVE", "CW": "ANG", "CX": "AUD", "CY": "EUR", "CZ": "CZK", "DE": "EUR", "DJ": "DJF", "DK": "DKK", "DM": "XCD", "DO": "DOP", "DZ": "DZD", "EC": "USD", "EE": "EUR", "EG": "EGP", "EH": "MAD", "ER": "ERN", "ES": "EUR", "ET": "ETB", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "FR": "EUR", "GA": "XAF", "GB": "GBP", "GD": "XCD", "GE": "GEL", "GF": "EUR", "GG": "GBP", "GH": "GHS", "GI": "GIP", "GL": "DKK", "GM": "GMD", "GN": "GNF", "GP": "EUR", "GQ": "XAF", "GR": "EUR", "GS": "GBP", "GT": "GTQ", "GU": "USD", "GW": "XOF", "GY": "GYD", "HK": "HKD", "HM": "AUD", "HN": "HNL", "HR": "HRK", "HT": "HTG", "HU": "HUF", "ID": "IDR", "IE": "EUR", "IL": "ILS", "IM": "GBP", "IN": "INR", "IO": "USD", "IQ": "IQD", "IR": "IRR", "IS": "ISK", "IT": "EUR", "JE": "GBP", "JM": "JMD", "JO": "JOD", "JP": "JPY", "KE": "KES", "KG": "KGS", "KH": "KHR", "KI": "AUD", "KM": "KMF", "KN": "XCD", "KP": "KPW", "KR": "KRW", "KW": "KWD", "KY": "KYD", "KZ": "KZT", "LA": "LAK", "LB": "LBP", "LC": "XCD", "LI": "CHF", "LK": "LKR", "LR": "LRD", "LS": "LSL", "LT": "LTL", "LU": "EUR", "LV": "EUR", "LY": "LYD", "MA": "MAD", "MC": "EUR", "MD": "MDL", "ME": "EUR", "MF": "EUR", "MG": "MGA", "MH": "USD", "MK": "MKD", "ML": "XOF", "MM": "MMK", "MN": "MNT", "MO": "MOP", "MP": "USD", "MQ": "EUR", "MR": "MRO", "MS": "XCD", "MT": "EUR", "MU": "MUR", "MV": "MVR", "MW": "MWK", "MX": "MXN", "MY": "MYR", "MZ": "MZN", "NA": "NAD", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NP": "NPR", "NR": "AUD", "NU": "NZD", "NZ": "NZD", "OM": "OMR", "PA": "USD", "PE": "PEN", "PF": "XPF", "PG": "PGK", "PH": "PHP", "PK": "PKR", "PL": "PLN", "PM": "EUR", "PN": "NZD", "PR": "USD", "PS": "ILS", "PT": "EUR", "PW": "USD", "PY": "PYG", "QA": "QAR", "RE": "EUR", "RO": "RON", "RS": "RSD", "RU": "RUB", "RW": "RWF", "SA": "SAR", "SB": "SBD", "SC": "SCR", "SD": "SDG", "SE": "SEK", "SG": "SGD", "SH": "SHP", "SI": "EUR", "SJ": "NOK", "SK": "EUR", "SL": "SLL", "SM": "EUR", "SN": "XOF", "SO": "SOS", "SR": "SRD", "SS": "SSP", "ST": "STD", "SV": "USD", "SX": "ANG", "SY": "SYP", "SZ": "SZL", "TC": "USD", "TD": "XAF", "TF": "EUR", "TG": "XOF", "TH": "THB", "TJ": "TJS", "TK": "NZD", "TL": "USD", "TM": "TMT", "TN": "TND", "TO": "TOP", "TR": "TRY", "TT": "TTD", "TV": "AUD", "TW": "TWD", "TZ": "TZS", "UA": "UAH", "UG": "UGX", "UM": "USD", "US": "USD", "UY": "UYU", "UZ": "UZS", "VA": "EUR", "VC": "XCD", "VE": "VEF", "VG": "USD", "VI": "USD", "VN": "VND", "VU": "VUV", "WF": "XPF", "WS": "WST", "XK": "EUR", "YE": "YER", "YT": "EUR", "ZA": "ZAR", "ZM": "ZMK", "ZW": "ZWL"};
        var d = new Date();
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var n = weekday[d.getDay()];
        $('#DCTime').html(n);

        
    });
};

timber.recordLastCollection = function (options) {
    jQuery.cookie('shopify_collection', options.collection, { path: '/' });
};

function openpopup(url,name) {
    window.open(url,name,'width=500,height=300');
}

function DateFmt() {
    this.dateMarkers = {
        d:['getDate',function(v) { return ("0"+v).substr(-2,2)}],
        m:['getMonth',function(v) { return ("0"+v).substr(-2,2)}],
        n:['getMonth',function(v) {
            var mthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            return mthNames[v];
        }],
        w:['getDay',function(v) {
            var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return dayNames[v];
        }],
        y:['getFullYear'],
        H:['getHours',function(v) { return ("0"+v).substr(-2,2)}],
        M:['getMinutes',function(v) { return ("0"+v).substr(-2,2)}],
        S:['getSeconds',function(v) { return ("0"+v).substr(-2,2)}],
        i:['toISOString',null]
    };

    this.format = function(date, fmt) {
        var dateMarkers = this.dateMarkers
        var dateTxt = fmt.replace(/%(.)/g, function(m, p){
            var rv = date[(dateMarkers[p])[0]]()

            if ( dateMarkers[p][1] != null ) rv = dateMarkers[p][1](rv)

            return rv
        });

        return dateTxt
    }
}
$(timber.init);

/*============================================================================
  Ajax the add to cart experience by revealing it in a side drawer
  Plugin Documentation - http://shopify.github.io/Timber/#ajax-cart
  (c) Copyright 2015 Shopify Inc. Author: Carson Shold (@cshold). All Rights Reserved.

  This file includes:
    - Basic Shopify Ajax API calls
    - Ajax cart plugin

  This requires:
    - jQuery 1.8+
    - handlebars.min.js (for cart template)
    - modernizr.min.js
    - snippet/ajax-cart-template.liquid

  Customized version of Shopify's jQuery API
  (c) Copyright 2009-2015 Shopify Inc. Author: Caroline Schnapp. All Rights Reserved.
==============================================================================*/
if ((typeof ShopifyAPI) === 'undefined') { ShopifyAPI = {}; }

/*============================================================================
  API Helper Functions
==============================================================================*/
function attributeToString(attribute) {
    if ((typeof attribute) !== 'string') {
        attribute += '';
        if (attribute === 'undefined') {
            attribute = '';
        }
    }
    return jQuery.trim(attribute);
};

/*============================================================================
  API Functions
==============================================================================*/
ShopifyAPI.onCartUpdate = function(cart) {
    // alert('There are now ' + cart.item_count + ' items in the cart.');
};

ShopifyAPI.updateCartNote = function(note, callback) {
    var $body = $(document.body),
        params = {
            type: 'POST',
            url: '/cart/update.js',
            data: 'note=' + attributeToString(note),
            dataType: 'json',
            beforeSend: function() {
                $body.trigger('beforeUpdateCartNote.ajaxCart', note);
            },
            success: function(cart) {
                if ((typeof callback) === 'function') {
                    callback(cart);
                }
                else {
                    ShopifyAPI.onCartUpdate(cart);
                }
                $body.trigger('afterUpdateCartNote.ajaxCart', [note, cart]);
            },
            error: function(XMLHttpRequest, textStatus) {
                $body.trigger('errorUpdateCartNote.ajaxCart', [XMLHttpRequest, textStatus]);
                ShopifyAPI.onError(XMLHttpRequest, textStatus);
            },
            complete: function(jqxhr, text) {
                $body.trigger('completeUpdateCartNote.ajaxCart', [this, jqxhr, text]);
            }
        };
    jQuery.ajax(params);
};

ShopifyAPI.onError = function(XMLHttpRequest, textStatus) {
    var data = eval('(' + XMLHttpRequest.responseText + ')');
    if (!!data.message) {
        //alert(data.message + '(' + data.status  + '): ' + data.description);
    }
};

/*============================================================================
  POST to cart/add.js returns the JSON of the cart
    - Allow use of form element instead of just id
    - Allow custom error callback
==============================================================================*/
ShopifyAPI.addItemFromForm = function(form, callback, errorCallback, isProduct) {
    var flag_addcart = true;
    $('.product_properties').each(function(){
        var val = $(this).find('input').val();
        var val_charlimit = $(this).find('input').data('charlimit');
        if(val == "") {
            flag_addcart = false;
            $(this).find('input').addClass("ui-state-error");
            var topScroll = $(this).find('input').offset().top - 300;

            /*$(form).find(".sold-out-tooltip").addClass("sold-out-tooltip--show");

            setTimeout(function () {
                $(form).find(".sold-out-tooltip").removeClass("sold-out-tooltip--show");
            }, 1000);*/

            $('html, body').animate({
                scrollTop: (topScroll)
            }, 1000);
        } else {
            $(this).find('input').removeClass("ui-state-error");
            $(this).find('.error-limit').hide();
            if(val_charlimit != undefined) {
                if(val.length > val_charlimit){
                    flag_addcart = false;
                    $(this).find('input').addClass("ui-state-error");
                    $(this).find('.error-limit').html("Oops, we won't have space to print all that, try something shorter.").show();
                }
            }
        }
    });
    if(flag_addcart) {
        var $body = $(document.body),
            params = {
                type: 'POST',
                url: '/cart/add.js',
                data: jQuery(form).serialize(),
                dataType: 'json',
                beforeSend: function(jqxhr, settings) {
                    $body.trigger('beforeAddItem.ajaxCart', form);
                },
                success: function(line_item) {

                  
                    

                    
                    if ($(window).width() < 767) {
                        timber.RightDrawer.open();
                      
                    }

                    
                    

                    if ((typeof callback) === 'function') {
                        callback(line_item, form);
                    } else {
                        ShopifyAPI.onItemAdded(line_item, form);
                    }
                    $body.trigger('afterAddItem.ajaxCart', [line_item, form]);
                },
                error: function(XMLHttpRequest, textStatus) {
                    $(form).find(".sold-out-tooltip").removeClass("sold-out-tooltip--show");

                    setTimeout(function () {
                        $(form).find(".sold-out-tooltip").addClass("sold-out-tooltip--show");
                    }, 50);

                    if ((typeof errorCallback) === 'function') {
                        errorCallback(XMLHttpRequest, textStatus);
                    }
                    else {
                        ShopifyAPI.onError(XMLHttpRequest, textStatus);
                    }
                    $body.trigger('errorAddItem.ajaxCart', [XMLHttpRequest, textStatus]);
                },
                complete: function(jqxhr, text) {
                    $body.trigger('completeAddItem.ajaxCart', [this, jqxhr, text]);
                }
            };
        jQuery.ajax(params);
    }
};

// Get from cart.js returns the cart in JSON
ShopifyAPI.getCart = function(callback) {
    $(document.body).trigger('beforeGetCart.ajaxCart');
    $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                ShopifyAPI.onCartUpdate(cart);
            }
            $(document.body).trigger('afterGetCart.ajaxCart', cart);
        }
    });
};

// POST to cart/change.js returns the cart in JSON
ShopifyAPI.changeItem = function(line, quantity, callback) {
    var $body = $(document.body),
        params = {
            type: 'POST',
            url: '/cart/change.js',
            data: 'quantity=' + quantity + '&line=' + line,
            dataType: 'json',
            beforeSend: function() {
                $body.trigger('beforeChangeItem.ajaxCart', [line, quantity]);
            },
            success: function(cart) {
                if ((typeof callback) === 'function') {
                    callback(cart);
                } else {
                    ShopifyAPI.onCartUpdate(cart);
                }
                $body.trigger('afterChangeItem.ajaxCart', [line, quantity, cart]);
            },
            error: function(XMLHttpRequest, textStatus) {
                $body.trigger('errorChangeItem.ajaxCart', [XMLHttpRequest, textStatus]);
                ShopifyAPI.onError(XMLHttpRequest, textStatus);
            },
            complete: function(jqxhr, text) {
                $body.trigger('completeChangeItem.ajaxCart', [this, jqxhr, text]);
            }
        };
    jQuery.ajax(params);
};

/*============================================================================
  Ajax Shopify Add To Cart
==============================================================================*/
var ajaxCart = (function(module, $) {

    'use strict';

    // Public functions
    var init, loadCart;

    // Private general variables
    var settings, isUpdating, $body;

    // Private plugin variables
    var $formContainer, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer, $drawerContainer;

    // Private functions
    var updateCountPrice, formOverride, itemAddedCallback, itemErrorCallback, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, createQtySelectors, qtySelectors, validateQty;

    /*============================================================================
    Initialise the plugin and define global options
  ==============================================================================*/
    init = function (options) {

        // Default settings
        settings = {
            formSelector       : 'form[action^="/cart/add"]',
            cartContainer      : '#CartContainer',
            addToCartSelector  : 'input[type="submit"]',
            cartCountSelector  : null,
            cartCostSelector   : null,
            moneyFormat        : '',
            disableAjaxCart    : false,
            enableQtySelectors : true,
            isProduct : true,
            lastItemRemoved : -1
        };
        // Override defaults with arguments
        $.extend(settings, options);

        // Select DOM elements
        $formContainer     = $(settings.formSelector);
        $cartContainer     = $(settings.cartContainer);
        $addToCart         = $formContainer.find(settings.addToCartSelector);
        $cartCountSelector = $(settings.cartCountSelector);
        $cartCostSelector  = $(settings.cartCostSelector);

        // General Selectors
        $body = $(document.body);

        // Track cart activity status
        isUpdating = false;

        // Setup ajax quantity selectors on the any template if enableQtySelectors is true
        if (settings.enableQtySelectors) {
            qtySelectors();
        }

        // Take over the add to cart form submit action if ajax enabled
        if (!settings.disableAjaxCart && $addToCart.length) {
            formOverride();
        }

        // Run this function in case we're using the quantity selector outside of the cart
        adjustCart();
    };

    loadCart = function () {
        $body.addClass('drawer--is-loading');
        ShopifyAPI.getCart(cartUpdateCallback);
    };

    updateCountPrice = function (cart) {
        if ($cartCountSelector) {
            $cartCountSelector.html(cart.item_count).removeClass('hidden-count');

            if (cart.item_count === 0) {
                $cartCountSelector.addClass('hidden-count');
            }
        }
        if ($cartCostSelector) {
            $cartCostSelector.html(Shopify.formatMoney(cart.total_price, settings.moneyFormat));
        }
    };

    formOverride = function () {
        $formContainer.on('submit', function(evt) {
            evt.preventDefault();

            $addToCart = $(this).find('.AddToCart');

            // Modifying text and classes of ATC button
            $addToCart.removeClass('is-added').addClass('is-adding');
            
            $addToCart.find('span#AddToCartText').html('Adding to cart ...');
            

            // Remove any previous quantity errors
            $('.qty-error').remove();
            ShopifyAPI.addItemFromForm(evt.target, itemAddedCallback, itemErrorCallback, settings.isProduct);
        });
    };

    itemAddedCallback = function (product) {
        // $addToCart.find(".sold-out-tooltip").removeClass('sold-out-tooltip--show');

        // Modifying text and classes of ATC button
        setTimeout(function () {
            $addToCart.removeClass('is-adding').addClass('is-added');
            
            $addToCart.find('span#AddToCartText').html('Add to Cart');
            
        }, 1000);

        setTimeout(function () {
            $addToCart.removeClass('is-adding is-added');
            
            $addToCart.find('span#AddToCartText').html('Add to cart');
            
        }, 2000);

        $('#quick-view').find('.modal-body').html("");
        $('#quick-view').removeClass("in");
        ShopifyAPI.getCart(cartUpdateCallback);
        $('html').removeClass('fixx');
           $('.product-slideup').removeClass('active');
        $('body').removeClass('search-overlay-show');
    };

    itemErrorCallback = function (XMLHttpRequest, textStatus) {
        var data = eval('(' + XMLHttpRequest.responseText + ')');

        $addToCart.removeClass('is-adding is-added');
        // $addToCart.find(".sold-out-tooltip").removeClass('sold-out-tooltip--show');

        if (!!data.message) {
            if (data.status == 422) {
                $formContainer.after('<div class="errors qty-error">'+ data.description +'</div>')
            }
        }
    };

    cartUpdateCallback = function (cart) {
        // Update quantity and price
        updateCountPrice(cart);
        buildCart(cart);
    };

    buildCart = function (cart) {
        // Start with a fresh cart div
        $cartContainer.empty();

        // Show empty cart
        if (cart.item_count === 0) {
            $cartContainer.append('<p>' + "Your Cart is Empty." + '</p>');
            cartCallback(cart);
            jQuery('.AddToCart_hide_button').show();
            jQuery('.AddToCart_show_button').hide();
            return;
        }

        // Handlebars.js cart layout
        var items = [],
            item = {},
            data = {},
            source = $("#CartTemplate").html(),
            template = Handlebars.compile(source);

        // Add each item to our handlebars.js data
        $.each(cart.items, function(index, cartItem) {
            if (cartItem.image != null){
                var prodImg = cartItem.image.replace(/(\.[^.]*)$/, "_small$1").replace('http:', '');
            } else {
                var prodImg = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
            }

            item = {
                key: cartItem.key,
                line: index + 1, // Shopify uses a 1+ index in the API
                url: cartItem.url,
                img: prodImg,
                name: cartItem.product_title,
                variation: cartItem.variant_title,
                properties: cartItem.properties,
                itemAdd: cartItem.quantity + 1,
                itemMinus: cartItem.quantity - 1,
                itemQty: cartItem.quantity,
                price: Shopify.formatMoney(cartItem.price, settings.moneyFormat),
                vendor: cartItem.vendor,
                linePrice: Shopify.formatMoney(cartItem.line_price, settings.moneyFormat),
                originalLinePrice: Shopify.formatMoney(cartItem.original_line_price, settings.moneyFormat),
                discounts: cartItem.discounts,
                discountsApplied: cartItem.line_price === cartItem.original_line_price ? false : true
            };

            items.push(item);
        });

        // Gather all cart data and add to DOM
        data = {
            items: items,
            note: cart.note,
            totalPrice: Shopify.formatMoney(cart.total_price, settings.moneyFormat),
            totalCartDiscount: cart.total_discount === 0 ? 0 : "You're saving [savings]".replace('[savings]', Shopify.formatMoney(cart.total_discount, settings.moneyFormat)),
            totalCartDiscountApplied: cart.total_discount === 0 ? false : true
        }

        $cartContainer.append(template(data));
        cartCallback(cart);
        
    };

    cartCallback = function(cart) {
        $body.removeClass('drawer--is-loading');
        $body.trigger('afterCartLoad.ajaxCart', cart);

        if (window.Shopify && Shopify.StorefrontExpressButtons) {
            Shopify.StorefrontExpressButtons.initialize();
        }
    };

    adjustCart = function () {
        // Delegate all events because elements reload with the cart
        // Add or remove from the quantity
        $body.on('click', '.ajaxcart__qty-adjust', function() {
            if (isUpdating) {
                return;
            }

            var $el = $(this),
                line = $el.data('line'),
                $qtySelector = $el.siblings('.ajaxcart__qty-num'),
                qty = parseInt($qtySelector.val().replace(/\D/g, ''));

            var qty = validateQty(qty);

            // Add or subtract from the current quantity
            if ($el.hasClass('ajaxcart__qty--plus')) {
                qty += 1;
            } else {
                qty -= 1;
                if (qty <= 0) qty = 0;
            }

            // If it has a data-line, update the cart.
            // Otherwise, just update the input's number
            if (line) {
                updateQuantity(line, qty);
            } else {
                $qtySelector.val(qty);
            }
        });

        // Update quantity based on input on change
        $body.on('change', '.ajaxcart__qty-num', function() {
            if (isUpdating) {
                return;
            }

            var $el = $(this),
                line = $el.data('line'),
                qty = parseInt($el.val().replace(/\D/g, ''));

            var qty = validateQty(qty);

            // If it has a data-line, update the cart
            if (line) {
                updateQuantity(line, qty);
            }
        });

        // Prevent cart from being submitted while quantities are changing
        $body.on('submit', 'form.ajaxcart', function(evt) {
            if (isUpdating) {
                evt.preventDefault();
            }
        });

        // Highlight the text when focused
        $body.on('focus', '.ajaxcart__qty-adjust', function() {
            var $el = $(this);
            setTimeout(function() {
                $el.select();
            }, 50);
        });

        $body.on('click', '.removeLineCartPop', function(e){
            e.preventDefault();
            var line = $(this).data('line');
            var variant = $(this).data('variant');
            if(variant != settings.lastItemRemoved){
                settings.lastItemRemoved = variant;
                ShopifyAPI.changeItem(line, 0, itemAddedCallback);
            }
        });

        $body.on('click', '.ajaxcart_remove', function(e){
            e.preventDefault();
            var line = $(this).data('line');
            updateQuantity(line, 0);
        });

        function updateQuantity(line, qty) {
            isUpdating = true;

            // Add activity classes when changing cart quantities
            var $row = $('.ajaxcart__row[data-line="' + line + '"]').addClass('is-loading');

            if (qty === 0) {
                $row.parent().addClass('is-removed');
            }

            // Slight delay to make sure removed animation is done
            setTimeout(function() {
                ShopifyAPI.changeItem(line, qty, adjustCartCallback);
            }, 250);
        }

        // Save note anytime it's changed
        $body.on('change', 'textarea[name="note"]', function() {
            var newNote = $(this).val();

            // Update the cart note in case they don't click update/checkout
            ShopifyAPI.updateCartNote(newNote, function(cart) {});
        });
    };

    adjustCartCallback = function (cart) {
        // Update quantity and price
        updateCountPrice(cart);

        // Reprint cart on short timeout so you don't see the content being removed
        setTimeout(function() {
            isUpdating = false;
            ShopifyAPI.getCart(buildCart);
        }, 150)
    };

    createQtySelectors = function() {
        // If there is a normal quantity number field in the ajax cart, replace it with our version
        if ($('input[type="number"]', $cartContainer).length) {
            $('input[type="number"]', $cartContainer).each(function() {
                var $el = $(this),
                    currentQty = $el.val();

                var itemAdd = currentQty + 1,
                    itemMinus = currentQty - 1,
                    itemQty = currentQty;

                var source   = $("#AjaxQty").html(),
                    template = Handlebars.compile(source),
                    data = {
                        key: $el.data('id'),
                        itemQty: itemQty,
                        itemAdd: itemAdd,
                        itemMinus: itemMinus
                    };

                // Append new quantity selector then remove original
                $el.after(template(data)).remove();
            });
        }
    };

    qtySelectors = function() {
        // Change number inputs to JS ones, similar to ajax cart but without API integration.
        // Make sure to add the existing name and id to the new input element
        var numInputs = $('input[type="number"]:not([data-no-replace])');

        if (numInputs.length) {
            numInputs.each(function() {
                var $el = $(this),
                    currentQty = $el.val(),
                    inputName = $el.attr('name'),
                    inputId = $el.attr('id');

                var itemAdd = currentQty + 1,
                    itemMinus = currentQty - 1,
                    itemQty = currentQty;

                var source   = $("#JsQty").html(),
                    template = Handlebars.compile(source),
                    data = {
                        key: $el.data('id'),
                        itemQty: itemQty,
                        itemAdd: itemAdd,
                        itemMinus: itemMinus,
                        inputName: inputName,
                        inputId: inputId
                    };

                // Append new quantity selector then remove original
                $el.after(template(data)).remove();
            });

            // Setup listeners to add/subtract from the input
            $('.js-qty__adjust').on('click', function() {
                var $el = $(this),
                    id = $el.data('id'),
                    $qtySelector = $el.siblings('.js-qty__num'),
                    qty = parseInt($qtySelector.val().replace(/\D/g, ''));

                var qty = validateQty(qty);

                // Add or subtract from the current quantity
                if ($el.hasClass('js-qty__adjust--plus')) {
                    qty += 1;
                } else {
                    qty -= 1;
                    if (qty <= 1) qty = 1;
                }

                // Update the input's number
                $qtySelector.val(qty);
            });
        }
    };

    validateQty = function (qty) {
        if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
            // We have a valid number!
        } else {
            // Not a number. Default to 1.
            qty = 1;
        }
        return qty;
    };

    module = {
        init: init,
        load: loadCart
    };

    return module;

}(ajaxCart || {}, jQuery));

timber.geoIP();


function hide_goods_in_cart (){
    $.getJSON('/cart.js', function (cart, textStatus) {
        //Setup free shipping header
        var product_ids_in_cart = [];
        $.each(cart.items, function(k, v) {
            product_ids_in_cart[k] = v.id;
        });

        $.each($('.r_addtocartbutton button'), function(k, v) {
            var btn = $(this);
            $.each(product_ids_in_cart, function (x, y) {
                if ($(v).attr('onclick').indexOf(y) != -1) {
                    btn.attr('disabled', 'disabled' ).find('.r_AddToCartText').text('In cart').css('color', '#823964');
                }
            });
        });
 
  

    });
}

document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    });

function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" width="100" height="100" loading="lazy" />',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}
$(".nav-tabs a").click(function(e){
  e.preventDefault();
  var tabActive = $(this).attr('href');
  $(".tab-pane").removeClass('active').removeClass('in');
  $(tabActive).addClass('active').addClass('in');
});





