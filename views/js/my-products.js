  $(() =>{
    
    $.get('/user/FullName').done((name)=>{
      let head = $('#HeaderName');
      head.empty();
      head.append(`Hi ${name}!`);
    });

    $.get('/products/my-products').done((data)=>{
        populateData(data);
    });

    function createCard(obj){
      let card =$(` <div class="card mx-2 my-2 p-2 col-3" style="width: 18rem;">
      <img class="card-img" src="${obj.image_url}" class="card-img-top" alt="Product image">
      <div class="card-body">
        <h5 class="card-title">${obj.name}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Price:Rs. ${obj.price}</b> </li>
          <li class="list-group-item"><b>Manufactured By: ${obj.manufactured_by}</b></li>
        </ul>
        <p class="card-text">${obj.description}</p>
        <a href="/user/edit-product/${obj._id}" class="btn btn-primary">Update</a>
        <button type="button" id="delBtn" class="btn btn-danger">Delete</button>
      </div>
    </div>`);

      let deleteBtn = card.find('#delBtn');

    deleteBtn.click((event)=>{
      event.preventDefault();
      $.ajax({
        url: '/products/' + obj._id,
        method: 'DELETE'
      }).done(()=> location.reload());
    });
    
    return card;
  }

    function populateData(data){
        let list = $('#product-list');
        list.empty();
        for(let i=0;i<data.length;i++){
            let card = createCard(data[i]);
            console.log(card);
            list.append(card);
        }
    }

});

