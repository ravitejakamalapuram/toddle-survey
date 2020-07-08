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
        true_count: { type: graphql.GraphQLInt },
        false_count: { type: graphql.GraphQLInt }
    }
});

const survey_input = new graphql.GraphQLInputObjectType({
    name: "survey_input",
    fields: {
        survey_id: { type: graphql.GraphQLID },
        question: { type: graphql.GraphQLString }
    }
});

const survey_taken = new graphql.GraphQLInputObjectType({
    name: "survey_taken",
    fields: {
        survey_id: { type: graphql.GraphQLID },
        question: { type: graphql.GraphQLString },
        option_chosen: { type: graphql.GraphQLBoolean }
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
                            resolve(`Survey Added Successfully`);
                        });
                    });

                });
            }
        },
        take_survey: {
            type: graphql.GraphQLString,
            args: {
                answers_list: {
                    type: graphql.GraphQLList(survey_taken)
                }
            },
            resolve: (root, args) => {
                console.log(args)
                return new Promise((resolve, reject) => {

                    db.serialize(function () {
                        db.run('BEGIN EXCLUSIVE TRANSACTION;');
                        args.answers_list.forEach(el => {
                            db.run(`UPDATE surveys SET ${el.option_chosen === true ? "true_count = true_count" : "false_count = false_count"} + 1 WHERE survey_id = '${el.survey_id}' AND question = '${el.question}';`);
                        });
                        db.run('COMMIT TRANSACTION;', function (err) {
                            if (err) {
                                reject(err);
                            }
                            resolve(`Survey Taken Successfully`);
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
