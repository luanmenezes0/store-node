import Sequelize from 'sequelize';

import { __connectionString__ } from './constants.js';

export const sequelize = new Sequelize(__connectionString__);
