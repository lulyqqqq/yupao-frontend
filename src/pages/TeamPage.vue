<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <van-button type="primary" class="add-button" icon="plus" @click="doCreateTeam"/>
    <team-card-list :team-list="teamList" :status="status" @ReloadTeamListPage="getListTeam"/>
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

const searchText = ref()
const active = ref('public')
const status = ref(0)

const onTabChange = (name) => {
  if (name === 'public') {
    listTeam(searchText.value, 0)
    status.value = 0
  } else {
    listTeam(searchText.value, 2)
    status.value = 2
  }
}
//跳转到创建队伍页面
const doCreateTeam = () => {
  router.push({
    path: '/team/add',
  })
}

const teamList = ref([]);
const MyJoinTeamList = ref([]);
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;

  } else {
    showFailToast("搜索队伍不存在!")
  }
}

const listMyJoinTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    MyJoinTeamList.value = res.data;
  } else {
    showFailToast("搜索队伍不存在!")
  }
}

//页面加载时触发,查询队伍
onMounted(() => {
  listTeam()
})
const onSearch = (val) => {
  listTeam(val, status.value)
  searchText.value = ''
}


const getListTeam = ({status, data}) => {
  if (data.data === true) {
    listTeam('', status)
    showSuccessToast('刷新成功')
  } else {
    showFailToast('刷新失败')
  }
}


</script>

<style lang='css' scoped>

</style>
