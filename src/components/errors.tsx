import React from "react";

export function ErrorCard({ errors, children, error }: ErrorCardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title h4 text-error">Uh oh...</div>
        <div className="card-subtitle text-gray" style={{ minHeight: "50px" }}>
          Something went wrong
        </div>
      </div>
      <div className="card-body">
        {children}
        {error && <p className="text-error">{error?.message || error + ""}</p>}
        {errors && errors.map((err) => <p className="text-error">{err.message}</p>)}
      </div>
    </div>
  );
}
export interface ErrorCardProps {
  error?: any;
  errors?: { message: string }[];
  children?: React.ReactNode;
}

export function ErrorContainer({ title = "", icon = "stop", children = undefined }) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <i className={`icon icon-3x icon-${icon}`}></i>
      </div>
      {title && <p className="empty-title h5">{title}</p>}
      {children && <p className="text-error empty-subtitle">{children}</p>}
    </div>
  );
}
