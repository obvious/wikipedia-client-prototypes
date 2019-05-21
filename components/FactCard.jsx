import React from "react";
import { StoriesContainer } from "./StoriesContainer";
import { factCardDataPropTypes } from "../lib/prop_types";
import { BarChart } from "./BarChart";
import { Timeline } from "./Timeline";
import { SectionTitle } from "./SectionTitle";
import { AvatarList } from "./AvatarList";
import { TagCard } from "./TagCard";
import { ListCard } from "./ListCard";
import { FactCardSimple } from "./FactCardSimple";

const FactCardTable = ({ cardData }) => {
  const content = cardData.facts.map(f => (
    <tr key={f.label}>
      <th>{f.label}</th>
      <td>
        {f.value.url ? (
          <a href={f.value.url}>{f.value.label}</a>
        ) : (
          f.value.label
        )}
      </td>
    </tr>
  ));
  return (
    <section>
      <SectionTitle>{cardData.title}</SectionTitle>
      <table className="wcp-fact-card-table-content">
        <tbody>{content}</tbody>
      </table>
    </section>
  );
};

FactCardTable.propTypes = {
  cardData: factCardDataPropTypes.isRequired
};

export const FactCard = ({ cardData }) => {
  if (cardData.cardType === "table") {
    return <FactCardTable cardData={cardData} />;
  }

  if (cardData.cardType === "avatar") {
    return <AvatarList cardData={cardData} />;
  }

  if (cardData.cardType === "simple") {
    return <FactCardSimple cardData={cardData} />;
  }

  if (cardData.cardType === "vertical_timeline") {
    return <Timeline cardData={cardData} type="vertical" />;
  }

  if (cardData.cardType === "horizontal_timeline") {
    return <Timeline cardData={cardData} type="horizontal" />;
  }

  if (cardData.cardType === "bar_chart") {
    return <BarChart cardData={cardData} />;
  }

  if (cardData.cardType === "stories") {
    return <StoriesContainer cardData={cardData} />;
  }

  if (cardData.cardType === "tag_card") {
    return <TagCard cardData={cardData} />;
  }

  if (cardData.cardType === "list_card") {
    return <ListCard cardData={cardData} />;
  }

  return null;
};

FactCard.propTypes = {
  cardData: factCardDataPropTypes.isRequired
};

// TODO: Modify simple, Add tag_card, Add list_card
