const stripe = require('stripe')('sk_test_oztW2pkYdCAB43cheocugZ8100PnasnNaI');
const exphbs = require('express-handlebars');

const express = require('express'),
			port = process.env.PORT || 5000,
			app = express();

// MIDDLEWARE
// HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// BODYPARSER
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// STATIC FOLDER
app.use(express.static(`${__dirname}/public`))

// ROUTES
// INDEX ROUTE
app.get('/', (req, res) => {
	res.render('index');
});

// CHARGE ROUTE
app.post('/charge', (req, res) => {
	const amount = 2500;
	// create customer, charge the customer
	// form sends object with stripeToken, stripeTokenType and stripeEmail
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
		.then(customer => {
			stripe.charges.create({
				amount,
				description: 'Web Development eBook',
				currency: 'usd',
				customer: customer.id
			})
		})
		.then(charge => res.render('success'));
})

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
})
