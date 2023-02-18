(function () {
    (function (window, document, $, undefined) {
        "use strict"; window.console = window.console || { info: function (stuff) { } }; if (!$) { return; }
        if ($.fn.fancybox) { console.info("fancyBox already initialized"); return; }
        var defaults = {
            closeExisting: false, loop: false, gutter: 50, keyboard: true, preventCaptionOverlap: true, arrows: true, infobar: true, smallBtn: "auto", toolbar: "auto", buttons: ["zoom", "slideShow", "thumbs", "close"], idleTime: 3, protect: false, modal: false, image: { preload: false }, ajax: { settings: { data: { fancybox: true } } }, iframe: { tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="fullscreen" src=""></iframe>', preload: true, css: {}, attr: { scrolling: "auto" } }, video: {
                tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' +
                    '<source src="{{src}}" type="{{format}}" />' +
                    'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
                    "</video>", format: "", autoStart: true
            }, defaultType: "image", animationEffect: "zoom", animationDuration: 366, zoomOpacity: "auto", transitionEffect: "fade", transitionDuration: 366, slideClass: "", baseClass: "", baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-inner">' +
                '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-stage"></div>' +
                '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' +
                "</div>" +
                "</div>", spinnerTpl: '<div class="fancybox-loading"></div>', errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>', btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
                        "</a>", zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
                            "</button>", close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
                                "</button>", arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                                    '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
                                    "</button>", arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                                        '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
                                        "</button>", smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
                                            "</button>"
                }, parentEl: "body", hideScrollbar: true, autoFocus: true, backFocus: true, trapFocus: true, fullScreen: { autoStart: false }, touch: { vertical: true, momentum: true }, hash: null, media: {}, slideShow: { autoStart: false, speed: 3000 }, thumbs: { autoStart: false, hideOnClose: true, parentEl: ".fancybox-container", axis: "y" }, wheel: "auto", onInit: $.noop, beforeLoad: $.noop, afterLoad: $.noop, beforeShow: $.noop, afterShow: $.noop, beforeClose: $.noop, afterClose: $.noop, onActivate: $.noop, onDeactivate: $.noop, clickContent: function (current, event) { return current.type === "image" ? "zoom" : false; }, clickSlide: "close", clickOutside: "close", dblclickContent: false, dblclickSlide: false, dblclickOutside: false, mobile: { preventCaptionOverlap: false, idleTime: false, clickContent: function (current, event) { return current.type === "image" ? "toggleControls" : false; }, clickSlide: function (current, event) { return current.type === "image" ? "toggleControls" : "close"; }, dblclickContent: function (current, event) { return current.type === "image" ? "zoom" : false; }, dblclickSlide: function (current, event) { return current.type === "image" ? "zoom" : false; } }, lang: "en", i18n: { en: { CLOSE: "Close", NEXT: "Next", PREV: "Previous", ERROR: "The requested content cannot be loaded. <br/> Please try again later.", PLAY_START: "Start slideshow", PLAY_STOP: "Pause slideshow", FULL_SCREEN: "Full screen", THUMBS: "Thumbnails", DOWNLOAD: "Download", SHARE: "Share", ZOOM: "Zoom" }, de: { CLOSE: "Schlie&szlig;en", NEXT: "Weiter", PREV: "Zur&uuml;ck", ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.", PLAY_START: "Diaschau starten", PLAY_STOP: "Diaschau beenden", FULL_SCREEN: "Vollbild", THUMBS: "Vorschaubilder", DOWNLOAD: "Herunterladen", SHARE: "Teilen", ZOOM: "Vergr&ouml;&szlig;ern" } }
        }; var $W = $(window); var $D = $(document); var called = 0; var isQuery = function (obj) { return obj && obj.hasOwnProperty && obj instanceof $; }; var requestAFrame = (function () { return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 1000 / 60); }); })(); var cancelAFrame = (function () { return (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) { window.clearTimeout(id); }); })(); var transitionEnd = (function () {
            var el = document.createElement("fakeelement"), t; var transitions = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" }; for (t in transitions) { if (el.style[t] !== undefined) { return transitions[t]; } }
            return "transitionend";
        })(); var forceRedraw = function ($el) { return $el && $el.length && $el[0].offsetHeight; }; var mergeOpts = function (opts1, opts2) { var rez = $.extend(true, {}, opts1, opts2); $.each(opts2, function (key, value) { if ($.isArray(value)) { rez[key] = value; } }); return rez; }; var inViewport = function (elem) {
            var elemCenter, rez; if (!elem || elem.ownerDocument !== document) { return false; }
            $(".fancybox-container").css("pointer-events", "none"); elemCenter = { x: elem.getBoundingClientRect().left + elem.offsetWidth / 2, y: elem.getBoundingClientRect().top + elem.offsetHeight / 2 }; rez = document.elementFromPoint(elemCenter.x, elemCenter.y) === elem; $(".fancybox-container").css("pointer-events", ""); return rez;
        }; var FancyBox = function (content, opts, index) {
            var self = this; self.opts = mergeOpts({ index: index }, $.fancybox.defaults); if ($.isPlainObject(opts)) { self.opts = mergeOpts(self.opts, opts); }
            if ($.fancybox.isMobile) { self.opts = mergeOpts(self.opts, self.opts.mobile); }
            self.id = self.opts.id || ++called; self.currIndex = parseInt(self.opts.index, 10) || 0; self.prevIndex = null; self.prevPos = null; self.currPos = 0; self.firstRun = true; self.group = []; self.slides = {}; self.addContent(content); if (!self.group.length) { return; }
            self.init();
        }; $.extend(FancyBox.prototype, {
            init: function () {
                var self = this, firstItem = self.group[self.currIndex], firstItemOpts = firstItem.opts, $container, buttonStr; if (firstItemOpts.closeExisting) { $.fancybox.close(true); }
                $("body").addClass("fancybox-active"); if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false && !$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
                    $("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                        (window.innerWidth - document.documentElement.clientWidth) +
                        "px;}</style>"); $("body").addClass("compensate-for-scrollbar");
                }
                buttonStr = ""; $.each(firstItemOpts.buttons, function (index, value) { buttonStr += firstItemOpts.btnTpl[value] || ""; }); $container = $(self.translate(self, firstItemOpts.baseTpl.replace("{{buttons}}", buttonStr).replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight))).attr("id", "fancybox-container-" + self.id).addClass(firstItemOpts.baseClass).data("FancyBox", self).appendTo(firstItemOpts.parentEl); self.$refs = { container: $container };["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (item) { self.$refs[item] = $container.find(".fancybox-" + item); }); self.trigger("onInit"); self.activate(); self.jumpTo(self.currIndex);
            }, translate: function (obj, str) { var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en; return str.replace(/\{\{(\w+)\}\}/g, function (match, n) { return arr[n] === undefined ? match : arr[n]; }); }, addContent: function (content) {
                var self = this, items = $.makeArray(content), thumbs; $.each(items, function (i, item) {
                    var obj = {}, opts = {}, $item, type, found, src, srcParts; if ($.isPlainObject(item)) { obj = item; opts = item.opts || item; } else if ($.type(item) === "object" && $(item).length) { $item = $(item); opts = $item.data() || {}; opts = $.extend(true, {}, opts, opts.options); opts.$orig = $item; obj.src = self.opts.src || opts.src || $item.attr("href"); if (!obj.type && !obj.src) { obj.type = "inline"; obj.src = item; } } else { obj = { type: "html", src: item + "" }; }
                    obj.opts = $.extend(true, {}, self.opts, opts); if ($.isArray(opts.buttons)) { obj.opts.buttons = opts.buttons; }
                    if ($.fancybox.isMobile && obj.opts.mobile) { obj.opts = mergeOpts(obj.opts, obj.opts.mobile); }
                    type = obj.type || obj.opts.type; src = obj.src || ""; if (!type && src) { if ((found = src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))) { type = "video"; if (!obj.opts.video.format) { obj.opts.video.format = "video/" + (found[1] === "ogv" ? "ogg" : found[1]); } } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) { type = "image"; } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) { type = "iframe"; obj = $.extend(true, obj, { contentType: "pdf", opts: { iframe: { preload: false } } }); } else if (src.charAt(0) === "#") { type = "inline"; } }
                    if (type) { obj.type = type; } else { self.trigger("objectNeedsType", obj); }
                    if (!obj.contentType) { obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type; }
                    obj.index = self.group.length; if (obj.opts.smallBtn == "auto") { obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1; }
                    if (obj.opts.toolbar === "auto") { obj.opts.toolbar = !obj.opts.smallBtn; }
                    obj.$thumb = obj.opts.$thumb || null; if (obj.opts.$trigger && obj.index === self.opts.index) { obj.$thumb = obj.opts.$trigger.find("img:first"); if (obj.$thumb.length) { obj.opts.$orig = obj.opts.$trigger; } }
                    if (!(obj.$thumb && obj.$thumb.length) && obj.opts.$orig) { obj.$thumb = obj.opts.$orig.find("img:first"); }
                    if (obj.$thumb && !obj.$thumb.length) { obj.$thumb = null; }
                    obj.thumb = obj.opts.thumb || (obj.$thumb ? obj.$thumb[0].src : null); if ($.type(obj.opts.caption) === "function") { obj.opts.caption = obj.opts.caption.apply(item, [self, obj]); }
                    if ($.type(self.opts.caption) === "function") { obj.opts.caption = self.opts.caption.apply(item, [self, obj]); }
                    if (!(obj.opts.caption instanceof $)) { obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + ""; }
                    if (obj.type === "ajax") { srcParts = src.split(/\s+/, 2); if (srcParts.length > 1) { obj.src = srcParts.shift(); obj.opts.filter = srcParts.shift(); } }
                    if (obj.opts.modal) { obj.opts = $.extend(true, obj.opts, { trapFocus: true, infobar: 0, toolbar: 0, smallBtn: 0, keyboard: 0, slideShow: 0, fullScreen: 0, thumbs: 0, touch: 0, clickContent: false, clickSlide: false, clickOutside: false, dblclickContent: false, dblclickSlide: false, dblclickOutside: false }); }
                    self.group.push(obj);
                }); if (Object.keys(self.slides).length) { self.updateControls(); thumbs = self.Thumbs; if (thumbs && thumbs.isActive) { thumbs.create(); thumbs.focus(); } }
            }, addEvents: function () {
                var self = this; self.removeEvents(); self.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (e) { e.stopPropagation(); e.preventDefault(); self.close(e); }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) { e.stopPropagation(); e.preventDefault(); self.previous(); }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) { e.stopPropagation(); e.preventDefault(); self.next(); }).on("click.fb", "[data-fancybox-zoom]", function (e) { self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"](); }); $W.on("orientationchange.fb resize.fb", function (e) {
                    if (e && e.originalEvent && e.originalEvent.type === "resize") {
                        if (self.requestId) { cancelAFrame(self.requestId); }
                        self.requestId = requestAFrame(function () { self.update(e); });
                    } else {
                        if (self.current && self.current.type === "iframe") { self.$refs.stage.hide(); }
                        setTimeout(function () { self.$refs.stage.show(); self.update(e); }, $.fancybox.isMobile ? 600 : 250);
                    }
                }); $D.on("keydown.fb", function (e) {
                    var instance = $.fancybox ? $.fancybox.getInstance() : null, current = instance.current, keycode = e.keyCode || e.which; if (keycode == 9) {
                        if (current.opts.trapFocus) { self.focus(e); }
                        return;
                    }
                    if (!current.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input,textarea,video,audio,select")) { return; }
                    if (keycode === 8 || keycode === 27) { e.preventDefault(); self.close(e); return; }
                    if (keycode === 37 || keycode === 38) { e.preventDefault(); self.previous(); return; }
                    if (keycode === 39 || keycode === 40) { e.preventDefault(); self.next(); return; }
                    self.trigger("afterKeydown", e, keycode);
                }); if (self.group[self.currIndex].opts.idleTime) {
                    self.idleSecondsCounter = 0; $D.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (e) {
                        self.idleSecondsCounter = 0; if (self.isIdle) { self.showControls(); }
                        self.isIdle = false;
                    }); self.idleInterval = window.setInterval(function () { self.idleSecondsCounter++; if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) { self.isIdle = true; self.idleSecondsCounter = 0; self.hideControls(); } }, 1000);
                }
            }, removeEvents: function () { var self = this; $W.off("orientationchange.fb resize.fb"); $D.off("keydown.fb .fb-idle"); this.$refs.container.off(".fb-close .fb-prev .fb-next"); if (self.idleInterval) { window.clearInterval(self.idleInterval); self.idleInterval = null; } }, previous: function (duration) { return this.jumpTo(this.currPos - 1, duration); }, next: function (duration) { return this.jumpTo(this.currPos + 1, duration); }, jumpTo: function (pos, duration) {
                var self = this, groupLen = self.group.length, firstRun, isMoved, loop, current, previous, slidePos, stagePos, prop, diff; if (self.isDragging || self.isClosing || (self.isAnimating && self.firstRun)) { return; }
                pos = parseInt(pos, 10); loop = self.current ? self.current.opts.loop : self.opts.loop; if (!loop && (pos < 0 || pos >= groupLen)) { return false; }
                firstRun = self.firstRun = !Object.keys(self.slides).length; previous = self.current; self.prevIndex = self.currIndex; self.prevPos = self.currPos; current = self.createSlide(pos); if (groupLen > 1) {
                    if (loop || current.index < groupLen - 1) { self.createSlide(pos + 1); }
                    if (loop || current.index > 0) { self.createSlide(pos - 1); }
                }
                self.current = current; self.currIndex = current.index; self.currPos = current.pos; self.trigger("beforeShow", firstRun); self.updateControls(); current.forcedDuration = undefined; if ($.isNumeric(duration)) { current.forcedDuration = duration; } else { duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"]; }
                duration = parseInt(duration, 10); isMoved = self.isMoved(current); current.$slide.addClass("fancybox-slide--current"); if (firstRun) {
                    if (current.opts.animationEffect && duration) { self.$refs.container.css("transition-duration", duration + "ms"); }
                    self.$refs.container.addClass("fancybox-is-open").trigger("focus"); self.loadSlide(current); self.preload("image"); return;
                }
                slidePos = $.fancybox.getTranslate(previous.$slide); stagePos = $.fancybox.getTranslate(self.$refs.stage); $.each(self.slides, function (index, slide) { $.fancybox.stop(slide.$slide, true); }); if (previous.pos !== current.pos) { previous.isComplete = false; }
                previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"); if (isMoved) {
                    diff = slidePos.left - (previous.pos * slidePos.width + previous.pos * previous.opts.gutter); $.each(self.slides, function (index, slide) {
                        slide.$slide.removeClass("fancybox-animated").removeClass(function (index, className) { return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" "); }); var leftPos = slide.pos * slidePos.width + slide.pos * slide.opts.gutter; $.fancybox.setTranslate(slide.$slide, { top: 0, left: leftPos - stagePos.left + diff }); if (slide.pos !== current.pos) { slide.$slide.addClass("fancybox-slide--" + (slide.pos > current.pos ? "next" : "previous")); }
                        forceRedraw(slide.$slide); $.fancybox.animate(slide.$slide, { top: 0, left: (slide.pos - current.pos) * slidePos.width + (slide.pos - current.pos) * slide.opts.gutter }, duration, function () { slide.$slide.css({ transform: "", opacity: "" }).removeClass("fancybox-slide--next fancybox-slide--previous"); if (slide.pos === self.currPos) { self.complete(); } });
                    });
                } else if (duration && current.opts.transitionEffect) { prop = "fancybox-animated fancybox-fx-" + current.opts.transitionEffect; previous.$slide.addClass("fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous")); $.fancybox.animate(previous.$slide, prop, duration, function () { previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous"); }, false); }
                if (current.isLoaded) { self.revealContent(current); } else { self.loadSlide(current); }
                self.preload("image");
            }, createSlide: function (pos) {
                var self = this, $slide, index; index = pos % self.group.length; index = index < 0 ? self.group.length + index : index; if (!self.slides[pos] && self.group[index]) { $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage); self.slides[pos] = $.extend(true, {}, self.group[index], { pos: pos, $slide: $slide, isLoaded: false }); self.updateSlide(self.slides[pos]); }
                return self.slides[pos];
            }, scaleToActual: function (x, y, duration) {
                var self = this, current = self.current, $content = current.$content, canvasWidth = $.fancybox.getTranslate(current.$slide).width, canvasHeight = $.fancybox.getTranslate(current.$slide).height, newImgWidth = current.width, newImgHeight = current.height, imgPos, posX, posY, scaleX, scaleY; if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) { return; }
                self.isAnimating = true; $.fancybox.stop($content); x = x === undefined ? canvasWidth * 0.5 : x; y = y === undefined ? canvasHeight * 0.5 : y; imgPos = $.fancybox.getTranslate($content); imgPos.top -= $.fancybox.getTranslate(current.$slide).top; imgPos.left -= $.fancybox.getTranslate(current.$slide).left; scaleX = newImgWidth / imgPos.width; scaleY = newImgHeight / imgPos.height; posX = canvasWidth * 0.5 - newImgWidth * 0.5; posY = canvasHeight * 0.5 - newImgHeight * 0.5; if (newImgWidth > canvasWidth) {
                    posX = imgPos.left * scaleX - (x * scaleX - x); if (posX > 0) { posX = 0; }
                    if (posX < canvasWidth - newImgWidth) { posX = canvasWidth - newImgWidth; }
                }
                if (newImgHeight > canvasHeight) {
                    posY = imgPos.top * scaleY - (y * scaleY - y); if (posY > 0) { posY = 0; }
                    if (posY < canvasHeight - newImgHeight) { posY = canvasHeight - newImgHeight; }
                }
                self.updateCursor(newImgWidth, newImgHeight); $.fancybox.animate($content, { top: posY, left: posX, scaleX: scaleX, scaleY: scaleY }, duration || 366, function () { self.isAnimating = false; }); if (self.SlideShow && self.SlideShow.isActive) { self.SlideShow.stop(); }
            }, scaleToFit: function (duration) {
                var self = this, current = self.current, $content = current.$content, end; if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) { return; }
                self.isAnimating = true; $.fancybox.stop($content); end = self.getFitPos(current); self.updateCursor(end.width, end.height); $.fancybox.animate($content, { top: end.top, left: end.left, scaleX: end.width / $content.width(), scaleY: end.height / $content.height() }, duration || 366, function () { self.isAnimating = false; });
            }, getFitPos: function (slide) {
                var self = this, $content = slide.$content, $slide = slide.$slide, width = slide.width || slide.opts.width, height = slide.height || slide.opts.height, maxWidth, maxHeight, minRatio, aspectRatio, rez = {}; if (!slide.isLoaded || !$content || !$content.length) { return false; }
                maxWidth = $.fancybox.getTranslate(self.$refs.stage).width; maxHeight = $.fancybox.getTranslate(self.$refs.stage).height; maxWidth -= parseFloat($slide.css("paddingLeft")) +
                    parseFloat($slide.css("paddingRight")) +
                    parseFloat($content.css("marginLeft")) +
                    parseFloat($content.css("marginRight")); maxHeight -= parseFloat($slide.css("paddingTop")) +
                        parseFloat($slide.css("paddingBottom")) +
                        parseFloat($content.css("marginTop")) +
                        parseFloat($content.css("marginBottom")); if (!width || !height) { width = maxWidth; height = maxHeight; }
                minRatio = Math.min(1, maxWidth / width, maxHeight / height); width = minRatio * width; height = minRatio * height; if (width > maxWidth - 0.5) { width = maxWidth; }
                if (height > maxHeight - 0.5) { height = maxHeight; }
                if (slide.type === "image") { rez.top = Math.floor((maxHeight - height) * 0.5) + parseFloat($slide.css("paddingTop")); rez.left = Math.floor((maxWidth - width) * 0.5) + parseFloat($slide.css("paddingLeft")); } else if (slide.contentType === "video") { aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9; if (height > width / aspectRatio) { height = width / aspectRatio; } else if (width > height * aspectRatio) { width = height * aspectRatio; } }
                rez.width = width; rez.height = height; return rez;
            }, update: function (e) { var self = this; $.each(self.slides, function (key, slide) { self.updateSlide(slide, e); }); }, updateSlide: function (slide, e) {
                var self = this, $content = slide && slide.$content, width = slide.width || slide.opts.width, height = slide.height || slide.opts.height, $slide = slide.$slide; self.adjustCaption(slide); if ($content && (width || height || slide.contentType === "video") && !slide.hasError) { $.fancybox.stop($content); $.fancybox.setTranslate($content, self.getFitPos(slide)); if (slide.pos === self.currPos) { self.isAnimating = false; self.updateCursor(); } }
                self.adjustLayout(slide); if ($slide.length) { $slide.trigger("refresh"); if (slide.pos === self.currPos) { self.$refs.toolbar.add(self.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", $slide.get(0).scrollHeight > $slide.get(0).clientHeight); } }
                self.trigger("onUpdate", slide, e);
            }, centerSlide: function (duration) {
                var self = this, current = self.current, $slide = current.$slide; if (self.isClosing || !current) { return; }
                $slide.siblings().css({ transform: "", opacity: "" }); $slide.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"); $.fancybox.animate($slide, { top: 0, left: 0, opacity: 1 }, duration === undefined ? 0 : duration, function () { $slide.css({ transform: "", opacity: "" }); if (!current.isComplete) { self.complete(); } }, false);
            }, isMoved: function (slide) {
                var current = slide || this.current, slidePos, stagePos; if (!current) { return false; }
                stagePos = $.fancybox.getTranslate(this.$refs.stage); slidePos = $.fancybox.getTranslate(current.$slide); return (!current.$slide.hasClass("fancybox-animated") && (Math.abs(slidePos.top - stagePos.top) > 0.5 || Math.abs(slidePos.left - stagePos.left) > 0.5));
            }, updateCursor: function (nextWidth, nextHeight) {
                var self = this, current = self.current, $container = self.$refs.container, canPan, isZoomable; if (!current || self.isClosing || !self.Guestures) { return; }
                $container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"); canPan = self.canPan(nextWidth, nextHeight); isZoomable = canPan ? true : self.isZoomable(); $container.toggleClass("fancybox-is-zoomable", isZoomable); $("[data-fancybox-zoom]").prop("disabled", !isZoomable); if (canPan) { $container.addClass("fancybox-can-pan"); } else if (isZoomable && (current.opts.clickContent === "zoom" || ($.isFunction(current.opts.clickContent) && current.opts.clickContent(current) == "zoom"))) { $container.addClass("fancybox-can-zoomIn"); } else if (current.opts.touch && (current.opts.touch.vertical || self.group.length > 1) && current.contentType !== "video") { $container.addClass("fancybox-can-swipe"); }
            }, isZoomable: function () {
                var self = this, current = self.current, fitPos; if (current && !self.isClosing && current.type === "image" && !current.hasError) {
                    if (!current.isLoaded) { return true; }
                    fitPos = self.getFitPos(current); if (fitPos && (current.width > fitPos.width || current.height > fitPos.height)) { return true; }
                }
                return false;
            }, isScaledDown: function (nextWidth, nextHeight) {
                var self = this, rez = false, current = self.current, $content = current.$content; if (nextWidth !== undefined && nextHeight !== undefined) { rez = nextWidth < current.width && nextHeight < current.height; } else if ($content) { rez = $.fancybox.getTranslate($content); rez = rez.width < current.width && rez.height < current.height; }
                return rez;
            }, canPan: function (nextWidth, nextHeight) {
                var self = this, current = self.current, pos = null, rez = false; if (current.type === "image" && (current.isComplete || (nextWidth && nextHeight)) && !current.hasError) {
                    rez = self.getFitPos(current); if (nextWidth !== undefined && nextHeight !== undefined) { pos = { width: nextWidth, height: nextHeight }; } else if (current.isComplete) { pos = $.fancybox.getTranslate(current.$content); }
                    if (pos && rez) { rez = Math.abs(pos.width - rez.width) > 1.5 || Math.abs(pos.height - rez.height) > 1.5; }
                }
                return rez;
            }, loadSlide: function (slide) {
                var self = this, type, $slide, ajaxLoad; if (slide.isLoading || slide.isLoaded) { return; }
                slide.isLoading = true; if (self.trigger("beforeLoad", slide) === false) { slide.isLoading = false; return false; }
                type = slide.type; $slide = slide.$slide; $slide.off("refresh").trigger("onReset").addClass(slide.opts.slideClass); switch (type) {
                    case "image": self.setImage(slide); break; case "iframe": self.setIframe(slide); break; case "html": self.setContent(slide, slide.src || slide.content); break; case "video": self.setContent(slide, slide.opts.video.tpl.replace(/\{\{src\}\}/gi, slide.src).replace("{{format}}", slide.opts.videoFormat || slide.opts.video.format || "").replace("{{poster}}", slide.thumb || "")); break; case "inline": if ($(slide.src).length) { self.setContent(slide, $(slide.src)); } else { self.setError(slide); }
                        break; case "ajax": self.showLoading(slide); ajaxLoad = $.ajax($.extend({}, slide.opts.ajax.settings, { url: slide.src, success: function (data, textStatus) { if (textStatus === "success") { self.setContent(slide, data); } }, error: function (jqXHR, textStatus) { if (jqXHR && textStatus !== "abort") { self.setError(slide); } } })); $slide.one("onReset", function () { ajaxLoad.abort(); }); break; default: self.setError(slide); break;
                }
                return true;
            }, setImage: function (slide) {
                var self = this, ghost; setTimeout(function () { var $img = slide.$image; if (!self.isClosing && slide.isLoading && (!$img || !$img.length || !$img[0].complete) && !slide.hasError) { self.showLoading(slide); } }, 50); self.checkSrcset(slide); slide.$content = $('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(slide.$slide.addClass("fancybox-slide--image")); if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && slide.thumb) { slide.width = slide.opts.width; slide.height = slide.opts.height; ghost = document.createElement("img"); ghost.onerror = function () { $(this).remove(); slide.$ghost = null; }; ghost.onload = function () { self.afterLoad(slide); }; slide.$ghost = $(ghost).addClass("fancybox-image").appendTo(slide.$content).attr("src", slide.thumb); }
                self.setBigImage(slide);
            }, checkSrcset: function (slide) {
                var srcset = slide.opts.srcset || slide.opts.image.srcset, found, temp, pxRatio, windowWidth; if (srcset) {
                    pxRatio = window.devicePixelRatio || 1; windowWidth = window.innerWidth * pxRatio; temp = srcset.split(",").map(function (el) {
                        var ret = {}; el.trim().split(/\s+/).forEach(function (el, i) {
                            var value = parseInt(el.substring(0, el.length - 1), 10); if (i === 0) { return (ret.url = el); }
                            if (value) { ret.value = value; ret.postfix = el[el.length - 1]; }
                        }); return ret;
                    }); temp.sort(function (a, b) { return a.value - b.value; }); for (var j = 0; j < temp.length; j++) { var el = temp[j]; if ((el.postfix === "w" && el.value >= windowWidth) || (el.postfix === "x" && el.value >= pxRatio)) { found = el; break; } }
                    if (!found && temp.length) { found = temp[temp.length - 1]; }
                    if (found) {
                        slide.src = found.url; if (slide.width && slide.height && found.postfix == "w") { slide.height = (slide.width / slide.height) * found.value; slide.width = found.value; }
                        slide.opts.srcset = srcset;
                    }
                }
            }, setBigImage: function (slide) {
                var self = this, img = document.createElement("img"), $img = $(img); slide.$image = $img.one("error", function () { self.setError(slide); }).one("load", function () {
                    var sizes; if (!slide.$ghost) { self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight); self.afterLoad(slide); }
                    if (self.isClosing) { return; }
                    if (slide.opts.srcset) {
                        sizes = slide.opts.sizes; if (!sizes || sizes === "auto") {
                            sizes = (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round((slide.width / slide.height) * 100)) +
                            "vw";
                        }
                        $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
                    }
                    if (slide.$ghost) { setTimeout(function () { if (slide.$ghost && !self.isClosing) { slide.$ghost.hide(); } }, Math.min(300, Math.max(1000, slide.height / 1600))); }
                    self.hideLoading(slide);
                }).addClass("fancybox-image").attr("src", slide.src).appendTo(slide.$content); if ((img.complete || img.readyState == "complete") && $img.naturalWidth && $img.naturalHeight) { $img.trigger("load"); } else if (img.error) { $img.trigger("error"); }
            }, resolveImageSlideSize: function (slide, imgWidth, imgHeight) {
                var maxWidth = parseInt(slide.opts.width, 10), maxHeight = parseInt(slide.opts.height, 10); slide.width = imgWidth; slide.height = imgHeight; if (maxWidth > 0) { slide.width = maxWidth; slide.height = Math.floor((maxWidth * imgHeight) / imgWidth); }
                if (maxHeight > 0) { slide.width = Math.floor((maxHeight * imgWidth) / imgHeight); slide.height = maxHeight; }
            }, setIframe: function (slide) {
                var self = this, opts = slide.opts.iframe, $slide = slide.$slide, $iframe; slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>').css(opts.css).appendTo($slide); $slide.addClass("fancybox-slide--" + slide.contentType); slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(opts.attr).appendTo(slide.$content); if (opts.preload) {
                    self.showLoading(slide); $iframe.on("load.fb error.fb", function (e) { this.isReady = 1; slide.$slide.trigger("refresh"); self.afterLoad(slide); }); $slide.on("refresh.fb", function () {
                        var $content = slide.$content, frameWidth = opts.css.width, frameHeight = opts.css.height, $contents, $body; if ($iframe[0].isReady !== 1) { return; }
                        try { $contents = $iframe.contents(); $body = $contents.find("body"); } catch (ignore) { }
                        if ($body && $body.length && $body.children().length) {
                            $slide.css("overflow", "visible"); $content.css({ width: "100%", "max-width": "100%", height: "9999px" }); if (frameWidth === undefined) { frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true))); }
                            $content.css("width", frameWidth ? frameWidth : "").css("max-width", ""); if (frameHeight === undefined) { frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true))); }
                            $content.css("height", frameHeight ? frameHeight : ""); $slide.css("overflow", "auto");
                        }
                        $content.removeClass("fancybox-is-hidden");
                    });
                } else { self.afterLoad(slide); }
                $iframe.attr("src", slide.src); $slide.one("onReset", function () {
                    try { $(this).find("iframe").hide().unbind().attr("src", "//about:blank"); } catch (ignore) { }
                    $(this).off("refresh.fb").empty(); slide.isLoaded = false; slide.isRevealed = false;
                });
            }, setContent: function (slide, content) {
                var self = this; if (self.isClosing) { return; }
                self.hideLoading(slide); if (slide.$content) { $.fancybox.stop(slide.$content); }
                slide.$slide.empty(); if (isQuery(content) && content.parent().length) {
                    if (content.hasClass("fancybox-content") || content.parent().hasClass("fancybox-content")) { content.parents(".fancybox-slide").trigger("onReset"); }
                    slide.$placeholder = $("<div>").hide().insertAfter(content); content.css("display", "inline-block");
                } else if (!slide.hasError) {
                    if ($.type(content) === "string") { content = $("<div>").append($.trim(content)).contents(); }
                    if (slide.opts.filter) { content = $("<div>").html(content).find(slide.opts.filter); }
                }
                slide.$slide.one("onReset", function () {
                    $(this).find("video,audio").trigger("pause"); if (slide.$placeholder) { slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove(); slide.$placeholder = null; }
                    if (slide.$smallBtn) { slide.$smallBtn.remove(); slide.$smallBtn = null; }
                    if (!slide.hasError) { $(this).empty(); slide.isLoaded = false; slide.isRevealed = false; }
                }); $(content).appendTo(slide.$slide); if ($(content).is("video,audio")) { $(content).addClass("fancybox-video"); $(content).wrap("<div></div>"); slide.contentType = "video"; slide.opts.width = slide.opts.width || $(content).attr("width"); slide.opts.height = slide.opts.height || $(content).attr("height"); }
                slide.$content = slide.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(); slide.$content.siblings().hide(); if (!slide.$content.length) { slide.$content = slide.$slide.wrapInner("<div></div>").children().first(); }
                slide.$content.addClass("fancybox-content"); slide.$slide.addClass("fancybox-slide--" + slide.contentType); self.afterLoad(slide);
            }, setError: function (slide) { slide.hasError = true; slide.$slide.trigger("onReset").removeClass("fancybox-slide--" + slide.contentType).addClass("fancybox-slide--error"); slide.contentType = "html"; this.setContent(slide, this.translate(slide, slide.opts.errorTpl)); if (slide.pos === this.currPos) { this.isAnimating = false; } }, showLoading: function (slide) { var self = this; slide = slide || self.current; if (slide && !slide.$spinner) { slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide).hide().fadeIn("fast"); } }, hideLoading: function (slide) { var self = this; slide = slide || self.current; if (slide && slide.$spinner) { slide.$spinner.stop().remove(); delete slide.$spinner; } }, afterLoad: function (slide) {
                var self = this; if (self.isClosing) { return; }
                slide.isLoading = false; slide.isLoaded = true; self.trigger("afterLoad", slide); self.hideLoading(slide); if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) { slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content); }
                if (slide.opts.protect && slide.$content && !slide.hasError) {
                    slide.$content.on("contextmenu.fb", function (e) {
                        if (e.button == 2) { e.preventDefault(); }
                        return true;
                    }); if (slide.type === "image") { $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content); }
                }
                self.adjustCaption(slide); self.adjustLayout(slide); if (slide.pos === self.currPos) { self.updateCursor(); }
                self.revealContent(slide);
            }, adjustCaption: function (slide) {
                var self = this, current = slide || self.current, caption = current.opts.caption, preventOverlap = current.opts.preventCaptionOverlap, $caption = self.$refs.caption, $clone, captionH = false; $caption.toggleClass("fancybox-caption--separate", preventOverlap); if (preventOverlap && caption && caption.length) {
                    if (current.pos !== self.currPos) { $clone = $caption.clone().appendTo($caption.parent()); $clone.children().eq(0).empty().html(caption); captionH = $clone.outerHeight(true); $clone.empty().remove(); } else if (self.$caption) { captionH = self.$caption.outerHeight(true); }
                    current.$slide.css("padding-bottom", captionH || "");
                }
            }, adjustLayout: function (slide) {
                var self = this, current = slide || self.current, scrollHeight, marginBottom, inlinePadding, actualPadding; if (current.isLoaded && current.opts.disableLayoutFix !== true) {
                    current.$content.css("margin-bottom", ""); if (current.$content.outerHeight() > current.$slide.height() + 0.5) {
                        inlinePadding = current.$slide[0].style["padding-bottom"]; actualPadding = current.$slide.css("padding-bottom"); if (parseFloat(actualPadding) > 0) {
                            scrollHeight = current.$slide[0].scrollHeight; current.$slide.css("padding-bottom", 0); if (Math.abs(scrollHeight - current.$slide[0].scrollHeight) < 1) { marginBottom = actualPadding; }
                            current.$slide.css("padding-bottom", inlinePadding);
                        }
                    }
                    current.$content.css("margin-bottom", marginBottom);
                }
            }, revealContent: function (slide) {
                var self = this, $slide = slide.$slide, end = false, start = false, isMoved = self.isMoved(slide), isRevealed = slide.isRevealed, effect, effectClassName, duration, opacity; slide.isRevealed = true; effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"]; duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"]; duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10); if (isMoved || slide.pos !== self.currPos || !duration) { effect = false; }
                if (effect === "zoom") { if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) { end = self.getFitPos(slide); } else { effect = "fade"; } }
                if (effect === "zoom") {
                    self.isAnimating = true; end.scaleX = end.width / start.width; end.scaleY = end.height / start.height; opacity = slide.opts.zoomOpacity; if (opacity == "auto") { opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1; }
                    if (opacity) { start.opacity = 0.1; end.opacity = 1; }
                    $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start); forceRedraw(slide.$content); $.fancybox.animate(slide.$content, end, duration, function () { self.isAnimating = false; self.complete(); }); return;
                }
                self.updateSlide(slide); if (!effect) {
                    slide.$content.removeClass("fancybox-is-hidden"); if (!isRevealed && isMoved && slide.type === "image" && !slide.hasError) { slide.$content.hide().fadeIn("fast"); }
                    if (slide.pos === self.currPos) { self.complete(); }
                    return;
                }
                $.fancybox.stop($slide); effectClassName = "fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + effect; $slide.addClass(effectClassName).removeClass("fancybox-slide--current"); slide.$content.removeClass("fancybox-is-hidden"); forceRedraw($slide); if (slide.type !== "image") { slide.$content.hide().show(0); }
                $.fancybox.animate($slide, "fancybox-slide--current", duration, function () { $slide.removeClass(effectClassName).css({ transform: "", opacity: "" }); if (slide.pos === self.currPos) { self.complete(); } }, true);
            }, getThumbPos: function (slide) {
                var rez = false, $thumb = slide.$thumb, thumbPos, btw, brw, bbw, blw; if (!$thumb || !inViewport($thumb[0])) { return false; }
                thumbPos = $.fancybox.getTranslate($thumb); btw = parseFloat($thumb.css("border-top-width") || 0); brw = parseFloat($thumb.css("border-right-width") || 0); bbw = parseFloat($thumb.css("border-bottom-width") || 0); blw = parseFloat($thumb.css("border-left-width") || 0); rez = { top: thumbPos.top + btw, left: thumbPos.left + blw, width: thumbPos.width - brw - blw, height: thumbPos.height - btw - bbw, scaleX: 1, scaleY: 1 }; return thumbPos.width > 0 && thumbPos.height > 0 ? rez : false;
            }, complete: function () {
                var self = this, current = self.current, slides = {}, $el; if (self.isMoved() || !current.isLoaded) { return; }
                if (!current.isComplete) { current.isComplete = true; current.$slide.siblings().trigger("onReset"); self.preload("inline"); forceRedraw(current.$slide); current.$slide.addClass("fancybox-slide--complete"); $.each(self.slides, function (key, slide) { if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) { slides[slide.pos] = slide; } else if (slide) { $.fancybox.stop(slide.$slide); slide.$slide.off().remove(); } }); self.slides = slides; }
                self.isAnimating = false; self.updateCursor(); self.trigger("afterShow"); if (!!current.opts.video.autoStart) {
                    current.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function () {
                        if (Document.exitFullscreen) { Document.exitFullscreen(); } else if (this.webkitExitFullscreen) { this.webkitExitFullscreen(); }
                        self.next();
                    });
                }
                if (current.opts.autoFocus && current.contentType === "html") { $el = current.$content.find("input[autofocus]:enabled:visible:first"); if ($el.length) { $el.trigger("focus"); } else { self.focus(null, true); } }
                current.$slide.scrollTop(0).scrollLeft(0);
            }, preload: function (type) {
                var self = this, prev, next; if (self.group.length < 2) { return; }
                next = self.slides[self.currPos + 1]; prev = self.slides[self.currPos - 1]; if (prev && prev.type === type) { self.loadSlide(prev); }
                if (next && next.type === type) { self.loadSlide(next); }
            }, focus: function (e, firstRun) {
                var self = this, focusableStr = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(","), focusableItems, focusedItemIndex; if (self.isClosing) { return; }
                if (e || !self.current || !self.current.isComplete) { focusableItems = self.$refs.container.find("*:visible"); } else { focusableItems = self.current.$slide.find("*:visible" + (firstRun ? ":not(.fancybox-close-small)" : "")); }
                focusableItems = focusableItems.filter(focusableStr).filter(function () { return $(this).css("visibility") !== "hidden" && !$(this).hasClass("disabled"); }); if (focusableItems.length) {
                    focusedItemIndex = focusableItems.index(document.activeElement); if (e && e.shiftKey) { if (focusedItemIndex < 0 || focusedItemIndex == 0) { e.preventDefault(); focusableItems.eq(focusableItems.length - 1).trigger("focus"); } } else {
                        if (focusedItemIndex < 0 || focusedItemIndex == focusableItems.length - 1) {
                            if (e) { e.preventDefault(); }
                            focusableItems.eq(0).trigger("focus");
                        }
                    }
                } else { self.$refs.container.trigger("focus"); }
            }, activate: function () {
                var self = this; $(".fancybox-container").each(function () { var instance = $(this).data("FancyBox"); if (instance && instance.id !== self.id && !instance.isClosing) { instance.trigger("onDeactivate"); instance.removeEvents(); instance.isVisible = false; } }); self.isVisible = true; if (self.current || self.isIdle) { self.update(); self.updateControls(); }
                self.trigger("onActivate"); self.addEvents();
            }, close: function (e, d) {
                var self = this, current = self.current, effect, duration, $content, domRect, opacity, start, end; var done = function () { self.cleanUp(e); }; if (self.isClosing) { return false; }
                self.isClosing = true; if (self.trigger("beforeClose", e) === false) { self.isClosing = false; requestAFrame(function () { self.update(); }); return false; }
                self.removeEvents(); $content = current.$content; effect = current.opts.animationEffect; duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0; current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"); if (e !== true) { $.fancybox.stop(current.$slide); } else { effect = false; }
                current.$slide.siblings().trigger("onReset").remove(); if (duration) { self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", duration + "ms"); }
                self.hideLoading(current); self.hideControls(true); self.updateCursor(); if (effect === "zoom" && !($content && duration && current.type === "image" && !self.isMoved() && !current.hasError && (end = self.getThumbPos(current)))) { effect = "fade"; }
                if (effect === "zoom") {
                    $.fancybox.stop($content); domRect = $.fancybox.getTranslate($content); start = { top: domRect.top, left: domRect.left, scaleX: domRect.width / end.width, scaleY: domRect.height / end.height, width: end.width, height: end.height }; opacity = current.opts.zoomOpacity; if (opacity == "auto") { opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1; }
                    if (opacity) { end.opacity = 0; }
                    $.fancybox.setTranslate($content, start); forceRedraw($content); $.fancybox.animate($content, end, duration, done); return true;
                }
                if (effect && duration) { $.fancybox.animate(current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + effect, duration, done); } else { if (e === true) { setTimeout(done, duration); } else { done(); } }
                return true;
            }, cleanUp: function (e) {
                var self = this, instance, $focus = self.current.opts.$orig, x, y; self.current.$slide.trigger("onReset"); self.$refs.container.empty().remove(); self.trigger("afterClose", e); if (!!self.current.opts.backFocus) {
                    if (!$focus || !$focus.length || !$focus.is(":visible")) { $focus = self.$trigger; }
                    if ($focus && $focus.length) { x = window.scrollX; y = window.scrollY; $focus.trigger("focus"); $("html, body").scrollTop(y).scrollLeft(x); }
                }
                self.current = null; instance = $.fancybox.getInstance(); if (instance) { instance.activate(); } else { $("body").removeClass("fancybox-active compensate-for-scrollbar"); $("#fancybox-style-noscroll").remove(); }
            }, trigger: function (name, slide) {
                var args = Array.prototype.slice.call(arguments, 1), self = this, obj = slide && slide.opts ? slide : self.current, rez; if (obj) { args.unshift(obj); } else { obj = self; }
                args.unshift(self); if ($.isFunction(obj.opts[name])) { rez = obj.opts[name].apply(obj, args); }
                if (rez === false) { return rez; }
                if (name === "afterClose" || !self.$refs) { $D.trigger(name + ".fb", args); } else { self.$refs.container.trigger(name + ".fb", args); }
            }, updateControls: function () {
                var self = this, current = self.current, index = current.index, $container = self.$refs.container, $caption = self.$refs.caption, caption = current.opts.caption; current.$slide.trigger("refresh"); if (caption && caption.length) { self.$caption = $caption; $caption.children().eq(0).html(caption); } else { self.$caption = null; }
                if (!self.hasHiddenControls && !self.isIdle) { self.showControls(); }
                $container.find("[data-fancybox-count]").html(self.group.length); $container.find("[data-fancybox-index]").html(index + 1); $container.find("[data-fancybox-prev]").prop("disabled", !current.opts.loop && index <= 0); $container.find("[data-fancybox-next]").prop("disabled", !current.opts.loop && index >= self.group.length - 1); if (current.type === "image") { $container.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", current.opts.image.src || current.src).show(); } else if (current.opts.toolbar) { $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide(); }
                if ($(document.activeElement).is(":hidden,[disabled]")) { self.$refs.container.trigger("focus"); }
            }, hideControls: function (andCaption) {
                var self = this, arr = ["infobar", "toolbar", "nav"]; if (andCaption || !self.current.opts.preventCaptionOverlap) { arr.push("caption"); }
                this.$refs.container.removeClass(arr.map(function (i) { return "fancybox-show-" + i; }).join(" ")); this.hasHiddenControls = true;
            }, showControls: function () { var self = this, opts = self.current ? self.current.opts : self.opts, $container = self.$refs.container; self.hasHiddenControls = false; self.idleSecondsCounter = 0; $container.toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons)).toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1)).toggleClass("fancybox-show-caption", !!self.$caption).toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1)).toggleClass("fancybox-is-modal", !!opts.modal); }, toggleControls: function () { if (this.hasHiddenControls) { this.showControls(); } else { this.hideControls(); } }
        }); $.fancybox = {
            version: "3.5.7", defaults: defaults, getInstance: function (command) {
                var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"), args = Array.prototype.slice.call(arguments, 1); if (instance instanceof FancyBox) {
                    if ($.type(command) === "string") { instance[command].apply(instance, args); } else if ($.type(command) === "function") { command.apply(instance, args); }
                    return instance;
                }
                return false;
            }, open: function (items, opts, index) { return new FancyBox(items, opts, index); }, close: function (all) { var instance = this.getInstance(); if (instance) { instance.close(); if (all === true) { this.close(all); } } }, destroy: function () { this.close(true); $D.add("body").off("click.fb-start", "**"); }, isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), use3d: (function () { var div = document.createElement("div"); return (window.getComputedStyle && window.getComputedStyle(div) && window.getComputedStyle(div).getPropertyValue("transform") && !(document.documentMode && document.documentMode < 11)); })(), getTranslate: function ($el) {
                var domRect; if (!$el || !$el.length) { return false; }
                domRect = $el[0].getBoundingClientRect(); return { top: domRect.top || 0, left: domRect.left || 0, width: domRect.width, height: domRect.height, opacity: parseFloat($el.css("opacity")) };
            }, setTranslate: function ($el, props) {
                var str = "", css = {}; if (!$el || !props) { return; }
                if (props.left !== undefined || props.top !== undefined) {
                    str = (props.left === undefined ? $el.position().left : props.left) +
                    "px, " +
                    (props.top === undefined ? $el.position().top : props.top) +
                    "px"; if (this.use3d) { str = "translate3d(" + str + ", 0px)"; } else { str = "translate(" + str + ")"; }
                }
                if (props.scaleX !== undefined && props.scaleY !== undefined) { str += " scale(" + props.scaleX + ", " + props.scaleY + ")"; } else if (props.scaleX !== undefined) { str += " scaleX(" + props.scaleX + ")"; }
                if (str.length) { css.transform = str; }
                if (props.opacity !== undefined) { css.opacity = props.opacity; }
                if (props.width !== undefined) { css.width = props.width; }
                if (props.height !== undefined) { css.height = props.height; }
                return $el.css(css);
            }, animate: function ($el, to, duration, callback, leaveAnimationName) {
                var self = this, from; if ($.isFunction(duration)) { callback = duration; duration = null; }
                self.stop($el); from = self.getTranslate($el); $el.on(transitionEnd, function (e) {
                    if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) { return; }
                    self.stop($el); if ($.isNumeric(duration)) { $el.css("transition-duration", ""); }
                    if ($.isPlainObject(to)) { if (to.scaleX !== undefined && to.scaleY !== undefined) { self.setTranslate($el, { top: to.top, left: to.left, width: from.width * to.scaleX, height: from.height * to.scaleY, scaleX: 1, scaleY: 1 }); } } else if (leaveAnimationName !== true) { $el.removeClass(to); }
                    if ($.isFunction(callback)) { callback(e); }
                }); if ($.isNumeric(duration)) { $el.css("transition-duration", duration + "ms"); }
                if ($.isPlainObject(to)) {
                    if (to.scaleX !== undefined && to.scaleY !== undefined) { delete to.width; delete to.height; if ($el.parent().hasClass("fancybox-slide--image")) { $el.parent().addClass("fancybox-is-scaling"); } }
                    $.fancybox.setTranslate($el, to);
                } else { $el.addClass(to); }
                $el.data("timer", setTimeout(function () { $el.trigger(transitionEnd); }, duration + 33));
            }, stop: function ($el, callCallback) {
                if ($el && $el.length) {
                    clearTimeout($el.data("timer")); if (callCallback) { $el.trigger(transitionEnd); }
                    $el.off(transitionEnd).css("transition-duration", ""); $el.parent().removeClass("fancybox-is-scaling");
                }
            }
        }; function _run(e, opts) {
            var items = [], index = 0, $target, value, instance; if (e && e.isDefaultPrevented()) { return; }
            e.preventDefault(); opts = opts || {}; if (e && e.data) { opts = mergeOpts(e.data.options, opts); }
            $target = opts.$target || $(e.currentTarget).trigger("blur"); instance = $.fancybox.getInstance(); if (instance && instance.$trigger && instance.$trigger.is($target)) { return; }
            if (opts.selector) { items = $(opts.selector); } else { value = $target.attr("data-fancybox") || ""; if (value) { items = e.data ? e.data.items : []; items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]'); } else { items = [$target]; } }
            index = $(items).index($target); if (index < 0) { index = 0; }
            instance = $.fancybox.open(items, opts, index); instance.$trigger = $target;
        }
        $.fn.fancybox = function (options) {
            var selector; options = options || {}; selector = options.selector || false; if (selector) { $("body").off("click.fb-start", selector).on("click.fb-start", selector, { options: options }, _run); } else { this.off("click.fb-start").on("click.fb-start", { items: this, options: options }, _run); }
            return this;
        }; $D.on("click.fb-start", "[data-fancybox]", _run); $D.on("click.fb-start", "[data-fancybox-trigger]", function (e) { $('[data-fancybox="' + $(this).attr("data-fancybox-trigger") + '"]').eq($(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", { $trigger: $(this) }); }); (function () {
            var buttonStr = ".fancybox-button", focusStr = "fancybox-focus", $pressed = null; $D.on("mousedown mouseup focus blur", buttonStr, function (e) {
                switch (e.type) {
                    case "mousedown": $pressed = $(this); break; case "mouseup": $pressed = null; break; case "focusin": $(buttonStr).removeClass(focusStr); if (!$(this).is($pressed) && !$(this).is("[disabled]")) { $(this).addClass(focusStr); }
                        break; case "focusout": $(buttonStr).removeClass(focusStr); break;
                }
            });
        })();
    })(window, document, jQuery); (function ($) {
        "use strict"; var defaults = {
            youtube: { matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i, params: { autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 }, paramPlace: 8, type: "iframe", url: "https://www.youtube-nocookie.com/embed/$4", thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg" }, vimeo: { matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/, params: { autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1 }, paramPlace: 3, type: "iframe", url: "//player.vimeo.com/video/$2" }, instagram: { matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i, type: "image", url: "//$1/p/$2/media/?size=l" }, gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i, type: "iframe", url: function (rez) {
                    return ("//maps.google." +
                        rez[2] +
                        "/?ll=" +
                        (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") +
                        "&output=" +
                        (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed"));
                }
            }, gmap_search: { matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i, type: "iframe", url: function (rez) { return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"; } }
        }; var format = function (url, rez, params) {
            if (!url) { return; }
            params = params || ""; if ($.type(params) === "object") { params = $.param(params, true); }
            $.each(rez, function (key, value) { url = url.replace("$" + key, value || ""); }); if (params.length) { url += (url.indexOf("?") > 0 ? "&" : "?") + params; }
            return url;
        }; $(document).on("objectNeedsType.fb", function (e, instance, item) {
            var url = item.src || "", type = false, media, thumb, rez, params, urlParams, paramObj, provider; media = $.extend(true, {}, defaults, item.opts.media); $.each(media, function (providerName, providerOpts) {
                rez = url.match(providerOpts.matcher); if (!rez) { return; }
                type = providerOpts.type; provider = providerName; paramObj = {}; if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
                    urlParams = rez[providerOpts.paramPlace]; if (urlParams[0] == "?") { urlParams = urlParams.substring(1); }
                    urlParams = urlParams.split("&"); for (var m = 0; m < urlParams.length; ++m) { var p = urlParams[m].split("=", 2); if (p.length == 2) { paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); } }
                }
                params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj); url = $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params); thumb = $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez); if (providerName === "youtube") { url = url.replace(/&t=((\d+)m)?(\d+)s/, function (match, p1, m, s) { return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10)); }); } else if (providerName === "vimeo") { url = url.replace("&%23", "#"); }
                return false;
            }); if (type) {
                if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) { item.opts.thumb = thumb; }
                if (type === "iframe") { item.opts = $.extend(true, item.opts, { iframe: { preload: false, attr: { scrolling: "no" } } }); }
                $.extend(item, { type: type, src: url, origSrc: item.src, contentSource: provider, contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video" });
            } else if (url) { item.type = item.opts.defaultType; }
        }); var VideoAPILoader = {
            youtube: { src: "https://www.youtube.com/iframe_api", class: "YT", loading: false, loaded: false }, vimeo: { src: "https://player.vimeo.com/api/player.js", class: "Vimeo", loading: false, loaded: false }, load: function (vendor) {
                var _this = this, script; if (this[vendor].loaded) { setTimeout(function () { _this.done(vendor); }); return; }
                if (this[vendor].loading) { return; }
                this[vendor].loading = true; script = document.createElement("script"); script.type = "text/javascript"; script.src = this[vendor].src; if (vendor === "youtube") { window.onYouTubeIframeAPIReady = function () { _this[vendor].loaded = true; _this.done(vendor); }; } else { script.onload = function () { _this[vendor].loaded = true; _this.done(vendor); }; }
                document.body.appendChild(script);
            }, done: function (vendor) {
                var instance, $el, player; if (vendor === "youtube") { delete window.onYouTubeIframeAPIReady; }
                instance = $.fancybox.getInstance(); if (instance) { $el = instance.current.$content.find("iframe"); if (vendor === "youtube" && YT !== undefined && YT) { player = new YT.Player($el.attr("id"), { events: { onStateChange: function (e) { if (e.data == 0) { instance.next(); } } } }); } else if (vendor === "vimeo" && Vimeo !== undefined && Vimeo) { player = new Vimeo.Player($el); player.on("ended", function () { instance.next(); }); } }
            }
        }; $(document).on({ "afterShow.fb": function (e, instance, current) { if (instance.group.length > 1 && (current.contentSource === "youtube" || current.contentSource === "vimeo")) { VideoAPILoader.load(current.contentSource); } } });
    })(jQuery); (function (window, document, $) {
        "use strict"; var requestAFrame = (function () { return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 1000 / 60); }); })(); var cancelAFrame = (function () { return (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) { window.clearTimeout(id); }); })(); var getPointerXY = function (e) {
            var result = []; e = e.originalEvent || e || window.e; e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e]; for (var key in e) { if (e[key].pageX) { result.push({ x: e[key].pageX, y: e[key].pageY }); } else if (e[key].clientX) { result.push({ x: e[key].clientX, y: e[key].clientY }); } }
            return result;
        }; var distance = function (point2, point1, what) {
            if (!point1 || !point2) { return 0; }
            if (what === "x") { return point2.x - point1.x; } else if (what === "y") { return point2.y - point1.y; }
            return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        }; var isClickable = function ($el) {
            if ($el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || $.isFunction($el.get(0).onclick) || $el.data("selectable")) { return true; }
            for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) { if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") { return true; } }
            return false;
        }; var hasScrollbars = function (el) { var overflowY = window.getComputedStyle(el)["overflow-y"], overflowX = window.getComputedStyle(el)["overflow-x"], vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight, horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth; return vertical || horizontal; }; var isScrollable = function ($el) {
            var rez = false; while (true) {
                rez = hasScrollbars($el.get(0)); if (rez) { break; }
                $el = $el.parent(); if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) { break; }
            }
            return rez;
        }; var Guestures = function (instance) { var self = this; self.instance = instance; self.$bg = instance.$refs.bg; self.$stage = instance.$refs.stage; self.$container = instance.$refs.container; self.destroy(); self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart")); }; Guestures.prototype.destroy = function () {
            var self = this; self.$container.off(".fb.touch"); $(document).off(".fb.touch"); if (self.requestId) { cancelAFrame(self.requestId); self.requestId = null; }
            if (self.tapped) { clearTimeout(self.tapped); self.tapped = null; }
        }; Guestures.prototype.ontouchstart = function (e) {
            var self = this, $target = $(e.target), instance = self.instance, current = instance.current, $slide = current.$slide, $content = current.$content, isTouchDevice = e.type == "touchstart"; if (isTouchDevice) { self.$container.off("mousedown.fb.touch"); }
            if (e.originalEvent && e.originalEvent.button == 2) { return; }
            if (!$slide.length || !$target.length || isClickable($target) || isClickable($target.parent())) { return; }
            if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) { return; }
            if (!current || instance.isAnimating || current.$slide.hasClass("fancybox-animated")) { e.stopPropagation(); e.preventDefault(); return; }
            self.realPoints = self.startPoints = getPointerXY(e); if (!self.startPoints.length) { return; }
            if (current.touch) { e.stopPropagation(); }
            self.startEvent = e; self.canTap = true; self.$target = $target; self.$content = $content; self.opts = current.opts.touch; self.isPanning = false; self.isSwiping = false; self.isZooming = false; self.isScrolling = false; self.canPan = instance.canPan(); self.startTime = new Date().getTime(); self.distanceX = self.distanceY = self.distance = 0; self.canvasWidth = Math.round($slide[0].clientWidth); self.canvasHeight = Math.round($slide[0].clientHeight); self.contentLastPos = null; self.contentStartPos = $.fancybox.getTranslate(self.$content) || { top: 0, left: 0 }; self.sliderStartPos = $.fancybox.getTranslate($slide); self.stagePos = $.fancybox.getTranslate(instance.$refs.stage); self.sliderStartPos.top -= self.stagePos.top; self.sliderStartPos.left -= self.stagePos.left; self.contentStartPos.top -= self.stagePos.top; self.contentStartPos.left -= self.stagePos.left; $(document).off(".fb.touch").on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend")).on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove")); if ($.fancybox.isMobile) { document.addEventListener("scroll", self.onscroll, true); }
            if (!(self.opts || self.canPan) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
                if ($target.is(".fancybox-image")) { e.preventDefault(); }
                if (!($.fancybox.isMobile && $target.parents(".fancybox-caption").length)) { return; }
            }
            self.isScrollable = isScrollable($target) || isScrollable($target.parent()); if (!($.fancybox.isMobile && self.isScrollable)) { e.preventDefault(); }
            if (self.startPoints.length === 1 || current.hasError) {
                if (self.canPan) { $.fancybox.stop(self.$content); self.isPanning = true; } else { self.isSwiping = true; }
                self.$container.addClass("fancybox-is-grabbing");
            }
            if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) { self.canTap = false; self.isSwiping = false; self.isPanning = false; self.isZooming = true; $.fancybox.stop(self.$content); self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft(); self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop(); self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width; self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height; self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]); }
        }; Guestures.prototype.onscroll = function (e) { var self = this; self.isScrolling = true; document.removeEventListener("scroll", self.onscroll, true); }; Guestures.prototype.ontouchmove = function (e) {
            var self = this; if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) { self.ontouchend(e); return; }
            if (self.isScrolling) { self.canTap = false; return; }
            self.newPoints = getPointerXY(e); if (!(self.opts || self.canPan) || !self.newPoints.length || !self.newPoints.length) { return; }
            if (!(self.isSwiping && self.isSwiping === true)) { e.preventDefault(); }
            self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x"); self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y"); self.distance = distance(self.newPoints[0], self.startPoints[0]); if (self.distance > 0) { if (self.isSwiping) { self.onSwipe(e); } else if (self.isPanning) { self.onPan(); } else if (self.isZooming) { self.onZoom(); } }
        }; Guestures.prototype.onSwipe = function (e) {
            var self = this, instance = self.instance, swiping = self.isSwiping, left = self.sliderStartPos.left || 0, angle; if (swiping === true) {
                if (Math.abs(self.distance) > 10) {
                    self.canTap = false; if (instance.group.length < 2 && self.opts.vertical) { self.isSwiping = "y"; } else if (instance.isDragging || self.opts.vertical === false || (self.opts.vertical === "auto" && $(window).width() > 800)) { self.isSwiping = "x"; } else { angle = Math.abs((Math.atan2(self.distanceY, self.distanceX) * 180) / Math.PI); self.isSwiping = angle > 45 && angle < 135 ? "y" : "x"; }
                    if (self.isSwiping === "y" && $.fancybox.isMobile && self.isScrollable) { self.isScrolling = true; return; }
                    instance.isDragging = self.isSwiping; self.startPoints = self.newPoints; $.each(instance.slides, function (index, slide) {
                        var slidePos, stagePos; $.fancybox.stop(slide.$slide); slidePos = $.fancybox.getTranslate(slide.$slide); stagePos = $.fancybox.getTranslate(instance.$refs.stage); slide.$slide.css({ transform: "", opacity: "", "transition-duration": "" }).removeClass("fancybox-animated").removeClass(function (index, className) { return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" "); }); if (slide.pos === instance.current.pos) { self.sliderStartPos.top = slidePos.top - stagePos.top; self.sliderStartPos.left = slidePos.left - stagePos.left; }
                        $.fancybox.setTranslate(slide.$slide, { top: slidePos.top - stagePos.top, left: slidePos.left - stagePos.left });
                    }); if (instance.SlideShow && instance.SlideShow.isActive) { instance.SlideShow.stop(); }
                }
                return;
            }
            if (swiping == "x") { if (self.distanceX > 0 && (self.instance.group.length < 2 || (self.instance.current.index === 0 && !self.instance.current.opts.loop))) { left = left + Math.pow(self.distanceX, 0.8); } else if (self.distanceX < 0 && (self.instance.group.length < 2 || (self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop))) { left = left - Math.pow(-self.distanceX, 0.8); } else { left = left + self.distanceX; } }
            self.sliderLastPos = { top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY, left: left }; if (self.requestId) { cancelAFrame(self.requestId); self.requestId = null; }
            self.requestId = requestAFrame(function () { if (self.sliderLastPos) { $.each(self.instance.slides, function (index, slide) { var pos = slide.pos - self.instance.currPos; $.fancybox.setTranslate(slide.$slide, { top: self.sliderLastPos.top, left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter }); }); self.$container.addClass("fancybox-is-sliding"); } });
        }; Guestures.prototype.onPan = function () {
            var self = this; if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) { self.startPoints = self.newPoints; return; }
            self.canTap = false; self.contentLastPos = self.limitMovement(); if (self.requestId) { cancelAFrame(self.requestId); }
            self.requestId = requestAFrame(function () { $.fancybox.setTranslate(self.$content, self.contentLastPos); });
        }; Guestures.prototype.limitMovement = function () {
            var self = this; var canvasWidth = self.canvasWidth; var canvasHeight = self.canvasHeight; var distanceX = self.distanceX; var distanceY = self.distanceY; var contentStartPos = self.contentStartPos; var currentOffsetX = contentStartPos.left; var currentOffsetY = contentStartPos.top; var currentWidth = contentStartPos.width; var currentHeight = contentStartPos.height; var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY; if (currentWidth > canvasWidth) { newOffsetX = currentOffsetX + distanceX; } else { newOffsetX = currentOffsetX; }
            newOffsetY = currentOffsetY + distanceY; minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5); minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5); maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5); maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5); if (distanceX > 0 && newOffsetX > minTranslateX) { newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0; }
            if (distanceX < 0 && newOffsetX < maxTranslateX) { newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0; }
            if (distanceY > 0 && newOffsetY > minTranslateY) { newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0; }
            if (distanceY < 0 && newOffsetY < maxTranslateY) { newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0; }
            return { top: newOffsetY, left: newOffsetX };
        }; Guestures.prototype.limitPosition = function (newOffsetX, newOffsetY, newWidth, newHeight) {
            var self = this; var canvasWidth = self.canvasWidth; var canvasHeight = self.canvasHeight; if (newWidth > canvasWidth) { newOffsetX = newOffsetX > 0 ? 0 : newOffsetX; newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX; } else { newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2); }
            if (newHeight > canvasHeight) { newOffsetY = newOffsetY > 0 ? 0 : newOffsetY; newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY; } else { newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2); }
            return { top: newOffsetY, left: newOffsetX };
        }; Guestures.prototype.onZoom = function () {
            var self = this; var contentStartPos = self.contentStartPos; var currentWidth = contentStartPos.width; var currentHeight = contentStartPos.height; var currentOffsetX = contentStartPos.left; var currentOffsetY = contentStartPos.top; var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]); var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers; var newWidth = Math.floor(currentWidth * pinchRatio); var newHeight = Math.floor(currentHeight * pinchRatio); var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX; var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY; var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft(); var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop(); var translateFromTranslatingX = centerPointEndX - self.centerPointStartX; var translateFromTranslatingY = centerPointEndY - self.centerPointStartY; var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX); var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY); var newPos = { top: newOffsetY, left: newOffsetX, scaleX: pinchRatio, scaleY: pinchRatio }; self.canTap = false; self.newWidth = newWidth; self.newHeight = newHeight; self.contentLastPos = newPos; if (self.requestId) { cancelAFrame(self.requestId); }
            self.requestId = requestAFrame(function () { $.fancybox.setTranslate(self.$content, self.contentLastPos); });
        }; Guestures.prototype.ontouchend = function (e) {
            var self = this; var swiping = self.isSwiping; var panning = self.isPanning; var zooming = self.isZooming; var scrolling = self.isScrolling; self.endPoints = getPointerXY(e); self.dMs = Math.max(new Date().getTime() - self.startTime, 1); self.$container.removeClass("fancybox-is-grabbing"); $(document).off(".fb.touch"); document.removeEventListener("scroll", self.onscroll, true); if (self.requestId) { cancelAFrame(self.requestId); self.requestId = null; }
            self.isSwiping = false; self.isPanning = false; self.isZooming = false; self.isScrolling = false; self.instance.isDragging = false; if (self.canTap) { return self.onTap(e); }
            self.speed = 100; self.velocityX = (self.distanceX / self.dMs) * 0.5; self.velocityY = (self.distanceY / self.dMs) * 0.5; if (panning) { self.endPanning(); } else if (zooming) { self.endZooming(); } else { self.endSwiping(swiping, scrolling); }
            return;
        }; Guestures.prototype.endSwiping = function (swiping, scrolling) {
            var self = this, ret = false, len = self.instance.group.length, distanceX = Math.abs(self.distanceX), canAdvance = swiping == "x" && len > 1 && ((self.dMs > 130 && distanceX > 10) || distanceX > 50), speedX = 300; self.sliderLastPos = null; if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) { $.fancybox.animate(self.instance.current.$slide, { top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150, opacity: 0 }, 200); ret = self.instance.close(true, 250); } else if (canAdvance && self.distanceX > 0) { ret = self.instance.previous(speedX); } else if (canAdvance && self.distanceX < 0) { ret = self.instance.next(speedX); }
            if (ret === false && (swiping == "x" || swiping == "y")) { self.instance.centerSlide(200); }
            self.$container.removeClass("fancybox-is-sliding");
        }; Guestures.prototype.endPanning = function () {
            var self = this, newOffsetX, newOffsetY, newPos; if (!self.contentLastPos) { return; }
            if (self.opts.momentum === false || self.dMs > 350) { newOffsetX = self.contentLastPos.left; newOffsetY = self.contentLastPos.top; } else { newOffsetX = self.contentLastPos.left + self.velocityX * 500; newOffsetY = self.contentLastPos.top + self.velocityY * 500; }
            newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height); newPos.width = self.contentStartPos.width; newPos.height = self.contentStartPos.height; $.fancybox.animate(self.$content, newPos, 366);
        }; Guestures.prototype.endZooming = function () {
            var self = this; var current = self.instance.current; var newOffsetX, newOffsetY, newPos, reset; var newWidth = self.newWidth; var newHeight = self.newHeight; if (!self.contentLastPos) { return; }
            newOffsetX = self.contentLastPos.left; newOffsetY = self.contentLastPos.top; reset = { top: newOffsetY, left: newOffsetX, width: newWidth, height: newHeight, scaleX: 1, scaleY: 1 }; $.fancybox.setTranslate(self.$content, reset); if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) { self.instance.scaleToFit(150); } else if (newWidth > current.width || newHeight > current.height) { self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150); } else { newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight); $.fancybox.animate(self.$content, newPos, 150); }
        }; Guestures.prototype.onTap = function (e) {
            var self = this; var $target = $(e.target); var instance = self.instance; var current = instance.current; var endPoints = (e && getPointerXY(e)) || self.startPoints; var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0; var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0; var where; var process = function (prefix) {
                var action = current.opts[prefix]; if ($.isFunction(action)) { action = action.apply(instance, [current, e]); }
                if (!action) { return; }
                switch (action) {
                    case "close": instance.close(self.startEvent); break; case "toggleControls": instance.toggleControls(); break; case "next": instance.next(); break; case "nextOrClose": if (instance.group.length > 1) { instance.next(); } else { instance.close(self.startEvent); }
                        break; case "zoom": if (current.type == "image" && (current.isLoaded || current.$ghost)) { if (instance.canPan()) { instance.scaleToFit(); } else if (instance.isScaledDown()) { instance.scaleToActual(tapX, tapY); } else if (instance.group.length < 2) { instance.close(self.startEvent); } }
                        break;
                }
            }; if (e.originalEvent && e.originalEvent.button == 2) { return; }
            if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) { return; }
            if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) { where = "Outside"; } else if ($target.is(".fancybox-slide")) { where = "Slide"; } else if (instance.current.$content && instance.current.$content.find($target).addBack().filter($target).length) { where = "Content"; } else { return; }
            if (self.tapped) {
                clearTimeout(self.tapped); self.tapped = null; if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) { return this; }
                process("dblclick" + where);
            } else { self.tapX = tapX; self.tapY = tapY; if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) { self.tapped = setTimeout(function () { self.tapped = null; if (!instance.isAnimating) { process("click" + where); } }, 500); } else { process("click" + where); } }
            return this;
        }; $(document).on("onActivate.fb", function (e, instance) { if (instance && !instance.Guestures) { instance.Guestures = new Guestures(instance); } }).on("beforeClose.fb", function (e, instance) { if (instance && instance.Guestures) { instance.Guestures.destroy(); } });
    })(window, document, jQuery); (function (document, $) {
        "use strict"; $.extend(true, $.fancybox.defaults, {
            btnTpl: {
                slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>' +
                    "</button>"
            }, slideShow: { autoStart: false, speed: 3000, progress: true }
        }); var SlideShow = function (instance) { this.instance = instance; this.init(); }; $.extend(SlideShow.prototype, {
            timer: null, isActive: false, $button: null, init: function () { var self = this, instance = self.instance, opts = instance.group[instance.currIndex].opts.slideShow; self.$button = instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () { self.toggle(); }); if (instance.group.length < 2 || !opts) { self.$button.hide(); } else if (opts.progress) { self.$progress = $('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner); } }, set: function (force) {
                var self = this, instance = self.instance, current = instance.current; if (current && (force === true || current.opts.loop || instance.currIndex < instance.group.length - 1)) {
                    if (self.isActive && current.contentType !== "video") {
                        if (self.$progress) { $.fancybox.animate(self.$progress.show(), { scaleX: 1 }, current.opts.slideShow.speed); }
                        self.timer = setTimeout(function () { if (!instance.current.opts.loop && instance.current.index == instance.group.length - 1) { instance.jumpTo(0); } else { instance.next(); } }, current.opts.slideShow.speed);
                    }
                } else { self.stop(); instance.idleSecondsCounter = 0; instance.showControls(); }
            }, clear: function () { var self = this; clearTimeout(self.timer); self.timer = null; if (self.$progress) { self.$progress.removeAttr("style").hide(); } }, start: function () {
                var self = this, current = self.instance.current; if (current) {
                    self.$button.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"); self.isActive = true; if (current.isComplete) { self.set(true); }
                    self.instance.trigger("onSlideShowChange", true);
                }
            }, stop: function () { var self = this, current = self.instance.current; self.clear(); self.$button.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"); self.isActive = false; self.instance.trigger("onSlideShowChange", false); if (self.$progress) { self.$progress.removeAttr("style").hide(); } }, toggle: function () { var self = this; if (self.isActive) { self.stop(); } else { self.start(); } }
        }); $(document).on({ "onInit.fb": function (e, instance) { if (instance && !instance.SlideShow) { instance.SlideShow = new SlideShow(instance); } }, "beforeShow.fb": function (e, instance, current, firstRun) { var SlideShow = instance && instance.SlideShow; if (firstRun) { if (SlideShow && current.opts.slideShow.autoStart) { SlideShow.start(); } } else if (SlideShow && SlideShow.isActive) { SlideShow.clear(); } }, "afterShow.fb": function (e, instance, current) { var SlideShow = instance && instance.SlideShow; if (SlideShow && SlideShow.isActive) { SlideShow.set(); } }, "afterKeydown.fb": function (e, instance, current, keypress, keycode) { var SlideShow = instance && instance.SlideShow; if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) { keypress.preventDefault(); SlideShow.toggle(); } }, "beforeClose.fb onDeactivate.fb": function (e, instance) { var SlideShow = instance && instance.SlideShow; if (SlideShow) { SlideShow.stop(); } } }); $(document).on("visibilitychange", function () { var instance = $.fancybox.getInstance(), SlideShow = instance && instance.SlideShow; if (SlideShow && SlideShow.isActive) { if (document.hidden) { SlideShow.clear(); } else { SlideShow.set(); } } });
    })(document, jQuery); (function (document, $) {
        "use strict"; var fn = (function () {
            var fnMap = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]]; var ret = {}; for (var i = 0; i < fnMap.length; i++) {
                var val = fnMap[i]; if (val && val[1] in document) {
                    for (var j = 0; j < val.length; j++) { ret[fnMap[0][j]] = val[j]; }
                    return ret;
                }
            }
            return false;
        })(); if (fn) {
            var FullScreen = { request: function (elem) { elem = elem || document.documentElement; elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT); }, exit: function () { document[fn.exitFullscreen](); }, toggle: function (elem) { elem = elem || document.documentElement; if (this.isFullscreen()) { this.exit(); } else { this.request(elem); } }, isFullscreen: function () { return Boolean(document[fn.fullscreenElement]); }, enabled: function () { return Boolean(document[fn.fullscreenEnabled]); } }; $.extend(true, $.fancybox.defaults, {
                btnTpl: {
                    fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>' +
                        "</button>"
                }, fullScreen: { autoStart: false }
            }); $(document).on(fn.fullscreenchange, function () {
                var isFullscreen = FullScreen.isFullscreen(), instance = $.fancybox.getInstance(); if (instance) {
                    if (instance.current && instance.current.type === "image" && instance.isAnimating) { instance.isAnimating = false; instance.update(true, true, 0); if (!instance.isComplete) { instance.complete(); } }
                    instance.trigger("onFullscreenChange", isFullscreen); instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen); instance.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !isFullscreen).toggleClass("fancybox-button--fsexit", isFullscreen);
                }
            });
        }
        $(document).on({
            "onInit.fb": function (e, instance) {
                var $container; if (!fn) { instance.$refs.toolbar.find("[data-fancybox-fullscreen]").remove(); return; }
                if (instance && instance.group[instance.currIndex].opts.fullScreen) {
                    $container = instance.$refs.container; $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) { e.stopPropagation(); e.preventDefault(); FullScreen.toggle(); }); if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) { FullScreen.request(); }
                    instance.FullScreen = FullScreen;
                } else if (instance) { instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide(); }
            }, "afterKeydown.fb": function (e, instance, current, keypress, keycode) { if (instance && instance.FullScreen && keycode === 70) { keypress.preventDefault(); instance.FullScreen.toggle(); } }, "beforeClose.fb": function (e, instance) { if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) { FullScreen.exit(); } }
        });
    })(document, jQuery); (function (document, $) {
        "use strict"; var CLASS = "fancybox-thumbs", CLASS_ACTIVE = CLASS + "-active"; $.fancybox.defaults = $.extend(true, {
            btnTpl: {
                thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>' +
                    "</button>"
            }, thumbs: { autoStart: false, hideOnClose: true, parentEl: ".fancybox-container", axis: "y" }
        }, $.fancybox.defaults); var FancyThumbs = function (instance) { this.init(instance); }; $.extend(FancyThumbs.prototype, {
            $button: null, $grid: null, $list: null, isVisible: false, isActive: false, init: function (instance) {
                var self = this, group = instance.group, enabled = 0; self.instance = instance; self.opts = group[instance.currIndex].opts.thumbs; instance.Thumbs = self; self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]"); for (var i = 0, len = group.length; i < len; i++) {
                    if (group[i].thumb) { enabled++; }
                    if (enabled > 1) { break; }
                }
                if (enabled > 1 && !!self.opts) { self.$button.removeAttr("style").on("click", function () { self.toggle(); }); self.isActive = true; } else { self.$button.hide(); }
            }, create: function () {
                var self = this, instance = self.instance, parentEl = self.opts.parentEl, list = [], src; if (!self.$grid) { self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(instance.$refs.container.find(parentEl).addBack().filter(parentEl)); self.$grid.on("click", "a", function () { instance.jumpTo($(this).attr("data-index")); }); }
                if (!self.$list) { self.$list = $('<div class="' + CLASS + '__list">').appendTo(self.$grid); }
                $.each(instance.group, function (i, item) {
                    src = item.thumb; if (!src && item.type === "image") { src = item.src; }
                    list.push('<a href="javascript:;" tabindex="0" data-index="' +
                        i +
                        '"' +
                        (src && src.length ? ' style="background-image:url(' + src + ')"' : 'class="fancybox-thumbs-missing"') +
                        "></a>");
                }); self.$list[0].innerHTML = list.join(""); if (self.opts.axis === "x") {
                    self.$list.width(parseInt(self.$grid.css("padding-right"), 10) +
                        instance.group.length * self.$list.children().eq(0).outerWidth(true));
                }
            }, focus: function (duration) {
                var self = this, $list = self.$list, $grid = self.$grid, thumb, thumbPos; if (!self.instance.current) { return; }
                thumb = $list.children().removeClass(CLASS_ACTIVE).filter('[data-index="' + self.instance.current.index + '"]').addClass(CLASS_ACTIVE); thumbPos = thumb.position(); if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) { $list.stop().animate({ scrollTop: $list.scrollTop() + thumbPos.top }, duration); } else if (self.opts.axis === "x" && (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))) { $list.parent().stop().animate({ scrollLeft: thumbPos.left }, duration); }
            }, update: function () {
                var that = this; that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible); if (that.isVisible) {
                    if (!that.$grid) { that.create(); }
                    that.instance.trigger("onThumbsShow"); that.focus(0);
                } else if (that.$grid) { that.instance.trigger("onThumbsHide"); }
                that.instance.update();
            }, hide: function () { this.isVisible = false; this.update(); }, show: function () { this.isVisible = true; this.update(); }, toggle: function () { this.isVisible = !this.isVisible; this.update(); }
        }); $(document).on({ "onInit.fb": function (e, instance) { var Thumbs; if (instance && !instance.Thumbs) { Thumbs = new FancyThumbs(instance); if (Thumbs.isActive && Thumbs.opts.autoStart === true) { Thumbs.show(); } } }, "beforeShow.fb": function (e, instance, item, firstRun) { var Thumbs = instance && instance.Thumbs; if (Thumbs && Thumbs.isVisible) { Thumbs.focus(firstRun ? 0 : 250); } }, "afterKeydown.fb": function (e, instance, current, keypress, keycode) { var Thumbs = instance && instance.Thumbs; if (Thumbs && Thumbs.isActive && keycode === 71) { keypress.preventDefault(); Thumbs.toggle(); } }, "beforeClose.fb": function (e, instance) { var Thumbs = instance && instance.Thumbs; if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) { Thumbs.$grid.hide(); } } });
    })(document, jQuery); (function (document, $) {
        "use strict"; $.extend(true, $.fancybox.defaults, {
            btnTpl: {
                share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>' +
                    "</button>"
            }, share: {
                url: function (instance, item) { return ((!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location); }, tpl: '<div class="fancybox-share">' +
                    "<h1>{{SHARE}}</h1>" +
                    "<p>" +
                    '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' +
                    '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' +
                    "<span>Facebook</span>" +
                    "</a>" +
                    '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' +
                    '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' +
                    "<span>Twitter</span>" +
                    "</a>" +
                    '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' +
                    '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' +
                    "<span>Pinterest</span>" +
                    "</a>" +
                    "</p>" +
                    '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p>' +
                    "</div>"
            }
        }); function escapeHtml(string) { var entityMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" }; return String(string).replace(/[&<>"'`=\/]/g, function (s) { return entityMap[s]; }); }
        $(document).on("click", "[data-fancybox-share]", function () {
            var instance = $.fancybox.getInstance(), current = instance.current || null, url, tpl; if (!current) { return; }
            if ($.type(current.opts.share.url) === "function") { url = current.opts.share.url.apply(current, [instance, current]); }
            tpl = current.opts.share.tpl.replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(url)).replace(/\{\{url_raw\}\}/g, escapeHtml(url)).replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : ""); $.fancybox.open({ src: instance.translate(instance, tpl), type: "html", opts: { touch: false, animationEffect: false, afterLoad: function (shareInstance, shareCurrent) { instance.$refs.container.one("beforeClose.fb", function () { shareInstance.close(null, 0); }); shareCurrent.$content.find(".fancybox-share__button").click(function () { window.open(this.href, "Share", "width=550, height=450"); return false; }); }, mobile: { autoFocus: false } } });
        });
    })(document, jQuery); (function (window, document, $) {
        "use strict"; if (!$.escapeSelector) {
            $.escapeSelector = function (sel) {
                var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g; var fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {
                        if (ch === "\0") { return "\uFFFD"; }
                        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                    }
                    return "\\" + ch;
                }; return (sel + "").replace(rcssescape, fcssescape);
            };
        }
        function parseUrl() { var hash = window.location.hash.substr(1), rez = hash.split("-"), index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1, gallery = rez.join("-"); return { hash: hash, index: index < 1 ? 1 : index, gallery: gallery }; }
        function triggerFromUrl(url) { if (url.gallery !== "") { $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']").eq(url.index - 1).focus().trigger("click.fb-start"); } }
        function getGalleryID(instance) {
            var opts, ret; if (!instance) { return false; }
            opts = instance.current ? instance.current.opts : instance.opts; ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") || opts.$orig.data("fancybox-trigger") : ""); return ret === "" ? false : ret;
        }
        $(function () {
            if ($.fancybox.defaults.hash === false) { return; }
            $(document).on({
                "onInit.fb": function (e, instance) {
                    var url, gallery; if (instance.group[instance.currIndex].opts.hash === false) { return; }
                    url = parseUrl(); gallery = getGalleryID(instance); if (gallery && url.gallery && gallery == url.gallery) { instance.currIndex = url.index - 1; }
                }, "beforeShow.fb": function (e, instance, current, firstRun) {
                    var gallery; if (!current || current.opts.hash === false) { return; }
                    gallery = getGalleryID(instance); if (!gallery) { return; }
                    instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : ""); if (window.location.hash === "#" + instance.currentHash) { return; }
                    if (firstRun && !instance.origHash) { instance.origHash = window.location.hash; }
                    if (instance.hashTimer) { clearTimeout(instance.hashTimer); }
                    instance.hashTimer = setTimeout(function () {
                        if ("replaceState" in window.history) { window.history[firstRun ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + instance.currentHash); if (firstRun) { instance.hasCreatedHistory = true; } } else { window.location.hash = instance.currentHash; }
                        instance.hashTimer = null;
                    }, 300);
                }, "beforeClose.fb": function (e, instance, current) {
                    if (!current || current.opts.hash === false) { return; }
                    clearTimeout(instance.hashTimer); if (instance.currentHash && instance.hasCreatedHistory) { window.history.back(); } else if (instance.currentHash) { if ("replaceState" in window.history) { window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || "")); } else { window.location.hash = instance.origHash; } }
                    instance.currentHash = null;
                }
            }); $(window).on("hashchange.fb", function () { var url = parseUrl(), fb = null; $.each($(".fancybox-container").get().reverse(), function (index, value) { var tmp = $(value).data("FancyBox"); if (tmp && tmp.currentHash) { fb = tmp; return false; } }); if (fb) { if (fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) { fb.currentHash = null; fb.close(); } } else if (url.gallery !== "") { triggerFromUrl(url); } }); setTimeout(function () { if (!$.fancybox.getInstance()) { triggerFromUrl(parseUrl()); } }, 50);
        });
    })(window, document, jQuery); (function (document, $) {
        "use strict"; var prevTime = new Date().getTime(); $(document).on({
            "onInit.fb": function (e, instance, current) {
                instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (e) {
                    var current = instance.current, currTime = new Date().getTime(); if (instance.group.length < 2 || current.opts.wheel === false || (current.opts.wheel === "auto" && current.type !== "image")) { return; }
                    e.preventDefault(); e.stopPropagation(); if (current.$slide.hasClass("fancybox-animated")) { return; }
                    e = e.originalEvent || e; if (currTime - prevTime < 250) { return; }
                    prevTime = currTime; instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
                });
            }
        });
    })(document, jQuery);; close_fancybox = function () { jQuery.fancybox.close(); window.location.reload(); }
    close_fancybox_noreload = function (message, tag) { jQuery.fancybox.close(); showFeedbackMessage(message, tag); }
    replaceAddAnotherLinks = function () { let links = jQuery('body:not(.popup_) .popup'); for (let i = 0; i < links.length; i++) { let link = links[i]; link.onclick = function (e) { e.preventDefault(); openLinkInPopup(link); }; } }
    openLinkInPopup = function (link) {
        if (link.host !== window.location.host) { window.location = link.href; return; }
        let first_char = '?'; if (link.href.indexOf('?') > 0) { first_char = '&'; }
        let url = link.href + first_char + '_popup=1'; fancybox_events = {}; var reloadOnClose = $(link).data('reload-on-close'); if (reloadOnClose == "true" || reloadOnClose == true) { fancybox_events.beforeClose = function () { document.location.reload(); return false; } } else if (reloadOnClose == "false" || reloadOnClose == false) { url += '&_popup_close_noreload=1' }
        var callBackAfterClose = $(link).data('callback-after-close'); if (callBackAfterClose !== undefined) { fancybox_events.afterClose = function () { try { document[callBackAfterClose](); } catch (e) { try { window[callBackAfterClose](); } catch (e) { } } } }
        $.fancybox.open({
            src: url, type: 'iframe', beforeClose: fancybox_events.beforeClose, afterClose: fancybox_events.afterClose, afterShow: function (instance, current) {
                let links = jQuery('a', jQuery(current.$iframe).contents()); links.each(function (e) {
                    let href = $(this).attr('href'); if (typeof href === 'string' || href instanceof String) {
                        if (href.indexOf('?') === -1) { href = href + '?_popup=1'; } else { href = href + '&_popup=1' }
                        $(this).attr('href', href);
                    }
                });
            },
        });
    }
    showFeedbackMessage = function (message, tag) {
        clearFeedbackMessage(); if (message !== undefined && (message + "").trim().length > 0)
            $("body").prepend('<p class="msg ' + tag + '" id="feedback_message">' + message + '</p>');
    }
    clearFeedbackMessage = function () { $("#feedback_message").remove(); }
    jQuery(document).ready(function () { replaceAddAnotherLinks(); });
}).call(this);