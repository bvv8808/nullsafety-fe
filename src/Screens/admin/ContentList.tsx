import React, { useEffect, useState } from "react";
import { RouteChildrenProps } from "react-router";

const AdmContentListScreen = ({ history }: RouteChildrenProps) => {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    // fetch -> !result? history.back : render
  }, []);
  return !authed ? (
    <div></div>
  ) : (
    <div>
      <h1>Adm ContentList Screen</h1>
    </div>
  );
};

export default AdmContentListScreen;
