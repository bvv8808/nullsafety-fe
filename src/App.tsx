import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

import MainScreen from "./Screens/Main";
import ContentListScreen from "./Screens/ContentList";
import SignInScreen from "./Screens/admin/SignIn";
import DashboardScreen from "./Screens/admin/Dashboard";
import AdmContentListScreen from "./Screens/admin/ContentList";
import EditCategoryScreen from "./Screens/admin/EditCategory";
import WriteContentScreen from "./Screens/admin/WriteContent";
import ModifyContentScreen from "./Screens/admin/ModifyContent";
import ContentDetailScreen from "./Screens/ContentDetail";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Route path="/" component={MainScreen} exact />
      <Route path="/contents" component={ContentListScreen} />
      <Route path="/content/:cid" component={ContentDetailScreen} exact />
      <Route path="/adm/signin" component={SignInScreen} />
      <Route path="/adm/dash" component={DashboardScreen} />
      <Route path="/adm/write" component={WriteContentScreen} />
      <Route path="/adm/modify" component={ModifyContentScreen} />
      <Route path="/adm/editCategory" component={EditCategoryScreen} />
      <Route path="/adm/contents" component={AdmContentListScreen} />
    </RecoilRoot>
  );
}

export default App;
