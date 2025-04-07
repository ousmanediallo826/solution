// At the top of your file
import dynamic from 'next/dynamic';
import type { ICirclePackingChartSpec } from "@visactor/vchart";
import convertions from "../../app-data/convertionOcupation";
import { addThousandsSeparator } from "../utils";


const VChart = dynamic(
  () => import('@visactor/react-vchart').then(mod => mod.VChart),
  { ssr: false } // This is crucial!
);


const chartData = convertions.map((item) => ({
    name: item.occupation,
    value: item.employment,
}));

const spec: ICirclePackingChartSpec = {
  
    data: [ { id: "data", values: chartData } ],
    type: "circlePacking",
    categoryField: "name",
    valueField: "value",

};


export default function Chart() {

  
    console.log(spec);
    console.log(chartData);

  
    return <VChart spec={spec} />;
}