function addClassKlippyToPreCode() {
  document.addEventListener("DOMContentLoaded", function() {
    var targetedCodes = document.querySelectorAll("pre > code");
    for (var i = 0; i < targetedCodes.length; i += 1) {
      targetedCodes.item(i).parentElement.className += ' klippy';
    }
  });
}

function addClassKlippyTo(selector) {
  document.addEventListener("DOMContentLoaded", function() {
    var targetedChunks = document.querySelectorAll(selector);
    for (var i = 0; i < targetedChunks.length; i += 1) {
      targetedChunks.item(i).className += ' klippy';
    }
  });
}

function changeTooltipMessage(element, msg) {
  element.setAttribute('aria-label', msg);
}

function getUriOcticonClippy(klippyColor, klippyOpacity) {
  var color;
  if (klippyColor === 'auto') {
    var a = document.createElement('a');
    document.body.appendChild(a);
    color = window.getComputedStyle(a).getPropertyValue('color');
    document.body.removeChild(a);
  } else {
    color = klippyColor;
  }
  // The following SVG image is Octicons Clippy (version 6.0.1) (c) GitHub, Inc. - MIT License
  // MIT license: https://github.com/primer/octicons/blob/v6.0.1/LICENSE
  // Website: https://octicons.github.com/
  var image = '<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="' + color + '" opacity="' + klippyOpacity + '"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" /></g></g></svg>';
  var binaryImage = window.btoa(image);
  var uriImage = 'data:image/svg+xml;base64,' + binaryImage;
  return uriImage;
}

function initKlippy(handSide, headSide, klippyColor, klippyOpacity, tooltipLabel, tooltipLabelSucceed) {
  document.addEventListener("DOMContentLoaded", function() {
    var image = getUriOcticonClippy(klippyColor, klippyOpacity);
    var klippyButton = "<button type='button' class='btn-klippy tooltipped tooltipped-no-delay' aria-label='" + tooltipLabel + "' onfocusout='changeTooltipMessage(this,&quot;" + tooltipLabel + "&quot;)' data-clipboard-klippy><div><img class='octicon' src='"+image+"' alt='Copy'></div></button>";

    // Insert klippy buttons:
    var codeNodeList = document.querySelectorAll(".klippy > code");
    for (var i = 0; i < codeNodeList.length; i += 1) {
      codeNodeList.item(i).insertAdjacentHTML('beforebegin', klippyButton);
    }

    // Auto-size:
    var klippiesCollection = document.getElementsByClassName("btn-klippy");

    function autoSize(klippy) {
      var klippyParent = klippy.parentElement;
      var paddingParent = window.getComputedStyle(klippyParent).getPropertyValue('padding-' + handSide);
      var icon = klippy.querySelector('.octicon');
      icon.style.width = paddingParent;
      icon.style.verticalAlign = headSide;
      if (handSide === 'right') {
        klippy.style.right = '0';
        klippy.className += ' tooltipped-w';
      } else {
        klippy.style.left = '0';
        klippy.className += ' tooltipped-e';
      }
      if (headSide === 'bottom') {
        klippy.style.bottom = '0';
      } else {
        klippy.style.top = '0';
      }
    }

    Array.prototype.map.call(klippiesCollection, autoSize);

    // Initialize clipboard:
    var clipboardKlippies=new Clipboard('[data-clipboard-klippy]',{
      text: function(trigger) {
        return trigger.parentNode.querySelector("code").textContent;
      }
    });

    clipboardKlippies.on('success', function(e) {
      changeTooltipMessage(e.trigger, tooltipLabelSucceed);
      e.clearSelection();
    });

    clipboardKlippies.on('error', function() {
      changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
    });
  });
}

function addKlippy(handSide, headSide, klippyColor, klippyOpacity, tooltipLabel, tooltipLabelSucceed) {
  if(Clipboard.isSupported()) initKlippy(handSide, headSide, klippyColor, klippyOpacity, tooltipLabel, tooltipLabelSucceed);
}
