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

const container = document.querySelector(".scroll-container");
container.addEventListener("scroll", () => {
  update();
});

window.addEventListener("resize", () => {
  update();
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
const scrollAreas = document.querySelectorAll(".scroll-area");
const footerContainer = document.querySelector(".footer-container");
const frameLocation = document.querySelector(".location");
const languageToggle = document.querySelector(".language-toggle");
const footerBottom = document.querySelector(".ft-legal");

const update = () => {
  const elementHeight = document.querySelector(".scroll-area").clientHeight;
  const containerHeight = container.scrollHeight - elementHeight;
  const ratio = 100 / containerHeight;

  const progress = container.scrollTop * ratio;

  let address = document.querySelector(".address");

  document.querySelector(".progress").innerHTML = Math.round(progress);
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
    parallaxMultiplier = 80;
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
    parallaxMultiplier = 120;
  }

  // console.log(
  //   scrollAreas[0].getBoundingClientRect().top,
  //   elementHeight
  // );

  for (let i = 0; i < 6; i++) {
    if (isElementVisible(scrollAreas[i])) {
      scrollAreas[i].style.backgroundPositionY =
        (scrollAreas[i].getBoundingClientRect().top / elementHeight) *
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
      languageToggleSize,
      languageToggleMarginRight,
      footerMarginBottom,
      scrollAreaMargin;
    let framePosition = Math.round(progress / 18),
      top = [],
      left = [],
      side = [],
      contentText = [],
      frameBorderRadius = [],
      frameBackgroundColor = [],
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
      // imageScaling = "scaleY(1)";
      languageToggleSize = "16px";
      languageToggleMarginRight = "0px";
      footerMarginBottom = "75px";
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
      // imageScaling = "scaleY(1)";
      languageToggleSize = "16px";
      languageToggleMarginRight = "0px";
      footerMarginBottom = "75px";
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
          "calc(50vh - 102px)",
          "calc(50vh - 65px)",
          "calc(50vh - 65px)",
        ];
        left = [
          "calc(50% - 235px)",
          "calc(50% + 148px)",
          "calc(50% + 222px)",
          "calc(50% + 187px)",
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
      // imageScaling = "scaleY(1)";
      languageToggleSize = "20px";
      languageToggleMarginRight = "10px";
      footerMarginBottom = "0px";
      side = ["300px", "62px", "62px", "62px", "62px", "0px"];
      frameBorderRadius = ["15px", "5px", "5px", "5px", "5px", "5px"];
    }
    if (language == "english") {
      locationText = "munich";
      addressText = '<a href="#">Landsbergerstrasse 196<br />80687 Munich</a>';
      contentText = [
        '<span><img class="logo" src="assets/paunn-logo.png" alt="logo" style="width:' +
          logoWidth +
          ';"></span>',
        "<span>WE ARE PAuNN</span>",
        "<span>PAuNN SPECIALISES IN<br>ETHICALLY PRODUCED<br>HANDCRAFTED JEWELLERY</span>",
        "<span>WE CARE ABOUT<br>BRINGING VALUE AND<br>BEAuTY TO YOU</span>",
        "<span>OWN YOUR PAuNN</span>",
        "<div><div style='font-size:28px;height:20vh'>HOW MANY TIMES DID Au APPEAR IN THIS PAGE?<label><input type='radio' value='3' id='option-11'/>3</label><label><input type='radio' value='4' id='option-12'/>4</label><label><input type='radio' value='5' id='option-13'/>5</label></div><div style='font-size:28px;height:20vh'>WHAT IS THE SCIENTIFIC SYMBOL OF GOLD?<label><input type='radio' value='Fe' id='option-21'/>Fe</label><label><input type='radio' value='Go' id='option-22'/>Go</label><label><input type='radio' value='Au' id='option-23'/>Au</label></div><div style='font-size:28px;height:20vh'>WHAT DOES PAuNN OFFER?<label><input type='radio' value='Gold Jewellery' id='option-31'/>Gold Jewellery</label><label><input type='radio' value='Toys' id='option-32'/>Toys</label><label><input type='radio' value='Electronics' id='option-33'/>Electronics</label></div><input type='submit' style='font-size:20px'></input><div>",
      ];
    } else if (language == "german") {
      locationText = "münchen";
      addressText = '<a href="#">Landsbergerstraße 196<br/>80687 München<a/>';
      contentText = [
        '<span><img class="logo" src="assets/paunn-logo.png" alt="logo" style="width:' +
          logoWidth +
          ';"></span>',
        "<span>WILLKOMMEN BEI PAuNN<span/>",
        "<span>PAuNN IST AUF ETHISCH<br>KORREKTE UND HANDGEFERTIGTE<br>SCHMUCKSTÜCKE SPEZIALISIERT<span/>",
        "<span>WIR MÖCHTEN, DASS DU DICH<br>BEI UNS GESCHÄTZT UND AuCH<br>WOHL FÜHLST<span/>",
        "<span>HALTE DEIN EIGENES PAuNN IN<br>DEINEN HÄNDEN<span/>",
        "<div><div style='font-size:28px;height:20vh'>WIE OFT FINDEST DU DAS Au AUF UNSERER WEBSEITE?<label><input type='radio' value='3' id='option-11'/>3</label><label><input type='radio' value='4' id='option-12'/>4</label><label><input type='radio' value='5' id='option-13'/>5</label></div><div style='font-size:28px;height:20vh'>WAS IST DAS RICHTIGE ELEMENTSYMBOL FÜR GOLD?<label><input type='radio' value='Fe' id='option-21'/>Fe</label><label><input type='radio' value='Go' id='option-22'/>Go</label><label><input type='radio' value='Au' id='option-23'/>Au</label></div><div style='font-size:28px;height:20vh'>WAS BIETEN WIR DIR?<label><input type='radio' value='Gold Jewellery' id='option-31'/>GOLDSCHMUCK</label><label><input type='radio' value='Toys' id='option-32'/>SPIELZEUG</label><label><input type='radio' value='Electronics' id='option-33'/>ELEKTROARTIKEL</label></div><input type='submit' style='font-size:20px'></input><div>",
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
    scrollAreas.forEach((scrollArea) => {
      scrollArea.style.marginBottom = scrollAreaMargin;
      // scrollArea.style.transform = imageScaling;
    });
    footerContainer.style.fontSize = footerSize;
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
    frameLocation.innerHTML = locationText;
    frame.style.opacity = 1;
    text.style.opacity = 1;
    languageToggle.style.fontSize = languageToggleSize;
    languageToggle.style.marginRight = languageToggleMarginRight;
    footerBottom.style.marginBottom = footerMarginBottom;
  } else {
    frame.style.opacity = 0;
    text.style.opacity = 0;
  }
};

update();
