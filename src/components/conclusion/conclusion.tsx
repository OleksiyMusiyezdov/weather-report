import React from "react";
import { IChoosenCity, IPreparedDataItem } from "../../interfaces/interfaces";
import "./conclusion.css";

interface IConclusionProps {
  choosenCity: IChoosenCity;
  data: Array<IPreparedDataItem> | null;
}

export const Conclusion = ({ choosenCity, data = null }: IConclusionProps) => {
  const getTheBestDay = (type: "isUmbrella" | "isJacket") => {
    let theBestDay = "";
    if (data !== null) {
      const tmpArray = data.map((day) => day[type]);
      const index = tmpArray.indexOf(true);
      if (index === -1) {
        theBestDay = data[0].day;
      } else {
        theBestDay = data[index].day;
      }
    }
    return theBestDay;
  };

  const umbrellaDay = getTheBestDay("isUmbrella");
  const jacketDay = getTheBestDay("isJacket");

  return (
    <div className="conclusion">
      {choosenCity && (
        <>
          <p>
            The best day to sell a jacket in {choosenCity.label} is {jacketDay}
          </p>
          <p>
            The best day to sell a umbrella in {choosenCity.label} is{" "}
            {umbrellaDay}
          </p>
        </>
      )}
    </div>
  );
};
