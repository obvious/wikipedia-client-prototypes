import React from "react";

import { SectionTitle } from "./SectionTitle";

import { factCardDataPropTypes } from "../lib/prop_types";

export const AvatarList = ({ cardData }) => (
  <section className="wcp-avatar-list">
    <SectionTitle>{cardData.title}</SectionTitle>

    {cardData.label && (
      <p className="wcp-avatar-list__summary">{cardData.label}</p>
    )}

    <div className="wcp-avatar-list__item-list-wrapper">
      {cardData.facts.map(f => {
        const content = (
          <div className="wcp-avatar-list__item">
            <div className="wcp-avatar-list__item__profile-picture">
              <img src={f.value.image.url} alt={f.value.image.alt} />
            </div>
            <div className="wcp-avatar-list__item__info">
              <div className="wcp-avatar-list__item__info__label">
                {f.label}
              </div>
              <div className="wcp-avatar-list__item__info__value wcp-font-family-heading">
                {f.value.label}
              </div>
            </div>
          </div>
        );

        return f.value.url ? (
          <a
            className="wcp-avatar-list__item-wrapper wcp-avatar-list__item-wrapper--active"
            href={f.value.url}
          >
            {content}
          </a>
        ) : (
          <div className="wcp-avatar-list__item-wrapper">{content}</div>
        );
      })}
    </div>
  </section>
);

AvatarList.propTypes = {
  cardData: factCardDataPropTypes.isRequired
};