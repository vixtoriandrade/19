import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //connect to DB
  const jateDB = await openDB('jate', 1);
  // new transaction
  const tx = jateDB.transaction('jate', 'readwrite');
  // open to store with .add
  const store = tx.objectStore('jate');
  const request = store.add({jate:content});
  const result = await request;
  console.log('data saved', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //connect to DB
  const jateDB = await openDB('jate', 1);
  // new transaction
  const tx = jateDB.transaction('jate', 'readonly');
  // open to get
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
};

initdb();