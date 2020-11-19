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

import Wizard from "views/forms/Wizard.js";
import Dashboard from "views/Dashboard.js";
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
      {
        path: "/setup",
        name: "Setup",
        mini: "W",
        component: Wizard,
        layout: "/auth",
      },
    ],
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
