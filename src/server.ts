import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import PZConfigRoute from '@routes/pzconfig.route';

import fs from 'fs';

export const configPath = process.env.PZPATH || './servertest.test.ini' || './servertest.ini';
export const config = fs.readFileSync(configPath, 'utf-8');

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new PZConfigRoute()]);

app.listen();
