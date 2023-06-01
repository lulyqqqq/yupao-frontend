<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="`${user.username} (${user.planetCode})`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 5px; margin-top: 5px;">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>

</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  //bug todo 设置true的时候
  loading: true,
  userList: [] as userType[],
});
</script>

<style lang='css' scoped>
</style>
