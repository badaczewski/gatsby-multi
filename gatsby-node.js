const path = require(`path`);

exports.createPages = async ({ actions, graphql }) => {
  const [references] =
    await Promise.all([
      graphql(`
        query {
          allNodeReferencePage {
            edges {
              node {
                id
                langcode
                drupal_internal__nid
                path {
                  alias
                }
                imageids
                relationships {
                  field_topics {
                    drupal_internal__tid
                  }
                }
              }
            }
          }
        }
      `),
    ]);
  };

  references.data.allNodeReferencePage.edges.map((edge) => {
    if (edge.node.path.alias) {
      actions.createPage({
        path: edge.node.path.alias,
        component: path.resolve(`./src/templates/reference.tsx`),
        context: {
          id: edge.node.id,
          nid: edge.node.drupal_internal__nid,
          locale: edge.node.langcode,
        },
      });
    }
  });
};
