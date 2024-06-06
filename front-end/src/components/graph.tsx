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
        ]}/>
    )
}