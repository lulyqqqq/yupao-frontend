<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        thumb="https://lulyqqqq.github.io/Gallery/leimu/index/02.png"
        :title="`${team.name} `"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px" >
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div>
          {{'过期时间:' + team.expireTime}}
        </div>
        <div>
          {{'创建时间:' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button size="mini"  type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">加入队伍</van-button>

        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="primary"
                    @click="doUpdateTeam(team.id)">更新队伍</van-button>

<!--        仅加入可见-->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="mini" plain type="primary"
                    @click="doQuitTeam(team.id)">退出队伍</van-button>

        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";


const router = useRouter()
const props = withDefaults(defineProps<TeamCardListProps>(),{
  teamList: [] as TeamType[],
  status: 0
},{
  deep:true
});



const showPasswordDialog = ref(false)
const password = ref('')
const joinTeamId = ref()
const currentUser = ref()


const emit = defineEmits(['ReloadTeamListJoin','ReloadTeamListPage','ReloadTeamListCreate'])

const preJoinTeam = (team :TeamType) => {
    joinTeamId.value = team.id;
    if(team.status === 0){
      doJoinTeam()
    }else {
      showPasswordDialog.value = true;
    }
}
const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = ''
}
onMounted(async () => {
  currentUser.value = await getCurrentUser()
})

interface TeamCardListProps{
  teamList: TeamType[];
  status: number
}



//队伍列表加入队伍
const doJoinTeam = async() =>{
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post("/team/join",{
    teamId : joinTeamId.value,
    password: password.value
  });

  if (res?.code === 0){
    emit('ReloadTeamListJoin',{ data:res })
    emit('ReloadTeamListPage',{status: props.status, data:res})
    emit('ReloadTeamListCreate',{ data:res })
    showSuccessToast("加入成功")
    doJoinCancel()
  }else {
   showFailToast("加入失败" + (res.description ? `， ${res.description} `:''));
  }
}

const doUpdateTeam = async (id:number) => {
  await router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
const doQuitTeam = async (id:number) => {
  const res = await myAxios.post("/team/quit",{
    teamId : id
  });
  if (res?.code === 0){
    emit('ReloadTeamListJoin',{ data:res })
    emit('ReloadTeamListPage',{ status: props.status,data:res })
    showSuccessToast("退出成功")
  }else {
    showFailToast("退出失败" + (res.description ? `， ${res.description} `:''));
  }
}

const doDeleteTeam = async (id:number) => {
  const res = await myAxios.post("/team/delete", {
    id
  });
  if (res?.code === 0) {
    emit('ReloadTeamListJoin',{ data:res })
    emit('ReloadTeamListPage',{ data:res })
    emit('ReloadTeamListCreate',{ data:res })
    showSuccessToast("删除成功")
  } else {
    showFailToast("删除失败" + (res.description ? `， ${res.description} ` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img){
  height: 128px;
  object-fit: unset;
}
</style>