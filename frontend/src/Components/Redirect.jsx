import React from "react";
import { useParams } from "react-router-dom";

export const Redirect = () => {
  const { code } = useParams();
  React.useEffect(() => {
    window.location.assign(`http://localhost:1234/${code}`);
  });
  return null;
};
