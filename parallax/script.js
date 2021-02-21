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
    if (Math.abs(progress - multiples[i]) <= 5) {
      return true;
    }
  }
  return false;
};

const isElementVisible = (el) => {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  };

  const bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight,
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
};

const scriptURL =
  "https://script.google.com/macros/s/AKfycbx3N-Zic_niuRPruIaQv5hUUV-BjdhgBUXrkIt8uBgy0IJky6t5xDc7KQ/exec";
const form = document.forms["submit-to-google-sheet"];
const emailStatus = document.querySelector(".email-status");

const container = document.querySelector(".scroll-container");
container.addEventListener("scroll", () => {
  update();
});

window.addEventListener("resize", () => {
  update();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      emailStatus.innerHTML = "Done! You will receive an email very shortly!";
    })
    .catch((error) => {
      console.error("Error!", error.message);
      emailStatus.innerHTML = "Something went wrong! Try again later";
    });
});

let userLanguage = navigator.language || navigator.userLanguage;
let de = document.querySelector(".de");
let en = document.querySelector(".en");
let html = document.querySelector("html");
let language;

if (userLanguage == "de") {
  language = "german";
  html.lang = "de";
  de.classList.add("active");
  en.classList.remove("active");
} else if (userLanguage != "de") {
  language = "english";
  html.lang = "en";
  de.classList.remove("active");
  en.classList.add("active");
}

de.addEventListener("click", function () {
  language = "german";
  html.lang = "de";
  de.classList.add("active");
  en.classList.remove("active");
  update();
});

en.addEventListener("click", function () {
  language = "english";
  html.lang = "en";
  de.classList.remove("active");
  en.classList.add("active");
  update();
});

const frame = document.querySelector(".frame-element");
const text = document.querySelector(".text-element");
const scrollSections = document.querySelectorAll(".scroll-section");
const footerContainer = document.querySelector(".footer-container");
const frameLocation = document.querySelector(".location");
const languageToggle = document.querySelector(".language-toggle");
// const footerBottom = document.querySelector(".ft-legal");
const footerTitles = document.querySelectorAll(".ft-title");
const quizContainer = document.querySelector(".quiz-container");
const footerForm = document.querySelector(".ft-form");

const update = () => {
  const elementHeight = document.querySelector(".scroll-area div").clientHeight;
  const containerHeight = container.scrollHeight - elementHeight;
  const ratio = 100 / containerHeight;

  const progress = container.scrollTop * ratio;

  let address = document.querySelector(".address");

  // document.querySelector(".progress").innerHTML = Math.round(progress);
  // document.querySelector(
  //   ".resolution"
  // ).innerHTML = `${window.innerWidth} x ${window.innerHeight}`;

  let orientation =
    window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  let deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  let number, deviceType, parallaxMultiplier;
  if (
    (deviceWidth <= 480 && orientation == "portrait") ||
    (deviceWidth <= 840 && orientation == "landscape")
  ) {
    number = 17;
    deviceType = "mobile";
    parallaxMultiplier = 100;
  } else if (
    (deviceWidth <= 960 && deviceWidth > 480 && orientation == "portrait") ||
    (deviceWidth <= 1200 && deviceWidth > 840 && orientation == "landscape")
  ) {
    number = 18;
    deviceType = "tablet";
    parallaxMultiplier = 100;
  } else {
    number = 18;
    deviceType = "dektop";
    parallaxMultiplier = 300;
  }

  for (let i = 0; i < 6; i++) {
    if (isElementVisible(scrollSections[i])) {
      scrollSections[i].style.backgroundPositionY =
        (scrollSections[i].getBoundingClientRect().top / elementHeight) *
          parallaxMultiplier +
        "px";
    }
  }

  if (isNumberInRange(progress, number)) {
    let logoWidth,
      textSize,
      footerSize,
      locationSize,
      locationText,
      letterSpacing,
      fontWeight,
      // imageScaling,
      quizFontSize,
      footerFormFontSize,
      languageToggleSize,
      footerTitleSize,
      languageToggleMarginRight,
      // footerMarginBottom,
      scrollAreaMargin;
    let framePosition = Math.round(progress / 18),
      top = [],
      left = [],
      side = [],
      contentText = [],
      frameBorderRadius = [],
      frameBackgroundColor = [],
      locationOpacity = [],
      addressText;
    if (deviceType == "mobile") {
      // mobile - done
      if (language == "english") {
        top = [
          "calc(50vh - 60px)",
          "calc(50vh - 15px)",
          "calc(50vh - 50px)",
          "calc(50vh + 20px)",
          "calc(50vh - 15px)",
          "calc(50vh - 15px)",
        ];
        left = [
          "calc(50% - 89px)",
          "calc(50% + 22px)",
          "calc(50% - 123px)",
          "calc(50% - 69px)",
          "calc(50% + 45px)",
          "calc(50% + 45px)",
        ];
      } else if ((language = "german")) {
        top = [
          "calc(50vh - 60px)",
          "calc(50vh - 15px)",
          "calc(50vh - 68px)",
          "calc(50vh - 50px)",
          "calc(50vh - 33px)",
          "calc(50vh - 33px)",
        ];
        left = [
          "calc(50% - 89px)",
          "calc(50% + 79px)",
          "calc(50% + 118px)",
          "calc(50% + 101px)",
          "calc(50% + 83px)",
          "calc(50% + 83px)",
        ];
      }
      scrollAreaMargin = "150px";
      logoWidth = "250px";
      textSize = "24px";
      footerSize = "13px";
      locationSize = "20px";
      letterSpacing = "5px";
      fontWeight = "200";
      quizFontSize = "20px";
      footerTitleSize = "15px";
      footerFormFontSize = "12px";
      // imageScaling = "scaleY(1)";
      languageToggleSize = "16px";
      languageToggleMarginRight = "5px";
      // footerMarginBottom = "100px";
      side = ["113px", "32px", "32px", "32px", "32px", "0px"];
      frameBorderRadius = ["5px", "2px", "2px", "2px", "2px", "2px"];
    } else if (deviceType == "tablet") {
      // tablet - done
      if (language == "english") {
        top = [
          "calc(50vh - 90px)",
          "calc(50vh - 24px)",
          "calc(50vh - 83px)",
          "calc(50vh + 36px)",
          "calc(50vh - 23px)",
          "calc(50vh - 23px)",
        ];
        left = [
          "calc(50% - 145px)",
          "calc(50% + 35px)",
          "calc(50% - 192px)",
          "calc(50% - 109px)",
          "calc(50% + 73px)",
          "calc(50% + 73px)",
        ];
      } else if (language == "german") {
        top = [
          "calc(50vh - 90px)",
          "calc(50vh - 25px)",
          "calc(50vh - 83px)",
          "calc(50vh - 54px)",
          "calc(50vh - 55px)",
          "calc(50vh - 55px)",
        ];
        left = [
          "calc(50% - 145px)",
          "calc(50% + 125px)",
          "calc(50% + 187px)",
          "calc(50% + 158px)",
          "calc(50% + 132px)",
          "calc(50% + 132px)",
        ];
      }
      scrollAreaMargin = "200px";
      logoWidth = "425px";
      textSize = "40px";
      footerSize = "16px";
      locationSize = "32px";
      letterSpacing = "7px";
      fontWeight = "200";
      quizFontSize = "30px";
      footerTitleSize = "18px";
      footerFormFontSize = "14px";
      // imageScaling = "scaleY(1)";
      languageToggleSize = "16px";
      languageToggleMarginRight = "10px";
      // footerMarginBottom = "75px";
      side = ["185px", "52px", "52px", "52px", "52px", "0px"];
      frameBorderRadius = ["10px", "3px", "3px", "3px", "3px", "3px"];
    } else {
      // desktop - done
      if (language == "english") {
        top = [
          "calc(50vh - 150px)",
          "calc(50vh - 30px)",
          "calc(50vh - 100px)",
          "calc(50vh + 45px)",
          "calc(50vh - 30px)",
          "calc(50vh - 30px)",
        ];
        left = [
          "calc(50% - 235px)",
          "calc(50% + 41px)",
          "calc(50% - 227px)",
          "calc(50% - 129px)",
          "calc(50% + 87px)",
          "calc(50% + 87px)",
        ];
      } else if (language == "german") {
        top = [
          "calc(50vh - 150px)",
          "calc(50vh - 29px)",
          "calc(50vh - 102px)",
          "calc(50vh - 30px)",
          "calc(50vh - 65px)",
          "calc(50vh - 65px)",
        ];
        left = [
          "calc(50% - 235px)",
          "calc(50% + 148px)",
          "calc(50% - 248px)",
          "calc(50% + 229px)",
          "calc(50% + 155px)",
          "calc(50% + 155px)",
        ];
      }
      scrollAreaMargin = "250px";
      logoWidth = "675px";
      textSize = "48px";
      footerSize = "19px";
      locationSize = "48px";
      letterSpacing = "10px";
      fontWeight = "100";
      quizFontSize = "32px";
      footerTitleSize = "21px";
      footerFormFontSize = "16px";
      // imageScaling = "scaleY(1)";
      languageToggleSize = "20px";
      languageToggleMarginRight = "15px";
      // footerMarginBottom = "0px";
      side = ["300px", "62px", "62px", "62px", "62px", "0px"];
      frameBorderRadius = ["15px", "5px", "5px", "5px", "5px", "5px"];
    }
    if (language == "english") {
      addressText = '<a href="#">Landsbergerstrasse 196<br />80687 Munich</a>';
      contentText = [
        '<span><img class="logo" src="assets/paunn-logo.png" alt="logo" style="width:' +
          logoWidth +
          ';"></span>',
        "<span>WE ARE PAuNN</span>",
        "<span>PAuNN SPECIALISES IN<br>ETHICALLY PRODUCED<br>HANDCRAFTED JEWELLERY</span>",
        "<span>WE CARE ABOUT<br>BRINGING VALUE AND<br>BEAuTY TO YOU</span>",
        "<span>OWN YOUR PAuNN</span>",
        "",
      ];
    } else if (language == "german") {
      addressText = '<a href="#">Landsbergerstraße 196<br/>80687 München<a/>';
      contentText = [
        '<span><img class="logo" src="assets/paunn-logo.png" alt="logo" style="width:' +
          logoWidth +
          ';"></span>',
        "<span>WILLKOMMEN BEI PAuNN<span/>",
        "<span>PAuNN IST AUF ETHISCH<br>KORREKTE UND HANDGEFERTIGTE<br>SCHMUCKSTÜCKE SPEZIALISIERT<span/>",
        "<span>WIR MÖCHTEN, DASS DU DICH<br>BEI UNS GESCHÄTZT UND AuCH<br>WOHL FÜHLST<span/>",
        "<span>HALTE DEIN EIGENES PAuNN IN<br>DEINEN HÄNDEN<span/>",
        "",
      ];
    }
    frameBackgroundColor = [
      "#fff",
      "#cfa355",
      "#cfa355",
      "#cfa355",
      "#cfa355",
      "#cfa355",
    ];
    locationOpacity = [1, 0, 0, 0, 0, 0];
    scrollSections.forEach((scrollArea) => {
      // scrollArea.style.marginBottom = scrollAreaMargin;
      // scrollArea.style.transform = imageScaling;
    });
    footerContainer.style.fontSize = footerSize;
    footerForm.style.fontSize = footerFormFontSize;
    frame.style.top = top[framePosition];
    frame.style.left = left[framePosition];
    frame.style.height = side[framePosition];
    frame.style.width = side[framePosition];
    frame.style.borderRadius = frameBorderRadius[framePosition];
    frame.style.backgroundColor = frameBackgroundColor[framePosition];
    text.innerHTML = contentText[framePosition];
    text.style.fontSize = textSize;
    text.style.fontWeight = fontWeight;
    address.innerHTML = addressText;
    frameLocation.style.fontSize = locationSize;
    frameLocation.style.letterSpacing = letterSpacing;
    frameLocation.style.paddingLeft = letterSpacing;
    frameLocation.innerHTML = "munich";
    frameLocation.style.opacity = locationOpacity[framePosition];
    frame.style.opacity = 1;
    text.style.opacity = 1;
    languageToggle.style.fontSize = languageToggleSize;
    languageToggle.style.marginRight = languageToggleMarginRight;
    // footerBottom.style.marginBottom = footerMarginBottom;
    quizContainer.style.fontSize = quizFontSize;
    footerTitles.forEach((footerTitle) => {
      footerTitle.style.fontSize = footerTitleSize;
    });
  } else {
    frame.style.opacity = 0;
    text.style.opacity = 0;
    frameLocation.style.opacity = 0;
  }
};

update();
