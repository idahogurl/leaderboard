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

const serviceUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/";
const React = require('react');
const ReactDOM = require('react-dom');
const Axios = require('axios');

require('./sass/styles.scss');

import {Component} from 'react';

class LeaderBoardHeaderRow extends Component<any,any> {
    constructor(props) {
        super(props);
    }
    render() {
        let columns = this.props.columns.map(
            column => {
                if (column.allowSort) { 
                    
                    let className = (this.props.endpoint === column.dataColumn ? "sorted " : "") 
                        + "allow-sort col-xs-" + column.width;

                    return <div className={className} id={column.dataColumn} key={column.dataColumn} 
                            onClick={this.props.onClick}>{column.headerText}</div>;
                } else {
                    return <div className={"col-xs-" + column.width} key={column.dataColumn}>{column.headerText}</div>;
                }
            }
        );
        return (<div className="row" key="1">{columns}</div>);
    }
}

class LeaderBoardRow extends Component<any,any> {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;
        let columns = this.props.columns.map(
            column => {
                return <div className={"col-xs-" + column.width} key={column.dataColumn + "_" + user.username}>{user[column.dataColumn]}</div>;
            }
        );

        return (<div className="row">{columns}</div>);
    }
}

class LeaderBoardColumn {
    width: number;
    headerText: string;
    dataColumn: string;
    allowSort: boolean;

    constructor(headerText: string, dataColumn: string, width: number, allowSort: boolean) {
        this.headerText = headerText;
        this.dataColumn = dataColumn;
        this.allowSort = allowSort;
        this.width = width;
    }
}

class User {
    username: string;
    img: string;
    alltime: number;
    recent: number;
    lastUpdate: string;
    standing: number;
}

class LeaderBoard extends Component<any,any> {
    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        let i = 1;
        let rows = this.props.users.map(
            user => {
                user.standing = i++;
                return <LeaderBoardRow user={user} columns={this.props.columns} key={user.username}/>
            }
        );
        return (<div>
            {rows.length > 0 ? <LeaderBoardHeaderRow columns={this.props.columns} endpoint={this.props.endpoint} onClick={this.props.onClick}/> : ""}
            {rows}
        </div>);
    }
}

class LeaderBoardColSrv {
    static getColumns() : LeaderBoardColumn[] {
        let columns = [ new LeaderBoardColumn ("#","standing",1,false),
            new LeaderBoardColumn("Camper Name","username",5,false),
            new LeaderBoardColumn("Points last 30 days","recent",3,true),
            new LeaderBoardColumn("All time points","alltime",3,true)];
        return columns;
    }
}

class LeaderBoardContainer extends Component<any,any> {
    constructor() {
        super();
        this.state = {users:[], serviceEndpoint: "recent"};

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        debugger;
        this.fetchUsers("recent");
    }

    fetchUsers(endpoint) {
        var self = this;
        // Performing a GET request
        Axios.get(serviceUrl + endpoint)
        .then(function(response){
            self.setState({users: response.data, endpoint: endpoint});
        });
    }

    handleClick(e) {
        this.fetchUsers(e.target.id);
    }

    render() {
    debugger;
    let columns : LeaderBoardColumn[] = LeaderBoardColSrv.getColumns();
    return <div><LeaderBoard users={this.state.users} columns={columns} endpoint={this.state.endpoint} onClick={this.handleClick}/></div>;
    }
}

ReactDOM.render(<LeaderBoardContainer/>, document.getElementById("leaderBoard"));