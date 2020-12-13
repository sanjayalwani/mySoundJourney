import React, { useEffect, useRef } from 'react';
//Chart.js import for comparison
import Chart from 'chart.js';

/**
 * Renders a chart for the given track feature set with time labels.
 *
 * @param {Array}  images The cover art for each track
 * @param {String} chart_id The HTML id of the canvas for the chart 
 * @param {Array}  feature_data The values of the feature for each track 
 * @param {Array}  x_data The time listened labels for each track 
 * @param {String} feature_label The label of the feature (for tooltip)
 * @param {String} line_color The color of the line
 * @param {Array}  current_slice The slice for the current session for paged views
 * @param {Array}  tracks The recent tracks object for names
 * @return {JSX}   Canvas component
 */
const TrackChart = props => {
    
    const trackChart = useRef(undefined);
    
    //Chart.js setup
    useEffect(() => {
        
        if(trackChart.current!==undefined){
            trackChart.current.destroy();
        }
        const ctx = document.getElementById(props.chart_id);
        const images = props.images;
        const time_labels = props.x_data;
        const feature_data = props.feature_data;
        const feature_opts = {
            labels: time_labels.slice(props.current_slice[0], props.current_slice[1]),
            datasets: [{
                fill: false,
                label: props.feature_label,
                data: feature_data.slice(props.current_slice[0], props.current_slice[1]),
                borderColor: props.line_color,
                backgroundColor: props.line_color,
                pointRadius: 1,
                pointHitRadius: 15,
                pointStyle: images.slice(props.current_slice[0], props.current_slice[1]),
                lineTension: 0,
            }]
        };
        trackChart.current = new Chart(ctx, {
            type: 'line',
            data: feature_opts,
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                fill: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        display: true,
                        labelString: 'Date',
                        time: {
                            unit: 'minute'
                        },
                        ticks: {
                            suggestedMin: feature_data[props.current_slice[1]],
                            suggestedMax: feature_data[props.current_slice[0]]
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 100
                        },
                        legend: {
                            display: false
                        },
                        display: true
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return props.tracks[tooltipItem[0].index + props.current_slice[0]].track.name;
                        },
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
        
                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                },
                distribution: 'linear',
                bounds: 'data'
            }
        });
        
    });

    return (
        <canvas id={props.chart_id} 
                height={window.innerWidth>700? "80px" : "120px"}>
        </canvas>
    )
}

export default TrackChart;