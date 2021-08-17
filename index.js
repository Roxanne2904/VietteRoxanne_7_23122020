let datas;
// ---
let uniqueDataIngredients = [];
let uniqueDataAppareils = [];
let uniqueDataUstensiles = [];
// ---
const ingredientsUl = document.getElementById("ingredients__ul");
const appareilsUl = document.getElementById("appareil__ul");
const ustensilesUl = document.getElementById("ustensiles__ul");
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
const displayEltsIntoInInputsLists = async () => {
  await fetchDatas();
  // ---------------
  // __________________________________________________________________________________
  // INJECTION DES DONNEES DYNAMIQUE DES INGREDIENT, DES APPAREILS ET DES UNSTENSILES;
  // __________________________________________________________________________________
  let dataIngredients;
  let dataAppareils;
  let dataUstensiles;
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
  // ----------------
  // Déclaration de la fonction qui filtre pour chaque tableaux de données;

  isFilteringEatchDataInArray(dataIngredients, uniqueDataIngredients);
  isFilteringEatchDataInArray(dataAppareils, uniqueDataAppareils);
  isFilteringEatchDataInArray(dataUstensiles, uniqueDataUstensiles);

  // ----------------
  // Injection des données;

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
  // la fonction du onclick;
  const IsOpeningTheList = (ulBlock) => {
    //liBlock)
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
      label.innerHTML = '<i class="fas fa-chevron-down"></i>';
    } else {
      inputs.setAttribute(
        "placeholder",
        `Recherche un ${NoUpperCaseInputName}`
      );
      label.innerHTML = ' <i class="fas fa-chevron-up"></i>';
    }
    // List appearence (close or open);
    ulBlock.classList.toggle("openUlBlocks");
    // liBlock.forEach((elt) => {
    //   elt.classList.toggle("openLiBlocks");
    // });
    inputBgd.classList.toggle("openInputsBgd");
    inputs.classList.toggle("openInputs");
    ulBlock.parentElement.classList.toggle("openContent");
  };
  // event onclick sur les inputs secondaires;
  const islaunchingOnclickEventToInputs = (icone, ulBlock) => {
    //liBlock
    icone.addEventListener("click", () => {
      IsOpeningTheList(ulBlock); //liBlock);
    });
  };
  // ----------------
  // l'appel des fonctions qui lancent les onclicks;
  islaunchingOnclickEventToInputs(
    iconeIngredient,
    ingredientsUl
    //ingredientsLi
  );
  islaunchingOnclickEventToInputs(iconeAppareil, appareilsUl); //appareilsLi);
  islaunchingOnclickEventToInputs(iconeUstensiles, ustensilesUl); //ustensilesLi);
  // ----------------
};

const displayRecipesDynamically = async () => {
  await displayEltsIntoInInputsLists();
  // -----
  // DON ELEMENTS
  const mainInput = document.querySelector(
    ".form__fieldset__bgdMain__inputMain"
  );
  // ---
  // const inputIngredients = document.querySelector("#ingredients");
  // const inputAppareils = document.querySelector("#appareil");
  // const inputUstensiles = document.querySelector("#ustensiles");
  // ---
  const form = document.querySelector("#myform");
  const ulRecipes = document.querySelector(".bgdRecipes");
  // ---
  // 0) On injecte toute les données dynamique dès le début;
  displayRecipes(datas.recipes, ulRecipes);
  // ---
  // 1) On met un preventDefault sur le submit du form;
  (function onSubmit() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  })();
  // ---
  // 2) On met en place l'event "onInput" du main input;
  function IslaunchingOnInputEvent(input) {
    function displayRecipesMatchingWithValue(event) {
      // ---
      let value = currentValue(event.target.value);
      let isValid = input.validity.valid;
      // ---
      // 2)a. On vérifie si le main input répond à la condition des 3 caractères;
      if (!isValid) {
        // ulRecipes.innerHTML = "";
        displayRecipes(datas.recipes, ulRecipes);
        // function displayKeywordsLists(list, content) {
        //   content.innerHTML = list
        //     .map(
        //       (ingredient) =>
        //         `<li class="form__fieldset__bgd__content__ul__li ingredients__li">${ingredient}</li>`
        //     )
        //     .join("");
        // }
        displayKeywordsLists(uniqueDataIngredients, ingredientsUl);
        displayKeywordsLists(uniqueDataAppareils, appareilsUl);
        displayKeywordsLists(uniqueDataUstensiles, ustensilesUl);
      } else {
        // ---
        // 2)b. Fonction qui sert pour filtrer les recettes en fonction de la valeur input;
        function recipesIsMatching(obj) {
          // ---
          let applianceIsMatchingValue = currentValue(obj.appliance).includes(
            value
          );
          // ---
          let descriptionIsMatchingValue = currentValue(
            obj.description
          ).includes(value);
          // ---
          let nameIsMatchingValue = currentValue(obj.name).includes(value);
          // ---
          let ingredientIsMatchingValue = obj.ingredients
            .map((ingredient) => {
              return currentValue(ingredient.ingredient);
            })
            .some((ingredient) => {
              return ingredient.includes(value);
            }); // tout les ingredients d'une recette retourne un true ou false si il match avec la valeur de l'input;
          // ---
          let quantityIsMatchingValue = obj.ingredients
            .map((ingredient) => {
              if (ingredient.quantity != undefined) {
                return ingredient.quantity.toString();
              }
            })
            .some((quantity) => {
              if (quantity != undefined) {
                return quantity.includes(value);
              }
            });
          // ---
          let unitIsMatchingValue = obj.ingredients
            .map((ingredient) => {
              if (ingredient.unit != undefined) {
                return currentValue(ingredient.unit);
              }
            })
            .some((unit) => {
              if (unit != undefined) {
                return unit.includes(value);
              }
            });
          // ---
          let ustensilIsMatchingValue = obj.ustensils.some((ustensil) => {
            return currentValue(ustensil).includes(value);
          });
          // ---
          if (
            applianceIsMatchingValue === true ||
            descriptionIsMatchingValue === true ||
            nameIsMatchingValue === true ||
            obj.id.toString().includes(value) === true ||
            obj.servings.toString().includes(value) === true ||
            ingredientIsMatchingValue === true ||
            quantityIsMatchingValue === true ||
            unitIsMatchingValue === true ||
            ustensilIsMatchingValue === true
          ) {
            return true;
          }
        }
        // 2)c. On Obtient un array qui contient les recettes correspondantes;
        // ---
        let matchingRecipesArray = datas.recipes.filter(recipesIsMatching);
        // ---
        // 2)d. On vérifie que il y a au moins une recette qui match avec la valeur input,
        //      puis on injecte les données;
        (function displayMatchingRecipes() {
          if (matchingRecipesArray.length === 0) {
            return (ulRecipes.innerHTML = `<div id="errorMsg">« Aucune recette ne correspond à votre critère… vous pouvez
            chercher « tarte aux pommes », « poisson », etc.</div>
            `);
          } else {
            // return (ulRecipes.innerHTML = matchingRecipesArray
            //   .map((recipe) => {
            //     return `<!-- BLOCK RECIPES 01 -->
            //     <li class="bgdRecipes__block">
            //       <!-- content img or bgd -->
            //       <div class="bgdRecipes__block__bgdImg"></div>
            //       <!-- content txt -->
            //       <div class="bgdRecipes__block__bgdText">
            //         <!-- title -->
            //         <div class="bgdRecipes__block__bgdText__contentTitle">
            //           <span class="bgdRecipes__block__bgdText__contentTitle__title"
            //             >${recipe.name}</span
            //           >
            //           <span class="bgdRecipes__block__bgdText__contentTitle__time"
            //             ><span
            //               class="
            //                 bgdRecipes__block__bgdText__contentTitle__time__clockIcone
            //               "
            //               ><i class="far fa-clock"></i></span
            //             ><span class="
            //             bgdRecipes__block__bgdText__contentTitle__time__nbs
            //           ">${recipe.time} min</span></span
            //           >
            //         </div>
            //         <div class="bgdRecipes__block__bgdText__contentDatasRecipes">
            //           <!-- ingredients -->
            //           <ul
            //           class="
            //             bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients
            //           "
            //         >${recipe.ingredients
            //           .map((ingredient) => {
            //             if (
            //               ingredient.quantity === undefined &&
            //               ingredient.unit === undefined
            //             ) {
            //               return `<li
            //               class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients
            //               "
            //               >
            //               <strong class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients__strong"
            //               >
            //               ${ingredient.ingredient}</strong>
            //               </li>`;
            //             } else if (
            //               ingredient.quantity != undefined &&
            //               ingredient.unit === undefined
            //             ) {
            //               return `<li
            //               class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients
            //               "
            //               >
            //               <strong class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients__strong"
            //               >
            //               ${ingredient.ingredient} :</strong> ${ingredient.quantity}
            //               </li>`;
            //             } else {
            //               return `<li
            //               class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients
            //               "
            //               >
            //               <strong class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients__strong"
            //               >
            //               ${ingredient.ingredient} :</strong> ${ingredient.quantity} ${ingredient.unit}
            //               </li>`;
            //             }
            //           })
            //           .join("")}
            //         </ul>
            //           <!-- recipes -->
            //           <div
            //             class="
            //               bgdRecipes__block__bgdText__contentDatasRecipes__contentRecipes
            //             "
            //           >
            //             <span
            //               class="
            //                 bgdRecipes__block__bgdText__contentDatasRecipes__contentRecipes__recipes
            //               "
            //               >${recipe.description}</span
            //             >
            //           </div>
            //         </div>
            //       </div>
            //     </li>`;
            //   })
            //   .join(""));
            return displayRecipes(matchingRecipesArray, ulRecipes);
          }
        })();
        // ---
        // 3). On met à jour les ingedients, ustensils et appareils des recettes proposées;
        const isUpdatingSecondariesInputsElements = (
          uniqueDataList,
          content
        ) => {
          // 3)a. On met en place la fonction qui va filtrer;
          function keywordsIsMatchingWithRecipes(elt) {
            let currentElt = currentValue(elt);
            // console.log(currentElt);
            if (uniqueDataList === uniqueDataIngredients) {
              let ingredientFromRecipes = matchingRecipesArray
                .map((ingredient) => {
                  return ingredient.ingredients.map((ingredient) => {
                    return currentValue(ingredient.ingredient);
                  });
                })
                .some((ingredient) => {
                  return ingredient.includes(currentElt);
                });

              if (ingredientFromRecipes === true) {
                return true;
              }
            } else if (uniqueDataList === uniqueDataAppareils) {
              let appareilsFromRecipes = matchingRecipesArray
                .map((appareil) => {
                  return currentValue(appareil.appliance);
                })
                .some((appareil) => {
                  return appareil.includes(currentElt);
                });
              if (appareilsFromRecipes === true) {
                return true;
              }
            } else if (uniqueDataList === uniqueDataUstensiles) {
              console.log("je suis bien un ustensiles");
              let ustensilesFromRecipes = matchingRecipesArray
                .map((ustensil) => {
                  return ustensil.ustensils.map((ustensil) => {
                    return currentValue(ustensil);
                  });
                })
                .some((ustensil) => {
                  return ustensil.includes(currentElt);
                });
              console.log(ustensilesFromRecipes);
              if (ustensilesFromRecipes === true) {
                return true;
              }
            }
          }
          let matchingElements = uniqueDataList.filter(
            keywordsIsMatchingWithRecipes
          );
          // 3)b. Une fois les bons elments filtrés on les affiche avec un innerHTML;
          if (matchingRecipesArray.length === 0) {
            // return (content.innerHTML = uniqueDataList
            //   .map(
            //     (ingredient) =>
            //       `<li class="form__fieldset__bgd__content__ul__li ingredients__li">${ingredient}</li>`
            //   )
            //   .join(""));
            return displayKeywordsLists(uniqueDataList, content);
          }
          // return (content.innerHTML = matchingElements
          //   .map(
          //     (ingredient) =>
          //       `<li class="form__fieldset__bgd__content__ul__li ingredients__li">${ingredient}</li>`
          //   )
          //   .join(""));
          return displayKeywordsLists(matchingElements, content);
        };
        // ---
        isUpdatingSecondariesInputsElements(
          uniqueDataIngredients,
          ingredientsUl
        );
        isUpdatingSecondariesInputsElements(uniqueDataAppareils, appareilsUl);
        isUpdatingSecondariesInputsElements(uniqueDataUstensiles, ustensilesUl);
      }
    }
    input.addEventListener("input", displayRecipesMatchingWithValue);
  }
  IslaunchingOnInputEvent(mainInput);
};

window.addEventListener("load", () => {
  displayRecipesDynamically();
});
