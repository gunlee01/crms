import React, { Component } from "react";
import Sidemenu from "../sidemenu/sidemenu";
import "./dashboard.scss";
import DashboardTable from "./dashboard-table";
import NumberWidget from "./number-widget";
import { Line as LineChart } from "react-chartjs-2";

const tableData = [
    {
        index: 1,
        cloudID: "클라우드아이디",
        changeResource: "변경",
        time: "2020-02-02",
        condition: "변경",
    },
    {
        index: 2,
        cloudID: "클라우드아이디",
        changeResource: "추가",
        time: "2020-02-02",
        condition: "추가",
    },
    {
        index: 3,
        cloudID: "클라우드 아이디",
        changeResource: "삭제",
        time: "2020-02-02",
        condition: "삭제",
    },
    {
        index: 4,
        cloudID: "클라우드 아이디",
        changeResource: "기본값",
        time: "2020-02-02",
        condition: "",
    },
    {
        index: 5,
        cloudID: "abc12345",
        changeResource: "Security",
        time: "2020-02-02",
        condition: "",
    },
    {
        index: 6,
        cloudID: "test123456-63435-4",
        changeResource: "Database",
        time: "2020-02-02",
        condition: "",
    },
    {
        index: 7,
        cloudID: "클라우드 아이디",
        changeResource: "ABS",
        time: "2020-02-02",
        condition: "삭제",
    },
];

function chartData() {
    return {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "사용 요금",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#fff",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [45, 90, 83, 32, 50, 70],
            },
        ],
    };
}

const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 100,
    datasetFill: true,
    legendTemplate:
        '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
};

const styles = {
    graphContainer: {
        background: "#212125",
        borderRadius: ".5rem",
        padding: "15px",
    },
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: chartData(),
            statusData: undefined,
        };
    }

    async componentDidMount() {
        let statusData = await fetch(
            `http://localhost:4000/api/dashboard`
        ).then((res) => res.json());
        this.setState({ statusData: statusData["data"] });
    }

    getResourceStatusData(resource, type = undefined) {
        if (type) {
            return this.state.statusData
                ? this.state.statusData[resource][0] +
                      "/" +
                      this.state.statusData[resource][1]
                : "loading";
        }
        return this.state.statusData && this.state.statusData[resource][1] != 0
            ? (this.state.statusData[resource][0] /
                  this.state.statusData[resource][1]) *
                  100
            : 0;
    }

    render() {
        return (
            <div className="dashboard-page">
                <Sidemenu />
                <div className="board-container">
                    <h3 className="board__name">Dashboard</h3>
                    <div className="resource-list">
                        <div className="resource compute">
                            <div className="compute-list">
                                <NumberWidget
                                    className="compute surver"
                                    title="Server"
                                    number={this.getResourceStatusData(
                                        "server",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "server"
                                        ),
                                        label: "compute",
                                    }}
                                />
                                <NumberWidget
                                    className="compute volume"
                                    title="Volume"
                                    number={this.getResourceStatusData(
                                        "volume",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "volume"
                                        ),
                                        label: "Volume",
                                    }}
                                />
                                <NumberWidget
                                    className="compute ip"
                                    title="IP"
                                    number={this.getResourceStatusData(
                                        "ip",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData("ip"),
                                        label: "IP",
                                    }}
                                />
                                <NumberWidget
                                    className="compute key-pair"
                                    title="Key Pair"
                                    number={this.getResourceStatusData(
                                        "keyPair",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "keyPair"
                                        ),
                                        label: "keyPair",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="resource database">
                            <div>
                                <NumberWidget
                                    className="database db"
                                    title="Database"
                                    number={this.getResourceStatusData(
                                        "database",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "database"
                                        ),
                                        label: "database",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="resource storage">
                            <div className="compute-list">
                                <NumberWidget
                                    className="network vpc"
                                    title="VPC"
                                    number={this.getResourceStatusData(
                                        "vpc",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "vpc"
                                        ),
                                        label: "VPC",
                                    }}
                                />
                                <NumberWidget
                                    className="network subnet"
                                    title="Subnet"
                                    number={this.getResourceStatusData(
                                        "subnet",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "subnet"
                                        ),
                                        label: "Subnet",
                                    }}
                                />
                                <NumberWidget
                                    className="network security-group"
                                    title="Security Group"
                                    number={this.getResourceStatusData(
                                        "securityGroup",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "securityGroup"
                                        ),
                                        label: "Security Group",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="resource network">
                            <div>
                                <NumberWidget
                                    className="storage bucket"
                                    title="Bucket"
                                    number={this.getResourceStatusData(
                                        "storage",
                                        true
                                    )}
                                    progress={{
                                        value: this.getResourceStatusData(
                                            "storage"
                                        ),
                                        label: "storage",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="left-chart">
                            <h3>최근 6개월 사용 금액</h3>
                            <div style={styles.graphContainer}>
                                <LineChart
                                    data={this.state.data}
                                    options={options}
                                    width="500"
                                    height="260"
                                />
                            </div>
                        </div>
                        <div className="right-chart">
                            <h3 className="right-chart__title">LOG</h3>
                            <DashboardTable data={tableData} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
