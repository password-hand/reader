<template>
    <div style="position:relative">
        
        <header>首页</header>
        <div class="content">
            <!-- 轮播图 -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="../../assets/img/1.jpg">
                    </div>
                    <div class="swiper-slide">
                        <img src="../../assets/img/2.jpg">
                    </div>
                    <div class="swiper-slide">
                        <img src="../../assets/img/3.jpg">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <!-- 广告部分 -->
            <div class="ad-box">
                <i class="fa fa-bell"></i>
                <p>
                    双12全场图书5折优惠，更有神秘惊喜等你来！
                </p>
            </div>
            <!-- 书籍加载部分 -->
            <!-- 新书上架 -->
            <div class="books-box clearfix" :title-message="tit1">
                <h4>{{tit1}}</h4>
                <div class="book-list" v-for="book in newBooks" :key="book.id" 
                @click="bookDetails(book)">
                    <img :src="book.cover">
                    <p>{{book.name}}</p>
                    <p class="color-txt">
                        <span>￥</span> {{book.price}}</p>
                </div>
            </div>
            <!-- 编辑推荐 -->
            <div class="books-box clearfix" :title-message="tit2">
                <h4>{{tit2}}</h4>
                <div class="book-list" v-for="book in recomend" 
                :key="book.id" @click="bookDetails(book)">
                    <img :src="book.cover">
                    <p>{{book.name}}</p>
                    <p class="color-txt">
                        <span>￥</span> {{book.price}}</p>
                </div>
            </div>
            <!-- 热门新书 -->
            <div class="books-box clearfix" :title-message="tit3">
                <h4>{{tit3}}</h4>
                <div class="book-list" v-for="book in hotBooks" 
                :key="book.id" @click="bookDetails(book)">
                    <img :src="book.cover">
                    <p>{{book.name}}</p>
                    <p class="color-txt">
                        <span>￥</span> {{book.price}}</p>
                </div>
            </div>
        </div>
        <!-- 书籍情况说明部分 -->
        <transition name="fade">
            <div v-show="change" class="booksList">
                <!-- 头部关闭按钮 -->
                <div class="head">
                    <p @click="deleteShow">
                        &times;
                    </p>
                </div>
                <!-- 中部书籍情况 -->
                <div class="txt-content">
                    <div class="clearfix" style="position:relative">
                        <div class="img-box fl">
                            <img :src="bookList.cover">
                        </div>
                        <div class="txt-box fl">
                            <p>作者</p>
                            <p>页数</p>
                            <p>书号</p>
                            <p>出版日期</p>
                        </div>
                        <div class="val-box fl">
                            <p>{{bookList.author}}</p>
                            <p>{{bookList.pages}}</p>
                            <p>{{bookList.id}}</p>
                            <p>{{bookList.publish}}</p>
                        </div>
                        <div class="details-box">
                            <p @click="details(bookList)">详情 &gt;</p>
                        </div>
                    </div>
                    <div class="book-describe">
                        <div class="label">{{bookList.name}}</div>
                        <p>
                            {{bookList.describe}}
                        </p>
                    </div>
                </div>
                <!-- 下部价格及数量 -->
                <div class="foot ">
                    <div class=" price">￥:{{bookList.price}}</div>
                    <div class=" choose">
                        <select ref="sel">
                            <option value="1本">1本</option>
                            <option value="2本">2本</option>
                            <option value="3本">3本</option>
                            <option value="4本">4本</option>
                            <option value="5本">5本</option>
                        </select>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <div @click="goShopping">加入购物车 </div>
                        <div  >立即购买</div>
                    </div>
                </div>
        </div> 
        </transition>
        <!-- 书籍详情组件 -->
        <BookDetails ref="details" 
        :bookDetails="detailss"
        @goBack='gotoBack'
          />
       
    </div>
</template>

<script src="./home.js"></script>


<style lang="scss" scoped>
    @import "./home.scss";

</style>
