<template>
  <template v-if="user">
    <van-cell title="名称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="标签" :value="user.tags" @click="toEdit('tags','标签',user.tags)">
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 5px; margin-top: 5px;">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-cell title="头像">
      <img style="height: 47px;" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星期编号"  :value="user.planetCode" />
    <van-cell title="注册时间"  :value="user.createTime" />
  </template>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const user = ref()
const userNow = ref()
onMounted(async () => {
  userNow.value = await getCurrentUser();

  if (userNow){
      if (userNow.value.tags){
        userNow.value.tags = JSON.parse(userNow.value.tags);
      }
      user.value = userNow.value
  }
})

//["java","c++","python","男","yes"]
const router = useRouter();
const toEdit = (editKey: string,editName: string,currentValue: string) =>{
    router.push({
      path:'/user/edit',
      query: {
        editKey,
        editName,
        currentValue,
      }
    })
}

</script>

<style lang='css' scoped>

</style>
