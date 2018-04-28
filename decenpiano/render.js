$(document).ready(function() {
  renderAudio();
  renderKeyboard();
  // renderInput();
  // document.addEventListener("keyup", n => {
  //   var t = window.event ? n.keyCode : n.which;
  //   console.log(t);
  // });
});
function renderAudio() {
  const audioTag = $("#audio");
  notes.a.forEach((element, index) => {
    notePlayer = document.createElement("audio");
    notePlayer.id = "a" + element;
    notePlayer.canPlayType("audio/mpeg;")
      ? ((notePlayer.type = "audio/mpeg"),
        (notePlayer.src = "notes\\" + notePlayer.id + ".mp3"))
      : ((notePlayer.type = "audio/mpeg"),
        (notePlayer.src = "notes\\" + notePlayer.id + ".ogg"));
    audioTag.append(notePlayer);
  });
  notes.b.forEach((element, index) => {
    notePlayer = document.createElement("audio");
    notePlayer.id = "b" + element;
    notePlayer.canPlayType("audio/mpeg;")
      ? ((notePlayer.type = "audio/mpeg"),
        (notePlayer.src = "notes\\" + notePlayer.id + ".mp3"))
      : ((notePlayer.type = "audio/mpeg"),
        (notePlayer.src = "notes\\" + notePlayer.id + ".ogg"));
    audioTag.append(notePlayer);
  });
}
function renderKeyboard() {
  const keyboardTag = $("#keyboard");
  const keyboardContainer = $(`<div class="keyboard-container" />`)
  pianoKey.forEach((item, index) => {
    const white = (item[1] != '#');
    const className = white ? "white" : "black";
    const i = item.replace("#", "s");
    keyboardContainer.append(
      `<div class="keyboard-container-${className}">
        <div class="button-reset keyboard__button keyboard-button-${className}" 
          id="key-${i}" 
          onmousedown="onKeyClick('${item}','${i}',${white})"
        >
          <p>${item}</p>
        </div>
      </div>`
    );
  });
  keyboardTag.append(keyboardContainer);
}

// function renderInput() {
//   const inputTag = $("#input");
//   pianoNote.forEach((array, index) => {
//     array.forEach((element, i) => {
//       let maxColumn = (index == 0) ? 7 : 5;
//       (i % maxColumn == 0) ? inputTag.append("<br />"):"";
//       inputTag.append(`<button onclick="saveKey(${index},${i})">${element}</button>`);
//     })
//   });
//   inputTag.append(`<br /><br /><button onclick="saveKey(-1,-1)">Stop setting</button>`);
// }
// function saveKey(type,position){
//   settingNote = {type, position};
//   if (type < 0) return;
//   console.log(pianoNote[type][position]);
// }