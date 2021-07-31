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

const showDatas = async ()=> {
    await fetchDatas();
    console.log(datas);
};


window.addEventListener("load", ()=>{
    showDatas();
});

