function getAccordion(element_id, screen) {
  $(window).resize(function () { location.reload(); });
  if ($(window).width() < screen) {
    var concat = '';
    obj_tabs = $( element_id + " li" ).toArray();
    obj_cont = $( ".tab-content .tab-pane" ).toArray();
    jQuery.each( obj_tabs, function( n, val ) {
      concat += '<div class="product-mobile-tabs__tab js-product-mobile-tab">';
      concat += '<h4 class="product-mobile-tabs__tab-heading js-product-mobile-tab-heading">' + val.innerText + '</h4>';
      concat += '<div class="product-mobile-tabs__tab-body js-product-mobile-tab-body">' + obj_cont[n].innerHTML + '</div>';
      concat += '</div>';
    });
    $("#accordion").html(concat);
    $("#accordion").find('.js-product-mobile-tab:first').addClass("product-mobile-tabs__tab--active");
    $("#accordion").find('.js-product-mobile-tab:first .product-mobile-tabs__tab-body').attr("style","display: block;");
    $(element_id).remove();
    $(".tab-content").remove();

    const tabs = document.querySelectorAll(".js-product-mobile-tab");
    let width = $(window).width();

    if (!tabs.length) {
      return;
    }

    const activeClass = "product-mobile-tabs__tab--active";
    let timeoutId = null;

    tabs.forEach(function (tab) {
      const heading = tab.querySelector(".js-product-mobile-tab-heading");
      const body = tab.querySelector(".js-product-mobile-tab-body");

      heading.addEventListener("click", function () {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        hideTabs(tab);

        $(body).stop(true).slideToggle();

        if (tab.classList.contains(activeClass)) {
          tab.classList.remove(activeClass);
        } else {
          tab.classList.add(activeClass);
        }

        if (tab.classList.contains(activeClass)) {
          timeoutId = setTimeout(function () {
            $("html, body").animate({
              scrollTop: $(tab).offset().top - ($(".header.perma-sticky").height() || 0) - 10
            }, 500);
          }, 500);
        }
      });
    });

    window.addEventListener("resize", hideTabs);

    function hideTabs(passedTab) {
      if ($(window).width() !== width) {
        tabs.forEach((tab) => {
          if (passedTab && tab === passedTab) {
            return;
          }

          const body = tab.querySelector(".js-product-mobile-tab-body");

          $(body).stop(true).slideUp(400, function () {
            $(this).css("height", "auto");
          });

          tab.classList.remove(activeClass);
        });

        width = $(window).width();
      }
    }
  }	
}