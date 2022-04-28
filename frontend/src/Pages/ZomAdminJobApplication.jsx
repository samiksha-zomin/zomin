import React, {
  forwardRef,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthContext } from "../Helpers/AuthContext";
import NotFound from "./NotFound";

import Heading from "../Components/Heading";

import { BiMailSend, BiMinusCircle, BiMessageCheck } from "react-icons/bi";

import { toast } from "react-toastify";

import MaterialTable from "material-table";
// import {Link} from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

function ZomAdminJobApplication() {
  const { authState, setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signup");
    }
  });

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobApplication/`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      setUserList(response.data);
    });
  }, []);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const columns = [
    { title: "Time", field: "time", type: "datetime", editable: "never" },
    { title: "Applicant Name", field: "name", editable: "never", },
    // render: userList=><Link href={`/resume/${userList.candidate_user_id}`} target="_blank">{userList.name}</Link>

    { title: "Employer Name", field: "companyname", editable: "never" },
    { title: "Title", field: "job_title", editable: "never" },
    { title: "Type", field: "job_type", editable: "never" },
    { title: "Email", field: "email", filterPlaceholder: "Filter by Email", editable: "never" },
    { title: "Phone", field: "contnum", editable: "never" },
    { title: "Background Course", field: "candidate_bg_course", editable: "never" },
    { title: "Start Intern", field: "candidate_start_intern", type: "date", editable: "never" },
    { title: "End Intern", field: "candidate_end_intern", type: "date", editable: "never" },
    {
      title: "Submit to BP",
      field: "send_bp",
      align: "center",
      editable: "never",
      lookup: { 1: "Submitted", 0: "Pending" },
    },
    { title: "Remarks", field: "grab_remarks" },
  ];

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Admin | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
        <div id="adminUser" className="adminUser my-2">
          {authState.admin === 1 ? (
            <Row className="mx-5">
              <Col sm={12} className="mx-auto my-2">
                <Heading content="Job Application" design="h4" />
              </Col>
              <Col sm={12} className="mx-auto my-2">
                <MaterialTable
                  title="Job Application"
                  columns={columns}
                  icons={tableIcons}
                  data={userList}
                  options={{
                    sorting: true,
                    filtering: true,
                    search: true,
                    searchFieldAlignment: "right",
                    searchAutoFocus: true,
                    searchFieldVariant: "standard",
                    paging: true,
                    pageSizeOptions: [25, 50, 100],
                    pageSize: 25,
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: "Total User",
                    actionsColumnIndex: -1,
                    selection: true,
                    showSelectAllCheckbox: false,
                    showTextRowsSelected: false,
                    grouping: false,
                    columnsButton: true,
                  }}
                  editable={{
                    onRowUpdate: (newRow, oldRow) =>
                      new Promise((resolve, reject) => {
                        Axios.patch(
                          `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobApplication`,
                          newRow
                        ).then((response) => {
                          if (response.data.error) {
                            return toast.error(
                              <Fragment>
                                <BiMinusCircle />{" "}
                                <span>{response.data.error}</span>
                              </Fragment>
                            );
                          } else {
                            return [
                              toast.success(
                                <Fragment>
                                  <BiMessageCheck />{" "}
                                  <span>{response.data.success}</span>
                                </Fragment>
                              ),
                              setUserList(response.data.list),
                            ];
                          }
                        });
                        setTimeout(() => resolve(), 500);
                      }),
                  }}
                  actions={[
                    {
                      icon: () => <BiMailSend />,
                      tooltip: "Submit Application to BP",
                      isFreeAction: false,
                      onClick: (e, data) => {
                        Axios.patch(
                          `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobApplication/sendToBP`,
                          data
                        ).then((response) => {
                          if (response.data.error) {
                            return toast.error(
                              <Fragment>
                                <BiMinusCircle />{" "}
                                <span>{response.data.error}</span>
                              </Fragment>
                            );
                          } else {
                            return [
                              toast.success(
                                <Fragment>
                                  <BiMessageCheck />{" "}
                                  <span>{response.data.success}</span>
                                </Fragment>
                              ),
                              setUserList(response.data.list),
                            ];
                          }
                        });
                      },
                    },
                  ]}
                />
              </Col>
            </Row>
          ) : (
            <NotFound />
          )}
        </div>
      </Fragment>
    </AuthContext.Provider>
  );
}

export default ZomAdminJobApplication;
