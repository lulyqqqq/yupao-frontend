<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :team-list="teamList" @ReloadTeamListJoin="getListTeam"/>
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

const teamList = ref([]);
const listTeam = async (val = '') =>{
  const res = await myAxios.get("/team/list/my/join",{
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

//页面加载时触发,查询队伍
onMounted( () =>{
     listTeam()
})
const onSearch = (val) =>{
     listTeam(val)
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

</script>

<style lang='css' scoped>

</style>
