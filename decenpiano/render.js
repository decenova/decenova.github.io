$(document).ready(function() {
  renderAudio();
  renderKeyboard();
  renderDisplayKeyboard();
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
  const keyboardContainer = $(`<div class="keyboard-container" />`);
  pianoKey.forEach((item, index) => {
    const white = item[1] != "#";
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

function renderDisplayKeyboard() {
  const displayKeyboard = $("#display_keyboard");
  const leftKey = $("#left_key");
  const homeArrowKey = $("#home_arrow_key");
  const numpadKey = $("#numpad_key");
  const numKey = $("#num_key");
  const signKey = $("#sign_key");
  let i = 0;
  let div;
  for (i = 1; i <= 5; i++) {
    div = $("<div></div>");
    keyboardData[i].forEach((item, index) => {
      let disable = item.length >= 3 && item[2] === false;
      let noteName = keyboardDataNote.get(item[0]);
      div.append(
        `<button class="button-reset display__keyboard__button display__keyboard__button_${item[0]}" 
            ${disable ? "disabled" : ""} 
            id="keyboard${item[0]}"
          >
          <span>${noteName?noteName:item[1]}</span>
          <span>${item[1]}</span>
        </button>`
      );
    });
    leftKey.append(div);
  }
  i = 6;
  div = $("<div></div>");
  keyboardData[i].forEach((item, index) => {
    if (item[0] === null) {
      div.append(
        `<button class="button-reset display__keyboard__button display__keyboard__button-hiden" disabled}></button>`
      );
    } else {
      let disable = item.length >= 3 && item[2] === false;
      div.append(
        `<button class="button-reset display__keyboard__button display__keyboard__button_${item[0]}" 
            ${disable ? "disabled" : ""} 
            id="keyboard${item[0]}"
          >
          <span>${keyboardDataNote.get(item[0])}</span>
          <span>${item[1]}</span>
        </button>`
      );
    }
  });
  homeArrowKey.append(div);

  i = 7;
  div = $("<div></div>");
  keyboardData[i].forEach((item, index) => {
    let disable = item.length >= 3 && item[2] === false;
    div.append(
      `<button class="button-reset display__keyboard__button display__keyboard__button_${item[0]}" 
            ${disable ? "disabled" : ""} 
            id="keyboard${item[0]}"
          >
          <span>${keyboardDataNote.get(item[0])}</span>
          <span>${item[1]}</span>
        </button>`
    );
  });
  numKey.append(div);

  i = 8;
  div = $("<div></div>");
  keyboardData[i].forEach((item, index) => {
    let disable = item.length >= 3 && item[2] === false;
    div.append(
      `<button class="button-reset display__keyboard__button display__keyboard__button_${item[0]}" 
            ${disable ? "disabled" : ""} 
            id="keyboard${item[0]}"
          >
          <span>${keyboardDataNote.get(item[0])}</span>
          <span>${item[1]}</span>
        </button>`
    );
  });
  signKey.append(div);
  // displayKeyboard.append(leftKey);
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
