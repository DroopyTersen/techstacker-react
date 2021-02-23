import QueryLink from "@components/QueryLink";
import { TagsDisplay } from "@components/tags";
import React from "react";
import { Link } from "react-router-dom";
import { Tech } from "../tech.data";
import TechTags from "./TechTags";
import { motion } from "framer-motion";

function TechTable({ technologies = [] }: TechTableProps) {
  return (
    <motion.div
      style={{ overflowX: "auto", overflowY: "hidden" }}
      initial="hidden"
      animate="visible"
      variants={tableVariants}
    >
      <table className="table" style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th className="hide-mobilex">Logo</th>
            <th>Tech</th>
            <th>Layer</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map((tech) => (
            <motion.tr variants={itemVarients}>
              <td className="hide-mobilex" width="180px">
                <Link to={"/tech/" + tech.id}>
                  <img
                    src={tech.logo}
                    style={{ width: "100%" }}
                    className="img-fit-cover"
                    loading="lazy"
                  />
                </Link>
              </td>
              <td width="300px">
                <div>
                  <Link to={"/tech/" + tech.id}>
                    <div className="text-bold text-dark">{tech.title}</div>
                  </Link>
                  <div className="text-gray">{tech.tagline}</div>
                  <div className="">
                    <TechTags tags={tech.tags} />
                  </div>
                </div>
              </td>
              <td width="125px">
                {" "}
                <QueryLink
                  path="/tech"
                  param="layerId"
                  value={tech.layer.id}
                  className="label label-rounded label-secondary"
                >
                  {tech?.layer?.title}
                </QueryLink>
              </td>
              <td width="170px">
                <QueryLink
                  path="/tech"
                  param="categoryId"
                  value={tech.category.id}
                  className="label label-rounded label-secondary"
                >
                  {tech?.category?.title}
                </QueryLink>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default React.memo(TechTable);

export interface TechTableProps {
  technologies: Tech[];
}

const itemVarients = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -20 },
};

const tableVariants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
  hidden: {
    transition: { staggerChildren: 0.07, staggerDirection: -1 },
  },
};
