const exress = require('express');
const app = exress();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Wach a jmi!');
});

app.post('/prs', (req, res) => {
    const { parasso } = req.body;
    res.send(`parasso kayn: ${parasso}`);
});

app.put('/prs/:id', (req, res) => {
    const { id } = req.params;
    res.send(`data tbdlat ${id}`);
});

app.delete('/prs/:id', (req, res) => {
    const { id } = req.params;
    res.send(`data tms7at ${id}`);
});


