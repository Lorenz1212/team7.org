<style type="text/css">
	/* Set a fixed scrollable wrapper */
.tableWrap {
  height: 200px;
  border: 2px solid black;
  overflow: auto;
}
/* Set header to stick to the top of the container. */
thead tr th {
  position: sticky;
  top: 0;
}
/* Because we must set sticky on th,
 we have to apply background styles here
 rather than on thead */
th {
  padding: 16px;
  padding-left: 15px;
  border-left: 1px dotted rgba(200, 209, 224, 0.6);
  border-bottom: 1px solid #e8e8e8;
  background: #ffc491;
  text-align: left;
  /* With border-collapse, we must use box-shadow or psuedo elements
  for the header borders */
  box-shadow: 0px 0px 0 2px #e8e8e8;
}

/* Basic Demo styling */
table {
  width: 100%;
  font-family: sans-serif;
}
table td {
  padding: 16px;
}
tbody tr {
  border-bottom: 2px solid #e8e8e8;
}
thead {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
tbody tr:hover {
  background: #e6f7ff;
}
</style>
<div class="subheader py-2  py-lg-6 subheader-transparent" id="kt_subheader">
	<div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
		<div class="d-flex align-items-center flex-wrap mr-1">
			<div class="d-flex align-items-baseline flex-wrap mr-5">
					<h5 class="text-dark font-weight-bold my-1 mr-5">Tara Tumaya kana dito sa EVEN OR ODD at manalo ng doble</h5>
			</div>
		</div>
	</div>
</div>
<div class="d-flex flex-column-fluid">
	<div class="container">
		<div class="card card-custom card-stretch gutter-b">
				<div class="card-body">
					<!--begin::Nav Tabs-->
					<div class="row">
						<div class="col-sm-6">
							<div class="row mb-6">
								<div class="col-sm-12">
									<ul class="dashboard-tabs nav nav-pills nav-danger row row-paddingless m-0 p-0 flex-column flex-sm-row" role="tablist">
										<li class="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
											<a class="nav-link border py-10 d-flex flex-grow-1 rounded flex-column align-items-center val-status active" data-toggle="pill" data-status="EVEN">
												<span class="nav-text font-size-lg font-weight-bold text-center">EVEN</span>
												<span class="nav-text font-size-lg font-weight-bold text-center">NUMBER</span>
											</a>
										</li>
										<li class="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
											<a class="nav-link border py-10 d-flex flex-grow-1 rounded flex-column align-items-center val-status" data-toggle="pill" data-status="ODD">
												<span class="nav-text font-size-lg font-weight-bold text-center">ODD</span>
												<span class="nav-text font-size-lg font-weight-bold text-center">NUMBER</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="form-group">
										<input type="number" class="form-control form-control-lg text-center" name="amount" placeholder="Please enter your bet amount" autocomplete="off">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<input type="hidden" name="status" value="EVEN">
									<button class="btn btn-primary btn-lg btn-block btn-submit">Submit</button>
								</div>
							</div>
							<div class="row mt-4 ">
								<div class="col-sm-12">
									<div class="card align-items-center">
										<div class="card-body">
											<div class="display-1 text-center text-success font-weight-boldest" id="result-number">0</div>
											<div class="h1 text-center text-success font-weight-bold" id="result-status"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="row">
								<div class="col-4">
									<span class="font-size-h2 text-primary">TIMER : <span class="timer"></span></span>
								</div>
								<div class="col-7">
									<span class="font-size-h2 text-primary">MY WALLET : <span class="wallet-balance"></span></span>
								</div>
								<div class="col-12">
									<div class="tableWrap">
										<table class="table table-bordered table-checkable dataTable no-footer dtr-inline collapsed" id="table_player">
											<thead>
												<tr>
													<th>Player</th>
													<th>Bet Amount</th>
													<th>Bet Status</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
								</div>
								<div class="col-12 mt-5">
									<div class="tableWrap">
										<table class="table table-bordered table-checkable dataTable no-footer dtr-inline collapsed" id="table_result">
											<thead>
												<tr>
													<th>Result</th>
													<th>Bet Amount</th>
													<th>Bet Status</th>
													<th>WIN/LOSE</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>


