const flowtype = require('flowtype-js');
const Remarkable = require('remarkable');
const hljs = require('highlight.js');

// Wait for DOM content to load

document.addEventListener("DOMContentLoaded", function(event) {

  console.log("DOM Content loaded");

  const markdownViewer = document.getElementById('markdownViewer');

  if (!markdownViewer) {
    return;
  }

  // Now just to set up markdownParser.set
  const markdownParser = new Remarkable({
    html: true,
    breaks: true,
    typographer: true,
    quotes: '“”‘’',
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

  // postMessage is how we communicate with Standard Notes
  if (window.parent != window) {
    window.parent.postMessage({status: 'ready'}, '*');
  };

  // Set some props from the data we just received from SN.
  // This is where we output the message onto html I think.
  window.addEventListener("message", function(event){    
    window.noteText = event.data.text || "";
    window.noteId = event.data.id;
    markdownViewer.innerHTML = markdownParser.render(window.noteText);
  }, false);

  flowtype(markdownViewer, {
      minimum   : 500,
      maximum   : 900,
      minFont   : 12,
      maxFont   : 40,
      fontRatio : 30
    });
});





