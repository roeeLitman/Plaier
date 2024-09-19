"use strict";
let player;
const BASE_URl = "https://nbaserver-q21u.onrender.com/api/filter";
const bottuneGetPlayer = document.querySelector(".cerch-player");
console.log();
bottuneGetPlayer.addEventListener("click", async (e) => {
    const player = searchParameters();
    const players = await getAllPlaierFromApi(player);
    for (const player of players) {
        const htmlRow = creatRoeHtml(player);
    }
});
const searchParameters = () => {
    const player = {
        position: document.querySelector(".select-position")
            .value,
        twoPercent: parseInt(document.querySelector(".input-points").value),
        threePercent: parseInt(document.querySelector(".input-FG").value),
        points: parseInt(document.querySelector(".input-3P").value),
    };
    return player;
};
const getAllPlaierFromApi = async (plaier) => {
    try {
        const res = await fetch(BASE_URl, {
            method: "POST",
            body: JSON.stringify(plaier),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    catch (err) {
        console.log(err);
    }
};
const creatRoeHtml = (player) => {
    const row = document.createElement("tr");
    const tdPlayer = document.createElement("td");
    tdPlayer.textContent = player.playerName;
    const Postion = document.createElement("td");
    Postion.textContent = player.position;
    const Points = document.createElement("td");
    Points.textContent = player.points.toString();
    const FG = document.createElement("td");
    FG.textContent = player.twoPercent.toString();
    const pPercent = document.createElement("td");
    pPercent.textContent = player.threePercent.toString();
    const Action = document.createElement("td");
    const p = document.createElement("p");
    p.textContent = `add ${player.playerName} ro Current Team`;
    p.addEventListener("click", (e) => {
    });
    Action.appendChild(p);
    row.appendChild(tdPlayer);
    row.appendChild(Postion);
    row.appendChild(Points);
    row.appendChild(FG);
    row.appendChild(pPercent);
    row.appendChild(Action);
    return row;
};
