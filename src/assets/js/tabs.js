document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs");

  if (!tabs.length) {
    return;
  }

  tabs.forEach((tabContainer) => {
    for (const [index, tab] of Object.entries(tabContainer.children)) {
      tab.dataset.index = index;
    }

    tabContainer.addEventListener("click", (event) => {
      event.preventDefault();
      const tab = event.target;

      if (tab.dataset.index) {
        const tabContent =
          tabContainer.parentElement.querySelector(".tabs--content");
        const activeTab = tabContainer.querySelector(".active");

        if (activeTab) {
          activeTab.classList.remove("active");
        }

        for (const content of tabContent.children) {
          if (!content.classList.contains("hide")) {
            content.classList.add("hide");
          }
        }

        tab.classList.add("active");
        tabContent.children[Number(tab.dataset.index)].classList.remove("hide");
      }
    });

    tabContainer.children[0].click();
  });
});
