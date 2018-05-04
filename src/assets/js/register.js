/**
 * 数据验证
 */
export function landAndRes(){

       

// 表单输入内容，验证状态
var nicename = document.getElementsByName('niceName')[0],nicenameStatus = false,
    pwd = document.getElementsByName('password')[0],pwdStatus = false,
    repwd = document.getElementsByName('repaetPaw')[0],repwdStatus = false,
    tel = document.getElementsByName('telNumber')[0],telStatus = false,
    // 两次密码的一致性
    uniformity = false;

/**
 * 各项数据失去焦点验证
 */
 
// 昵称(失去焦点)
qwe:{
nicename.onblur = function(){
    // 调用“输入框失去焦点验证”函数；
    var RegExp =/[\u4e00-\u9fa5\w-]/;
    nicenameStatus = blurHandle(this,RegExp,'请填写用户名！');
}
}


// 确认密码(失去焦点)
pwd.onblur = function(){
    // 调用“输入框失去焦点验证”函数；
    var RegExp =/[\w]{6,16}/;
    pwdStatus = blurHandle(this,RegExp,'请填写密码！');

}

// 密码(失去焦点)
repwd.onblur = function(){
    // 调用“输入框失去焦点验证”函数；
    var RegExp =/[\w]{6,16}/;
    repwdStatus = blurHandle(this,RegExp,'请确认一次密码！');
    // 两次密码一致性
    checkUniformity(this);
}

// 手机号(失去焦点)
tel.onblur = function(){
    // 调用“输入框失去焦点验证”函数；
    var RegExp =/^1(3|4|5|7|8)\d{1}\-?\d{4}\-?\d{4}$/;
    telStatus = blurHandle(this,RegExp,'请填写手机号！');
}
 



// 注册按钮点击事件
var signUp = document.getElementById('signUp');
// 获取弹出框
var popupMain = document.getElementById('shade');
var popupBtn = document.getElementById('btn');
signUp.onclick = function(){
    // 运行一次所有的表单元素的“失去焦点”事件
    nicename.onblur();
    pwd.onblur();
    repwd.onblur();
    tel.onblur();
    // 检验表单中的必填项的验证状态是否为真(true)
    if(  nicenameStatus && pwdStatus && repwdStatus  && uniformity){
        // 获取数据提交
        var niceName_val = nicename.value;

        //如果成功就存储
        localStorage.setItem('niceNameKey',niceName_val);
        //页面跳转
        //location.href = 'loca.html';
    }
    // 如果存在验证未通过的项
    // else{
    //     popupMain.style.cssText = 'visibility:visible;opacity:1;';
    // }
}
// 弹出框按钮点击事件
// popupBtn.onclick = function(){
//     popupMain.style.cssText ='';
// }

/**
	 * 功能：输入框失去焦点验证
	 * @param object ident 标识符，失去焦点对应的元素
	 * @param  string mesg  提示信息
	 * reg :正则表达式
	 * @return true:验证通过，false：未通过验证
	 */
function blurHandle(ident,Reg,mesg){
    // 获取当前表单元素的值
    var thisVal = ident.value;
    // 存储错误信息的节点
    var erroMesg = ident.previousElementSibling.previousElementSibling;
    console.log(erroMesg);
    // 如果当前值为空
    if(thisVal === ''){
        // 设置提示信息和元素边框颜色
        erroMesg.textContent = mesg;
        ident.style.borderColor = '#e00';
        // 返回验证结果
        return false;
    }
    // 验证值不正确
    else if(!Reg.test(thisVal)){
        // 设置提示信息和元素边框颜色
        erroMesg.textContent = '请输入正确的格式！';
        ident.style.borderColor = '#e00';
        // 返回验证结果
        return false;
    }
    // 否则
    else{
        erroMesg.textContent = '';
        ident.style.borderColor = '';
        return true;

    }
}
/**
	 * 功能：两次密码一致性验证
	 * @param  标示符
	 * 
	 */
function checkUniformity(ident){
    // 获取两次密码值
    var pwdVal = pwd.value,
        repwdVal = ident.value;
    // 存储错误信息的节点
    var thisErrorMeg = ident.previousElementSibling.previousElementSibling;
    // 如果密码和确认密码都非空
    if(pwdVal && repwdVal){
        // 不一致
        if(pwdVal !== repwdVal){
            thisErrorMeg.textContent = '两次输入的密码不一致！';
            uniformity = false;
        }else{
            thisErrorMeg.textContent = '';
            uniformity = true;
        }
    }
}
}
 


