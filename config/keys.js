// if deployed
if(process.env.NODE_ENV === 'production') {
	module.exports = require('./keys_prod');
} else {
	// if on local machine
	module.exports = require('./keys_dev');
}
