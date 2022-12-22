require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.API_PORT || 3030;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(
	cors({
		allowedHeaders: ['x_allow_ignore_auth'],
		exposedHeaders: ['x_allow_ignore_auth'],
	})
);
app.use('/', router);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
