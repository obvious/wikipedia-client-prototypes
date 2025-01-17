import PropTypes from "prop-types";

export const translationsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired
  })
);

export const imagePropTypes = PropTypes.shape({
  url: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  license: PropTypes.string,
  licenseUrl: PropTypes.string
});

export const factPropTypes = PropTypes.shape({
  label: PropTypes.string,
  date: PropTypes.string,
  value: PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
    image: imagePropTypes
  })
});

export const factCardDataPropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  facts: PropTypes.arrayOf(factPropTypes)
});

export const barChartPropTypes = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.shape({
    count: PropTypes.number.isRequired
  })
});

export const OneOfPropType = ({ onClick, url }, componentName) => {
  if (!onClick && !url) {
    return new Error(
      `One of 'onClick' or 'url' is required in ${componentName} component.`
    );
  }
  return null;
};

export const quizQuestionPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  answerIndex: PropTypes.number.isRequired,
  relatedArticle: factPropTypes
});
