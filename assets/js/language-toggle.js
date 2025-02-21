document.addEventListener('DOMContentLoaded', function() {
  var currentPath = window.location.pathname;
  var body = document.body;

  // If the page is already in German, disable transitions temporarily.
  if (currentPath.startsWith('/de')) {
    body.classList.add('no-animation');
    // Remove the no-animation class shortly after load so later toggles will animate.
    setTimeout(function() {
      body.classList.remove('no-animation');
    }, 50);
  }

  // Select the checkbox input within the language switch.
  var langInput = document.querySelector('nav > div.menu-block label.switch input.input');
  console.log('Language input element found:', langInput);

  if (!langInput) {
    console.warn('Language input element not found. Please check your selector.');
    return;
  }

  console.log('Current URL path:', currentPath);

  // Determine the initial language state.
  var isGerman = false;
  if (currentPath.startsWith('/de')) {
    langInput.checked = true;
    isGerman = true;
    console.log('Switch set to German (checked).');
  } else {
    langInput.checked = false;
    console.log('Switch set to English (unchecked).');
  }

  // Update navigation links based on the initial language state.
  updateNavLinks(isGerman);
  updateFooterLinks(isGerman);
  

  // Listen for changes on the checkbox.
  langInput.addEventListener('change', function() {
    console.log('Toggle event fired. Checked state:', this.checked);
    var currentPath = window.location.pathname;
    console.log('Current URL path inside event:', currentPath);
    
    // Update navigation links based on the new state.
    updateNavLinks(this.checked);
    updateFooterLinks(this.checked);
	
    // Redirect only if the URL language needs to change.
    if (this.checked) {
      // Switching to German.
      if (!currentPath.startsWith('/de')) {
        var newPath = currentPath === '/' ? '/de/' : '/de' + currentPath;
        console.log('Redirecting to German path:', newPath);
        window.location.href = newPath;
      } else {
        console.log('Already on a German page.');
      }
    } else {
      // Switching to English.
      if (currentPath.startsWith('/de')) {
        var newPath = currentPath.replace(/^\/de/, '');
        newPath = newPath === '' ? '/' : newPath;
        console.log('Redirecting to English path:', newPath);
        window.location.href = newPath;
      } else {
        console.log('Already on an English page.');
      }
    }
  });

  // Function to update the hrefs of navigation links.
  function updateNavLinks(toGerman) {
    // Select all nav links with the "internal-link" class.
    var navLinks = document.querySelectorAll('nav a.internal-link');
    navLinks.forEach(function(link) {
      // Preserve the original href in a data attribute.
      var originalHref = link.getAttribute('data-original-href');
      if (!originalHref) {
        originalHref = link.getAttribute('href');
        link.setAttribute('data-original-href', originalHref);
      }
      // Update the link based on the language state.
      if (toGerman) {
        // Prepend "/de" if not already present.
        if (!originalHref.startsWith('/de')) {
          link.setAttribute('href', '/de' + originalHref);
        }
      } else {
        // Remove the "/de" prefix if present.
        if (originalHref.startsWith('/de')) {
          link.setAttribute('href', originalHref.replace(/^\/de/, ''));
        } else {
          link.setAttribute('href', originalHref);
        }
      }
      console.log('Updated nav link:', link, 'new href:', link.getAttribute('href'));
    });
  }
  
 // Function to update the hrefs of footer links.
  function updateFooterLinks(toGerman) {
    var footerLinks = document.querySelectorAll('footer a.internal-link');
    footerLinks.forEach(function(link) {
      var originalHref = link.getAttribute('data-original-href');
      if (!originalHref) {
        originalHref = link.getAttribute('href');
        link.setAttribute('data-original-href', originalHref);
      }
      if (toGerman) {
        if (!originalHref.startsWith('/de')) {
          link.setAttribute('href', '/de' + originalHref);
        }
      } else {
        if (originalHref.startsWith('/de')) {
          link.setAttribute('href', originalHref.replace(/^\/de/, ''));
        } else {
          link.setAttribute('href', originalHref);
        }
      }
      console.log('Updated footer link:', link, 'new href:', link.getAttribute('href'));
    });
  }

});
