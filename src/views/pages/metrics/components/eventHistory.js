import React from "react";

export const AppEventSection = ({ state }) => {
  return state.eventArr.map((event) => {
    let eventBadge = <td>{event.event}</td>;
    if (event.event === "Closed Store") {
      eventBadge = (
        <td>
          <div className="badge badge-danger">{event.event}</div>
        </td>
      );
    } else if (event.event === "Uninstalled") {
      eventBadge = (
        <td>
          <div className="badge badge-warning">{event.event}</div>
        </td>
      );
    } else if (event.event === "Recurring charge activated") {
      eventBadge = (
        <td>
          <div className="badge badge-success">{event.event}</div>
        </td>
      );
    } else if (event.event === "Installed") {
      eventBadge = (
        <td>
          <div className="badge badge-info">{event.event}</div>
        </td>
      );
    } else if (
      event.event === "Credit applied" ||
      event.event === "Credit pending" ||
      event.event === "Recurring charge declined"
    ) {
      eventBadge = (
        <td>
          <div className="badge badge-muted">{event.event}</div>
        </td>
      );
    }
    return (
      <tr key={Math.random()}>
        <td className="text-center">{event.date}</td>
        <td>{event.store}</td>
        {eventBadge}
        <td>{event.description}</td>
      </tr>
    );
  });
};
