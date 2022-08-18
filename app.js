/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

//first we need to get all the sections available
//We can handle this by getting an array//
let allSections = [];
allSections = document.querySelectorAll("section");

allSections[0].scrollIntoView({ behavior: "smooth" });

const navigationBar = document.getElementById("navbar__list");

// we can achieve the total number of sections by simply using length on
//the array that contains all the sections.
const sectionCount = allSections.length;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createDynamicNavigationBar() {
  let idCount = 1;

  for (section of allSections) {
    //iterate over all sections

    navBarComponent = document.createElement("li"); //create the tag for the project
    navBarComponent.innerHTML =
      "<a id='" +
      idCount +
      "' class='menu__link' href='#" +
      section.getAttribute("id") +
      "'> " +
      section.getAttribute("data-nav") +
      " </a>";

    finalizeDynamicNavBar(navBarComponent, section);

    idCount++;
  }
}

finalizeDynamicNavBar = (navBarComponent) => {
  // use append child r
  navigationBar.appendChild(navBarComponent);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

const isWithinViewport = (elementToCheck) => {
  //https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  // official documentation*
  let currentView = elementToCheck.getBoundingClientRect();

  if (currentView.top >= 0 && currentView.bottom <= window.innerHeight + 50) {
    return true;
  } else {
    return false;
  }
};

activeCheck = () => {
  //  I am using a for
  //of loop to iterate over all items
  for (section of allSections) {

    isWithinViewport(section)
      ? !section.classList.contains("active")
        ? doubleActive(section)
        : 1
      : doubleInactive(section);
  }
};

//activate both section and nav at same time
function doubleActive(section) {
  let numberExtraction = section.getAttribute("id");

  //get last char for ID #
  let navId = numberExtraction.charAt(numberExtraction.length - 1);

  //make navBar component active
  let navComponent = document.getElementById(navId);

  navComponent.classList.add("active-nav");

  //make section active also
  section.classList.add("active");

  navComponent.style.color = "#000000";
}

//deactivate both section and nav
function doubleInactive(section) {

  let numberExtraction = section.getAttribute("id");

  //get last char for ID #
  let navId = numberExtraction.charAt(numberExtraction.length - 1);

  //make navBar component inactive
  let navComponent = document.getElementById(navId);

  navComponent.classList.remove("active-nav");

  //make section inactive also
  section.classList.remove("active");
}
createDynamicNavigationBar();
//add on text after the navbar links
navigationBar.append("<--Click For Section #");

//create a global variable to all links after dynamic creation
let allLinks = Array.from(document.querySelectorAll("a"));

/**
 * End Main Functions
 * Begin Events
 *
 */
for (link of allLinks) {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const clickedNavItem = e.target;
    //scroll that section into view....
    for (sect of allSections) {
      if (
        sect.getAttribute("id") ===
        `section${clickedNavItem.getAttribute("id")}`
      ) {
        sect.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

//scroll event
document.addEventListener("scroll", activeCheck);
// I learned a ton with this program and i have so many people interested in signing up
//thank you for the opportunity
