# Netlify Lambda Function Example

[![Build Status](https://travis-ci.org/alexmacarthur/netlify-lambda-function-example.svg?branch=master)](https://travis-ci.org/alexmacarthur/netlify-lambda-function-example)

This is an example serverless function using [Netlify's](https://www.netlify.com/) new Lambda function service. It processes payments with Stripe, using [Stripe Checkout](https://stripe.com/checkout).

## Read the Post
A full walkthrough of this example can be found on my blog:

https://macarthur.me/posts/building-a-lambda-function-with-netlify

## Install
After making sure you have Yarn installed on your machine, run `yarn install`.

## Usage
Run `yarn run dev` to locally serve the page at `http://localhost:8080`, as well as the function at `http://locahost:9000/purchase`.

After both of these processes are running, you'll be able to process a test purchase with Stripe. For your card number, use `4242424242424242`.

## See the Example
It's right [here](https://netlify-lambda.netlify.com).

## License
MIT © [Alex MacArthur](https://macarthur.me)
