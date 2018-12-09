
function startPayments(productId, inputsSelector, stripePublicKey){
  // Create a Stripe client.
  var stripe = Stripe(stripePublicKey);

  var elements = stripe.elements();
  var container = document.querySelector('#card-element-for-product-' + productId);
  var streetAddress = document.querySelector("#street-address-for-product-" + productId);
  var card = elements.create('card', {
    style: {
      base: {
        fontSize: '14px',
        lineHeight: '20px',
        color: '#555',
        '::placeholder': {
          color: '#909090',
        }
      },
      invalid: {
        iconColor: 'rgb(132, 53, 52)',
        color: '#555',
      }
    },
  });

  card.mount(container);

  function handleResult(value) {
    if (value.error) {
      container.parentNode.classList.add('has-error');
      console.log(value);
      $('.continue-spinner').remove();
    } else if (value.token) {
      var formData = new FormData;
      $.ajax({
        url: 'https://api.vietnamhealthbuddy.com/pay',
        product_id: productId
      })
    } else {
      container.parentNode.classList.remove('has-error');
      console.log(value);
      $('.continue-spinner').remove();
    }
    if (value.complete == true) {

      $('#hidden-flag-for-stripe-element-completeness-for-product-' + productId).val('true');
      $('#hidden-flag-for-stripe-element-completeness-for-product-' + productId).change();
    } else {

    }
  }

  card.on('change', handleResult);

  document.getElementById('payment-form-for-product-' + productId).addEventListener('submit', function(e) {
    $('#submit-button-for-product-' + productId).append("<span class='continue-spinner'>&nbsp;<i class='fa fa-circle-o-notch fa-spin'></i></span>")
    e.preventDefault();
    stripe.createToken(card, {
      address_line1: streetAddress.value,
    }).then(handleResult);
  });
}
