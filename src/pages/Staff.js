import React from "react";
import RegForm from "./../components/renderStaff/RegForm";
import ListStaff from "./../components/renderStaff/ListStaff";

export default function Staff() {
  return (
    <div className="staff-pages">
      <RegForm />
      <ListStaff />
    </div>
  );
}
