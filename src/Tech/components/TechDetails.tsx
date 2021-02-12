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
          style={{ height: "min(55vh, 50vw)", width: "100%" }}
        ></img>
      )}
      <div className="p-relative" style={{ marginBottom: "40px" }}>
        <h1 style={{ marginTop: "30px" }}>{tech.title}</h1>
        <div style={{ position: "absolute", right: "0", bottom: "0" }}>
          <Link to={`/tech/${tech.id}/edit`} className="btn">
            EDIT
            <i className="icon icon-edit ml-2"></i>
          </Link>
        </div>
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
                <div>
                  <h3>Stacks</h3>
                  <p className="text-gray">Coming soon...</p>
                </div>
                <div>
                  <h3>Similar Tech</h3>
                  <p className="text-gray">Coming soon...</p>
                </div>
              </>
            </TwoColumn>
          </section>
        </div>
      </div>
    </>
  );
}
interface Props {
  tech: Tech;
}
