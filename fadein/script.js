window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

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
  document.body.style.opacity = "1";
});

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

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
const form = document.forms["discount-coupon-list"];
const success = document.querySelector("#success");
const fail = document.querySelector("#fail");
const tooltip = document.querySelector("#tooltip");
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
        quizText.style.color = "#cfa355";
        quizText.style.fontWeight = "300";
      });
      quizTextInputs.forEach((quizTextInput) => {
        quizTextInput.checked = true;
      });

      success.style.color = "#cfa355";

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

let scriptURL1 =
  "https://script.google.com/a/macros/paunn.com/s/AKfycbw3Xe_8w3lymc2yt4MvR8YdgXsNq9lpKrSx9CggFKRtT0NXRm4ypOnNgpLbjw3obrpu_A/exec";
const form1 = document.forms["newsletter-list"];
let updateButton = document.getElementById("update");
let subscribe = document.getElementById("subscribe");
form1.addEventListener("submit", (e) => {
  e.preventDefault();

  document.getElementById("update").style.cursor = "wait";
  let formData1 = new FormData();
  formData1.append("Email", subscribe.value);
  fetch(scriptURL1, { method: "POST", body: formData1 })
    .then((response) => {
      document.getElementById("update").style.cursor = "default";
      let tooltip = document.querySelector("#tooltip1");
      console.log("User added to newsletter", response);
      tooltip.style.color = "#cfa355";
      tooltip.innerHTML = "WE'LL KEEP YOU UPDATED!";
      tooltip.style.opacity = 1;
      setTimeout(() => {
        tooltip.style.opacity = 0;
      }, 10000);

      setTimeout(() => {
        tooltip.style.color = "#fff";
      }, 11000);
    })
    .catch((error) => {
      document.getElementById("update").style.cursor = "default";
      console.log("Unable to add user to the newsletter", error.message);
    });
});

document.querySelector("#form1").addEventListener(
  "invalid",
  function (event) {
    event.preventDefault();
    let tooltip = document.querySelector("#tooltip");
    if (language == "english") {
      tooltip.innerHTML = "PLEASE ENTER A VALID EMAIL ADDRESS";
    } else if (language == "german") {
      tooltip.innerHTML = "BITTE GEBEN SIE EINE GÜLTIGE EMAIL ADRESSE EIN";
    }
    tooltip.style.opacity = 1;
    setTimeout(() => {
      tooltip.style.opacity = 0;
    }, 3000);
  },
  true
);

document.querySelector("#form2").addEventListener(
  "invalid",
  function (event) {
    event.preventDefault();
    let tooltip = document.querySelector("#tooltip1");
    if (language == "english") {
      tooltip.innerHTML = "PLEASE ENTER A VALID EMAIL ADDRESS";
    } else if (language == "german") {
      tooltip.innerHTML = "BITTE GEBEN SIE EINE GÜLTIGE EMAIL ADRESSE EIN";
    }
    tooltip.style.opacity = 1;
    setTimeout(() => {
      tooltip.style.opacity = 0;
    }, 3000);
  },
  true
);

const frame = document.querySelector(".frame-element");
const logo = document.querySelector(".logo-element");
const text = document.querySelector(".text");
const scrollSections = document.querySelectorAll(".scroll-section");
const scrollAreas = document.querySelectorAll(".scroll-area");

function update() {
  const elementHeight = document.querySelector(".scroll-section").clientHeight;

  let deviceType = window
    .getComputedStyle(document.body, ":before")
    .content.replace(/\"/g, "");
  let contentText,
    quizText,
    formText,
    footerText,
    imageYPosition,
    breakLine = "",
    breakLineMobile = "";
  let parallaxMultiplier, scrollBreak;
  if (deviceType == "mobile") {
    if (iOS() == true) {
      document.querySelector(".background-container").style.backgroundImage =
        "none";
    } else {
      document.querySelector(".background-container").style.backgroundImage =
        "url(assets/background.webp)";
    }
    breakLineMobile = "<br />";
    parallaxMultiplier = 75;
    scrollBreak = 0.4;
    imageYPosition = 0;
  } else if (deviceType == "tablet") {
    parallaxMultiplier = 100;
    scrollBreak = 0.4;
    imageYPosition = 50;
  } else if (deviceType == "desktop") {
    breakLine = "<br />";
    parallaxMultiplier = 200;
    scrollBreak = 0.35;
    imageYPosition = 100;
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
      "ANSWER 3 SIMPLE QUESTIONS & <br />WIN 21% OFF ON YOUR FIRST ORDER!",
      `HOW MANY TIMES DID Au<br />APPEAR IN THIS PAGE?<br /><label><input type="radio" value="4" name="appear" id="option11"/>4</label>${breakLine}<label><input type="radio" value="5" name="appear" id="option12"/>5</label>${breakLine}<label class="correct"><input type="radio" value="6" name="appear" id="option13"/>6</label>`,
      `WHAT IS THE SCIENTIFIC<br />SYMBOL OF GOLD?<br /><label><input type="radio" value="Fe" name="symbol" id="option21"/>Fe</label>${breakLine}<label><input type="radio" value="Go" name="symbol" id="option22"/>Go</label>${breakLine}<label class="correct"><input type="radio" value="Au" name="symbol" id="option23"/>Au</label>`,
      `WHAT DOES PAUNN OFFER?${breakLine}<br /><label class="correct"><input type="radio" value="gold jewellery" name="offer" id="option31"/>GOLD JEWELLERY</label>${breakLine}<label class='margin-right'><input type="radio" value="cutlery" name="offer" id="option32"/>CUTLERY</label><br /><label><input type="radio" value="clothing" name="offer" id="option33"/>CLOTHING</label>`,
      " ENTER YOUR EMAIL ADDRESS<br />TO RECEIVE THE DISCOUNT COUPON",
    ];
    formText = [
      "THANK YOU FOR TAKING PART IN THE QUIZ.<br/>YOU WILL RECEIVE AN EMAIL SHORTLY<br/> WITH THE DISCOUNT CODE.",
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
      `WIE OFT FINDEST DU DAS<br />Au AUF UNSERER WEBSEITE?<br /><label><input type="radio" value="4" name="appear" id="option11"/>4</label>${breakLine}<label><input type="radio" value="5" name="appear" id="option12"/>5</label>${breakLine}<label class="correct"><input type="radio" value="6" name="appear" id="option13"/>6</label>`,
      `WAS IST DAS RICHTIGE<br />ELEMENTSYMBOL FÜR GOLD?<br /><label><input type="radio" value="Fe" name="symbol" id="option21"/>Fe</label>${breakLine}<label><input type="radio" value="Go" name="symbol" id="option22"/>Go</label>${breakLine}<label class="correct"><input type="radio" value="Au" name="symbol" id="option23"/>Au</label>`,
      `WAS BIETEN WIR DIR?${breakLine}<br /><label class="correct"><input type="radio" value="gold jewellery" name="offer" id="option31"/>GOLDSCHMUCK</label>${breakLine}<label><input type="radio" value="silverware" name="offer" id="option32"/>BESTECK</label><br /><label><input type="radio" value="clothing" name="offer" id="option33"/>KLEIDUNG</label>`,
      "<span>TRAGE DEINEN EMAIL ADRESSE EIN UND<br />ERHALTE IM ANSCHLUSS DEINEN GUTSCHEIN</span>",
    ];

    formText = [
      "VIELEN DANK DAS DU MITGEMACHT HAST.<br/> DEIN GUTSCHEINCODE SCHICKEN WIR DIR AN DEINE<br /> ANGEGEBENE EMAIL ADDRESSE.",
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
  // tooltip.innerHTML = formText[2];

  quizHead.innerHTML = quizText[0];
  quizSubHead.innerHTML = quizText[1];
  quiz[0].innerHTML = quizText[2];
  quiz[1].innerHTML = quizText[3];
  quiz[2].innerHTML = quizText[4];
  quizSection.innerHTML = quizText[5];

  // contact.innerHTML = footerText[0];
  // footerFollow.innerHTML = footerText[2];
  // update.value = footerText[3];
  // footerTerms.innerHTML = footerText[4];
  // footerPrivacy.innerHTML = footerText[5];

  for (let i = 0; i < 6; i++) {
    let imagePosition = scrollAreas[i].getBoundingClientRect().top;

    if (imagePosition < elementHeight && imagePosition > -elementHeight) {
      scrollSections[i].style.backgroundPositionY =
        (imagePosition / elementHeight) * parallaxMultiplier -
        imageYPosition +
        "px";
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
}

var throttleFunction = function (func, delay) {
  let timerId;
  if (timerId) {
    return;
  }
  timerId = setTimeout(function () {
    func();
    timerId = undefined;
  }, delay);
};
