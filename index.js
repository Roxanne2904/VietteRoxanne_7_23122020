// let datas;


// datas = recipes.map((data) => {
//     return data.ingredients.map((ingredient) => {
//         return ingredient.ingredient
//         console.log(ingredient.ingredient);
//     })
// });
// console.log(datas);
let datas; 

const fetchDatas = async() => {
datas = await fetch("./datas/recipes.json")
    .then((response) =>{
        return response.json();
    })
    .then((body)=>{
        return body;
    });
};

const showDatasIntoInputs = async ()=> {
    await fetchDatas();
    // ----------------
    let dataIngredients;
    let dataAppareils;
    let dataUstensiles;
    // ----------------
    let uniqueDataIngredients;
    let uniqueDataAppareils;
    let uniqueDataUstensiles;
    // ----------------
    const ingredientsUl = document.getElementById("ingredients__ul");
    const appareilsUl = document.getElementById("appareil__ul");
    const ustensilesUl = document.getElementById("ustensiles__ul");
    // ----------------
    dataIngredients = datas.recipes.map((data)=>{
        return data.ingredients.map((ingredient)=>{
            return ingredient.ingredient;
        });
    })
    .flat()
    .sort((a, b) => a.localeCompare(b, "fr", {ignorePunctuation: true}));
    // ----------------
    dataAppareils = datas.recipes.map((data)=>{
         return data.appliance;
    }).sort();
    // ----------------
    dataUstensiles = datas.recipes.map((data)=>{
        return data.ustensils;
    })
    .flat()
    .sort((a, b) => a.localeCompare(b, "fr", {ignorePunctuation: true}));
    // ----------------
   uniqueDataIngredients = Array.from(new Set(dataIngredients));
   uniqueDataAppareils = Array.from(new Set(dataAppareils));
   uniqueDataUstensiles = Array.from(new Set(dataUstensiles));
    // ----------------
   ingredientsUl.innerHTML = uniqueDataIngredients.map((ingredient)=>{
     return `<li class="form__fieldset__bgd__content__ul__li">${ingredient}</li>`;
   }).join("");
   appareilsUl.innerHTML = uniqueDataAppareils.map((appareil)=>{
    return `<li class="form__fieldset__bgd__content__ul__li">${appareil}</li>`;
  }).join("");
  ustensilesUl.innerHTML = uniqueDataUstensiles.map((ustensil)=>{
    return `<li class="form__fieldset__bgd__content__ul__li">${ustensil}</li>`;
  }).join("");
};


window.addEventListener("load", ()=>{
    showDatasIntoInputs();
});

