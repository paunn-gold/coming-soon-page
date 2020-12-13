window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const mapRange = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const elements = Array.from(
  document.querySelectorAll("[data-transition-opacity]")
)
  .map((el) => ({
    el,
    data: Object.entries(
      JSON.parse(el.getAttribute("data-transition-opacity").replace(/'/g, '"'))
    ),
  }))
  .map(({ el, data }) => ({
    el,
    data: data.map(([v, o]) => [parseInt(v), o]),
  }));

const container = document.querySelector(".scroll-container");
container.addEventListener("scroll", () => {
  update();
});

window.addEventListener("resize", () => {
  update();
});

const frame = document.querySelector(".frame-element");

const update = () => {
  const elementHeight = document.querySelector(".scroll-area").clientHeight;
  const containerHeight = container.scrollHeight - elementHeight;
  const ratio = 100 / containerHeight;

  const progress = Math.round(container.scrollTop * ratio);

  document.querySelector(".debug").innerHTML = progress;
  document.querySelector(
    ".resolution"
  ).innerHTML = `${window.innerWidth} x ${window.innerHeight}`;

  elements.forEach(({ el, data }) => {
    const first = data[0];
    const last = data[data.length - 1];
    const isProgressBefore = progress <= first[0];
    const isProgressAfter = progress >= last[0];

    let opacity = isProgressBefore ? first[1] : isProgressAfter ? last[1] : 0;

    if (!isProgressBefore && !isProgressAfter) {
      const i = data.reduce((i, [v, o], index) => {
        return progress > v ? index : i;
      }, 0);

      const [v, o] = data[i];
      const [v2, o2] = data[i + 1];

      opacity = mapRange(progress, v, v2, o, o2);
    }

    el.style.opacity = opacity;
  });

  const logos = document.querySelectorAll(".logo");
  const texts = document.querySelectorAll(".text-element");

  if ((progress / 20) % 1 == 0) {
    let deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    let logoWidth, fontSize;
    let framePosition = Math.trunc(progress / 20),
      bottom = [],
      left = [],
      side = [],
      opacity = [];
    if (deviceWidth <= 480) {
      logoWidth = "250px";
      fontSize = "32px";
      bottom = [
        "calc(50% - 85px)",
        "calc(50% - 59px)",
        "calc(50% - 13px)",
        "calc(50% - 109px)",
        "calc(50% - 135px)",
        "calc(50% - 135px)",
      ];
      left = [
        "calc(50% - 81px)",
        "calc(50% + 25px)",
        "calc(50% - 123px)",
        "calc(50% - 60px)",
        "calc(50% - 81px)",
        "calc(50% - 81px)",
      ];
      side = ["100px", "33px", "33px", "33px", "100px", "100px"];
    } else if (deviceWidth <= 960 && deviceWidth > 480) {
      logoWidth = "425px";
      fontSize = "40px";
      bottom = [
        "calc(50% - 110px)",
        "calc(50% - 55px)",
        "calc(50% + 2px)",
        "calc(50% - 112px)",
        "calc(50% - 170px)",
        "calc(50% - 170px)",
      ];
      left = [
        "calc(50% - 137px)",
        "calc(50% + 32px)",
        "calc(50% - 153px)",
        "calc(50% - 74px)",
        "calc(50% - 137px)",
        "calc(50% - 137px)",
      ];
      side = ["170px", "40px", "40px", "40px", "170px", "170px"];
    } else {
      logoWidth = "675px";
      fontSize = "48px";
      bottom = [
        "calc(50% - 140px)",
        "calc(50% - 32px)",
        "calc(50% + 37px)",
        "calc(50% - 101px)",
        "calc(50% - 210px)",
        "calc(50% - 210px)",
      ];
      left = [
        "calc(50% - 217px)",
        "calc(50% + 37px)",
        "calc(50% - 184px)",
        "calc(50% - 90px)",
        "calc(50% - 217px)",
        "calc(50% - 217px)",
      ];
      side = ["270px", "50px", "50px", "50px", "270px", "270px"];
    }
    opacity = [1, 1, 1, 1, 1, 0];
    logos.forEach((logo) => {
      logo.style.width = logoWidth;
    });
    texts.forEach((text) => {
      text.style.fontSize = fontSize;
    });
    frame.style.bottom = bottom[framePosition];
    frame.style.left = left[framePosition];
    frame.style.height = side[framePosition];
    frame.style.width = side[framePosition];
    frame.style.opacity = opacity[framePosition];
  }
};

update();
