export default {
    name: 'Cart',
    props: ['shopCarBook', 'addGoods'],
    data() {
        return {
            changeChoose: false,
            changeChBook: [],
            addressTxt: '',
            bookcount: '',
            counts: [],
            personInfo: [],
            addbooks:[],
            message:''          
        }
    },
    computed: {
        totlePrice() {
            return this.bookcount + 10
        }
    },
    methods: {
        shopCarBooks(){
           // console.log(this.$store.state.bookgoods)
            this.addbooks.push(...this.$store.state.bookgoods)
            //console.log(this.addbooks)
        },
        //接受传递的值
        getParam(){
            //this.message=this.$router.params.data
            console.log(this.$router.params.data)
        },
        //图书选中状态切换
        cancel() {
            this.changeChoose = false
        },
        //图书切换选中状态
        changeGood(ind){
            this.addbooks[ind].changeBg=!this.addbooks[ind].changeBg
        },
        //点击编辑按钮
        compile() {
            this.changeChoose = true
        },
        //删除图书
        deleteBooks() {
            var arr = [];
            for (var i = 0; i < this.shopCarBook.length; i++) {
                //如果是被选中状态
                if (this.shopCarBook[i].changeBg) {
                    //就把被选中的存进一个数组
                    arr.push(this.shopCarBook[i].changeBg)
                    //删除选中数据
                    this.shopCarBook.splice(i, 1)
                    //如果购物车没有数据，则显示‘去逛逛页面’
                    console.log(this.$props.shopCarBook.length)
                    if (this.$props.shopCarBook.length == 0) {
                        //怎么修改父级传递过来的值？
                       this.$props.addGoods = true
                    }
                }
            }
        },
        goBack(ele) {
            if (ele === 'addressInfo') {
                this.$refs.addressInfo.style.cssText = 'left:100%'
            } else {
                this.$refs.payMoney.style.cssText = 'left:100%'
            }
        },
        //前往支付
        goPay() {
            var bookCount = this.$refs.bookCount
            var arr = [];
            
            for (var i = 0; i < bookCount.length; i++) {
                var add = (this.shopCarBook[i].price * bookCount[i].textContent * 1)
                arr.push(add.toFixed(2) * 1)
            }
            this.bookcount = arr.reduce(function (a1, a2) {
                return a1 + a2
            })
            this.$refs.payMoney.style.cssText = 'left:0%'
        },
        changeAddress(ele) {
            this.$refs.addressInfo.style.cssText = 'left:0%'
            if (ele === 'add') {
                this.addressTxt = '确认增加'
            } else {
                this.addressTxt = '确认修改'
            }
        },
        //确认修改或增加地址
        conModify() {
            var inputVal = document.getElementsByName('inputVal')
            for (var i = 0; i < inputVal.length; i++) {
                this.personInfo.push(inputVal[i].value)
                inputVal[i].value = ''
                inputVal[3].value = '四川省'
                inputVal[4].value = '成都市'
                inputVal[5].value = '武侯区'
            }
            this.$refs.addressInfo.style.cssText = 'left:100%'
        },
        //商品数量减少函数
        reduce(index) {
            var bookCount = this.$refs.bookCount
            bookCount[index].textContent--
                if (bookCount[index].textContent == 0) {
                    bookCount[index].previousElementSibling.disabled = 'disabled'
                    bookCount[index].previousElementSibling.style.cssText =
                        'cursor: no-drop;background-color: gray;'
                    bookCount[index].textContent = 1
                } else {
                    bookCount[index].previousElementSibling.style.cssText =
                        'background-color: white;'
                }
        },
        //商品数量增加函数
        add(index) {
            var bookCount = this.$refs.bookCount
            bookCount[index].previousElementSibling.style.cssText =
                'background-color: white;';
            bookCount[index].previousElementSibling.disabled = false
            bookCount[index].textContent++
        },
        //页面跳转
        gogoshopping() {
            this.$router.push({
                name: 'Homes'
            })
        }
    },
    created(){
        this.shopCarBooks()
    }
}
