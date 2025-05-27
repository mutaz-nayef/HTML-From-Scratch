const cards = document.querySelectorAll(".mushroom-guide .card");

const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const noResultFilter = document.querySelector(".no-matches");
const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.computedStyleMap.viewTransition = `card-${mushroomId}`;
});

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name;
  currentFilters[filterType] = e.target.value;

  if (!document.startViewTransition()) {
    filterCards();
    return;
  }
  document.startViewTransition(() => {
    filterCards();
  });
}

function filterCards() {
  let hasVisibleCards = false;

  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season === season;
    const matchesEdible = currentFilters.edible === edible;

    if (
      (currentFilters.season === "all" || matchesSeason) &&
      (currentFilters.edible === "all" || matchesEdible)
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }
    if (hasVisibleCards) {
      noResultFilter.hidden = true;
    } else {
      noResultFilter.hidden = false;
    }
  });
}

function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}
enableFiltering();
