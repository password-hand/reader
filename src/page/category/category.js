import BookDetails from '../../components/BookDetails'
export default {
    name: "Category",
    components: {
        BookDetails
    },
    data() {
        return {
            newBooksP1: [],
            newBooksP2: [],
            searchBooks: null,//图书搜索结果
            bookDetails:[],
            addTxt:false,//动态class判断属性
            i: 1,
            add:'',
            txt:'',//加载还是没有图书变量
            addStage:true,//图标显示或隐藏
            changeStatus: true//加载与已经加载完成变量
        };
    },
    computed: {
        newBook() {
            //初始加载时候
            if (!this.searchBooks) {
                this.txt='加载更多'
                //图标显示
                this.addStage=true;
                //动态class取消
                this.addTxt = false;
                return this.newBooksP1;
            } else if (this.searchBooks.length>0) {
                //图书加载显示
                this.changeStatus = true;
                this.txt='加载更多'
                this.addTxt = false;
                this.addStage=true;
                return this.searchBooks;
            } else {
                this.addStage = false;
                this.addTxt = true;
                this.txt='-- 对不起，该书库暂未搜录该类图书 --'
                return [];
            }
        }
    },
    methods: {
        //请求数据函数
        createdBook() {
            axios.all([
                    axios.get('../../../static/api/book-classify.json'),
                ])
                .then(axios.spread((res) => {
                    this.newBooksP2 = res.data
                    this.newBooksP1 = res.data[0]
                })).catch(function () {
                    console.error("数据请求错误")
                })
        },
        //判断加载数据的多少
        loadBooks() {
            if (this.i === this.newBooksP2.length) {
                this.changeStatus = false
            } else {
                this.newBooksP1.push(...this.newBooksP2[this.i])
                this.i++;
            }
        },
        //输入框事件
        searchBook(val) {
            if (val == '') {
                this.searchBooks = this.newBooksP1
                this.changeStatus = true
            } else {
                this.searchBooks = this.newBooksP1.filter((item) => {
                    const fil = new RegExp(val, 'gi')
                    return fil.test(item.name);
                })
            }
        },
        //调用公共组件函数
        BookDetails(vals) {
          this.$refs.details.$el.style.cssText= "left:0%"
          return this.bookDetails=vals
        },
        //返回按钮事件函数
        gotoBack(val){
          val.style.cssText = "left:100%";
          return this.add=val
        }
    },
    created() {
        //调用数据加载函数
        this.createdBook();
    }
};

