let player: Plaier[];
const BASE_URl: string = "https://nbaserver-q21u.onrender.com/api/filter";

const bottuneGetPlayer: HTMLParagraphElement =
  document.querySelector(".cerch-player")!;
console.log();

bottuneGetPlayer.addEventListener("click", async (e): Promise<void> => {
  const player: Plaier = searchParameters();
  const players: Plaier[] | undefined = await getAllPlaierFromApi(player);
  for
  
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
};

interface Plaier {
  position: string;
  twoPercent: number;
  threePercent: number;
  points: number;
  playerName?: string;
}
