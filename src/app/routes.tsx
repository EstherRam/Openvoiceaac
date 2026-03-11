import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import SentenceBuilding from "./pages/SentenceBuilding";
import IAmFeeling from "./pages/IAmFeeling";
import IWant from "./pages/IWant";
import GetHelp from "./pages/GetHelp";
import EmergencyCall from "./pages/EmergencyCall";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <SentenceBuilding /> },
        { path: "i-am-feeling", element: <IAmFeeling /> },
        { path: "i-want", element: <IWant /> },
        { path: "get-help", element: <GetHelp /> },
        { path: "help", element: <GetHelp /> }
      ]
    },
    { path: "/call/:contact", element: <EmergencyCall /> },
    { path: "/emergency-call", element: <EmergencyCall /> }
  ],
  {
    basename: "/Openvoiceaac"
  }
);
