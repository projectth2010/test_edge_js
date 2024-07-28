const edge = require('edge-js');
const path = require('path');

// Define the function to call the C# code
const callDotNet = edge.func({
    assemblyFile: path.join(__dirname, 'dll/', 'CashNCoinTest.dll'),
    typeName: 'CashNCoinTest.Startup',
    methodName: 'Invoke' // This must be Func<object, Task<object>>
});

// Call the InitMachine method
callDotNet({ Method: "InitMachine", NMDportname: "COM1", MH1portname: "COM2", MH2portname: "COM3", MH3portname: "COM4" }, function (error, result) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('InitMachine Result:', result);
});

// Call the HelloMessage method
callDotNet({ Method: "HelloMessage", Message: "World" }, function (error, result) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('HelloMessage Result:', result);
});
