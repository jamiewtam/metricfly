import React from "react";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears,
} from "date-fns";
import {
  DateRangePicker,
  DateRange,
  createStaticRanges,
} from "react-date-range";

const updateDates = (newDates, dateCounter, setStartDate, setEndDate) => {
  const { startDate, endDate } = newDates;

  if (dateCounter === 1) {
    setStartDate({ startDate, dateCounter: 0 });
    setEndDate({ endDate });
  } else {
    setStartDate(({ dateCounter }) => {
      return {
        startDate,
        dateCounter: dateCounter + 1,
      };
    });
  }
};

export const ShowCalendarBackdrop = ({ showCalendar, handleCalendar }) => {
  if (showCalendar) {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 4999,
          width: "100%",
          height: "100%",
        }}
        onClick={handleCalendar}
      ></div>
    );
  }

  return null;
};

export const CalenderInput = ({ startDate, endDate, handleCalendar }) => {
  return (
    <div className="form-group">
      <input
        placeholder={`${startDate.toLocaleDateString()}-${endDate.toLocaleDateString()}`}
        className="form-control"
        type="text"
        onClick={handleCalendar}
      />
    </div>
  );
};

const defineds = {
  lastSevenDays: addDays(new Date(), -6),
  lastThirtyDays: addDays(new Date(), -29),
  lastSixtyDays: addDays(new Date(), -59),
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfThreeMonths: startOfMonth(addMonths(new Date(), -3)),
  endOfThreeMonths: endOfMonth(addMonths(new Date(), -1)),
  startOfSixMonths: startOfMonth(addMonths(new Date(), -6)),
  endOfSixMonths: endOfMonth(addMonths(new Date(), -1)),
  startOfLastYear: startOfYear(addYears(new Date(), -1)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
  allTime: endOfYear(addYears(new Date(), -10)),
};

export const CalendarComponent = ({
  showCalendar,
  startDateItems,
  endDateItems,
}) => {
  const predefinedRanges = createStaticRanges([
    {
      label: "Last 7 Days",
      range() {
        return {
          startDate: defineds.lastSevenDays,
          endDate: defineds.endOfToday,
        };
      },
    },
    {
      label: "Last 30 Days",
      range() {
        return {
          startDate: defineds.lastThirtyDays,
          endDate: defineds.endOfToday,
        };
      },
    },
    {
      label: "Last 60 Days",
      range() {
        return {
          startDate: defineds.lastSixtyDays,
          endDate: defineds.endOfToday,
        };
      },
    },
    {
      label: "This Month",
      range() {
        return {
          startDate: defineds.startOfMonth,
          endDate: defineds.endOfToday,
        };
      },
    },
    {
      label: "Last Month",
      range() {
        return {
          startDate: defineds.startOfLastMonth,
          endDate: defineds.endOfLastMonth,
        };
      },
    },
    {
      label: "Last 3 Months",
      range() {
        return {
          startDate: defineds.startOfThreeMonths,
          endDate: defineds.endOfThreeMonths,
        };
      },
    },
    {
      label: "Last 6 Months",
      range() {
        return {
          startDate: defineds.startOfSixMonths,
          endDate: defineds.endOfSixMonths,
        };
      },
    },
    {
      label: "Year to Date",
      range() {
        return {
          startDate: defineds.startOfYear,
          endDate: defineds.endOfToday,
        };
      },
    },
    {
      label: "Last Year",
      range() {
        return {
          startDate: defineds.startOfLastYear,
          endDate: defineds.endOfLastYear,
        };
      },
    },
    // {
    //   label: "All Time",
    //   range() {
    //     return {
    //       startDate: defineds.allTime,
    //       endDate: defineds.endOfToday,
    //     };
    //   },
    // },
  ]);
  const [isDesktop, setDesktop] = React.useState(window.innerWidth > 992);
  // RESIZE CALENDAR
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1000);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const { startDate, setStartDate } = startDateItems;
  const { endDate, setEndDate } = endDateItems;
  if (showCalendar && isDesktop) {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: "5000",
          right: 1,
          marginRight: "10px",
        }}
      >
        <DateRangePicker
          showDateDisplay={false}
          staticRanges={predefinedRanges}
          inputRanges={[]}
          dragSelectionEnabled={false}
          onChange={(item) =>
            updateDates(
              item.selection,
              startDate.dateCounter,
              setStartDate,
              setEndDate
            )
          }
          moveRangeOnFirstSelection={true}
          months={1}
          ranges={[
            {
              startDate: startDate.startDate,
              endDate: endDate.endDate,
              key: "selection",
            },
          ]}
        />
      </div>
    );
  } else if (showCalendar && !isDesktop) {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: "5000",
          top: "175px",
          left: "50%",
          transform: `translate(-50%, -50%)`,
        }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) =>
            updateDates(
              item.selection,
              startDate.dateCounter,
              setStartDate,
              setEndDate
            )
          }
          moveRangeOnFirstSelection={false}
          ranges={[
            {
              startDate: startDate.startDate,
              endDate: endDate.endDate,
              key: "selection",
            },
          ]}
        />
      </div>
    );
  } else {
    return null;
  }
};
