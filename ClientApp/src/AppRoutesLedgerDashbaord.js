import LedgerDashboard from "./components/Accounts/Ledger/LedgerDashboard";
import Home from "./components/Home";

const AppRoutesLedgerDashbaord = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Ledger',
    element: <LedgerDashboard />
  },
];

export default AppRoutesLedgerDashbaord;
