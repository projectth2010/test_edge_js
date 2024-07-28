const { ipcRenderer } = require('electron');

document.getElementById('initForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nmdPort = document.getElementById('nmdPort').value;
    const mh1Port = document.getElementById('mh1Port').value;
    const mh2Port = document.getElementById('mh2Port').value;
    const mh3Port = document.getElementById('mh3Port').value;

    try {
        const result = await ipcRenderer.invoke('init-machine', nmdPort, mh1Port, mh2Port, mh3Port);
        document.getElementById('result').innerText = `Result: ${result}`;
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
});
