/* Modified from http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/ */

//= require transitions/modernizr.custom.js

var PageTransitions = (function() {
   var $main = $( '#pt-main' ),
      $pages = $main.children( 'div.pt-page' ),
      $back = $('.back'),
      $next = $('.next'),
      animcursor = 1,
      pagesCount = $pages.length,
      current = 0,
      isAnimating = false,
      endCurrPage = false,
      endNextPage = false,
      animEndEventNames = {
         'WebkitAnimation' : 'webkitAnimationEnd',
         'OAnimation' : 'oAnimationEnd',
         'msAnimation' : 'MSAnimationEnd',
         'animation' : 'animationend'
      },
      // animation end event name
      animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
      // support css animations
      support = Modernizr.cssanimations;

   function init() {
      $pages.each( function() {
         var $page = $( this );
         $page.data( 'originalClassList', $page.attr( 'class' ) );
      } );

      $pages.eq( current ).addClass( 'pt-page-current' );

      $back.click(function() {
         if ( isAnimating ) {
            return false;
         }
         nextPage(false);
         --animcursor;
         if ( animcursor == 1 ) {
            $('.back').css('display', 'none');
            $('.next').css('display', 'block');
         }
      });

      $next.click(function() {
         if( isAnimating ) {
            return false;
         }
         if( animcursor > 67 ) {
            animcursor = 1;
         }
         nextPage( animcursor );
         ++animcursor;
         if ( animcursor == $pages.length ) {
            $('.back').css('display', 'block');
            $('.next').css('display', 'none');
         }
      });

   }

   function nextPage(forward) {
      if( isAnimating ) {
         return false;
      }
      isAnimating = true;

      var $currPage = $pages.eq( current );

      if( current < pagesCount - 1 ) {
         ++current;
      }
      else {
         current = 0;
      }

      var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
            outClass = '', inClass = '';
      if (forward) {
         outClass = 'pt-page-moveToLeft';
         inClass = 'pt-page-moveFromRight';
      }
      else {
         outClass = 'pt-page-moveToRight';
         inClass = 'pt-page-moveFromLeft';
      }
      $currPage.addClass( outClass ).on( animEndEventName, function() {
         $currPage.off( animEndEventName );
         endCurrPage = true;
         if( endNextPage ) {
            onEndAnimation( $currPage, $nextPage );
         }
      } );
      $nextPage.addClass( inClass ).on( animEndEventName, function() {
         $nextPage.off( animEndEventName );
         endNextPage = true;
         if( endCurrPage ) {
            onEndAnimation( $currPage, $nextPage );
         }
      } );
      if( !support ) {
         onEndAnimation( $currPage, $nextPage );
      }
   }

   function onEndAnimation( $outpage, $inpage ) {
      endCurrPage = false;
      endNextPage = false;
      resetPage( $outpage, $inpage );
      isAnimating = false;
   }

   function resetPage( $outpage, $inpage ) {
      $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
      $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
   }

   init();

   return { init : init };

})();
