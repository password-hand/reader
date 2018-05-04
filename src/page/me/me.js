import Popup from '../../components/Popup'
export default {
    name: 'Me',
    components: {
        Popup
    },
    data() {
        return {
            change: true,
            changeBgCol: true,
            //登录注册与个人中心显影状态
            showMes: false,
            showSome:'',
            nickname: localStorage.getItem('niceNameKey'),
            nicenameStatus: '',
            telNumberStatus: '',
            passwordStatus: '',
            repwdStatus: '',
            uniformity: '',
            title: '',
            arr: [],
            sex: [{
                    name: '男',
                    show: true
                },
                {
                    name: '女',
                    show: false
                },
                {
                    name: '保密',
                    show: false
                }
            ]
        }
    },
    created(){
        let getNiceName = localStorage.getItem('telNumberKey');
        if(getNiceName==''){
            this.showSome=true
            this.showMes=true
        }else{
            this.showSome=false
            //this.showMes=false
        }
    },
    methods: {
        //登录注册背景颜色改变函数
        changeBg() {
            var erroMesg = document.getElementsByClassName('error-mes')
            var inputVal = document.getElementsByName('input-val')
            this.changeBgCol = !this.changeBgCol
            for (var i = 0; i < erroMesg.length; i++) {
                erroMesg[i].textContent = ''
                inputVal[i].value = ''
            }
        },
        /**
         * 输入框获取焦点函数
         * 
         */
        inputFocus(ref) {
            if (ref == 'landTel') {
                this.$refs.landTel.nextElementSibling.textContent = ''
            }
            if (ref == 'landPassw') {
                this.$refs.landPassw.nextElementSibling.textContent = ''
            }
            if (ref == 'telNumber') {
                this.$refs.telNumber.nextElementSibling.textContent = ''
            }
            if (ref == 'niceName') {
                this.$refs.niceName.nextElementSibling.textContent = ''
            }
            if (ref == 'password') {
                this.$refs.password.nextElementSibling.textContent = ''
            }
            if (ref == 'repaetPaw') {
                this.$refs.repaetPaw.nextElementSibling.textContent = ''
            }
        },
        /**
         * 输入框失去焦点函数
         * 
         */
        //昵称失去焦点验证
        nameBlur() {
            let niceName = this.$refs.niceName
            var RegExp = /[\u4e00-\u9fa5\w-]/;
            this.nicenameStatus = this.blurHandle(niceName, RegExp, '请填写用户名！');
        },
        //手机号失去焦点验证
        telBlur(ele) {
            let telNumber = this.$refs.telNumber
            let landTel = this.$refs.landTel
            let RegExp = /^1(3|4|5|7|8)\d{1}\-?\d{4}\-?\d{4}$/;
            if (ele === 'land') {
                this.blurHandle(landTel, RegExp, '请填写手机号！');
            } else {
                this.telNumberStatus = this.blurHandle(telNumber, RegExp, '请填写手机号！');
            }
        },
        //密码失去焦点验证
        pawBlur(ele) {
            let password = this.$refs.password
            let landPaw = this.$refs.landPassw
            let RegExp = /[\w]{6,16}/;
            if (ele === 'land') {
                this.blurHandle(landPaw, RegExp, '请填写密码！');
            } else {
                this.passwordStatus = this.blurHandle(password, RegExp, '请填写密码！');
            }
        },
        //确认密码失去焦点验证
        repaetPawBlur() {
            let repaetPaw = this.$refs.repaetPaw
            let RegExp = /[\w]{6,16}/;
            this.repwdStatus = this.blurHandle(repaetPaw, RegExp, '请确认一次密码！');
            // 两次密码一致性
            this.checkUniformity(repaetPaw);
        },
        /*************失去焦点函数**************/
        blurHandle(ident, Reg, mesg) {
            // 获取当前表单元素的值
            var thisVal = ident.value;
            // 存储错误信息的节点
            var erroMesg = ident.nextElementSibling;
            // 如果当前值为空
            if (thisVal === '') {
                // 设置提示信息和元素边框颜色
                erroMesg.textContent = mesg;
                // 返回验证结果
                return false;
            }
            // 验证值不正确
            if (!Reg.test(thisVal)) {
                // 设置提示信息和元素边框颜色
                erroMesg.textContent = '请输入正确的格式！';
                // 返回验证结果
                return false;
            }
            // 否则
            else {
                erroMesg.textContent = '';
                return true;
            }
        },
        /*************两次密码一致性 *************/
        checkUniformity(ident) {
            // 获取两次密码值
            var pwdVal = this.$refs.password.value,
                repwdVal = ident.value;
            console.log(repwdVal)
            console.log(pwdVal)
            // 存储错误信息的节点
            var thisErrorMeg = ident.nextElementSibling
            // 如果密码和确认密码都非空
            if (pwdVal && repwdVal) {
                // 不一致
                if (pwdVal !== repwdVal) {
                    thisErrorMeg.textContent = '两次输入密码不一致！';
                    this.uniformity = false;
                } else {
                    thisErrorMeg.textContent = '';
                    this.uniformity = true;
                }
            }
        },
        //确认注册函数
        confirmRegister() {
            let telNumber_val = this.$refs.telNumber.value
            let niceName_val = this.$refs.niceName.value
            let password_val = this.$refs.password.value
            let repaetPaw_val = this.$refs.repaetPaw.value
            if (this.nicenameStatus && this.telNumberStatus && this.passwordStatus && this.repwdStatus && this.uniformity) {
                //页面跳转
                this.changeBgCol = true
                // 获取数据并提交
                localStorage.setItem('telNumberKey', telNumber_val);
                localStorage.setItem('niceNameKey', niceName_val);
                localStorage.setItem('passwordKey', password_val);
            } else if (telNumber_val == '' || niceName_val == '' ||
                password_val == '' || repaetPaw_val == '') {
                this.open('请输入完整的信息！')
            } else {
                this.open('请输入正确的信息！')
                //this.change=false
                // this.title='请输入正确的信息!'
            }
        },
        //确认登录函数
        confirmLand() {
            let landTel_val = this.$refs.landTel.value
            let landPassw_val = this.$refs.landPassw.value
            let getLandPassw = localStorage.getItem('passwordKey');
            let getLandTel = localStorage.getItem('telNumberKey');
            let getNiceName = localStorage.getItem('niceNameKey');
            if (landTel_val == getLandTel && landPassw_val == getLandPassw) {
                this.nickname = getNiceName
               //判断本地储存里面有没有注册的电话
                if(getNiceName==''){
                    this.showSome=true
                    this.showMes=true
                }else{
                    this.showSome=false
                    this.showMes=false
                }
            } else if (landTel_val == '' || landPassw_val == '') {
                //this.change=false
                // this.title='请输入完整的信息！'
                //调用弹出框函数
                this.open('请输入完整的信息！');
            } else {
                landPassw_val = ''
                this.open('账号或密码不正确');
                // this.change=false
                // this.title='账号或密码不正确!'
            }
        },
        //个人资料及收货地址管理
        modifyMes(add) {
            if (add == 'personInfo') {
                this.$refs.personInfo.style.cssText = 'left:0'
            } else {
                this.$refs.addressInfo.style.cssText = 'left:0'
            }
        },
        //返回函数
        goBack() {
            this.$refs.personInfo.style.cssText = 'left:100%'
            this.$refs.addressInfo.style.cssText = 'left:100%'
        },
        //性别选择函数
        checkSex(ind) {
            for (var i = 0; i < this.sex.length; i++) {
                this.sex[i].show = false;
            }
            this.sex[ind].show = true
        },
        //个人资料确认修改函数
        conModify(id) {
            if (id === 'personInfo') {
                let val = this.$refs.inputVal.value
                if (val == '') {
                    this.open('请输入完整内容!');
                } else {
                    this.nickname = this.$refs.inputVal.value
                    this.change = false
                    this.title = '个人资料修改成功!'
                }
            } else {
                let val = this.$refs.nameVal.value
                let inputVals = document.getElementsByClassName('address-info')[0].
                getElementsByTagName('input');
                let add = document.getElementsByClassName('select-box')[0].
                getElementsByTagName('select')
                if (val == '') {
                    this.open('请输入完整内容!');
                } else {
                    this.open('地址添加（或修改）成功!');
                    for (var i = 0; i < inputVals.length; i++) {
                        this.arr.push(inputVals[i].value)
                    }
                    for (var i = 0; i < add.length; i++) {
                        this.arr.push(add[i].value)
                    }
                }
            }
        },
        sureCheck() {
            this.$refs.nameVal.value = ""
            this.$refs.inputVal.value = ""
            this.change = true
            this.$refs.addressInfo.style.cssText = 'left:100%'
            this.$refs.personInfo.style.cssText = 'left:100%'
        },
        //弹出框公共函数
        open(val) {
            this.$confirm(val, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '重新输入!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        }
    }
}
