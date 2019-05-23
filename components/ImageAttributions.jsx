import React from "react";
import PropTypes from "prop-types";

import { Icon } from "./Icon";
import { ModalContextConsumer } from "./ModalContext";
import { IMAGE_ATTRIBUTIONS_MODAL_ID } from "../lib/modal_ids";
import { imagePropTypes } from "../lib/prop_types";

export const ImageAttributions = ({ attributions }) => (
  <section className="wcp-image-attributions">
    {/* eslint-disable react/jsx-one-expression-per-line */}
    <p>
      All content on this page has been adapted from{" "}
      <a href="https://en.wikipedia.org">Wikipedia</a> under the terms of the{" "}
      <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode">
        CC-BY-SA 3.0
      </a>{" "}
      license.
    </p>
    <p>
      <ModalContextConsumer>
        {({ openModal }) => (
          <button
            onClick={() =>
              openModal(IMAGE_ATTRIBUTIONS_MODAL_ID, { attributions })
            }
            type="button"
            className="wcp-image-attributions__know-more"
          >
            See licenses for images used on this page{" "}
            <Icon size="xs" name="arrow_right" altText="Right arrow icon" />
          </button>
        )}
      </ModalContextConsumer>
    </p>
    {/* eslint-enable react/jsx-one-expression-per-line */}
  </section>
);

ImageAttributions.propTypes = {
  attributions: PropTypes.arrayOf(imagePropTypes).isRequired
};
