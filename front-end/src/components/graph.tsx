import {LineChart} from "@mui/x-charts";

export const Graph = (graphData) => {
    return (
        <LineChart series={[
            {
                data: graphData
            }
        ]}/>
    )
}