function playNote(note) {
  const i = document.getElementById(note);
  i.currentTime = 0;
  i.play();
}
