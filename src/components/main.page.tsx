import React from "react";

interface IMain {
  choosenCity: string;
}

export const Main = ({ choosenCity }: IMain) => {
  return (
    <div className="main">
      {choosenCity && <p>Your city is "{choosenCity}"</p>}
    </div>
  );
};
