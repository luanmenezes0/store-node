import pg from 'pg';

import { __connectionString__ } from './constants.js';

const pool = new pg.Pool({ connectionString: __connectionString__ });

export const client = await pool.connect();
