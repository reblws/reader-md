require("./styles/main.scss");
import flowtype from 'flowtype';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';

// Wait for DOM content to load

document.addEventListener("DOMContentLoaded", function(event) {

  console.log("DOM Content loaded");

  const markdownViewer = document.getElementById('markdownViewer');
  if (!markdownViewer) {
    return;
  }

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

  // Now just to set up markdownParser.set
  const markdownParser = new Remarkable({
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
    maxWidth: '850px',
    minWidth: '300px',
    lineRatio: 1.45,
    min: 14,
    max: 21

  });


  markdownViewer.innerHTML = markdownParser.render(window.noteText);
  console.log(window)
});





