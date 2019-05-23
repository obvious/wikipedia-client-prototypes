import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from "isomorphic-fetch";

import { BaseLayout } from "../components/BaseLayout";
import { LanguageSelector } from "../components/LanguageSelector";
import { LanguageContext } from "../language_context";
import { FactCard } from "../components/FactCard";
import {
  ModalContextProvider,
  ModalContextConsumer
} from "../components/ModalContext";
import { ArticleSummaryModalContainer } from "../components/ArticleSummaryModalContainer";
import { ShareArticleFloatingToolbarContainer } from "../components/ShareArticleFloatingToolbarContainer";

import { makeArticleTitle } from "../lib/make_title";
import { articleContentUrl } from "../lib/urls";
import {
  translationsPropTypes,
  imagePropTypes,
  factCardDataPropTypes
} from "../lib/prop_types";
import { ImageAttributions } from "../components/ImageAttributions";
import { getImageAttributions } from "../lib/image_attributions";
import { ImageAttributionsModalContainer } from "../components/ImageAttributionsModalContainer";

const Article = ({
  articleId,
  title,
  lang,
  summary,
  coverImage,
  sections,
  translations,
  imageAttributions
}) => (
  <LanguageContext.Provider value={lang}>
    <ModalContextProvider>
      <BaseLayout>
        <Head>
          <title>{makeArticleTitle(title, lang)}</title>
        </Head>
        <div className="wcp-article__cover-image-container">
          <img
            className="wcp-article__cover-image"
            src={coverImage.url}
            alt={coverImage.altText}
          />
        </div>
        <ShareArticleFloatingToolbarContainer articleId={articleId} />
        <section>
          <h1 className="wcp-article__title">{title}</h1>

          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: summary }} />
        </section>

        <LanguageSelector translations={translations} coverImage={coverImage} />
        {sections.map(factCard => {
          if (factCard)
            return (
              <FactCard
                key={factCard.title}
                className="wcp-summary-fact-card"
                cardData={factCard}
              />
            );
          return null;
        })}
        <ImageAttributions attributions={imageAttributions} lang={lang} />
      </BaseLayout>

      <ModalContextConsumer>
        {({ registerModal, isModalOpen, modalData, closeModal }) => (
          <>
            <ArticleSummaryModalContainer
              registerModal={registerModal}
              isModalOpen={isModalOpen}
              modalData={modalData}
              closeModal={closeModal}
            />
            <ImageAttributionsModalContainer
              registerModal={registerModal}
              closeModal={closeModal}
              isModalOpen={isModalOpen}
              modalData={modalData}
            />
          </>
        )}
      </ModalContextConsumer>
    </ModalContextProvider>
  </LanguageContext.Provider>
);

Article.getInitialProps = async ({ query }) => {
  const { articleId, lang } = query;
  const articleResponse = await fetch(articleContentUrl(articleId, lang));
  const articleJson = await articleResponse.json();
  const imageAttributions = getImageAttributions(articleJson);

  return {
    ...articleJson,
    articleId,
    lang,
    imageAttributions
  };
};

Article.defaultProps = {
  sections: []
};

Article.propTypes = {
  articleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  coverImage: imagePropTypes.isRequired,
  summary: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  translations: translationsPropTypes.isRequired,
  sections: PropTypes.arrayOf(factCardDataPropTypes),
  imageAttributions: PropTypes.arrayOf(imagePropTypes).isRequired
};

export default Article;
