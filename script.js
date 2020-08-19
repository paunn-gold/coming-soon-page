document.getElementById("switch-color").addEventListener("click", colorSwitch);
window.matchMedia("(prefers-color-scheme: light)").addListener(function (e) {
  document.body.removeAttribute("style");
  document.getElementsByTagName("a")[0].removeAttribute("style");
  document.getElementsByTagName("hr")[0].removeAttribute("style");
  document.getElementById("logo-overlay").removeAttribute("style");
  return e.matches;
});
window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
  document.body.removeAttribute("style");
  document.getElementsByTagName("a")[0].removeAttribute("style");
  document.getElementsByTagName("hr")[0].removeAttribute("style");
  document.getElementById("logo-overlay").removeAttribute("style");
  return e.matches;
});
function colorSwitch() {
  if (
    window
      .getComputedStyle(document.body, null)
      .getPropertyValue("background-color") == "rgb(255, 255, 255)"
  ) {
    document.body.style.backgroundColor = "rgb(0, 0, 0)"; //#000000
    document.body.style.color = "rgb(245, 243, 239)"; //#f5f3ef
    document.getElementsByTagName("a")[0].style.color = "rgb(187, 187, 187)"; //#bbbbbb
    document.getElementsByTagName("hr")[0].style.backgroundColor =
      "rgb(209, 211, 212)"; //#d1d3d4
    document.getElementById("logo-overlay").style.backgroundColor =
      "rgb(22, 22, 22)"; //#161616
  } else if (
    window
      .getComputedStyle(document.body, null)
      .getPropertyValue("background-color") == "rgb(0, 0, 0)"
  ) {
    document.body.style.backgroundColor = "rgb(255, 255, 255)"; //#ffffff
    document.body.style.color = "rgb(22, 22, 22)"; //#161616
    document.getElementsByTagName("a")[0].style.color = "rgb(68, 68, 68)"; //#444444
    document.getElementsByTagName("hr")[0].style.backgroundColor =
      "rgb(38, 38, 38)"; //#262626
    document.getElementById("logo-overlay").style.backgroundColor =
      "rgb(245, 243, 239)"; //#f5f3ef
  }
}
