import Antd from 'ant-design-vue'
import CustomDemoBlock from './CustomDemoBlock.vue'
import 'ant-design-vue/dist/antd.css'
export default ({
  Vue
}) => {
  Vue.component('CustomDemoBlock', CustomDemoBlock)
  Vue.use(Antd)
}