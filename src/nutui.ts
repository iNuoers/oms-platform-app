/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-02 09:39:38
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-02 09:40:14
 * @FilePath: \oms-platform-app\src\nutui.ts
 * @Description:
 */
import '@nutui/nutui-taro/dist/style.css'
import { Button, Sku, Popup, InputNumber, Price } from '@nutui/nutui-taro'
import type { App } from 'vue'
const setNutUi = (app: App) => {
    app.use(Button).use(Sku).use(Popup).use(InputNumber).use(Price)
}
export default setNutUi
