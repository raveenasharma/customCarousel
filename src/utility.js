export function getResponsiveScreenConfig(props) {
if(props.config.responsive && props.config.responsive.length > 0) {
    props.config.responsive.sort(function (a, b) {
        return b.breakpoint - a.breakpoint;
      });
    return props.config.responsive.find(
        item => item.breakpoint <= window.innerWidth
      )  
} 
    else 
    return {
        breakpoint: window.innerWidth,
        settings: {
            slidesToScroll: props.config.slidesToScroll,
            slidesToShow: props.config.slidesToShow
        }
    }
}


//Lazy load images
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
    let lazyImageObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

//Circular Image

// var index = 0;
// var amount = 0; //amount of images
// var currTransl = [];
// var translationComplete = true;

// var transitionCompleted = function() {
//   translationComplete = true;
// };

// document.addEventListener("DOMContentLoaded", function(event) {
//   amount = document.getElementsByTagName("img").length;
//   document.getElementsByTagName("span")[0].innerHTML = amount;
//   for (var i = 0; i < amount; i++) {
//     currTransl[i] = -860;
//     document
//       .getElementsByTagName("img")
//       [i].addEventListener("transitionend", transitionCompleted, true);
//     document
//       .getElementsByTagName("img")
//       [i].addEventListener("webkitTransitionEnd", transitionCompleted, true);
//     document
//       .getElementsByTagName("img")
//       [i].addEventListener("oTransitionEnd", transitionCompleted, true);
//     document
//       .getElementsByTagName("img")
//       [i].addEventListener("MSTransitionEnd", transitionCompleted, true);
//   }
// });

// export function right() {
//   if (translationComplete === true) {
//     translationComplete = false;
//     index--;
//     if (index === -1) {
//       index = amount - 1;
//     }
//     var outerIndex = index % amount;
//     //document.getElementById('index').innerHTML = outerIndex === 0 ? 5 : outerIndex;
//     for (var i = 0; i < amount; i++) {
//       var img = document.getElementsByClassName("img")[i];
//       img.style.opacity = "1";
//       img.style.transform = "translate(" + (currTransl[i] + 860) + "px)";
//       currTransl[i] = currTransl[i] + 860;
//     }

//     var outerImg = document.getElementsByClassName("img")[outerIndex];
//     outerImg.style.transform =
//       "translate(" + (currTransl[outerIndex] - 860 * amount) + "px)";
//     outerImg.style.opacity = "0";
//     currTransl[outerIndex] = currTransl[outerIndex] - 860 * amount;
//   }
// }

// export function left() {
//   if (translationComplete === true) {
//     translationComplete = false;
//     index++;
//     var outerIndex = (index - 1) % amount;
//     //document.getElementById('index').innerHTML = outerIndex+1;
//     for (var i = 0; i < amount; i++) {
//       var img = document.getElementsByClassName("img")[i];
//       img.style.opacity = "1";
//       img.style.transform = "translate(" + (currTransl[i] - 860) + "px)";
//       currTransl[i] = currTransl[i] - 860;
//     }
//     var outerImg = document.getElementsByClassName("img")[outerIndex];
//     outerImg.style.transform =
//       "translate(" + (currTransl[outerIndex] + 860 * amount) + "px)";
//     outerImg.style.opacity = "0";
//     currTransl[outerIndex] = currTransl[outerIndex] + 860 * amount;
//   }
// }
