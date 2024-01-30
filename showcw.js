prt = (x) => console.log(x);

function toggleCw(node, show = true) {
  /*
    function to toggle between showing and hiding the CW text in a post.
    show = true -> showing the posts
    show = false -> hiding the posts
    */
  const classToFind = show ? "status__content__text" : "show-cw-addon";
  const postList = node.getElementsByClassName(classToFind);

  if (show) {
    //if you are showing posts, 
    for (const post of postList) {
    if (!post.classList.contains("status__content__text--visible")){
      post.classList.add("status__content__text--visible");
      post.classList.add("show-cw-addon");
    }
    }
  } else {
    for (const post of postList) {
      post[i].classList.remove("status__content__text--visible");
    }
  }

  const buttonList = node.getElementsByClassName(
    "status__content__spoiler-link"
  );

  for (const btn of buttonList) {
    //change name of button depending on if you show or hide
    btn.textContent = show ? "Showing All" : "Hiding All";
    btn.disabled = "true";
  }

  prt( `${postList.length} CW posts ${show ? "shown" : "hidden"}`);
}

toggleCw(document);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added. Run our substitution
      // algorithm on each newly added node.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        toggleCw(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

