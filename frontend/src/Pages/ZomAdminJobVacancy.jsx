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

import { BiShow, BiHide, BiMinusCircle, BiMessageCheck } from "react-icons/bi";

import { toast } from "react-toastify";

import MaterialTable from "material-table";

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

function ZomAdminJobVacancy() {
  const { authState, setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signup");
    }
  });

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobVacancy/`, {
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
    { title: "Time", field: "oppo_time", type: "datetime", editable: "never" },
    { title: "Employer Name", field: "companyname", editable: "never" },
    { title: "Title", field: "job_title", editable: "never" },
    { title: "Type", field: "job_type", editable: "never" },
    { title: "Salary", field: "salary", editable: "never" },
    {
      title: "Salary Status",
      field: "salary_status",
      align: "center",
      editable: "never",
      lookup: { 1: "Shown", 0: "Hidden" },
    },
    { title: "Location", field: "job_location", editable: "never" },
    {
      title: "Experience",
      field: "year_exp",
      align: "center",
      editable: "never",
    },
    {
      title: "Fresh Graduate",
      field: "fresh_graduate",
      align: "center",
      editable: "never",
      lookup: { 1: "Open", 0: "Close" },
    },
    {
      title: "Start Date",
      field: "startdate",
      type: "date",
      editable: "never",
    },
    { title: "Duration", field: "duration", editable: "never" },
    { title: "Education", field: "education", editable: "never" },
    { title: "Field of Study", field: "field_study", editable: "never" },
    { title: "Nationality", field: "nationality", editable: "never" },
    { title: "Interview", field: "iv_option", editable: "never" },
    {
      title: "Assessment",
      field: "test",
      align: "center",
      editable: "never",
      lookup: { 1: "Yes", 0: "No" },
    },
    {
      title: "Approval",
      field: "approve",
      align: "center",
      editable: "never",
      lookup: { 2: "Published", 1: "Hidden", 0: "Pending" },
    },
    {
      title: "FulFill",
      field: "fulfill",
      align: "center",
      editable: "never",
      lookup: { 1: "-", 0: "Fullfilled" },
    },
    { title: "Remarks", field: "give_remarks" },
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
                <Heading content="Job Vacancy" design="h4" />
              </Col>
              <Col sm={12} className="mx-auto my-2">
                <MaterialTable
                  title="Job Vacancy"
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
                          `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobVacancy`,
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
                      icon: () => <BiShow />,
                      tooltip: "Publish to User",
                      isFreeAction: false,
                      onClick: (e, data) => {
                        Axios.patch(
                          `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobVacancy/publish`,
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
                    {
                      icon: () => <BiHide />,
                      tooltip: "Hide from User",
                      isFreeAction: false,
                      onClick: (e, data) => {
                        Axios.patch(
                          `${process.env.REACT_APP_SERVER_DOMAIN}/zomAdminJobVacancy/hide`,
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

export default ZomAdminJobVacancy;
