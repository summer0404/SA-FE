"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";

const CalendarDialog = ({ open, onClose, employeeId, events }) => {
  const [eventsService, setEventsService] = useState(null);
  const [loading, setLoading] = useState(false);

  // Khởi tạo lại plugin mỗi lần mở dialog
  useEffect(() => {
    if (open) {
      const plugin = createEventsServicePlugin();
      setEventsService(plugin);
    }
  }, [open]);

  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events, // Sử dụng sự kiện từ props
    plugins: eventsService ? [eventsService] : [],
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Lịch làm việc của nhân viên</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <div
            style={{
              height: "calc(90vh - 200px)",
              overflowY: "auto",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarDialog;
