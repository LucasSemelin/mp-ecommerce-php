document.getElementById("botonCheckout").addEventListener("click", function() {

    $('#checkout-btn').attr("disabled", true);

    console.log('handler.js')
    
    var orderData = {
      quantity: document.getElementById("quantity").value,
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML
    };
      
    fetch("/preference.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
      })
        .then(function(response) {
            return response.json();
        })
        .then(function(preference) {
            createCheckoutButton(preference.id);
            $(".shopping-cart").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500);
        })
        .catch(function() {
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
        });
  });
  
  //Create preference when click on checkout button
  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    
    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.getElementById("button-checkout").innerHTML = "";
    document.querySelector("#button-checkout").appendChild(script);
  }
  
  //Handle price update
  function updatePrice() {
    let quantity = document.getElementById("quantity").value;
    let unitPrice = document.getElementById("unit-price").innerHTML;
    let amount = parseInt(unitPrice) * parseInt(quantity);
  
    document.getElementById("cart-total").innerHTML = "$ " + amount;
    document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
    document.getElementById("summary-quantity").innerHTML = quantity;
    document.getElementById("summary-total").innerHTML = "$ " + amount;
  }
  document.getElementById("quantity").addEventListener("change", updatePrice);
  updatePrice();  
  
  //go back
  document.getElementById("go-back").addEventListener("click", function() {
    $(".container_payment").fadeOut(500);
    setTimeout(() => {
        $(".shopping-cart").show(500).fadeIn();
    }, 500);
    $('#checkout-btn').attr("disabled", false);  
  });

    // // Agrega credenciales de SDK
    // const mp = new MercadoPago('APP_USR-7eb0138a-189f-4bec-87d1-c0504ead5626', {
    //         locale: 'es-AR'
    // });

    // // Inicializa el checkout
    // mp.checkout({
    //     preference: {
    //         id: 'YOUR_PREFERENCE_ID'
    //     },
    //     render: {
    //             container: '.mercadopago-button', // Indica dónde se mostrará el botón de pago
    //             label: 'Pagar la compra', // Cambia el texto del botón de pago (opcional)
    //     }
    // });