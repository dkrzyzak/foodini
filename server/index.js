const express = require('express');

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/');

app.get('/test', (req, res) => {
	res.json({ sraken: 'pierdaken' });
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
