---
---
document.addEventListener("DOMContentLoaded", function(event) {

  var submenus = document.querySelectorAll('.submenu');

  function hideSubMenus(e) {
    for(var i=0;i<submenus.length;i++) {
      submenus[i].style.display = 'none';
    }
  }
  var liWithMenu = document.querySelectorAll('.has-submenu');
  for(var i=0; i<liWithMenu.length; i++) {
    liWithMenu[i].addEventListener('click', function(e) {
      e.stopPropagation();
      hideSubMenus(e);
      var submenu = this.querySelector('.submenu');
      //this.classList.toggle('link-active');
      if(submenu) {
        if(submenu.style.display === 'block') {
          submenu.style.display = 'none';
          return;
        }
        submenu.style.display = 'block';
      }
    });
  }
  document.addEventListener('click', hideSubMenus);

  {% if site.disqus and site.disqus != "" %}
  var cmtBtn = document.getElementById("showComments");
  if(!cmtBtn){
      return;
  }

  var commentHidden = true;
  var disqus_shortname = '';
  var dt = document.getElementById("disqus_thread");

  function loadDisqus() {
      if(disqus_shortname === ''){
          disqus_shortname = '{{ site.disqus }}';
          dt.innerHTML = 'Loading comments...';
          (function() {
              var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
              dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
          })();
      }
      if(commentHidden){
          dt.setAttribute('style','display:block');
          this.innerHTML = 'Hide Comments';
      }else{
          dt.setAttribute('style','display:none');
          this.innerHTML = 'Comments';
      }
      commentHidden = !commentHidden;
  }

  cmtBtn.addEventListener("click", function(e){
      e.preventDefault();
      loadDisqus(); 
  });

  var scrolling = false;

  function isElementInViewport (el) {
      if (typeof jQuery === "function" && el instanceof jQuery) {
          el = el[0];
      }

      var rect = el.getBoundingClientRect();

      scrolling = false;
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
      );
  }

  function enableScrolling(e) {
      scrolling = true;
  }

  window.addEventListener('scroll', enableScrolling);

  var interval = setInterval(function() {
      if(!scrolling) {
          return false;
      }
      if(isElementInViewport(cmtBtn)) {
          loadDisqus();
          clearInterval(interval);
          window.removeEventListener('scroll', enableScrolling);
      }
  }, 400);
  {% endif %}
});