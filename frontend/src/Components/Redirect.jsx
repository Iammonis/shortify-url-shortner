import React from "react";
import { useParams } from "react-router-dom";

export const Redirect = () => {
  const { code } = useParams();
  React.useEffect(() => {
    window.location.assign(`https://url-shortner-shortify.herokuapp.com/${code}`);
  });
  return null;
};
