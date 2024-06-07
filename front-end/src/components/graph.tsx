import {Box, Typography} from "@mui/material";
import {LineChart} from "@mui/x-charts";

type GraphData = {
    data: number[],
    name: string
}

export const Graph = ({data, name}: GraphData) => {
    return (
        <Box sx={{"margin-bottom": "45px"}}>
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
            <Typography style={{position: "absolute", "margin-left": "5vw"}} variant={"h6"}>{name}</Typography>
        </Box>

    )
}