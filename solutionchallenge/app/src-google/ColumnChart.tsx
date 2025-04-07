
import React from "react";
import { Chart } from "react-google-charts";
import convertions from "../app-data/convertionOcupation"; 

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Transform the data from convertionOcupation.ts to the format required by Google Charts
const data = [
  ["Occupation", "Employment", { role: "style" }], // Header row
  ...convertions.map((item, index) => [
    item.occupation, 
    item.employment, 
    `color: ${getRandomColor()}`, 
  ]),
];

export function AppColumn() {
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={data}
    />
  );
}
