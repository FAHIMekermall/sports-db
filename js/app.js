const loadData = () => {
    const input = document.getElementById("inputField");
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const inputValue = input.value;
    document.getElementById("resultSide").textContent = "";
    document.getElementById("infoSide").textContent = "";
    input.value = "";
    fetch(
        `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`
    )
        .then((res) => res.json())
        .then((data) => {
            spinner.classList.add("d-none");
            if (data.player == null) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `We can't find anything`,
                });
            } else {
                displayResult(data.player);
            }
        });
};
const displayResult = (players) => {
    const playerContainer = document.getElementById("resultSide");
    for (const player of players) {
        if (player.strThumb == null) {
            continue;
        } else {
            const newDiv = document.createElement("div");
            newDiv.setAttribute("id", player.idPlayer);
            newDiv.classList.add("player");
            newDiv.innerHTML = `
                    <img class="img-fluid rounded-img" src="${player.strThumb}" alt="Picture not available">
                    <h2 class="player-title">${player.strPlayer}</h2>
                    <h5 class="info-text">Country: ${player.strNationality}</h5>
                    <h5 class="info-text">Sport: ${player.strSport}</h5>
                    <div class="d-flex justify-content-around">
                    <button onclick="hide(${player.idPlayer})" class="btn btn-danger">Hide</button>
                    <button onclick="seeDetails(${player.idPlayer})" class="btn btn-info">See details</button>`;
            playerContainer.appendChild(newDiv);
        }
    }
};

const hide = (id) => {
    const target = document.getElementById(id);
    target.style.display = "none";
};

const seeDetails = (id) => {
    document.getElementById("infoSide").textContent = "";
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => displayInfo(data.players[0]));
};

const displayInfo = (player) => {
    console.log(player);
    const playerContainer = document.getElementById("infoSide");
    const info = document.getElementById("infoSide");
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "details");
    newDiv.innerHTML = `
                        <div id="infoSide" class="d-flex flex-column align-items-center">
                        <img class="w-100 rounded" src="${player.strThumb}"  alt="">
                        <h2 class="player-title mt-1">${player.strPlayer}</h2>
                        <h5 class="info-text"> ${player.strSport}</h5>
                        <h5 class="info-text">${player.strNationality}</h5>
                        <p class="player-info mt-3">
                            ${player.strDescriptionEN}
                        </p>
    `;
    playerContainer.appendChild(newDiv);
};
