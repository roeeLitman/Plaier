"use strict";
let yorePlaier;
const BASE_URl = "https://nbaserver-q21u.onrender.com/api/filter";
const bottuneGetPlayer = document.querySelector(".cerch-player");
bottuneGetPlayer.addEventListener("click", async (e) => {
    const table = document.querySelector(".table");
    const player = searchParameters();
    const players = await getAllPlaierFromApi(player);
    clearTabal();
    for (const player of players) {
        const htmlRow = creatRoeHtml(player);
        table.appendChild(htmlRow);
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
const clearTabal = () => {
    const listRow = document.querySelectorAll(".delet-row");
    for (const row of listRow) {
        row.remove();
    }
};
const creatRoeHtml = (player) => {
    const row = document.createElement("tr");
    row.classList.add("delet-row");
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
        CheckingWhereToAdd(player);
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
const CheckingWhereToAdd = (plaier) => {
    switch (plaier.position) {
        case "PG":
            addPlaier(plaier, "PG");
            break;
        case "SG":
            addPlaier(plaier, "SG");
            break;
        case "SF":
            addPlaier(plaier, "SF");
            break;
        case "PF":
            addPlaier(plaier, "PF");
            break;
        case "C":
            addPlaier(plaier, "C");
            break;
    }
};
const addPlaier = (plaier, Tagclass) => {
    var _a;
    const divInformtion = document.querySelector("." + Tagclass);
    while (divInformtion.children.length > 1) {
        (_a = divInformtion === null || divInformtion === void 0 ? void 0 : divInformtion.lastChild) === null || _a === void 0 ? void 0 : _a.remove();
    }
    const name = document.createElement("p");
    name.textContent = plaier.playerName;
    const threePrecents = document.createElement("p");
    threePrecents.textContent = plaier.threePercent + "%";
    const twoPrecents = document.createElement("p");
    twoPrecents.textContent = plaier.twoPercent + "%";
    const points = document.createElement("p");
    points.textContent = plaier.points.toString();
    divInformtion === null || divInformtion === void 0 ? void 0 : divInformtion.appendChild(name);
    divInformtion === null || divInformtion === void 0 ? void 0 : divInformtion.appendChild(threePrecents);
    divInformtion === null || divInformtion === void 0 ? void 0 : divInformtion.appendChild(twoPrecents);
    divInformtion === null || divInformtion === void 0 ? void 0 : divInformtion.appendChild(points);
};
