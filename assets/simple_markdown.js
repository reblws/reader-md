document.addEventListener("DOMContentLoaded", function(event) {

  var simpleMarkdown = document.getElementById("simple-markdown");
  if(!simpleMarkdown) {
    return;
  }

  var preview = document.getElementById("preview");

  // Load the notes
  window.addEventListener("message", function(event){
    window.noteText = event.data.text || "";
    window.noteId = event.data.id;
    preview.innerHTML = md.render(window.noteText);
  }, false);


  // // Listen for keystrokes
  // editor.addEventListener('keydown', function(event){
  //   if (!event.shiftKey && event.which == 9) {
  //     event.preventDefault();
  //     var start = this.selectionStart;
  //     var end = this.selectionEnd;
  //     var spaces = "    ";

  //     // Insert 4 spaces
  //     this.value = this.value.substring(0, start) + spaces + this.value.substring(end);

  //     // Place cursor 4 spaces away from where
  //     // the tab key was pressed
  //     this.selectionStart = this.selectionEnd = start + 4;
  //   }
  // }); 

  if(window.parent != window) {
    window.parent.postMessage({status: "ready"}, '*');
  }

  window.md = window.markdownit({
    highlight: function (str, lang) {
       if (lang && hljs.getLanguage(lang)) {
         try {
           return hljs.highlight(lang, str).value;
         } catch (__) {}
       }

       return '';
     }
  }).use(window.markdownitFootnote);

  updatePreviewText();

  // Render markdown here, should probably remove this
  function updatePreviewText() {
    var text = preview.html || "";
    preview.innerHTML = md.render(text);
    return text;
  }

  var pressed = false;
  
  function removeSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }

});
