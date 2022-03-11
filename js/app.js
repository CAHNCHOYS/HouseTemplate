let _slideUp = (target, duration) => {
  target.style.transitionProperty = "height, margin, padding"; /* [1.1] */
  target.style.transitionDuration = duration + "ms"; /* [1.2] */

  target.style.height = target.offsetHeight + "px"; /* [3] */
  target.offsetHeight;
  target.style.overflow = "hidden"; /* [7] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [7.2] */

  window.setTimeout(() => {
    target.style.display = "none"; /* [8] */
    target.style.removeProperty("height"); /* [9] */
    target.style.removeProperty("padding-top"); /* [10.1] */
    target.style.removeProperty("padding-bottom"); /* [10.2] */
    target.style.removeProperty("margin-top"); /* [11.1] */
    target.style.removeProperty("margin-bottom"); /* [11.2] */
    target.style.removeProperty("overflow"); /* [12] */
    target.style.removeProperty("transition-duration"); /* [13.1] */
    target.style.removeProperty("transition-property"); /* [13.2] */
  }, duration);
};

let _slideDown = (target, duration) => {
  target.style.removeProperty("display"); /* [1] */
  let display = window.getComputedStyle(target).display;
  if (display === "none") {
    /* [2] */
    display = "block";
  }
  target.style.display = display;
  let height = target.offsetHeight; /* [3] */
  target.style.overflow = "hidden"; /* [7] */
  target.style.height = 0; /* [4] */
  target.style.paddingTop = 0; /* [5.1] */
  target.style.paddingBottom = 0; /* [5.2] */
  target.style.marginTop = 0; /* [6.1] */
  target.style.marginBottom = 0; /* [6.2] */
  target.offsetHeight;

  target.style.transitionProperty = "height, margin, padding"; /* [9.1] */
  target.style.transitionDuration = duration + "ms"; /* [9.2] */
  target.style.height = height + "px"; /* [10] */
  target.style.removeProperty("padding-top"); /* [11.1] */
  target.style.removeProperty("padding-bottom"); /* [11.2] */
  target.style.removeProperty("margin-top"); /* [12.1] */
  target.style.removeProperty("margin-bottom"); /* [12.2] */
  window.setTimeout(() => {
    target.style.removeProperty("height"); /* [13] */
    target.style.removeProperty("overflow"); /* [14] */
    target.style.removeProperty("transition-duration"); /* [15.1] */
    target.style.removeProperty("transition-property"); /* [15.2] */
  }, duration);
};

let _slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === "none") {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_mobile");
  
 

} else {
  document.body.classList.add("_pc");
}

function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

//Анимация при скоре (добавление класа при достижении 1/4 блока)
const anim_items = document.querySelectorAll("._anim-items");
if (anim_items.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < anim_items.length; index++) {
      const animElement = anim_items[index];
      const animElementHeigt = animElement.offsetHeight;
      const animItemOffset = offset(animElement).top;
      const animStart = 4;

      let animStartPoint =
        document.documentElement.clientHeight - animElementHeigt / animStart;
      if (animElementHeigt > document.documentElement.clientHeight) {
        animStartPoint =
          document.documentElement.clientHeight -
          document.documentElement.clientHeight / animStart;
      }
      if (
        pageYOffset > animItemOffset - animStartPoint &&
        pageYOffset < animItemOffset + animElementHeigt
      ) {
        animElement.classList.add("_active");
      } else {
        if (!animElement.classList.contains("_noAnimAgain"))
          animElement.classList.remove("_active");
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

window.onload = function () {
  const headerSearchIcon = document.querySelector(".header__link.search");
  const burgerMenu = document.querySelector(".header__menu");
  const headerBurgerIcon = document.querySelector(".header__burger");

  if (headerSearchIcon) {
    headerBurgerIcon.addEventListener("click", function () {
      this.classList.toggle("_active");
      burgerMenu.classList.toggle("_active");
    });
  }

  if (headerSearchIcon) {
    headerSearchIcon.addEventListener("click", (event) => {
      event.preventDefault();
      headerSearchIcon.nextElementSibling.classList.toggle("_shown");
    });
  }

  //Закрытие меню поиска по клику вне
  document.onclick = (event) => {
    if (!event.target.closest(".header__list")) {
      if (headerSearchIcon) {
        headerSearchIcon.nextElementSibling.classList.remove("_shown");
      }
    }
  };

  new Swiper(".clients__swiper", {
    //Отстутпы между слайдами
    spaceBetween: 70,
    //Слайды на пролисьывание (сколько будет листаться)
    slidesPerGroup: 1,
    //Сколько слайдов будет видно
    slidesPerView: 2,
    
    // centeredSlides:true
    speed: 600,
    //Возможные варианты:flip slide cube coverflow fade
    effect: "slide",
    loop: false,
    navigation: {
      nextEl: ".clients__arrow.r",
      prevEl: ".clients__arrow.l",
    },
    //Точки буллиты
    // pagination:{
    //     el:'.class',
    //     clickable:true,
    //
    // },
    grabCursor: false,
    keyboard: {
      // Включаем управление клавиатурой
      enabled: true,
      //Только при поле зрения
      onlyInViewport: true,
      pageUpDown: true,
    },
    autoHeight: true,
    breakpoints: {
      
      0: {
        slidesPerView:1.3,
        spaceBetween:15,
      },
      800:{
        slidesPerView:2.35,
        spaceBetween:20,
      },
      1370:{
         slidesPerView:2,
         spaceBetween:70,

      }
      
    },

    observer: true,
  });
};

try {
  //destruct
  const array = [1, 2, 3, 4];
  let obj = {
    age: 5,
    sex: "male",
  };
  let [num1, , num2 = 5] = array;
  console.log(num1, num2);

  let { age, sex } = obj;
  console.log(age, sex);
  //-----------------------------

  //Map------------------------

  //--------------------------
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

function createDiv({ age = 0, count = 5, size = 5 } = {}) {
  console.log(age, count, size);
}
