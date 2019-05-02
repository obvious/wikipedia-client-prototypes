import React from "react";
import { barChartPropTypes } from "../lib/prop_types";
import { SectionTitle } from "./SectionTitle";

export const BarChart = ({ cardData }) => {
  const calculatePercentageForFact = (arr, count) => {
    const totalCount = arr.reduce((acc, cur) => {
      return acc + cur.value.count;
    }, 0);
    return ((count / totalCount) * 100).toFixed(2);
  };

  return (
    <section>
      <SectionTitle>{cardData.title}</SectionTitle>

      <div className="wcp-bar-chart">
        {cardData.facts.map(fact => {
          const factId = fact.id;
          const factLabel = fact.label;
          const factPercentage = calculatePercentageForFact(
            cardData.facts,
            fact.value.count
          );
          const barStyle = {
            width: `${factPercentage}%`
          };
          return (
            <div key={factId} className="wcp-bar-chart__single-bar">
              <div className="wcp-bar-chart__single-bar__label">
                {factLabel}
              </div>
              <div className="wcp-bar-chart__single-bar__percentage">
                {`${factPercentage}%`}
              </div>
              <div className="wcp-bar-chart__single-bar__bar">
                <div
                  className="wcp-bar-chart__single-bar__bar__inner"
                  style={barStyle}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

BarChart.propTypes = {
  cardData: barChartPropTypes.isRequired
};