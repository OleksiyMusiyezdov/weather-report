export interface IChoosenCity {
  value: string;
  label: string;
}
export interface IWeather {
  map(arg0: (w: IWeather) => JSX.Element): import("react").ReactNode;
  time: string;
  rain: string;
  temperature: number;
}

export interface IPreparedDataItem {
  day: string;
  weather: IWeather;
  isUmbrella: boolean;
  isJacket: boolean;
}
