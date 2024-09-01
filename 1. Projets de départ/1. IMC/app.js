const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

// Sélectionne le premier élément <form> dans le document HTML
const form = document.querySelector("form");

// Ajoute un gestionnaire d'événement pour l'événement "submit" (soumission du formulaire)
// Lorsque le formulaire est soumis, la fonction handleForm sera appelée
form.addEventListener("submit", handleForm);

// Déclare la fonction handleForm qui sera exécutée à chaque soumission du formulaire
function handleForm(e) {
  // Empêche le comportement par défaut de la soumission du formulaire
  e.preventDefault();

  // Appelle la fonction pour calculer l'IMC
  calculateBMI();
}

// Sélectionne tous les éléments <input> du formulaire (taille et poids)
const inputs = document.querySelectorAll("input");

// Fonction pour calculer l'IMC
function calculateBMI() {
  const height = inputs[0].value;
  const weight = inputs[1].value;

  // Vérifie que les valeurs sont correctes (non nulles et positives)
  if (!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  }

  // Calcule l'IMC : poids (kg) / taille² (m²)
  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);

  // Affiche le résultat de l'IMC
  showResult(BMI);
}

// Sélectionne les éléments du DOM où afficher l'IMC et le résultat
const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

// Fonction pour gérer les erreurs (saisie incorrecte)
function handleError() {
  displayBMI.textContent = "Saisie incorrecte";
  displayBMI.style.color = "inherit"; // Réinitialise la couleur à la valeur héritée
  result.textContent = "Remplissez correctement les inputs";
}

// Fonction pour afficher le résultat de l'IMC
function showResult(BMI) {
  // Trouve la catégorie de l'IMC correspondante
  const rank = BMIData.find((data) => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  });

  // Met à jour le texte de l'élément .bmi-value avec l'IMC calculé
  displayBMI.textContent = BMI;
  // Change la couleur du texte selon la catégorie trouvée
  displayBMI.style.color = `${rank.color}`;
  // Met à jour le texte de résultat avec le nom de la catégorie
  result.textContent = `Résultat : ${rank.name}`;
}
