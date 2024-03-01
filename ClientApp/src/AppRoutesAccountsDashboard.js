import LifestyleInvetoryComponent from "./components/Lifestyle/Inventory/LifestyleInvetoryComponent";
import RecuringPayments from "./components/Payments/Recurring/RecuringPayments";

const AppRoutesAccountsDashboard = [
  
  {
    path: '/Accounts/:id/Payments/Recurring',
    element: <RecuringPayments />
  },
  {
    path: '/Accounts/:id/Lifestyle/Inventory',
    element: <LifestyleInvetoryComponent />
  },
];

export default AppRoutesAccountsDashboard;
