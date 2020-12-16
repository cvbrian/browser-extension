// Selectors here are madness, it works for as of Dec 4th 2019
// Button renders in popup/dialog view
clockifyButton.render(
  '.notion-peek-renderer:not(.clockify)',
  { observe: true },
  function (elem) {

    var link = clockifyButton.createButton(elem.querySelector('.notion-scroller .notion-selectable div[contenteditable="true"]').textContent.trim());
    // link.style.cursor = "pointer";
    link.style.fontSize = "12px";

    var wrapper = document.createElement('div');
    wrapper.classList.add('clockify-button-notion-wrapper');
    wrapper.appendChild(link);

    var root = elem.querySelector('div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)');
    if (root) {
      root.appendChild(wrapper);
    }
  }
);

// Button renders left of page title - hidden on popups with css
clockifyButton.render(
  '.notion-page-controls + div:not(.clockify)',
  { observe: true },
  function (elem) {
    function getDescription () {
      const descriptionElem = elem.querySelector('.notion-scroller .notion-selectable div[contenteditable="true"]');
      return descriptionElem ? descriptionElem.textContent.trim() : '';
    };

    function getProject () {
      return document.title;
    };
    console.log(getProject);

    const link = clockifyButton.createButton(getDescription, getProject);
    link.style.cursor = 'pointer';
    elem.style.position = 'relative';

    // var link = clockifyButton.createButton(elem.textContent.trim());
    //     link.style.cursor = "pointer";
        link.style.fontSize = "14px";
        link.style.fontWeight = "400";
        link.style.width = "134px";

    elem.appendChild(link);
  }
);