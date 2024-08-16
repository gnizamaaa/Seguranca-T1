const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.post('/compute', (req, res) => {
    const operation = req.body.operation;
    console.log(operation)


    if (!operation) {
        return res.status(400).json({ error: 'Operation is required' });
    }

    try {
        const result = eval(operation);
        console.log(result)
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Invalid operation' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
