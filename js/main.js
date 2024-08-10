// start check the color option in local storage
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// start check the random background option in local storage
let backgroundOptions = true;
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  document.querySelectorAll(".choose span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOptions = true;

    document.querySelector(".choose .yes").classList.add("active");
  } else {
    backgroundOptions = false;

    document.querySelector(".choose .no").classList.add("active");
  }
}

// start random background option
const bgOption = document.querySelectorAll(".choose span");
bgOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveState(e);

    if (e.target.dataset.opt === "yes") {
      backgroundOptions = true;
      radomizeImage();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOptions = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
    handleActiveState(e);
  });
});
// start random background
let landingBg = document.querySelector(".landing");
let bgArray = ["01.jpg", "02.jpg", "04.jpg", "05.jpg"];
function radomizeImage() {
  if (backgroundOptions === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * bgArray.length);
      landingBg.style.backgroundImage = `url(../images/${bgArray[randomNum]})`;
    }, 2000);
  }
}
radomizeImage();

// start click settings icon
document.querySelector(".settings-icon .icon").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings").classList.toggle("show");
};

// start change main color
const colorli = document.querySelectorAll(".colors-list li");
colorli.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    handleActiveState(e);
  });
});

// start skills
let skill = document.querySelector(".skills");

window.onscroll = function () {
  let skillTop = skill.offsetTop;
  let skillHeight = skill.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillTop - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skil) => {
      skil.style.width = skil.dataset.progress;
    });
  }
};

// start popup
let allImages = document.querySelectorAll(".gallery img");

allImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let box = document.createElement("div");
    box.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      box.appendChild(imgHeading);
    }

    let popImg = document.createElement("img");
    popImg.src = img.src;

    box.appendChild(popImg);
    document.body.appendChild(box);

    let closeButton = document.createElement("span");

    let closeButtonText = document.createTextNode("X");

    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    box.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// start Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const alllinks = document.querySelectorAll(".links a");

function goToSection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
goToSection(allBullets);
goToSection(alllinks);

function handleActiveState(ele) {
  ele.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ele.target.classList.add("active");
}

// start bullet
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActiveState(e);
  });
});
// start check the bullet option in local storage
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActiveState(e);
  });
});

// start reset
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};
