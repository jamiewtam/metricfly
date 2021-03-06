import Wizard from "views/forms/Wizard.js";
import Dashboard from "views/pages/metrics/Dashboard";
import Pricing from "views/pages/authentication/Pricing";
import Register from "views/pages/authentication/Register.js";
import Timeline from "views/pages/Merchants/Timeline";
import Merchants from "views/pages/Merchants/Merchants";
import User from "views/pages/user/User.js";
import Login from "views/pages/authentication/Login.js";
import Logout from "views/pages/authentication/Logout.js";
import Lock from "views/pages/authentication/Lock.js";
import FinancialMetrics from "views/pages/metrics/FinancialMetrics.js";
import InstallMetrics from "views/pages/metrics/InstallMetrics.js";
import MonthlyExpenses from "views/pages/expenses/monthlyExpenses/MonthlyExpenses";
import AdAccounts from "views/pages/expenses/adAccounts/AdAccounts";
import SyncData from "views/pages/syncData";
import PrivacyPolicy from "views/pages/privacy/privacyPolicy";
import TermsAndConditions from "views/pages/privacy/termsAndConditions";
import WaitToAccept from "views/pages/WaitToAccept";

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
    path: "/monthlyExpenses",
    name: "Monthly Expenses",
    mini: "ME",
    component: MonthlyExpenses,
    layout: "/admin",
  },
  {
    path: "/adAccounts",
    name: "Ad Accounts",
    mini: "AD",
    component: AdAccounts,
    layout: "/admin",
  },
  {
    path: "/merchants",
    name: "Merchants",
    mini: "M",
    component: Merchants,
    layout: "/admin",
  },
  {
    path: "/pricing",
    name: "Pricing",
    mini: "P",
    component: Pricing,
    layout: "/auth",
  },
  {
    path: "/timeline/:store",
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
  {
    path: "/setup",
    name: "Setup",
    mini: "W",
    component: Wizard,
    layout: "/auth",
  },
  {
    path: "/syncData/:initialSync",
    name: "Sync Shopify Partner Data",
    mini: "T",
    component: SyncData,
    layout: "/auth",
  },
  {
    path: "/waitToAccept",
    name: "Wait to Accept",
    mini: "Wait",
    component: WaitToAccept,
    layout: "/auth",
  },
  {
    path: "/privacyPolicy",
    name: "Privacy Policy",
    mini: "P",
    component: PrivacyPolicy,
    layout: "/auth",
  },
  {
    path: "/termsAndConditions",
    name: "Terms and Conditions",
    mini: "T",
    component: TermsAndConditions,
    layout: "/auth",
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
        component: MonthlyExpenses,
        layout: "/admin",
      },
      {
        path: "/adAccounts",
        name: "Ad Accounts",
        mini: "AD",
        component: AdAccounts,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/merchants",
    name: "Merchants",
    icon: "tim-icons icon-single-02",
    component: Merchants,
    layout: "/admin",
  },
];
