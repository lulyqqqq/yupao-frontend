<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<script setup >
import { useRoute  } from 'vue-router';
import {onMounted, ref} from 'vue';
import { showSuccessToast, showFailToast } from 'vant';
import myAxios from '../plugins/myAxios';
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);
const route = useRoute();
const loading = ref(true);
onMounted(async () => {
  loading.value = true
  const userListData = await myAxios.get('/user/search/tags',{
    withCredentials: false,
    params: {
      tagNameList: tags
    },
    // paramsSerializer: params =>{
    //   return qs.stringify(params,{indices: false})
    // },
    //序列化
    paramsSerializer: {
      serialize: params => qs.stringify(params, { indices: false}),
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed',response);
    showSuccessToast('请求成功');
    console.log(response?.data)
    return response?.data;
  })
  .catch(function (error){
    console.error('/user/search/tags failed',error);
    showFailToast('请求失败');
  })
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    loading.value = false
  }
})
const {tags} = route.query;

const mockUser = {
    id : 1,
    username : '马念',
    userAccount : 'manianac',
    avatarUrl : 'https://lulyqqqq.github.io/Gallery/leimu/index/02.png',
    profile: '一个编程帅哥,一直在持续变强,come on!一个编程帅哥,一直在持续变强,come on!',
    gender : 0,
    phone : '13129160209',
    email : '123654@@qq.com',
    userRole: 0,
    planetCode : '123',
    tags: ['java','emo','go','rust','打工','帅哥'],
    createTime : new Date(),
}
</script>

<style lang='css' scoped>
</style>
