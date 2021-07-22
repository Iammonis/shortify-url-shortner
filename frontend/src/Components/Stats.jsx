import React from "react";
import styled from "styled-components";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";

const StatsDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${(props) => props.theme.bodyBackground};
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.primaryColor};

  .wrapper {
    max-width: 1024px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }

  .info {
    width: 100%;
    /* min-height: 50%; */
    font-size: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .box {
      max-width: 100%;
      margin-bottom: 20px;
      background: ${(props) => props.theme.primaryColor};
      color: ${(props) => props.theme.secondaryColor};
      font-size: 20px;
      padding: 10px;
      border-radius: 8px;
      word-wrap: break-word;
    }

    div.box:first-child {
      margin-top: 0;
    }

    a {
      text-decoration: none;
      color: ${(props) => props.theme.secondaryColor};
    }
  }

  .charts {
    display: flex;
    width: 100%;
    max-width: 100%;
    /* min-height: 50%; */
    /* height: 100%; */
    justify-content: center;
    align-items: center;
    flex-direction: row;
    /* min-height: 100%; */
  }

  .pie {
    max-width: 300px;
    max-height: 300px;
  }

  .miniChartDivs {
    max-width: 100%;
    display: flex;
  }

  @media (max-width: 900px) {
    .charts {
      flex-direction: column;
    }
  }
  @media (max-width: 650px) {
    .miniChartDivs {
      flex-direction: column;
    }
  }
`;

export const Stats = () => {
  const { theme } = React.useContext(AppContext);
  const [data, setData] = React.useState(null);
  const { code } = useParams();

  React.useEffect(() => {
    !data &&
      axios
        .get(`https://url-shortner-shortify.herokuapp.com/stats/${code}`)
        .then((res) => setData(res.data));
  });

  const getValues = (data, label) => {
    let res = {
      labels: [],
      datasets: [
        {
          label,
          backgroundColor: [],
          data: [],
        },
      ],
    };

    for (let key in data) {
      res.labels.push(key);
      res.datasets[0].backgroundColor.push(data[key].color);
      res.datasets[0].data.push(data[key].val);
    }

    return res;
  };
  return (
    <StatsDiv theme={theme}>
      {data && (
        <div className="wrapper">
          <div className="info">
            <div className="box">Total views - {data.linkData.views}</div>
            <div className="box">
              URL - <a href={data.linkData.url}>{data.linkData.url}</a>
            </div>
            <div className="box">
              Shortify URL -{" "}
              <a
                href={`https://shortify-rose.vercel.app/${data.linkData.code}`}
              >{`https://shortify-rose.vercel.app/${data.linkData.code}`}</a>
            </div>
          </div>
          <div className="charts">
            <div className="miniChartDivs">
              <div className="pie browser">
                <Pie
                  data={getValues(data.userData.browser, "Browsers used")}
                  options={{
                    title: {
                      display: true,
                      text: "Browsers used",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
              <div className="pie platform">
                <Pie
                  data={getValues(data.userData.platform, "Platforms used")}
                  options={{
                    title: {
                      display: true,
                      text: "Platforms used",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>
            <div className="miniChartDivs">
              <div className="pie os">
                <Pie
                  data={getValues(data.userData.os, "OS used")}
                  options={{
                    title: {
                      display: true,
                      text: "OS used",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </StatsDiv>
  );
};
