import React from "react";
import PropTypes from "prop-types";
import slugify from "slugify";

import { imagePropTypes } from "../lib/prop_types";
import { articleUrl } from "../lib/urls";
import { LanguageContext } from "../language_context";

import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { LoadingSpinner } from "./LoadingSpinner";
import { ERROR_NOT_FOUND, ERROR_NETWORK } from "../lib/errors";

export const ArticleSummaryModal = ({
  isLoadingArticle,
  article,
  onCloseClick,
  error,
  onRetry
}) => {
  if (error) {
    const message =
      error === ERROR_NOT_FOUND
        ? "This page could not be found"
        : "There was a network error. Please try again.";
    return (
      <div className="wcp-article-summary-modal__error">
        <p>{message}</p>
        <Button
          type="inverted"
          onClick={onCloseClick}
          className="wcp-article-summary-modal__error__button-close"
        >
          Close
        </Button>
        {error === ERROR_NETWORK && <Button onClick={onRetry}>Retry</Button>}
      </div>
    );
  }

  if (!article) {
    return null;
  }

  if (isLoadingArticle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="wcp-article-summary-modal">
      <div className="wcp-article-summary-modal__cover-image-container">
        <img
          className="wcp-article-summary-modal__cover-image"
          src={article.coverImage.url}
          alt={article.coverImage.altText}
        />
        <IconButton
          name="close"
          className="wcp-article-summary-modal__icon-close"
          altText="Close"
          onClick={onCloseClick}
          size="l"
        />
        <IconButton
          name="bookmark"
          className="wcp-article-summary-modal__icon-bookmark"
          altText="Bookmark"
          size="l"
        />
      </div>
      <div className="wcp-article-summary-modal__content">
        <h1 className="wcp-article-summary-modal__title">{article.title}</h1>
        <p className="wcp-article-summary-modal__summary">{article.summary}</p>
        <LanguageContext.Consumer>
          {lang => (
            <Button
              className="wcp-article-summary-modal__button-read-article"
              type="inverted"
              isLink
              href={articleUrl(slugify(article.title, "_"), lang)}
            >
              Read This Article
            </Button>
          )}
        </LanguageContext.Consumer>
      </div>
    </div>
  );
};

ArticleSummaryModal.defaultProps = {
  article: null,
  error: null
};

ArticleSummaryModal.propTypes = {
  isLoadingArticle: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    coverImage: imagePropTypes.isRequired
  }),
  onCloseClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired
};
