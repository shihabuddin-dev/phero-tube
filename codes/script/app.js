const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        const data = await response.json()
        displayCategories(data.categories)
    }
    catch (error) {
        console.log(error);
    }
}
const displayCategories = (categories) => {
    const categoryContainer= document.getElementById('category-container')
    for(let cat of categories){
        console.log(cat);
        const categoryDiv= document.createElement('div')
        categoryDiv.innerHTML=`
        <button class="btn btn-sm border-none bg-[#25252526] hover:bg-[#FF1F3D] hover:text-white"> ${cat.category}</button>
        `
        categoryContainer.appendChild(categoryDiv)
    }
}
loadCategories()