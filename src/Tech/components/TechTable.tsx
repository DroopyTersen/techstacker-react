import { TagsDisplay } from "@components/tags";
import React from "react";
import { Link } from "react-router-dom";
import { Tech } from "../tech.data";

function TechTable({ technologies = [] }: TechTableProps) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Tech</th>
            <th>Layer</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map((tech) => (
            <tr>
              <td className="hide-mobile" width="175px">
                <Link to={"/tech/" + tech.id}>
                  <img src={tech.logo} style={{ width: "175px" }} className="img-fit-cover" />
                </Link>
              </td>
              <td width="">
                <div>
                  <Link to={"/tech/" + tech.id}>
                    <div className="text-bold text-dark">{tech.title}</div>
                  </Link>
                  <div className="text-gray">{tech.tagline}</div>
                  <div className="">
                    <TagsDisplay tags={tech.tags} getLinkPath={(tag) => `/tech?tag=${tag}`} />
                  </div>
                </div>
              </td>
              <td width="125px">{tech.layer.title}</td>
              <td width="200px">{tech.category.title}</td>
            </tr>
          ))}
          <td></td>
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(TechTable);

export interface TechTableProps {
  technologies: Tech[];
}
