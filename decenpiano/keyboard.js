var holdingNote = new Map();
var timeOutId = null;
document.onkeydown = function(n) {
  var t = window.event ? n.keyCode : n.which;
  let note = data.get(t);
  if (note && !holdingNote.has(note)) {
    let id = null;
    if (n.shiftKey && notes.b.indexOf(note) != -1) {
      id = pianoNote[1][notes.b.indexOf(note)].replace("#", "s");
      holdingNote.set(note, id);
      playNote("b" + note);
    } else {
      id = pianoNote[0][notes.a.indexOf(note)].replace("#", "s");
      holdingNote.set(note, id);
      playNote("a" + note);
    }
    $(`#key-${id}`).addClass("pressed");
    $(`#keyboard${t}`).addClass("pressed");
    $(`#display__title__note`).removeClass('off').addClass("show");
  }
};
document.onkeyup = function(n) {
  var t = window.event ? n.keyCode : n.which;
  let note = data.get(t);
  if (note && holdingNote.has(note)) {
    $(`#key-${holdingNote.get(note)}`).removeClass("pressed");
    $(`#keyboard${t}`).removeClass("pressed");
    holdingNote.delete(note);
  }
  if (holdingNote.size <= 0)
    $(`#display__title__note`).removeClass("show").addClass('off');
};

function onKeyClick(item, id, isWhite) {
  if (isWhite) {
    playNote("a" + notes.a[pianoNote[0].indexOf(item)]);
  } else {
    playNote("b" + notes.b[pianoNote[1].indexOf(item)]);
  }
  $(`#key-${id}`).addClass("pressed");
  $(`#display__title__note`).removeClass('off').addClass("show");
  clearTimeout(timeOutId);
  setTimeout(() => {
    $(`#key-${id}`).removeClass("pressed");
  }, 1000);
  timeOutId = setTimeout(() => {
    $(`#display__title__note`).removeClass("show").addClass('off');
  }, 1000);
}
