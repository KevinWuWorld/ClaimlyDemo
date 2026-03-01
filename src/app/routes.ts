import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import IntakeChat from "./pages/IntakeChat";
import Signup from "./pages/Signup";
import Results from "./pages/Results";
import FirmProfile from "./pages/FirmProfile";
import Dashboard from "./pages/Dashboard";
import CaseWorkspace from "./pages/CaseWorkspace";
import CaseTimeline from "./pages/CaseTimeline";
import Settings from "./pages/Settings";
import FirmLogin from "./pages/firm/FirmLogin";
import FirmLeads from "./pages/firm/FirmLeads";
import FirmLeadDetail from "./pages/firm/FirmLeadDetail";
import FirmCaseWorkspace from "./pages/firm/FirmCaseWorkspace";
import FirmProfileEdit from "./pages/firm/FirmProfileEdit";
import FirmSettings from "./pages/firm/FirmSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/intake",
    Component: IntakeChat,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/results",
    Component: Results,
  },
  {
    path: "/firm/:firmId",
    Component: FirmProfile,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/case/:caseId",
    Component: CaseWorkspace,
  },
  {
    path: "/timeline/:caseId",
    Component: CaseTimeline,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  // Law Firm Portal Routes
  {
    path: "/firm-login",
    Component: FirmLogin,
  },
  {
    path: "/firm/leads",
    Component: FirmLeads,
  },
  {
    path: "/firm/lead/:leadId",
    Component: FirmLeadDetail,
  },
  {
    path: "/firm/case/:caseId",
    Component: FirmCaseWorkspace,
  },
  {
    path: "/firm/profile",
    Component: FirmProfileEdit,
  },
  {
    path: "/firm/settings",
    Component: FirmSettings,
  },
]);
