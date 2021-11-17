import React from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = ({activeChart, Axis, Labels}) => {

    return (
        activeChart
            ?
            <div>
                <Line
                    height = {400}
                    weight = {500}
                    data={{
                        labels: Axis,
                        datasets: Labels
                        }
                    }
                    options={{
                        maintainAspectRatio: false
                    }}

                />
            </div>
            :
            <div/>
    );
};

export default LineChart;