const pg = require('co-pg')(require('pg'));
const cloudinary = require('cloudinary');

const connectionString = process.env.DB;

const CARDS = 'CARDS';

const queryDB = function* (query) {
  const connectionResults = yield pg.connectPromise(connectionString);
  const client = connectionResults[0];
  const done = connectionResults[1];
  const result = yield client.queryPromise(query);
  done();
  return result;
};

const cardInsertQueryBuilder = (values) => {
  const tagsString = values.tags.replace(/["']/g, '').split(' ').reduce(
    (formattedTags, tag) => `${formattedTags}", "${tag}`);

  return `INSERT INTO cards VALUES ($$'${values.title}'$$,
                                    $$'${values.description}'$$,
                                    $$'${values.image_url}'$$,
                                    $$'${values.link}'$$,
                                    '{"${tagsString}"}')`;
};

const insertQueryBuilder = (table, values) => {
  switch (table) {
    case CARDS:
      return cardInsertQueryBuilder(values);
    default:
    // TODO: CHANGE DEFAULT RETURN STATEMENT
      return null;
  }
};

const cloudinaryUpload = (file, callback) => done => {
  cloudinary.uploader.upload(file, result => {
    callback(result);
    done();
  });
};




module.exports = {
  CARDS,
  queryDB,
  insertQueryBuilder,
  cloudinaryUpload
};