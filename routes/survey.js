const router = require("express").Router();
const graphql = require("graphql");
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const database = require("../utils/sqlite").sqlite;

const SurveyModel = new graphql.GraphQLObjectType({
    name: "survey",
    fields: {
        survey_id: { type: graphql.GraphQLID },
        q_id: { type: graphql.GraphQLString },
        question: { type: graphql.GraphQLString },
        true: { type: graphql.GraphQLInt },
        false: { type: graphql.GraphQLInt }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        survey_result: {
            type: graphql.GraphQLList(SurveyModel),
            args: {
                survey_id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    database.all("SELECT * FROM surveys WHERE survey_id = $survey_id;", { $survey_id: args.survey_id }, function (err, rows) {
                        if (err) { reject([]); }
                        resolve(rows);
                    });
                });
            }
        }
    }
});

const schema = new graphql.GraphQLSchema({
    query: queryType,
    // mutation: mutationType
});

router.use("/survey", graphqlHTTP({ schema: schema, graphiql: true }));

module.exports = router;
