import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        bookgoods:[]
    },
    mutations:{
        //添加书籍
        addBookInfo(state,ele){
            state.bookgoods.push(ele)
            //console.log(state.bookgoods)
        }
       
    }
})