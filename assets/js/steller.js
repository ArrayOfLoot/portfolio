/*!
=========================================================
* Luchie Bonates - Enhanced Portfolio Core
=========================================================

* Enhanced JavaScript with modern features
* Smooth scrolling • Interactive elements • Performance optimized

=========================================================
*/

// Enhanced smooth scroll with performance optimization
$(document).ready(function(){
    // Smooth scroll for navigation links - RÁPIDO
	$(".nav-link").on('click', function(event) {
    	if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			var scrollPosition;
			
			// Special case for home - go to top INSTANTLY
			if (hash === '#home') {
				scrollPosition = 0;
			} else {
				scrollPosition = $(hash).offset().top - 70;
			}
			
			$('html, body').animate({
				scrollTop: scrollPosition
			}, 400, function(){
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
                navbar.css({
                    'box-shadow': '0 2px 15px rgba(0, 0, 0, 0.1)',
                    'background-color': 'rgba(255, 255, 255, 0.95)'
                });
            } else {
                navbar.removeClass('scrolled');
                navbar.css({
                    'box-shadow': 'none',
                    'background-color': 'rgba(255, 255, 255, 0.98)'
                });
            }
            
            // Active navigation highlighting
            var scroll = $(window).scrollTop();
            
            if (scroll < 100) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#home"]').addClass('active');
            } else {
                $('.section, header').each(function(){
                    var target = $(this).offset().top - 100;
                    var bottom = target + $(this).outerHeight();
                    
                    if (scroll >= target && scroll < bottom) {
                        var id = $(this).attr('id');
                        $('.nav-link').removeClass('active');
                        $('.nav-link[href="#' + id + '"]').addClass('active');
                        return false;
                    }
                });
            }
        }, 16);
    });

    // Enhanced lazy loading
    $('img[loading="lazy"]').each(function() {
        $(this).on('load', function() {
            $(this).addClass('loaded');
        });
    });

    // Portfolio filter with smooth animations
    $(".filter-btn").on('click', function(){
        var filter = $(this).attr("data-filter");
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        
        if(filter == "all") {
            $(".portfolio-item").fadeIn(300);
        } else {
            $(".portfolio-item").fadeOut(200);
            $(".portfolio-item."+filter).fadeIn(300);
        }
    });

    // Counter animation when scrolled into view
    function animateCountup() {
        var counters = document.querySelectorAll(".stat-number");
        
        counters.forEach(counter => {
            var target = +counter.getAttribute('data-count');
            var increment = target / 50;
            var current = 0;
            
            if (!counter.classList.contains('counted')) {
                var timer = setInterval(function() {
                    current += increment;
                    if(current >= target) {
                        counter.textContent = target;
                        counter.classList.add('counted');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, 30);
            }
        });
    }
    
    // Trigger on scroll into view
    var aboutSection = document.getElementById('about');
    if (aboutSection) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCountup();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(aboutSection);
    }

    // Smooth console message
    console.log('%c✨ Portfolio Moderno Carregado!', 'color: #FF8882; font-size: 14px; font-weight: bold;');
});