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
      Component: Layout,
      children: [
        {
          index: true,
          Component: SentenceBuilding,
        },
        {
          path: "i-am-feeling",
          Component: IAmFeeling,
        },
        {
          path: "i-want",
          Component: IWant,
        },
        {
          path: "get-help",
          Component: GetHelp,
        },
        {
          path: "help",
          Component: GetHelp,
        },
      ],
    },
    {
      path: "/call/:contact",
      Component: EmergencyCall,
    },
    {
      path: "/emergency-call",
      Component: EmergencyCall,
    },
  ],
  {
    basename: "/Openvoiceaac/",
  }
);
