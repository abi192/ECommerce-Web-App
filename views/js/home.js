$(() =>{

    $.get('/user/FullName').done((name)=>{
      let head = $('#HeaderName');
      head.empty();
      head.append(`Hi ${name}!`);
    });

    $.get('/products').done((data)=>{
        populateData(data);
    });

    function createCard(obj){
        let card = $(` <div class="card mx-2 my-2 p-2 col-3" style="width: 18rem;">
        <img class="card-img" src="${obj.image_url}" class="card-img-top" alt="Product image">
        <div class="card-body">
          <h5 class="card-title">${obj.name}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Price:Rs. ${obj.price}</b> </li>
            <li class="list-group-item"><b>Manufactured By: ${obj.manufactured_by}</b></li>
          </ul>
          <p class="card-text">${obj.description}</p>
          <button type="button" id="addCartBtn" class="btn btn-primary">Add to Cart</button>
        </div>
      </div>`);
      
      let addCartBtn = card.find('#addCartBtn');
      console.log(addCartBtn);
      
      addCartBtn.click((event)=>{
        event.preventDefault();
        $.post('/products/cart/'+ obj._id);
      });

      return card;
    }

    function populateData(data){
        let list = $('#product-list');
        list.empty();
        for(let i=0;i<data.length;i++){
            let card = createCard(data[i]);
            list.append(card);
        }
    }

});

