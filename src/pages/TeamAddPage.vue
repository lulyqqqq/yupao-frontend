<template>
  <div id="teamAddPage" @submit="onSubmit">
    <van-form>
      <van-cell-group inset>

        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            label="队伍描述"
            autosize
            type="textarea"
            placeholder="队伍描述"
        />
        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="请选择过期时间"
              :tabs="['请选择日期','选择时间']"
              next-step-text="下一步"
              @confirm="onConfirm"
              @cancel="showPicker = false">
            <van-date-picker
                v-model="currentDate"
                :min-date="minDate"
            />
            <van-time-picker v-model="currentTime"/>
          </van-picker-group>
        </van-popup>


        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, showToast} from "vant";

const router = useRouter()

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 3,
  "password": "",
  "status": 0,
}

let addTeamData = ref({...initFormData});


// 展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
const result = ref('');

const currentDate = ref(['2023', '05', '01']);
const currentTime = ref(['12', '00']);

const onConfirm = () =>{
  console.log(currentDate)
  console.log(currentTime)
  addTeamData.value.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')+":00"}`
  console.log(addTeamData)
  showPicker.value = false;
}

//提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }

  //todo 前端数据校验
  const res = await myAxios.post("/team/add",postData);
  if (res?.code === 0 && res.data){
    showSuccessToast("添加成功");
    await router.push({
      path: '/team',
      replace: true,
    });
  }else {
    showFailToast("添加失败")
  }
}

</script>
<style scoped lang="css">

</style>