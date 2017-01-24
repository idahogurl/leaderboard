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
const react_1 = require("react");
class LeaderBoardRow extends react_1.Component {
    render() {
        return (React.createElement("div", null));
    }
}
class LeaderBoardColumn {
}
class User {
}
class UserDataSrv {
}
class LeaderBoard extends react_1.Component {
    constructor() {
        super();
        debugger;
        this.users = [];
        this.fetchUsers();
    }
    fetchUsers() {
        // Performing a GET request
        Axios.get(serviceUrl)
            .then(function (response) {
            this.users = JSON.stringify(response.data);
            console.log(response.status); // ex.: 200
        });
    }
    render() {
        return (React.createElement("div", null));
    }
}
ReactDOM.render(React.createElement(LeaderBoard, null), document.getElementById("leaderBoard"));
