const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const OPENAI_API_KEY = '';  // API key

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ai', async (req, res) => {
    const { code, type } = req.body;
    let prompt;

    if (type === 'suggest') {
        prompt = `Suggest the next lines of code:\n\n${code}`;
    } else if (type === 'debug') {
        prompt = `Debug the following code and explain the errors:\n\n${code}`;
    } else if (type === 'tips') {
        prompt = `Give tips to improve the following code:\n\n${code}`;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 100,
                n: 1,
                stop: null,
                temperature: 0.7
            })
        });

        const data = await response.json();
        res.json({ result: data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
