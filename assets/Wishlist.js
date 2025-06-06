!function (i, t) {
    var s = t(".wishlist-btn"), e = t(".wishlist-tile-container"), a = e.length,
        l = localStorage.getItem("user_wishlist") || [];
    l.length > 0 && (l = JSON.parse(localStorage.getItem("user_wishlist")));
    var o = function () {
        window.location.href.indexOf("pages/wishlist") > -1 && (e.each(function () {
            var i = t(this).attr("data-product-id");
            -1 === l.indexOf(i) && (t(this).remove(), a--)
        }), t(".wishlist-loader").fadeOut(2e3, function () {
            t(".wishlist-grid").addClass("is_visible"), t(".wishlist-hero").addClass("is_visible"), 0 == a ? t(".wishlist-grid--empty-list").addClass("is_visible") : t(".wishlist-grid--empty-list").hide(), t(".wishlist-grid").fadeIn("slow")
        }))
    }, n = function () {
        s.on("mouseleave", function (i) {
            i.stopPropagation(), t(this).next(".tooltip").remove(), setTimeout(() => {
                t("#fake_input").blur()
            }, 10)
        }), s.click(function (i) {
            var s;
            i.preventDefault(), function (i) {
                var s = t(i).attr("data-product-id");
                if (t(i).hasClass("is-active")) {
                    var e = l.indexOf(s);
                    l.splice(e, 1), localStorage.setItem("user_wishlist", JSON.stringify(l))
                } else l.push(s), localStorage.setItem("user_wishlist", JSON.stringify(l));
                console.log(JSON.stringify(l))
            }(this)
        })
    }, h = function (i) {
        t(".wishlist_mobile").removeClass("wishlist_mobile--show");

        if (t(window).width() < 1025 && (t(i).hasClass("is-active"))) {
            t(".wishlist_mobile .wishlist_text").text("Added to wishlist");
        } else {
            t(".wishlist_mobile .wishlist_text").text("Removed from wishlist");
        }

        setTimeout(function () {
            t(".wishlist_mobile").addClass("wishlist_mobile--show");
        }, 50);
    };
    i.init = function () {
        n(), s.each(function () {
            var i = t(this).attr("data-product-id");
            l.indexOf(i) > -1 && (t(this).addClass("is-active"), t(".action--wishlist span").html(''), t(".action--wishlist").attr("data-original-title", "Remove from Wishlist"))
        }), o()
    }, t(".action--wishlist").click(function () {
        var i = t(this).attr("data-product-id");
        t(".wishlist-tile-container[data-product-id=" + i + "]").hide()
    })
}(window.Wishlist = window.Wishlist || {}, jQuery);
