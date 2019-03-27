import React from "react";

import { sectionsPropTypes } from "../lib/prop_types";

export const ArticleContent = ({ sections }) => {
  const sectionEls = sections.map(s => {
    const Heading = `h${s.tocLevel}`;
    return (
      <>
        <Heading>{s.title}</Heading>
        <div dangerouslySetInnerHTML={{ __html: s.content }} />
      </>
    );
  });

  return <>{sectionEls}</>;
};

ArticleContent.propTypes = {
  sections: sectionsPropTypes.isRequired
};
