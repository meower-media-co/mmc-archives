<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Gamr - share games you've made and socialize</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <script src="script.js"></script>
    <div class="topnav">
      <a href="/">Homepage</a>
      <a href="#">Trending</a>
      <a href="#">Posts</a>
      <form action="/search.php" method="GET">
		    <input type="search" id="search" name="query" placeholder="Search" />
        <button type="submit">Search</button>
    </form>
    <a href="#">My Account</a>
    </div>

	<div class="content">you can put php commands inside php tags :-)

	<?php
	echo "How to make multiline comments";
	/* These are  a multiline comments
	testing, and these lines will ignored
	at the time of execution */
	?>
	</div>
  </body>
</html>