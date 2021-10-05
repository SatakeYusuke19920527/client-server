import React,{useEffect,useState} from 'react'
import Chart from 'react-apexcharts';

const Graph: React.FC<{}> = () => {
  const [element, setElement] = useState<number[]>([3, 2, 4, 1, 3, 6, 1, 2, 3, 5])
  const [category, setCategory] = useState<number[]>([1,2,3,4,5,6,7,8,9,10])
  const handleClick = () => {
    const num: number = Math.floor(Math.random() * 5)
    // console.log(num, 'num check')
    const year = category.slice(-1)[0] + 1;
    setCategory([...category, year ])
    setElement([...element, num])
    if (element.length >= 15) {
      category.shift()
      element.shift()
    }
    console.log(element)
  }
    const state = {
      options: {
        chart: {
          id: 'realtime',
          animations: {
            enabled: true,
            dynamicAnimation: {
              speed: 2000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'stepline',
          },
          title: {
            text: 'Dynamic Updating Chart',
            align: 'left',
          },
          markers: {
            size: 0,
          },
          xaxis: {
            type: 'datetime',
            range: 10000,
          },
          yaxis: {
            max: 100,
          },
          legend: {
            show: false,
          },
        },
        xaxis: {
          categories: category,
        },
      },
      series: [
        {
          data: element
        },
      ],
    };

    return (
      <div>
        <button
          onClick={handleClick}
        >
          button
        </button>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width={500}
          height={200}
        />
      </div>
    );
}

export default Graph
