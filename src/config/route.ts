import Index from "../pages/Index.vue"
import Team from "../pages/TeamPage.vue"
import userUpdatePage from "../pages/UserUpdatePage.vue"
import UserEditPage from "../pages/UserEditPage.vue"
import Search from "../pages/SearchPage.vue"
import SearchResultPage from "../pages/SearchResultPage.vue"
import UserLoginPage from "../pages/UserLoginPage.vue"
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import userTeamJoinPage from "../pages/TeamJoinPage.vue";
import userTeamCreatePage from "../pages/TeamCreatePage.vue";

//  定义一些路由
const routes = [
  { path: '/', title:'主页', component: Index },
  { path: '/team', title:'找队伍', component: Team },
  { path: '/user', title:'我的信息', component: UserPage },
  { path: '/search', title:'搜索标签', component: Search },
  { path: '/user/list', title:'用户列表', component: SearchResultPage },
  { path: '/user/edit', title:'编辑信息', component: UserEditPage },
  { path: '/user/login', title:'登录', component: UserLoginPage },
  { path: '/team/add', title:'创建队伍', component: TeamAddPage },
  { path: '/team/update', title:'更新队伍信息', component: TeamUpdatePage },
  { path: '/user/update', title:'更新信息', component: userUpdatePage },
  { path: '/user/team/join', title:'已加入队伍', component: userTeamJoinPage },
  { path: '/user/team/create', title:'已创建队伍', component: userTeamCreatePage },
]

export default routes
