import RecuringPayments from "./components/Payments/Recurring/RecuringPayments";

const AppRoutesAccountsDashboard = [
  
  {
    path: '/Accounts/:id/Payments/Recurring',
    element: <RecuringPayments />
  },
];

export default AppRoutesAccountsDashboard;
