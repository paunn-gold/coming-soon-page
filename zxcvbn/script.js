window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const isNumberInRange = (progress, number) => {
  const multiples = [
    0,
    number * 1,
    number * 2,
    number * 3,
    number * 4,
    number * 5,
  ];
  for (let i = 0; i < multiples.length; i++) {
    if (Math.abs(progress - multiples[i]) <= 2.5) {
      return true;
    }
  }
  return false;
};

const container = document.querySelector(".scroll-container");
container.addEventListener("scroll", () => {
  update();
});

window.addEventListener("resize", () => {
  update();
});

const frame = document.querySelector(".frame-element");
const text = document.querySelector(".text-element");
const scrollAreas = document.querySelectorAll(".scroll-area");
const footerContainer = document.querySelector(".footer-container");
const frameLocation = document.querySelector(".location");

const update = () => {
  const elementHeight = document.querySelector(".scroll-area").clientHeight;
  const containerHeight = container.scrollHeight - elementHeight;
  const ratio = 100 / containerHeight;

  const progress = container.scrollTop * ratio;

  document.querySelector(".debug").innerHTML = Math.round(progress);
  document.querySelector(
    ".resolution"
  ).innerHTML = `${window.innerWidth} x ${window.innerHeight}`;

  // container.style.transform = `translateY(${container.scrollTop * 0.5}px)`; // parallax-effect

  let orientation =
    window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  let deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  let number, deviceType;
  if (
    (deviceWidth <= 480 && orientation == "portrait") ||
    (deviceWidth <= 840 && orientation == "landscape")
  ) {
    number = 17;
    deviceType = "mobile";
  } else if (
    (deviceWidth <= 960 && deviceWidth > 480 && orientation == "portrait") ||
    (deviceWidth <= 1200 && deviceWidth > 840 && orientation == "landscape")
  ) {
    number = 18;
    deviceType = "tablet";
  } else {
    number = 18;
    deviceType = "dektop";
  }

  if (isNumberInRange(progress, number)) {
    let logoWidth,
      textSize,
      footerSize,
      locationSize,
      letterSpacing,
      scrollAreaMargin;
    let framePosition = Math.round(progress / 18),
      top = [],
      left = [],
      side = [],
      opacity = [],
      textContent = [],
      frameBorderRadius = [],
      frameBackgroundColor = [];
    if (deviceType == "mobile") {
      // mobile
      scrollAreaMargin = "100px";
      logoWidth = "250px";
      textSize = "32px";
      footerSize = "13px";
      locationSize = "20px";
      letterSpacing = "5px";
      top = [
        "calc(50vh - 60px)",
        "calc(50vh - 18px)",
        "calc(50vh - 90px)",
        "calc(50vh + 30px)",
        "calc(50vh - 19px)",
        "calc(50vh - 19px)",
      ];
      left = [
        "calc(50% - 89px)",
        "calc(50% + 29px)",
        "calc(50% - 157px)",
        "calc(50% - 89px)",
        "calc(50% + 60px)",
        "calc(50% + 60px)",
      ];
      side = ["113px", "40px", "40px", "40px", "40px", "40px"];
      frameBorderRadius = ["5px", "2px", "2px", "2px", "2px", "2px"];
    } else if (deviceType == "tablet") {
      // tablet - done
      scrollAreaMargin = "200px";
      logoWidth = "425px";
      textSize = "40px";
      footerSize = "16px";
      locationSize = "32px";
      letterSpacing = "7px";
      top = [
        "calc(50vh - 90px)",
        "calc(50vh - 22px)",
        "calc(50vh - 83px)",
        "calc(50vh + 38px)",
        "calc(50vh - 25px)",
        "calc(50vh - 25px)",
      ];
      left = [
        "calc(50% - 145px)",
        "calc(50% + 35px)",
        "calc(50% - 192px)",
        "calc(50% - 108px)",
        "calc(50% + 73px)",
        "calc(50% + 73px)",
      ];
      side = ["185px", "50px", "50px", "50px", "50px", "50px"];
      frameBorderRadius = ["10px", "3px", "3px", "3px", "3px", "3px"];
    } else {
      // desktop - done
      scrollAreaMargin = "300px";
      logoWidth = "675px";
      textSize = "48px";
      footerSize = "19px";
      locationSize = "48px";
      letterSpacing = "10px";
      top = [
        "calc(50vh - 150px)",
        "calc(50vh - 27px)",
        "calc(50vh - 100px)",
        "calc(50vh + 45px)",
        "calc(50vh - 30px)",
        "calc(50vh - 30px)",
      ];
      left = [
        "calc(50% - 235px)",
        "calc(50% + 42px)",
        "calc(50% - 227px)",
        "calc(50% - 129px)",
        "calc(50% + 87px)",
        "calc(50% + 87px)",
      ];
      side = ["300px", "60px", "60px", "60px", "60px", "60px"];
      frameBorderRadius = ["15px", "5px", "5px", "5px", "5px", "5px"];
    }
    opacity = [1, 1, 1, 1, 1, 0];
    textContent = [
      '<span><img class="logo" src="assets/paunn-logo.png" alt="logo" style="width:' +
        logoWidth +
        ';"></span>',
      "<span>WE ARE PAuNN</span>",
      "<span>PAuNN SPECIALISES IN<br>ETHICALLY PRODUCED<br>HANDCRAFTED JEWELLERY</span>",
      "<span>WE CARE ABOUT<br>BRINGING VALUE AND<br>BEAuTY TO YOU</span>",
      "<span>OWN YOUR PAuNN</span>",
      "",
    ];
    frameBackgroundColor = [
      "#fff",
      "#cfa355",
      "#cfa355",
      "#cfa355",
      "#cfa355",
      "#cfa355",
    ];
    scrollAreas.forEach((scrollArea) => {
      scrollArea.style.marginBottom = scrollAreaMargin;
    });
    footerContainer.style.fontSize = footerSize;
    frame.style.top = top[framePosition];
    frame.style.left = left[framePosition];
    frame.style.height = side[framePosition];
    frame.style.width = side[framePosition];
    frame.style.opacity = opacity[framePosition];
    frame.style.borderRadius = frameBorderRadius[framePosition];
    frame.style.backgroundColor = frameBackgroundColor[framePosition];
    text.style.opacity = opacity[framePosition];
    text.innerHTML = textContent[framePosition];
    text.style.fontSize = textSize;
    frameLocation.style.fontSize = locationSize;
    frameLocation.style.letterSpacing = letterSpacing;
    frameLocation.style.paddingLeft = letterSpacing;
  } else {
    frame.style.opacity = 0;
    text.style.opacity = 0;
  }
};

update();
