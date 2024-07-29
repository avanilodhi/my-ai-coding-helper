document.getElementById('suggestBtn').addEventListener('click', () => handleAIRequest('suggest'));
document.getElementById('debugBtn').addEventListener('click', () => handleAIRequest('debug'));
document.getElementById('tipsBtn').addEventListener('click', () => handleAIRequest('tips'));

async function handleAIRequest(type) {
    const code = document.getElementById('codeEditor').value;
    const outputElement = document.getElementById('output');
    outputElement.textContent = 'Loading...';

    try {
        const response = await fetch('/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, type })
        });

        const data = await response.json();
        outputElement.textContent = data.result;
    } catch (error) {
        outputElement.textContent = 'Error: ' + error.message;
    }
}
