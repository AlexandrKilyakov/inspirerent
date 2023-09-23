const tabs = document.querySelectorAll(".tabs");

if (tabs.length) {
  tabs.forEach((tabContainer) => {
    for (const [index, tab] of Object.entries(tabContainer.children)) {
      tab.dataset.index = index;
    }

    tabContainer.addEventListener("click", (event) => {
      event.preventDefault();
      const tab = event.target;

      if (tab.dataset.index) {
        const tabsContent =
          tabContainer.parentElement.querySelector(".tabs--content");
        const tabContent = tabsContent.querySelector(".content.active");
        const activeTab = tabContainer.querySelector(".active");

        if (activeTab) {
          activeTab.classList.remove("active");
        }

        if (tabContent) {
          tabContent.classList.remove("active");
        }

        tab.classList.add("active");
        tabsContent.children[Number(tab.dataset.index)].classList.add("active");
      }
    });

    tabContainer.children[0].click();
  });
}
