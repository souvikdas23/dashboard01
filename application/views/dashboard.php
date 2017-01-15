<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>FeltSo - Task</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
<script src="main.js" type="text/javascript"></script> -->
<link href="css/style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.css">
<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
<script type="text/javascript">
	var jsonData = <?php echo $a_data; ?>;
</script>
<body>
	<header>
		<div class="container">
			<img src="http://www.feltso.com/assets/images/favicon.png" style="width: 40px; height:40px; margin-top:10px; margin-left:20px;">
			<div class= "top_link">
				<p>Dashboard</p>
				<p style="font-weight: normal;color: #c0c4c6;" >Inactive Link</p>
				<p style="font-weight: normal;color: #c0c4c6;" >Inactive Link</p>	
			</div>
		</div>
	</header>

	<div class="container">
		<div class="navigation">
		</div>

		<div class="chart-sec">
			<div class="chart">
				<p><b>NET PERFORMANCE SCORE</b></p>
				<select class="target">
					<option value = "2016">Last 1 year</option>
					<option value = "2015">Last 2 year </option>
					<option value = "2014">Last 3 year</option>
					<option value = "2013">Last 4 year</option>
					<option value = "2012" selected>Last 5 year</option>
				</select>
				<div class="chart-action">
					<canvas id="myChart"></canvas>
				</div>
			</div>
			<div class="pie-chart">
				<p><b>REVIEWS</b></p>
				<canvas id="myPieChart" style="width:100%;height:85%;"></canvas>
			</div>
		</div>

		<div class="review-sec">
			<div class="select-sec">
				
			</div>
			<div class="review-main">
				<div class="review-header">
					<div class="review-header-items review-header-items-selected" id="review-all">
						<p>All Reviews</p>
					</div>
					<div class="review-header-items" id="review-positive">
						<p>Positive Reviews</p>
					</div>
					<div class="review-header-items" id="review-negative">
						<p>Negative Reviews</p>
					</div>
				</div>
				<div class="review-main-main">
					
				</div>

			</div>
		</div>
	</div>
</body>

<script data-main="main" src="http://localhost:8080/feltso/lib/js/require.js"></script>
</html>