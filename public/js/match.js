import axios from "axios";
import { showAlert } from "./alert";

export const matchInformation = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "/api/v1/match?sort=date&date[gt]='2023-01-05'",
    });
    if (res.data.status === "success") {
      init(res.data.data.matchs);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

function init(queryResult) {
  let inputSearchBar = document.querySelector("#searchInformation");
  let mainSection = document.querySelector(".mainSection");
  let resSort = [];
  queryResult.forEach((matchInfo, index, matchInfoFull) => {
    if (
      matchInfo.againstTeam
        .toUpperCase()
        .includes(inputSearchBar.value.toUpperCase()) ||
      matchInfo.localTeam
        .toUpperCase()
        .includes(inputSearchBar.value.toUpperCase())
    ) {
      resSort.push(matchInfo);
    }
  });



  if (resSort.length == 0) {
    mainSection.innerHTML = `<h1>La recherche n'a pas donné de résultats</h1>`;
  } else {
    mainSection.innerHTML =''
    resSort.forEach(sortedMatch => {
      let date = new Date(sortedMatch.date).toDateString()

      



      mainSection.innerHTML += `


      <section class="matchSection">
      <section class="matchInformation">
      <section class="headerInformationMatch">
      <h1>${sortedMatch.gymnasium} : ${date}</h1>
        </section>
        <section class="bodyInformationMatch">
          <article class="firstEquipeInformation">
            <h1>${sortedMatch.localTeam}</h1>
          </article>
          <p>VS</p>
          <article class="secondEquipeInformation">
          <h1>${sortedMatch.againstTeam}</h1>
          </article>
        </section>
      </section>
    </section>

    `;
    });
  }
}
