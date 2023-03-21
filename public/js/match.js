import axios from "axios";
import { showAlert } from "./alert";
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

function formatTime(time) {
	const hours = time.getHours();
	const minutes = time.getMinutes();
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}


Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

Date.prototype.addMinutes = function (m) {
	this.setTime(this.getTime() + (m * 60 * 1000));
	return this;
}




const calendar = new Calendar('#calendar', {
	defaultView: 'week',
	useFormPopup: false,
	useCreationPopup: false,
	useDetailPopup: true,
	isReadOnly: true,
	usageStatistics: false,
	allday: false,

	theme: {
		common: {
			backgroundColor: 'var(--bg-color)',
		},
	},
	week: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: true,
		taskView: false,  // e.g. true, false, or ['task', 'milestone']
	},
	month: {
		startDayOfWeek: 1,
		dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		narrowWeekend: true,
		taskView: false,  // e.g. true, false, or ['task', 'milestone']
	},
	template: {
		time(event) {
			const { start, end, title } = event;
			return `<span>${title}</span>`;
		},
		allday(event) {
			return `<span style="color: gray;">${event.title}</span>`;
		},
	},
});









const matchInformation = async () => {
	let currentDate = new Date();
	let currentDate2 = new Date();
	let threeWeekAgo = currentDate.addDays(- (7 * 3));
	let twoMonthAfter = currentDate2.addDays(7 * 8);
	try {
		const res = await axios({
			method: "get",
			url: `/api/v1/match?sort=date&date[gt]=${threeWeekAgo}&date[lt]=${twoMonthAfter}`,
		});
		if (res.data.status === "success") {
			return res.data.data.matchs;
		}
	} catch (err) {
		showAlert("error", err.response.data.message);
	}
};

function searchMatchByTeam(queryResult, enteredValue) {
	let mainSection = document.querySelector(".mainSection");
	let resSort = [];
	queryResult.forEach((matchInfo, index, matchInfoFull) => {
		if (
			matchInfo.againstTeam
				.toUpperCase()
				.includes(enteredValue.toUpperCase()) ||
			matchInfo.localTeam
				.toUpperCase()
				.includes(enteredValue.toUpperCase())
		) {
			resSort.push(matchInfo);
		}
	});

	if (resSort.length == 0) {
		mainSection.innerHTML = `<h1>La recherche n'a pas donné de résultats</h1>`;
	} else {

		let calendarMatch = []

		mainSection.innerHTML = ''
		resSort.forEach(sortedMatch => {


			let calendarMatchTemp = {}
			calendarMatchTemp.id = sortedMatch._id;
			calendarMatchTemp.title = sortedMatch.localTeam + " VS " + sortedMatch.againstTeam;
			calendarMatchTemp.start = sortedMatch.date;
			calendarMatchTemp.end = new Date(sortedMatch.date).addMinutes(90);
			calendarMatchTemp.isAllDay = false;
			calendarMatchTemp.category = 'time';
			calendarMatchTemp.dueDateClass = '';
			calendarMatchTemp.color = '#ffffff';
			calendarMatchTemp.bgColor = '#9e5fff';
			calendarMatchTemp.dragBgColor = '#9e5fff';
			calendarMatchTemp.location = sortedMatch.gymnasium;

			calendarMatch.push(calendarMatchTemp);


			let date = new Date(sortedMatch.date).toLocaleString()
			mainSection.innerHTML += `
      			<section class="matchSection">
      				<section class="matchInformation">
      					<section class="headerInformationMatch">
      						<h1>${sortedMatch.gymnasium} : ${date}</h1>
      					</section>
      					<section class="bodyInformationMatch">
      						<article class="firstEquipeInformation">
      							<h1>Equipe locale</h1>
								<img src="img/logo.png" alt="photo">
								<h1>${sortedMatch.localTeam}</h1>
      						</article>
      						<p>VS</p>
      						<article class="secondEquipeInformation">
      							<h1>Equipe adverse</h1>
      							<img src="img/logo.png" alt="photoEnemyTeam">
      							<h1>${sortedMatch.againstTeam}</h1>
      						</article>
      					</section>
      				</section>
    			</section>
    		`;
		});

		calendar.createEvents(calendarMatch);
	}
}





export const init = async () => {

	// let data = await matchInformation().then(result => result.data);
	let data = await matchInformation().then(result => result);

	// Search a match based on the url parameter
	const urlParams = new URLSearchParams(window.location.search);

	let name = urlParams.get('team');
	if (name !== null) {
		name = name.replace(/['"]/g, ""); // remove all occurrences of ' and "
		searchMatchByTeam(data, name);
		// remove the url parameter without reloading the page
		window.history.replaceState({}, document.title, "/" + "matchs");
	}

	// Search a match based on the input value
	let inputSearchBar = document.querySelector("#searchInformation").value;
	if (inputSearchBar !== "") {
		searchMatchByTeam(data, inputSearchBar);
	} else {
		searchMatchByTeam(data, "");
		displayCalendar();
	}

	// Search a match based on the select value
	document.querySelector("#searchMatchBySelect").addEventListener("change", (e) => {
		let select = document.getElementById("searchMatchBySelect").value;
		if (select != "0") {
			searchMatchByTeam(data, select);
		}
	});



}





export const displayCalendar = () => {
	calendar.render();
}


// execute a function on windows resize

export const resizeCalendar = () => {
	let width = window.innerWidth;
	if (width < 800) {
		calendar.changeView('day');
		calendar.render();
	} else if (width > 800) {
		calendar.changeView('week');
		calendar.render();
	}
};


// add the calendar display dates range to the .navbar--range using the calendar.getDate() method and translate the dates to a readable format in french
function displayCalendarRange() {
	let dateRange = calendar.getDate().d.d.addDays(-1).toLocaleDateString('fr-FR') + ' - ' + calendar.getDate().d.d.addDays(5).toLocaleDateString('fr-FR');
	document.querySelector('.navbar--range').innerHTML = dateRange;
}

export const changeWeek = (type) => {
	if (type == 'next') {
		calendar.move(1);
		displayCalendarRange();
	}
	if (type == 'prev') {
		calendar.move(-1);
		displayCalendarRange();
	}
	if (type == 'today') {
		calendar.today();
		displayCalendarRange();
	}
}




