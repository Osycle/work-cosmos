"use strict";

(function() {
  $(function() {
  

    
    // AOS
    AOS.init({
      offset: 100,
      once: true,
      duration: 1100,
      delay: 150
    });
    setTimeout(function() { AOS.refresh(); }, 1);

    //SELECT2
    $(".js-select").select2({
      placeholder: "Выберите...",
      allowClear: false
    });
    $(".js-select.search-hide").select2({
      minimumResultsForSearch: Infinity 
    });
    // FANCYBOX
    if ($("[data-fancybox='gallery']").length != 0)
      $("[data-fancybox='gallery']").fancybox({
        afterShow: function(instance, current) {},
        transitionEffect: "zoom-in-out"
      });
    // ELEVATEZOOM
    if( !checkSm() )
      var x = $("[data-zoom-image]:not([group])").elevateZoom({
        scrollZoom : true,
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 500,
        lensFadeIn: 300,
        lensFadeOut: 300,
        //cursor: 'pointer', 
        tint:true, 
        tintColour:'#000', 
        tintOpacity:0.5,
        //zoomType        : "lens",
        //lensShape : "round",
        //lensSize    : 200,
        imageCrossfade: true, 
        easing : true
      });


    //MIN-MENU
    $("#min-menu").mmenu(
      {
        extensions: [
          "pagedim-black", // wrapper-bg black
          "theme-dark",
          //"fullscreen",
          //"listview-50",
          //"fx-panels-slide-up",
          //"fx-listitems-drop",
          "border-offset",
          "position-front",
          "position-right"
        ],
        navbar: {
          title: "Меню"
        },
        navbars: [
          {
            height: 2,
            content: [
              '<div class="close-btn close-content bar">' +
                '<a  href="#page" ><span class="icon-bar"></span><span class="icon-bar"></span></a>' +
              '</div>'
            ]
          },
          {
            content: ["prev", "title"]
          }
        ]
      },
      {}
    );

    //FLIKITY
    function flickityPrevNext(className) {
      var carouselWrapper = $(className);
      for (var i = 0; i < carouselWrapper.length; i++) {
        var crs = $(carouselWrapper[i]); 
        var carousel = crs.find(".carousel-items");
        var carouselPrevNext = crs.find(".carousel-prev-next");
        var btnNext = carouselPrevNext.find(".next");
        var btnPrev = carouselPrevNext.find(".prev");
        var flkty = carousel.data("flickity");
        var selected;
        console.log( carousel )
        btnNext.on("click", function() {
          carousel.flickity("next", true);
        });

        btnPrev.on("click", function() {
          carousel.flickity("previous", true);
        });
        carousel.on("select.flickity", function() {
          selected = $(flkty.selectedElement);
          selected
            .siblings()
            .addBack()
            .removeClass("is-next is-prev");
          selected.next().addClass("is-next");
          selected.prev().addClass("is-prev");
        });
      }
    }

    var arrowStyle = {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 40,
      x3: 30
    };

    var brandMenu = $('.brands-menu-carousel .carousel-items').flickity({
      imagesLoaded: true,
      autoPlay: false,
      arrowShape: arrowStyle,
      initialIndex: 0,
      prevNextButtons: false,
      draggable: false,
      friction: 1,
      selectedAttraction: 1,
      wrapAround: true, 
      pageDots: false,
      contain: true,
      percentPosition: true,
      cellAlign: 'center'
    });

    $('.button-group').on( 'click', 'li', function() {
      var that = $(this);
      var selector = that.attr('data-selector');
      that.addClass("is-selected");
      that.siblings().removeClass("is-selected");

      console.log( $(this).siblings() );
      brandMenu.flickity( 'selectCell', selector );
    });

    //short-partners-carousel
    if( $(".short-partners-carousel .carousel-items figure").length > 3 )
      $('.short-partners-carousel .carousel-items').flickity({
        imagesLoaded: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        arrowShape: arrowStyle,
        initialIndex: 2,
        prevNextButtons: true,
        draggable: true,
        wrapAround: true,	
        pageDots: false,
        contain: false,
        percentPosition: true,
        cellAlign: 'center'
      });
    //producitons-carousel
    $('.productions-carousel .carousel-items').map(function(i, el){
      var fct = $(el).flickity({
        imagesLoaded: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        lazyLoad: true,
        arrowShape: arrowStyle,
        setGallerySize: true,
        initialIndex: 1,
        prevNextButtons: true,
        draggable: false,
        resize: false,
        wrapAround: true, 
        pageDots: false,
        contain: false,
        percentPosition: true,
        cellAlign: 'center'
      })
      //TODO
      var fctData = fct.data("flickity");
      $(fct).on( 'ready.flickity', function() {
        console.log('Flickity ready');
      });
      $(document).on("click", "[flickity='resize']",function(){
        setTimeout(function(){ 
          fct.flickity('resize');
        },200)
      })
    })
    //short-reviews-carousel
    if( $(".short-reviews-carousel .carousel-items figure").length > 1 )
      $('.short-reviews-carousel .carousel-items').flickity({
        imagesLoaded: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        arrowShape: arrowStyle,
        initialIndex: 1,
        prevNextButtons: false,
        draggable: true,
        wrapAround: false,  
        pageDots: false,
        contain: false,
        percentPosition: true,
        cellAlign: 'center'
      });
    flickityPrevNext( $('.short-reviews-carousel') );

    //wholesalers-carousel
    $(".wholesalers-carousel .carousel-items").flickity({
        imagesLoaded: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        arrowShape: arrowStyle,
        initialIndex: 1,
        friction: 1,
        selectedAttraction: 1,
        prevNextButtons: true,
        draggable: checkSm(),
        wrapAround: true,
        pageDots: true,
        contain: false,
        percentPosition: true,
        cellAlign: "center"
      }
    );






    window.carouselArticle = function() {
      if ($(".carousel-article").length >= 0) {
        var carouselMain = $(".carousel-article .carousel-main"),
          carouselNav = $(".carousel-article .carousel-nav");

        for (var i = 0; i < carouselMain.length; i++) {
          var crs = $(carouselMain)
            .eq(i)
            .flickity({
              imagesLoaded: true,
              prevNextButtons: false,
              cellAlign: "center",
              bgLazyLoad: 1,
              friction: 1,
              selectedAttraction: 1,
              initialIndex: 0,
              draggable: true,
              contain: true,
              pageDots: false
            });
          var flkty = crs.data("flickity");

          //ГК
          crs.on( 'settle.flickity', function(e) {
            $(flkty.selectedElement).siblings().css("pointer-events", "none");
            var selecedIndex =  carouselMain.find(".carousel-cell.is-selected").index()+1;
            
            console.log(this, e);
            var zoomContainer = $(".zoomContainer") || null
            if( !zoomContainer )
              return;
            zoomContainer.removeClass("is-selected");
            zoomContainer.filter("[zoomitem='"+selecedIndex+"']").addClass("is-selected");
            if( !zoomContainer.hasClass("zoom-image") )
              zoomContainer.map(function(i, el){
                $(el).addClass("zoom-image")
                if(i === 0)
                  $(el).addClass("is-selected")                

                console.log($(el), i)
                $(el).attr( "zoomitem", (i+1) )
              })


          })
          crs.on( 'select.flickity', function(e) {
            $(flkty.selectedElement).css("pointer-events", "");
          })

          $(carouselNav)
            .eq(i)
            .flickity({
              imagesLoaded: true,
              initialIndex: 0,
              asNavFor: $(carouselMain)[i],
              prevNextButtons: true,
              draggable: true,
              cellAlign: "center",
              adaptiveHeight: true,
              contain: true,
              pageDots: false
            });
        }
      }
    };
    carouselArticle();
    //carouselProducts
    if( $(".products-article").length != 0 )
      $(".products-article").addClass("load");
    





window.Basket = {
  storageName:  location.hostname+"-basket",
  orders: [],
  basketModal: ".basket-modal-items",
  json: localStorage[this.storageName],
  initBasket: function(){

    if(localStorage[this.storageName])
      this.orders = JSON.parse(localStorage[this.storageName]);
    for (var i = 0; i < this.orders.length; i++)
      $(this.basketModal).append(this.orders[i].template)
    this.changeBasket();
  },
  changeBasket: function(){
    localStorage[this.storageName] = JSON.stringify(this.orders);
    $(".bakset-cnt").text(this.orders.length);
  },
  checkOrderid: function(id){
    for (var i = 0; i < this.orders.length; i++) {
      if( this.orders[i].id == id)
        return true;
    }
    return false;
  },
  appedBasket: function(that){

    var orderid = that.attr("data-order-id");

    if( Basket.checkOrderid(orderid) ) 
      return;

    var template = that.attr("data-order-templateid");
        template = $("[data-templateid='"+template+"']").eq(0);
    var basketArea = $(that.attr("data-basket"));

    console.log( that )
    var order = {
      id: orderid,
      template: template[0].outerHTML
    }

    Basket.orders.push(order);
    localStorage[ Basket.storageName ] = JSON.stringify(Basket.orders);
    
    basketArea.append( template );
    this.changeBasket()
  },
  removeBasketItem: function(id){
    this.orders = this.orders.filter(function(el, i){
      return el.id != id;
    })
    console.log( this.orders )
    this.changeBasket();
  }
  
}
Basket.initBasket();




  $("[data-order-del]").on("click", function(){
    var that = $(this);
    var orderId = that.attr("data-order-del");
    var templateId = that.attr("data-template-del");
    Basket.removeBasketItem(orderId);
    //TODO : Повторное нажатие
    $("[data-templateid='"+templateId+"']").slideUp(400, function(){  });
  })
  
  $(document).on("click", ".link-cart", function(){
    var that = $(this);
    Basket.appedBasket( that );
  })



















    function onLoaded() {
      //MASONRY
      if ($(".grid-img").length != 0) {
        var $grid = $(".grid-img").masonry({
          itemSelector: ".grid-img-item",
          columnWidth: ".grid-img-sizer",
          percentPosition: true
        });
      }
      
    }

    //SCROLL
    var minMenu = $(".header-scroll") || null;
    var headerRange = false;


    $(window).on("scroll", function(e) {

      if ($(window).scrollTop() > 50 && headerRange == false) {

        headerRange = true;
        if (minMenu) minMenu.addClass("scrolled").addClass("down");
        
      } else if ($(window).scrollTop() < 50 && headerRange == true) {
        headerRange = !true;
        if (minMenu) minMenu.removeClass("scrolled");
      } //.originalEvent.wheelDelta
    });


    $(window).on("mousewheel", function(event) {
      if (!headerRange) return;
      if (event.originalEvent.wheelDelta >= 0) {
        minMenu.removeClass("up");
      } else {
        minMenu.addClass("up");
      }
    });

    window.preLoader = {
      preBox: ".pre-box",
      enter: false,
      status: $(".pre-box").hasClass("in"),

      preToggle: function(bool, func) {
        var endtime = 600;
        if (!this.enter) return;
        if (typeof func === "function")
          setTimeout(function() {
            func();
          }, endtime);
        var preBox = $(this.preBox);

        bool || this.status
          ? preBox.removeClass("in").setTimeout(function() {
              $(preBox).hide();
            }, endtime)
          : preBox
              .show()
              .addClass("in")
              .find(".box-content");

        return (this.status = !this.status);
      },

      preImg: function(img) {
        var images = img || document.images,
          imagesTotalCount = images.length,
          imagesLoadedCount = 0,
          preloadPercent = $(".percent").text("0 %");

        if (imagesTotalCount == 0) {
          preOnload();
          $(preloadPercent).text("100 %");
        }

        for (var i = 0; i < imagesTotalCount; i++) {
          var image_clone = new Image();
          image_clone.onload = image_loaded;
          image_clone.onerror = image_loaded;
          image_clone.src = images[i].src;
        }

        function preOnload() {
          onLoaded();
        }

        function image_loaded() {
          imagesLoadedCount++;

          var per = (100 / imagesTotalCount * imagesLoadedCount) << 0;

          setTimeout(function() {
            //console.log(per);
            $(preloadPercent).text(per + "%");
          }, 1);

          if (imagesLoadedCount >= imagesTotalCount) preOnload();
        }
      }
    };

    preLoader.preImg();




    var revSlider = $('.rev-slider') || null;
    var bannerSlider =  $('.rev-slider').hasClass("banner-slider") || null;

    onResized(function(){
      if( revSlider.length != 0 )
       revSlider.revolution({
          delay:6000,
          startwidth: checkSm() ? $( window ).width() : checkMd() ? 970 : 1170,
          startheight: checkSm() ? 200 :  bannerSlider ? 350 : 400,
          autoHeight:"off",
          fullScreenAlignForce:"off",

          onHoverStop:"on",

          thumbWidth:100,
          thumbHeight:50,
          thumbAmount:3,

          hideThumbsOnMobile:"on",
          hideBulletsOnMobile:"on",
          hideArrowsOnMobile:"on",
          hideThumbsUnderResoluition:0,

          hideThumbs: -1,
          hideTimerBar:"on",

          keyboardNavigation:"off",

          navigationType:"bullet",
          navigationArrows:"solo",  //solo
          navigationStyle:"round",

          navigationHAlign:"center",
          navigationVAlign:"bottom",
          navigationHOffset: 0,
          navigationVOffset: 30,

          soloArrowLeftHalign:"left",
          soloArrowLeftValign:"center",
          soloArrowLeftHOffset:30,
          soloArrowLeftVOffset:0,

          soloArrowRightHalign:"right",
          soloArrowRightValign:"center",
          soloArrowRightHOffset:30,
          soloArrowRightVOffset:0,


          touchenabled: "off",
          swipe_velocity:"0.7",
          swipe_max_touches:"1",
          swipe_min_touches:"1",
          drag_block_vertical: "false",

          stopAtSlide:-1,
          stopAfterLoops:-1,
          hideCaptionAtLimit:0,
          hideAllCaptionAtLilmit:0,
          hideSliderAtLimit:0,

          fullWidth:"on",
          fullScreen:"off",
          fullScreenOffsetContainer: "#header",

          dottedOverlay:"none",
          forceFullWidth:"off",

          shadow:0

        })
      

    });
    if( revSlider.length ){
      var prevnext = $(".tparrows").append('<svg viewBox="0 0 100 100"><path d="M 10,50 L 50,85 L 55,75 L 30,50  L 55,25 L 50,15 Z" class="arrow"></path></svg>')
      $(".arrow-container.container").append( prevnext ).css( "top", "350" );
      $(".arrow-container.container").css( "top", "-"+( $(".rev-slider").css("height").match(/(\d+)/gim)[0]/2 ) + "px" );
    }


    
  });
})(jQuery);

var isWebkit = /Webkit/i.test(navigator.userAgent),
  isChrome = /Chrome/i.test(navigator.userAgent),
  isMac = /Mac/i.test(navigator.userAgent),
  isMobile = !!("ontouchstart" in window),
  isAndroid = /Android/i.test(navigator.userAgent);

// COMMON FUNCTION

setTimeout(function() {
  //jQuery FUNCITON
  $.fn.onResized = function() {
    onResized(function() {
      this;
    });
    return this;
  };
}, 10);





String.prototype.unescape = function() {
  var str;
  var winalpha = {
    E0: '%D0%B0', E1: '%D0%B1', E2: '%D0%B2', E3: '%D0%B3',
    E4: '%D0%B4', E5: '%D0%B5', B8: '%D1%91', E6: '%D0%B6',
    E7: '%D0%B7', E8: '%D0%B8', E9: '%D0%B9', EA: '%D0%BA',
    EB: '%D0%BB', EC: '%D0%BC', ED: '%D0%BD', EE: '%D0%BE',
    EF: '%D0%BF', F0: '%D1%80', F1: '%D1%81', F2: '%D1%82',
    F3: '%D1%83', F4: '%D1%84', F5: '%D1%85', F6: '%D1%86',
    F7: '%D1%87', F8: '%D1%88', F9: '%D1%89', FA: '%D1%8A',
    FB: '%D1%8B', FC: '%D1%8C', FD: '%D1%8D', FE: '%D1%8E',
    FF: '%D1%8F', C0: '%D0%90', C1: '%D0%91', C2: '%D0%92',
    C3: '%D0%93', C4: '%D0%94', C5: '%D0%95', A8: '%D0%81',
    C6: '%D0%96', C7: '%D0%97', C8: '%D0%98', C9: '%D0%99',
    CA: '%D0%9A', CB: '%D0%9B', CC: '%D0%9C', CD: '%D0%9D',
    CE: '%D0%9E', CF: '%D0%9F', D0: '%D0%A0', D1: '%D0%A1',
    D2: '%D0%A2', D3: '%D0%A3', D4: '%D0%A4', D5: '%D0%A5',
    D6: '%D0%A6', D7: '%D0%A7', D8: '%D0%A8', D9: '%D0%A9',
    DA: '%D0%AA', DB: '%D0%AB', DC: '%D0%AC', DD: '%D0%AD',
    DE: '%D0%AE', DF: '%D0%AF'
  };
  str = this.replace(/%/g, '$');
  for (var i in winalpha) {
    console.log(i); 
     str = str.replace(new RegExp('[\$]'+i, 'g'), winalpha[i]);
  }
  console.log(str); 
  str = str.replace(/\$/g, '%');
  str = decodeURIComponent(str);
  return str;
}





function checkSm() {
  return $(document).width() <= 991;
}
function checkMd() {
  return $(document).width() < 1199 && !checkSm();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function onResized(f) {
  if (typeof f === "function") f();
  $(window).on("resize", function(e) {
    if (typeof f === "function") f();
  });
  return this;
}
function scrolledDiv(el) {
  try {
    var docViewTop = $(window).scrollTop(),
      docViewBottom = docViewTop + $(window).height(),
      elTop = $(el).offset().top,
      elBottom = elTop + $(el).height() / 1.8;
  } catch (err) {
    console.error();
  }

  return elBottom <= docViewBottom && elTop >= docViewTop;
}
