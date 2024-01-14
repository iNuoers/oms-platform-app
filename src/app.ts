/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 18:40:29
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-27 21:50:17
 * @FilePath: \oms-platform-app\src\app.ts
 * @Description:
 */
import 'uno.css';
import './app.scss';
import { createApp } from 'vue';
import { store } from './store';
import App from './App.vue';
import { setupTaro } from './plugins';

const app = createApp(App);

app.use(store);
app.use(setupTaro);

export default app;
