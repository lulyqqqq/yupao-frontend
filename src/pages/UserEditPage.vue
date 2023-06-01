<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router"
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {ref} from "vue";
import {getCurrentUser} from "../services/user";

const router = useRouter();
const route = useRoute();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})
const onSubmit = async () => {

  //获取用户信息
  const currentUser = await getCurrentUser();

  if (!currentUser){
    showToast.fail('用户未登录')
    return;
  }
  let res = {}
  if (editUser.value.editKey === '标签'){
     res = await  myAxios.post('/user/update',{
      'id': currentUser.id,
      [editUser.value.editKey]: JSON.stringify(editUser.value.currentValue.toString().split(","))
    })
  }else {
     res = await  myAxios.post('/user/update',{
      'id': currentUser.id,
      [editUser.value.editKey]: editUser.value.currentValue
    })
  }
  console.log(res,'更新请求')
  if (res.code === 0 && res.data >0){
    showSuccessToast('修改成功');
    router.back();
  } else {
    showFailToast('修改错误');
  }

};
</script>

<style scoped>

</style>
