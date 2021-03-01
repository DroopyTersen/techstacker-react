import React from "react";

export default function ErrorContainer({ title = "", icon = "stop", children = undefined }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <i className={`icon icon-3x icon-${icon}`}></i>
      </div>
      {title && <p className="empty-title h5">{title}</p>}
      {children && <p className="empty-subtitle">{children}</p>}
    </div>
  );
}
