<template>
  <template v-if="user">
    <van-cell title="名称" :value="user.username"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像">
      <img style="height: 47px;" :src="user.avatarUrl"/>
    </van-cell>

    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

const router = useRouter()
const user = ref()
onMounted(async () => {
  user.value = await getCurrentUser();

})


</script>

<style lang='css' scoped>

</style>
