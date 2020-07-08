const router = require("express").Router();
const graphql = require("graphql");
const e = require("express");
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const db = require("../utils/sqlite").sqlite;

const SurveyModel = new graphql.GraphQLObjectType({
    name: "survey",
    fields: {
        survey_id: { type: graphql.GraphQLID },
        question: { type: graphql.GraphQLString },
        true: { type: graphql.GraphQLInt },
        false: { type: graphql.GraphQLInt }
    }
});

const survey_input = new graphql.GraphQLInputObjectType({
    name: "survey_input",
    fields: {
        survey_id: { type: graphql.GraphQLID },
        question: { type: graphql.GraphQLString }
    }
});

let queryType = new graphql.GraphQLObjectType({
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
                    db.all("SELECT * FROM surveys WHERE survey_id = $survey_id;", { $survey_id: args.survey_id }, function (err, rows) {
                        if (err) { reject([]); }
                        resolve(rows);
                    });
                });
            }
        }
    }
});

let mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        create_survey: {
            type: graphql.GraphQLString,
            args: {
                questions_list: {
                    type: graphql.GraphQLList(survey_input)
                }
            },
            resolve: (root, args) => {
                return new Promise((resolve, reject) => {

                    db.serialize(function () {
                        db.run('BEGIN EXCLUSIVE TRANSACTION;');
                        args.questions_list.forEach(el => {
                            db.run(`INSERT INTO surveys VALUES('${el.survey_id}', '${el.question}', 0, 0);`);
                        });
                        db.run('COMMIT TRANSACTION;', function (err) {
                            if (err) {
                                reject(err);
                            }
                            resolve(`SURVEY updated SUCCESSFULLY`);
                        });
                    });

                });
            }
        }
    }
});

const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

router.use("/survey", graphqlHTTP({ schema: schema, graphiql: true }));

module.exports = router;
