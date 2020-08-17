document.getElementById("switch-color").addEventListener("click", colorSwitch);
window
  .matchMedia("(prefers-color-scheme: light)")
  .addListener((e) => e.matches && colorSwitch());
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener((e) => e.matches && colorSwitch());
if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  document.getElementById("logo-overlay").style.backgroundColor = "#f5f3ef";
} else {
  document.getElementById("logo-overlay").style.backgroundColor = "#161616";
}
function colorSwitch() {
  if (
    document.getElementById("logo-overlay").style.backgroundColor ==
    "rgb(245, 243, 239)"
  ) {
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#f5f3ef";
    document.getElementsByTagName("a")[0].style.color = "#bbbbbb";
    document.getElementsByTagName("hr")[0].style.backgroundColor = "#d1d3d4";
    document.getElementById("logo-overlay").style.backgroundColor = "#161616";
  } else if (
    document.getElementById("logo-overlay").style.backgroundColor ==
    "rgb(22, 22, 22)"
  ) {
    document.body.style.backgroundColor = "transparent";
    document.body.style.color = "#161616";
    document.getElementsByTagName("a")[0].style.color = "#444444";
    document.getElementsByTagName("hr")[0].style.backgroundColor = "#262626";
    document.getElementById("logo-overlay").style.backgroundColor = "#f5f3ef";
  }
}
