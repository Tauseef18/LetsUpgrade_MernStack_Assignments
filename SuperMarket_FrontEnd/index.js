
// to fetch all products

fetch("http://127.0.0.1:3000/products")
.then((response)=>response.json())
.then((products)=>{

    let productsString = "";

    products.forEach((product)=>{

        let ratingString = "";
        let averageRating = product.rating / product.rating_count;
        for(let i=1; i<=5; i++){

            if(i<=Math.round(averageRating)){
                ratingString += `<img src="images/yellowstar.png" width="25px"/>`;
            }
            else{
                ratingString += `<img src="images/greystar.png" width="25px"/>` 
            }
        } 
          
        productsString += 
        `<div class="card productcard" style="width: 18rem;">

        <div class="card-body">
          <div class="card-title" style="font-size:50px;text-align:center">${product.emoji} ${product.emoji} ${product.emoji}</div>
        </div>

        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price : &#8377 ${product.price}</li>
          <li class="list-group-item">Rating : ${ratingString}</li> 
        </ul>
        <div class="card-body">
          <a href="product.html?id=${product.id}" class="card-link btn btn-success" >View</a>
        </div>
      </div>`
     });

     
document.getElementById('product container').innerHTML = productsString;

});













