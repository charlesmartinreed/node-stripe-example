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

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
})
