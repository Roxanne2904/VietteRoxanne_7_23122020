let datas;
// ----------------------------------------
const fetchDatas = async () => {
  datas = await fetch("./datas/recipes.json")
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return body;
    });
};
// ----------------------------------------
const showDatasIntoInputs = async () => {
  await fetchDatas();
  // ----------------
  const ingredientsUl = document.getElementById("ingredients__ul");
  const appareilsUl = document.getElementById("appareil__ul");
  const ustensilesUl = document.getElementById("ustensiles__ul");
  // ----------------
  // __________________________________________________________________________________
  // INJECTION DES DONNEES DYNAMIQUE DES INGREDIENT, DES APPAREILS ET DES UNSTENSILES;
  // __________________________________________________________________________________
  let dataIngredients;
  let dataAppareils;
  let dataUstensiles;
  // ----------------
  let uniqueDataIngredients = [];
  let uniqueDataAppareils = [];
  let uniqueDataUstensiles = [];
  // ----------------
  dataIngredients = datas.recipes
    .map((data) => {
      return data.ingredients.map((ingredient) => {
        return ingredient.ingredient;
      });
    })
    .flat()
    .sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
  // ----------------
  dataAppareils = datas.recipes
    .map((data) => {
      return data.appliance;
    })
    .sort();
  // ----------------
  dataUstensiles = datas.recipes
    .map((data) => {
      return data.ustensils;
    })
    .flat()
    .sort((a, b) => a.localeCompare(b, "fr", { ignorePunctuation: true }));
  // ----------------
  // Mise en place de la foncton pour filtrer;
  let stockage = {};
  const isFilteringEatchDataInArray = (arrayDatas, arrayWithUniqueElts) => {
    arrayDatas.forEach((ingredient) => {
      let result = ingredient;
      //-----
      if (result[result.length - 1] === "s") {
        result = result.substring(0, result.length - 1);
      }
      if (result[result.length - 1] === ".") {
        result = result.substring(0, result.length - 1);
      }
      result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      result = result.toLowerCase();
      if (!stockage[result] === true) {
        stockage[result] = true;
        arrayWithUniqueElts.push(ingredient);
      }
    });
  };
  // Déclaration de la fonction qui filtre pour chaque tableaux de données;

  isFilteringEatchDataInArray(dataIngredients, uniqueDataIngredients);
  isFilteringEatchDataInArray(dataAppareils, uniqueDataAppareils);
  isFilteringEatchDataInArray(dataUstensiles, uniqueDataUstensiles);

  // ----------------
  ingredientsUl.innerHTML = uniqueDataIngredients
    .map((ingredient) => {
      return `<li class="form__fieldset__bgd__content__ul__li ingredients__li">${ingredient}</li>`;
    })
    .join("");
  appareilsUl.innerHTML = uniqueDataAppareils
    .map((appareil) => {
      return `<li class="form__fieldset__bgd__content__ul__li appareils__li">${appareil}</li>`;
    })
    .join("");
  ustensilesUl.innerHTML = uniqueDataUstensiles
    .map((ustensil) => {
      return `<li class="form__fieldset__bgd__content__ul__li ustensiles__li">${ustensil}</li>`;
    })
    .join("");
  // ________________________________________________________________________________________
  // EVENT ONCLICK SUR LES INPUTS
  // ________________________________________________________________________________________
  // ----------------
  // DOM ELTS
  // ----------------
  const ingredientsLi = document.querySelectorAll(".ingredients__li");
  const appareilsLi = document.querySelectorAll(".appareils__li");
  const ustensilesLi = document.querySelectorAll(".ustensiles__li");
  // ----------------
  const iconeIngredient = document.getElementById("label__ingredient");
  const iconeAppareil = document.getElementById("label__appareil");
  const iconeUstensiles = document.getElementById("label__ustensiles");
  // ----------------
  const IsOpeningTheList = (ulBlock, liBlock) => {
    const inputs =
      ulBlock.parentElement.firstChild.nextElementSibling.firstChild
        .nextElementSibling;
    const inputBgd = ulBlock.parentElement.firstChild.nextElementSibling;
    const label =
      ulBlock.parentElement.firstChild.nextElementSibling.firstChild
        .nextElementSibling.nextElementSibling;
    const NoUpperCaseInputName = inputs.id;
    const UpperCaseInputName = inputs.dataset.value;
    // -----------------
    // placeholder value
    if (inputs.placeholder === `Recherche un ${NoUpperCaseInputName}`) {
      inputs.setAttribute("placeholder", `${UpperCaseInputName}`);
      label.innerHTML = "<i class=\"fas fa-chevron-down\"></i>";
    } else {
      inputs.setAttribute(
        "placeholder",
        `Recherche un ${NoUpperCaseInputName}`
      );
      label.innerHTML = " <i class=\"fas fa-chevron-up\"></i>";
    }
    // List appearence (close or open);
    ulBlock.classList.toggle("openUlBlocks");
    liBlock.forEach((elt) => {
      elt.classList.toggle("openLiBlocks");
    });
    inputBgd.classList.toggle("openInputsBgd");
    inputs.classList.toggle("openInputs");
    ulBlock.parentElement.classList.toggle("openContent");
  };
  const islaunchingOnclickEventToInputs = (icone, ulBlock, liBlock) => {
    icone.addEventListener("click", () => {
      IsOpeningTheList(ulBlock, liBlock);
    });
  };
  // ----------------
  islaunchingOnclickEventToInputs(
    iconeIngredient,
    ingredientsUl,
    ingredientsLi
  );
  islaunchingOnclickEventToInputs(iconeAppareil, appareilsUl, appareilsLi);
  islaunchingOnclickEventToInputs(iconeUstensiles, ustensilesUl, ustensilesLi);
  // ----------------
};

window.addEventListener("load", () => {
  showDatasIntoInputs();
});
