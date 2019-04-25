import uuid from 'uuid/v4';

const amount = 1000;
const $messageBox = document.getElementById('messageBox');
const $button = document.querySelector('button');

function resetButtonText() {
  $button.innerHTML = 'Click to Buy! <strong>$10</strong>';
}

const handler = StripeCheckout.configure({
  key: STRIPE_PUBLISHABLE_KEY,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  closed: function () {
    resetButtonText();
  },
  token: async function(token) {

    let response, data;

    try {
      response = await fetch(LAMBDA_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          token,
          amount,
          idempotency_key: uuid()
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

      data = await response.json();
    } catch (error) {
      console.error(error.message);
      return;
    }

    resetButtonText();

    let message = typeof data === 'object' && data.status === 'succeeded'
      ? 'Charge was successful!'
      : 'Charge failed.'
    $messageBox.querySelector('h2').innerHTML = message;

    console.log(data);
  }
});

$button.addEventListener('click', () => {

  setTimeout(() => {
    $button.innerHTML = 'Waiting for response...';
  }, 500);

  handler.open({
    amount,
    name: 'Test Shop',
    description: 'A Fantastic New Widget'
  });
});
