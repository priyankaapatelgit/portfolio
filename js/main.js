

$(document).ready(function () {


  function ajaxLoad() {

    fist_load();
    page_animation();
    PortfolioGrids();
    HoverVideo();
    scrollmove();
    typed();
    hero_effect();
    full_menu();
    scroll_move();
    hero_tilt();
    ZoomImage();
    centerInit();
    lightbox();
    page_transition();
    cform();
    ContactForm();
    map();
    preloader();
  }

  ajaxLoad();



  function second_load() {
    fist_load();
    page_animation();
    PortfolioGrids();
    HoverVideo();
    scrollmove();
    typed();
    hero_effect();
    scroll_move();
    hero_tilt();
    ZoomImage();
    centerInit();
    lightbox();
    page_transition();
    cform();
    ContactForm();
    map();
    preloader();
  }



  //AJAX LOAD    

  function page_transition() {



    /* $("main").on('click', '[data-type="ajax-load"]', function (e) {
       $('body').removeClass('load');
       var href = $(this).attr("href");
       loadHtml();
       function loadHtml() {
         setTimeout(function () {
           loadContent(href);
           history.pushState('', 'new URL: ' + href, href);
         }, 1000);
       }
       e.preventDefault();
       window.onpopstate = function (event) {
         location.reload();
       };
     });*/
    function loadContent(url) {
      var getData = $.get(url, function (response) {
        var markup = $("<main>" + response + "</main>");
        var fragment = markup.find("main").html();
        var title = markup.find("title").html();
        $('head title').html(title);
        $("main").html(fragment);
        ajaxLoad();
        window.scrollTo(0, 0);
        $('.page-container').remove();
      });
    }

  }


  /*$("main").on('click', '[data-type="site-load"], .full-menu ul li a, .next-content', function (e) {
    $(".page-overlay").addClass("from-bottom");
    var href = $(this).attr("href");

    loadHtmltwo();
    function loadHtmltwo() {
      setTimeout(function () {
        loadContenttwo(href);
        history.pushState('', 'new URL: ' + href, href);
      }, 1000);
    }
    e.preventDefault();
  });*/
  window.onpopstate = function (event) {
    location.reload();
  };
  function loadContenttwo(url) {
    var getData = $.get(url, function (response) {
      var markup = $("<main>" + response + "</main>");
      var fragment = markup.find("main").html();
      var title = markup.find("title").html();
      $('head title').html(title);

      $("main").html(fragment);
      ajaxLoad();
      window.scrollTo(0, 0);
      $(".page-overlay").addClass("from-bottom");
      setTimeout(function () {
        $(".page-overlay").addClass("from-bottom-end");
        setTimeout(function () {
          $(".page-overlay").removeClass("from-bottom");
          $(".page-overlay").removeClass("from-bottom-end");
        }, 800);
      }, 500);

    });
  }


  function fist_load() {
    setTimeout(function () {
      $('body').addClass('load');
    }, 1000);
  }



  function preloader() {

    var width = 100,
      perfData = window.performance.timing,
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime / 1000) % 60) * 40;


    var PercentageID = $("#precent"),
      start = 0,
      end = 100,
      durataion = time;
    animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {

      var range = end - start,
        current = start,
        increment = end > start ? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);

      var timer = setInterval(function () {
        current += increment;
        $(obj).text(current + "%");
        $(".loader_bar").css({ width: current + '%' })

        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    }


    setTimeout(function () {
      $('.preloader-wrap').fadeOut(400);
    }, time);

  }



  // ZOOM IMAGE
  function ZoomImage() {


    if ($('.page-container').length) {

      $("body").find(".page-container").each(function () {
        $("#clone-image").append($(this))
      });

      //console.clear();

      var root = document.documentElement;
      var body = document.body;
      var pages = document.querySelectorAll(".page");
      var tiles = document.querySelectorAll(".portfolio-item");

      for (var i = 0; i < tiles.length; i++) {
        addListeners(tiles[i], pages[i]);
      }

      function addListeners(tile, page) {

        tile.addEventListener("click", function () {
          $(this).parent().addClass('above');
          setTimeout(function () {
            TweenMax.to('.portfolio-item', 0.3, { opacity: 0, delay: 0.2, ease: Power2.easeInOut });
            //TweenMax.to('.portfolio-item > figcaption', 0.3,{opacity: 0, delay: 0.2, ease:Power2.easeInOut});
            TweenMax.to('header', 0.3, { opacity: 0, delay: 0.2, ease: Power2.easeInOut });
          }, 0);

          setTimeout(function () {
            animotion(tile, page);
          }, 50);
        });

        page.addEventListener("click", function () {
          $('.grid-item').removeClass('above');
          animateHero(page, tile);
        });
      }

      function animotion(fromthere, tothere) {

        var clone = fromthere.cloneNode(true);
        var from = calculate(fromthere);
        var to = calculate(tothere);
        TweenLite.set([fromthere, tothere], { visibility: "hidden" });
        TweenLite.set(clone, { position: "absolute", margin: 0 });

        body.appendChild(clone);

        var style = {
          x: to.left - from.left,
          y: to.top - from.top,
          width: to.width,
          height: to.height,
          autoRound: false,
          ease: Power2.easeInOut,
          onComplete: onComplete
        };

        TweenLite.set(clone, from);
        TweenLite.to(clone, 0.6, style)

        function onComplete() {

          TweenLite.set(tothere, { visibility: "visible" });
          body.removeChild(clone);
        }

      }

      function calculate(element) {

        var rect = element.getBoundingClientRect();

        var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
        var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

        var clientTop = root.clientTop || body.clientTop || 0;
        var clientLeft = root.clientLeft || body.clientLeft || 0;

        return {
          top: Math.round(rect.top + scrollTop - clientTop),
          left: Math.round(rect.left + scrollLeft - clientLeft),
          height: rect.height,
          width: rect.width,
        };
      }

    }
  }




  function centerInit() {
    var wrapper = $('.content')

    wrapper.css({
      "margin-top": $('.hero').height() + "px"
    });
  }

  centerInit();

  $(window).resize(centerInit);



  // MAGNIFIC POPUP    
  function lightbox() {
    $('.lightbox').magnificPopup({
      type: 'image',
      gallery: { enabled: true },
      zoom: { enabled: true, duration: 300 }
    });
  }

  function scroll_move() {

    $('.section-down-arrow').on("click", function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $('.hero').height() - 30
      }, 800);
    });

    $('.uptotop').on("click", function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });

  }

  function hero_tilt() {

    var maxTilt = 1.5;
    var mouseX, mouseY;
    $(document).on("mousemove", function (event) {
      mouseX = event.pageX;
      mouseY = event.pageY;
    });
    $('.hero-image').each(function () {
      var thisWidth = $(this).width();
      var thisHeight = $(this).height();
      var thisOffset = $(this).offset();
      // $(document).mousemove(function () {
      //   var horTilt = ((mouseX / thisWidth) * (maxTilt * 2)) - maxTilt;
      //   var verTilt = (((mouseY - thisOffset.top) / thisHeight) * (maxTilt * 2)) - maxTilt;
      //   TweenMax.to('.hero-image', 1, { rotationY: horTilt, rotationX: verTilt, scale: 1.05, ease: Power1.easeOut });
      // });
    });


  }


  function page_animation() {

    tl1 = new TimelineMax({ ease: Power2.easeOut });
    tl2 = new TimelineMax({ paused: true });

    tl1.from('.team:nth-child(2)', 1, { y: 60 }, 2)
      .from('.team:nth-child(3)', 1, { y: 90 }, 2)

    tl2.to('.team:nth-child(2)', 1, { y: 0 }, .2)
      .to('.team:nth-child(3)', 1, { y: 0 }, .2)

    $(window).scroll(function () {
      var st = $(this).scrollTop();
      var sh = $('.hero').outerHeight();
      if (st < sh) {
        windowScroll = st / sh;
        if (windowScroll > 0) {
          tl2.progress(windowScroll);
        }
      }

      if (st > sh / 2) {
        $('body').addClass('white');
      } else {
        $('body').removeClass('white');
      }

    }); // window scroll end

    $(".portfolio_filter ul li a").on("click", function () {
      $('html, body').animate({
        scrollTop: $(".content").offset().top - 30
      }, 500);
    });

    $(window).scroll(function () {
      var scrlT = $(window).scrollTop();
      var total = $('.hero').height() + $('.content').height();
      var scrlbtm = scrlT + $('.hero').height();
      var pageh = $(document).height();

      if (scrlbtm > total) {
        $('.portfolio_filter, .filter-icon').addClass('stp');
      } else {
        $('.portfolio_filter, .filter-icon').removeClass('stp');
      }
    });

    $('.filter-icon').on('click', function () {
      $('.portfolio_filter').toggleClass('opened');
      $(this).toggleClass('opened');
    });

  }


  function full_menu() {

    $("header .nav-icon").on("click", function () {
      $('.full-menu').addClass('active');
      setTimeout(function () { tl3.play(); tl4.play(); }, 400);
    });

    $(".full-menu .close-icon").on("click", function () {
      tl3.reverse(); tl4.reverse();
      setTimeout(function () { $('.full-menu').removeClass('active'); }, 600);
    });

    // // Menu animation
    var menu = $(".full-menu .site-menu li");
    var tl3 = new TimelineMax({
      yoyo: false,
      reversed: true
    });
    tl3.staggerFrom(menu, .5, {
      x: "-50",
      opacity: 0
    }, 0.1);

    var tl4 = new TimelineMax({
      yoyo: false,
      reversed: true
    });

    tl4.staggerFrom('.right-content ul', .5, {
      x: "50",
      opacity: 0
    }, 0.1);


  }




  // HOME TYPED JS
  function typed() {
    if (jQuery('.element').length) {

      var animateSpan = jQuery('.element');
      var textWords = animateSpan.data('values');
      var textArray = textWords.split(',');
      var html = [];
      var back_delay = jQuery('.element').data('backdelay') * 1000;

      for (var i = 0; i < textArray.length; i++) {
        html.push(textArray[i]);
      }

      jQuery('.element').each(function () {
        jQuery(this).typed({
          strings: html,
          loop: jQuery(this).data('loop') ? jQuery(this).data('loop') : false,
          backDelay: back_delay,
          typeSpeed: 10,
        });
      });
    }
  }


  // HERO EFFECT

  function hero_effect() {
    if ($(window).width() > 481) {
      function promoEffect() {
        var pro = $('.hero');
        var proin = $('.hero .inner')
        var where = window.pageYOffset || document.documentElement.scrollTop;
        pro.css({
          'opacity': (1 - (where / 20) / 30)
        })
        proin.css({
          'transform': 'scale(' + (100 - where / 100) / 98 + ')',
        })
      }
      promoEffect();
      $(window).scroll(promoEffect);
    } else {
      function promoEffect() {
        var pro = $('.hero');
        var proin = $('.hero .inner')
        var where = window.pageYOffset || document.documentElement.scrollTop;
        pro.css({
          'opacity': (1 - (where / 20) / 15)
        })
        proin.css({
          'transform': 'scale(' + (100 - where / 100) / 98 + ')',
        })
      }
      promoEffect();
      $(window).scroll(promoEffect);

    }
  }





  //PORTFOLIO GRIDS
  function PortfolioGrids() {
    var $container = $('.masonry');
    $container.imagesLoaded(function () {
      $container.isotope({
        layoutMode: 'packery',
        itemSelector: '.grid-item',
        gutter: 0,
        transitionDuration: "0.5s",
        columnWidth: '.grid-item'
      });
    })
    $('.portfolio_filter ul li a').on("click", function () {
      $(".portfolio_filter ul li a").removeClass("select-cat");
      $(this).addClass("select-cat");
      var selector = $(this).attr('data-filter');
      $(".masonry").isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false,
        }
      });
      return false;
    });

    $(".filter-icon").on("click", function () {
      $('.portfolio_filter').addClass('show');
    });

    $(".portfolio_filter, .portfolio_filter ul li a").on("click", function (event) {
      if (!$(event.target).is(".portfolio_filter ul li a")) {
        $('.portfolio_filter').removeClass('show');
        return false;
      }
    });

    // Infinite Scroll
    var curPage = 1;
    var pagesNum = $("#pagination-selector").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
      itemSelector: '.grid-item',
      nextSelector: '.portfolio-pagination li a',
      navSelector: '#pagination-selector',
      extraScrollPx: 0,
      bufferPx: 0,
      maxPage: 6,
      loading: {
        finishedMsg: "No more works",
        msgText: '<div class="loader"><span></span></div>',
        speed: 'slow',
        selector: '.load-more',
      },
    },
      // trigger Masonry as a callback
      function (newElements) {

        var $newElems = $(newElements);
        $newElems.imagesLoaded(function () {  // Append masonry        
          $newElems.animate({ opacity: 1 });
          $container.isotope('appended', $newElems, true);
        });
        // Check last page
        curPage++;
        if (curPage == pagesNum) {
          $('.load-more button').remove();
        }
        $('.load-more').find('button').css('visibility', 'visible');
      });

    $container.infinitescroll('unbind');
    // jQuery
    $container.on('append.infinitescroll', function (event, response, path, items) {
      console.log('Loaded: ' + path);
    });


    $('.load-more button').on('click', function () {
      setTimeout(function () {
        $('.grid-item').addClass('in-view');
        second_load();
      }, 100);
      $container.infinitescroll('retrieve');
      $('.load-more').find('button').css('visibility', 'hidden');
      return false;
    });


  }


  function HoverVideo() {
    $(".grid-item.video").on({
      mouseenter: function () {
        //stuff to do on mouse enter
        $('video', this).get(0).play();
      },
      mouseleave: function () {
        //stuff to do on mouse leave
        $('video', this).get(0).pause();
      }
    });
  }


  function scrollmove() {
    $(window).scroll(function () {

      setTimeout(function () {

        var $animation_elements = $('.grid-item, .site-btn.portfolio, footer, .animation');
        var $window = $(window);

        function check_if_in_view() {
          var window_height = $window.height();
          var window_top_position = $window.scrollTop() + 50;
          var window_bottom_position = (window_top_position + window_height - 200);

          $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
              $element.addClass('in-view');
            }

          });
        }

        $window.on('scroll resize', check_if_in_view);
      }, 1000);

    });
  }


  //CONTACT FORM
  function cform() {

    $("form .form-group input, form .form-group textarea").focus(function () {

      console.log('baba');

      $(this).parents('.form-group').addClass('in');

      $('form .form-group input, form .form-group textarea').blur(function () {
        if (!$(this).val()) {
          $(this).parents('.form-group').removeClass('in');
        }
      });
    });
  }

  //CONTACT FORM
  function ContactForm() {

    if (jQuery('#contact-formular').length > 0) {
      $('#contactform').submit(function () {
        var action = $(this).attr('action');
        $("#message").slideUp(750, function () {
          $('#message').hide();
          $('#submit').attr('disabled', 'disabled');
          $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            comments: $('#comments').val()
          },
            function (data) {
              document.getElementById('message').innerHTML = data;
              $('#message').slideDown('slow');
              $('#contactform img.loader').fadeOut('slow', function () { $(this).remove() });
              $('#submit').removeAttr('disabled');
              if (data.match('success') != null) $('#contactform').slideUp('slow');
            }
          );
        });
        return false;
      });
    }
  }


  function map() {

    $('.map-link').on("click", function () {
      $('.map').addClass('opened');
    });


    $('.map-close').on("click", function () {
      $('.map').removeClass('opened');
    });




  }



}); // document read end 



