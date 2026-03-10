/*!
=========================================================
* Luchie Bonates - Enhanced Portfolio
=========================================================

* Enhanced JavaScript with modern features
* Smooth scrolling • Interactive elements • Performance optimized

=========================================================
*/

// Enhanced smooth scroll with performance optimization
$(document).ready(function(){
    // Smooth scroll for navigation links - Optimized
	$(".nav-link").on('click', function(event) {
    	if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			var scrollPosition;
			
			// Special case for home - go to top
			if (hash === '#home') {
				scrollPosition = 0;
			} else {
				scrollPosition = $(hash).offset().top - 70;
			}
			
			$('html, body').animate({
				scrollTop: scrollPosition
			}, 600, function(){ // Reduced from 800ms
				window.location.hash = hash;
			});
      	} 
    });

    // Optimized navbar scroll behavior - throttled
    let scrollTimeout;
    $(window).on('scroll', function(){
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            var scrolled = $(window).scrollTop();
            var navbar = $('.navbar');
            
            if (scrolled > 50) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
            
            // Simplified active navigation highlighting
            var scroll = $(window).scrollTop();
            
            if (scroll < 100) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#home"]').addClass('active');
            } else {
                $('.section').each(function(){
                    var target = $(this).offset().top - 100;
                    var bottom = target + $(this).outerHeight();
                    
                    if (scroll >= target && scroll < bottom) {
                        var id = $(this).attr('id');
                        $('.nav-link').removeClass('active');
                        $('.nav-link[href="#' + id + '"]').addClass('active');
                        return false; // Break loop for performance
                    }
                });
            }
        }, 16); // ~60fps throttling
    });

    // Simplified lazy loading
    $('img[loading="lazy"]').each(function() {
        $(this).on('load', function() {
            $(this).addClass('loaded');
        });
    });

    // Simplified console message
    console.log('🚀 Portfolio Otimizado - Carregado!');
});