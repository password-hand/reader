<template>
    <div class="book-details" ref="bookDetail">
        <div class="head">
            <i class="fa fa-chevron-left"
            @click="$emit('goBack',$refs.bookDetail)"></i>
            <p>图书详情</p>
            <i class="fa fa-bars"></i>
        </div>
        <div class="txt-content">
            <div class="clearfix" style="position:relative">
                <div class="img-box fl">
                    <img :src="bookDetails.cover">
                </div>
                <div class="txt-box fl">
                    <p>作者</p>
                    <p>页数</p>
                    <p>书号</p>
                    <p>出版日期</p>
                    <p>售价</p>
                </div>
                <div class="val-box fr">
                    <p>{{bookDetails.author}} </p>
                    <p>{{bookDetails.pages}} </p>
                    <p>{{bookDetails.id}} </p>
                    <p>{{bookDetails.publish}} </p>
                    <p style="color: rgb(204, 102, 51)">{{bookDetails.price}} </p>
                </div>
            </div>
            <div class="book-title">
                <p>{{bookDetails.name}}</p>
            </div>
            <div class="btn-box">
                <button type="button" 
                @click="goshopping" >加入购物车</button>
                <button type="button">立即支付</button>
            </div>
        </div>
        <div class="book-describe">
            <div class="label">内容概要</div>
            <div class="book-content">
               {{bookDetails.describe}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "BookDetails",
  props: ["bookDetails"],
  methods: {
    goshopping(){
      this.$router.push({ name: 'Car',params:{book:this.booksInfo}})
      // this.$router.push({path:'/car/' + this.booksInfo});
      // this.$router.push({ path: "/contract/project/detail/" + this.$route.params.pid });
    }
  }
};
</script>

<style lang="scss" scoped>
.book-details {
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  z-index: 100;
  transition: 1s;
  .head {
    background: #2396fd;
    padding: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  .txt-content {
    background: white;
    padding: 15px;
    .img-box {
      width: 100px;
      height: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .txt-box {
      font-size: 14px;
      color: grey;
      margin-left: 5px;
      p {
        padding: 3px;
      }
    }
    .val-box {
    width: 50%;
      font-size: 14px;
      color: grey;
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 3px;
        color: black;
      }
    }
    .book-title {
      padding: 10px 0;
      white-space: nowrap;
      text-align: left;
      font-size: 16px;
      font-weight: 700;
      font-style: normal;
      color: rgb(0, 0, 0);
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      button {
        width: 47%;
        height: 45px;
        border: 0;
        background: white;
        color: #000;
        border-radius: 5px;
        border: 1px solid #7f7c7c;
        font-size: 16px;
        .active {
          background: rgb(51, 153, 51);
          color: white;
        }
      }
    }
  }
  .book-describe {
    background: white;
    margin-top: 15px;
    padding: 15px;
    position: relative;
    .label {
      position: absolute;
      left: 45px;
      top: 1px;
      background: white;
    }
    .book-content {
      border: 1px solid #7f7c7c;
      height: 300px;
      font-size: 14px;
      padding: 10px;
      overflow: hidden;
    }
  }
}
</style>
