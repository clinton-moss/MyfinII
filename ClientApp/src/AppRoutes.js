import AppRoutesAccountsDashboard from "./AppRoutesAccountsDashboard";
import AppRoutesExport from "./AppRoutesExport";
import AppRoutesForecastDashboard from "./AppRoutesForecastDashboard";
import AppRoutesInventoryDashboard from "./AppRoutesInventoryDashboard";
import AppRoutesLedgerDashbaord from "./AppRoutesLedgerDashbaord";
import AppRoutesReportsDashbaord from "./AppRoutesReportsDashbaord";
import AccountDashboard from "./components/Accounts/AccountDashboard";
import Home from "./components/Home";
import StatementsDashboard from "./components/Statement/StatementsDashboard";
import UploadStatement from "./components/Statement/UploadStatement";
import Upload from "./components/Upload/Upload";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/upload',
    element: <UploadStatement />
  },
  {
    path: '/accounts',
    element: <Upload />
  },
  {
    path: '/accounts/:id',
    element: <AccountDashboard />
  },
  /*
  Statments
  */
  {
    path: '/statements',
    element: <StatementsDashboard />
  },
  ...AppRoutesForecastDashboard,
  ...AppRoutesAccountsDashboard,
  ...AppRoutesInventoryDashboard,
  ...AppRoutesLedgerDashbaord,
  ...AppRoutesExport,
  ...AppRoutesReportsDashbaord
];

export default AppRoutes;
