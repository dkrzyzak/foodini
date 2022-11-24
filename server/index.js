require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
