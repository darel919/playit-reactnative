import SQLite, {SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

const tableName = 'favorites';
enablePromise(true);

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

export const setFavoriteToDb = async (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
  const insertQuery =
    `INSERT INTO ${tableName} (id, radioName) VALUES (${todoItems.id}, '${todoItems.title}')` ;

  // const insertQuery =
  //   `INSERT OR REPLACE INTO ${tableName}(id, radioId, radioName, listenCount) values` +
  //   todoItems.map(i => `(${i.id}, ${i.id},'${i.radioName}'}, )`).join(',');
  // console.log(insertQuery)
  return db.executeSql(insertQuery);
};

export const favCheck = async (db: SQLiteDatabase, id: number) => {
  let result = []
  const results = await db.executeSql(`SELECT * FROM ${tableName} WHERE id = ${id}`);
    results.forEach(res => {
      result = res.rows.item(0).id
    });
    // console.log(result)
    return result;
}

export const unfavoriteDb = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = 
  `DELETE FROM ${tableName} WHERE id = ${id}`;
  return db.executeSql(deleteQuery)
}




