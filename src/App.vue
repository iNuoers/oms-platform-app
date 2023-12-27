<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // 从前台进入后台
  onHide() {
    console.log('onHide');
  },
  // 监听应用退出
  onExit() {
    console.log('onExit');
  }
});
</script>
