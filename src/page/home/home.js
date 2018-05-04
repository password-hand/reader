import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
import BookDetails from '../../components/BookDetails'

export default {
    name: "Home",
    components:{
        BookDetails
    },
    data() {
        return {
            tit1: "新书上架",
            tit2: "编辑推荐",
            tit3: "热门新书",
            newBooks: [],//新书上架
            recomend: [],//编辑推荐
            hotBooks: [],//热门新书
            bookList:[],
            detailss:[],
            add:'',
            change:false,
            changeBg:false
        };
    },
    methods: {
        // 轮播图函数
        runSwiper() {
            var swiper = new Swiper(".swiper-container", {
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            });
        },
        //书籍请求函数
        creatBooks() {
            axios.all([
                axios.get("../../../static/api/new-book.json"),
                axios.get("../../../static/api/recommend.json"),
                axios.get("../../../static/api/hot-newbook.json")
            ]).then(axios.spread((perms1, perms2, perms3) => {
                this.newBooks = perms1.data
                this.recomend = perms2.data
                this.hotBooks = perms3.data
            }));
        },
        //书籍情况说明
        bookDetails(book){
            this.change=true;
            this.bookList=book;
            this.bookList.changeBg=false;
            //传值
            // this.$router.push({
            //     name:'Car',
            //     params:{
            //         data:this.bookList
            //     }
            // })
        },
        //加入购物车
        goShopping(){
            this.$store.commit('addBookInfo', this.bookList);
        },
        //关闭按钮函数
        deleteShow(){
            this.change=false;
        },
        //控制按钮背景颜色
        // showMes(){
        //     this.changeBg=!this.changeBg;
        // },
        //书籍详情函数（调用公共组件）
        details(val){
            this.change=false
            this.$refs.details.$el.style.cssText= "left:0%"
            return this.detailss=val
        },
         //返回按钮事件函数
         gotoBack(val){
            val.style.cssText = "left:100%";
            return this.add=val
          }
    },
    mounted() {
        //调用轮播图插件
        this.runSwiper();
    },
    created() {
        //调用数据请求函数
        this.creatBooks()
    }
};