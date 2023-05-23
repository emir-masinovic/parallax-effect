const parallaxEl = document.querySelectorAll(".parallax");

let xValue = 0;
let yValue = 0;
let rotateDegree = 0;

function update(event) {
  parallaxEl.forEach((element) => {
    let speedX = element.dataset.speedx;
    let speedY = element.dataset.speedy;
    let speedZ = element.dataset.speedz;

    let rotateSpeed = element.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(element).left) < window.innerWidth / 2
        ? 1
        : -1;
    let zValue =
      (event.clientX - parseFloat(getComputedStyle(element).left)) * isInLeft;

    element.style.transform = `
            translateX(calc(-50% + ${-xValue * speedX}px)) 
            translateY(calc(-50% + ${yValue * speedY}px))
            perspective(2000px)
            translateZ(${zValue * speedZ}px)
            rotateY(${rotateDegree * rotateSpeed}deg)
            `;
  });
}

update(0);

window.addEventListener("pointermove", (event) => {
  if (timeline.isActive()) {
    return;
  }

  xValue = event.clientX - window.innerWidth / 2;
  yValue = event.clientY - window.innerHeight / 2;
  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(event);
});

Array.from(parallaxEl)
  .filter((element) => !element.classList.contains("text"))
  .forEach((element) => {
    let timeline = gsap.timeline();
    timeline.from(element, {
      top: `${+element.offsetHeight / 2 + element.dataset.distance}px`,
      duration: 4,
      ease: "power3.out",
    });
  });

let timeline = gsap.timeline();
timeline
  .from(
    ".text h1",
    {
      y:
        window.innerWidth -
        document.querySelector(".text h1").getBoundingClientRect().top,
      duration: 3,
    },
    "1"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 2,
    },
    "2"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 2,
    },
    "1"
  );
