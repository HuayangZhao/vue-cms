<template>
    <div class="comment-container">
        <h4>发表评论</h4>
        <hr>
        <textarea name="" placeholder="请输入要评论的内容,请注意文明用语,最多输入120个字" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="(item,i) in commentmsg" :key="i">
                    <div class="mui-media-body">
                        <span>第{{i+1}}楼&nbsp;&nbsp;用户:&nbsp;{{ item.user_name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}</span>
                        <hr>
                        <p> {{item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</p>
                    </div>
                </li>
            </ul>
        <mt-button type="danger"  plain size="large" @click="getMoreComment">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            pageIndex:1, //默认显示第一页
            commentmsg:[],
            msg:''
        }
    },
    created(){
        this. getNewComment()
    },
    methods:{
        getNewComment(){
            // 这里ID需要父组件传递过来 父组件向子组件传值需要在模板标签中用属性绑定的方式
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result=>{
                // console.log(result)
                if(result.body.status === 0){
                    // this.commentmsg = result.body.message
                    // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                    this.commentmsg = this.commentmsg.concat(result.body.message);
                }else {
                    Toast("获取评论失败！");
                }
            })
        },
        // 加载更多
        getMoreComment(){
           this.pageIndex++;
           this.getNewComment();
        },
        // 提交评论
        postComment(){
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空！");
            }
            this.$http.post('api/postcomment/' + this.id,{content:this.msg},{ emulateJSON:true }).then(result=>{
                // console.log(result)
                if(result.body.status === 0){
                    // this.pageIndex = 1;
                    // this.commentmsg=[];
                    // this.getNewComment();
                    // this.msg = ''; 
                     var cmt = {
                        user_name: "汪琳琳",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.commentmsg.unshift(cmt);
                            // Data中的数据变化了 用到data数据的地方会自动刷新 不用重新调用函数刷新
                            // this.getNewComment();
                    this.msg = "";
                    Toast("评论成功！");
                }else {
                    Toast("评论失败！请重试");
                }
            })
        }
    },
     props: ["id"],
}
</script>
<style lang="less">
.comment-container{
    textarea {
        font-size: 14px;
        height: 100px;
        text-indent: 2em;
    }
    .mui-table-view-cell {
        padding: 0;
        .mui-media-body{
            border: 2px dashed #ccc;
            padding: 10px;
            margin-top: 15px;
            margin-bottom: 15px;
            hr{
                margin: 5px 0;
                padding: 0;
            }
            span{
                color: rgb(7, 159, 230);
                font-size: 12px;
            }
            p {
                text-indent: 2em;
                line-height: 22px;
            }
        }
    }
    
}
</style>
