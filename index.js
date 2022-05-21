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
  // ---
  displayRecipes(datas.recipes, ulRecipes);
  // console.log("j'affiche les données dynamiquements");
  // ---
  // 1) On met un preventDefault sur le submit du form;
  (function onSubmit() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  })();
  // ---

  // //1)a.Feature02- On prépare la map;

  // // ---
  // datas.recipes.forEach((elt) => {
  //   let words = elt.name.split(" ");
  //   let description = elt.description.split(" ");
  //   let title = [elt.name];
  //   let arrayIngre = elt.ingredients.map((elt) => {
  //     return elt.ingredient;
  //   });
  //   // ---
  //   let appliance = removeSpaceWordsAndModifyValue(elt.appliance);
  //   let fullTxtAppliance = cleanEltFromTxtDescription(
  //     modifyValueNotUniqueCharacter(elt.appliance)
  //   );
  //   // ---
  //   stockWords.push([appliance, fullTxtAppliance]);
  //   // ---
  //   let ustensil = elt.ustensils.map((elt) => {
  //     return removeSpaceWordsAndModifyValue(elt);
  //   });
  //   // ---
  //   ustensil.forEach((elt) => {
  //     let fullTxt = modifyValueNotUniqueCharacter(elt);
  //     fullTxt = cleanEltFromTxtDescription(fullTxt);
  //     return stockWords.push([elt, fullTxt]);
  //   });
  //   // ---
  //   // ---
  //   words.forEach((elt) => {
  //     let fullTxt = modifyValueNotUniqueCharacter(elt);
  //     fullTxt = cleanEltFromTxtDescription(fullTxt);
  //     elt = removeSpaceWordsAndModifyValue(elt);
  //     if (elt.length >= 2) {
  //       return stockWords.push([elt, fullTxt]);
  //     }
  //   });
  //   // ---
  //   arrayIngre.forEach((elt) => {
  //     let fullTxt = modifyValueNotUniqueCharacter(elt);
  //     fullTxt = cleanEltFromTxtDescription(fullTxt);
  //     elt = removeSpaceWordsAndModifyValue(elt);
  //     return stockWords.push([elt, fullTxt]);
  //   });
  //   // ---
  //   description.forEach((elt) => {
  //     let fullTxt = modifyValueNotUniqueCharacter(elt);
  //     fullTxt = cleanEltFromTxtDescription(fullTxt);
  //     elt = modifyValue(elt);
  //     elt = cleanEltFromTxtDescription(elt);
  //     if (elt.length >= 2) {
  //       return stockWords.push([elt, fullTxt]);
  //     }
  //   });
  //   // ---
  //   title.forEach((elt) => {
  //     words = words
  //       .map((elt) => {
  //         elt = modifyValueNotUniqueCharacter(elt);
  //         elt = cleanEltFromTxtDescription(elt);

  //         return (elt = elt.toString());
  //       })
  //       .join("");
  //     words = modifyValue(words);
  //     let fullTxt = modifyValueNotUniqueCharacter(elt);
  //     fullTxt = cleanEltFromTxtDescription(fullTxt);
  //     return stockWords.push([words, fullTxt]);
  //   });
  // });
  // // ---
  // // On filtre pour éviter les doublons;
  // // ---
  // stockWords = stockWords
  //   .filter((obj, index, array) => {
  //     return array.findIndex((t) => t[1] === obj[1]) === index;
  //   })
  //   .sort();
  // // ---
  // // On attribue les bonnes recettes aux bons mots clef de la map;
  // // ---
  // stockWords.forEach((ele) => {
  //   let fullWord = removeSpaceWords(ele[1]);
  //   ele = ele[0];

  //   // ---
  //   function RecipesMatchingWithsNames(value) {
  //     return datas.recipes.filter((obj) => {
  //       let fullTitle = removeSpaceWords(obj.name);

  //       let title = removeSpaceWords(obj.name)
  //         .split(" ")
  //         .map((elt) => {
  //           let currentElt = removeSpaceWords(elt);
  //           return currentElt.includes(value);
  //         })
  //         .some((elt) => elt === true);

  //       let description = removeSpaceWords(obj.description)
  //         .split(" ")
  //         .map((elt) => {
  //           return elt.includes(value);
  //         })
  //         .some((elt) => elt === true);

  //       // ---
  //       let ingredient = obj.ingredients
  //         .map((elt) => {
  //           elt = removeSpaceWords(elt.ingredient);
  //           return elt.includes(value);
  //         })
  //         .some((elt) => elt === true);

  //       // ---
  //       let appliance = removeSpaceWords(obj.appliance);
  //       appliance = cleanEltFromTxtDescription(appliance);

  //       // ---
  //       let ustensil = obj.ustensils
  //         .map((elt) => {
  //           elt = removeSpaceWords(elt);
  //           return elt.includes(value);
  //         })
  //         .some((elt) => elt === true);
  //       // ---
  //       if (
  //         title === true ||
  //         fullTitle.includes(value) ||
  //         description === true ||
  //         ingredient === true ||
  //         appliance.includes(value) ||
  //         ustensil === true
  //       ) {
  //         return true;
  //       }
  //     });
  //   }
  //   // ---
  //   stockDatasToMap.push([ele, RecipesMatchingWithsNames(ele)]);
  //   stockDatasToMap.push([fullWord, RecipesMatchingWithsNames(fullWord)]);
  // });

  // // On trie le tout, par ordre alphabétique;
  // stockDatasToMap = stockDatasToMap.sort(function compare(a, b) {
  //   return a[0].localeCompare(b[0]);
  // });
  // // ---
  // // On obtient notre map;
  // myMap = new Map(stockDatasToMap);
  // // --- Fin de la création de la map;

  // // 2) On met en place la fonction pour le "onInput" du main input;
  // function displayRecipesMatchingWithMainInputValue(event) {
  //   // ---
  //   value = event.target.value;

  //   value = value
  //     .split(" ")
  //     .map((elt) => {
  //       elt = modifyValueNotUniqueCharacter(elt);
  //       elt = cleanEltFromTxtDescription(elt);
  //       return (elt = elt.toString());
  //     })
  //     .join("");
  //   // ---
  //   value = value.split("").map((elt) => {
  //     if (elt.includes(" ") === true) {
  //       return "";
  //     }
  //     return elt;
  //   });
  //   if (value.indexOf("") === value.length - 1 && value.length != 0) {
  //     value = value.splice(value.length - 1, 1);
  //     return value.toString();
  //   }
  //   // ---
  //   value = value.join("");
  //   //  ---
  //   isValid = mainInput.validity.valid;
  //   // ---
  //   // 2)a. On vérifie si le main input répond à la condition des 3 caractères;
  //   if (!isValid) {
  //     // ---
  //     displayRecipes(datas.recipes, ulRecipes);
  //     // ---
  //     displayKeywordsLists(uniqueDataIngredients, ingredientsUl);
  //     displayKeywordsLists(uniqueDataAppareils, appareilsUl);
  //     displayKeywordsLists(uniqueDataUstensiles, ustensilesUl);
  //     // ---
  //   } else {
  //     //FEATURE02
  //     if (myMap.get(value) === undefined) {
  //       let retrieveTheRightMapKey = stockDatasToMap.find((elt) => {
  //         if (value.indexOf("d") === value.length - 1 || value === "tareu") {
  //           value = value.substring(0, value.length - 1);

  //           return elt[0].startsWith(value);
  //         } else {
  //           return elt[0].startsWith(value);
  //         }
  //       });
  //       // console.log(retrieveTheRightMapKey);
  //       if (retrieveTheRightMapKey != undefined) {
  //         retrieveTheRightMapKey = retrieveTheRightMapKey[0];
  //         matchingRecipesArray = myMap.get(retrieveTheRightMapKey);
  //       } else {
  //         matchingRecipesArray = [];
  //       }
  //     } else {
  //       // console.log("le mot est dans la map");
  //       matchingRecipesArray = myMap.get(value);
  //     }
  //     // --- fin de FEATURE02

  //     // 2)d. On vérifie que il y a au moins une recette qui match avec la valeur input,
  //     //      puis on injecte les données;
  //     (function displayMatchingRecipes() {
  //       // ---
  //       if (matchingRecipesArray.length === 0) {
  //         return (ulRecipes.innerHTML = `<div id="errorMsg">« Aucune recette ne correspond à votre critère… vous pouvez
  //         chercher « tarte aux pommes », « poisson », etc.</div>
  //         `);
  //       } else {
  //         return displayRecipes(matchingRecipesArray, ulRecipes);
  //       }
  //     })();
  //     // ---
  //     // 2)e. On met à jour les ingedients, ustensils et appareils des recettes proposées;
  //     // ---
  //     isUpdatingSecondariesInputsElements(
  //       uniqueDataIngredients,
  //       ingredientsUl,
  //       "ingredient",
  //       matchingRecipesArray
  //     );
  //     isUpdatingSecondariesInputsElements(
  //       uniqueDataAppareils,
  //       appareilsUl,
  //       "appareil",
  //       matchingRecipesArray
  //     );
  //     isUpdatingSecondariesInputsElements(
  //       uniqueDataUstensiles,
  //       ustensilesUl,
  //       "ustensile",
  //       matchingRecipesArray
  //     );
  //   }
  // }
  // // __________________________________
  // // Appel de la fonction du mainInput;
  // mainInput.addEventListener("input", displayRecipesMatchingWithMainInputValue);
  // // -----------------------------------------------------------------------------
  // // -----------------------------------------------------------------------------

  // // DEBUT DE L'ALGO DES INPUTS SECONDAIRES
  // // -----------------------------------------------------------------------------
  // // 3) On met en place la fonction "oninput" des inputs secondaires;
  // function updateKeywordsLists(e, currentList, listIncludeMainValue) {
  //   let value = modifyValue(e.target.value);
  //   let mainValue = mainInput.value;
  //   let matchingElemntsArray = [];
  //   // _________________________________________
  //   // --- La fonction pour filtrer
  //   function keywordsIsMatchingWithValue(elt) {
  //     let currentElt = modifyValue(elt);
  //     if (currentElt.includes(value)) {
  //       return true;
  //     }
  //   }
  //   // --- La fonction pour afficher le resultat des mots clefs qui matchent avec la valeur input;
  //   function displayMatchingKeywordsListWithValue(
  //     list,
  //     listIncludeMainValue,
  //     content
  //   ) {
  //     if (value === "" || list.length === 0) {
  //       content.parentElement.firstChild.nextElementSibling.style.padding =
  //         "20px";
  //       content.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.style.opacity =
  //         "0.5";
  //       content.parentElement.firstChild.nextElementSibling.firstChild.nextElementSibling.style.fontWeight =
  //         "100";
  //       if (mainValue != "") {
  //         displayKeywordsLists(listIncludeMainValue, content);
  //       } else {
  //         displayKeywordsLists(currentList, content);
  //       }
  //     } else {
  //       displayKeywordsLists(list, content);
  //       // updateLiAppearance(list, content);
  //     }
  //   }
  //   // ---
  //   // _________________________________________
  //   if (currentList === uniqueDataIngredients) {
  //     openTheList(ingredientsUl, false);
  //     if (mainValue != "") {
  //       matchingElemntsArray = listIncludeMainValue.filter(
  //         keywordsIsMatchingWithValue
  //       );
  //     } else {
  //       matchingElemntsArray = currentList.filter(keywordsIsMatchingWithValue);
  //     }
  //     displayMatchingKeywordsListWithValue(
  //       matchingElemntsArray,
  //       listIncludeMainValue,
  //       ingredientsUl
  //     );
  //   }
  //   if (currentList === uniqueDataAppareils) {
  //     openTheList(appareilsUl, false);
  //     if (mainValue != "") {
  //       matchingElemntsArray = listIncludeMainValue.filter(
  //         keywordsIsMatchingWithValue
  //       );
  //     } else {
  //       matchingElemntsArray = currentList.filter(keywordsIsMatchingWithValue);
  //     }
  //     displayMatchingKeywordsListWithValue(
  //       matchingElemntsArray,
  //       listIncludeMainValue,
  //       appareilsUl
  //     );
  //   }
  //   if (currentList === uniqueDataUstensiles) {
  //     openTheList(ustensilesUl, false);
  //     if (mainValue != "") {
  //       matchingElemntsArray = listIncludeMainValue.filter(
  //         keywordsIsMatchingWithValue
  //       );
  //     } else {
  //       matchingElemntsArray = currentList.filter(keywordsIsMatchingWithValue);
  //     }
  //     displayMatchingKeywordsListWithValue(
  //       matchingElemntsArray,
  //       listIncludeMainValue,
  //       ustensilesUl
  //     );
  //   }
  // }
  // // Appel de la fonction sur inputs secondaires;
  // // Ingredient;
  // inputIngredients.addEventListener("input", (e) => {
  //   updateKeywordsLists(e, uniqueDataIngredients, matchingElementsIngredient);
  // });
  // // Appareil;
  // inputAppareils.addEventListener("input", (e) => {
  //   updateKeywordsLists(e, uniqueDataAppareils, matchingElementsAppareil);
  // });
  // // Ustensiles
  // inputUstensiles.addEventListener("input", (e) => {
  //   updateKeywordsLists(e, uniqueDataUstensiles, matchingElementsUstensile);
  // });
  // // ___________________________________
  // // 4) ...enfin on met en place l'event onClick sur les keywords mis à jour, pour mettre
  // //       en place les TAGS et afficher les recettes en fonction du main input et les secondaire!
  // // ---
  // function displayTagsAndRecipes(content, tagsStock) {
  //   // ---
  //   if (tagsStock.length === 0) {
  //     content.style.display = "none";
  //   } else {
  //     content.style.display = "flex";
  //     // ---
  //     content.innerHTML = tagsStock
  //       .map((tag) => {
  //         let isAnAppareil = uniqueDataAppareils.includes(tag.text);
  //         let isAnUstensile = uniqueDataUstensiles.includes(tag.text);
  //         if (isAnAppareil === true) {
  //           return chooseTheRightCodeHtml(2, tag.text);
  //         } else if (isAnUstensile === true) {
  //           return chooseTheRightCodeHtml(3, tag.text);
  //         } else {
  //           return chooseTheRightCodeHtml(1, tag.text);
  //         }
  //       })
  //       .join("");
  //   }

  //   // 5).Une fois les tags affichés, on veut mettre en place l'affichage des recettes valides;
  //   // -----------------------------------------------------------------------------------------
  //   //--- On recupère les tags que l'on vient d'afficher;
  //   let liTags = document.querySelectorAll(".liTags");
  //   //--- On récupère la valeur de l'input main;
  //   let mainValue = mainInput.value;
  //   // ---
  //   let valueMatch;
  //   // ---
  //   function filterRecipesWithTags(obj) {
  //     return tagsStock.every((ele) => {
  //       if (ele.type === "ingredient") {
  //         valueMatch = obj.ingredients.map((ingredient) =>
  //           modifyValue(ingredient.ingredient)
  //         );
  //         if (valueMatch.includes(ele.keyW)) {
  //           return true;
  //         }
  //       } else if (ele.type === "appareil") {
  //         valueMatch = modifyValue(obj.appliance);
  //         if (valueMatch.includes(ele.keyW) === true) {
  //           return true;
  //         }
  //       } else if (ele.type === "ustensile") {
  //         valueMatch = obj.ustensils.map((ustensil) => modifyValue(ustensil));
  //         if (valueMatch.includes(ele.keyW) === true) {
  //           return true;
  //         }
  //       }
  //     });
  //   }
  //   function chooseGeneralsTermsToDisplay() {
  //     if (mainValue != "" && isValid === true) {
  //       // console.log("il y a une valeur dans le main input");
  //       matchingRecipesArrayWithTags = matchingRecipesArray.filter(
  //         filterRecipesWithTags
  //       );
  //       // conditions d'affichages
  //       lookAtTermsToDisplay(matchingRecipesArray);
  //     } else {
  //       // console.log("il n'y a PAS de valeur dans le main input");
  //       matchingRecipesArrayWithTags = datas.recipes.filter(
  //         filterRecipesWithTags
  //       );
  //       // conditions d'affichages
  //       lookAtTermsToDisplay(datas.recipes);
  //     }
  //   }
  //   //display
  //   chooseGeneralsTermsToDisplay();
  //   // ---
  //   // --------------------------------------------------------------------------------

  //   //6).On veut ensuite retirer les tags...; on met en place un boucle sur chaque tag,
  //   //   pour lui attribuer "un remove" lors du click;
  //   for (let i = 0; i < liTags.length; i++) {
  //     // ---
  //     //On click : remove a TAG;
  //     liTags[i].addEventListener("click", () => {
  //       // ---
  //       let value = liTags[i].innerText;
  //       let indexOfValue = tagsStock.findIndex((t) => t.text === value);
  //       // ---
  //       tagsStock.forEach((ele) => {
  //         if (ele.text.includes(value) === true) {
  //           tagsStock.splice(indexOfValue, 1);

  //           liTags[i].remove();
  //           // -----------------------------------
  //           chooseGeneralsTermsToDisplay();
  //         }
  //       });
  //     });
  //   }
  // }
  // // ---
  // function addTags(e, content, type) {
  //   let originalText = e.target.innerText;
  //   let value = modifyValue(e.target.innerText);
  //   let stockage = {};
  //   // 1) On veut récupérer a chaque fois la bonne liste aveec les bons mots clefs;
  //   let currentList = [];
  //   for (let i = 0; i < content.children.length; i++) {
  //     let value = modifyValue(content.children[i].innerText);
  //     currentList.push(value);
  //   }
  //   // ---
  //   stockage["keyW"] = value;
  //   // ---
  //   if (currentList.includes(stockage.keyW) === true) {
  //     class DataValue {
  //       constructor(keyW, text, type) {
  //         this.keyW = keyW;
  //         this.text = text;
  //         this.type = type;
  //         this[value] = true;
  //       }
  //     }
  //     // -----------------------------------------------
  //     tagsStock.push(new DataValue(value, originalText, type));
  //     // -----------------------------------------------
  //     tagsStock = tagsStock.filter(
  //       (obj, index, array) =>
  //         array.findIndex((t) => t.keyW === obj.keyW) === index
  //     );
  //     // -----------------------------------------------
  //     displayTagsAndRecipes(tagsUL, tagsStock, type);
  //   }
  // }
  // // ---
  // function displayRecipesmatchingWithTagsAndMainInput(content, type) {
  //   content.addEventListener("click", (e) => {
  //     addTags(e, content, type);
  //   });
  // }
  // // ---
  // displayRecipesmatchingWithTagsAndMainInput(ingredientsUl, "ingredient");
  // displayRecipesmatchingWithTagsAndMainInput(appareilsUl, "appareil");
  // displayRecipesmatchingWithTagsAndMainInput(ustensilesUl, "ustensile");
  // // ---
};

const buildTheMap = async () => {
  await fetchDatas();
  // console.log("la map se contruit");
  //1)a.Feature02- On prépare la map;
  // ---
  datas.recipes.forEach((elt) => {
    let words = elt.name.split(" ");
    let description = elt.description.split(" ");
    let title = [elt.name];
    let arrayIngre = elt.ingredients.map((elt) => {
      return elt.ingredient;
    });
    // ---
    let appliance = removeSpaceWordsAndModifyValue(elt.appliance);
    let fullTxtAppliance = cleanEltFromTxtDescription(
      modifyValueNotUniqueCharacter(elt.appliance)
    );
    // ---
    stockWords.push([appliance, fullTxtAppliance]);
    // ---
    let ustensil = elt.ustensils.map((elt) => {
      return removeSpaceWordsAndModifyValue(elt);
    });
    // ---
    ustensil.forEach((elt) => {
      let fullTxt = modifyValueNotUniqueCharacter(elt);
      fullTxt = cleanEltFromTxtDescription(fullTxt);
      return stockWords.push([elt, fullTxt]);
    });
    // ---
    // ---
    words.forEach((elt) => {
      let fullTxt = modifyValueNotUniqueCharacter(elt);
      fullTxt = cleanEltFromTxtDescription(fullTxt);
      elt = removeSpaceWordsAndModifyValue(elt);
      if (elt.length >= 2) {
        return stockWords.push([elt, fullTxt]);
      }
    });
    // ---
    arrayIngre.forEach((elt) => {
      let fullTxt = modifyValueNotUniqueCharacter(elt);
      fullTxt = cleanEltFromTxtDescription(fullTxt);
      elt = removeSpaceWordsAndModifyValue(elt);
      return stockWords.push([elt, fullTxt]);
    });
    // ---
    description.forEach((elt) => {
      let fullTxt = modifyValueNotUniqueCharacter(elt);
      fullTxt = cleanEltFromTxtDescription(fullTxt);
      elt = modifyValue(elt);
      elt = cleanEltFromTxtDescription(elt);
      if (elt.length >= 2) {
        return stockWords.push([elt, fullTxt]);
      }
    });
    // ---
    title.forEach((elt) => {
      words = words
        .map((elt) => {
          elt = modifyValueNotUniqueCharacter(elt);
          elt = cleanEltFromTxtDescription(elt);

          return (elt = elt.toString());
        })
        .join("");
      words = modifyValue(words);
      let fullTxt = modifyValueNotUniqueCharacter(elt);
      fullTxt = cleanEltFromTxtDescription(fullTxt);
      return stockWords.push([words, fullTxt]);
    });
  });
  // ---
  // On filtre pour éviter les doublons;
  // ---
  stockWords = stockWords
    .filter((obj, index, array) => {
      return array.findIndex((t) => t[1] === obj[1]) === index;
    })
    .sort();
  // ---
  // On attribue les bonnes recettes aux bons mots clef de la map;
  // ---
  stockWords.forEach((ele) => {
    let fullWord = removeSpaceWords(ele[1]);
    ele = ele[0];

    // ---
    function RecipesMatchingWithsNames(value) {
      return datas.recipes.filter((obj) => {
        let fullTitle = removeSpaceWords(obj.name);

        let title = removeSpaceWords(obj.name)
          .split(" ")
          .map((elt) => {
            let currentElt = removeSpaceWords(elt);
            return currentElt.includes(value);
          })
          .some((elt) => elt === true);

        let description = removeSpaceWords(obj.description)
          .split(" ")
          .map((elt) => {
            return elt.includes(value);
          })
          .some((elt) => elt === true);

        // ---
        let ingredient = obj.ingredients
          .map((elt) => {
            elt = removeSpaceWords(elt.ingredient);
            return elt.includes(value);
          })
          .some((elt) => elt === true);

        // ---
        let appliance = removeSpaceWords(obj.appliance);
        appliance = cleanEltFromTxtDescription(appliance);

        // ---
        let ustensil = obj.ustensils
          .map((elt) => {
            elt = removeSpaceWords(elt);
            return elt.includes(value);
          })
          .some((elt) => elt === true);
        // ---
        if (
          title === true ||
          fullTitle.includes(value) ||
          description === true ||
          ingredient === true ||
          appliance.includes(value) ||
          ustensil === true
        ) {
          return true;
        }
      });
    }
    // ---
    stockDatasToMap.push([ele, RecipesMatchingWithsNames(ele)]);
    stockDatasToMap.push([fullWord, RecipesMatchingWithsNames(fullWord)]);
  });

  // On trie le tout, par ordre alphabétique;
  stockDatasToMap = stockDatasToMap.sort(function compare(a, b) {
    return a[0].localeCompare(b[0]);
  });
  // ---
  // On obtient notre map;
  myMap = new Map(stockDatasToMap);
  // --- Fin de la création de la map;
};

const handleMainInputFeature = () => {
  // console.log("On met en place le main input");
  // 2) On met en place la fonction pour le "onInput" du main input;
  function displayRecipesMatchingWithMainInputValue(event) {
    // ---
    value = event.target.value;
    if (tagsStock.length === 0) {
      if (value === "") {
        currentMainValue = "";
      }
      value = value
        .split(" ")
        .map((elt) => {
          elt = modifyValueNotUniqueCharacter(elt);
          elt = cleanEltFromTxtDescription(elt);
          return (elt = elt.toString());
        })
        .join("");
      // ---
      value = value.split("").map((elt) => {
        if (elt.includes(" ") === true) {
          return "";
        }
        return elt;
      });
      if (value.indexOf("") === value.length - 1 && value.length != 0) {
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
        //FEATURE02
        if (myMap.get(value) === undefined) {
          let retrieveTheRightMapKey = stockDatasToMap.find((elt) => {
            if (value.indexOf("d") === value.length - 1 || value === "tareu") {
              value = value.substring(0, value.length - 1);

              return elt[0].startsWith(value);
            } else {
              return elt[0].startsWith(value);
            }
          });
          // console.log(retrieveTheRightMapKey);
          if (retrieveTheRightMapKey != undefined) {
            retrieveTheRightMapKey = retrieveTheRightMapKey[0];
            matchingRecipesArray = myMap.get(retrieveTheRightMapKey);
          } else {
            matchingRecipesArray = [];
          }
        } else {
          // console.log("le mot est dans la map");
          matchingRecipesArray = myMap.get(value);
        }
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
    } else {
      chooseGeneralsTermsToDisplay(value, filterRecipesWithTags, isValid);
    }
    // chooseGeneralsTermsToDisplay(value, filterRecipesWithTags);
  }
  // __________________________________
  // Appel de la fonction du mainInput;
  mainInput.addEventListener("input", displayRecipesMatchingWithMainInputValue);

  // -----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------
};

const handleSecondariesInputs = () => {
  // DEBUT DE L'ALGO DES INPUTS SECONDAIRES
  // -----------------------------------------------------------------------------
  // 3) On met en place la fonction "oninput" des inputs secondaires;
  function updateKeywordsLists(e, currentList, listIncludeMainValue) {
    let value = removeSpaceWords(e.target.value);
    let mainValue = mainInput.value;
    let matchingElemntsArray = [];
    // _________________________________________
    // --- La fonction pour filtrer
    function keywordsIsMatchingWithValue(elt) {
      let currentElt = removeSpaceWords(elt);
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
    let isValid = mainInput.validity.valid;
    // ---

    // ---
    // function filterRecipesWithTags(obj) {
    //   return tagsStock.every((ele) => {
    //     if (ele.type === "ingredient") {
    //       valueMatch = obj.ingredients.map((ingredient) =>
    //         removeSpaceWords(ingredient.ingredient)
    //       );
    //       if (valueMatch.includes(ele.keyW)) {
    //         return true;
    //       }
    //     } else if (ele.type === "appareil") {
    //       valueMatch = removeSpaceWords(obj.appliance);
    //       if (valueMatch.includes(ele.keyW) === true) {
    //         return true;
    //       }
    //     } else if (ele.type === "ustensile") {
    //       valueMatch = obj.ustensils.map((ustensil) =>
    //         removeSpaceWords(ustensil)
    //       );
    //       if (valueMatch.includes(ele.keyW) === true) {
    //         return true;
    //       }
    //     }
    //   });
    // }
    // function chooseGeneralsTermsToDisplay() {
    //   if (currentMainValue === "" && tagsStock.length === 0) {
    //     console.log("il aucune valeur");
    //     matchingRecipesArrayWithTags = datas.recipes.filter(
    //       filterRecipesWithTags
    //     );
    //     // conditions d'affichages
    //     lookAtTermsToDisplay(datas.recipes);
    //   } else if (mainValue != "" && isValid === true) {
    //     console.log("il y a une valeur dans le main input");
    //     matchingRecipesArrayWithTags = matchingRecipesArray.filter(
    //       filterRecipesWithTags
    //     );
    //     // conditions d'affichages
    //     lookAtTermsToDisplay(matchingRecipesArray);
    //   } else {
    //     console.log("il n'y a PAS de valeur dans le main input");
    //     matchingRecipesArrayWithTags = datas.recipes.filter(
    //       filterRecipesWithTags
    //     );
    //     // conditions d'affichages
    //     lookAtTermsToDisplay(datas.recipes);
    //   }
    // }
    //display
    chooseGeneralsTermsToDisplay(mainValue, filterRecipesWithTags, isValid);

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
            currentMainValue = mainInput.value;
            // chooseGeneralsTermsToDisplay();
            // console.log(currentMainValue);
            // console.log(tagsStock);

            chooseGeneralsTermsToDisplay(
              mainValue,
              filterRecipesWithTags,
              isValid
            );
            // if (currentMainValue === "" && tagsStock.length === 0) {
            //   chooseGeneralsTermsToDisplay(mainValue);
            // } else {

            // }
          }
        });
      });
    }
  }
  // ---
  function addTags(e, content, type) {
    let originalText = e.target.innerText;
    let value = removeSpaceWords(e.target.innerText);
    let stockage = {};
    // 1) On veut récupérer a chaque fois la bonne liste aveec les bons mots clefs;
    let currentList = [];
    for (let i = 0; i < content.children.length; i++) {
      let value = removeSpaceWords(content.children[i].innerText);
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
  // ---};
};

window.addEventListener("load", () => {
  handleMainInputFeature();
  handleSecondariesInputs();
  displayRecipesDynamically();
  setTimeout(buildTheMap, 300);
});
