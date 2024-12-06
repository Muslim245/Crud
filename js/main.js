var productName = document.getElementById("ProductName")
var productPrice = document.getElementById("ProductPrice")
var ProductCategory = document.getElementById("ProductCategory")
var ProductImage = document.getElementById("ProductImage")
var ProductDescription = document.getElementById("ProductDescription")
var search = document.getElementById("SearchProduct")
var btnAdd = document.getElementById("btnAdd")
var btnUpdate = document.getElementById("btnupdate")
var productlist = [] ;
var indx = 0;
var x = document.getElementsByClassName("error")
if (productlist.length == 0 && localStorage.getItem("productData") == null) {
    productlist = []
}else {
    productlist = JSON.parse(localStorage.getItem("productData"))
    DisplayProduct()
}
function AddProduct() {
  if (vaildinputs(productName , 'errorName') && 
  vaildinputs(productPrice , 'errorPrice') && 
  vaildinputs(ProductCategory , 'errorCategory') &&
   vaildinputs(ProductImage , 'errorFile') &&
    vaildinputs(ProductDescription , 'errorDescription')  ) {
    var Product = {
        name : productName.value ,
        Price : Number(productPrice.value) ,
        category : ProductCategory.value ,
        Image : ProductImage.files[0] ,
        Description : ProductDescription.value,
    };
    if ( ProductImage.files[0] != null ) {
       Product.Image = ProductImage.files[0].name;
    }else{
        Product.Image = "images.jpg"
    }
   productlist.push(Product)
   localStorage.setItem("productData" , JSON.stringify(productlist))
   clearAll()
   DisplayProduct()
  }
}
function clearAll() {
    productName.value = "" ;
    productPrice.value = "" ;
    ProductCategory.value = "" ;
    ProductImage.value = "" ;
    ProductDescription.value = "" ;
}
function DisplayProduct() {
    var container = "" ;
    for (var i = 0; i < productlist.length; i++) {
        container += `<div class="col-lg-3">
                    <div class="box">
                        <div class="up">
                            <img class="img-fluid" src="./Images/${productlist[i].Image}" alt="">
                        </div>
                        <div class = "middle">
                        <h6>ProductName : ${productlist[i].name}</h6>
                        <h6>ProductPrice : ${productlist[i].Price} </h6>
                        <h6>ProductCategory : ${productlist[i].category}</h6>
                        <h6>ProductDescription : ${productlist[i].Description} </h6>
                        </div>
                        <div class="down">
                    <button onclick="DeleteProduct(${i})" type="button" class="btn btn-outline-danger w-75 my-3 m-auto d-block">Delete</button>
                    <button onclick="UpdateValues(${i})" type="button" class="btn btn-outline-warning w-75 mb-3 m-auto d-block">Update</button>
                </div>
                    </div>
                    </div>`   
    }
    document.getElementById("ShowProduct").innerHTML = container ;
    
}
function DeleteProduct(index) {
    productlist.splice(index , 1)
    localStorage.setItem("productData" , JSON.stringify(productlist))
    DisplayProduct()
}
function searchProduct() {
    var container = "" ;
    for (var i = 0; i < productlist.length; i++) {
       if (productlist[i].name.toLowerCase().includes(search.value.toLowerCase()) ) {
        container += `<div class="col-lg-3">
        <div class="box">
            <div class="up">
                <img class="img-fluid" src="./Images/${productlist[i].Image}" alt="">
            </div>
            <div class = "middle">
            <h6>ProductName : ${productlist[i].name}</h6>
            <h6>ProductPrice : ${productlist[i].Price} </h6>
            <h6>ProductCategory : ${productlist[i].category}</h6>
            <h6>ProductDescription : ${productlist[i].Description} </h6>
            </div>
            <div class="down">
        <button onclick ="DeleteProduct(${i})" type="button" class="btn btn-outline-danger w-75 my-3 m-auto d-block">Delete</button>
        <button onclick="UpdateValues(${i})" type="button" class="btn btn-outline-warning w-75 mb-3 m-auto d-block">Update</button>
    </div>
        </div>
        </div>` 
       }
       }
       document.getElementById("ShowProduct").innerHTML = container ;
    } 
function UpdateValues(index) {
    indx = index ;
    productName.value =  productlist[index].name;
    productPrice.value = productlist[index].Price ;
    ProductCategory.value = productlist[index].category ;
    ProductDescription.value = productlist[index].Description ; 
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";
    DisplayProduct()
}
function updateProduct(indx) {
    var Product = {
        name : productName.value ,
        Price : Number(productPrice.value) ,
        category : ProductCategory.value ,
        Image : ProductImage.files[0] ,
        Description : ProductDescription.value,
    };
    if ( ProductImage.files[0] != null ) {
       Product.Image = ProductImage.files[0].name;
    }else{
        Product.Image = "images.jpg"
    }
    
    productlist.splice(indx , 1 , Product )
    btnAdd.style.display = "block";
    btnUpdate.style.display = "none";
    console.log(indx)
    DisplayProduct()
}

function vaildinputs(e , error) {
    var textError = document.getElementById(error)
    regex = {
        ProductName : /^[A-Z][a-z]{3,8}$/ ,
        ProductPrice : /^\d{1,5}\.?\d{0,2}$/,
        ProductCategory : /^(TV|Mobile|Laptop|Screens)$/i,
        ProductImage : /^.+$/,
        ProductDescription : /^.{1,50}$/

    }
   if (regex[e.id].test(e.value)) {
    textError.classList.add("d-none")
    e.classList.add("is-valid")
    e.classList.remove("is-invalid")
    return true
   }else{
    textError.classList.remove("d-none")
    e.classList.remove("is-valid")
    e.classList.add("is-invalid")
    return false
   }
}


