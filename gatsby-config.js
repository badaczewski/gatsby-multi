module.exports = {
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-drupal",
      options: {
        baseUrl: `https://${process.env.JSONAPI_HOST}/`,
        apiBase: "jsonapi",
        fastBuilds: true,
        skipFileDownloads: true,
        imageCDN: false,
        languageConfig: {
          defaultLanguage: "en",
          enabledLanguages:
          process.env.GATSBY_ES_ENABLED === ["en", "es"],
          translatableEntities: [
            "node--reference_page",
          ],
          nonTranslatableEntities: [],
        },
        filters: {
          "node--reference_page":"filter[status][value]=1",
        },
      },
    },
  ],
};
