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
      let arrayResult = [];
      //-----
      if (result[result.length - 1] === "s") {
        result = result.substring(0, result.length - 1);
      }
      if (result[result.length - 1] === ".") {
        result = result.substring(0, result.length - 1);
      }

      result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      result = result.toLowerCase();
      // ---
      arrayResult = Array.from(result);
      result = arrayResult.filter(function (ele, pos) {
        return arrayResult.indexOf(ele) == pos;
      });
      result = result.join("").toString();
      // ---
      // ---
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
  // const ingredientsLi = document.querySelectorAll(".ingredients__li");
  // const appareilsLi = document.querySelectorAll(".appareils__li");
  // const ustensilesLi = document.querySelectorAll(".ustensiles__li");
  // ----------------
  // la fonction du onclick;
  // const IsOpeningTheList = (ulBlock) => {
  //   //liBlock)
  //   const inputs =
  //     ulBlock.parentElement.firstChild.nextElementSibling.firstChild
  //       .nextElementSibling;
  //   const inputBgd = ulBlock.parentElement.firstChild.nextElementSibling;
  //   const label =
  //     ulBlock.parentElement.firstChild.nextElementSibling.firstChild
  //       .nextElementSibling.nextElementSibling;
  //   const NoUpperCaseInputName = inputs.id;
  //   const UpperCaseInputName = inputs.dataset.value;
  //   // -----------------
  //   // placeholder value
  //   if (inputs.placeholder === `Recherche un ${NoUpperCaseInputName}`) {
  //     inputs.setAttribute("placeholder", `${UpperCaseInputName}`);
  //     label.innerHTML = '<i class="fas fa-chevron-down"></i>';
  //   } else {
  //     inputs.setAttribute(
  //       "placeholder",
  //       `Recherche un ${NoUpperCaseInputName}`
  //     );
  //     label.innerHTML = ' <i class="fas fa-chevron-up"></i>';
  //   }
  //   // List appearence (close or open);
  //   ulBlock.classList.toggle("openUlBlocks");
  //   // liBlock.forEach((elt) => {
  //   //   elt.classList.toggle("openLiBlocks");
  //   // });
  //   inputBgd.classList.toggle("openInputsBgd");
  //   inputs.classList.toggle("openInputs");
  //   ulBlock.parentElement.classList.toggle("openContent");
  // };

  // event onclick sur les inputs secondaires;
  const islaunchingOnclickEventToInputs = (icone, ulBlock, click) => {
    //liBlock
    icone.addEventListener("click", () => {
      openTheList(ulBlock, click); //liBlock);
    });
  };
  // ----------------
  // l'appel des fonctions qui lancent les onclicks;
  islaunchingOnclickEventToInputs(iconeIngredient, ingredientsUl, true);
  islaunchingOnclickEventToInputs(iconeAppareil, appareilsUl, true); //appareilsLi);
  islaunchingOnclickEventToInputs(iconeUstensiles, ustensilesUl, true); //ustensilesLi);
  // ----------------
};
// ----------------------------------------
const displayRecipesDynamically = async () => {
  await displayEltsIntoInInputsLists();
  // -----
  // 0) On injecte toute les données dynamique dès le début;
  //    et on vérifie de bien remettre les données à jours lors du changement de valeur;
  window.addEventListener("click", () => {
    if (mainInput.value.length === 0) {
      return updateTheSearch(value);
    }
  });
  mainInput.addEventListener("keydown", (e) => {
    let event = e.key;
    if (event === "Enter") {
      return updateTheSearch(value);
    }
  });
  // ---
  displayRecipes(datas.recipes, ulRecipes);
  // ---
  // 1) On met un preventDefault sur le submit du form;
  (function onSubmit() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  })();
  // ---
  //1)a.Feature02- On prépare la map;
  // ---

  // datas.recipes.forEach((elt) => {
  //   let words = elt.name.split(" ");
  //   let description = elt.description.split(" ");
  //   let title = [elt.name];
  //   let arrayIngre = elt.ingredients.map((elt) => {
  //     return elt.ingredient;
  //   });
  //   // ---
  //   let appliance = currentTitle(elt.appliance);
  //   let fullTxtAppliance = currentValueNotUniqueCharacter(elt.appliance);
  //   // ---
  //   let ustensil = elt.ustensils.map((elt) => {
  //     return currentTitle(elt);
  //   });
  //   // ---
  //   ustensil.forEach((elt) => {
  //     let fullTxt = currentValueNotUniqueCharacter(elt);
  //     fullTxt = currentEltFromTxtDescription(fullTxt);
  //     return stockWords.push([elt, fullTxt]);
  //   });
  //   // ---
  //   stockWords.push([appliance, fullTxtAppliance]);
  //   // ---
  //   words.forEach((elt) => {
  //     let fullTxt = currentValueNotUniqueCharacter(elt);
  //     fullTxt = currentEltFromTxtDescription(fullTxt);
  //     elt = currentValue(elt);
  //     if (elt.length >= 2) {
  //       return stockWords.push([elt, fullTxt]);
  //     }
  //   });
  //   // ---
  //   arrayIngre.forEach((elt) => {
  //     let fullTxt = currentValueNotUniqueCharacter(elt);
  //     fullTxt = currentEltFromTxtDescription(fullTxt);
  //     elt = currentTitle(elt);
  //     return stockWords.push([elt, fullTxt]);
  //   });
  //   // ---
  //   description.forEach((elt) => {
  //     let fullTxt = currentValueNotUniqueCharacter(elt);
  //     fullTxt = currentEltFromTxtDescription(fullTxt);
  //     elt = currentValue(elt);
  //     elt = currentEltFromTxtDescription(elt);
  //     if (elt.length >= 2) {
  //       return stockWords.push([elt, fullTxt]);
  //     }
  //   });
  //   // ---
  //   title.forEach((elt) => {
  //     words = words
  //       .map((elt) => {
  //         elt = currentValueNotUniqueCharacter(elt);
  //         elt = currentEltFromTxtDescription(elt);

  //         return (elt = elt.toString());
  //       })
  //       .join("");
  //     words = currentValue(words);
  //     let fullTxt = currentValueNotUniqueCharacter(elt);
  //     fullTxt = currentEltFromTxtDescription(fullTxt);
  //     return stockWords.push([words, fullTxt]);
  //   });
  // });
  // // ---
  // // On filtre pour éviter les doublons;
  // // ---
  // stockWords = stockWords
  //   .filter((obj, index, array) => {
  //     return array.findIndex((t) => t[0] === obj[0]) === index;
  //   })
  //   .sort();
  // // ---
  // // On attribue les bonnes recettes aux bons mots clef de la map;
  // // ---
  // stockWords.forEach((ele) => {
  //   let fullWord = currentValueNotUniqueCharacter(ele[1]);
  //   ele = ele[0];
  //   // ---
  //   RecipesMatchWithNames = datas.recipes.filter((obj) => {
  //     let name = currentTitle(obj.name);
  //     let description = currentValueNotUniqueCharacter(obj.description);
  //     // ---
  //     let ingredient = obj.ingredients
  //       .map((elt) => {
  //         elt = currentTitle(elt.ingredient);
  //         return elt.includes(ele);
  //       })
  //       .some((elt) => elt === true);
  //     // ---
  //     let appliance = currentTitle(obj.appliance);
  //     appliance = currentEltFromTxtDescription(appliance);
  //     // ---
  //     let ustensil = obj.ustensils
  //       .map((elt) => {
  //         elt = currentTitle(elt);
  //         return elt.includes(ele);
  //       })
  //       .some((elt) => elt === true);
  //     // ---
  //     // ---
  //     if (
  //       name.includes(ele) ||
  //       description.includes(fullWord) ||
  //       ingredient === true ||
  //       appliance.includes(ele) ||
  //       ustensil === true
  //       // title.includes(ele)
  //     ) {
  //       return true;
  //     }
  //   });
  //   stockDatasToMap.push([ele, RecipesMatchWithNames]);
  // });

  // // On trie le tout, par ordre alphabétique;
  // stockDatasToMap = stockDatasToMap.sort(function compare(a, b) {
  //   return a[0].localeCompare(b[0]);
  // });
  // // ---
  // // On obtient notre map;
  // myMap = new Map(stockDatasToMap);
  // // console.log(myMap);

  // --- Fin de la création de la map;

  // 2) On met en place la fonction pour le "onInput" du main input;
  function displayRecipesMatchingWithMainInputValue(event) {
    // ---
    value = event.target.value;
    value = value
      .split(" ")
      .map((elt) => {
        elt = currentValueNotUniqueCharacter(elt);
        elt = currentEltFromTxtDescription(elt);
        return (elt = elt.toString());
      })
      .join("");
    // ---
    valueNotUniqueCharacter = value;
    value = currentValue(value);
    // ---
    value = value.split("").map((elt) => {
      if (elt.includes(" ") === true) {
        return "";
      }
      return elt;
    });
    if (value.indexOf("") === value.length - 1) {
      value = value.splice(value.length - 1, 1);
      return value.toString();
    }
    // ---
    value = value.join("");
    //  ---
    isValid = mainInput.validity.valid;
    // ---
    // 2)a. On vérifie si le main input répond à la condition des 3 caractères;
    if (!isValid) {
      // ---
      displayRecipes(datas.recipes, ulRecipes);
      // ---
      displayKeywordsLists(uniqueDataIngredients, ingredientsUl);
      displayKeywordsLists(uniqueDataAppareils, appareilsUl);
      displayKeywordsLists(uniqueDataUstensiles, ustensilesUl);
      // ---
    } else {
      //FEATURE01

      // 2)b. Fonction qui sert pour filtrer les recettes en fonction de la valeur input;
      function recipesIsMatchingWithMainInput(obj) {
        // ---
        let applianceIsMatchingValue = currentTitle(obj.appliance).includes(
          value
        );
        // ---
        let descriptionIsMatchingValue = currentValueNotUniqueCharacter(
          obj.description
        ).includes(valueNotUniqueCharacter);
        // ---
        let nameIsMatchingValue = currentTitle(obj.name).includes(value);
        // ---
        let ingredientIsMatchingValue = obj.ingredients
          .map((ingredient) => {
            return currentTitle(ingredient.ingredient);
          })
          .some((ingredient) => {
            return ingredient.includes(value);
          }); // tout les ingredients d'une recette retourne un true ou false si il match avec la valeur de l'input;
        // ---
        // let quantityIsMatchingValue = obj.ingredients
        //   .map((ingredient) => {
        //     if (ingredient.quantity != undefined) {
        //       return ingredient.quantity.toString();
        //     }
        //   })
        //   .some((quantity) => {
        //     if (quantity != undefined) {
        //       return quantity.includes(value);
        //     }
        //   });
        // ---
        // let unitIsMatchingValue = obj.ingredients
        //   .map((ingredient) => {
        //     if (ingredient.unit != undefined) {
        //       return currentValue(ingredient.unit);
        //     }
        //   })
        //   .some((unit) => {
        //     if (unit != undefined) {
        //       return unit.includes(value);
        //     }
        //   });
        // ---
        let ustensilIsMatchingValue = obj.ustensils.some((ustensil) => {
          return currentTitle(ustensil).includes(value);
        });
        // ---
        if (
          applianceIsMatchingValue === true ||
          descriptionIsMatchingValue === true ||
          nameIsMatchingValue === true ||
          // obj.id.toString().includes(value) === true ||
          // obj.servings.toString().includes(value) === true ||
          ingredientIsMatchingValue === true ||
          // quantityIsMatchingValue === true ||
          // unitIsMatchingValue === true ||
          ustensilIsMatchingValue === true
        ) {
          return true;
        }
      }
      // 2)c. On Obtient un array qui contient les recettes correspondantes;
      // ---
      matchingRecipesArray = datas.recipes.filter(
        recipesIsMatchingWithMainInput
      );

      // ---
      // --- fin de FEATURE01

      //FEATURE02

      // console.log(value);
      // console.log(myMap);

      // if (myMap.get(value) === undefined) {
      //   console.log("le mot n'est pas dans la map");
      //   let retrieveTheRightMapKey = stockDatasToMap.find((elt) => {
      //     // console.log(elt[0]);
      //     // console.log(elt[0].startsWith(value));
      //     if (value.indexOf("d") === value.length - 1) {
      //       value = value.substring(0, value.length - 1);
      //       return elt[0].startsWith(value);
      //     } else {
      //       return elt[0].startsWith(value);
      //     }
      //   });
      //   console.log(retrieveTheRightMapKey);
      //   if (retrieveTheRightMapKey != undefined) {
      //     retrieveTheRightMapKey = retrieveTheRightMapKey[0];
      //     matchingRecipesArray = myMap.get(retrieveTheRightMapKey);
      //   } else {
      //     matchingRecipesArray = [];
      //   }
      // } else {
      //   console.log("le mot est dans la map");
      //   matchingRecipesArray = myMap.get(value);
      // }

      // --- fin de FEATURE02

      // 2)d. On vérifie que il y a au moins une recette qui match avec la valeur input,
      //      puis on injecte les données;
      (function displayMatchingRecipes() {
        // ---
        if (matchingRecipesArray.length === 0) {
          return (ulRecipes.innerHTML = `<div id="errorMsg">« Aucune recette ne correspond à votre critère… vous pouvez
          chercher « tarte aux pommes », « poisson », etc.</div>
          `);
        } else {
          return displayRecipes(matchingRecipesArray, ulRecipes);
        }
      })();
      // ---
      // 2)e. On met à jour les ingedients, ustensils et appareils des recettes proposées;
      // ---
      isUpdatingSecondariesInputsElements(
        uniqueDataIngredients,
        ingredientsUl,
        "ingredient",
        matchingRecipesArray
      );
      isUpdatingSecondariesInputsElements(
        uniqueDataAppareils,
        appareilsUl,
        "appareil",
        matchingRecipesArray
      );
      isUpdatingSecondariesInputsElements(
        uniqueDataUstensiles,
        ustensilesUl,
        "ustensile",
        matchingRecipesArray
      );
    }
  }
  // __________________________________
  // Appel de la fonction du mainInput;
  mainInput.addEventListener("input", displayRecipesMatchingWithMainInputValue);
  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------

  // DEBUT DE L'ALGO DES INPUTS SECONDAIRES
  // -----------------------------------------------------------------------------
  // 3) On met en place la fonction "oninput" des inputs secondaires;
  function updateKeywordsLists(e, currentList, listIncludeMainValue) {
    let value = currentValue(e.target.value);
    let mainValue = mainInput.value;
    let matchingElemntsArray = [];
    // _________________________________________
    // --- La fonction pour filtrer
    function keywordsIsMatchingWithValue(elt) {
      let currentElt = currentValue(elt);
      if (currentElt.includes(value)) {
        return true;
      }
    }
    // --- La fonction pour afficher le resultat des mots clefs qui matchent avec la valeur input;
    function displayMatchingKeywordsListWithValue(
      list,
      listIncludeMainValue,
      content
    ) {
      if (value === "" || list.length === 0) {
        content.parentElement.firstChild.nextElementSibling.style.padding =
          "20px";
        content.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.style.opacity =
          "0.5";
        content.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.style.fontWeight =
          "100";
        if (mainValue != "") {
          displayKeywordsLists(listIncludeMainValue, content);
        } else {
          displayKeywordsLists(currentList, content);
        }
      } else {
        displayKeywordsLists(list, content);
        // updateLiAppearance(list, content);
      }
    }
    // ---
    // _________________________________________
    if (currentList === uniqueDataIngredients) {
      openTheList(ingredientsUl, false);
      if (mainValue != "") {
        matchingElemntsArray = listIncludeMainValue.filter(
          keywordsIsMatchingWithValue
        );
      } else {
        matchingElemntsArray = currentList.filter(keywordsIsMatchingWithValue);
      }
      displayMatchingKeywordsListWithValue(
        matchingElemntsArray,
        listIncludeMainValue,
        ingredientsUl
      );
    }
    if (currentList === uniqueDataAppareils) {
      openTheList(appareilsUl, false);
      if (mainValue != "") {
        matchingElemntsArray = listIncludeMainValue.filter(
          keywordsIsMatchingWithValue
        );
      } else {
        matchingElemntsArray = currentList.filter(keywordsIsMatchingWithValue);
      }
      displayMatchingKeywordsListWithValue(
        matchingElemntsArray,
        listIncludeMainValue,
        appareilsUl
      );
    }
    if (currentList === uniqueDataUstensiles) {
      openTheList(ustensilesUl, false);
      if (mainValue != "") {
        matchingElemntsArray = listIncludeMainValue.filter(
          keywordsIsMatchingWithValue
        );
      } else {
        matchingElemntsArray = currentList.filter(keywordsIsMatchingWithValue);
      }
      displayMatchingKeywordsListWithValue(
        matchingElemntsArray,
        listIncludeMainValue,
        ustensilesUl
      );
    }
  }
  // Appel de la fonction sur inputs secondaires;
  // Ingredient;
  inputIngredients.addEventListener("input", (e) => {
    updateKeywordsLists(e, uniqueDataIngredients, matchingElementsIngredient);
  });
  // Appareil;
  inputAppareils.addEventListener("input", (e) => {
    updateKeywordsLists(e, uniqueDataAppareils, matchingElementsAppareil);
  });
  // Ustensiles
  inputUstensiles.addEventListener("input", (e) => {
    updateKeywordsLists(e, uniqueDataUstensiles, matchingElementsUstensile);
  });
  // ___________________________________
  // 4) ...enfin on met en place l'event onClick sur les keywords mis à jour, pour mettre
  //       en place les TAGS et afficher les recettes en fonction du main input et les secondaire!
  // ---
  function displayTagsAndRecipes(content, tagsStock) {
    // ---
    if (tagsStock.length === 0) {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
      // ---
      content.innerHTML = tagsStock
        .map((tag) => {
          let isAnAppareil = uniqueDataAppareils.includes(tag.text);
          let isAnUstensile = uniqueDataUstensiles.includes(tag.text);
          if (isAnAppareil === true) {
            return chooseTheRightCodeHtml(2, tag.text);
          } else if (isAnUstensile === true) {
            return chooseTheRightCodeHtml(3, tag.text);
          } else {
            return chooseTheRightCodeHtml(1, tag.text);
          }
        })
        .join("");
    }

    // 5).Une fois les tags affichés, on veut mettre en place l'affichage des recettes valides;
    // -----------------------------------------------------------------------------------------
    //--- On recupère les tags que l'on vient d'afficher;
    let liTags = document.querySelectorAll(".liTags");
    //--- On récupère la valeur de l'input main;
    let mainValue = mainInput.value;
    // ---
    let valueMatch;
    // ---
    function filterRecipesWithTags(obj) {
      return tagsStock.every((ele) => {
        if (ele.type === "ingredient") {
          valueMatch = obj.ingredients.map((ingredient) =>
            currentValue(ingredient.ingredient)
          );
          if (valueMatch.includes(ele.keyW)) {
            return true;
          }
        } else if (ele.type === "appareil") {
          valueMatch = currentValue(obj.appliance);
          if (valueMatch.includes(ele.keyW) === true) {
            return true;
          }
        } else if (ele.type === "ustensile") {
          valueMatch = obj.ustensils.map((ustensil) => currentValue(ustensil));
          if (valueMatch.includes(ele.keyW) === true) {
            return true;
          }
        }
      });
    }
    function chooseGeneralsTermsToDisplay() {
      if (mainValue != "" && isValid === true) {
        // console.log("il y a une valeur dans le main input");
        matchingRecipesArrayWithTags = matchingRecipesArray.filter(
          filterRecipesWithTags
        );
        // conditions d'affichages
        lookAtTermsToDisplay(matchingRecipesArray);
      } else {
        // console.log("il n'y a PAS de valeur dans le main input");
        matchingRecipesArrayWithTags = datas.recipes.filter(
          filterRecipesWithTags
        );
        // conditions d'affichages
        lookAtTermsToDisplay(datas.recipes);
      }
    }
    //display
    chooseGeneralsTermsToDisplay();
    // ---
    // --------------------------------------------------------------------------------

    //6).On veut ensuite retirer les tags...; on met en place un boucle sur chaque tag,
    //   pour lui attribuer "un remove" lors du click;
    for (let i = 0; i < liTags.length; i++) {
      // ---
      //On click : remove a TAG;
      liTags[i].addEventListener("click", () => {
        // ---
        let value = liTags[i].innerText;
        let indexOfValue = tagsStock.findIndex((t) => t.text === value);
        // ---
        tagsStock.forEach((ele) => {
          if (ele.text.includes(value) === true) {
            tagsStock.splice(indexOfValue, 1);

            liTags[i].remove();
            // -----------------------------------
            chooseGeneralsTermsToDisplay();
          }
        });
      });
    }
  }
  // ---
  function addTags(e, content, type) {
    let originalText = e.target.innerText;
    let value = currentValue(e.target.innerText);
    let stockage = {};
    // 1) On veut récupérer a chaque fois la bonne liste aveec les bons mots clefs;
    let currentList = [];
    for (let i = 0; i < content.children.length; i++) {
      let value = currentValue(content.children[i].innerText);
      currentList.push(value);
    }
    // ---
    stockage["keyW"] = value;
    // ---
    if (currentList.includes(stockage.keyW) === true) {
      class DataValue {
        constructor(keyW, text, type) {
          this.keyW = keyW;
          this.text = text;
          this.type = type;
          this[value] = true;
        }
      }
      // -----------------------------------------------
      tagsStock.push(new DataValue(value, originalText, type));
      // -----------------------------------------------
      tagsStock = tagsStock.filter(
        (obj, index, array) =>
          array.findIndex((t) => t.keyW === obj.keyW) === index
      );
      // -----------------------------------------------
      displayTagsAndRecipes(tagsUL, tagsStock, type);
    }
  }
  // ---
  function displayRecipesmatchingWithTagsAndMainInput(content, type) {
    content.addEventListener("click", (e) => {
      addTags(e, content, type);
    });
  }
  // ---
  displayRecipesmatchingWithTagsAndMainInput(ingredientsUl, "ingredient");
  displayRecipesmatchingWithTagsAndMainInput(appareilsUl, "appareil");
  displayRecipesmatchingWithTagsAndMainInput(ustensilesUl, "ustensile");
  // ---
};

window.addEventListener("load", () => {
  displayRecipesDynamically();
});
