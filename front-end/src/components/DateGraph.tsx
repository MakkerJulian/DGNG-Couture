import { LineChart } from "@mui/x-charts"
import dayjs from "dayjs"

type DateGraphProps = {
    timeStamps: Date[],
    data: Array<number>
    yAxisLabel?: string
}

export const DateGraph = ({timeStamps, data, yAxisLabel}: DateGraphProps) => {
    return <LineChart
        xAxis={[
            {
                label: "Date",
                data: timeStamps,
                tickInterval: "auto",
                scaleType: "time",
                valueFormatter: (date) => dayjs(date).format("MMM D"),
            },
        ]}
        yAxis={[{ label: yAxisLabel }]}
        series={[
            {
                data: data,
            },
        ]}
        height={400}
    />
}