import React from "react";
import "./UndrawContainer.css";

export function UndrawContainer({ name, children, opacity = ".25", title }) {
  return (
    <div className="undraw-container">
      <UndrawImage name={name} style={{ opacity }} />
      <div className="undraw-content">
        <div className="undraw-header">{title}</div>
        <div className="undraw-body">{children}</div>
      </div>
    </div>
  );
}

export function UndrawImage({ name, className = "", ...rest }) {
  let src = `/images/undraw/${name}.svg`;

  return <img className={"undraw " + className} src={src} {...rest} />;
}
