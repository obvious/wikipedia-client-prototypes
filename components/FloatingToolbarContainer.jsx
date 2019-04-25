import React from "react";
import PropTypes from "prop-types";

import { ShareModalContainer } from "./ShareModalContainer";

import { ModalContextConsumer } from "./ModalContext";
import { SHARE_MODAL_ID } from "../lib/modal_ids";
import { FloatingToolbar } from "./FloatingToolbar";
import { LanguageContext } from "../language_context";

export const FloatingToolbarContainer = ({ articleId }) => {
  const shareData = process.browser
    ? {
        title: document.title,
        url: window.location.href
      }
    : "";

  const onShareClick = (event, openModal) => {
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      event.preventDefault();
      openModal(SHARE_MODAL_ID, shareData);
    }
  };

  return (
    <LanguageContext.Consumer>
      {lang => (
        <ModalContextConsumer>
          {({
            registerModal,
            openModal,
            isModalOpen,
            modalData,
            closeModal
          }) => (
            <>
              <FloatingToolbar
                onShareClick={onShareClick}
                openModal={openModal}
                articleId={articleId}
                lang={lang}
              />
              <ShareModalContainer
                registerModal={registerModal}
                isModalOpen={isModalOpen}
                modalData={modalData}
                closeModal={closeModal}
                lang={lang}
              />
            </>
          )}
        </ModalContextConsumer>
      )}
    </LanguageContext.Consumer>
  );
};

FloatingToolbarContainer.propTypes = {
  articleId: PropTypes.string.isRequired
};
