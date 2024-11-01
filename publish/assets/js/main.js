/*=============== Loader page change ===============*/

// Show loader when the user navigates away from the page
window.addEventListener("beforeunload", function () {
  const loader = document.querySelector(".loader-container");
  loader.classList.remove("hidden"); // Show the loader
});

// Hide loader once the new page has fully loaded
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-container");
  setTimeout(() => {
    loader.classList.add("hidden"); // Hide the loader after a brief moment
  }, 100); // Delay to ensure the loader is visible
});

/*=============== navbar convert sidebar in md and mobile screen ===============*/
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll("#nav-menu a");

hamburger.addEventListener("click", () => {
  toggleSidebar();
});

// Close sidebar when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    hamburger.classList.remove("ri-close-large-line");
  });
});

// Function to toggle sidebar and overlay visibility
function toggleSidebar() {
  sidebar.classList.toggle("-translate-x-full");
  hamburger.classList.toggle("ri-close-large-line");
  overlay.classList.toggle("hidden");
}

// Function to set active link
function setActiveLink() {
  const currentPath = window.location.pathname.split("/").pop(); // Get current page
  const links = document.querySelectorAll("a"); // Get all anchor tags

  links.forEach((link) => {
    const linkPath = link.getAttribute("href"); // Get link href
    if (currentPath === "" && linkPath === "index.html" || currentPath === linkPath) {
      link.style.color = "#fd3d57"; // Apply color directly
      link.style.fontWeight = "bold"; // Apply bold
    } else {
      link.style.color = ""; // Reset color
      link.style.fontWeight = ""; // Reset font weight
    }
  });
}

// Call function on page load
window.onload = setActiveLink;

/*=============== Footer Dropdown on mobile screen ===============*/
function toggleAccordion(contentId) {
  const content = document.getElementById(contentId);
  const icon = document.getElementById(contentId + "Icon");

  // Toggle max height for accordion effect
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    icon.classList.remove("rotate-180"); // Rotate the icon back
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    icon.classList.add("rotate-180"); // Rotate the icon down
  }
}

/*=============== About us ===============*/

// JavaScript to trigger animations
document.addEventListener("DOMContentLoaded", function () {
  const comingSoonContent = document.querySelector("#coming-soon-content");
  // Simulate page load animation (if needed)
  setTimeout(() => {
    comingSoonContent.classList.remove("opacity-0", "scale-50");
  }, 100);

  const aboutLink = document.querySelector('a[href="about.html"]');
  aboutLink.addEventListener("click", function (event) {
    // event.preventDefault();
    comingSoonContent.classList.remove("opacity-0", "scale-50"); // Show Coming Soon page with animation
  });
});

/*=============== Account and Shop sidebar on md and mobile screen ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar1");
  const closeSidebar = document.getElementById("closeSidebar");

  // Function to check if the screen width is within the specified ranges
  function isResponsiveScreen() {
    const width = window.innerWidth;
    return (width >= 375 && width < 768) || (width >= 768 && width <= 992);
  }

  // Variable to track sidebar state
  let sidebarOpen = false;

  // Open the sidebar when the toggle button is clicked
  toggleButton.addEventListener("click", function () {
    if (isResponsiveScreen() && !sidebarOpen) {
      sidebar.classList.remove("-translate-x-full");
      sidebar.classList.add("translate-x-0");
      sidebarOpen = true; // Mark sidebar as open
    }
  });

  // Close the sidebar when the close button inside it is clicked
  closeSidebar.addEventListener("click", function () {
    if (isResponsiveScreen()) {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      sidebarOpen = false; // Mark sidebar as closed
    }
  });

  // Close the sidebar when clicking outside of it
  document.addEventListener("click", function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickToggle = toggleButton.contains(event.target);

    if (
      !isClickInsideSidebar &&
      !isClickToggle &&
      sidebarOpen &&
      isResponsiveScreen()
    ) {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      sidebarOpen = false; // Mark sidebar as closed
    }
  });
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");

  // Show the scroll-up button when the user scrolls down 350px
  if (window.scrollY >= 350) {
    scrollUpButton.classList.add("show-scroll");
  } else {
    scrollUpButton.classList.remove("show-scroll");
  }
};

// Scroll to the top smoothly when the scroll-up button is clicked
document.getElementById("scroll-up").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor click behavior
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll to the top
  });
});

window.addEventListener("scroll", scrollUp);

/*=============== Swiper cards in home and view page ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    speed: 200,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      // Responsive breakpoints
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });
});

/*=============== Pagination in shop page ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const cardsPerPage = 6;
  const dataContainer = document.getElementById("main-content");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const paginationNumbersContainer =
    document.getElementById("pagination-numbers");

  // Get all cards by selecting the appropriate class
  const cards = Array.from(dataContainer.getElementsByClassName("card"));

  // Calculate the total number of pages
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  let currentPage = 1;

  // Function to display cards for a specific page
  function displayPage(page) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    cards.forEach((card, index) => {
      card.style.display =
        index >= startIndex && index < endIndex ? "block" : "none";
    });
  }

  // Function to update pagination numbers dynamically
  function updatePaginationNumbers() {
    paginationNumbersContainer.innerHTML = ""; // Clear existing numbers

    // Generate page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.classList.add(
        "flex",
        "items-center",
        "px-4",
        "py-2",
        "border",
        "border-primary",
        "text-primary",
        "hover:bg-primary",
        "hover:text-white",
        "transition",
        "duration-200",
        "ease-in-out"
      );

      // Add active class for the current page
      if (i === currentPage) {
        pageLink.classList.add("bg-primary", "text-white");
      }

      // Event listener for page number click
      pageLink.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        displayPage(currentPage);
        updatePaginationNumbers(); // Update numbers to show active page
        updatePaginationControls(); // Update controls as well
      });

      // Add page link to container
      paginationNumbersContainer.appendChild(pageLink);
    }
  }

  // Function to update prev/next button visibility and state
  function updatePaginationControls() {
    if (currentPage === 1) {
      prevButton.classList.add("disabled-btn");
    } else {
      prevButton.classList.remove("disabled-btn");
    }

    if (currentPage === totalPages) {
      nextButton.classList.add("disabled-btn");
    } else {
      nextButton.classList.remove("disabled-btn");
    }
  }

  // Event listener for "Previous" button
  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      updatePaginationNumbers();
      updatePaginationControls();
    }
  });

  // Event listener for "Next" button
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      updatePaginationNumbers();
      updatePaginationControls();
    }
  });

  // Initial page load
  displayPage(currentPage);
  updatePaginationNumbers();
  updatePaginationControls();
});
