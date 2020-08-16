document.getElementById("switch-color").addEventListener("click", colorSwitch);
let swap;
if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  swap = 1;
  document.getElementById("logo").src = "assets/light-logo.png";
} else {
  swap = 0;
  document.getElementById("logo").src = "assets/dark-logo.png";
}
function colorSwitch() {
  if (swap == 1) {
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#f5f3ef";
    document.getElementsByTagName("a")[0].style.color = "#999999";
    document.getElementById("logo").src = "assets/dark-logo.png";
    swap = 0;
  } else if (swap == 0) {
    document.body.style.backgroundColor = "transparent";
    document.body.style.color = "#262626";
    document.getElementsByTagName("a")[0].style.color = "#666666";
    document.getElementById("logo").src = "assets/light-logo.png";
    swap = 1;
  }
}
