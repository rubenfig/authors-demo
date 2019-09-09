const Util = require('./Util');
const Author = require('./Author');
const uuid = require('uuid');
const publicationsTable = Util.getTableName('publications');

/**
 * @module Publication
 */
module.exports = {

  /** Create author */
  async create(event) {
    const newPublication = JSON.parse(event.body);
    if (!newPublication.title) {
      return Util.formatResponse('Title must be specified.', 422);
    }
    if (!newPublication.date) {
      return Util.formatResponse('Date must be specified.', 422);
    }
    if (!newPublication.author) {
      return Util.formatResponse('Author must be specified.', 422);
    }
    if (!newPublication.body) {
      return Util.formatResponse('Body must be specified.', 422);
    }

    // Add new entry to publicationsTable
    try {
      const publication = {
        id: uuid.v1(),
        title: newPublication.title,
        date: newPublication.date,
        author: newPublication.author,
        body: newPublication.body,
        dummy: 1
      };
      await Util.DocumentClient.put({
        TableName: publicationsTable,
        Item: publication
      }).promise();

      return Util.formatResponse({
        publication
      });
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not create Publication', 500);
    }

  },


  /** Get publication */
  async get(event) {
    const id = event.pathParameters.id;
    const publication = (await Util.DocumentClient.get({
      TableName: publicationsTable,
      Key: { id },
    }).promise()).Item;
    if (!publication) {
      return Util.formatResponse(`Publication not found: [${id}]`, 404);
    }

    return Util.formatResponse({
      publication
    });
  },

  /** Delete publication */
  async delete(event) {
    const id = event.pathParameters.id;

    try {
      // delete the publication from the database
      const deleteResult = (await Util.DocumentClient.delete({
        TableName: publicationsTable,
        Key: {
          id
        },
        ReturnValues: 'ALL_OLD'
      }).promise()).Attributes;
      if (deleteResult)
        return Util.formatResponse({});
      else
        return Util.formatResponse('Publication not found', 404);
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not delete Publication', 500);
    }
  },

  /** Update publication */
  async update(event) {
    const data = JSON.parse(event.body);
    console.log(data);
    if (!data.title) {
      return Util.formatResponse('Title must be specified.', 422);
    }
    if (!data.date) {
      return Util.formatResponse('Date must be specified.', 422);
    }
    if (!data.author) {
      return Util.formatResponse('Author must be specified.', 422);
    }
    if (!data.body) {
      return Util.formatResponse('Body must be specified.', 422);
    }
    try {
      const updatedPublication = (await Util.DocumentClient.update({
        TableName: publicationsTable,
        Key: {
          id: event.pathParameters.id,
        },
        ExpressionAttributeNames: {
          '#date': 'date'
        },
        UpdateExpression: 'SET title = :title, #date = :date, ' +
          'body = :body, author = :author',
        ExpressionAttributeValues:{
          ":title": data.title,
          ":date": data.date,
          ":body": data.body,
          ":author": data.author
        },
        ReturnValues:"UPDATED_NEW"
      }).promise()).Attributes;
      return Util.formatResponse({
        publication: updatedPublication
      });
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not update Publication', 500);
    }
  },

  /** List publications */
  async list(event) {
    const params = event.queryStringParameters || {};
    console.log(params);
    const queryParams = {
      TableName: publicationsTable,
      ScanIndexForward: params.order !== 'DESC',
      Limit: parseInt(params.limit) || 10
    };
    //We use the author index when selecting an author
    if (params.author) {
      queryParams.IndexName = 'author';
      queryParams.KeyConditionExpression = 'author = :author';
      queryParams.ExpressionAttributeValues = {
        ':author': params.author,
      };
    //We add a dummy variable for ordering across all data
    } else {
      queryParams.IndexName = 'all';
      queryParams.KeyConditionExpression = 'dummy = :dummy';
      queryParams.ExpressionAttributeValues = {
        ':dummy': 1,
      };
    }
    if (params.title) {
      queryParams.FilterExpression = 'contains(title, :title)';
      queryParams.ExpressionAttributeValues[':title'] = params.title;
    }
    if (params.lastEvaluated) {
      queryParams.ExclusiveStartKey = JSON.parse(params.lastEvaluated);
    }
    try {
      console.log(queryParams);
      const queryResult = await Util.DocumentClient.query(queryParams)
        .promise();
        // create a response of the results
      const publications = params.author ? queryResult.Items :
        await Promise.all(
        queryResult.Items.map(transformRetrievedPublication)
      );
      return Util.formatResponse({
        publications,
        next: queryResult.LastEvaluatedKey
      });
    } catch (error) {
      console.log(error);
      return Util.formatResponse('Could not list Publications', 500);
    }
  }

};

/**
 * Given an publication retrieved from table,
 * decorate it with extra information like author, favorite, following etc.
 */
async function transformRetrievedPublication(publication) {
  publication.author = (await Author.getAuthorById(publication.author)).Item
    || {};
  return publication;
}
