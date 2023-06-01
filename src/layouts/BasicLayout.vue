<template>
    <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
      <div id="content">
        <router-view />
      </div>
      <van-tabbar route v-model="active"  @change="onChange">
        <van-tabbar-item replace to="/" icon="home-o" name = "index">主页</van-tabbar-item>
        <van-tabbar-item replace to="/team" icon="search" name = "team">队伍</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="friends-o" name = "user">个人</van-tabbar-item>
      </van-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import {useRoute, useRouter} from 'vue-router';
import routes from "../config/route.ts";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

router.beforeEach((to,from)=>{
  const toPath = to.path;
  const route = routes.find((route) =>{
    return toPath === route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})
const onClickLeft = () => {
  router.back()
};

const onClickRight = () => {
  router.push('/search')
};

const active = ref("index");

</script>

<style lang='css' scoped>
  #content{
   padding-bottom: 50px;
  }
</style>
