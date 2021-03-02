import { UndrawImage } from "@components/UndrawContainer";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../auth/auth";
import { useGqlQuery } from "../common/gql";
import LayersGrid from "../Layers/LayersGrid";
import { STACK_CARD_SELECT_FRAGMENT } from "../Stacks/components/StackCard";
import StackGrid from "../Stacks/components/StackGrid";
import { TECH_CARD_SELECT_FRAGMENT } from "../Tech/components/TechCard";
import TechGrid from "../Tech/components/TechGrid";

function SectionHeader({ newLink, newLabel, seeAllLink, title }) {
  return (
    <div className="columns">
      <div className="col-8 col-sm-12">
        <h1 className="d-inline-block pr-2 mr-2">{title}</h1>
        <Link to={seeAllLink}>See all</Link>
      </div>
      <div className="col-4 col-sm-12 text-right">
        {auth.isLoggedIn && (
          <Link to={newLink} className="btn btn-primary mb-2">
            {newLabel}
            <i className="icon icon-plus ml-2"></i>
          </Link>
        )}
      </div>
    </div>
  );
}
export default function HomeScreen() {
  let { data } = useGqlQuery(QUERY);
  return (
    <>
      <div className="home-hero">
        <div className="hero-text col-3 col-sm-6 col-xs-12">
          <h3 className="text-primary text-bold">What's your stack?</h3>
          <p className="text-muted text-large">Track the tech used to build web applications.</p>
          <ul className="text-muted">
            <li>What are the tech options and which have you used?</li>
            <li>Amazing pairings? Burnt fingers?</li>
          </ul>
        </div>
        <div className="col-9 col-sm-6 col-xs-12">
          <UndrawImage name="building-blocks" style={{ opacity: ".5" }} />
        </div>
      </div>
      <div className="hero">
        <h1>Application Layers</h1>
        <LayersGrid layers={data?.layers} />
      </div>

      <div className="hero">
        <SectionHeader
          title="Recent Stacks"
          newLink="/stacks/new"
          newLabel="NEW STACK"
          seeAllLink="/stacks"
        />
        <StackGrid stacks={data?.stacks} />
      </div>

      <div className="hero">
        <SectionHeader
          title="Recent Tech"
          newLink="/tech/new"
          newLabel="NEW tech"
          seeAllLink="/tech"
        />
        <TechGrid technologies={data?.technologies} />
      </div>
    </>
  );
}

const QUERY = `query GetHomepage {
    layers(order_by: {position: asc}) {
      id
      title
      description
      image
      position
      technologies_aggregate {
        aggregate {
          count
        }
      }
    }
    stacks(order_by: {created_at: desc}, limit: 3) {
      ${STACK_CARD_SELECT_FRAGMENT}
    }
    technologies(limit: 6, order_by: {created_at: desc}) {
        ${TECH_CARD_SELECT_FRAGMENT}
    }
}
  
  `;
