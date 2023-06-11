let seararchForm = document.getElementById("searchForm");

seararchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(seararchForm);
    createProducts(formData.get("search"));
});


async function getCoctailsByName(name){
    return axios.get("https://thecocktaildb.com/api/json/v1/1/search.php?s=" + name)
        .then(result => {
            console.log(result.data.drinks[0])
            return result.data.drinks;
        })
        .catch(err => console.log(err));
};

async function getImageForIngredient(name){
    return axios.get("https://thecocktaildb.com/images/ingredients/" + name + "-Small.png")
        .then(result => {
            return result.data;
        })
        .catch(err => console.log(err));
}

function createProduct(product){
    let productCard = document.getElementById("productCard");
    let divCard = productCard.content.getElementById("product");
    divCard.dataset.name = product.idDrink;
    divCard.dataName = product.idDrink;
    let h3 = productCard.content.getElementById("title");
    h3.innerText = product.strDrink;
    let img = productCard.content.getElementById("cardImg");
    img.src = product.strDrinkThumb;
    let newProduct = productCard.content.cloneNode(true);
    return newProduct;
};

function createProductPreview(product){
    let productPreview = document.getElementById("productPreview");
    let divPreview = productPreview.content.getElementById("preview");
    divPreview.dataset.target = product.idDrink;
    let p = productPreview.content.getElementById("instraction");
    p.innerText = product.strInstructions;
    let newProductPreview = productPreview.content.cloneNode(true);
    return newProductPreview;
};

async function createIngredients(product){
    let divForIngredient = document.createElement("div");
    if(product.strIngredient1 != null){
        let forImg = document.getElementById("forImg");
        let img = forImg.content.getElementById("imgIngredient");
        img.src = "https://thecocktaildb.com/images/ingredients/" + product.strIngredient1 + "-Small.png";
        let h4 = forImg.content.getElementById("ingredient");
        h4.innerText = product.strIngredient1;
        let p = forImg.content.getElementById("doza");
        p.innerText = product.strMeasure1
        let newForImg = forImg.content.cloneNode(true);
        divForIngredient.append(newForImg);
    }

    if(product.strIngredient2 != null){
        let forImg = document.getElementById("forImg");
        let img = forImg.content.getElementById("imgIngredient");
        img.src = "https://thecocktaildb.com/images/ingredients/" + product.strIngredient2 + "-Small.png";
        let h4 = forImg.content.getElementById("ingredient");
        h4.innerText = product.strIngredient2;
        let p = forImg.content.getElementById("doza");
        p.innerText = product.strMeasure2;
        let newForImg = forImg.content.cloneNode(true);
        divForIngredient.append(newForImg);
    }

    if(product.strIngredient3 != null){
        let forImg = document.getElementById("forImg");
        let img = forImg.content.getElementById("imgIngredient");
        img.src = "https://thecocktaildb.com/images/ingredients/" + product.strIngredient3 + "-Small.png";
        let h4 = forImg.content.getElementById("ingredient");
        h4.innerText = product.strIngredient3;
        let p = forImg.content.getElementById("doza");
        p.innerText = product.strMeasure3;
        let newForImg = forImg.content.cloneNode(true);
        divForIngredient.append(newForImg);
    }

    if(product.strIngredient4 != null){
        let forImg = document.getElementById("forImg");
        let img = forImg.content.getElementById("imgIngredient");
        img.src = "https://thecocktaildb.com/images/ingredients/" + product.strIngredient4 + "-Small.png";
        let h4 = forImg.content.getElementById("ingredient");
        h4.innerText = product.strIngredient4;
        let p = forImg.content.getElementById("doza");
        p.innerText = product.strMeasure4;
        let newForImg = forImg.content.cloneNode(true);
        divForIngredient.append(newForImg);
    }
    return divForIngredient;
};


async function createProducts(productName){
    let productList = await getCoctailsByName(productName);
    let productContainer = document.getElementById("product-container");
    let productsPreview =document.getElementById("products-preview");
    for(let i = 0; i < productList.length; i++){
        productContainer.append(createProduct(productList[i]));
    
        productsPreview.append(createProductPreview(productList[i]));

        let productPreviewLast = productsPreview.lastElementChild;
        
        let divForIng = productPreviewLast.getElementsByTagName("div");
        divForIng[0].append(await createIngredients(productList[i]));
    };


    let preveiwContainer = document.querySelector(".products-preview");
    console.log(preveiwContainer);
    let preveiwBox = document.querySelectorAll(".preview");
    console.log(preveiwBox);
    
    document.querySelectorAll(".product-container .product").forEach(product =>{
        product.addEventListener("click", () => {
            console.log(product);
            preveiwContainer.style.display = "flex";
            let name = product.getAttribute("data-name");
            preveiwBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if(name == target){
                    preview.classList.add('active');
                };
            });
        });
    });

    preveiwBox.forEach(close => {
        close.querySelector(".fa-times").onclick = () => {
            close.classList.remove("active");
            preveiwContainer.style.display = "none";
        };
    });
};
