import React from "react";
import PropTypes from "prop-types";

import { Icon } from "./Icon";

import { imagePropTypes } from "../lib/prop_types";
import { Image } from "./Image";

export const CoverCard = ({
  url,
  title,
  coverImage,
  linkText,
  children,
  isCarouselChild,
  onClick
}) => {
  return (
    <a
      href={url}
      onClick={event => {
        if (onClick) onClick(event, url);
      }}
      className={`wcp-cover-card ${
        isCarouselChild ? "wcp-cover-card--carousel-child" : ""
      }`}
    >
      <Image
        className="wcp-cover-card__cover-image"
        src={coverImage.url}
        alt={coverImage.altText}
      />
      <section className="wcp-cover-card__content">
        <h1 className="wcp-cover-card__content__title">{title}</h1>
        {children && (
          <div className="wcp-cover-card__content__text">{children}</div>
        )}

        {/* eslint-disable react/jsx-one-expression-per-line */}
        {linkText && (
          <span className="wcp-cover-card__link-text">
            {linkText}{" "}
            <Icon
              className="wcp-cover-card__link-text__icon"
              altText="Go to language"
              name="arrow_right"
              size="xs"
            />
          </span>
        )}
      </section>
    </a>
  );
};

CoverCard.defaultProps = {
  children: null,
  linkText: null,
  isCarouselChild: false,
  onClick: null
};

CoverCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  coverImage: imagePropTypes.isRequired,
  linkText: PropTypes.string,
  children: PropTypes.node,
  isCarouselChild: PropTypes.bool,
  onClick: PropTypes.func
};
