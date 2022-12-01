import * as path from 'path';
import { Level } from 'level';

const dbPath = path.join('./', 'mydb');
const db = new Level(dbPath, { valueEncoding: 'json' });
export default db;
