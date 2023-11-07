import {SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const tableName = 'favorites';
enablePromise(true);

// Initialize DB
export const getDBConnection = async () => {
  return openDatabase(
    {
      name: 'sqlite', 
      location: 'default',
      createFromLocation: '~sqlite.db'
    },
    () => {},
    error => {
      console.warn(error)
    }
  )
};

// Get all favorited radios
export const getDbItems = async (db: SQLiteDatabase) => {
  try {
    let todoItems: any[] = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(res => {
      for (let index = 0; index < res.rows.length; index++) {
        todoItems.push(res.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get db !!!');
  }
};

// Check if current radio is favorited
export const favCheck = async (db: SQLiteDatabase, id: number) => {
  let result: any[] = []
  const results = await db.executeSql(`SELECT * FROM ${tableName} WHERE id = ${id}`);
    try {
      results.forEach(res => {
        result = res.rows.item(0).id
      });
      return result
    }
    catch {
      return result
    }
};

// Set current radio to favorite
export const setFavoriteToDb = async (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
  const insertQuery =
    `INSERT INTO ${tableName} (id, radioName) VALUES (${todoItems.id}, '${todoItems.title}')`
  return db.executeSql(insertQuery);
};

// Remove current radio from favorite
export const unfavoriteDb = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = 
  `DELETE FROM ${tableName} WHERE id = ${id}`;
  return db.executeSql(deleteQuery)
};




