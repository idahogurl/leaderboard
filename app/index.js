/*
User Story: I can see a table of the Free Code Camp campers who've earned the most brownie points in the past 30 days.

User Story: I can see how many brownie points they've earned in the past 30 days, and how many they've earned total.

User Story: I can toggle between sorting the list by how many brownie points they've earned in the past 30 days and by how many brownie points they've earned total.

Hint: To get the top 100 campers for the last 30 days: https://fcctop100.herokuapp.com/api/fccusers/top/recent.
[{"username":"Manish-Giri","img":"https://avatars.githubusercontent.com/u/11348778?v=3","alltime":3604,"recent":707,"lastUpdate":"2017-01-23T19:55:17.072Z"},{"username":"JohnPaulWalsh","img":"https://avatars.githubusercontent.com/u/9558634?v=3","alltime":897,"recent":498,"lastUpdate":"2017-01-23T20:13:00.839Z"}]


Hint: To get the top 100 campers of all time: https://fcctop100.herokuapp.com/api/fccusers/top/alltime.

#	Camper Name	Points in past 30 days	All time points
Standing Avatar Username brownie points last 30 days, total brownie points
*/
"use strict";
const serviceUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const React = require('react');
const ReactDOM = require('react-dom');
const Axios = require('axios');
require('./sass/styles.scss');
const react_1 = require("react");
class LeaderBoardHeaderRow extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let columns = this.props.columns.map(column => {
            if (column.allowSort) {
                return React.createElement("div", { className: (column.sorted ? "sorted " : "") + "allow-sort col-xs-" + column.width, key: column.dataColumn }, column.headerText);
            }
            else {
                return React.createElement("div", { className: "col-xs-" + column.width, key: column.dataColumn, onClick: this.props.onClick }, column.headerText);
            }
        });
        return (React.createElement("div", { className: "row", key: "1" }, columns));
    }
}
class LeaderBoardRow extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;
        let columns = this.props.columns.map(column => {
            return React.createElement("div", { className: "col-xs-" + column.width, key: column.dataColumn + "_" + user.username }, user[column.dataColumn]);
        });
        return (React.createElement("div", { className: "row" }, columns));
    }
}
class LeaderBoardColumn {
    constructor(headerText, dataColumn, width, allowSort, sorted) {
        this.headerText = headerText;
        this.dataColumn = dataColumn;
        this.allowSort = allowSort;
        this.sorted = sorted;
        this.width = width;
    }
}
class User {
}
class LeaderBoard extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        debugger;
        let i = 1;
        let rows = this.props.users.map(user => {
            debugger;
            user.standing = i++;
            return React.createElement(LeaderBoardRow, { user: user, columns: this.props.columns, key: user.username });
        });
        return (React.createElement("div", null,
            rows.length > 0 ? React.createElement(LeaderBoardHeaderRow, { columns: this.props.columns, onClick: this.props.onClick }) : "",
            rows));
    }
}
class LeaderBoardColSrv {
    static getColumns() {
        let columns = [new LeaderBoardColumn("#", "standing", 1, false, false),
            new LeaderBoardColumn("Camper Name", "username", 5, false, false),
            new LeaderBoardColumn("Points last 30 days", "recent", 3, true, true),
            new LeaderBoardColumn("All time points", "alltime", 3, true, false)];
        return columns;
    }
}
class LeaderBoardContainer extends react_1.Component {
    constructor() {
        super();
        this.state = { users: [] };
        this.handleClick.bind(this);
    }
    componentDidMount() {
        debugger;
        var self = this;
        // Performing a GET request
        Axios.get(serviceUrl)
            .then(function (response) {
            self.setState({ users: response.data });
        });
    }
    handleClick(e) {
        debugger;
        this.state.users.sort(function (a, b) {
            return b.recent - a.recent;
        });
    }
    render() {
        debugger;
        let columns = LeaderBoardColSrv.getColumns();
        return React.createElement("div", null,
            React.createElement(LeaderBoard, { users: this.state.users, columns: columns, onClick: this.handleClick }));
    }
}
ReactDOM.render(React.createElement(LeaderBoardContainer, null), document.getElementById("leaderBoard"));
