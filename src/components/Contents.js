import React, { useState, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";
const Contents = () => {
  const [quarantineData, setQuarantineData] = useState({});
  const [confirmedData, setConfirmedData] = useState({});
  const [comparedData, setComparedData] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("https://api.covid19api.com/country/kr");
      makeData(res.data);
    };

    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const active = cur.Active;
        const death = cur.Deaths;
        const confirmed = cur.Confirmed;
        const recovered = cur.Recovered;

        const findItem = acc.find((a) => a.year === year && a.month === month);

        if (findItem && findItem.date < date) {
          findItem.active = cur.Active;
          findItem.confirmed = cur.Confirmed;
          findItem.recovered = cur.Recovered;
          findItem.death = cur.Deaths;
          findItem.date = date;
        }
        if (!findItem) {
          acc.push({ year, month, date, active, death, confirmed, recovered });
        }
        return acc;
      }, []);

      const labels = arr.map((a) => `${a.month + 1}월`);
      const quarantined = {
        labels,
        datasets: [
          {
            label: "국내 격리자 추이",
            borderColor: "cadetblue",
            fill: false,
            data: arr.map((a) => a.active),
          },
        ],
      };
      const confirmed = {
        labels,
        datasets: [
          {
            label: "국내 누적 확진자 추이",
            backgroundColor: "salmon",
            borderColor: "salmon",
            fill: false,
            data: arr.map((a) => a.confirmed),
          },
        ],
      };
      const last = arr[arr.length - 1];
      const compared = {
        labels: ["누적확진", "격리해제", "사망"],
        datasets: [
          {
            label: "누적 확진,해제,사망 비율",
            backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
            borderColor: ["#ff3d67", "#059bff", "#ffc233"],
            fill: false,
            data: [last.confirmed, last.recovered, last.death],
          },
        ],
      };
      setQuarantineData(quarantined);
      setConfirmedData(confirmed);
      setComparedData(compared);
    };
    fetchEvents();
  }, []);

  return (
    <div className="contents">
      <div>
        <Bar
          data={confirmedData}
          options={{
            title: {
              display: true,
              text: "누적 확진자 동향",
              fontSize: 16,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
      <div>
        <Line
          data={quarantineData}
          options={{
            title: {
              display: true,
              text: "월별 격리자 추이",
              fontSize: 16,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
      <div>
        <Doughnut
          data={comparedData}
          options={{
            title: {
              display: true,
              text: "누적 확진,해제,사망",
              fontSize: 16,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Contents;
