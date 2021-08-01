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
    let uniqueDataIngredients;
    const ingredientsUl = document.getElementById("ingredients__ul");
    // ----------------
    dataIngredients = datas.recipes.map((data)=>{
        return data.ingredients.map((ingredient)=>{
            return ingredient.ingredient
        })
    }).flat();
    // ----------------
   uniqueDataIngredients = Array.from(new Set(dataIngredients));

   ingredientsUl.innerHTML = uniqueDataIngredients.map((ingredient)=>{
     return `<li class="form__fieldset__bgd__content__ul__li">${ingredient}</li>`
   }).join("");
    
};


window.addEventListener("load", ()=>{
    showDatasIntoInputs();
});

