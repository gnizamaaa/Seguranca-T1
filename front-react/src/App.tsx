import Account from "./components/Account";
import Notices from "./components/Notices";
import Reports from "./components/Reports";
import SendERC20 from "./components/SendERC20";
import SendERC721 from "./components/SendERC721";
import SendEther from "./components/SendEther";
import SimpleInput from "./components/SimpleInput";
import Vouchers from "./components/Vouchers";
import SimpleCalculator from "./components/SimpleCalculator";
function App() {
  return (
    <>
      <Account />
      <SimpleCalculator />
      <Notices />
      <Reports />
      <Vouchers />
    </>
  );
}

export default App;
