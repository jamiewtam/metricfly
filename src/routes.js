/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import VectorMap from "views/maps/VectorMap.js";
import GoogleMaps from "views/maps/GoogleMaps.js";
import FullScreenMap from "views/maps/FullScreenMap.js";
import ReactTables from "views/tables/ReactTables.js";
import RegularTables from "views/tables/RegularTables.js";
import ExtendedTables from "views/tables/ExtendedTables.js";
import Wizard from "views/forms/Wizard.js";
import ValidationForms from "views/forms/ValidationForms.js";
import ExtendedForms from "views/forms/ExtendedForms.js";
import RegularForms from "views/forms/RegularForms.js";
import Calendar from "views/Calendar.js";
import Widgets from "views/Widgets.js";
import Charts from "views/Charts.js";
import Dashboard from "views/Dashboard.js";
import Buttons from "views/components/Buttons.js";
import SweetAlert from "views/components/SweetAlert.js";
import Notifications from "views/components/Notifications.js";
import Grid from "views/components/Grid.js";
import Typography from "views/components/Typography.js";
import Panels from "views/components/Panels.js";
import Icons from "views/components/Icons.js";
import Pricing from "views/pages/Pricing.js";
import Register from "views/pages/Register.js";
import Timeline from "views/pages/Timeline.js";
import User from "views/pages/User.js";
import Login from "views/pages/Login.js";
import Logout from "views/pages/Logout.js";
import Lock from "views/pages/Lock.js";
import FinancialMetrics from "views/FinancialMetrics.js";
import InstallMetrics from "views/InstallMetrics.js";

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/installMetrics",
    name: "Install Metrics",
    icon: "tim-icons icon-chart-pie-36",
    component: InstallMetrics,
    layout: "/admin",
  },
  {
    path: "/financialMetrics",
    name: "Financial Metrics",
    icon: "tim-icons icon-chart-pie-36",
    component: FinancialMetrics,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Pages",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        mini: "P",
        component: Pricing,
        layout: "/auth",
      },
      {
        path: "/timeline",
        name: "Timeline",
        mini: "T",
        component: Timeline,
        layout: "/admin",
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth",
      },
      {
        path: "/logout",
        name: "Logout",
        mini: "L",
        component: Logout,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        component: Register,
        layout: "/auth",
      },
      {
        path: "/lock-screen",
        name: "Lock Screen",
        mini: "LS",
        component: Lock,
        layout: "/auth",
      },
      {
        path: "/user-profile",
        name: "User Profile",
        mini: "UP",
        component: User,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    icon: "tim-icons icon-molecule-40",
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        mini: "MLT",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            mini: "B",
            component: Buttons,
            layout: "/admin",
          },
        ],
      },
      {
        path: "/buttons",
        name: "Buttons",
        mini: "B",
        component: Buttons,
        layout: "/admin",
      },
      {
        path: "/grid-system",
        name: "Grid System",
        mini: "GS",
        component: Grid,
        layout: "/admin",
      },
      {
        path: "/panels",
        name: "Panels",
        mini: "P",
        component: Panels,
        layout: "/admin",
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "Notifications",
        mini: "N",
        component: Notifications,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        mini: "I",
        component: Icons,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "Typography",
        mini: "T",
        component: Typography,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms,
        layout: "/admin",
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms,
        layout: "/admin",
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms,
        layout: "/admin",
      },
      {
        path: "/setup",
        name: "Setup",
        mini: "W",
        component: Wizard,
        layout: "/auth",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        mini: "RT",
        component: RegularTables,
        layout: "/admin",
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        mini: "ET",
        component: ExtendedTables,
        layout: "/admin",
      },
      {
        path: "/react-tables",
        name: "React Tables",
        mini: "RT",
        component: ReactTables,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    icon: "tim-icons icon-pin",
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        mini: "GM",
        component: GoogleMaps,
        layout: "/admin",
      },
      {
        path: "/full-screen-map",
        name: "Full Screen Map",
        mini: "FSM",
        component: FullScreenMap,
        layout: "/admin",
      },
      {
        path: "/vector-map",
        name: "Vector Map",
        mini: "VM",
        component: VectorMap,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: "tim-icons icon-settings",
    component: Widgets,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    icon: "tim-icons icon-chart-bar-32",
    component: Charts,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "tim-icons icon-time-alarm",
    component: Calendar,
    layout: "/admin",
  },
];

export const navRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Metrics",
    icon: "tim-icons icon-chart-bar-32",
    state: "metricsCollapse",
    views: [
      {
        path: "/installMetrics",
        name: "Install Metrics",
        mini: "IM",
        component: InstallMetrics,
        layout: "/admin",
      },
      {
        path: "/financialMetrics",
        name: "Financial Metrics",
        mini: "FM",
        component: FinancialMetrics,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Expenses",
    icon: "tim-icons icon-bank",
    state: "expensesCollapse",
    views: [
      {
        path: "/monthlyExpenses",
        name: "Monthly Expenses",
        mini: "ME",
        component: Pricing,
        layout: "/admin",
      },
      {
        path: "/adExpenses",
        name: "Ad Expenses",
        mini: "AD",
        component: Timeline,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/customers",
    name: "Merchants",
    icon: "tim-icons icon-single-02",
    component: Dashboard,
    layout: "/admin",
  },
];
