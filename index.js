let datas;


datas = recipes.map((data) => {
    return data.ingredients.map((ingredient) => {
        return ingredient.ingredient
        console.log(ingredient.ingredient);
    })
});
console.log(datas);

