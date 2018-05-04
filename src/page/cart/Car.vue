<template>
    <div class="car-box">
        <header >购物车</header>
        <!-- <div @click="getParam">点击</div> -->
        <!-- 没有数据情况 -->
        <div class="content" v-if="addGoods">
            <div class="txt">
                <p class="nothing">购物车内没有任何东西</p>
                <p class="go-shop" @click="gogoshopping">去逛逛？</p>
            </div>
        </div>
        <!-- 有数据的情况 -->
        <div class="shopList" v-else>
            <!--编辑商品  -->
            <div class="compile-goods">
                <div class="head">
                    <p @click="compile">编辑</p>
                </div>
                <ul class="compile-content">
                    <li class="clearfix" v-for="(book,index) in addbooks" :key="book.id">
                        <!-- 左边图片盒子 -->
                        <div class="img-box fl">
                            <img :src="book.cover">
                        </div>
                        <!-- 右边书籍详情盒子 -->
                        <div class="content-box fl">
                            <!-- 上面详情 -->
                            <div>
                                <p>{{book.name}}</p>
                                <p>{{book.author}}</p>
                                <p>￥
                                    <span>{{book.price}}</span>
                                </p>
                            </div>
                            <!-- 下面数量 -->
                            <div class="counts">
                                <p>
                                    <button @click="reduce(index)">-</button>
                                    <button ref="bookCount">{{book.count}}</button>
                                    <button @click='add(index)'>+</button>
                                </p>

                            </div>
                        </div>
                    </li>
                </ul>
                <div class="foot">
                    <button type="button" @click="goPay">前往支付</button>
                </div>
            </div>
            <!-- 删除商品 -->
            <transition name="fade">
                <div class="delete-goods" v-show="changeChoose">
                    <div class="head">
                        <span @click="cancel">取消</span>
                        <span @click="deleteBooks">删除选中</span>
                    </div>
                    <div class="delete-box">
                        <div class="delete-content clearfix" v-for="(goods,index) in addbooks" :key="goods.id">
                            <div class="icon-box fl">
                                <i class="fa fa-check-circle" style="color:green" 
                                v-if="goods.changeBg"  @click="changeGood(index)"></i>
                                <i class="fa fa-circle-o" v-else 
                                @click="changeGood(index)"></i>
                            </div>
                            <div class="img-box fl">
                                <img :src="goods.cover">
                            </div>
                            <div class="content-box fl">
                                <p>{{goods.name}}</p>
                                <p>{{goods.author}}</p>
                                <p>￥
                                    <span>{{goods.price}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 支付页面 -->
            <div class="payMoney" ref="payMoney">
                <!-- 头部信息 -->
                <div class="head clearfix">
                <i class="fa fa-chevron-left fl" @click="goBack('payMoney')"></i>
                <span class="fl">结算中心</span>
                </div>
                <!-- 主体部分 -->
                <div class="body">
                    <!-- 商品信息确认 -->
                    <p class="title-goodsMes">
                       商品信息确认 
                    </p>
                    <div class="goodsMes-box">
                        <!--价格 -->
                        <div class="price-box clearfix">
                            <section class="fl">价格信息</section>
                            <div class="price-left fl">
                                <p>商品总价：</p>
                                <p style="margin:5px 0">运送费：</p>
                                <p class="totle">订单总计：</p>
                            </div>
                            <div class="price-right fr">
                                <p><span>￥</span>{{bookcount}}</p>
                                <p style="margin:5px 0"><span>￥</span>10</p>
                                <p class="totle-color"><span>￥</span>{{totlePrice}}</p>
                            </div>
                        </div>
                        <!-- 收货 -->
                        <div class="address-box clearfix">
                            <section class="fl">收货信息</section>
                            <div class="address-left fl" 
                            style="margin-right:20px;">
                                <p>收货地址：</p>
                                <p style="margin:5px 0">收货人：</p>
                                <p style="margin:5px 0">邮编：</p>
                                <p >电话：</p>
                            </div>
                            <div class="address-right fl">
                                <p class="address-color"> {{personInfo[3]}}{{personInfo[4]}}{{personInfo[5]}}{{personInfo[6]}}</p>
                                <p class="address-color">  {{personInfo[0]}}</p>
                                <p class="address-color" style="margin:5px 0">  {{personInfo[2]}}</p>
                                <p class="address-color">  {{personInfo[1]}}</p>
                            </div>
                        </div>
                        <!-- 修改地址 -->
                        <div class="modify-address" 
                        @click="changeAddress('modify')">
                            <p>修改地址</p>
                            <p>&gt;</p>
                        </div>
                         <!-- 增加地址 -->
                        <div class="add-address" 
                         @click="changeAddress('add')">
                            <p>增加地址</p>
                            <p>&gt;</p>
                        </div>
                    </div>
                    <!-- 支付方式 -->
                     <p class="title-goodsMes" style="padding-top:10px;">
                       选择支付方式 
                    </p>
                    <div class="pay-method">
                        <!-- 微信 -->
                        <div>
                            <img src="../../assets/img/weixin.png">
                            <p>微信支付</p>
                            <p>&gt;</p>
                        </div>
                        <!-- 支付宝 -->
                        <div>
                            <img src="../../assets/img/zhifubao.png">
                            <p>支付宝</p>
                            <p>&gt;</p>
                        </div>
                        <!-- 银行卡 -->
                        <div>
                            <img src="../../assets/img/yhk.png">
                            <p>银行卡</p>
                            <p>&gt;</p>
                        </div>
                        <!-- 信用卡 -->
                        <div>
                            <img src="../../assets/img/xyk.png">
                            <p> 信用卡</p>
                            <p>&gt;</p>
                        </div>
                        <!-- visa -->
                        <div>
                            <img src="../../assets/img/visa.png">
                            <p> VISA</p>
                            <p>&gt;</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 修改与增加收货地址 -->
        <div class="address-info person-info" ref="addressInfo">
                <div class="per-head clearfix">
                <i class="fa fa-chevron-left fl" @click="goBack('addressInfo')"></i>
                <span class="fl">地址修改</span>
                </div>

                 <div class="per-content">
                <div>
                    <label>姓名：</label>
                    <input type="text" placeholder="请输入您的姓名" 
                    ref="nameVal" name="inputVal">
                </div>

                <div>
                    <label>联系电话:</label>
                    <input type="text" placeholder="请输入您的联系电话"
                    ref="telVal" name="inputVal">
                </div>

                <div>
                    <label>邮政编码:</label>
                    <input type="text" placeholder="请输入您的邮政编码"
                    ref="zipCodeVal" name="inputVal">
                </div>

                <div class="select-box">
                    <select ref="provinceVal" name="inputVal">
                       <option value="四川省">四川省</option>
                       <option value="北京市">北京市</option>
                       <option value="上海市">上海市</option>
                       <option value="广东省">广东省</option>
                       <option value="湖北省">湖北省</option>
                       <option value="湖南省">湖南省</option>
                       <option value="6">...</option>
                    </select>  

                    <select ref="cityVal" name="inputVal">
                       <option value="成都市">成都市</option>
                       <option value="德阳市">德阳市</option>
                       <option value="绵阳市">绵阳市</option>
                       <option value="南充市">南充市</option>
                       <option value="内江市">内江市</option>
                       <option value="">...</option>
                    </select>  

                    <select ref="areaVal" name="inputVal">
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
                      <input type="text" placeholder="请输入您的详细地址"
                      ref="addressVal" name="inputVal">
                </div>
                <div style="width:95%;margin:0 auto">
                    <button style="width:100%" type="button"
                     @click="conModify">{{addressTxt}}</button>
                </div>
                </div>
            </div>
        </div>
       
    </div>












    
</template>

<script src="./cart.js"></script>

<style lang="scss" scoped>
    @import './cart.scss';
</style>
