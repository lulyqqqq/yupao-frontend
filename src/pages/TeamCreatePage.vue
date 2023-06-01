<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-button type="primary" class="add-button" icon="plus" @click="doCreateTeam"/>
    <team-card-list :team-list="teamList" @ReloadTeamListCreate="getListTeam"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, showToast} from "vant";

const router = useRouter()

const searchText = ref('')
//跳转到加入队伍页面
const doCreateTeam = () =>{
  router.push({
    path: '/team/add',

  })
}

const teamList = ref([]);
const listTeam = async (val = '') =>{
  const res = await myAxios.get("/team/list/my/create",{
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    showFailToast("搜索队伍不存在!")
  }
}

const getListTeam = (msg) => {
  const { data } = msg.data
  if(data == true){
    listTeam()
    showSuccessToast('刷新成功')
  } else {
    showFailToast('刷新失败')
  }
}

//页面加载时触发,查询队伍
onMounted( () =>{
     listTeam()
})
const onSearch = (val) =>{
     listTeam(val)
}

</script>

<style lang='css' scoped>

</style>
