//just so I can add stuff to console easier lol
prt = x => console.log(x);

function changeBtnName(node, show = true, isBtnUnuseable = true) {
	//list of buttons that toggle CW posts

	const buttonList = node.getElementsByClassName(
		"status__content__spoiler-link"
	);

	const buttonText = (function () {
		const disabledText = show ? "Showing All" : "Hiding All";
		const regularText = "Toggle";
		return isBtnUnuseable ? disabledText : regularText;
	})();
	prt(buttonText);
	for (const btn of buttonList) {
		//change name of button depending on if you show or hide
		btn.textContent = buttonText;

		//disables button so not to mess with add-on, or enables it
		btn.disabled = isBtnUnuseable;
	}
}

function showCw(node = document, isEnabled = true) {

	changeBtnName(node, true, isEnabled);

	if (!isEnabled) return;

	const postList = node.getElementsByClassName("status__content__text"); //list of posts

	if (postList.length == 0) {
		return;
	}

	for (const post of postList) {
		if (!post.classList.contains("status__content__text--visible")) {
			//adds classes to posts that are hidden
			post.classList.add("status__content__text--visible");
			post.classList.add("show-cw-addon");
		}
	}

	

	prt(`${postList.length} CW posts shown`);
}

function hideCw(node = document, isEnabled = true) {
	changeBtnName(node, false, isEnabled);

	if (!isEnabled) return;

	const postList = node.getElementsByClassName("show-cw-addon"); //list of posts

	if (!postList) {
		return;
	}

	for (const post of postList) {
		post.classList.remove("status__content__text--visible"); //makes posts with CW invisible again
	}


	prt(`${postList.length} CW posts hidden`);
}

//checks for newly added elements, then runs code
function checkNewNodes(func = showCw, isEnabled = true) {
	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			const nodes = mutation.addedNodes;
			if (!nodes || nodes.length <= 0) return;

			for (const node of nodes) {
				//run substition for each new node found
				func(node, isEnabled);
				prt("isEnabled: "+isEnabled);
			}
		});
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
}

// function findPosts(){
// 	document.body.style.border = "red solid 2px";
// 	prt("Border is red");

// 	const postList = document.getElementsByClassName("status__content__text--visible"); //list of posts

// 	if (postList.length != 0) {
// 		prt("Posts with Cw Found!");
// 	}else{
// 		prt("No post found")

// 	}

// 	prt(postList.length ?? "none")

// }

function toggleCw(isShownAll = true, isEnabled = true) {
	const shownText = isShownAll
		? ": Showing All CW Posts"
		: ": Hiding All CW Posts";

	const enabledText = isEnabled ? "Enabled" : "Disabled";
	prt(`Extension ${enabledText}${isEnabled ? shownText : ""}`);

	// if (!isEnabled) {
	// 	changeBtnName(document, isShownAll, false);
	// 	isShownAll
	// 		? checkNewNodes(showCw, isEnabled)
	// 		: checkNewNodes(hideCw, isEnabled);
	// } else {
		isShownAll ? showCw(document, isEnabled) : hideCw(document, isEnabled);
		isShownAll ? checkNewNodes(showCw, isEnabled) : checkNewNodes(hideCw, isEnabled);
	// }
}

function doChangedSettings(change) {
	const obj = Object(change.settings);

	const isShownAll = obj.newValue.isShownAll;
	const isEnabled = obj.newValue.isEnabled;

	// prt("enabled:"+obj.oldValue.isEnabled+" -> "+ isEnabled);
	// prt("shown:"+obj.oldValue.isShownAll+" -> "+ isShownAll);

	if (
		obj.oldValue.isShownAll == isShownAll &&
		obj.oldValue.isEnabled == isEnabled
	)
		return;

	toggleCw(isShownAll, isEnabled);
}

function onStart() {
	browser.storage.local.get("settings").then(results => {
		let {isShownAll, isEnabled} = results.settings;

		toggleCw(isShownAll, isEnabled);
	});
}

onStart();

browser.storage.onChanged.addListener(doChangedSettings);
