const API_KEY = "a18662479648448892ddff5fd09449d2";
const base_url = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
    .then(res => {
        if (res.status !== 200) {
            console.log("Error: " + res.status);
            return Promise.reject(new Error(res.statusText))
        } else {
            return Promise.resolve(res)
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err)
    })
};

const ENDPOINT_TEAMS = `${base_url}competitions/${LEAGUE_ID}/teams`;

function getAllTeams() {
    if ("caches" in window) {
        console.log("cache team available");
        caches.match(ENDPOINT_TEAMS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    showTeam(data);
                })
            }
        })
    }
    
    fetchAPI(ENDPOINT_TEAMS)
    .then(data => {
        showTeam(data);
    })
    .catch(error => {
        console.log(error)
    })
}

function showTeam(data) {
    let teams = "";
    let teamElement = document.getElementById("teams");

    data.teams.forEach(function(team) {
        teams += `
            <div class="card horizontal">
                    <div class="card-image">
                        <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 100px">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content" style="padding-top: 0">
                            <ul>
                                <li><a href="./detail.html?id=${team.id}"><b>${team.name}</a></b></li>
                                <li>Founded: ${team.founded}</li>
                                <li>Address: ${team.address}</li>`
                                if(team.email!=null) {
                                    teams += `<li>Email: ${team.email}</li>`
                                        } else {
                                            teams += `<li>Email: -</li>`
                                        }
                    teams += `</ul>
                        </div>
                        <div class="card-action">
                            <a href="${team.website}">Official Website</a>
                        </div>
                    </div>
                </div>
        `
    })

    teamElement.innerHTML = `
        <ul>
            <li>Name: ${data.competition.name}</li>
            <li>Plan: ${data.competition.plan}</li>
            <li>Last Updated: ${data.competition.lastUpdated}</li>
            <li>Start Date: ${data.season.startDate}</li>
            <li>End Date: ${data.season.endDate}</li>
            <li>Current Match Day: ${data.season.currentMatchday}</li>
        </ul>
        <div class="container">
        <div class="col s12">
            ${teams}
        </div>
        </div>
    `;
}

const ENDPOINT_STANDINGS = `${base_url}competitions/${LEAGUE_ID}/standings`;

function getAllStandings() {
    if ("caches" in window) {
        console.log("cache standing available");
        caches.match(ENDPOINT_STANDINGS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Standing Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_STANDINGS)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
    }

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("standings");
    const x=0;
    data.standings[x].table.forEach(function (standing) {
        standings += `
            <tr>
                <td>${standing.position}</td>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px"></td>
                <td><a href="./detail.html?id=${standing.team.id}">${standing.team.name}</a></td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
            </tr>
        `;
    });

    standingElement.innerHTML = `
        <ul>
            <li>Name: ${data.competition.name}</li>
            <li>Plan: ${data.competition.plan}</li>
            <li>Last Updated: ${data.competition.lastUpdated}</li>
            <li>Start Date: ${data.season.startDate}</li>
            <li>End Date: ${data.season.endDate}</li>
            <li>Current Match Day: ${data.season.currentMatchday}</li>
        </ul>
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="centered striped responsive-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Badge</th>
                        <th>Name</th>
                        <th>Played Games</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${standings}
                </tbody>
            </table>
        </div>
    `;
}

const ENDPOINT_DETAIL = `${base_url}teams/`;
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("id");

function getTeamById() {
    return new Promise(function(resolve, reject) { 
    if ("caches" in window) {
        console.log("cache teambyid available");
        caches.match(ENDPOINT_DETAIL+idParam).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team by ID Data: " + data);
                    showTeamById(data);
                    resolve(data);
                })
            }
        })
    }
  
    fetchAPI(ENDPOINT_DETAIL+idParam)
        .then(data => {
            showTeamById(data);
            resolve(data);
        })
        .catch(error => {
            console.log(error)
        })
    })
}

function showTeamById(data) {
    let detailHTML = "";
        detailHTML = `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="responsive-img" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:200px; margin-left:auto; margin-right:auto"/>
                </div>
                <div class="card-content">
                    <span class="card-title" style="font-weight:bolder">${data.name} - Squad Members</span>
                    <ol>`
                    for (i=0;i<data.squad.length;i++) {
                        detailHTML += `<li style="font-weight:bolder">${data.squad[i].name}</li>
                        <ul>`
                            if (data.squad[i].position!=null) {
                                detailHTML += `<li>Position: ${data.squad[i].position}</li>`
                            } else {
                                detailHTML += `<li>Position: -</li>`
                            }
                                detailHTML += `<li>Date of Birth: ${data.squad[i].dateOfBirth}</li>
                                <li>Country of Birth: ${data.squad[i].countryOfBirth}</li>
                                <li>Nationality: ${data.squad[i].nationality}</li>`
                                    if (data.squad[i].shirtNumber!=null) {
                                        detailHTML += `<li>Shirt Number: ${data.squad[i].shirtNumber}</li>`
                                    } else {
                                        detailHTML += `<li>Shirt Number: -</li>`
                                    }
                                    detailHTML += `<li>Role: ${data.squad[i].role}</li>
                        </ul>
                        <br>`
                    }
                    detailHTML +=`
                        </ol>
                        <div class="card-action" style="text-align: center;">
                            <a href="https://www.dicoding.com/users/850498" style="color: #4527a0;">&copy; 2020, Rahayu Novitasari</a>
                        </div>
                </div>
            </div>
        `;
        document.getElementById("body-content").innerHTML = detailHTML;
}

function getSavedTeams() {
    getAll().then(function(teams) {
        let teamsHTML = "";
        let teamElement = document.getElementById("archive");
        for(i=0; i<teams.length; i++) {
            teamsHTML += `
                <div class="card horizontal">
                    <div class="card-image">
                        <img src="${teams[i].crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 100px">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content" style="padding-top: 0">
                            <ul>
                                <li><a href="./detail.html?id=${teams[i].id}&saved=true"><b>${teams[i].name}</b></a></li>
                                <li>Founded: ${teams[i].founded}</li>
                                <li>Address: ${teams[i].address}</li>`
                                if(teams[i].email!=null) {
                                    teamsHTML += `<li>Email: ${teams[i].email}</li>`
                                } else {
                                    teamsHTML += `<li>Email: -</li>`
                                }
                            teamsHTML += `</ul>
                        </div>
                        <div class="card-action">
                        <a href="${teams[i].website}">Official Website</a>
                        <button id="${teams[i].id}" class="removeButton">Remove</button>
                        </div>
                    </div>
                </div>
            `
        }

        teamElement.innerHTML = `
            <div class="container">
                <div class="col s12">
                    ${teamsHTML}
                </div>
            </div>
        `;

        const removeButtons = document.querySelectorAll(".removeButton");
        for (let button of removeButtons) {
            button.addEventListener("click", function(event) {
                const id = event.target.id;
                deleteTeam(id).then(() => {
                    location.reload();
                })
            })
        }
    })
}

function getSavedTeamById() {
    getById(idParam).then(function(data) {
        console.log(data);
        let detailHTML = "";
        detailHTML = `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="responsive-img" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:200px; margin-left:auto; margin-right:auto"/>
                </div>
                <div class="card-content">
                    <span class="card-title" style="font-weight:bolder">${data.name} - Squad Members</span>
                    <ol>`
                    for (i=0;i<data.squad.length;i++) {
                        detailHTML += `<li style="font-weight:bolder">${data.squad[i].name}</li>
                        <ul>`
                            if (data.squad[i].position!=null) {
                                detailHTML += `<li>Position: ${data.squad[i].position}</li>`
                            } else {
                                detailHTML += `<li>Position: -</li>`
                            }
                                detailHTML += `<li>Date of Birth: ${data.squad[i].dateOfBirth}</li>
                                <li>Country of Birth: ${data.squad[i].countryOfBirth}</li>
                                <li>Nationality: ${data.squad[i].nationality}</li>`
                                    if (data.squad[i].shirtNumber!=null) {
                                        detailHTML += `<li>Shirt Number: ${data.squad[i].shirtNumber}</li>`
                                    } else {
                                        detailHTML += `<li>Shirt Number: -</li>`
                                    }
                                    detailHTML += `<li>Role: ${data.squad[i].role}</li>
                        </ul>
                        <br>`
                    }
                    detailHTML +=`
                        </ol>
                        <div class="card-action" style="text-align: center;">
                            <a href="https://www.dicoding.com/users/850498" style="color: #4527a0;">&copy; 2020, Rahayu Novitasari</a>
                        </div>
                </div>
            </div>
        `;
        document.getElementById("body-content").innerHTML = detailHTML;
    })
}