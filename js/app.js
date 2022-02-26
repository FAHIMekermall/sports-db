document.getElementById("infoSide").innerText = `I'm right`
document.getElementById("resultSide").innerText = `I'm left`

const loadData = () => {
    const input = document.getElementById("inputField")
    const inputValue = input.value
    input.value = ""
    fetch(
        `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.player == null) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `We can't find anything`,
                  })
            }
            else{
                displayResult(data.player)
            }
        })
}
const displayResult = (players) => {
    console.log(players)
}
