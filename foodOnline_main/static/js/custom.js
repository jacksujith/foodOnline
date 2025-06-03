let autocomplete;

function initAutoComplete(){
autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('id_address'),
    {
        types: ['geocode', 'establishment'],
        //default in this app is "IN" - add your country code
        componentRestrictions: {'country': ['in']},
    })
// function to specify what should happen when the prediction is clicked
autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged (){
    var place = autocomplete.getPlace();

    // User did not select the prediction. Reset the input field or alert()
    if (!place.geometry){
        document.getElementById('id_address').placeholder = "Start typing...";
    }
    else{
        console.log('place name=>', place.name)
    }
    // get the address components and assign them to the fields
}



// Remove duplicate let autocomplete if any

$(document).ready(function(){
    // Add to cart
    $('.add_to_cart').on('click', function(e){
        e.preventDefault();
        
        let food_id = $(this).attr('data-id');
        let url = $(this).attr('data-url');

        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                console.log(response);
                if(response.status === 'login_required'){
                    swal(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                }if(response.status == 'Failed'){
                    swal(response.message,'','error')
                }else {
                    $('#cart_counter').html(response.cart_counter['cart_count']);
                    $('#qty-' + food_id).html(response.qty);
                    
                     // subtotal, tax and grand total
                     applyCartAmounts(
                        response.cart_amount['subtotal'],
                        response.cart_amount['tax_dict'],
                        response.cart_amount['grand_total']
                    )
                }
            }
        });
    });

    // Place the cart item quantity on load
    $('.item_qty').each(function(){
        let the_id = $(this).attr('id');
        let qty = $(this).attr('data-qty');
        $('#' + the_id).html(qty);
    });

    // Decrease cart quantity
    $('.decrease_cart').on('click', function(e){
        e.preventDefault();

        let food_id = $(this).attr('data-id');
        let url = $(this).attr('data-url');
        let cart_id = $(this).attr('id');

        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                console.log(response);
                if(response.status === 'login_required'){
                    swal(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                }else if(response.status === 'Failed'){
                    swal(response.message,'','error')
                }else {
                    $('#cart_counter').html(response.cart_counter['cart_count']);
                    $('#qty-' + food_id).html(response.qty);
                   
                    applyCartAmounts(
                        response.cart_amount['subtotal'],
                        response.cart_amount['tax_dict'],
                        response.cart_amount['grand_total']
                    )
                   
                    if(window.location.pathname == '/cart/'){
                    removeCartItem(response.qty, cart_id);
                    checkEmptyCart();
                   }
                }
            }
        });
    });



   
    // DELETE CART ITEM
    $('.delete_cart').on('click', function(e){
        e.preventDefault();
        
        cart_id = $(this).attr('data-id');
        url = $(this).attr('data-url');
        
        
        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                console.log(response)
                if(response.status == 'Failed'){
                    swal(response.message, '', 'error')
                }else{
                    $('#cart_counter').html(response.cart_counter['cart_count']);
                    swal(response.status, response.message, "success")

                    applyCartAmounts(
                        response.cart_amount['subtotal'],
                        response.cart_amount['tax_dict'],
                        response.cart_amount['grand_total']
                    )


                    removeCartItem(0, cart_id);
                    checkEmptyCart();
                   
                } 
            }
        })
    })


    // delete the cart element if the qty is 0
    function removeCartItem(cartItemQty, cart_id){
       
            if(cartItemQty <= 0){
                // remove the cart item element
                document.getElementById("cart-item-"+cart_id).remove()
            }
         
    }


     // Check if the cart is empty
     function checkEmptyCart(){
        var cart_counter = document.getElementById('cart_counter').innerHTML
        if(cart_counter == 0){
            document.getElementById("empty-cart").style.display = "block";
        }
    }


   
    // apply cart amounts
    function applyCartAmounts(subtotal, tax_dict, grand_total){
        if(window.location.pathname == '/cart/'){
            $('#subtotal').html(subtotal)
            $('#tax').html(tax)
            $('#total').html(grand_total)

           
        }
    }

});
