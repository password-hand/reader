<template>
    <div>
        <!-- 个人中心 -->
        <div class="content" v-show="!showMes&&!showSome">
            <div class="head">个人中心</div>
            <!-- 头部图片 -->
           
            <div class="bg-box">
                <div class="mark"></div>
                <div class="img-box">
                    <img src="../../assets/img/head.jpg">
                </div>
                <p>{{nickname}}</p>
            </div>
            <!-- 中部信息 -->
            <div class="user-info">
                <div>
                    <p class="clearfix" @click="modifyMes('personInfo')">
                        <span class="fl">设置个人资料</span>
                        <span class="fr">&gt;</span>
                    </p>

                    <p class="clearfix" @click="modifyMes('addressInfo')">
                        <span class="fl">收货地址管理</span>
                        <span class="fr">&gt;</span>
                    </p>
                </div>

                <div>
                    <p class="clearfix">
                        <span class="fl">我的订单</span>
                        <span class="fr">&gt;</span>
                    </p>

                    <p class="clearfix">
                        <span class="fl">我的评价</span>
                        <span class="fr">&gt;</span>
                    </p>
                </div>

                <div>
                    <p class="clearfix">
                        <span class="fl">商品收藏</span>
                        <span class="fr">&gt;</span>
                    </p>

                    <p class="clearfix">
                        <span class="fl">店铺收藏</span>
                        <span class="fr">&gt;</span>
                    </p>

                    <p class="clearfix">
                        <span class="fl">我的浏览</span>
                        <span class="fr">&gt;</span>
                    </p>
                </div>
                <!-- 下部按钮 -->
                <div class="back-btn">
                    <p>
                        退出登录
                    </p>
                </div>
            </div>
        </div>

        <!-- 登录注册框 -->
        <div class="land-register" v-show="showMes&showSome">
            <div class="head">
                登录/注册
            </div>
             <div>
            {{$route.params.username}}
        </div>
            <div class="content-box">
                <ul class="land clearfix">
                    <li :class="{active:changeBgCol}" @click="changeBg">登 录</li>
                    <li :class="{active:!changeBgCol}" @click="changeBg">注 册</li>
                </ul>
                <!-- 登录框 -->
                <transition name="fade">
                <div class="input-box" v-show="changeBgCol">
                    <div>
                        <i class="fa fa-mobile" style="font-size: 28px"></i>
                        <input type="search" @blur="telBlur('land')"
                        ref="landTel" @focus="inputFocus('landTel')"
                        placeholder="请输入您的电话" name="input-val">
                        <span class="error-mes"></span>
                    </div>

                    <div>
                        <i class="fa fa-unlock-alt"></i>
                        <input type="search" @blur="pawBlur('land')"
                        ref="landPassw"  @focus="inputFocus('landPassw')"
                        placeholder="请输入您的密码" name="input-val">
                        <span class="error-mes"></span>
                    </div>

                    <div class="land-btn" @click="confirmLand">
                        登&nbsp;&nbsp;&nbsp;&nbsp;录
                    </div>

                </div>
                </transition>
                <!-- 注册框 -->
                <transition name="fade">
                <div class="input-box regis" v-show="!changeBgCol">
                    <div>
                        <i class="fa fa-mobile" style="font-size: 28px"></i>
                        <input type="text" ref="telNumber" name="input-val"
                          @focus="inputFocus('telNumber')"
                        placeholder="请输入您的电话" @blur="telBlur">
                        <span class="error-mes"></span>
                    </div>

                    <div>
                        <i class="fa fa-user"></i>
                        <input type="text" ref="niceName" name="input-val"
                        @focus="inputFocus('niceName')"
                        placeholder="请输入您的昵称" @blur="nameBlur">
                        <span class="error-mes"></span>
                    </div>

                    <div>
                        <i class="fa fa-unlock-alt"></i>
                        <input type="text" ref="password" name="input-val"
                        @focus="inputFocus('password')"
                        placeholder="请输入您的密码" @blur="pawBlur">
                        <span class="error-mes"></span>
                    </div>

                    <div>
                        <i class="fa fa-unlock-alt" style="color: gray"></i>
                        <input type="text" ref="repaetPaw" name="input-val"
                        @focus="inputFocus('repaetPaw')"
                        placeholder="请确认您的密码" @blur="repaetPawBlur">
                        <span class="error-mes"></span>
                    </div>

                    <div class="land-btn" @click="confirmRegister">
                        确 认 注 册
                    </div>
                </div>
                </transition>
            </div>
        </div>

        <!-- 个人资料 -->
        <div class="person-info" ref="personInfo">
            <div class="per-head clearfix">
                <i class="fa fa-chevron-left fl" @click="goBack"></i>
                <span class="fl">个人资料修改</span>
            </div>
            <div class="per-content">
                <div>
                    <label>昵称：</label>
                    <input type="text" placeholder="请输入您的昵称" ref="inputVal">
                </div>

                <div>
                    <label>Email:</label>
                    <input type="text" placeholder="请输入您的安全邮箱">
                </div>

                <div>
                    <label>性别：</label>
                    <span :class="{active:peo.show}" 
                    v-for="(peo,index) in sex" :key="peo.id"
                     @click="checkSex(index)">{{peo.name}}</span>
                </div>

                <div>
                    <label>生日：</label>
                    <input type="date" value="2000/3/2">
                </div>

                <div>
                    <label>身份证号：</label>
                    <input type="text" placeholder="请输入有效的身份证号">
                </div>

                <div class="clearfix" style="height:130px">
                    <label class="fl">个人描述：</label>
                    <textarea placeholder="请谈谈对自己的认识"></textarea>
                </div>

                <button type="button" @click="conModify('personInfo')">确认修改</button>
            </div>
            
        </div>
        <!-- 收货地址管理 --> 
        <div class="address-info person-info" ref="addressInfo">
                <div class="per-head clearfix">
                <i class="fa fa-chevron-left fl" @click="goBack"></i>
                <span class="fl">地址修改</span>
                </div>

                 <div class="per-content">
                <div>
                    <label>姓名：</label>
                    <input type="text" placeholder="请输入您的姓名" ref="nameVal">
                </div>

                <div>
                    <label>联系电话:</label>
                    <input type="text" placeholder="请输入您的联系电话">
                </div>

                <div>
                    <label>邮政编码:</label>
                    <input type="text" placeholder="请输入您的邮政编码">
                </div>

                <div class="select-box">
                    <select name="" id="">
                       <option value="四川省">四川省</option>
                       <option value="北京市">北京市</option>
                       <option value="上海市">上海市</option>
                       <option value="广东省">广东省</option>
                       <option value="湖北省">湖北省</option>
                       <option value="湖南省">湖南省</option>
                       <option value="6">...</option>
                    </select>  

                    <select name="" id="">
                       <option value="成都市">成都市</option>
                       <option value="德阳市">德阳市</option>
                       <option value="绵阳市">绵阳市</option>
                       <option value="南充市">南充市</option>
                       <option value="内江市">内江市</option>
                       <option value="">...</option>
                    </select>  

                    <select name="" id="">
                       <option value="武侯区">武侯区</option>
                       <option value="金牛区">金牛区</option>
                       <option value="高新区">高新区</option>
                       <option value="锦江区">锦江区</option>
                       <option value="青羊区">青羊区</option>
                       <option value="">...</option>
                    </select>  
                    
                </div>

                <div>
                    <label>详细地址：</label>
                      <input type="text" placeholder="请输入您的详细地址">
                </div>
                <div style="width:95%;margin:0 auto">
                    <button style="width:100%" type="button"
                     @click="conModify('addressInfo')">确认修改</button>
                </div>
                </div>
            </div>
        <!-- 弹出框组件 -->
        <Popup v-if="!change"
         @open='open'
        />
        
        
        <!-- 遮罩层 -->
            <div class="mask" v-if="!change"></div>
        <!-- 弹出框 -->
             <div class="popup" v-if="!change">
                 <p>{{title}}</p>
                 <button type="button" @click="sureCheck">确认</button>
            </div>
    </div>



</template>   

<script src="./me.js"></script>



<style lang="scss" scoped>
@import "./me.scss";
</style>
