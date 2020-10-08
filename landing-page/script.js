window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let tl = gsap.timeline();

tl.to(
  ".logo",
  {
    immediateRender: false,
    duration: 1.5,
    opacity: 1,
    ease: "sine.inOut",
  },
  "+=1"
);

tl.to(
  "#logo-overlay",
  {
    immediateRender: false,
    duration: 1.5,
    opacity: 1,
    ease: "sine.inOut",
  },
  "-=1.5"
);

let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 45%",
    end: "center 35%",
    toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl1
  .to(
    ".logo",
    {
      immediateRender: false,
      duration: 1.25,
      opacity: 0,
      ease: "sine.inOut",
    },
    "-=1.75"
  )
  .to(
    "#logo-overlay",
    {
      immediateRender: false,
      duration: 1.25,
      width: 27,
      height: 27,
      x: 95.5,
      y: 39,
      borderRadius: 1,
      ease: "sine.inOut",
    },
    "-=1.25"
  );

let tl1a = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 45%",
    end: "center 35%",
    toggleActions: "restart reverse restart reverse",
    // markers: true,
  },
});

tl1a.to(
  ".text1",
  {
    immediateRender: false,
    duration: 1.25,
    opacity: 1,
    ease: "sine.inOut",
  },
  "+=1"
);

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 35%",
    end: "center 25%",
    toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl2.to("#logo-overlay", {
  immediateRender: false,
  duration: 1.25,
  x: -15,
  y: 2,
  ease: "sine.inOut",
});

let tl2a = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 35%",
    end: "center 25%",
    toggleActions: "restart reverse restart reverse",
    // markers: true,
  },
});

tl2a.to(
  ".text2",
  {
    immediateRender: false,
    duration: 1.25,
    opacity: 1,
    ease: "sine.inOut",
  },
  "+=0.75"
);

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 25%",
    end: "center 15%",
    toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl3.to("#logo-overlay", {
  immediateRender: false,
  duration: 1.25,
  x: 32,
  y: 74.5,
  ease: "sine.inOut",
});

let tl3a = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 25%",
    end: "center 15%",
    toggleActions: "restart reverse restart reverse",
    // markers: true,
  },
});

tl3a.to(
  ".text3",
  {
    immediateRender: false,
    duration: 1.25,
    opacity: 1,
    ease: "sine.inOut",
  },
  "+=0.75"
);

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 15%",
    end: "center 5%",
    toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl4.to("#logo-overlay", {
  immediateRender: false,
  duration: 1.25,
  width: 99,
  height: 99,
  x: 0,
  y: 0,
  borderRadius: 2,
  ease: "sine.inOut",
});

let tl5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 15%",
    end: "center 5%",
    // toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl5.to(
  ".banner2",
  {
    immediateRender: false,
    duration: 1.25,
    display: "block",
    opacity: 1,
    ease: "sine.in",
  },
  "+=2.5"
);

let tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 15%",
    end: "center 5%",
    toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl6
  .to(
    ".logo",
    {
      immediateRender: false,
      duration: 1.25,
      opacity: 1,
      ease: "sine.inOut",
    },
    "+=1"
  )
  .to(
    ".text4",
    {
      immediateRender: false,
      duration: 1.25,
      opacity: 1,
      ease: "sine.in",
    },
    "-=0.75"
  );

let tl6a = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo",
    start: "center 15%",
    end: "center 5%",
    // toggleActions: "restart none none reverse",
    // markers: true,
  },
});

tl6a.to(
  ".text5",
  {
    immediateRender: false,
    duration: 1.25,
    opacity: 1,
    ease: "sine.in",
  },
  "+=2.5"
);
