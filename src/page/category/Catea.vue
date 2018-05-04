<template>
    <div>
        <header>分类</header>
        <div class="content">
            <!-- 输入框 -->
            <div class="search-box">
                <i class="fa fa-search"></i>
                <input type="search" placeholder="请输入你要寻找的书籍"
                 @keyup="searchBook($event.target.value)">
            </div>
            
            <!-- 图书加载部分 -->
            <ul class="book-list-box">
                <li class="book-list clearfix" v-for="book in newBook" 
                :key='book.id' @click="BookDetails(book)">
                    <div class="img-box fl">
                     <img :src="book.cover">   
                    </div>
                    
                    <div class="text-box fl">
                         <p class="name">
                             {{book.name}}
                         </p>
                         <p class="author">
                             {{book.author}}
                         </p>
                          <p class="price">
                            <span>￥ </span> {{book.price}}
                         </p>
                    </div>
                    <div class="fr right-icon">
                        <img src="../../assets/img/right.png">
                    </div>
                </li>
            </ul>
            <!-- 加载更多 -->
            <div ref="qweq" v-if="changeStatus" 
            class="onload-book" @click="loadBooks">
                <p :class="{showTxt:addTxt}">{{txt}}
               <img src="../../assets/img/top.png" v-show="addStage">
               </p>
            </div>
            <div v-else class="onload-book" >
                <p>没有更多的书籍了</p>
            </div>
        </div>
        <!-- 书籍详情组件 -->
           <BookDetails ref="details"
        :bookDetails="bookDetails"
        @goBack='gotoBack'
        />   
          
         
        
    </div>
</template>

<script src="./category.js"></script> 

<style lang="scss" scoped>
@import './category.scss'
</style>