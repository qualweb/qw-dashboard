import './ContinuousChart.css'
import { AutoVizuA11y } from "@feedzai/autovizua11y";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { Axis, TickFormatter } from "@visx/axis";
import { LinePath } from "@visx/shape";
import { useEffect, useState, useRef } from "react";
import { extent } from "d3-array";

interface ContinuousChartProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chartData: any[];
    selectedMetric: string;
}

function ContinuousChart(props: ContinuousChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
        
                setWidth(offsetWidth || 380);
                setHeight(offsetHeight || 200);
                setIsReady(true);

            }
        };
    
        const timer = setTimeout(() => {
            updateDimensions();
        }, 1000);

        updateDimensions();
    
        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });
    
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
    
        return () => {
            clearTimeout(timer);
            resizeObserver.disconnect();
        };
    }, [width, height, containerRef, props.selectedMetric]);

    if (!props.chartData || props.chartData.length === 0) {
        return <div>Loading chart data...</div>;
    }

    const dataTransformed = props.chartData.map((data, index) => {
        const cycleDate = data["cycle_date"];
        const date = new Date(
            cycleDate["year"],
            cycleDate["month"] - 1,
            cycleDate["day"],
            cycleDate["hour"],
            cycleDate["minute"],
            cycleDate["second"]
        );
        
        return {
            x: date,
            y: data["data"][props.selectedMetric], 
            dateString: date.toLocaleString(),
            index: index
        };
    });

    console.log("dataTransformed", dataTransformed);

    console.log("dataTransformed", dataTransformed);

    const chartDimensions = {
        width: width,
        height: height,
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 50,
        marginRight: 50,
    };

    const xMax = chartDimensions.width - chartDimensions.marginLeft - chartDimensions.marginRight;
    const yMax = chartDimensions.height - chartDimensions.marginTop - chartDimensions.marginBottom;

    const yExtent = extent(dataTransformed, d => Number(d.y)) as [number, number];

    const xScale = scaleLinear({
        range: [0, xMax],
        domain: [0, dataTransformed.length - 1],
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [Math.min(0, yExtent[0]), yExtent[1]],
        nice: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bottomLabelProps: any = () => ({
        "aria-hidden": "true",
        fontSize: 12,
        textAnchor: "middle",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leftTickLabelProps: any = () => ({
        "aria-hidden": "true",
        fontSize: 12,
        x: -10,
        dy: 5,
        textAnchor: "end",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatXAxis : TickFormatter<any> = (_: any, index: number) => {
        if (dataTransformed[index] && dataTransformed[index].x) {
            const date = dataTransformed[index].x;
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return "";
    };

    const accessibilityData = dataTransformed.map((item) => ({
        "Date": item.dateString,
        [props.selectedMetric]: item.y
    }));

    return (
        <div className="continuous-chart" ref={containerRef} >
            {dataTransformed.length > 0 && isReady ? (
                <AutoVizuA11y
                    data={accessibilityData}
                    type="Single line chart"
                    selectorType={{ element: "circle" }}
                    title={`${props.selectedMetric} over time`}
                    manualDescriptions={{
                        longer: `This line chart shows the progression of ${props.selectedMetric} across ${dataTransformed.length} data points over time. The values range from ${yExtent[0]?.toFixed(2)} to ${yExtent[1]?.toFixed(2)}.`,
                        shorter: `${props.selectedMetric} trends over time with ${dataTransformed.length} data points.`,
                    }}
                    context={"Data portrays the growth in population in India in the last decade "}
                    insights="The chart shows the trend of the selected metric over time, with data points representing specific dates and values. The x-axis represents time, while the y-axis represents the metric value. The line connects these points to illustrate the trend."
                >
                    <svg width={chartDimensions.width} height={chartDimensions.height}>
                        <Group left={chartDimensions.marginLeft} top={chartDimensions.marginTop}>
                            <GridColumns
                                scale={xScale}
                                numTicks={4}
                                strokeWidth={0.8}
                                width={xMax}
                                height={yMax}
                            />
                            <Axis
                                scale={yScale}
                                orientation="left"
                                hideAxisLine
                                numTicks={4}
                                tickLength={5}
                                tickLabelProps={leftTickLabelProps}
                            />
                            {dataTransformed.map((data, index) => (
                                <circle
                                    key={`circle-${index}`}
                                    cx={xScale(data.index)}
                                    cy={yScale(Number(data.y))}
                                    r={3}
                                    opacity={1}
                                    fill="orange"
                                />
                            ))}
                            <LinePath
                                data={dataTransformed}
                                x={(d) => xScale(d.index)}
                                y={(d) => yScale(Number(d.y))}
                                stroke="orange"
                                strokeWidth={1}
                            />
                            <Axis
                                scale={xScale}
                                orientation="bottom"
                                tickFormat={formatXAxis}
                                top={yMax}
                                tickLength={5}
                                tickLabelProps={bottomLabelProps}
                                numTicks={Math.min(4, dataTransformed.length)}  // Proper parameters
                                tickValues={
                                    dataTransformed.length <= 4 
                                        ? dataTransformed.map((_, i) => i)  
                                        : [0, Math.floor(dataTransformed.length / 3), Math.floor(2 * dataTransformed.length / 3), dataTransformed.length - 1]  // Show 4 evenly distributed
                                }
                            />
                        </Group>
                    </svg>
                </AutoVizuA11y>
            ) : (
                <div>Loading data...</div>
            )}
        </div>
    );
}

export default ContinuousChart;