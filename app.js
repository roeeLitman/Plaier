"use strict";
let player;
const BASE_URl = "https://nbaserver-q21u.onrender.com/api/filter";
const bottuneGetPlayer = document.querySelector(".cerch-player");
console.log();
bottuneGetPlayer.addEventListener("click", async (e) => {
    const player = searchParameters();
    const players = await getAllPlaierFromApi(player);
    for (; ; )
        ;
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
