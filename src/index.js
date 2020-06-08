import "alpinejs";
import "./styles.scss";
import boissons from "./boissons.json";
import boissons2 from "./boissons-2.json";
import crepes from "./crepes.json";
import apero from "./apero.json";
import brasserie from "./brasserie.json";
import desserts from "./desserts.json";
import galettes from "./galettes.json";
import common from "./common.json";
import Flickity from "flickity";
import googlePlaces from "google-maps-reviews";
import "flickity/dist/flickity.min.css";
import "google-maps-reviews/google-maps-reviews.css";
// import { tns } from "tiny-slider/src/tiny-slider";

const getDefaultLang = function() {
  const lang =
    window.navigator.userLanguage || window.navigator.language || "fr";
  let shortLang = lang;
  if (shortLang.indexOf("-") !== -1) {
    shortLang = shortLang.split("-")[0];
  }

  return ["fr", "en"].includes(shortLang) ? shortLang : "fr";
  //return "fr";
};

window.data = () => ({
  hey: "test",
  lang: getDefaultLang(),
  selectedTab: 0,
  menu: {
    boissons,
    boissons2,
    desserts,
    apero,
    brasserie,
    crepes,
    common,
    galettes
  },

  t(payload) {
    if (!payload[this.lang] || payload[this.lang] === "") {
      return payload["fr"];
    } else {
      return payload[this.lang];
    }
  },

  selectLang(value) {
    this.lang = value;
  },
  selectTab(value) {
    this.selectedTab = value;
    if (window.scrollY) {
      window.scroll(0, 0); // reset the scroll position to the top left of the document.
    }

    this.carousel.select(value);
    var elmnt = document.getElementById("tab" + value);
    elmnt.scrollIntoView();
  },
  init() {
    var elem = document.querySelector(".carousel");

    // this.carousel = tns({
    //   container: ".carousel",
    //   items: 1,
    //   slideBy: "page",
    //   autoplay: true
    // });

    this.carousel = new Flickity(elem, {
      initialIndex: this.selectedTab,
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: true,
      resize: true
      //setGallerySize: false
    });
    this.carousel.on("change", index => {
      this.selectTab(index);

      // const reviewsIndex = this.menu.common.tabs.findIndex(value => {
      //   return value.id === "reviews";
      // });
      // if (index === reviewsIndex) {
      //   this.initGooglePlaces();
      //   this.carousel.resize();
      // }
    });
  },

  money(value) {
    if (!value) {
      return;
    }
    var locale = window.navigator.userLanguage || window.navigator.language;
    return Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2
    })
      .format(value)
      .replace(" ", " ");
  },

  initGooglePlaces() {
    googlePlaces("google-reviews", {
      placeId: "ChIJ40nMVnDVzRIRMHH5-OWo3V4",
      // the following params are optional (default values)
      header: "<h3>Google Reviews</h3>", // html/text over Reviews
      footer: "", // html/text under Reviews block
      max_rows: 6, // max rows of reviews to be displayed
      min_rating: 4, // minimum rating of reviews to be displayed
      months: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez"
      ],
      text_break_length: "90", // length before a review box is set to max width
      show_date: false, // renders the date of the review before the review itself
      shorten_names: true, // example: "Max Mustermann" -> "Max M.""
      replace_anonymous: false, // do not replace anonymous author_name from JSON
      anonymous_name: "A Google User", // Google's default value depending on language used (en: "A Google User")
      anonymous_name_replacement: "User chose to remain anonymous" // replacement for default (never shortens)
    });
  }
});
