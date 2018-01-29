import uuid from 'uuid/v4';

const amount = 1000;

const handler = StripeCheckout.configure({
  key: STRIPE_PUBLISHABLE_KEY,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {

    fetch(`${LAMBDA_ENDPOINT}purchase`, {
      method: 'POST',
      body: JSON.stringify({
        token,
        amount,
        idempotency_key: uuid()
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error(error))
    .then(response => {
      let messageBox = document.getElementById('messageBox');
      let message = response.status !== undefined && response.status === 'succeeded'
        ? 'Charge was successful!'
        : 'Charge failed.'
      messageBox.style.display = 'block';
      messageBox.querySelector('h2').innerHTML = message;

      console.log(response);
    });
  }
});

document.querySelector('button').addEventListener('click', () => {
  handler.open({
    amount,
    name: 'Test Shop',
    description: 'A Fantastic New Widget'
  });
});
