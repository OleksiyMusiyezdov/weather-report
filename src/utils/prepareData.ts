import { IPreparedDataItem, IWeather } from "../interfaces/interfaces";

export const prepareData = (data: any): Array<IPreparedDataItem> => {
  // yyyy-mm-dd
  const today = new Date().toISOString().slice(0, 10);

  let indexOfTomorrow = 0;
  data.list.forEach((timestamp: any) => {
    if (timestamp.dt_txt.slice(0, 10) === today) {
      indexOfTomorrow += 1;
    }
  });

  /*
  There are 8 timestamps during the day
  We need a forecast for 5 days
  */
  const makeFiveDays = (indexOfTomorrow: number) => {
    let fiveDays = [];
    let index = indexOfTomorrow;
    for (let i = 0; i < 5; i++) {
      const oneDay = data.list.slice(index, index + 8);
      fiveDays.push(oneDay);
      index += 8;
    }
    return fiveDays;
  };
  const fiveDaysArray = makeFiveDays(indexOfTomorrow);

  const preparedData: Array<IPreparedDataItem> = fiveDaysArray.map((day) => {
    const weather = day.map((timestamp: any) => {
      return {
        time: timestamp.dt_txt.slice(11, 16),
        rain: timestamp.weather[0].main,
        temperature: Math.ceil(timestamp.main.temp),
      };
    });

    const isUmbrella = weather.map((w: IWeather) => w.rain).includes("Rain");
    const isJacket = weather
      .map((w: IWeather) => w.rain)
      .filter((w: IWeather) => w.temperature < 18).length;

    return {
      day: day[0].dt_txt.slice(0, 10),
      weather,
      isUmbrella,
      isJacket: isJacket > 0 ? true : false,
    };
  });

  return preparedData;
};
