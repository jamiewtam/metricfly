import React from "react";
import Select from "react-select";

const timezonesGMT = [
  { value: "Etc/GMT+0", label: "GMT 0" },
  { value: "Etc/GMT-1", label: "GMT+1" },
  { value: "Etc/GMT-2", label: "GMT+2" },
  { value: "Etc/GMT-3", label: "GMT+3" },
  { value: "Etc/GMT-4", label: "GMT+4" },
  { value: "Etc/GMT-5", label: "GMT+5" },
  { value: "Etc/GMT-6", label: "GMT+6" },
  { value: "Etc/GMT-7", label: "GMT+7" },
  { value: "Etc/GMT-8", label: "GMT+8" },
  { value: "Etc/GMT-9", label: "GMT+9" },
  { value: "Etc/GMT-10", label: "GMT+10" },
  { value: "Etc/GMT-11", label: "GMT+11" },
  { value: "Etc/GMT-12", label: "GMT+12" },
  { value: "Etc/GMT+1", label: "GMT-1" },
  { value: "Etc/GMT+2", label: "GMT-2" },
  { value: "Etc/GMT+3", label: "GMT-3" },
  { value: "Etc/GMT+4", label: "GMT-4" },
  { value: "Etc/GMT+5", label: "GMT-5" },
  { value: "Etc/GMT+6", label: "GMT-6" },
  { value: "Etc/GMT+7", label: "GMT-7" },
  { value: "Etc/GMT+8", label: "GMT-8" },
  { value: "Etc/GMT+9", label: "GMT-9" },
  { value: "Etc/GMT+10", label: "GMT-10" },
  { value: "Etc/GMT+11", label: "GMT-11" },
  { value: "Etc/GMT+12", label: "GMT-12" },
];

const TimezoneSelector = ({ handleChange, value }) => {
  if (!value.label) {
    const matchingLabel = timezonesGMT.find((el) => {
      return el.value === value.value;
    });
    value["label"] = matchingLabel.label;
  }

  return (
    <Select
      className="react-select info"
      classNamePrefix="react-select"
      name="expenseTypeValue"
      value={value}
      onChange={handleChange}
      options={timezonesGMT}
    />
  );
};

export default TimezoneSelector;
