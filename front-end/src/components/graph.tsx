import {LineChart} from "@mui/x-charts";

type GraphData = {
    data: number[]
}

export const Graph = ({data}: GraphData) => {
    return (
        <LineChart series={[
            {
                data: data
            }
        ]}
                   yAxis={[{
                       colorMap: {
                           type: 'piecewise',
                           thresholds: [0,30],
                           colors: ['blue', 'green', 'red']
                       }
                   }]}
        />
    )
}