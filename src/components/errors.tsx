import React from "react";

export function ErrorCard({ errors, children }: ErrorCardProps) {
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
        {errors && errors.map((err) => <p className="text-error">{err.message}</p>)}
      </div>
    </div>
  );
}
export interface ErrorCardProps {
  errors?: { message: string }[];
  children?: React.ReactNode;
}
