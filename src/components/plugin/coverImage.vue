<template>
	<div class="cover-box" v-show="coverFlag">
	  <div class="cover-subbox" v-for="item in coverImage">
	  	<img @click="toggle($event)" :src="item">
	  	<span class="cover-icon"></span>
	  </div>
	  <div class="cover-oper">
	  	<el-button type="primary" @click="addimage">确定</el-button>
	  	<el-button type="info" plain @click="cancelimage">取消</el-button>
	  </div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
	export default{
		data(){
			return{
				count: 1,
				ischecked: false,
				imageArr: []
			}
		},
		computed: {
			coverFlag: {
				get(){
					return this.$store.state.coverFlag;
				},
				set(newVal){
					this.$store.state.coverFlag = newVal;
				}
			},
			...mapGetters([
				 'coverImage'
			])
		},
		props:['coverNum'],
		mounted(){
		},
		methods:{
			...mapActions([
				'cancelimage'
			]),
			toggle: function(e){
				var $this = $(e.target);
				var ele = $this.siblings('.cover-icon');
				if(this.coverNum == 0){
					if($(".cover-icon.a").length >= 1){
						$(".cover-icon.a").removeClass('a');
					}
					ele.removeClass('a').addClass('a');
				}else if(this.coverNum == 1){
					if(ele.hasClass('a')){
						ele.removeClass('a');
					}else{
						ele.addClass('a');
					}
					if($(".cover-icon.a").length > 3){
						ele.removeClass('a');
					}
				}
            },
            addimage(){
            	var _this = this;
            	_this.imageArr = [];
            	$(".cover-icon.a").siblings('img').each(function(index, item){
            		_this.imageArr.push($(item).prop('src'));
            	});
            	if(_this.imageArr.length < 3 && this.coverNum == 1){
            		_this.emptyimage();
            		this.$emit('selectOneCover', 0);
            	}
            	this.$emit('saveImageArr', _this.imageArr);
            	this.$store._actions.chooseimage[0]();
            },
            emptyimage(){
            	$(".cover-icon.a").removeClass('a');
            	this.imageArr = [this.imageArr[0]] || [];
            }
		}
	}
</script>


<style scoped>
	.cover-box{
		background:#f7f7f7;
		border:1px solid #dedede;
		border-radius:2px;
		width:438px;
		height:290px;
		position: absolute;
		top: 32px;
	    left: 76px;
	    z-index: 2;
	}
	.cover-box .cover-subbox{
		width:121px;
		height:97px;
		float: left;
		margin:10px;
		cursor: pointer;
		border: 1px solid #ececec;
	}
	.a{
		color: rgba(0, 0, 0, .7);
	}
	.cover-subbox{
		position: relative;
	}
	.cover-icon.a{
		display: inline-block;
		width: 20px;
		height: 20px;
		background:  url('../../assets/images/check.png') no-repeat;
		background-size: contain;
		position:absolute;
		top: 3px;
		right: 3px;
	}
	.cover-box .cover-subbox img{
		width:121px;
		object-fit: scale-down;
		height:97px;
	}
	.cover-oper{
		position: absolute;
		bottom:10px;
		left:150px;
	}
</style>