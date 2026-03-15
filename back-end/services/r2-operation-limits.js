const CLASS_A_DAILY_LIMIT = 50_000;
const CLASS_B_DAILY_LIMIT = 500_000;

let counts = { date: "", class_a: 0, class_b: 0 };

function getTodayUTC() {
	return new Date().toISOString().split("T")[0];
}

function resetIfNewDay() {
	const today = getTodayUTC();
	if (counts.date !== today) counts = { date: today, class_a: 0, class_b: 0 };
}

function checkAndIncrementClassA() {
	resetIfNewDay();
	if (counts.class_a >= CLASS_A_DAILY_LIMIT) return false;
	counts.class_a++;
	return true;
}

function checkAndIncrementClassB() {
	resetIfNewDay();
	if (counts.class_b >= CLASS_B_DAILY_LIMIT) return false;
	counts.class_b++;
	return true;
}

module.exports = { checkAndIncrementClassA, checkAndIncrementClassB };
