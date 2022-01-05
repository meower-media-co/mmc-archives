function removePost(button) {
	let x = button.parentElement.parentElement.parentElement; 
	let s = x.previousSibling;
	if (s.tagName === "BR") {
		s.remove();
	}
	x.remove();
}

// basic frameworks
function createPost(postName,postText){
  console.log("create post");
  var compiledPost = '<div id="post"><div id="upper_tab"><b>'+postName+'</b></div><br>'+postText+'</div>';
  document.write('<br><div id="post"><div id="upper_tab"><b>'+postName+'</b></div><br>'+postText+'</div>');
}

//<div id="post">
//        <div id="upper_tab"><b>Testing HTML</b></div>
//        <br>
//         The CSS and HTML for this website is being tested and will be //updated constantly. Below is an example: 
//         <br><br>
//          <button>test!</button>
//      </div>
