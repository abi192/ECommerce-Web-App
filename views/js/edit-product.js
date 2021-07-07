const productId = window.location.href.split('/').pop();

$(()=>{
    $.get('/products/' + productId).done((product)=>{
        $('#name').val(product.name);
        $('#price').val(product.price);
        $('#manufactured_by').val(product.manufactured_by);
        $('#image_url').val(product.image_url);
        $('#description').val(product.description);
    });

    $('#updateBtn').click((e)=>{
        e.preventDefault();
        let product = {};
        product.name = $('#name').val();
        product.price = $('#price').val();
        product.manufactured_by = $('#manufactured_by').val();
        product.image_url = $('#image_url').val();
        product.description = $('#description').val();

        $.post('/products/' + productId, product).done(()=>{
            window.location.replace('/user/my-products');
        });

    });
    
});