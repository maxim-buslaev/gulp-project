!(function(e, i) {
  "use strict";
  var t = {
    item: 3,
    autoWidth: !1,
    slideMove: 1,
    slideMargin: 10,
    addClass: "",
    mode: "slide",
    useCSS: !0,
    cssEasing: "ease",
    easing: "linear",
    speed: 400,
    auto: !1,
    pauseOnHover: !1,
    loop: !1,
    slideEndAnimation: !0,
    pause: 2e3,
    keyPress: !1,
    controls: !0,
    prevHtml: "",
    nextHtml: "",
    rtl: !1,
    adaptiveHeight: !1,
    vertical: !1,
    verticalHeight: 500,
    vThumbWidth: 100,
    thumbItem: 10,
    pager: !0,
    gallery: !1,
    galleryMargin: 5,
    thumbMargin: 5,
    currentPagerPosition: "middle",
    enableTouch: !0,
    enableDrag: !0,
    freeMove: !0,
    swipeThreshold: 40,
    responsive: [],
    onBeforeStart: function(e) {},
    onSliderLoad: function(e) {},
    onBeforeSlide: function(e, i) {},
    onAfterSlide: function(e, i) {},
    onBeforeNextSlide: function(e, i) {},
    onBeforePrevSlide: function(e, i) {}
  };
  e.fn.lightSlider = function(i) {
    if (0 === this.length) return this;
    if (this.length > 1)
      return (
        this.each(function() {
          e(this).lightSlider(i);
        }),
        this
      );
    var n = {},
      l = e.extend(!0, {}, t, i),
      a = {},
      s = this;
    (n.$el = this), "fade" === l.mode && (l.vertical = !1);
    var o = s.children(),
      r = e(window).width(),
      d = null,
      c = null,
      u = 0,
      f = 0,
      h = !1,
      g = 0,
      v = "",
      p = 0,
      m = !0 === l.vertical ? "height" : "width",
      S = !0 === l.vertical ? "margin-bottom" : "margin-right",
      b = 0,
      C = 0,
      M = 0,
      T = 0,
      x = null,
      w = "ontouchstart" in document.documentElement,
      P = {};
    return (
      (P.chbreakpoint = function() {
        if (((r = e(window).width()), l.responsive.length)) {
          var i;
          if (
            (!1 === l.autoWidth && (i = l.item), r < l.responsive[0].breakpoint)
          )
            for (var t = 0; t < l.responsive.length; t++)
              r < l.responsive[t].breakpoint &&
                ((d = l.responsive[t].breakpoint), (c = l.responsive[t]));
          if (void 0 !== c && null !== c)
            for (var n in c.settings)
              c.settings.hasOwnProperty(n) &&
                ((void 0 !== a[n] && null !== a[n]) || (a[n] = l[n]),
                (l[n] = c.settings[n]));
          if (!e.isEmptyObject(a) && r > l.responsive[0].breakpoint)
            for (var s in a) a.hasOwnProperty(s) && (l[s] = a[s]);
          !1 === l.autoWidth &&
            b > 0 &&
            M > 0 &&
            i !== l.item &&
            (p = Math.round(b / ((M + l.slideMargin) * l.slideMove)));
        }
      }),
      (P.calSW = function() {
        !1 === l.autoWidth &&
          (M = (g - (l.item * l.slideMargin - l.slideMargin)) / l.item);
      }),
      (P.calWidth = function(e) {
        var i = !0 === e ? v.find(".lslide").length : o.length;
        if (!1 === l.autoWidth) f = i * (M + l.slideMargin);
        else {
          f = 0;
          for (var t = 0; t < i; t++)
            f += parseInt(o.eq(t).width()) + l.slideMargin;
        }
        return f;
      }),
      (n = {
        doCss: function() {
          return !(
            !l.useCSS ||
            !(function() {
              for (
                var e = [
                    "transition",
                    "MozTransition",
                    "WebkitTransition",
                    "OTransition",
                    "msTransition",
                    "KhtmlTransition"
                  ],
                  i = document.documentElement,
                  t = 0;
                t < e.length;
                t++
              )
                if (e[t] in i.style) return !0;
            })()
          );
        },
        keyPress: function() {
          l.keyPress &&
            e(document).on("keyup.lightslider", function(i) {
              e(":focus").is("input, textarea") ||
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1),
                37 === i.keyCode
                  ? s.goToPrevSlide()
                  : 39 === i.keyCode && s.goToNextSlide());
            });
        },
        controls: function() {
          l.controls &&
            (s.after(
              '<div class="lSAction"><a class="lSPrev">' +
                l.prevHtml +
                '</a><a class="lSNext">' +
                l.nextHtml +
                "</a></div>"
            ),
            l.autoWidth
              ? P.calWidth(!1) < g && v.find(".lSAction").hide()
              : u <= l.item && v.find(".lSAction").hide(),
            v.find(".lSAction a").on("click", function(i) {
              return (
                i.preventDefault ? i.preventDefault() : (i.returnValue = !1),
                "lSPrev" === e(this).attr("class")
                  ? s.goToPrevSlide()
                  : s.goToNextSlide(),
                !1
              );
            }));
        },
        initialStyle: function() {
          var e = this;
          "fade" === l.mode && ((l.autoWidth = !1), (l.slideEndAnimation = !1)),
            l.auto && (l.slideEndAnimation = !1),
            l.autoWidth && ((l.slideMove = 1), (l.item = 1)),
            l.loop && ((l.slideMove = 1), (l.freeMove = !1)),
            l.onBeforeStart.call(this, s),
            P.chbreakpoint(),
            s
              .addClass("lightSlider")
              .wrap(
                '<div class="lSSlideOuter ' +
                  l.addClass +
                  '"><div class="lSSlideWrapper"></div></div>'
              ),
            (v = s.parent(".lSSlideWrapper")),
            !0 === l.rtl && v.parent().addClass("lSrtl"),
            l.vertical
              ? (v.parent().addClass("vertical"),
                (g = l.verticalHeight),
                v.css("height", g + "px"))
              : (g = s.outerWidth()),
            o.addClass("lslide"),
            !0 === l.loop &&
              "slide" === l.mode &&
              (P.calSW(),
              (P.clone = function() {
                if (P.calWidth(!0) > g) {
                  for (
                    var i = 0, t = 0, n = 0;
                    n < o.length &&
                    ((i +=
                      parseInt(
                        s
                          .find(".lslide")
                          .eq(n)
                          .width()
                      ) + l.slideMargin),
                    t++,
                    !(i >= g + l.slideMargin));
                    n++
                  );
                  var a = !0 === l.autoWidth ? t : l.item;
                  if (a < s.find(".clone.left").length)
                    for (var r = 0; r < s.find(".clone.left").length - a; r++)
                      o.eq(r).remove();
                  if (a < s.find(".clone.right").length)
                    for (
                      var d = o.length - 1;
                      d > o.length - 1 - s.find(".clone.right").length;
                      d--
                    )
                      p--, o.eq(d).remove();
                  for (var c = s.find(".clone.right").length; c < a; c++)
                    s
                      .find(".lslide")
                      .eq(c)
                      .clone()
                      .removeClass("lslide")
                      .addClass("clone right")
                      .appendTo(s),
                      p++;
                  for (
                    var u =
                      s.find(".lslide").length - s.find(".clone.left").length;
                    u > s.find(".lslide").length - a;
                    u--
                  )
                    s
                      .find(".lslide")
                      .eq(u - 1)
                      .clone()
                      .removeClass("lslide")
                      .addClass("clone left")
                      .prependTo(s);
                  o = s.children();
                } else
                  o.hasClass("clone") &&
                    (s.find(".clone").remove(), e.move(s, 0));
              }),
              P.clone()),
            (P.sSW = function() {
              (u = o.length),
                !0 === l.rtl && !1 === l.vertical && (S = "margin-left"),
                !1 === l.autoWidth && o.css(m, M + "px"),
                o.css(S, l.slideMargin + "px"),
                (f = P.calWidth(!1)),
                s.css(m, f + "px"),
                !0 === l.loop &&
                  "slide" === l.mode &&
                  !1 === h &&
                  (p = s.find(".clone.left").length);
            }),
            (P.calL = function() {
              (o = s.children()), (u = o.length);
            }),
            this.doCss() && v.addClass("usingCss"),
            P.calL(),
            "slide" === l.mode
              ? (P.calSW(),
                P.sSW(),
                !0 === l.loop && ((b = e.slideValue()), this.move(s, b)),
                !1 === l.vertical && this.setHeight(s, !1))
              : (this.setHeight(s, !0),
                s.addClass("lSFade"),
                this.doCss() || (o.fadeOut(0), o.eq(p).fadeIn(0))),
            !0 === l.loop && "slide" === l.mode
              ? o.eq(p).addClass("active")
              : o.first().addClass("active");
        },
        pager: function() {
          var e = this;
          if (
            ((P.createPager = function() {
              T =
                (g - (l.thumbItem * l.thumbMargin - l.thumbMargin)) /
                l.thumbItem;
              var i = v.find(".lslide"),
                t = v.find(".lslide").length,
                n = 0,
                a = "",
                o = 0;
              for (n = 0; n < t; n++) {
                "slide" === l.mode &&
                  (l.autoWidth
                    ? (o +=
                        (parseInt(i.eq(n).width()) + l.slideMargin) *
                        l.slideMove)
                    : (o = n * ((M + l.slideMargin) * l.slideMove)));
                var r = i.eq(n * l.slideMove).attr("data-thumb");
                if (
                  (!0 === l.gallery
                    ? (a +=
                        '<li style="width:100%;' +
                        m +
                        ":" +
                        T +
                        "px;" +
                        S +
                        ":" +
                        l.thumbMargin +
                        'px"><a href="#"><img src="' +
                        r +
                        '" /></a></li>')
                    : (a += '<li><a href="#">' + (n + 1) + "</a></li>"),
                  "slide" === l.mode && o >= f - g - l.slideMargin)
                ) {
                  n += 1;
                  var d = 2;
                  l.autoWidth &&
                    ((a += '<li><a href="#">' + (n + 1) + "</a></li>"),
                    (d = 1)),
                    n < d
                      ? ((a = null), v.parent().addClass("noPager"))
                      : v.parent().removeClass("noPager");
                  break;
                }
              }
              var c = v.parent();
              c.find(".lSPager").html(a),
                !0 === l.gallery &&
                  (!0 === l.vertical &&
                    c.find(".lSPager").css("width", l.vThumbWidth + "px"),
                  (C = n * (l.thumbMargin + T) + 0.5),
                  c.find(".lSPager").css({
                    property: C + "px",
                    "transition-duration": l.speed + "ms"
                  }),
                  !0 === l.vertical &&
                    v
                      .parent()
                      .css(
                        "padding-right",
                        l.vThumbWidth + l.galleryMargin + "px"
                      ),
                  c.find(".lSPager").css(m, C + "px"));
              var u = c.find(".lSPager").find("li");
              u.first().addClass("active"),
                u.on("click", function() {
                  return (
                    !0 === l.loop && "slide" === l.mode
                      ? (p +=
                          u.index(this) -
                          c
                            .find(".lSPager")
                            .find("li.active")
                            .index())
                      : (p = u.index(this)),
                    s.mode(!1),
                    !0 === l.gallery && e.slideThumb(),
                    !1
                  );
                });
            }),
            l.pager)
          ) {
            var i = "lSpg";
            l.gallery && (i = "lSGallery"),
              v.after('<ul class="lSPager ' + i + '"></ul>');
            var t = l.vertical ? "margin-left" : "margin-top";
            v
              .parent()
              .find(".lSPager")
              .css(t, l.galleryMargin + "px"),
              P.createPager();
          }
          setTimeout(function() {
            P.init();
          }, 0);
        },
        setHeight: function(e, i) {
          var t = null,
            n = this;
          t = l.loop ? e.children(".lslide ").first() : e.children().first();
          var a = function() {
            var n = t.outerHeight(),
              l = 0,
              a = n;
            i && ((n = 0), (l = 100 * a / g)),
              e.css({ height: n + "px", "padding-bottom": l + "%" });
          };
          a(),
            t.find("img").length
              ? t.find("img")[0].complete
                ? (a(), x || n.auto())
                : t.find("img").on("load", function() {
                    setTimeout(function() {
                      a(), x || n.auto();
                    }, 100);
                  })
              : x || n.auto();
        },
        active: function(e, i) {
          this.doCss() && "fade" === l.mode && v.addClass("on");
          var t = 0;
          if (p * l.slideMove < u) {
            e.removeClass("active"),
              this.doCss() ||
                "fade" !== l.mode ||
                !1 !== i ||
                e.fadeOut(l.speed),
              (t = !0 === i ? p : p * l.slideMove);
            var n, a;
            !0 === i && ((a = (n = e.length) - 1), t + 1 >= n && (t = a)),
              !0 === l.loop &&
                "slide" === l.mode &&
                ((t =
                  !0 === i
                    ? p - s.find(".clone.left").length
                    : p * l.slideMove),
                !0 === i &&
                  ((a = (n = e.length) - 1),
                  t + 1 === n ? (t = a) : t + 1 > n && (t = 0))),
              this.doCss() ||
                "fade" !== l.mode ||
                !1 !== i ||
                e.eq(t).fadeIn(l.speed),
              e.eq(t).addClass("active");
          } else
            e.removeClass("active"),
              e.eq(e.length - 1).addClass("active"),
              this.doCss() ||
                "fade" !== l.mode ||
                !1 !== i ||
                (e.fadeOut(l.speed), e.eq(t).fadeIn(l.speed));
        },
        move: function(e, i) {
          !0 === l.rtl && (i = -i),
            this.doCss()
              ? !0 === l.vertical
                ? e.css({
                    transform: "translate3d(0px, " + -i + "px, 0px)",
                    "-webkit-transform": "translate3d(0px, " + -i + "px, 0px)"
                  })
                : e.css({
                    transform: "translate3d(" + -i + "px, 0px, 0px)",
                    "-webkit-transform": "translate3d(" + -i + "px, 0px, 0px)"
                  })
              : !0 === l.vertical
                ? e
                    .css("position", "relative")
                    .animate({ top: -i + "px" }, l.speed, l.easing)
                : e
                    .css("position", "relative")
                    .animate({ left: -i + "px" }, l.speed, l.easing);
          var t = v
            .parent()
            .find(".lSPager")
            .find("li");
          this.active(t, !0);
        },
        fade: function() {
          this.active(o, !1);
          var e = v
            .parent()
            .find(".lSPager")
            .find("li");
          this.active(e, !0);
        },
        slide: function() {
          var e = this;
          (P.calSlide = function() {
            f > g &&
              ((b = e.slideValue()),
              e.active(o, !1),
              b > f - g - l.slideMargin
                ? (b = f - g - l.slideMargin)
                : b < 0 && (b = 0),
              e.move(s, b),
              !0 === l.loop &&
                "slide" === l.mode &&
                (p >= u - s.find(".clone.left").length / l.slideMove &&
                  e.resetSlide(s.find(".clone.left").length),
                0 === p && e.resetSlide(v.find(".lslide").length)));
          }),
            P.calSlide();
        },
        resetSlide: function(e) {
          var i = this;
          v.find(".lSAction a").addClass("disabled"),
            setTimeout(function() {
              (p = e),
                v.css("transition-duration", "0ms"),
                (b = i.slideValue()),
                i.active(o, !1),
                n.move(s, b),
                setTimeout(function() {
                  v.css("transition-duration", l.speed + "ms"),
                    v.find(".lSAction a").removeClass("disabled");
                }, 50);
            }, l.speed + 100);
        },
        slideValue: function() {
          var e = 0;
          if (!1 === l.autoWidth) e = p * ((M + l.slideMargin) * l.slideMove);
          else {
            e = 0;
            for (var i = 0; i < p; i++)
              e += parseInt(o.eq(i).width()) + l.slideMargin;
          }
          return e;
        },
        slideThumb: function() {
          var e;
          switch (l.currentPagerPosition) {
            case "left":
              e = 0;
              break;
            case "middle":
              e = g / 2 - T / 2;
              break;
            case "right":
              e = g - T;
          }
          var i = p - s.find(".clone.left").length,
            t = v.parent().find(".lSPager");
          "slide" === l.mode &&
            !0 === l.loop &&
            (i >= t.children().length
              ? (i = 0)
              : i < 0 && (i = t.children().length));
          var n = i * (T + l.thumbMargin) - e;
          n + g > C && (n = C - g - l.thumbMargin),
            n < 0 && (n = 0),
            this.move(t, n);
        },
        auto: function() {
          l.auto &&
            (clearInterval(x),
            (x = setInterval(function() {
              s.goToNextSlide();
            }, l.pause)));
        },
        pauseOnHover: function() {
          var i = this;
          l.auto &&
            l.pauseOnHover &&
            (v.on("mouseenter", function() {
              e(this).addClass("ls-hover"), s.pause(), (l.auto = !0);
            }),
            v.on("mouseleave", function() {
              e(this).removeClass("ls-hover"),
                v.find(".lightSlider").hasClass("lsGrabbing") || i.auto();
            }));
        },
        touchMove: function(e, i) {
          if ((v.css("transition-duration", "0ms"), "slide" === l.mode)) {
            var t = b - (e - i);
            if (t >= f - g - l.slideMargin)
              if (!1 === l.freeMove) t = f - g - l.slideMargin;
              else {
                var n = f - g - l.slideMargin;
                t = n + (t - n) / 5;
              }
            else t < 0 && (!1 === l.freeMove ? (t = 0) : (t /= 5));
            this.move(s, t);
          }
        },
        touchEnd: function(e) {
          if (
            (v.css("transition-duration", l.speed + "ms"), "slide" === l.mode)
          ) {
            var i = !1,
              t = !0;
            (b -= e) > f - g - l.slideMargin
              ? ((b = f - g - l.slideMargin), !1 === l.autoWidth && (i = !0))
              : b < 0 && (b = 0);
            var n = function(e) {
              var t = 0;
              if ((i || (e && (t = 1)), l.autoWidth))
                for (
                  var n = 0, a = 0;
                  a < o.length &&
                  ((n += parseInt(o.eq(a).width()) + l.slideMargin),
                  (p = a + t),
                  !(n >= b));
                  a++
                );
              else {
                var s = b / ((M + l.slideMargin) * l.slideMove);
                (p = parseInt(s) + t),
                  b >= f - g - l.slideMargin && s % 1 != 0 && p++;
              }
            };
            e >= l.swipeThreshold
              ? (n(!1), (t = !1))
              : e <= -l.swipeThreshold && (n(!0), (t = !1)),
              s.mode(t),
              this.slideThumb();
          } else
            e >= l.swipeThreshold
              ? s.goToPrevSlide()
              : e <= -l.swipeThreshold && s.goToNextSlide();
        },
        enableDrag: function() {
          var i = this;
          if (!w) {
            var t = 0,
              n = 0,
              a = !1;
            v.find(".lightSlider").addClass("lsGrab"),
              v.on("mousedown", function(i) {
                if (f < g && 0 !== f) return !1;
                "lSPrev" !== e(i.target).attr("class") &&
                  "lSNext" !== e(i.target).attr("class") &&
                  ((t = !0 === l.vertical ? i.pageY : i.pageX),
                  (a = !0),
                  i.preventDefault ? i.preventDefault() : (i.returnValue = !1),
                  (v.scrollLeft += 1),
                  (v.scrollLeft -= 1),
                  v
                    .find(".lightSlider")
                    .removeClass("lsGrab")
                    .addClass("lsGrabbing"),
                  clearInterval(x));
              }),
              e(window).on("mousemove", function(e) {
                a &&
                  ((n = !0 === l.vertical ? e.pageY : e.pageX),
                  i.touchMove(n, t));
              }),
              e(window).on("mouseup", function(s) {
                if (a) {
                  v
                    .find(".lightSlider")
                    .removeClass("lsGrabbing")
                    .addClass("lsGrab"),
                    (a = !1);
                  var o = (n = !0 === l.vertical ? s.pageY : s.pageX) - t;
                  Math.abs(o) >= l.swipeThreshold &&
                    e(window).on("click.ls", function(i) {
                      i.preventDefault
                        ? i.preventDefault()
                        : (i.returnValue = !1),
                        i.stopImmediatePropagation(),
                        i.stopPropagation(),
                        e(window).off("click.ls");
                    }),
                    i.touchEnd(o);
                }
              });
          }
        },
        enableTouch: function() {
          var e = this;
          if (w) {
            var i = {},
              t = {};
            v.on("touchstart", function(e) {
              (t = e.originalEvent.targetTouches[0]),
                (i.pageX = e.originalEvent.targetTouches[0].pageX),
                (i.pageY = e.originalEvent.targetTouches[0].pageY),
                clearInterval(x);
            }),
              v.on("touchmove", function(n) {
                if (f < g && 0 !== f) return !1;
                var a = n.originalEvent;
                t = a.targetTouches[0];
                var s = Math.abs(t.pageX - i.pageX),
                  o = Math.abs(t.pageY - i.pageY);
                !0 === l.vertical
                  ? (3 * o > s && n.preventDefault(),
                    e.touchMove(t.pageY, i.pageY))
                  : (3 * s > o && n.preventDefault(),
                    e.touchMove(t.pageX, i.pageX));
              }),
              v.on("touchend", function() {
                if (f < g && 0 !== f) return !1;
                var n;
                (n = !0 === l.vertical ? t.pageY - i.pageY : t.pageX - i.pageX),
                  e.touchEnd(n);
              });
          }
        },
        build: function() {
          var i = this;
          i.initialStyle(),
            this.doCss() &&
              (!0 === l.enableTouch && i.enableTouch(),
              !0 === l.enableDrag && i.enableDrag()),
            e(window).on("focus", function() {
              i.auto();
            }),
            e(window).on("blur", function() {
              clearInterval(x);
            }),
            i.pager(),
            i.pauseOnHover(),
            i.controls(),
            i.keyPress();
        }
      }).build(),
      (P.init = function() {
        P.chbreakpoint(),
          !0 === l.vertical
            ? ((g = l.item > 1 ? l.verticalHeight : o.outerHeight()),
              v.css("height", g + "px"))
            : (g = v.outerWidth()),
          !0 === l.loop && "slide" === l.mode && P.clone(),
          P.calL(),
          "slide" === l.mode && s.removeClass("lSSlide"),
          "slide" === l.mode && (P.calSW(), P.sSW()),
          setTimeout(function() {
            "slide" === l.mode && s.addClass("lSSlide");
          }, 1e3),
          l.pager && P.createPager(),
          !0 === l.adaptiveHeight &&
            !1 === l.vertical &&
            s.css("height", o.eq(p).outerHeight(!0)),
          !1 === l.adaptiveHeight &&
            ("slide" === l.mode
              ? !1 === l.vertical ? n.setHeight(s, !1) : n.auto()
              : n.setHeight(s, !0)),
          !0 === l.gallery && n.slideThumb(),
          "slide" === l.mode && n.slide(),
          !1 === l.autoWidth
            ? o.length <= l.item
              ? v.find(".lSAction").hide()
              : v.find(".lSAction").show()
            : P.calWidth(!1) < g && 0 !== f
              ? v.find(".lSAction").hide()
              : v.find(".lSAction").show();
      }),
      (s.goToPrevSlide = function() {
        if (p > 0)
          l.onBeforePrevSlide.call(this, s, p),
            p--,
            s.mode(!1),
            !0 === l.gallery && n.slideThumb();
        else if (!0 === l.loop) {
          if ((l.onBeforePrevSlide.call(this, s, p), "fade" === l.mode)) {
            var e = u - 1;
            p = parseInt(e / l.slideMove);
          }
          s.mode(!1), !0 === l.gallery && n.slideThumb();
        } else
          !0 === l.slideEndAnimation &&
            (s.addClass("leftEnd"),
            setTimeout(function() {
              s.removeClass("leftEnd");
            }, 400));
      }),
      (s.goToNextSlide = function() {
        var e = !0;
        "slide" === l.mode && (e = n.slideValue() < f - g - l.slideMargin),
          p * l.slideMove < u - l.slideMove && e
            ? (l.onBeforeNextSlide.call(this, s, p),
              p++,
              s.mode(!1),
              !0 === l.gallery && n.slideThumb())
            : !0 === l.loop
              ? (l.onBeforeNextSlide.call(this, s, p),
                (p = 0),
                s.mode(!1),
                !0 === l.gallery && n.slideThumb())
              : !0 === l.slideEndAnimation &&
                (s.addClass("rightEnd"),
                setTimeout(function() {
                  s.removeClass("rightEnd");
                }, 400));
      }),
      (s.mode = function(e) {
        !0 === l.adaptiveHeight &&
          !1 === l.vertical &&
          s.css("height", o.eq(p).outerHeight(!0)),
          !1 === h &&
            ("slide" === l.mode
              ? n.doCss() &&
                (s.addClass("lSSlide"),
                "" !== l.speed && v.css("transition-duration", l.speed + "ms"),
                "" !== l.cssEasing &&
                  v.css("transition-timing-function", l.cssEasing))
              : n.doCss() &&
                ("" !== l.speed && s.css("transition-duration", l.speed + "ms"),
                "" !== l.cssEasing &&
                  s.css("transition-timing-function", l.cssEasing))),
          e || l.onBeforeSlide.call(this, s, p),
          "slide" === l.mode ? n.slide() : n.fade(),
          v.hasClass("ls-hover") || n.auto(),
          setTimeout(function() {
            e || l.onAfterSlide.call(this, s, p);
          }, l.speed),
          (h = !0);
      }),
      (s.play = function() {
        s.goToNextSlide(), (l.auto = !0), n.auto();
      }),
      (s.pause = function() {
        (l.auto = !1), clearInterval(x);
      }),
      (s.refresh = function() {
        P.init();
      }),
      (s.getCurrentSlideCount = function() {
        var e = p;
        if (l.loop) {
          var i = v.find(".lslide").length,
            t = s.find(".clone.left").length;
          e = p <= t - 1 ? i + (p - t) : p >= i + t ? p - i - t : p - t;
        }
        return e + 1;
      }),
      (s.getTotalSlideCount = function() {
        return v.find(".lslide").length;
      }),
      (s.goToSlide = function(e) {
        (p = l.loop ? e + s.find(".clone.left").length - 1 : e),
          s.mode(!1),
          !0 === l.gallery && n.slideThumb();
      }),
      (s.destroy = function() {
        s.lightSlider &&
          ((s.goToPrevSlide = function() {}),
          (s.goToNextSlide = function() {}),
          (s.mode = function() {}),
          (s.play = function() {}),
          (s.pause = function() {}),
          (s.refresh = function() {}),
          (s.getCurrentSlideCount = function() {}),
          (s.getTotalSlideCount = function() {}),
          (s.goToSlide = function() {}),
          (s.lightSlider = null),
          (P = { init: function() {} }),
          s
            .parent()
            .parent()
            .find(".lSAction, .lSPager")
            .remove(),
          s
            .removeClass(
              "lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right"
            )
            .removeAttr("style")
            .unwrap()
            .unwrap(),
          s.children().removeAttr("style"),
          o.removeClass("lslide active"),
          s.find(".clone").remove(),
          (o = null),
          (x = null),
          (h = !1),
          (p = 0));
      }),
      setTimeout(function() {
        l.onSliderLoad.call(this, s);
      }, 10),
      e(window).on("resize orientationchange", function(e) {
        setTimeout(function() {
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            P.init();
        }, 200);
      }),
      this
    );
  };
})(jQuery);