require("./styles/main.scss");
var flowtype = require('flowtype');
var Remarkable = require('remarkable');
var hljs = require('highlight.js');

// Wait for DOM content to load

document.addEventListener("DOMContentLoaded", function(event) {
  var markdownViewer = document.getElementById('view');

  if (!markdownViewer) {
    return;
  }

  // Now just to set up markdownParser.set
  var markdownParser = new Remarkable({
    breaks: true,
    typographer: true,
    // This highlights languages
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    },
  });

  flowtype(markdownViewer, {
    maxWidth: '800px',
    minWidth: '300px',
    lineRatio: 1.45,
    min: 14,
    max: 22
  });


  // Set some props from the data we just received from SN.
  // This is where we output the message onto html I think.
  window.addEventListener("message", function(event){
    window.noteText = event.data.text || "";
    window.noteId = event.data.id;
    markdownViewer.innerHTML = markdownParser.render(window.noteText);
  }, false);

  // postMessage is how we communicate with Standard Notes
  if (window.parent != window) {
    window.parent.postMessage({status: 'ready'}, '*');
  };

});





