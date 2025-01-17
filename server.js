const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/read/:lang", (req, res) => {
      const actualPage = "/home";

      const queryParams = {
        lang: req.params.lang
      };

      app.render(req, res, actualPage, queryParams);
    });

    server.get("/read/:lang/:articleId", (req, res) => {
      const actualPage = "/article";

      const queryParams = {
        articleId: req.params.articleId,
        lang: req.params.lang
      };

      app.render(req, res, actualPage, queryParams);
    });

    server.get("/privacy_policy/:lang", (req, res) => {
      const actualPage = "/privacy_policy";

      const queryParams = {
        lang: req.params.lang
      };

      app.render(req, res, actualPage, queryParams);
    });

    server.get("/survey_statement/en", (req, res) =>
      app.render(req, res, "/survey_statement")
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log("> Ready on http://localhost:3000/");
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
