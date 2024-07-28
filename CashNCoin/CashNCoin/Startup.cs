using System.Threading.Tasks;
using NMD100;
using PcioCashNCoin;

namespace CashNCoinTest
{
    public class Startup
    {
        private readonly CashNCoin _cc;

        public Startup()
        {
            _cc = new CashNCoin();
        }

        public async Task<object> Invoke(object input)
        {
            var parameters = (dynamic)input;

            // Determine which method to call based on the input
            if (parameters.Method == "InitMachine")
            {
                string nmdPort = parameters.NMDportname;
                string mh1Port = parameters.MH1portname;
                string mh2Port = parameters.MH2portname;
                string mh3Port = parameters.MH3portname;

                string result = await Task.Run(() => InitMachine(nmdPort, mh1Port, mh2Port, mh3Port));
                return result;
            }
            else if (parameters.Method == "HelloMessage")
            {
                string message = parameters.Message;
                string result = await Task.Run(() => HelloMessage(message));
                return result;
            }

            return "Invalid method.";
        }

        private string InitMachine(string nmdPortname, string mh1Portname, string mh2Portname, string mh3Portname)
        {
            string initialResult = _cc.InitialMachine(nmdPortname, mh1Portname, mh2Portname, mh3Portname);
            return initialResult;
        }

        private string HelloMessage(string message)
        {
            return $"Hello, {message}";
        }
    }
}
