import React from "react";

function AdminDefault() {
  return (
    <div>
      <link
        href="assets/vendor/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/boxicons/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet" />
      <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
      <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
      <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet" />
      <link href="assets/css/style.css" rel="stylesheet" />

      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div class="col-xxl-4 col-md-6">
                <div class="card info-card sales-card">
                  <div class="card-body">
                    <h5 class="card-title">
                      Sales <span>| Today</span>
                    </h5>

                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-cart"></i>
                      </div>
                      <div class="ps-3">
                        <h6>145</h6>
                        <span class="text-success small pt-1 fw-bold">
                          12%
                        </span>{" "}
                        <span class="text-muted small pt-2 ps-1">increase</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-12">
                <div className="card info-card customers-card">
                
                  <div className="card-body">
                    <h5 className="card-title">
                      Customers <span>| This Year</span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people" />
                      </div>
                      <div className="ps-3">
                        <h6>1244</h6>
                        <span className="text-danger small pt-1 fw-bold">
                          12%
                        </span>{" "}
                        <span className="text-muted small pt-2 ps-1">
                          decrease
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                 
                  <div className="card-body">
                    <h5 className="card-title">
                      Revenue <span>| This Month</span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar" />
                      </div>
                      <div className="ps-3">
                        <h6>$3,264</h6>
                        <span className="text-success small pt-1 fw-bold">
                          8%
                        </span>{" "}
                        <span className="text-muted small pt-2 ps-1">
                          increase
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDefault;
