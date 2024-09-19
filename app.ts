let yorePlaier: Plaier[];
const BASE_URl: string = "https://nbaserver-q21u.onrender.com/api/filter";

const bottuneGetPlayer: HTMLParagraphElement =
  document.querySelector(".cerch-player")!;


bottuneGetPlayer.addEventListener("click", async (e): Promise<void> => {
  const table: HTMLTableElement = document.querySelector(".table")!
  const player: Plaier = searchParameters();
  const players: Plaier[] | undefined = await getAllPlaierFromApi(player);
  clearTabal()
  for(const player of players!){
    const htmlRow: HTMLTableRowElement = creatRoeHtml(player)
    table.appendChild(htmlRow)
  }
  
});

const searchParameters = (): Plaier => {
  const player: Plaier = {
    position: (document.querySelector(".select-position") as HTMLSelectElement)
      .value,
    twoPercent: parseInt(
      (document.querySelector(".input-points") as HTMLInputElement).value
    ),
    threePercent: parseInt(
      (document.querySelector(".input-FG") as HTMLInputElement).value
    ),
    points: parseInt(
      (document.querySelector(".input-3P") as HTMLInputElement).value
    ),
  };
  return player;
};

const getAllPlaierFromApi = async (plaier: Plaier): Promise<Plaier[] | undefined> => {
  try {
    const res: Response = await fetch(BASE_URl, {
      method: "POST",
      body: JSON.stringify(plaier),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await res.json();

  } catch (err) {
    console.log(err);
  }
}

const clearTabal = ():void =>{
   const listRow: NodeListOf<Element> = document.querySelectorAll(".delet-row")
   for(const row of listRow){
         row.remove()
   }
}

const creatRoeHtml = (player:Plaier):HTMLTableRowElement =>{

    const row = document.createElement("tr")
    row.classList.add("delet-row")

    const tdPlayer: HTMLTableCellElement = document.createElement("td")
    tdPlayer.textContent = player.playerName!
    const Postion: HTMLTableCellElement = document.createElement("td")
    Postion.textContent = player.position
    const Points: HTMLTableCellElement = document.createElement("td")
    Points.textContent = player.points.toString()
    const FG: HTMLTableCellElement = document.createElement("td")
    FG.textContent = player.twoPercent.toString()
    const pPercent: HTMLTableCellElement = document.createElement("td")
    pPercent.textContent = player.threePercent.toString()
    const Action: HTMLTableCellElement = document.createElement("td")
    const p: HTMLParagraphElement = document.createElement("p")
    p.textContent = `add ${player.playerName} ro Current Team`
    p.addEventListener("click",(e)=>{
        CheckingWhereToAdd(player)
        
    })
    Action.appendChild(p)

    row.appendChild(tdPlayer)
    row.appendChild(Postion)
    row.appendChild(Points)
    row.appendChild(FG)
    row.appendChild(pPercent)
    row.appendChild(Action)

    return row
}

const CheckingWhereToAdd = (plaier:Plaier):void => {
    switch(plaier.position){
        case "PG" :
            addPlaier(plaier,"PG")
            break;        
        case "SG" :
            addPlaier(plaier,"SG")
            break;
        case "SF":
            addPlaier(plaier,"SF")
            break
        case "PF":
            addPlaier(plaier,"PF")
            break;
        case "C":
            addPlaier(plaier,"C")
            break;
    }

}

const addPlaier = (plaier:Plaier, Tagclass:string):void =>{

    const divInformtion = document.querySelector("." + Tagclass)

    const name: HTMLParagraphElement = document.createElement("p")
    name.textContent = plaier.playerName!
    const threePrecents: HTMLParagraphElement = document.createElement("p")
    threePrecents.textContent = plaier.threePercent + "%"
    const twoPrecents: HTMLParagraphElement = document.createElement("p")
    twoPrecents.textContent = plaier.twoPercent + "%"
    const points: HTMLParagraphElement = document.createElement("p")
    points.textContent = plaier.points.toString()

    divInformtion?.appendChild(name)
    divInformtion?.appendChild(threePrecents)
    divInformtion?.appendChild(twoPrecents)
    divInformtion?.appendChild(points)

}






interface Plaier {
  position: string;
  twoPercent: number;
  threePercent: number;
  points: number;
  playerName?: string;
}