import { TwoColumn, Row } from "@components/layout";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Stack } from "../stack.data";
import StackTech from "./StackTech";

interface Props {
  stack: Stack;
}
export default function StackDetails({ stack }: Props) {
  if (!stack) return null;

  return (
    <>
      {stack.image && (
        <img
          src={stack.image}
          className="img-responsive img-fit-cover"
          style={{ height: "min(55vh, 50vw)", width: "100%" }}
        ></img>
      )}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ marginTop: "30px" }}>{stack.title}</h1>
          <Link to={`/stacks/${stack.id}/edit`} className="btn">
            EDIT
            <i className="icon icon-edit ml-2"></i>
          </Link>
        </div>
        <div className="columns">
          <section className="column tech-info col-6 col-md-12">
            <h5 className="text-gray">{stack.tagline}</h5>
            {stack.description && (
              <div style={{ margin: "30px 0 " }}>
                <ReactMarkdown>{stack.description}</ReactMarkdown>
              </div>
            )}
          </section>
          <section className="column col-6 col-md-12">
            <h2>Tech Stack</h2>
            <StackTech stack={stack} />
          </section>
        </div>
      </div>
    </>
  );
}
