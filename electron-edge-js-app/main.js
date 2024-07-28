const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('show-message', async (event, message) => {
    const edge = require('edge-js');
    const showMessage = edge.func({
        assemblyFile: path.join(__dirname, 'path_to_your_dll', 'MessageBoxLibrary.dll'),
        typeName: 'MessageBoxLibrary.MessageBoxHelper',
        methodName: 'ShowMessage'
    });

    return new Promise((resolve, reject) => {
        showMessage(message, function (error, result) {
            if (error) reject(error);
            resolve(result);
        });
    });


    
});

ipcMain.handle('init-machine', async (event, nmdPort, mh1Port, mh2Port, mh3Port) => {
    const edge = require('edge-js');
    const initMachine = edge.func({
        assemblyFile: path.join(__dirname, 'path_to_your_dll', 'CashNCoinTest.dll'),
        typeName: 'CashNCoinTest.CashNCoinMachine',
        methodName: 'Init'
    });

    return new Promise((resolve, reject) => {
        initMachine({ NMDportname: nmdPort, MH1portname: mh1Port, MH2portname: mh2Port, MH3portname: mh3Port }, function (error, result) {
            if (error) reject(error);
            resolve(result);
        });
    });
});
