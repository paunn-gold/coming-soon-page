window.addEventListener("scroll", () => {
  // throttleFunction(update, 100);
  update();
});

window.addEventListener("resize", () => {
  // throttleFunction(update, 100);
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

// email module
const quizContainer = document.querySelector(".quiz-container");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbx3N-Zic_niuRPruIaQv5hUUV-BjdhgBUXrkIt8uBgy0IJky6t5xDc7KQ/exec";
const form = document.forms["submit-to-google-sheet"];
const success = document.querySelector("#success");
const fail = document.querySelector("#fail");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  quizContainer.style.cursor = "wait";
  document.querySelector(".send").style.cursor = "wait";
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      update();
      console.log("Email added successfully!", response);
      success.style.display = "block";
      let quizTexts = document.querySelectorAll(".correct");
      let quizTextInputs = document.querySelectorAll(".correct > input");
      quizTexts.forEach((quizText) => {
        quizText.style.color = "#86941c";
        quizText.style.fontWeight = "300";
      });
      quizTextInputs.forEach((quizTextInput) => {
        quizTextInput.checked = true;
      });

      let radioButtons = document.querySelectorAll("input[type='radio']");
      radioButtons.forEach((radioButton) => {
        radioButton.disabled = true;
        radioButton.style.cursor = "default";
      });
      let labels = document.querySelectorAll("label");
      labels.forEach((label) => {
        label.style.cursor = "default";
      });
      document.querySelector(".send").disabled = true;
      document.querySelector(".send").style.cursor = "default";
      quizContainer.style.cursor = "default";
    })
    .catch((error) => {
      update();
      console.log("Email module error!", error.message);
      fail.style.display = "block";
      document.querySelector(".send").disabled = false;
      quizContainer.style.cursor = "default";
    });
});

const frame = document.querySelector(".frame-element");
const logo = document.querySelector(".logo-element");
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
    formText,
    footerText,
    breakLine = "",
    breakLineMobile = "";
  let parallaxMultiplier, scrollBreak;
  if (deviceType == "mobile") {
    breakLineMobile = "<br />";
    parallaxMultiplier = 75;
    scrollBreak = 0.4;
  } else if (deviceType == "tablet") {
    parallaxMultiplier = 100;
    scrollBreak = 0.4;
  } else if (deviceType == "desktop") {
    breakLine = "<br />";
    parallaxMultiplier = 200;
    scrollBreak = 0.35;
  }
  if (language == "english") {
    contentText = [
      // '<img class="logo" src="assets/paunn-logo.png" width="4092" height="755" alt="logo">',
      "",
      "WE ARE P<span class='au'>Au</span>NN",
      "P<span class='au'>Au</span>NN SPECIALISES IN ETHICALLY PRODUCED HANDCRAFTED JEWELLERY",
      "WE CARE ABOUT BRINGING VALUE AND BE<span class='au'>Au</span>TY TO YOU",
      "OWN YOUR P<span class='au'>Au</span>NN",
      "",
    ];
    quizText = [
      'L<span class="au">Au</span>NCHING SUMMER \'21',
      "ANSWER 3 SIMPLE QUESTIONS <br />& WIN 21% OFF ON YOUR FIRST ORDER!",
      `HOW MANY TIMES DID Au<br />APPEAR IN THIS PAGE?<br /><label><input type="radio" value="4" name="appear" />4</label>${breakLine}<label><input type="radio" value="5" name="appear" />5</label>${breakLine}<label class="correct"><input type="radio" value="6" name="appear" />6</label>`,
      `WHAT IS THE SCIENTIFIC<br />SYMBOL OF GOLD?<br /><label><input type="radio" value="Fe" name="symbol" />Fe</label>${breakLine}<label><input type="radio" value="Go" name="symbol" />Go</label>${breakLine}<label class="correct"><input type="radio" value="Au" name="symbol" />Au</label>`,
      `WHAT DOES PAuNN OFFER?${breakLine}<br /><label class="correct"><input type="radio" value="gold jewellery" name="offer"/>GOLD JEWELLERY</label>${breakLine}<label class='margin-right'><input type="radio" value="silverware" name="offer" />SILVERWARE</label><br /><label><input type="radio" value="clothing" name="offer" />CLOTHING</label>`,
      " ENTER YOUR EMAIL ADDRESS<br />TO RECEIVE THE DISCOUNT COUPON",
    ];
    formText = [
      "THANK YOU FOR TAKING PART IN THE QUIZ.<br/> YOU WILL RECEIVE AN EMAIL SHORTLY WITH THE DISCOUNT CODE.",
      "SOMETHING WENT WRONG.<br/> PLEASE TRY AGAIN.",
    ];
    footerText = [
      "CONTACT",
      "EMAIL",
      "FOLLOW",
      "STAY UPDATED",
      "TERMS & CONDITIONS",
      "PRIVACY POLICY",
    ];
  } else if (language == "german") {
    contentText = [
      // '<img class="logo" src="assets/paunn-logo.png" alt="logo">',
      "",
      "WILLKOMMEN BEI P<span class='au'>Au</span>NN",
      "P<span class='au'>Au</span>NN IST AUF ETHISCH KORREKTE UND HANDGEFERTIGTE SCHMUCKSTÜCKE SPEZIALISIERT",
      "WIR MÖCHTEN, DASS DU DICH BEI UNS GESCHÄTZT UND <span class='au'>Au</span>CH WOHL FÜHLST",
      "HALTE DEIN EIGENES P<span class='au'>Au</span>NN IN DEINEN HÄNDEN",
      "",
    ];
    quizText = [
      'L<span class="au">Au</span>NCHING SOMMER \'21',
      `BEANTWORTE DREI EINFACHE FRAGEN <br />& SICHER DIR 21% RABATT AUF${breakLineMobile}DEINE ERSTE BESTELLUNG!`,
      `WIE OFT FINDEST DU DAS<br />Au AUF UNSERER WEBSEITE?<br /><label><input type="radio" value="4" name="appear" />4</label>${breakLine}<label><input type="radio" value="5" name="appear" />5</label>${breakLine}<label class="correct"><input type="radio" value="6" name="appear" />6</label>`,
      `WAS IST DAS RICHTIGE<br />ELEMENTSYMBOL FÜR GOLD?<br /><label><input type="radio" value="Fe" name="symbol" />Fe</label>${breakLine}<label><input type="radio" value="Go" name="symbol" />Go</label>${breakLine}<label class="correct"><input type="radio" value="Au" name="symbol" />Au</label>`,
      `WAS BIETEN WIR DIR?${breakLine}<br /><label class="correct"><input type="radio" value="gold jewellery" name="offer"/>GOLDSCHMUCK</label>${breakLine}<label><input type="radio" value="silverware" name="offer" />BESTECK</label><br /><label><input type="radio" value="clothing" name="offer" />KLEIDUNG</label>`,
      "<span>TRAGE DEINEN EMAIL ADRESSE EIN UND<br />ERHALTE IM ANSCHLUSS DEINEN GUTSCHEIN</span>",
    ];

    formText = [
      "VIELEN DANK DAS DU MITGEMACHT HAST.<br/> DEIN GUTSCHEINCODE SCHICKEN WIR DIR AN DEINE ANGEGEBENE EMAIL ADDRESSE.",
      "ETWAS IST SHIEF GELAUFEN.<br/> BITTE VERSUCHE ES NOCH EINMAL.",
    ];
    footerText = [
      "KONTACT",
      "EMAIL",
      "FOLGEN",
      "STAY UPDATED",
      "AGB",
      "DATENSCHUTZ",
    ];
  }

  let quizHead = document.querySelector(".quiz-head");
  let quizSubHead = document.querySelector(".quiz-subhead");
  let quiz = document.querySelectorAll(".quiz");
  let quizSection = document.querySelector(".quiz-section");
  let contact = document.querySelector(".contact");
  let update = document.querySelector("#update");
  let footerFollow = document.querySelector(".footer-follow");
  let footerTerms = document.querySelector(".footer-terms a");
  let footerPrivacy = document.querySelector(".footer-privacy a");

  success.innerHTML = formText[0];
  fail.innerHTML = formText[1];

  quizHead.innerHTML = quizText[0];
  quizSubHead.innerHTML = quizText[1];
  quiz[0].innerHTML = quizText[2];
  quiz[1].innerHTML = quizText[3];
  quiz[2].innerHTML = quizText[4];
  quizSection.innerHTML = quizText[5];

  contact.innerHTML = footerText[0];
  footerFollow.innerHTML = footerText[2];
  update.value = footerText[3];
  footerTerms.innerHTML = footerText[4];
  footerPrivacy.innerHTML = footerText[5];

  for (let i = 0; i < 6; i++) {
    let imagePosition = scrollAreas[i].getBoundingClientRect().top;

    if (imagePosition < elementHeight && imagePosition > -elementHeight) {
      scrollSections[i].style.backgroundPositionY =
        (imagePosition / elementHeight) * parallaxMultiplier + "px";
    }

    if (
      imagePosition < scrollBreak * elementHeight &&
      imagePosition > -scrollBreak * elementHeight
    ) {
      text.style.opacity = 1;
      text.innerHTML = contentText[i];
      if (i == 0) {
        frame.style.opacity = 1;
        logo.style.opacity = 1;
      }
      break;
    } else {
      text.style.opacity = 0;
      frame.style.opacity = 0;
      logo.style.opacity = 0;
    }
  }
};

// var throttleFunction = function (func, delay) {
//   let timerId;
//   if (timerId) {
//     return;
//   }
//   timerId = setTimeout(function () {
//     func();
//     timerId = undefined;
//   }, delay);
// };
