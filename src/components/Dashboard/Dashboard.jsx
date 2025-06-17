import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NoHabit from "../UI/NoHabit";
import DataBarChart from "../UI/DataBarChart";
import DataPieChart from "../UI/DataPieChar";
import PerfectScrollBar from "react-perfect-scrollbar";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import {
  addNewRecordService,
  editRecordService,
  getDashboardDataService,
  getHabitsService,
} from "@/services/habit";
import { toast } from "react-toastify";
import { toastConfig } from "@/utils/config";
import CustomSpinner from "../UI/CustomSpinner";
import { useRouter } from "next/router";
import { useAuthCtx } from "@/context/AuthCtx";
import { arrangeRecordsByWeek, filterByCurrentDate } from "@/utils/helpers";

const Dashboard = () => {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);
  const [todayRecords, setTodayRecords] = useState([]);

  const router = useRouter();
  const { _authenticate } = useAuthCtx();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    setIsFetchingData(true);
    try {
      const response = await getDashboardDataService();
      if (response?.status === 200) {
        const data = response?.data?.data?.map((item) => {
          return { ...item, id: item._id };
        });
        setDashboardData(data);
        const todayRec = [];
        data.forEach((habit) => {
          const todayRecArr = filterByCurrentDate(habit?.records);
          todayRec.push(
            todayRecArr[0]
              ? { ...todayRecArr[0] }
              : { record: 0, habit: habit.id }
          );
        });
        setTodayRecords(todayRec);
      }
    } catch (error) {
      toast.error(error?.message, toastConfig);
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const recordChangeHandler = (index, num) => {
    setTodayRecords((prev) => {
      const updatedState = [...prev];
      updatedState[index].record = num;
      return updatedState;
    });
  };

  const recordSubmitHandler = async (index, submitType) => {
    try {
      setIsSubmitting(true);
      if (submitType === "new") {
        const response = await addNewRecordService({
          data: {
            habitId: todayRecords[index].habit,
            record: todayRecords[index].record,
          },
        });
        if (response?.status === 200) {
          toast.success(response?.data?.message, toastConfig);
          const updatedData = [...dashboardData];
          updatedData[index].records.push({ ...response?.data?.data });
          setDashboardData(updatedData);
          const todayRec = [...todayRecords];
          todayRec[index] = { ...response?.data?.data };
          setTodayRecords(todayRec);
        }
      } else if (submitType === "edit") {
        const response = await editRecordService({
          data: {
            habitId: todayRecords[index].habit,
            record: todayRecords[index].record,
            recordId: todayRecords[index]._id,
          },
        });
        if (response?.status === 200) {
          toast.success(response?.data?.message, toastConfig);
          const updatedData = [...dashboardData];
          updatedData[index].records.pop();
          updatedData[index].records.push({ ...response?.data?.data });
          setDashboardData(updatedData);
          const todayRec = [...todayRecords];
          todayRec[index] = { ...response?.data?.data };
          setTodayRecords(todayRec);
        }
      }
    } catch (err) {
      toast.error(err?.data?.message, toastConfig);
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayPieCalculationFun = useMemo(() => {
    const totalOfTodayRecord = todayRecords.reduce((totalRec, record) => {
      return totalRec + record.record;
    }, 0);

    const totalOfGoal = dashboardData.reduce(
      (totalRec, habitDetail) => totalRec + habitDetail.goal,
      0
    );

    return (totalOfTodayRecord / totalOfGoal) * 100;
  }, [dashboardData]);

  const weekPieCalculationFun = useMemo(() => {
    let totalOfRecord = 0;
    dashboardData.forEach((hadit) => {
      hadit.records.forEach((record) => {
        totalOfRecord += record.record;
      });
    });

    let totalOfGoal = 0;
    dashboardData.forEach((hadit) => {
      totalOfGoal += hadit.goal * 7;
    });

    return (totalOfRecord / totalOfGoal) * 100;
  }, [dashboardData]);

  if (isFetchingData) {
    return <CustomSpinner />;
  }

  return (
    <div className="rounded-0 h-100 w-100">
      <PerfectScrollBar className="me-2 mb-4">
        <div
          style={{
            height: "92vh",
            overflowX: "hidden",
            // overflowY: "auto",
            // backgroundColor: "red",
          }}
          className="pb-5"
        >
          {dashboardData.length ? (
            <>
              <div className="container d-flex align-items-center justify-content-center mt-4">
                <Card className="text-center">
                  <Card.Header className="fw-bold text-primary fs-5">
                    Featured
                  </Card.Header>
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <div>
                      <DataPieChart
                        goalCompletion={weekPieCalculationFun}
                        totalCount={100}
                      />
                      <p className="mt-2">This week</p>
                    </div>
                    <div>
                      <DataPieChart
                        goalCompletion={todayPieCalculationFun}
                        totalCount={100}
                      />
                      <p className="mt-2">Today</p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div
                className="container d-flex align-items-center justify-content-center mt-4"
                style={{ width: "80%" }}
              >
                <Accordion defaultActiveKey="0" className="w-100">
                  {dashboardData.map((habit, index) => {
                    return (
                      <Accordion.Item eventKey={`${index}`} key={habit?._id}>
                        <Accordion.Header>
                          <span className="fw-medium fs-5">
                            {habit?.habitName}
                          </span>
                        </Accordion.Header>
                        <Accordion.Body className="d-flex align-items-center justify-content-center flex-column">
                          <p className="fs-5 text-primary">
                            Daily Goal&nbsp;(in {habit.description}):&nbsp;
                            <span className="text-danger">{habit?.goal}</span>
                          </p>
                          <Card className="w-100 shadow-sm">
                            <Card.Body className="d-flex align-items-center justify-content-between p-2">
                              <p className="m-0">
                                {todayRecords[index]._id ? "Edit" : "Enter"}{" "}
                                today record
                              </p>
                              <div className="d-flex align-items-center justify-content-between gap-4">
                                <Form.Control
                                  required
                                  type="number"
                                  min={0}
                                  max={habit?.goal}
                                  value={todayRecords[index].record}
                                  onChange={(e) =>
                                    recordChangeHandler(index, e.target.value)
                                  }
                                  placeholder="88"
                                />
                                <Button
                                  variant="primary"
                                  onClick={recordSubmitHandler.bind(
                                    null,
                                    index,
                                    todayRecords[index]._id ? "edit" : "new"
                                  )}
                                  disabled={isSubmitting}
                                >
                                  {todayRecords[index]._id ? "Edit" : "Save"}
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                          <div
                            className="w-50 d-flex align-items-center justify-content-center mt-4"
                            style={{ height: "30vh" }}
                          >
                            <DataBarChart
                              barData={arrangeRecordsByWeek(habit?.records).map(
                                (record) => record.record
                              )}
                              yMax={habit?.goal}
                            />
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </div>
            </>
          ) : (
            <NoHabit />
          )}
        </div>
      </PerfectScrollBar>
    </div>
  );
};

export default Dashboard;
