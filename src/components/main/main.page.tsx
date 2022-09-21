import React from "react";
import { IChoosenCity } from "../../interfaces/interfaces";

interface IMainProps {
  choosenCity: IChoosenCity;
}

export const Main = ({ choosenCity }: IMainProps) => {
  return (
    <div className="main">
      {choosenCity && <h3>Your city is "{choosenCity.label}"</h3>}
      <div></div>
      <p>
        You can sell umbrellas on rainy days / You can sell jackets on days with
        temperature is under 18&#8451;
      </p>
    </div>
  );
};
