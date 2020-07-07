const router = require("express").Router();
const graphql = require("graphql");
const ExpressGraphQL = require("express-graphql");

// const SurveyType = new graphql.GraphQLObjectType({
//     name: "survey",
//     fields: {
//         id: { type: graphql.GraphQLID },
//         firstName: { type: graphql.GraphQLString },
//         lastName: { type: graphql.GraphQLString },
//         email: { type: graphql.GraphQLString }
//     }
// });

// var queryType = new graphql.GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         contacts: {
//             type: graphql.GraphQLList(SurveyType),
//             resolve: (root, args, context, info) => {
//                 return new Promise((resolve, reject) => {

//                     database.all("SELECT * FROM contacts;", function (err, rows) {
//                         if (err) {
//                             reject([]);
//                         }
//                         resolve(rows);
//                     });
//                 });

//             }
//         },
//         contact: {
//             type: SurveyType,
//             args: {
//                 id: {
//                     type: new graphql.GraphQLNonNull(graphql.GraphQLID)
//                 }
//             },
//             resolve: (root, { id }, context, info) => {
//                 return new Promise((resolve, reject) => {

//                     database.all("SELECT * FROM contacts WHERE id = (?);", [id], function (err, rows) {
//                         if (err) {
//                             reject(null);
//                         }
//                         resolve(rows[0]);
//                     });
//                 });
//             }
//         }
//     }
// });
// const schema = new graphql.GraphQLSchema({
//     query: queryType
// });
// router.use("/survey", ExpressGraphQL({ schema: schema, graphiql: true }));

module.exports = router;
