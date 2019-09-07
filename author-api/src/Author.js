const Util = require('./Util');
const authorsTable = Util.getTableName('authors');
const uuid = require('uuid');


/**
 * @module Author
 */
module.exports = {

  /** Create author */
  async create(event) {
    const newAuthor = JSON.parse(event.body);
    if (!newAuthor.fullname) {
      return Util.formatResponse('fullname must be specified.', 422);
    }
    if (!newAuthor.email) {
      return Util.formatResponse('Email must be specified.', 422);
    }
    if (!newAuthor.birthdate) {
      return Util.formatResponse('Birthdate must be specified.', 422);
    }

    // Add new entry to authorsTable
    try {
      const author = (await Util.DocumentClient.put({
        TableName: authorsTable,
        Item: {
          id: uuid.v1(),
          fullname: newAuthor.fullname,
          email: newAuthor.email,
          birthdate: newAuthor.birthdate
        },
      }).promise()).Item;

      return Util.formatResponse({
        author
      });
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not create Author', 500);
    }

  },


  /** Get author */
  async get(event) {
    const id = event.pathParameters.id;
    const author = (await getAuthorById(id)).Item;
    if (!author) {
      return Util.formatResponse(`Author not found: [${id}]`, 404);
    }

    return Util.formatResponse({
      author
    });
  },

  /** Delete author */
  async delete(event) {
    const id = event.pathParameters.id;

    try {
      // delete the author from the database
      await Util.DocumentClient.delete({
        TableName: authorsTable,
        Key: {
          id
        },
      }).promise();
      return Util.formatResponse({});
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not delete Author', 500);
    }
  },

  /** Update author */
  async update(event) {
    const data = JSON.parse(event.body);
    console.log(data);
    if (!data.fullname) {
      return Util.formatResponse('fullname must be specified.', 422);
    }
    if (!data.email) {
      return Util.formatResponse('Email must be specified.', 422);
    }
    if (!data.birthdate) {
      return Util.formatResponse('Birthdate must be specified.', 422);
    }

    try {
      const updatedAuthor = (await Util.DocumentClient.update({
        TableName: authorsTable,
        Key: {
          id: event.pathParameters.id,
        },
        UpdateExpression: 'SET fullname = :fullname, birthdate = :birthdate, ' +
          'email = :email',
        ExpressionAttributeValues:{
          ":fullname": data.fullname,
          ":birthdate": data.birthdate,
          ":email": data.email
        },
        ReturnValues:"UPDATED_NEW"
      }).promise()).Attributes;
      return Util.formatResponse({
        author: updatedAuthor
      });
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not update Author', 500);
    }
  },

  /**
   * Fetch all authors from the database
   * it assumes that the list has less that the 1MB limit of dynamodb
   */
  async list(event) {
    const data = event.queryStringParameters;
    const params = {
      TableName: authorsTable
    };

    if (data && data.start){
      params.ExclusiveStartKey = {
        id: data.start
      };
    }
    console.log(params);
    try {
      // create a response of the results
      const result = await Util.DocumentClient.scan(params).promise();
      return Util.formatResponse({
        authors: result.Items
      });
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not list Authors', 500);
    }
  },
  getAuthorById

};

function getAuthorById(id) {
  return Util.DocumentClient.get({
    TableName: authorsTable,
    Key: { id },
  }).promise();
}
