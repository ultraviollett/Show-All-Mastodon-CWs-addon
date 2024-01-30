prt = x => console.log(x);

function showCw(node){
const post = node.getElementsByClassName("status__content__text");

for (let i = 0; i < post.length; i++){
    post[i].classList.add( "status__content__text--visible show-cw-addon" );
};

prt(`${post.length} CW posts shown!`)
}

function hideCw(node){
const post = node.getElementsByClassName("show-cw-addon");

for (let i = 0; i < post.length; i++){
    post[i].classList.remove( "status__content__text--visible show-cw-addon" );
};
prt(`${post.length} CW posts hidden!`)
}

showCw(document);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          showCw(newNode);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });