import { TwoColumn, Row } from "@components/layout";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Tech } from "../tech.data";
import TechCard from "./TechCard";

export default function TechDetails({ tech }: Props) {
  if (!tech) return null;
  return (
    <>
      {tech.logo && (
        <img
          src={tech.logo}
          className="img-responsive img-fit-cover"
          style={{ height: "55vh", width: "100%" }}
        ></img>
      )}
      <h1 style={{ marginTop: "30px" }}>{tech.title}</h1>
      <div>
        <section className="tech-info">
          <TwoColumn>
            <>
              <h5 className="text-gray">{tech.tagline}</h5>
              {tech.link && (
                <div className="text-ellipsis" style={{ marginBottom: "30px" }}>
                  <a target="_blank" href={tech.link}>
                    {tech.link}
                  </a>
                </div>
              )}
              <div>
                {tech.layer && (
                  <Link className="btn btn-primary mr-1 mb-1" to={"/layers/" + tech.layer.id}>
                    {tech.layer.title}
                  </Link>
                )}
                {tech.category && (
                  <Link className="btn btn-primary mb-1" to={"/categories/" + tech.category.id}>
                    {tech.category.title}
                  </Link>
                )}
              </div>
              {tech.description && (
                <div style={{ margin: "30px 0 " }}>
                  <ReactMarkdown>{tech.description}</ReactMarkdown>
                </div>
              )}
            </>
            <>
              <h3 style={{ width: "100%" }}>Related Tech</h3>
            </>
          </TwoColumn>
        </section>
      </div>
    </>
  );
}
interface Props {
  tech: Tech;
}
