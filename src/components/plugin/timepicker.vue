<template>
   <el-dialog
      title="定时发表"
      :visible.sync="centerDialogVisible"
      width="30%"
      :close-on-click-modal="false"
      center>
      <div>
        <span>只能选择2-24小时内的时间</span>
      </div>
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="pickerOpt">
        </el-time-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible">取 消</el-button>
        <el-button type="primary" @click="saveDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
  export default{
    data(){
      return {
        startTime: '', // 时间选择默认值
        pickerOpt:{
          start: '',
          step: '00:30',
          end: ''
        },
        value: '今天',
        centerDialogVisible: false, // 弹出框
        options: [{value: '1',label: '今天'},{value: '2', label: '明天'}]
      }
    },
    methods: {
      cancelDialogVisible(){
        this.centerDialogVisible = false;
        this.$emit('regularly', 0);
      },
      saveDialogVisible(){
        this.centerDialogVisible = false;
        this.$emit('regularly', 1);
        var date = new Date();
        var day = this.options == 1 ? date.getDate() : date.getDate() + 1;
        var timer = date.getFullYear()+ '-' 
        + date.getMonth() + '-' 
        + day + ' ' 
        + this.startTime + ':' 
        +  date.getSeconds();
        this.$emit('regularly_time', timer);
      },
      openDialog(){
        this.centerDialogVisible = true;
        this.getTimer(1);
      },
      getTimer(day){
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var timerHours = '';
        if(day == 1){
          timerHours = hours <= 22 ? hours + 2 : hours;
          this.pickerOpt.start = timerHours + ':' + minutes;
          this.startTime = timerHours + ':' + minutes;
          this.pickerOpt.end = '24: 00';
        }else{
          timerHours = hours >= 2 ? (hours - 2) : hours;
          this.pickerOpt.start = '00: 00';
          this.pickerOpt.end = timerHours + ':' + minutes;
        }
      }
    },
    watch: {
      value: function(){
        this.getTimer(this.value);
      }
    }
  }
</script>

<style scoped>
  .el-dialog--center .el-dialog__body{
    text-align: center;
  }
  .el-select{
    width: 100px;
  }
</style>