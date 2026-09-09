// from 03-cherry-plugin.js

jQuery(document).ready(function(){
	// OWL Carousel init.
	cherryPluginCarouselInit();

	// Full-width block with left-right paddings.
	jQuery('.content_box.full-width').wrapInner('<div class="full-block-wrap"></div>');
	jQuery(window).resize( function(){
		contenBoxResizeFunction();
	});

	contenBoxResizeFunction();
	function contenBoxResizeFunction(){
		var width_of_viewport = jQuery(window).width(),
			half_width_of_viewport = width_of_viewport / 2,
			width_of_container = jQuery('.content-holder > .container').width();

		jQuery('.content_box.full-width').width(width_of_container);
		jQuery('.content_box.full-width').css({'padding-left': half_width_of_viewport+'px', 'padding-right': half_width_of_viewport+'px', 'margin-left': '-'+half_width_of_viewport+'px'});
		jQuery('.full-block-wrap').width(width_of_container);
	}
});

function cherryPluginCarouselInit() {
	jQuery('div[id^="owl-carousel-"]').each(function(){
		var carousel = jQuery(this),
			auto_play = parseInt(carousel.attr('data-auto-play'))<1 ? false : parseInt(carousel.attr('data-auto-play')),
			items_count = parseInt(carousel.attr('data-items')),
			display_navs = carousel.attr('data-nav')=='true' ? true : false,
			display_pagination = carousel.attr('data-pagination')=='true' ? true : false,
			auto_height = items_count<=1 ? true : false,
			keys = Object.keys(items_custom),
			last_key = keys[keys.length-1];

		items_custom[last_key] = [items_custom[last_key][0], items_count];

		jQuery(carousel).owlCarousel({
			autoPlay: auto_play,
			navigation: display_navs,
			pagination: display_pagination,
			navigationText: false,
			autoHeight: auto_height,
			itemsCustom: items_custom
		});
	})
	jQuery('.owl-prev').addClass('fa-solid fa-chevron-left');
jQuery('.owl-next').addClass('fa-solid fa-chevron-right');
}

// from 05-device.min.js

/*! device.js 0.1.58 */
;(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")},device.fxos=function(){return(d("(mobile;")||d("(tablet;"))&&d("; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.meego=function(){return d("meego")},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()||device.meego()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.portrait=function(){return 90!==Math.abs(window.orientation)},device.landscape=function(){return 90===Math.abs(window.orientation)},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):device.android()?device.androidTablet()?b("android tablet"):b("android mobile"):device.blackberry()?device.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):device.windows()?device.windowsTablet()?b("windows tablet"):device.windowsPhone()?b("windows mobile"):b("desktop"):device.fxos()?device.fxosTablet()?b("fxos tablet"):b("fxos mobile"):device.meego()?b("meego mobile"):b("desktop"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);

// from 06-media-parallax.js

;(function($){
    var methods = {
        init : function( options ) {

            var settings = {
                bufferRatio: 1.5
            ,   invert: true
            }

            return this.each(function(){
                if ( options ){
                    $.extend(settings, options);
                } 
                
                var 
                    $this = $(this)
                ,   windowSelector = $(window)
                ,   documentSelector = $(document)
                ,   thisHeight = 0
                ,   innerHolderObj
                ,   mediaHolderObj
                ,   infoObj
                ,   imageObj
                ,   innerHolderHeight
                ,   thisOffsetTop
                ,   heightBuffer = 0
                ,   check_mp4
                ,   check_webm
                ,   check_ogv
                ,   check_poster
                ,   check_none_format
                ,   check_all_format
                ,   statusDevice = "desktop"
                ,   typeMedia = "video"
                ,   msie8 = Boolean(navigator.userAgent.match(/MSIE ([8]+)\./))
                ,   checkBrowser
                ,   bufferRatio = parseFloat(settings.bufferRatio)
                ;
                
                _constructor();
                function _constructor(){
                    
                    innerHolderObj = $('.parallax_inner', $this);
                    mediaHolderObj = $('.parallax_media', $this);

                    typeMedia = $this.data("type-media");

                    checkBrowser = checkBrowser();
                    
                    check_mp4 = $this.data("mp4");
                    check_webm = $this.data("webm");
                    check_ogv = $this.data("ogv");
                    check_poster = $this.data("poster");

                    (!check_mp4 && !check_webm && !check_ogv)? check_none_format = false : check_none_format = true;
                    (check_mp4 && check_webm && check_ogv)? check_all_format = true : check_all_format = false;

                    if (device.mobile() || device.tablet() || msie8 || checkBrowser == 'Safari') {
                        statusDevice = "mobile";
                        posterUrl = mediaHolderObj.attr('poster');
                        innerHolderObj.css({"background-image": "url("+posterUrl+")" });   
                        $this.addClass('mobileState');  
                        mediaHolderObj.remove();
                    }

                    if (typeMedia == "video"){
                        sourcesCheckInfo();
                    }

                    addEventsFunction();                    
                }
                
                function addEventsFunction(){
                    //------------------ window scroll event -------------//
                    windowSelector.on('scroll',
                        function(){
                            if(statusDevice=="desktop"){
                                mainScrollFunction();
                            }
                        }
                    ).trigger('scroll');
                    //------------------ window resize event -------------//
                    windowSelector.on("resize",
                        function(){
                            $this.width(windowSelector.width());
                            $this.css({'width' : windowSelector.width(), 'margin-left' : Math.floor(windowSelector.width()*-0.5), 'left' : '50%'});

                            if(statusDevice=="desktop"){
                                mainResizeFunction();
                            }
                        }
                    ).trigger('resize');
                }
                //------------------ window scroll function -------------//
                function mainScrollFunction(){
                    parallaxEffect();
                }
                //------------------ window resize function -------------//
                function mainResizeFunction(){                    
                    parallaxEffect();
                    if (typeMedia == "image"){
                        objectResize(mediaHolderObj, innerHolderObj, "fill");
                    }else{
                        videoResize(mediaHolderObj, innerHolderObj);
                    }
                }
                
                function parallaxEffect(){
                    var 
                        documentScrollTop
                    ,   startScrollTop
                    ,   endScrollTop
                    ,   visibleScrollValue
                    ;

                    thisHeight = $this.outerHeight();

                    windowHeight = windowSelector.height();
                    thisOffsetTop = $this.offset().top;
                    documentScrollTop = documentSelector.scrollTop();
                    innerHolderHeight = thisHeight*bufferRatio;
                    heightBuffer = innerHolderHeight-thisHeight;
                    startScrollTop = documentScrollTop + windowHeight;
                    endScrollTop = documentScrollTop - thisHeight;
                    visibleScrollValue = startScrollTop - endScrollTop;

                    _height = thisHeight*bufferRatio;
                    innerHolderObj.css({"height": _height});

                    if( ( startScrollTop > thisOffsetTop ) && ( endScrollTop < thisOffsetTop ) ){
                        pixelScrolled = documentScrollTop - (thisOffsetTop - windowHeight);
                        percentScrolled = pixelScrolled / visibleScrollValue;
                        thisHidenScrollVal = thisOffsetTop - documentScrollTop;
                        deltaTopScrollVal = heightBuffer * percentScrolled;

                        if(settings.invert){
                            _x = - heightBuffer + (deltaTopScrollVal);
                            innerHolderObj.css({"top": _x});
                        }else{
                            _x = - deltaTopScrollVal;
                            innerHolderObj.css({"top": _x});
                        }
                    }
                }
                //-------------------------------- objectResize --------------------------------------//
                //objectResize($('> img', primaryImageHolder), mainImageHolder, "fill");
                function objectResize(obj, container, type){
                    var 
                        prevImgWidth = 0
                    ,   prevImgHeight = 0
                    ,   imageRatio
                    ,   newImgWidth
                    ,   newImgHeight
                    ,   newImgTop
                    ,   newImgLeft
                    ,   alignIMG = 'center'
                    ;
       
                    prevImgWidth = parseInt(obj.data('base-width'));
                    prevImgHeight = parseInt(obj.data('base-height'));

                    imageRatio = prevImgHeight/prevImgWidth;
                    containerRatio = container.height()/container.width();

                    switch(type){
                        case 'fill':
                            if(containerRatio > imageRatio){
                                newImgHeight = container.height();
                                newImgWidth = Math.round( (newImgHeight*prevImgWidth) / prevImgHeight );
                            }else{
                                newImgWidth = container.width();
                                newImgHeight = Math.round( (newImgWidth*prevImgHeight) / prevImgWidth );
                            }

                            obj.css({width: newImgWidth, height: newImgHeight});

                            screenWidth = container.width();
                            screenHeight = container.height();
                            imgWidth = obj.width();
                            imgHeight = obj.height();

                            switch(alignIMG){
                                case "top":
                                    newImgLeft=-(imgWidth-screenWidth)*.5;
                                    newImgTop=0;
                                break;
                                case "bottom":
                                    newImgLeft=-(imgWidth-screenWidth)*.5;
                                    newImgTop=-(imgHeight-screenHeight);
                                break;
                                case "right":
                                    newImgLeft=-(imgWidth-screenWidth);
                                    newImgTop=-(imgHeight-screenHeight)*.5;
                                break;
                                case "left":
                                    newImgLeft=0;
                                    newImgTop=-(imgHeight-screenHeight)*.5;
                                break;
                                case "top_left":
                                    newImgLeft=0;
                                    newImgTop=0;
                                break;
                                case "top_right":
                                    newImgLeft=-(imgWidth-screenWidth);
                                    newImgTop=0;
                                break;
                                case "bottom_right":
                                    newImgLeft=-(imgWidth-screenWidth);
                                    newImgTop=-(imgHeight-screenHeight);
                                break;
                                case "bottom_left":
                                    newImgLeft=0;
                                    newImgTop=-(imgHeight-screenHeight);
                                break;
                                default:
                                    newImgLeft=-(imgWidth-screenWidth)*.5;
                                    newImgTop= -(imgHeight-screenHeight)*.5;
                                }
                        break
                        case 'fit':
                            if(containerRatio > imageRatio){
                                newImgWidth = container.width();
                                newImgHeight = (prevImgHeight*container.width())/prevImgWidth;
                                newImgTop = container.height()/2 - newImgHeight/2;
                                newImgLeft = 0; 
                            }else{
                                newImgWidth = (prevImgWidth*container.height())/prevImgHeight;
                                newImgHeight = container.height();
                                newImgTop = 0;
                                newImgLeft = container.width()/2 - newImgWidth/2;  
                            }
                            obj.css({width: newImgWidth, height: newImgHeight});
                        break
                    }

                    obj.css({top: newImgTop, left: newImgLeft});
                }
                function videoResize(obj, container){
                    var 
                        prevImgWidth = 0
                    ,   prevImgHeight = 0
                    ,   imageRatio
                    ,   newImgWidth
                    ,   newImgHeight
                    ;
       
                    prevImgWidth = parseInt(obj.data('base-width'));
                    prevImgHeight = parseInt(obj.data('base-height'));

                    imageRatio = prevImgHeight/prevImgWidth;
                    containerRatio = container.height()/container.width();
                    

                    if(containerRatio > imageRatio){
                        newImgWidth = "auto";
                        newImgHeight = container.height();
                    }else{
                        newImgWidth = container.width();
                        newImgHeight = "auto";
                    }

                    
                    obj.css({width: newImgWidth, height: newImgHeight});

                }
                /*----------------------- sourcesCheckInfo --------------------------------------------------------*/
                function sourcesCheckInfo(){
                    var 
                        infostring = ""
                    ,   formatCounter = 0
                    ,   posterUrl
                    ;

                    $this.append("<div class='info_alert'><span></span></div>");
                    infoObj = $('.info_alert', $this);


                    if(!check_all_format){
                        infostring += "Not loaded the necessary content!<br>Please, make sure format(s) ";
                        if(!check_mp4){
                            infostring +="<b>MP4</b>, "
                            formatCounter++;
                        }
                        if(!check_webm){
                            infostring +="<b>WEBM</b>, "
                            formatCounter++;
                        }
                        if(!check_ogv){
                            infostring +="<b>OGV</b>"
                            formatCounter++;
                        }
                        if(formatCounter == 1){
                            infostring += " is loaded or name is specified correctly!<br>";
                        }else{
                            infostring += " are loaded or name is specified correctly!<br>";
                        }
                        
                    }
                    if(!check_poster){
                        infostring +="Please make sure <b>poster file</b> is loaded or name is specified correctly!"
                    }
                    if(infostring!=""){
                        $("span", infoObj).html(infostring);
                    }else{
                        infoObj.remove();
                    }
                }

                function checkBrowser(){
                    var ua = navigator.userAgent;
                    
                    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
                    if (ua.search(/Firefox/) > 0) return 'Firefox';
                    if (ua.search(/Opera/) > 0) return 'Opera';
                    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
                    if (ua.search(/Safari/) > 0) return 'Safari';
                    if (ua.search(/Konqueror/) > 0) return 'Konqueror';
                    if (ua.search(/Iceweasel/) > 0) return 'Debian Iceweasel';
                    if (ua.search(/SeaMonkey/) > 0) return 'SeaMonkey';
                    if (ua.search(/Gecko/) > 0) return 'Gecko';

                    return 'Search Bot';
                }
            });
        },
        destroy    : function( ) {
            return this.each(function(){
                $(window).off('.cherryVideoParallax');
            })
        },
        reposition : function( ) { },
        update     : function( content ) { }
    };

    $.fn.cherryMediaParallax = function( method ){ 
        
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method with name ' +  method + ' is not exist for jQuery.cherryMediaParallax' );
        }
         
        
    }//end plugin
})(jQuery)

// from 07-fixed-parallax.js

;(function($){
    var methods = {
        init : function( options ) {

            var settings = {
                bufferRatio: 1
            ,   offset: true
            ,   invert: false
            }

            return this.each(function(){
                if ( options ){
                    $.extend(settings, options);
                } 
                
                var 
                    $this = $(this)
                ,   windowSelector = $(window)
                ,   documentSelector = $(document)
                ,   thisHeight = 0
                ,   thisOffsetTop
                ,   image_url = ''
                ,   image_width = ''
                ,   image_height = ''
                ,   msie8 = Boolean(navigator.userAgent.match(/MSIE ([8]+)\./))
                ,   bufferRatio = parseFloat(settings.bufferRatio)
                ;
                
                _constructor();
                function _constructor(){
                    image_url = $this.data("source-url");
                    image_width = parseFloat($this.data("source-width"));
                    image_height = parseFloat($this.data("source-height"));

                    $this.css({'background-image': 'url('+image_url+')'});

                    addEventsFunction();                    
                }
                
                function addEventsFunction(){
                    //------------------ window scroll event -------------//
                    windowSelector.on('scroll',
                        function(){
                            if(settings.offset){
                                mainScrollFunction();
                            }
                        }
                    ).trigger('scroll');
                    //------------------ window resize event -------------//
                    windowSelector.on("resize",
                        function(){
                            $this.width(windowSelector.width());
                            $this.css({'width' : windowSelector.width(), 'margin-left' : Math.floor(windowSelector.width()*-0.5), 'left' : '50%'});

                            if(settings.offset){
                                mainResizeFunction();
                            }
                        }
                    ).trigger('resize');
                }
                //------------------ window scroll function -------------//
                function mainScrollFunction(){
                    parallaxEffect();
                }
                //------------------ window resize function -------------//
                function mainResizeFunction(){                    
                    parallaxEffect();
                }
                
                function parallaxEffect(){
                    var 
                        documentScrollTop
                    ,   startScrollTop
                    ,   endScrollTop
                    ,   visibleScrollValue
                    ;

                    thisHeight = $this.outerHeight();
                    windowHeight = windowSelector.height();
                    thisOffsetTop = $this.offset().top;
                    documentScrollTop = documentSelector.scrollTop();
                    startScrollTop = documentScrollTop + windowHeight;
                    endScrollTop = documentScrollTop - thisHeight;

                    if( ( startScrollTop > thisOffsetTop ) && ( endScrollTop < thisOffsetTop ) ){
                        visibleScrollValue = startScrollTop - endScrollTop;
                        pixelScrolled = documentScrollTop - (thisOffsetTop - windowHeight);
                        percentScrolled = pixelScrolled / visibleScrollValue;

                        if(settings.invert){
                            deltaTopScrollVal = percentScrolled * 100;
                            deltaTopScrollVal = deltaTopScrollVal * bufferRatio;
                            $this.css({'background-position': 'center '+deltaTopScrollVal+'%'});
                        }else{
                            deltaTopScrollVal = (1-percentScrolled) * 100;
                            deltaTopScrollVal = deltaTopScrollVal * bufferRatio;
                            $this.css({'background-position': 'center '+deltaTopScrollVal+'%'});
                        }
                    }
                }

            });
        },
        destroy    : function( ) { },
        reposition : function( ) { },
        update     : function( content ) { }
    };

    $.fn.cherryFixedParallax = function( method ){ 
        
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method with name ' +  method + ' is not exist for jQuery.cherryMediaParallax' );
        }
         
        
    }//end plugin
})(jQuery)

// from 08-parallax.js

function getWindowHeight() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }

    return myHeight
}

;(function($) {
    $(window).load(function() {
        if(!device.mobile() && !device.tablet() && !device.ipod()){
            $('section.parallax-box').each(function(){
                var $bgobj = $(this).find('.parallax-bg'),
                    window_height = parseInt(getWindowHeight()),
                    element_pos = $bgobj.offset(),
                    element_top = parseInt(element_pos.top),
                    //buffer = Math.floor(element_top / window_height);
                    buffer = Math.floor(element_top - window_height),
                    visible_scroll = parseInt($(window).scrollTop()) - buffer;
                if ( visible_scroll > 0 ) {
                    if ( window_height > element_top ) {
                        var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                    } else {
                        var yPos = -(visible_scroll / $bgobj.data('speed'));
                    }
                    //console.log(yPos);
                    var coords = 'center '+ yPos + 'px';
                    $bgobj.css({ backgroundPosition: coords });
                }
                //console.log(element_top);
                //console.log(window_height);
                $(window).scroll(function() {
                    var element_pos = $bgobj.offset(),
                        element_top = parseInt(element_pos.top),
                        //buffer = Math.floor(element_top / window_height);
                        buffer = Math.floor(element_top - window_height),
                        visible_scroll = parseInt($(window).scrollTop()) - buffer;
                   
                    //console.log($(window).scrollTop());
                    //console.log(element_top);
                    if ( visible_scroll > 0 ) {
                        if ( window_height > element_top ) {
                            var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                        } else {
                            var yPos = -(visible_scroll / $bgobj.data('speed'));
                        }
                        //console.log(yPos);
                        var coords = 'center '+ yPos + 'px';
                        $bgobj.css({ backgroundPosition: coords });
                    }
                });
            });
        }
    });
})(jQuery);

// from 09-superfish.js

;(function(a){a.fn.superfish=function(f){var d=a.fn.superfish,e=d.c,g=a('<span class="'+e.arrowClass+'"> &#187;</span>'),k=function(c){var b=a(this),d=j(b);("mouseenter"===c.type||"focusin"===c.type)&&b.children("a").data("follow",!0);clearTimeout(d.sfTimer);b.showSuperfishUl().siblings().hideSuperfishUl()},l=function(c){var b=a(this),f=j(b),e=d.op,g=function(){e.retainPath=-1<a.inArray(b[0],e.$path);b.hideSuperfishUl();e.$path.length&&1>b.parents("li."+e.hoverClass).length&&(e.onIdle.call(),a.proxy(k,
    e.$path,c)())};"mouseleave"!==c.type&&"focusout"!==c.type?g():(clearTimeout(f.sfTimer),f.sfTimer=setTimeout(g,e.delay));("mouseleave"===c.type||"focusout"===c.type)&&b.children("a").data("follow",!1)},j=function(c){c.hasClass(e.menuClass)&&a.error("Superfish requires you to update to a version of hoverIntent that supports event-delegation, such as this one: https://github.com/joeldbirch/onHoverIntent");c=c.closest("."+e.menuClass)[0];d.op=d.o[c.serial];return c},m=function(c){var b=a(this),f=b.next("ul"),
    b=b.data("follow");if(f.length&&(d.op.useClick||!b))c.preventDefault(),f.is(":visible")?a.proxy(l,a(this).parent(),c)():a.proxy(k,a(this).parent(),c)()};return this.addClass(e.menuClass).each(function(){var c=this.serial=d.o.length,b=a.extend({},d.defaults,f),h=a(this),j=h.find("li:has(ul)");b.$path=h.find("li."+b.pathClass).slice(0,b.pathLevels).each(function(){a(this).addClass(b.hoverClass+" "+e.bcClass).filter("li:has(ul)").removeClass(b.pathClass)});d.o[c]=d.op=b;b.autoArrows&&j.children("a").each(function(){a(this).addClass(e.anchorClass).append(g.clone())});
    d.op.useClick||(a.fn.hoverIntent&&!d.op.disableHI?h.hoverIntent(k,l,"li:has(ul)"):(h.on("mouseenter","li:has(ul)",k),h.on("mouseleave","li:has(ul)",l)));h.on("focusin","li:has(ul)",k);h.on("focusout","li:has(ul)",l);h.on("click","a",m);j.not("."+e.bcClass).hideSuperfishUl();b.onInit.call(this)})};var g=a.fn.superfish;g.o=[];g.op={};g.c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",arrowClass:"sf-sub-indicator"};g.defaults={hoverClass:"sfHover",pathClass:"overideThisToUse",
    pathLevels:1,delay:800,animation:{opacity:"show"},animationOut:{opacity:"hide"},speed:"normal",speedOut:"fast",autoArrows:!0,disableHI:!1,useClick:!1,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){},onIdle:function(){}};a.fn.extend({hideSuperfishUl:function(){var f=g.op,d=!0===f.retainPath?f.$path:"";f.retainPath=!1;var e=a("li."+f.hoverClass,this).add(this).not(d).find(">ul").stop(!0,!0).animate(f.animationOut,f.speedOut,function(){e=a(this);e.css("visibility",
    "hidden").parent().removeClass(f.hoverClass);f.onHide.call(e)});return this},showSuperfishUl:function(){var a=g.op,d=this.addClass(a.hoverClass).find(">ul:hidden").css("visibility","visible");a.onBeforeShow.call(d);d.stop(!0,!0).animate(a.animation,a.speed,function(){a.onShow.call(d)});return this}})})(jQuery);

    // from 10-stickup.js

    ;(function($){
        $.fn.tmStickUp=function(options){
    
            var getOptions = {
                correctionSelector: $('.correctionSelector')
            ,	listenSelector: $('.listenSelector')
            ,	active: false
            ,	pseudo: true
            }
            $.extend(getOptions, options);
    
            var
                _this = $(this)
            ,	_window = $(window)
            ,	_document = $(document)
            ,	thisOffsetTop = 0
            ,	thisOuterHeight = 0
            ,	thisMarginTop = 0
            ,	thisPaddingTop = 0
            ,	documentScroll = 0
            ,	pseudoBlock
            ,	lastScrollValue = 0
            ,	scrollDir = ''
            ,	tmpScrolled
            ;
    
            if (_this.length != 0) {
                init();
            }
    
            function init(){
                thisOffsetTop = parseInt(_this.offset().top);
                thisMarginTop = parseInt(_this.css("margin-top"));
                thisOuterHeight = parseInt(_this.outerHeight(true));
    
                if(getOptions.pseudo){
                    $('<div class="pseudoStickyBlock"></div>').insertAfter(_this);
                    pseudoBlock = $('.pseudoStickyBlock');
                    pseudoBlock.css({"position":"relative", "display":"block"});
                }
    
                if(getOptions.active){
                    addEventsFunction();
                }
            }//end init
    
            function addEventsFunction(){
                _document.on('scroll', function() {
                    tmpScrolled = $(this).scrollTop();
                        if (tmpScrolled > lastScrollValue){
                            scrollDir = 'down';
                        } else {
                            scrollDir = 'up';
                        }
                    lastScrollValue = tmpScrolled;
    
                    if(getOptions.correctionSelector.length != 0){
                        correctionValue = getOptions.correctionSelector.outerHeight(true);
                    }else{
                        correctionValue = 0;
                    }
    
                    documentScroll = parseInt(_window.scrollTop());
                    if(thisOffsetTop - correctionValue < documentScroll){
                        _this.addClass('isStuck');
                        getOptions.listenSelector.addClass('isStuck');
                        if(getOptions.pseudo){
                            _this.css({position:"fixed", top:correctionValue});
                            pseudoBlock.css({"height":thisOuterHeight});
                        }else{
                            _this.css({position:"fixed", top:correctionValue});
                        }
                    }else{
                        _this.removeClass('isStuck');
                        getOptions.listenSelector.removeClass('isStuck');
                        if(getOptions.pseudo){
                            _this.css({position:"relative", top:0});
                            pseudoBlock.css({"height":0});
                        }else{
                            _this.css({position:"absolute", top:0});
                        }
                    }
                }).trigger('scroll');
    
                _document.on("resize", function() {
                    if(_this.hasClass('isStuck')){
                        if( thisOffsetTop != parseInt(pseudoBlock.offset().top) ) thisOffsetTop = parseInt(pseudoBlock.offset().top);
                    } else {
                        if( thisOffsetTop != parseInt(_this.offset().top) ) thisOffsetTop = parseInt(_this.offset().top);
                    }
                })
            }
        }//end tmStickUp function
    })(jQuery)

    // from 11-jq-maginific-popup.min.js

    /*! Magnific Popup - v0.9.3 - 2013-07-16
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2013 Dmitry Semenov; */
;(function(e){var t,i,n,o,a,r,s,l="Close",c="BeforeClose",d="AfterClose",u="BeforeAppend",p="MarkupParse",f="Open",m="Change",g="mfp",v="."+g,h="mfp-ready",C="mfp-removing",y="mfp-prevent-close",w=function(){},b=!!window.jQuery,I=e(window),x=function(e,i){t.ev.on(g+e+v,i)},k=function(t,i,n,o){var a=document.createElement("div");return a.className="mfp-"+t,n&&(a.innerHTML=n),o?i&&i.appendChild(a):(a=e(a),i&&a.appendTo(i)),a},T=function(i,n){t.ev.triggerHandler(g+i,n),t.st.callbacks&&(i=i.charAt(0).toLowerCase()+i.slice(1),t.st.callbacks[i]&&t.st.callbacks[i].apply(t,e.isArray(n)?n:[n]))},E=function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).trigger("focus")},S=function(i){return i===s&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),s=i),t.currTemplate.closeBtn},P=function(){e.magnificPopup.instance||(t=new w,t.init(),e.magnificPopup.instance=t)},_=function(i){if(!e(i).hasClass(y)){var n=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(n&&o)return!0;if(!t.content||e(i).hasClass("mfp-close")||t.preloader&&i===t.preloader[0])return!0;if(i===t.content[0]||e.contains(t.content[0],i)){if(n)return!0}else if(o&&e.contains(document,i))return!0;return!1}},O=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1};w.prototype={constructor:w,init:function(){var i=navigator.appVersion;t.isIE7=-1!==i.indexOf("MSIE 7."),t.isIE8=-1!==i.indexOf("MSIE 8."),t.isLowIE=t.isIE7||t.isIE8,t.isAndroid=/android/gi.test(i),t.isIOS=/iphone|ipad|ipod/gi.test(i),t.supportsTransition=O(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),n=e(document.body),o=e(document),t.popupsCache={}},open:function(i){var n;if(i.isObj===!1){t.items=i.items.toArray(),t.index=0;var a,s=i.items;for(n=0;s.length>n;n++)if(a=s[n],a.parsed&&(a=a.el[0]),a===i.el[0]){t.index=n;break}}else t.items=e.isArray(i.items)?i.items:[i.items],t.index=i.index||0;if(t.isOpen)return t.updateItemHTML(),void 0;t.types=[],r="",t.ev=i.mainEl&&i.mainEl.length?i.mainEl.eq(0):o,i.key?(t.popupsCache[i.key]||(t.popupsCache[i.key]={}),t.currTemplate=t.popupsCache[i.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,i),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=k("bg").on("click"+v,function(){t.close()}),t.wrap=k("wrap").attr("tabindex",-1).on("click"+v,function(e){_(e.target)&&t.close()}),t.container=k("container",t.wrap)),t.contentContainer=k("content"),t.st.preloader&&(t.preloader=k("preloader",t.container,t.st.tLoading));var l=e.magnificPopup.modules;for(n=0;l.length>n;n++){var c=l[n];c=c.charAt(0).toUpperCase()+c.slice(1),t["init"+c].call(t)}T("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(x(p,function(e,t,i,n){i.close_replaceWith=S(n.type)}),r+=" mfp-close-btn-in"):t.wrap.append(S())),t.st.alignTop&&(r+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:I.scrollTop(),position:"absolute"}),(t.st.fixedBgPos===!1||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:o.height(),position:"absolute"}),t.st.enableEscapeKey&&o.on("keyup"+v,function(e){27===e.keyCode&&t.close()}),I.on("resize"+v,function(){t.updateSize()}),t.st.closeOnContentClick||(r+=" mfp-auto-cursor"),r&&t.wrap.addClass(r);var d=t.wH=I.height(),u={};if(t.fixedContentPos&&t._hasScrollBar(d)){var m=t._getScrollbarSize();m&&(u.paddingRight=m)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):u.overflow="hidden");var g=t.st.mainClass;t.isIE7&&(g+=" mfp-ie7"),g&&t._addClassToMFP(g),t.updateItemHTML(),T("BuildControls"),e("html").css(u),t.bgOverlay.add(t.wrap).prependTo(document.body),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(h),E()):t.bgOverlay.addClass(h),o.on("focusin"+v,function(i){return i.target===t.wrap[0]||e.contains(t.wrap[0],i.target)?void 0:(E(),!1)})},16),t.isOpen=!0,t.updateSize(d),T(f)},close:function(){t.isOpen&&(T(c),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(C),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){T(l);var i=C+" "+h+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(i+=t.st.mainClass+" "),t._removeClassFromMFP(i),t.fixedContentPos){var n={paddingRight:""};t.isIE7?e("body, html").css("overflow",""):n.overflow="",e("html").css(n)}o.off("keyup"+v+" focusin"+v),t.ev.off(v),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&t.currTemplate[t.currItem.type]!==!0||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t._lastFocusedEl&&e(t._lastFocusedEl).trigger("focus"),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,T(d)},updateSize:function(e){if(t.isIOS){var i=document.documentElement.clientWidth/window.innerWidth,n=window.innerHeight*i;t.wrap.css("height",n),t.wH=n}else t.wH=e||I.height();t.fixedContentPos||t.wrap.css("height",t.wH),T("Resize")},updateItemHTML:function(){var i=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),i.parsed||(i=t.parseEl(t.index));var n=i.type;if(T("BeforeChange",[t.currItem?t.currItem.type:"",n]),t.currItem=i,!t.currTemplate[n]){var o=t.st[n]?t.st[n].markup:!1;T("FirstMarkupParse",o),t.currTemplate[n]=o?e(o):!0}a&&a!==i.type&&t.container.removeClass("mfp-"+a+"-holder");var r=t["get"+n.charAt(0).toUpperCase()+n.slice(1)](i,t.currTemplate[n]);t.appendContent(r,n),i.preloaded=!0,T(m,i),a=i.type,t.container.prepend(t.contentContainer),T("AfterChange")},appendContent:function(e,i){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&t.currTemplate[i]===!0?t.content.find(".mfp-close").length||t.content.append(S()):t.content=e:t.content="",T(u),t.container.addClass("mfp-"+i+"-holder"),t.contentContainer.append(t.content)},parseEl:function(i){var n=t.items[i],o=n.type;if(n=n.tagName?{el:e(n)}:{data:n,src:n.src},n.el){for(var a=t.types,r=0;a.length>r;r++)if(n.el.hasClass("mfp-"+a[r])){o=a[r];break}n.src=n.el.attr("data-mfp-src"),n.src||(n.src=n.el.attr("href"))}return n.type=o||t.st.type||"inline",n.index=i,n.parsed=!0,t.items[i]=n,T("ElementParse",n),t.items[i]},addGroup:function(e,i){var n=function(n){n.mfpEl=this,t._openClick(n,e,i)};i||(i={});var o="click.magnificPopup";i.mainEl=e,i.items?(i.isObj=!0,e.off(o).on(o,n)):(i.isObj=!1,i.delegate?e.off(o).on(o,i.delegate,n):(i.items=e,e.off(o).on(o,n)))},_openClick:function(i,n,o){var a=void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick;if(a||2!==i.which&&!i.ctrlKey&&!i.metaKey){var r=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(r)if(e.isFunction(r)){if(!r.call(t))return!0}else if(r>I.width())return!0;i.type&&(i.preventDefault(),t.isOpen&&i.stopPropagation()),o.el=e(i.mfpEl),o.delegate&&(o.items=n.find(o.delegate)),t.open(o)}},updateStatus:function(e,n){if(t.preloader){i!==e&&t.container.removeClass("mfp-s-"+i),n||"loading"!==e||(n=t.st.tLoading);var o={status:e,text:n};T("UpdateStatus",o),e=o.status,n=o.text,t.preloader.html(n),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),i=e}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?o.height():document.body.scrollHeight)>(e||I.height())},_parseMarkup:function(t,i,n){var o;n.data&&(i=e.extend(n.data,i)),T(p,[t,i,n]),e.each(i,function(e,i){if(void 0===i||i===!1)return!0;if(o=e.split("_"),o.length>1){var n=t.find(v+"-"+o[0]);if(n.length>0){var a=o[1];"replaceWith"===a?n[0]!==i[0]&&n.replaceWith(i):"img"===a?n.is("img")?n.attr("src",i):n.replaceWith('<img src="'+i+'" class="'+n.attr("class")+'" />'):n.attr(o[1],i)}}else t.find(v+"-"+e).html(i)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.id="mfp-sbm",e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:w.prototype,modules:[],open:function(e,t){return P(),e||(e={}),e.isObj=!0,e.index=t||0,this.instance.open(e)},close:function(){return e.magnificPopup.instance.close()},registerModule:function(t,i){i.options&&(e.magnificPopup.defaults[t]=i.options),e.extend(this.proto,i.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},e.fn.magnificPopup=function(i){P();var n=e(this);if("string"==typeof i)if("open"===i){var o,a=b?n.data("magnificPopup"):n[0].magnificPopup,r=parseInt(arguments[1],10)||0;a.items?o=a.items[r]:(o=n,a.delegate&&(o=o.find(a.delegate)),o=o.eq(r)),t._openClick({mfpEl:o},n,a)}else t.isOpen&&t[i].apply(t,Array.prototype.slice.call(arguments,1));else b?n.data("magnificPopup",i):n[0].magnificPopup=i,t.addGroup(n,i);return n};var z,M,B,H="inline",L=function(){B&&(M.after(B.addClass(z)).detach(),B=null)};e.magnificPopup.registerModule(H,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(H),x(l+"."+H,function(){L()})},getInline:function(i,n){if(L(),i.src){var o=t.st.inline,a=e(i.src);if(a.length){var r=a[0].parentNode;r&&r.tagName&&(M||(z=o.hiddenClass,M=k(z),z="mfp-"+z),B=a.after(M).detach().removeClass(z)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),a=e("<div>");return i.inlineElement=a,a}return t.updateStatus("ready"),t._parseMarkup(n,{},i),n}}});var A,F="ajax",j=function(){A&&n.removeClass(A)};e.magnificPopup.registerModule(F,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(F),A=t.st.ajax.cursor,x(l+"."+F,function(){j(),t.req&&t.req.abort()})},getAjax:function(i){A&&n.addClass(A),t.updateStatus("loading");var o=e.extend({url:i.src,success:function(n,o,a){var r={data:n,xhr:a};T("ParseAjax",r),t.appendContent(e(r.data),F),i.finished=!0,j(),E(),setTimeout(function(){t.wrap.addClass(h)},16),t.updateStatus("ready"),T("AjaxContentAdded")},error:function(){j(),i.finished=i.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",i.src))}},t.st.ajax.settings);return t.req=e.ajax(o),""}}});var N,W=function(i){if(i.data&&void 0!==i.data.title)return i.data.title;var n=t.st.image.titleSrc;if(n){if(e.isFunction(n))return n.call(t,i);if(i.el)return i.el.attr(n)||""}return""};e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=t.st.image,i=".image";t.types.push("image"),x(f+i,function(){"image"===t.currItem.type&&e.cursor&&n.addClass(e.cursor)}),x(l+i,function(){e.cursor&&n.removeClass(e.cursor),I.off("resize"+v)}),x("Resize"+i,t.resizeImage),t.isLowIE&&x("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e.img&&t.st.image.verticalFit){var i=0;t.isLowIE&&(i=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-i)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,N&&clearInterval(N),e.isCheckingImgSize=!1,T("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var i=0,n=e.img[0],o=function(a){N&&clearInterval(N),N=setInterval(function(){return n.naturalWidth>0?(t._onImageHasSize(e),void 0):(i>200&&clearInterval(N),i++,3===i?o(10):40===i?o(50):100===i&&o(500),void 0)},a)};o(1)},getImage:function(i,n){var o=0,a=function(){i&&(i.img[0].complete?(i.img.off(".mfploader"),i===t.currItem&&(t._onImageHasSize(i),t.updateStatus("ready")),i.hasSize=!0,i.loaded=!0,T("ImageLoadComplete")):(o++,200>o?setTimeout(a,100):r()))},r=function(){i&&(i.img.off(".mfploader"),i===t.currItem&&(t._onImageHasSize(i),t.updateStatus("error",s.tError.replace("%url%",i.src))),i.hasSize=!0,i.loaded=!0,i.loadError=!0)},s=t.st.image,l=n.find(".mfp-img");if(l.length){var c=new Image;c.className="mfp-img",i.img=e(c).on("load.mfploader",a).on("error.mfploader",r),c.src=i.src,l.is("img")&&(i.img=i.img.clone()),i.img[0].naturalWidth>0&&(i.hasSize=!0)}return t._parseMarkup(n,{title:W(i),img_replaceWith:i.img},i),t.resizeImage(),i.hasSize?(N&&clearInterval(N),i.loadError?(n.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",i.src))):(n.removeClass("mfp-loading"),t.updateStatus("ready")),n):(t.updateStatus("loading"),i.loading=!0,i.hasSize||(i.imgHidden=!0,n.addClass("mfp-loading"),t.findImageSize(i)),n)}}});var R,Z=function(){return void 0===R&&(R=void 0!==document.createElement("p").style.MozTransform),R};e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e=t.st.zoom,i=".zoom";if(e.enabled&&t.supportsTransition){var n,o,a=e.duration,r=function(t){var i=t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),n="all "+e.duration/1e3+"s "+e.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},a="transition";return o["-webkit-"+a]=o["-moz-"+a]=o["-o-"+a]=o[a]=n,i.css(o),i},s=function(){t.content.css("visibility","visible")};x("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(n),t.content.css("visibility","hidden"),image=t._getItemToZoom(),!image)return s(),void 0;o=r(image),o.css(t._getOffset()),t.wrap.append(o),n=setTimeout(function(){o.css(t._getOffset(!0)),n=setTimeout(function(){s(),setTimeout(function(){o.remove(),image=o=null,T("ZoomAnimationEnded")},16)},a)},16)}}),x(c+i,function(){if(t._allowZoom()){if(clearTimeout(n),t.st.removalDelay=a,!image){if(image=t._getItemToZoom(),!image)return;o=r(image)}o.css(t._getOffset(!0)),t.wrap.append(o),t.content.css("visibility","hidden"),setTimeout(function(){o.css(t._getOffset())},16)}}),x(l+i,function(){t._allowZoom()&&(s(),o&&o.remove())})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return t.currItem.hasSize?t.currItem.img:!1},_getOffset:function(i){var n;n=i?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem);var o=n.offset(),a=parseInt(n.css("padding-top"),10),r=parseInt(n.css("padding-bottom"),10);o.top-=e(window).scrollTop()-a;var s={width:n.width(),height:(b?n.innerHeight():n[0].offsetHeight)-r-a};return Z()?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var q="iframe",D="//about:blank",K=function(e){if(t.currTemplate[q]){var i=t.currTemplate[q].find("iframe");i.length&&(e||(i[0].src=D),t.isIE8&&i.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(q,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(q),x("BeforeChange",function(e,t,i){t!==i&&(t===q?K():i===q&&K(!0))}),x(l+"."+q,function(){K()})},getIframe:function(i,n){var o=i.src,a=t.st.iframe;e.each(a.patterns,function(){return o.indexOf(this.index)>-1?(this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1):void 0});var r={};return a.srcAction&&(r[a.srcAction]=o),t._parseMarkup(n,r,i),t.updateStatus("ready"),n}}});var Y=function(e){var i=t.items.length;return e>i-1?e-i:0>e?i+e:e},U=function(e,t,i){return e.replace("%curr%",t+1).replace("%total%",i)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var i=t.st.gallery,n=".mfp-gallery",a=Boolean(e.fn.mfpFastClick);return t.direction=!0,i&&i.enabled?(r+=" mfp-gallery",x(f+n,function(){i.navigateByImgClick&&t.wrap.on("click"+n,".mfp-img",function(){return t.items.length>1?(t.next(),!1):void 0}),o.on("keydown"+n,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),x("UpdateStatus"+n,function(e,i){i.text&&(i.text=U(i.text,t.currItem.index,t.items.length))}),x(p+n,function(e,n,o,a){var r=t.items.length;o.counter=r>1?U(i.tCounter,a.index,r):""}),x("BuildControls"+n,function(){if(t.items.length>1&&i.arrows&&!t.arrowLeft){var n=i.arrowMarkup,o=t.arrowLeft=e(n.replace("%title%",i.tPrev).replace("%dir%","left")).addClass(y),r=t.arrowRight=e(n.replace("%title%",i.tNext).replace("%dir%","right")).addClass(y),s=a?"mfpFastClick":"click";o[s](function(){t.prev()}),r[s](function(){t.next()}),t.isIE7&&(k("b",o[0],!1,!0),k("a",o[0],!1,!0),k("b",r[0],!1,!0),k("a",r[0],!1,!0)),t.container.append(o.add(r))}}),x(m+n,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),x(l+n,function(){o.off(n),t.wrap.off("click"+n),t.arrowLeft&&a&&t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(),t.arrowRight=t.arrowLeft=null}),void 0):!1},next:function(){t.direction=!0,t.index=Y(t.index+1),t.updateItemHTML()},prev:function(){t.direction=!1,t.index=Y(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,i=t.st.gallery.preload,n=Math.min(i[0],t.items.length),o=Math.min(i[1],t.items.length);for(e=1;(t.direction?o:n)>=e;e++)t._preloadItem(t.index+e);for(e=1;(t.direction?n:o)>=e;e++)t._preloadItem(t.index-e)},_preloadItem:function(i){if(i=Y(i),!t.items[i].preloaded){var n=t.items[i];n.parsed||(n=t.parseEl(i)),T("LazyLoad",n),"image"===n.type&&(n.img=e('<img class="mfp-img" />').on("load.mfploader",function(){n.hasSize=!0}).on("error.mfploader",function(){n.hasSize=!0,n.loadError=!0,T("LazyLoadError",n)}).attr("src",n.src)),n.preloaded=!0}}}});var G="retina";e.magnificPopup.registerModule(G,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,i=e.ratio;i=isNaN(i)?i():i,i>1&&(x("ImageHasSize."+G,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/i,width:"100%"})}),x("ElementParse."+G,function(t,n){n.src=e.replaceSrc(n,i)}))}}}}),function(){var t=1e3,i="ontouchstart"in window,n=function(){I.off("touchmove"+a+" touchend"+a)},o="mfpFastClick",a="."+o;e.fn.mfpFastClick=function(o){return e(this).each(function(){var r,s=e(this);if(i){var l,c,d,u,p,f;s.on("touchstart"+a,function(e){u=!1,f=1,p=e.originalEvent?e.originalEvent.touches[0]:e.touches[0],c=p.clientX,d=p.clientY,I.on("touchmove"+a,function(e){p=e.originalEvent?e.originalEvent.touches:e.touches,f=p.length,p=p[0],(Math.abs(p.clientX-c)>10||Math.abs(p.clientY-d)>10)&&(u=!0,n())}).on("touchend"+a,function(e){n(),u||f>1||(r=!0,e.preventDefault(),clearTimeout(l),l=setTimeout(function(){r=!1},t),o())})})}s.on("click"+a,function(){r||o()})})},e.fn.destroyMfpFastClick=function(){e(this).off("touchstart"+a+" click"+a),i&&I.off("touchmove"+a+" touchend"+a)}}()})(window.jQuery||window.Zepto);

// from 12-jq-isotope.js

(function(m,f){var E=m.document,l=m.Modernizr,t=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},y=["Moz","Webkit","O","Ms"],q=function(a){var b=E.documentElement.style,c;if("string"===typeof b[a])return a;a=t(a);for(var d=0,e=y.length;d<e;d++)if(c=y[d]+a,"string"===typeof b[c])return c},u=q("transform"),z=q("transitionProperty"),r={csstransforms:function(){return!!u},csstransforms3d:function(){var a=!!q("perspective");if(a){var a="@media ("+" -o- -moz- -ms- -webkit- -khtml- ".split(" ").join("transform-3d),(")+
    "modernizr)",b=f("<style>"+a+"{#modernizr{height:3px}}</style>").appendTo("head"),c=f('<div id="modernizr" />').appendTo("html"),a=3===c.height();c.remove();b.remove()}return a},csstransitions:function(){return!!z}},n;if(l)for(n in r)l.hasOwnProperty(n)||l.addTest(n,r[n]);else{var l=m.Modernizr={_version:"1.6ish: miniModernizr for Isotope"},v=" ",w;for(n in r)w=r[n](),l[n]=w,v+=" "+(w?"":"no-")+n;f("html").addClass(v)}if(l.csstransforms){var F=l.csstransforms3d?{translate:function(a){return"translate3d("+
    a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},A=function(a,b,c){var d=f.data(a,"isoTransform")||{},e={},g,h={};e[b]=c;f.extend(d,e);for(g in d)b=d[g],h[g]=F[g](b);g=(h.translate||"")+(h.scale||"");f.data(a,"isoTransform",d);a.style[u]=g};f.cssNumber.scale=!0;f.cssHooks.scale={set:function(a,b){A(a,"scale",b)},get:function(a){return(a=f.data(a,"isoTransform"))&&
    a.scale?a.scale:1}};f.fx.step.scale=function(a){f.cssHooks.scale.set(a.elem,a.now+a.unit)};f.cssNumber.translate=!0;f.cssHooks.translate={set:function(a,b){A(a,"translate",b)},get:function(a){return(a=f.data(a,"isoTransform"))&&a.translate?a.translate:[0,0]}}}var B,C;l.csstransitions&&(B={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[z],C=q("transitionDuration"));var s=f.event,
    G=f.event.handle?"handle":"dispatch",x;s.special.smartresize={setup:function(){f(this).bind("resize",s.special.smartresize.handler)},teardown:function(){f(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize";x&&clearTimeout(x);x=setTimeout(function(){s[G].apply(c,d)},"execAsap"===b?0:100)}};f.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])};f.Isotope=function(a,b,c){this.element=
    f(b);this._create(a);this._init(c)};var H=["width","height"],D=f(m);f.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:0.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1};
    f.Isotope.prototype={_create:function(a){this.options=f.extend({},f.Isotope.settings,a);this.styleQueue=[];this.elemCount=0;a=this.element[0].style;this.originalStyle={};var b=H.slice(0),c;for(c in this.options.containerStyle)b.push(c);for(var d=0,e=b.length;d<e;d++)c=b[d],this.originalStyle[c]=a[c]||"";this.element.css(this.options.containerStyle);this._updateAnimationEngine();this._updateUsingTransforms();this.options.getSortData=f.extend(this.options.getSortData,{"original-order":function(a,c){c.elemCount++;
    return c.elemCount},random:function(){return Math.random()}});this.reloadItems();this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var g=this;setTimeout(function(){g.element.addClass(g.options.containerClass)},0);this.options.resizable&&D.bind("smartresize.isotope",function(){g.resize()});this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector;a=b?a.filter(b).add(a.find(b)):
    a;b={position:"absolute"};a=a.filter(function(a,b){return 1===b.nodeType});this.usingTransforms&&(b.left=0,b.top=0);a.css(b).addClass(this.options.itemClass);this.updateSortData(a,!0);return a},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms);this._sort();this.reLayout(a)},option:function(a){if(f.isPlainObject(a)){this.options=f.extend(!0,this.options,a);for(var b in a)if(a="_update"+t(b),this[a])this[a]()}},_updateAnimationEngine:function(){var a;switch(this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,
    "")){case "css":case "none":a=!1;break;case "jquery":a=!0;break;default:a=!l.csstransitions}this.isUsingJQueryAnimation=a;this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&l.csstransforms&&l.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale);this.getPositionStyles=a?this._translate:this._positionAbs},
    _filter:function(a){var b=""===this.options.filter?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),g=e;"*"!==b&&(g=e.filter(b),d=a.not(d).not(b).addClass(c),this.styleQueue.push({$el:d,style:this.options.hiddenStyle}));this.styleQueue.push({$el:g,style:this.options.visibleStyle});g.removeClass(c);return a.filter(b)},updateSortData:function(a,b){var c=this,d=this.options.getSortData,e,g;a.each(function(){e=f(this);g={};for(var a in d)g[a]=!b&&"original-order"===
    a?f.data(this,"isotope-sort-data")[a]:d[a](e,c);f.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1;this.$filteredAtoms.sort(function(d,e){var g=b(d,a),f=b(e,a);g===f&&"original-order"!==a&&(g=b(d,"original-order"),f=b(e,"original-order"));return(g>f?1:g<f?-1:0)*c})},_getSorter:function(a,b){return f.data(a,"isotope-sort-data")[b]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,
    top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left);c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d});this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);this.options.resizesContainer&&(c=this["_"+c+"GetContainerSize"](),this.styleQueue.push({$el:this.element,style:c}));this._processStyleQueue(a,b);this.isLaidOut=!0},_processStyleQueue:function(a,
    b){var c=!this.isLaidOut?"css":this.isUsingJQueryAnimation?"animate":"css",d=this.options.animationOptions,e=this.options.onLayout,g,h,k,j;h=function(a,b){b.$el[c](b.style,d)};if(this._isInserting&&this.isUsingJQueryAnimation)h=function(a,b){g=b.$el.hasClass("no-transition")?"css":c;b.$el[g](b.style,d)};else if(b||e||d.complete){var m=!1,n=[b,e,d.complete],q=this;k=!0;j=function(){if(!m){for(var b,c=0,d=n.length;c<d;c++)b=n[c],"function"===typeof b&&b.call(q.element,a,q);m=!0}};if(this.isUsingJQueryAnimation&&
    "animate"===c)d.complete=j,k=!1;else if(l.csstransitions){for(var e=0,p=this.styleQueue[0],p=p&&p.$el;!p||!p.length;){p=this.styleQueue[e++];if(!p)return;p=p.$el}0<parseFloat(getComputedStyle(p[0])[C])&&(h=function(a,b){b.$el[c](b.style,d).one(B,j)},k=!1)}}f.each(this.styleQueue,h);k&&j();this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"]();this.layout(this.$filteredAtoms,a)},addItems:function(a,
    b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c);b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){a=c._filter(a);c._addHideAppended(a);c._sort();c.reLayout();c._revealAppended(a,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a);c.layout(a);c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a);a.addClass("no-transition");this._isInserting=!0;this.styleQueue.push({$el:a,
    style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition");c.styleQueue.push({$el:a,style:c.options.visibleStyle});c._isInserting=!1;c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a);this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove();b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+
    ")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms);this.options.sortBy="random";this._sort();this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="";b.top="";b.left="";b.opacity="";a&&(b[u]="")});var c=this.element[0].style,d;for(d in this.originalStyle)c[d]=
    this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope");D.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width";a=a?"rows":"cols";var e=this.element[d](),d=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+t(d)](!0)||e,e=Math.floor(e/d),e=Math.max(e,1);this[b][a]=e;this[b][c]=d},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,
    c=a?"rows":"cols",d=this[b][c];this._getSegments(a);return this[b][c]!==d},_masonryReset:function(){this.masonry={};this._getSegments();var a=this.masonry.cols;for(this.masonry.colYs=[];a--;)this.masonry.colYs.push(0)},_masonryLayout:function(a){var b=this,c=b.masonry;a.each(function(){var a=f(this),e=Math.ceil(a.outerWidth(!0)/c.columnWidth),e=Math.min(e,c.cols);if(1===e)b._masonryPlaceBrick(a,c.colYs);else{var g=c.cols+1-e,h=[],k,j;for(j=0;j<g;j++)k=c.colYs.slice(j,j+e),h[j]=Math.max.apply(Math,
    k);b._masonryPlaceBrick(a,h)}})},_masonryPlaceBrick:function(a,b){for(var c=Math.min.apply(Math,b),d=0,e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}this._pushPosition(a,this.masonry.columnWidth*d,c);c+=a.outerHeight(!0);f=this.masonry.cols+1-f;for(e=0;e<f;e++)this.masonry.colYs[d+e]=c},_masonryGetContainerSize:function(){return{height:Math.max.apply(Math,this.masonry.colYs)}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},
    _fitRowsLayout:function(a){var b=this,c=this.element.width(),d=this.fitRows;a.each(function(){var a=f(this),g=a.outerWidth(!0),h=a.outerHeight(!0);0!==d.x&&g+d.x>c&&(d.x=0,d.y=d.height);b._pushPosition(a,d.x,d.y);d.height=Math.max(d.y+h,d.height);d.x+=g})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0};this._getSegments();this._getSegments(!0)},_cellsByRowLayout:function(a){var b=
    this,c=this.cellsByRow;a.each(function(){var a=f(this),e=Math.floor(c.index/c.cols),g=(c.index%c.cols+0.5)*c.columnWidth-a.outerWidth(!0)/2,e=(e+0.5)*c.rowHeight-a.outerHeight(!0)/2;b._pushPosition(a,g,e);c.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},
    _straightDownLayout:function(a){var b=this;a.each(function(){var a=f(this);b._pushPosition(a,0,b.straightDown.y);b.straightDown.y+=a.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={};this._getSegments(!0);var a=this.masonryHorizontal.rows;for(this.masonryHorizontal.rowXs=[];a--;)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var b=
    this,c=b.masonryHorizontal;a.each(function(){var a=f(this),e=Math.ceil(a.outerHeight(!0)/c.rowHeight),e=Math.min(e,c.rows);if(1===e)b._masonryHorizontalPlaceBrick(a,c.rowXs);else{var g=c.rows+1-e,h=[],k,j;for(j=0;j<g;j++)k=c.rowXs.slice(j,j+e),h[j]=Math.max.apply(Math,k);b._masonryHorizontalPlaceBrick(a,h)}})},_masonryHorizontalPlaceBrick:function(a,b){for(var c=Math.min.apply(Math,b),d=0,e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}this._pushPosition(a,c,this.masonryHorizontal.rowHeight*d);c+=a.outerWidth(!0);
    f=this.masonryHorizontal.rows+1-f;for(e=0;e<f;e++)this.masonryHorizontal.rowXs[d+e]=c},_masonryHorizontalGetContainerSize:function(){return{width:Math.max.apply(Math,this.masonryHorizontal.rowXs)}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var b=this,c=this.element.height(),d=this.fitColumns;a.each(function(){var a=f(this),g=a.outerWidth(!0),h=a.outerHeight(!0);0!==
    d.y&&h+d.y>c&&(d.x=d.width,d.y=0);b._pushPosition(a,d.x,d.y);d.width=Math.max(d.x+g,d.width);d.y+=h})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0};this._getSegments();this._getSegments(!0)},_cellsByColumnLayout:function(a){var b=this,c=this.cellsByColumn;a.each(function(){var a=f(this),e=c.index%c.rows,g=(Math.floor(c.index/c.rows)+0.5)*c.columnWidth-a.outerWidth(!0)/
    2,e=(e+0.5)*c.rowHeight-a.outerHeight(!0)/2;b._pushPosition(a,g,e);c.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var b=this;a.each(function(){var a=f(this);b._pushPosition(a,b.straightAcross.x,0);b.straightAcross.x+=
    a.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}};f.fn.imagesLoaded=function(a){function b(){a.call(d,e)}function c(a){a=a.target;a.src!==h&&-1===f.inArray(a,k)&&(k.push(a),0>=--g&&(setTimeout(b),e.unbind(".imagesLoaded",c)))}var d=this,e=d.find("img").add(d.filter("img")),g=e.length,h="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",k=[];g||b();e.bind("load.imagesLoaded error.imagesLoaded",
    c).each(function(){var a=this.src;this.src=h;this.src=a});return d};f.fn.isotope=function(a,b){if("string"===typeof a){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var b=f.data(this,"isotope");b?!f.isFunction(b[a])||"_"===a.charAt(0)?m.console&&m.console.error("no such method '"+a+"' for isotope instance"):b[a].apply(b,c):m.console&&m.console.error("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'")})}else this.each(function(){var c=f.data(this,
    "isotope");c?(c.option(a),c._init(b)):f.data(this,"isotope",new f.Isotope(a,this,b))});return this}})(window,jQuery);

    // from New lazy-load

    jQuery(document).ready(function($) {
        function verifierApparition() {
            var basDeLecran = $(window).scrollTop() + $(window).height();
            
            $('.lazy-load-box.trigger').each(function() {
                var hautDeLelement = $(this).offset().top;
                
                if (basDeLecran > hautDeLelement + 200) {
                    var $el = $(this);
                    var delay = parseInt($el.attr('data-delay')) || 0;
                    
                    setTimeout(function() {
                        // LA CORRECTION EST ICI : on retire la classe ET on force l'opacité
                        $el.removeClass('trigger').css('opacity', '1');
                    }, delay);
                }
            });
        }
        
        $(window).on('scroll resize', verifierApparition);
        setTimeout(verifierApparition, 150);
    });

