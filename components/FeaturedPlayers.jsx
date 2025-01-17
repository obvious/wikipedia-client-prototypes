import React from "react";
import PropTypes from "prop-types";
import { useTracking } from "react-tracking";
import { CLICK_ALL_PLAYERS } from "../lib/matomo";
import { LargeSectionTitle } from "./LargeSectionTitle";
import { LanguageContextConsumer } from "../language_context";
import { todayString } from "../lib/date";
import { AvatarCarousel } from "./AvatarCarousel";
import { Button } from "./Button";
import { factPropTypes } from "../lib/prop_types";
import { TEAMS_LIST_MODAL_ID } from "../lib/modal_ids";
import { ModalContextConsumer } from "./ModalContext";
import { TinyCardsListModalContainer } from "./TinyCardsListModalContainer";
import { homeUiStrings } from "../lib/ui_strings";

export const FeaturedPlayers = ({ scheduled, constant, all }) => {
  const tracking = useTracking();
  const dateString = todayString();
  let players = [
    ...scheduled.filter(f => f.dates.indexOf(dateString) > -1),
    ...constant
  ];

  if (scheduled.filter(f => f.dates.indexOf(dateString) > -1).length === 0) {
    players = [
      ...scheduled.filter(f => f.dates.indexOf("2019-05-31") > -1),
      ...constant
    ];
  }

  return (
    <LanguageContextConsumer>
      {lang => (
        <section className="wcp-featured-players">
          <LargeSectionTitle>
            {homeUiStrings.playersToLookOutFor[lang]}
          </LargeSectionTitle>
          <AvatarCarousel cards={players} />
          <ModalContextConsumer>
            {({
              openModal,
              registerModal,
              closeModal,
              isModalOpen,
              modalData
            }) => (
              <>
                <Button
                  className="wcp-featured-players__see-all-players-button"
                  isFullWidth
                  isInverted
                  onClick={() => {
                    tracking.trackEvent(
                      CLICK_ALL_PLAYERS(window.location.pathname)
                    );
                    openModal(TEAMS_LIST_MODAL_ID, {
                      items: all,
                      title: homeUiStrings.playersToLookOutFor[lang]
                    });
                  }}
                >
                  {homeUiStrings.seeAllPlayers[lang]}
                </Button>
                <TinyCardsListModalContainer
                  registerModal={registerModal}
                  closeModal={closeModal}
                  isModalOpen={isModalOpen}
                  modalData={modalData}
                />
              </>
            )}
          </ModalContextConsumer>
        </section>
      )}
    </LanguageContextConsumer>
  );
};

FeaturedPlayers.propTypes = {
  scheduled: PropTypes.arrayOf(factPropTypes).isRequired,
  constant: PropTypes.arrayOf(factPropTypes).isRequired,
  all: PropTypes.arrayOf(factPropTypes).isRequired
};
