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

window.addEventListener("load", () => {
  update();
});

/* language switch module */
let userLanguage = navigator.language || navigator.userLanguage;
let languageSwitch = document.querySelector("#switch");
let html = document.querySelector("html");
let language;

if (userLanguage == "de") {
  language = "german";
  html.lang = "de";
  languageSwitch.innerHTML = "EN";
} else if (userLanguage != "de") {
  language = "english";
  html.lang = "en";
  languageSwitch.innerHTML = "DE";
}

languageSwitch.addEventListener("click", function () {
  if (language == "german") {
    language = "english";
    html.lang = "en";
    languageSwitch.innerHTML = "DE";
  } else if (language == "english") {
    language = "german";
    html.lang = "de";
    languageSwitch.innerHTML = "EN";
  }
  update();
});

let successMessage,
  errorMessage,
  breakLine = "";
let deviceType = window
  .getComputedStyle(document.body, ":before")
  .content.replace(/\"/g, "");
if (deviceType == "desktop") {
  breakLine = "<br />";
}
if (language == "english") {
  successMessage = `THANK YOU FOR TAKING PART IN THE QUIZ.<br/> YOU WILL RECEIVE AN EMAIL SHORTLY${breakLine}WITH THE DISCOUNT CODE.`;
  errorMessage = "SOMETHING WENT WRONG.<br/> PLEASE TRY AGAIN.";
} else if (language == "german") {
  successMessage = "";
  errorMessage = "";
}

// email module
const scriptURL =
  "https://script.google.com/macros/s/AKfycbx3N-Zic_niuRPruIaQv5hUUV-BjdhgBUXrkIt8uBgy0IJky6t5xDc7KQ/exec";
const form = document.forms["submit-to-google-sheet"];
const emailStatus = document.querySelector(".email-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Email added successfully!", response);
      emailStatus.innerHTML = successMessage;

      let quizTexts = document.querySelectorAll(".correct + label");
      quizTexts.forEach((quizText) => {
        quizText.style.color = "#86941c";
        quizText.style.fontWeight = "300";
      });

      let checkBoxes = document.querySelectorAll("input[type='radio']");
      checkBoxes.forEach((checkBox) => {
        checkBox.disabled = true;
      });
      document.querySelector(".send").disabled = true;
    })
    .catch((error) => {
      console.error("Email module error!", error.message);
      emailStatus.innerHTML = errorMessage;
      document.querySelector(".send").disabled = false;
    });
});

const frame = document.querySelector(".frame-element");
const text = document.querySelector(".text");
const scrollSections = document.querySelectorAll(".scroll-section");
const scrollAreas = document.querySelectorAll(".scroll-area");

const update = () => {
  const elementHeight = document.querySelector(".scroll-section").clientHeight;

  let deviceType = window
    .getComputedStyle(document.body, ":before")
    .content.replace(/\"/g, "");
  let contentText,
    quizText,
    breakLine = "",
    breakLineMobile = "";
  if (deviceType == "desktop") {
    breakLine = "<br />";
  }
  if (deviceType == "mobile") {
    breakLineMobile = "<br />";
  }
  if (language == "english") {
    contentText = [
      '<img class="logo" src="assets/paunn-logo.png" alt="logo">',
      "WE ARE PAuNN",
      "PAuNN SPECIALISES IN<br>ETHICALLY PRODUCED<br>HANDCRAFTED JEWELLERY",
      "WE CARE ABOUT<br>BRINGING VALUE AND<br>BEAuTY TO YOU",
      "OWN YOUR PAuNN",
      "",
    ];
    quizText = [
      'L<span id="au">Au</span>NCHING SUMMER \'21',
      "ANSWER 3 SIMPLE QUESTIONS <br />& WIN 21% OFF ON YOUR FIRST ORDER!",
      `HOW MANY TIMES DID Au<br />APPEAR IN THIS PAGE?<br /><input type="radio" value="4" /><label>4</label>${breakLine}<input type="radio" value="5" /><label>5</label>${breakLine}<input type="radio" value="6" class="correct" /><label>6</label>`,
      `WHAT IS THE SCIENTIFIC<br />SYMBOL OF GOLD?<br /><input type="radio" value="Fe" /><label>Fe</label>${breakLine}<input type="radio" value="Go" /><label>Go</label>${breakLine}<input type="radio" value="Au" class="correct" /><label>Au</label>`,
      `WHAT DOES PAuNN OFFER?${breakLine}<br /><input type="radio" value="gold jewellery" class="correct"/><label>GOLD JEWELLERY</label>${breakLine}<input type="radio" value="silverware" /><label class='margin-right'>SILVERWARE</label><br /><input type="radio" value="clothing" /><label>CLOTHING</label>`,
      " ENTER YOUR EMAIL ADDRESS<br />TO RECEIVE THE DISCOUNT COUPON",
    ];
  } else if (language == "german") {
    contentText = [
      '<img class="logo" src="assets/paunn-logo.png" alt="logo">',
      "WILLKOMMEN BEI PAuNN",
      "PAuNN IST AUF ETHISCH<br>KORREKTE UND HANDGEFERTIGTE<br>SCHMUCKSTÜCKE SPEZIALISIERT",
      "WIR MÖCHTEN, DASS DU DICH<br>BEI UNS GESCHÄTZT UND AuCH<br>WOHL FÜHLST",
      "HALTE DEIN EIGENES PAuNN IN<br>DEINEN HÄNDEN",
      "",
    ];
    quizText = [
      'L<span id="au">Au</span>NCHING SOMMER \'21',
      `BEANTWORTE DREI EINFACHE FRAGEN <br />& SICHER DIR 21% RABATT AUF${breakLineMobile}DEINE ERSTE BESTELLUNG!`,
      `WIE OFT FINDEST DU DAS<br />Au AUF UNSERER WEBSEITE?<br /><input type="radio" value="4" /><label>4</label>${breakLine}<input type="radio" value="5" /><label>5</label>${breakLine}<input type="radio" value="6" class="correct" /><label>6</label>`,
      `WAS IST DAS RICHTIGE<br />ELEMENTSYMBOL FÜR GOLD?<br /><input type="radio" value="Fe" /><label>Fe</label>${breakLine}<input type="radio" value="Go" /><label>Go</label>${breakLine}<input type="radio" value="Au" class="correct" /><label>Au</label>`,
      `WAS BIETEN WIR DIR?${breakLine}<br /><input type="radio" value="gold jewellery" class="correct"/><label>GOLDSCHMUCK</label>${breakLine}<input type="radio" value="silverware" /><label>BESTECK</label><br /><input type="radio" value="clothing" /><label>KLEIDUNG</label>`,
      "<span>TRAGE DEINEN E-MAIL ADDRESSE EIN UND<br />ERHALTE IM ANSCHLUSS DEINEN GUTSCHEIN</span>",
    ];
  }

  let quizHead = document.querySelector(".quiz-head");
  let quizSubHead = document.querySelector(".quiz-subhead");
  let quiz = document.querySelectorAll(".quiz");
  let quizSection = document.querySelector(".quiz-section");

  let parallaxMultiplier;
  let top, left, side, frameBackgroundColor;
  if (deviceType == "mobile") {
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
    side = ["113px", "32px", "32px", "32px", "32px", "0px"];
    parallaxMultiplier = 100;
  } else if (deviceType == "tablet") {
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
    side = ["185px", "52px", "52px", "52px", "52px", "0px"];
    parallaxMultiplier = 100;
  } else if (deviceType == "desktop") {
    if (language == "english") {
      top = [
        "calc(50vh - 150px)",
        "calc(50vh - 30px)",
        "calc(50vh - 102px)",
        "calc(50vh + 45px)",
        "calc(50vh - 30px)",
        "calc(50vh - 30px)",
      ];
      left = [
        "calc(50% - 232px)",
        "calc(50% + 41px)",
        "calc(50% - 227px)",
        "calc(50% - 129px)",
        "calc(50% + 86.5px)",
        "calc(50% + 86.5px)",
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
        "calc(50% - 232px)",
        "calc(50% + 148px)",
        "calc(50% - 248px)",
        "calc(50% + 227px)",
        "calc(50% + 155px)",
        "calc(50% + 155px)",
      ];
    }
    side = ["296px", "64px", "64px", "64px", "64px", "0px"];
    parallaxMultiplier = 200;
  }
  frameBackgroundColor = [
    "#fff",
    "#cfa355",
    "#cfa355",
    "#cfa355",
    "#cfa355",
    "#cfa355",
  ];
  let imageIterationCounter;
  for (let i = 0; i < 6; i++) {
    let imagePosition = scrollAreas[i].getBoundingClientRect().top;

    if (isElementVisible(scrollAreas[i])) {
      scrollSections[i].style.backgroundPositionY =
        (imagePosition / elementHeight) * parallaxMultiplier -
        parallaxMultiplier / 2 +
        "px";
    }

    if (
      imagePosition < 0.35 * elementHeight &&
      imagePosition > -0.35 * elementHeight
    ) {
      text.innerHTML = contentText[i];
      quizHead.innerHTML = quizText[0];
      quizSubHead.innerHTML = quizText[1];
      quiz[0].innerHTML = quizText[2];
      quiz[1].innerHTML = quizText[3];
      quiz[2].innerHTML = quizText[4];
      quizSection.innerHTML = quizText[5];

      imageIterationCounter = i;
      text.style.opacity = 1;
      frame.style.opacity = 1;
      break;
    } else {
      text.style.opacity = 0;
      frame.style.opacity = 0;
    }
  }
  frame.style.top = top[imageIterationCounter];
  frame.style.left = left[imageIterationCounter];
  frame.style.height = side[imageIterationCounter];
  frame.style.width = side[imageIterationCounter];
  frame.style.backgroundColor = frameBackgroundColor[imageIterationCounter];
};
