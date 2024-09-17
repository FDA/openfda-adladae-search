import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  //pathPrefix: `/animaldrugsearch`,
  siteMetadata: {
    title: `OpenFDA Dataset Explorer: Animal Drug Labels and Animal Drug Adverse Event Search`,
    siteUrl: `https://openfda-site.preprod.fda.gov`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass"]
};

export default config;
