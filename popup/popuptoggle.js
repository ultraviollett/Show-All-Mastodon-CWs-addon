const isShownAll = document.getElementById("toggle-show");
const isEnabled = document.getElementById("toggle-enable");

function onError(e) {
	isEnabled.classList.add("hidden");
	isShownAll.classList.add("hidden");
	const errorDiv = document.getElementById("error");
	errorDiv.classList.remove("hidden");
	errorDiv.textContent = e;

}

function changeSettings() {
	let settings = {
		isShownAll: isShownAll.checked,
		isEnabled: isEnabled.checked,
	};

	browser.storage.local.set({settings});
}

function toggleEnabled(change=true) {
	
	document.getElementById("enable-label").textContent =  isEnabled.checked ? "Enabled" : "Disabled";

	change && changeSettings();
}

function toggleShownAll(change=false) {
	document.getElementById("show-label").textContent = isShownAll.checked ? "Showing All" : "Hiding All";
	
	change && changeSettings();
	
}

function updateUI(restoredSettings) {

	isShownAll.checked = restoredSettings.settings.isShownAll ?? true;
	isEnabled.checked = restoredSettings.settings.isEnabled ?? true;

	toggleEnabled(false);
	toggleShownAll(false);
}



const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);



isShownAll.addEventListener("click", toggleShownAll);
isEnabled.addEventListener("click", toggleEnabled);
