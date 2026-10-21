const recipes = [
  { name: "Potato Gratin", page: "potatoGratin.html", image: "img/potato-gratin.jpg", tags: ["side dish"] },
  { name: "Salisbury Steak", page: "salisburySteak.html", image: "img/Salisbury-Steak-Hero.jpg", tags: ["dinner", "beef"] },
  { name: "Key Lime Cheesecake", page: "keyLimeCheesecake.html", image: "img/key-lime-cheesecake.avif", tags: ["dessert"] },
  { name: "Garlic Shrimp Spaghetti", page: "garlicShrimpSpaghetti.html", image: "img/garlic-shrimp-spaghetti.jpg", tags: ["dinner", "seafood", "pasta"] },
  { name: "Lemon Berry Pizza", page: "lemonBerryPizza.html", image: "img/lemon-berry-dessert-pizza.jpg", tags: ["dessert"] },
  { name: "French Toast", page: "frenchToast.html", image: "img/frenchtoast.jpg", tags: ["breakfast"] }
];

const grid = document.getElementById("recipes");
const searchBox = document.getElementById("search");

function render(items) {
  if (items.length === 0) {
    grid.innerHTML = "<p>No recipes found.</p>";
    return;
  }
  grid.innerHTML = items
    .map(r => `
      <div class="recipesGrid">
        <a href="${r.page}"><img src="${r.image}" alt="${r.name}" width="200"></a>
        <a href="${r.page}"><p>${r.name}</p></a>
      </div>`)
    .join("");
}

render(recipes);

searchBox.addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  const matches = recipes.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.tags.some(t => t.includes(q))
  );
  render(matches);
});