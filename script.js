// select elements
const container = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
let produits = [];

// fetch les peroduit les 3andi 
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    produits = data;
    afficherProduits(produits);
  })
  .catch(error => console.log("Erreur:", error));

// fonction pour l'afficher des produits
function afficherProduits(liste) {
  container.innerHTML = "";
  
  liste.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">${product.price} $</p>
        <p class="cat">${product.category}</p>
      </div>
    `;
  });
}

// han fonction filtrage + recherche
function filtrer() {
  const recherche = searchInput.value.toLowerCase();
  const categorie = categoryFilter.value;

  const resultat = produits.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(recherche);
    const matchCategory = categorie === "" || p.category === categorie;
    return matchSearch && matchCategory;
  });

  afficherProduits(resultat);
}

//  hna l' events
searchInput.addEventListener("input", filtrer);
categoryFilter.addEventListener("change", filtrer);