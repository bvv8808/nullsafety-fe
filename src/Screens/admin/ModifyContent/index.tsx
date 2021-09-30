import React, { useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";
import LayoutAdm from "../../../base/LayoutAdm";
import { getToken } from "../../../lib/cookie";

const ModifyContentScreen = ({ history }: RouteChildrenProps) => {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    if (!getToken()) {
      alert("Permission denied");
      history.goBack();
    } else setAuthed(true);
  }, []);
  return !authed ? <div></div> : <LayoutAdm section="modify">Modify</LayoutAdm>;
};

export default ModifyContentScreen;
