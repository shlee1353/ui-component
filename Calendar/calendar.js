var createCalendar = function(elementId, calendarDate) {
	var calendarWrap = document.getElementById(elementId);
	var calendarMonth = calendarWrap.querySelector('.current-month');
	var calendarDays = calendarWrap.getElementsByTagName('td');
	var prevMonthBtn = calendarWrap.querySelector('.prev-btn');
	var nextMonthBtn = calendarWrap.querySelector('.next-btn');

	var getData = function(date) {
		var targetDate = new Date(date);
		var tempDate = new Date(targetDate);

		var data = {
			targetDate: targetDate,
			year: targetDate.getFullYear(),
			month: targetDate.getMonth() + 1,
			start: null,
			total: null,
			activatedIndex: null // 금일 날짜(달력 첫째 칸 부터 index 계산 )
		};

		tempDate.setDate(1); // Sat May 01 2021 14:00:18 GMT+0900 (대한민국 표준시)
		data.start = tempDate.getDay(); // 6 : 토요일
		tempDate.setMonth(tempDate.getMonth() + 1); // 6월
		tempDate.setDate(0); // 5월 마지막 날짜 31
		data.total = tempDate.getDate(); // 31

		if (selectedDate.getFullYear() === targetDate.getFullYear() && selectedDate.getMonth() === targetDate.getMonth()) {
			data.activatedIndex = targetDate.getDate() - 1 + data.start;
		}
		return data;
	};

	var setDaysText = function(start, total) {
		var length = calendarDays.length;
		var i;

		for (i = 0; i < length; i++) {
			if (i >= start && i < start + total) {
				calendarDays[i].innerHTML = i + 1 - start;
			} else {
				calendarDays[i].innerHTML = '';
			}
		}
	};

	var setMonthText = function(year, month) {
		calendarMonth.innerHTML = year + '년' + month + '월';
	};

	var activeDay = function(index) {
		var activatedDay = calendarWrap.querySelector('td.on')
		var selectedDay = calendarDays[index];

		if (activatedDay) {
			activatedDay.removeAttribute('class');
		}

		if (selectedDay) {
			selectedDay.setAttribute('class', 'on');
		}
	};

	var currentDate;
	var setCalendar = function(date) {
		var data = getData(date);
		currentDate = data.targetDate;

		setMonthText(data.year, data.month);
		setDaysText(data.start, data.total);
		activeDay(data.activatedIndex);
	};

	var selectedDate;
	var initCalendar = function(date) {
		selectedDate = new Date(date);
		setCalendar(selectedDate);
	};

	prevMonthBtn.onclick = function() {
		currentDate.setMonth(currentDate.getMonth() - 1);
		setCalendar(currentDate);
		return false;
	};

	nextMonthBtn.onclick = function() {
		currentDate.setMonth(currentDate.getMonth() + 1);
		setCalendar(currentDate);
		return false;
	};

	initCalendar(calendarDate);

	return {
		reset : function() {
			setCalendar(selectedDate);
		}
	};
};