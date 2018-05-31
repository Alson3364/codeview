import Vue from "vue"
import Vuex from "vuex"

import menu  from './moudule/menu'
import users  from './moudule/users'
import status  from './moudule/status'

Vue.use(Vuex)

export const store = new Vuex.Store({
   modules:{
    menu,
    users,
    status
   }
    
})