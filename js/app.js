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
const allSec = document.querySelectorAll("section"); // selecting all the elements of section
const allSecList = Array.from(allSec); // transforming them into array to use forEach looping system
const navList = document.getElementById(""); // creating my nav bar

// build the nav

const docFrag = document.createDocumentFragment(); //using the document fragment to append items to it for faster response

allSecList.forEach(function (elem) {
  //looping across my sections
  const liElem = document.createElement("li"); // creating the list element
  const aElem = document.createElement("a"); // creating the link element
  aElem.textContent = elem.dataset.nav; //defining the text content of each link element across sections
  aElem.href = `#${elem.id}`; //defining the link of each link element across sections
  aElem.setAttribute("data-nav", elem.id); // setting the attribute of the link element
  aElem.classList.add("menu__link"); //adding class menu__link to each link element
  const navItem = liElem.appendChild(aElem); //putting each link element inside its list
  docFrag.appendChild(navItem); // putting my list inside the document fragment
});
const unList = document.querySelector("ul"); //unList is my Total nav bar
unList.appendChild(docFrag); //putting my big nav bar inside the document fragment for faster response

// Add class 'active' to section when near top of viewport
const observingSections = () => {
  //using a function to observe the viewport
  const action = new IntersectionObserver(
    function (items) {
      items.forEach((item) => {
        const selectedLink = unList.querySelector(
          //looping across items in the nav bar
          `[data-nav=${item.target.id}]`
        );
        if (item.isIntersecting) {
          // if the item is in the viewport
          item.target.classList.add("your-active-class"); // add your-active-class to its classList
          selectedLink.classList.add("active-link"); //add active-link to its classList
          location.hash = `${item.target.id}`;
        } else {
          item.target.classList.remove("your-active-class"); // to remove the class after that the item is not in the viewport
          selectedLink.classList.remove("active-link"); // to remove the class after that the item is not in the viewport
        }
      });
    },
    {
      threshold: 0.1, // if 10% of the item is in the viewport
    }
  );
  return document.querySelectorAll("section").forEach(function (sect) {
    action.observe(sect); //observing each section element
  });
};
observingSections(); //calling our viewing function

// Scroll to anchor ID using scrollTO event
unList.addEventListener("click", function (evt) {
  evt.preventDefault(); //Using preventDefault() as if there is a default event occurring we need to stop that.
  if (evt.target.dataset.nav) {
    document
      .getElementById(evt.target.dataset.nav)
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); //For smooth scrolling behavior.
  }
});
