function convertTime(seconds) {
  if (seconds < 0) {
    document.querySelector("audio").play();
    setTimeout(function() {
      document.querySelector("audio").play();
    }, 2000);
    return "00:00";
  }

  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  if (seconds < 10) seconds = `0${seconds}`;

  return `${minutes}:${seconds}`;
}
