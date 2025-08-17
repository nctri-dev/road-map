let currentTab;
const labelTabs = document.querySelectorAll(".tabs .header-tabs .label-tab");
const contentTabs = document.querySelectorAll(".tabs .body-tabs .content-tab");

infinityTab();

labelTabs.forEach((el) => {
  el.addEventListener("click", function (ev) {
    currentTab = getCurrentTab(ev.currentTarget);
    changeLabelTab();
    changeContentTab();
  });
});

function infinityTab() {
  if (labelTabs.length) {
    currentTab = getCurrentTab(labelTabs[0]);
    changeContentTab();
    changeLabelTab();
  }
}

function getCurrentTab(target) {
  return target.attributes.getNamedItem("for").value;
}

function changeContentTab() {
  if (currentTab && contentTabs.length) {
    contentTabs.forEach((el) => {
      const contentTabId = el.attributes.getNamedItem("id").value;
      if (contentTabId === currentTab) el.classList.add("active");
      else {
        el.classList.remove("active");
      }
    });
  }
}

function changeLabelTab() {
  if (currentTab && labelTabs.length) {
    labelTabs.forEach((el) => {
      const labelTabId = getCurrentTab(el);
      if (labelTabId === currentTab) el.classList.add("active");
      else {
        el.classList.remove("active");
      }
    });
  }
}
