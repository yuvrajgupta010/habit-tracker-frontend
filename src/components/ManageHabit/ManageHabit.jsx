import React, { useEffect, useState } from "react";
import NoHabit from "../UI/NoHabit";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import CustomSpinner from "../UI/CustomSpinner";
import { deleteHabitService, getHabitsService } from "@/services/habit";
import { toast } from "react-toastify";
import { toastConfig } from "@/utils/config";
import PerfectScrollBar from "react-perfect-scrollbar";

const ManageHabit = () => {
  const [show, setShow] = useState(false);
  const [deleteHabitData, setDeleteHabitData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [habits, setHabits] = useState([]);

  const handleDeleteHabit = (habitIndex) => {
    const habitData = habits[habitIndex];

    setDeleteHabitData({ ...habitData, habitIndex });
    setShow(true);
  };

  useEffect(() => {
    const fetchHabits = async () => {
      setIsFetchingData(true);
      try {
        const response = await getHabitsService();
        if (response?.status === 200) {
          setHabits(response?.data?.data);
        }
      } catch (error) {
        toast.error(error?.message, toastConfig);
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchHabits();
  }, []);

  const handleClose = () => {
    setShow(false);
    setDeleteHabitData(null);
  };

  const handleConfirm = async () => {
    if (!deleteHabitData) return;
    setIsDeleting(true);
    try {
      const response = await deleteHabitService({
        habitId: deleteHabitData?.id,
      });
      if (response?.status === 200) {
        toast.success(response?.data?.message, toastConfig);
        const updatedHabits = [...habits];
        updatedHabits.splice(deleteHabitData?.habitIndex, 1);
        setHabits(updatedHabits);
      }
    } catch (error) {
      toast.error(error?.data?.message, toastConfig);
    } finally {
      setIsDeleting(false);
      handleClose();
    }
  };

  if (isFetchingData) {
    return <CustomSpinner />;
  }

  return (
    <div className="rounded-0 h-100 w-100">
      <PerfectScrollBar className="me-2">
        <ListGroup
          as="ol"
          numbered
          className=" rounded-0"
          style={{ height: "88vh", overflowY: "visible" }}
        >
          {!isFetchingData ? (
            !habits.length ? (
              <NoHabit />
            ) : (
              habits.map((habit, index) => {
                return (
                  <ListGroup.Item
                    key={habit.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{habit?.habitName}</div>
                      {habit?.description}
                    </div>
                    <div>
                      <span className="me-2">Goal:</span>
                      <Badge bg="primary" pill className="me-3">
                        {habit?.goal}
                      </Badge>
                      <Link
                        href={`/edit-habit/${habit?.id}`}
                        className="btn btn-sm btn-outline-primary ms-2"
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={handleDeleteHabit.bind(null, index)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </ListGroup.Item>
                );
              })
            )
          ) : null}
        </ListGroup>
      </PerfectScrollBar>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-warning">Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          By confirming, you will lose your full records which is associated to
          your <span className="fw-bold">{deleteHabitData?.habitName}</span>{" "}
          habit
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={isDeleting}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageHabit;
