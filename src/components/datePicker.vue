<template>
  <div class="picker-ipt" ref="pickerIpt" :style="{ width: pickerWidth + 'px' }">
    <div class="picker-ipt-container" @click.stop="showPicker">
      <div class="picker-ipt-ico">
        <i class="iconfont iconrili"></i>
      </div>
      <div :style="{ position: 'relative',width: (pickerWidth - 32) + 'px' }">
        <input
            ref="picker1"
            type="text"
            :class="['picker-ipt-text',rules ? 'v-validate' : '']"
            :style="{ width: pickerWidth + 'px',height: pickerHeight + 'px' }"
            readonly
            v-validate="rules"
            :value="current"
            :placeholder="placeholder"
            @input="$emit('input', $event.target.value)"/>
        <input ref="picker2" type="text" class="picker-ipt-text2" readonly
               :style="{ height: pickerHeight + 'px' }"
               v-model="current" />
      </div>
    </div>
    
    <div v-if="pickerFlag" @click.stop ref="pickers" class="picker" :style="{ top: itemsDirectionTop + 'px',left: itemsDirectionLeft + 'px'  }">
      <div v-if="type === 'datetime'" class="picker-datetime">
        <div class="picker-datetime-item"><span>{{currentDate ? currentDate : '请选择日期'}}</span></div>
        <div class="picker-datetime-item timePick" @click.stop="showTimePicker">
          <span>{{currentTime ? currentTime : '请选择时间'}}</span>
          <div class="picker-datetime-time" v-if="timePickerFlag">
            <div class="datetime-content">
              <div ref="grounp1" class="datetime-content-grounp">
                <div :class="['datetime-content-item1',item.current ? 'datetime-content-item1-current' : '']"
                     v-for="(item,index) in dateHours" @click.stop="changeTime('Hours',item.text)">
                  {{item.text}}
                </div>
              </div>
              <div ref="grounp2" class="datetime-content-grounp">
                <div :class="['datetime-content-item2',item.current ? 'datetime-content-item2-current' : '']"
                     v-for="(item,index) in dateMinutes" @click.stop="changeTime('Minutes',item.text)">
                  {{item.text}}
                </div>
              </div>
              <div ref="grounp3" class="datetime-content-grounp">
                <div :class="['datetime-content-item3',item.current ? 'datetime-content-item3-current' : '']"
                     v-for="(item,index) in dateSeconds" @click.stop="changeTime('Seconds',item.text)">
                  {{item.text}}
                </div>
              </div>
              <div class="datetime-content-select"></div>
            </div>
            <div class="datetime-foot">
              <div class="datetime-foot-btn success" @click.stop="selectDateTime">确定</div>
              <div class="datetime-foot-btn">取消</div>
            </div>
          </div>
        </div>
      </div>
      <div class="picker-header">
        <div v-if="type === 'year'" class="picker-header-item" @click.stop="yearPreYear">
          <i class="iconfont iconLeft-"></i>
        </div>
        <div v-if="type === 'month'" class="picker-header-item" @click.stop="monthPreYear">
          <i class="iconfont iconLeft-"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="datePreYear">
          <i class="iconfont iconLeft-"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="datePreMonth">
          <i class="iconfont iconLeft-1"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-date">
          {{year}}年{{month}}月
        </div>
        <div v-if="type === 'month'" class="picker-header-date">
          {{year2}}年
        </div>
        <div v-if="type === 'year'" class="picker-header-date">
          {{year3}}年 - {{year4}}年
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="dateNextMonth">
          <i class="iconfont iconRight-1"></i>
        </div>
        <div v-if="type === 'date' || type === 'datetime'" class="picker-header-item" @click.stop="dateNextYear">
          <i class="iconfont iconRight-"></i>
        </div>
        <div v-if="type === 'month'" class="picker-header-item" @click.stop="monthNextYear">
          <i class="iconfont iconRight-"></i>
        </div>
        <div v-if="type === 'year'" class="picker-header-item" @click.stop="yearNextYear">
          <i class="iconfont iconRight-"></i>
        </div>
      </div>
      <div v-if="type === 'date' || type === 'datetime'" class="picker-week">
        <div class="picker-week-item" v-for="item in weeks">{{item}}</div>
      </div>
      <div class="picker-date">
        <div class="picker-date-item" v-if="type === 'date' || type === 'datetime'" v-for="(item,index) in date">
          <span :class="['picker-date-item-text',{'current-date' : item.active},{'disabled-current-date' : item.isDisabled}]" @click.stop="selectDate(item.val,index)">{{item.text}}</span>
        </div>
        <div class="picker-month-item" v-if="type === 'month'" v-for="(item,index) in dateMonth">
          <span :class="['picker-month-item-text',{'current-month' : item.active},{'disabled-current-month' : item.isDisabled}]" @click.stop="selectMonth(item.val,index)">{{item.text}}</span>
        </div>
        <div class="picker-year-item" v-if="type === 'year'" v-for="(item,index) in dateYear">
          <span :class="['picker-year-item-text',{'current-year' : item.active},{'disabled-current-year' : item.isDisabled}]" @click.stop="selectYear(item.val,index)">{{item.text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'date-picker',
    props: {
      // 模式 date month year datetime(日期时间模式)
      mode: String,
      placeholderText: String,
      // 初始化时间，时间戳，默认当前时间
      defaultTime: {
        type: Number,
        default: 0
      },
      // 是否禁止
      isDisabled:{
        type: Boolean,
        default: false
      },
      value: {
        default: ""
      },
      // 开始时间，时间戳，默认无限制
      minTime: {
        type: Number,
        default: 0
      },
      // 结束时间，时间戳，默认无限制
      maxTime: {
        type: Number,
        default: 0
      },
      // 格式化 YYYY-MM-DD hh:mm:ss
      format: {
        type: String,
        default: 'default'
      },
      pickerRule:{
        type: Object
      },
      // picker宽度
      pickerWidth: {
        type: Number,
        default(){
          switch (this.mode){
            case 'datetime':
              return 250;
            case 'date':
              return 155;
            case 'month':
              return 155;
            case 'year':
              return 155;
          }
        }
      },
      pickerHeight: {
        type: Number,
        default: 34
      }
    },
    data() {
      return {
        pickerFlag: false,
        timePickerFlag: false,
        rules: this.pickerRule,
        // 当前值
        current: '',
        type: this.mode,
        placeholder: this.placeholderText,
        // type=datetime
        currentTime: '',
        currentDate: '',
        dateHours: [],
        dateMinutes: [],
        dateSeconds: [],
        // type=date
        year: '',
        month: '',
        // 已选中的项
        day: '',
        //
        weeks: ['日','一','二','三','四','五','六'],
        date: [],
        // type=month
        year2: '',
        // 已选中的项
        month2: '',
        dateMonth: [],
        // type=year
        year3: '',
        year4: '',
        // 已选中的项
        year5: '',
        dateYear: [],
        // 日历显示方向正值为下，负值为上
        itemsDirectionTop: this.pickerHeight + 2,
        itemsDirectionLeft: 0,
        scroll1: 0,
        scroll2: 0,
        scroll3: 0
      }
    },
    methods: {
      initTimeItems(){
        let curHours,curMinutes,curSeconds;
        if (this.defaultTime){
          let timeArr = this.formatTimestamp({ timestamp: this.defaultTime,rules: 'hh:mm:ss' });
          curHours = timeArr.split(':')[0];
          curMinutes = timeArr.split(':')[1];
          curSeconds = timeArr.split(':')[2];
          console.log(timeArr);
        }
        let hours = [],minutes = [],seconds = [];
        for (let i=0;i<24;i++){
          let obj1 = {};
          obj1.text = i > 9 ? i : '0' + i;
          obj1.current = false;
          if (curHours && curHours == obj1.text){
            obj1.current = true;
          }
          hours.push(obj1);
        }
        hours.unshift({text: '',current: false},{text: '',current: false});
        hours.push({text: '',current: false},{text: '',current: false});

        for (let i=0;i<60;i++){
          let obj1 = {};
          obj1.text = i > 9 ? i : '0' + i;
          obj1.current = false;
          if (curMinutes && curMinutes == obj1.text){
            obj1.current = true;
          }
          minutes.push(obj1);
        }
        minutes.unshift({text: '',current: false},{text: '',current: false});
        minutes.push({text: '',current: false},{text: '',current: false});

        for (let i=0;i<60;i++){
          let obj1 = {};
          obj1.text = i > 9 ? i : '0' + i;
          obj1.current = false;
          if (curSeconds && curSeconds == obj1.text){
            obj1.current = true;
          }
          seconds.push(obj1);
        }
        seconds.unshift({text: '',current: false},{text: '',current: false});
        seconds.push({text: '',current: false},{text: '',current: false});

        this.dateHours = hours;
        this.dateMinutes = minutes;
        this.dateSeconds = seconds;
      },
      changeTime(type,time){
        if (time){
          let _time = parseInt(time);
          if (type === 'Hours'){
            console.log(this.$refs.grounp1);
            this.$refs.grounp1.scrollTo(0,35*_time);
            this.dateHours.forEach((item,index) => {
              item.current = false;
            });
            this.dateHours[_time+2].current = true;
          }
          if (type === 'Minutes'){
            this.$refs.grounp2.scrollTo(0,35*_time);
            this.dateMinutes.forEach((item,index) => {
              item.current = false;
            });
            this.dateMinutes[_time+2].current = true;
          }
          if (type === 'Seconds'){
            this.$refs.grounp3.scrollTo(0,35*_time);
            this.dateSeconds.forEach((item,index) => {
              item.current = false;
            });
            this.dateSeconds[_time+2].current = true;
          }
        }
      },
      showPicker(){
        if (this.pickerFlag){
          this.pickerFlag = false;
          this.timePickerFlag = false;
        }else {
          if (!this.isDisabled){
            this.pickerFlag = true;
            // 关闭其他
            this.$parent.$children.forEach((item,index) => {
              if (item._uid !== this._uid &&  typeof(item.pickerFlag) !== "undefined"){
                item.pickerFlag = false
              }
            });
            // 判断日历显示方向
            this.$nextTick(() => {
              let winHeight = window.innerHeight,
                  winWidth = window.innerWidth,
                  pickerOffsetTop = this.getOffsetTop(this.$refs.pickerIpt),
                  pickerOffsetLeft = this.getOffsetLeft(this.$refs.pickerIpt),
                  pickerHeight = this.$refs.pickers.offsetHeight,
                  pickerWidth = this.$refs.pickers.offsetWidth;
              // 判断top
              if ((winHeight - pickerOffsetTop - this.pickerHeight) > (pickerHeight + 20)){
                this.itemsDirectionTop = this.pickerHeight + 2;
              }else {
                this.itemsDirectionTop = (pickerHeight+2) * -1;
              }
              // 判断left
              if ((winWidth - pickerOffsetLeft - this.pickerWidth) > (pickerHeight + 20)){
                this.itemsDirectionLeft = 0;
              }else {
                this.itemsDirectionLeft = (pickerWidth - this.pickerWidth) * -1;
              }
            })
          }
        }
      },
      showTimePicker(){
        if (this.timePickerFlag){
          this.timePickerFlag = false;
        }else {
          this.timePickerFlag = true;
          // 监听scroll
          let _this = this;
          let timer1 = false,timer2 = false,timer3 = false;
          this.$nextTick(() => {
            // 如果没有选择日期则自动选择当前
            if (!this.currentDate){
              // 当前天
              let currentDay = new Date().getDate();
              this.current = this.dateFormat(this.year,this.month,currentDay,0,0,0);
              // test
              this.$refs.picker1.value = this.current;
              let element = this.$refs.picker1;
              let evObj = document.createEvent('Event');
              evObj.initEvent('input', true, true);
              element.dispatchEvent(evObj);
              // css控制
              this.date.forEach((item,index) => {
                if (item.val == currentDay){
                  item.active = true;
                }
              });
              this.$emit('change',this.current);
              this.currentDate = this.year + '-' + (this.month > 9 ? this.month : '0' + this.month) + '-' + (currentDay > 9 ? currentDay : '0' + currentDay);
              this.currentTime = '00:00:00';
              // 初始化time值
              this.dateHours.forEach((item,index) => {
                if (item.text === '00'){
                  item.current = true;
                }
              });
              this.dateMinutes.forEach((item,index) => {
                if (item.text === '00'){
                  item.current = true;
                }
              });
              this.dateSeconds.forEach((item,index) => {
                if (item.text === '00'){
                  item.current = true;
                }
              });
            }
            // 初始化已选择值
            // 时
            this.dateHours.forEach((item,index) => {
              if (item.current){
                _this.$refs.grounp1.scrollTo(0,parseInt(item.text)*35);
              }
            });
            // 分
            this.dateMinutes.forEach((item,index) => {
              if (item.current) {
                _this.$refs.grounp2.scrollTo(0,parseInt(item.text)*35);
              }
            });
            // 秒
            this.dateSeconds.forEach((item,index) => {
              if (item.current){
                _this.$refs.grounp3.scrollTo(0,parseInt(item.text)*35);
              }
            });

            // 监听滚动事件
            // 时
            this.$refs.grounp1.addEventListener('scroll',function () {
              let top = _this.$refs.grounp1.scrollTop;
              clearTimeout(timer1);
              timer1 = setTimeout(function(){
                _this.$refs.grounp1.scrollTo(0,Math.round(top/35)*35);
                _this.dateHours.forEach((item,index) => {
                  item.current = false;
                });
                _this.dateHours[Math.round(top/35)+2].current = true;
              }, 300);
            });
            // 分
            this.$refs.grounp2.addEventListener('scroll',function () {
              let top = _this.$refs.grounp2.scrollTop;
              clearTimeout(timer2);
              timer2 = setTimeout(function(){
                _this.$refs.grounp2.scrollTo(0,Math.round(top/35)*35);
                _this.dateMinutes.forEach((item,index) => {
                  item.current = false;
                });
                _this.dateMinutes[Math.round(top/35)+2].current = true;
              }, 300);
            });
            // 秒
            this.$refs.grounp3.addEventListener('scroll',function () {
              let top = _this.$refs.grounp3.scrollTop;
              clearTimeout(timer3);
              timer3 = setTimeout(function(){
                _this.$refs.grounp3.scrollTo(0,Math.round(top/35)*35);
                _this.dateSeconds.forEach((item,index) => {
                  item.current = false;
                });
                _this.dateSeconds[Math.round(top/35)+2].current = true;
              }, 300);
            });
          });
        }
      },
      yearPreYear(){
        this.year4 = this.year3 -1;
        this.year3 = this.year4 -11;
      },
      yearNextYear(){
        this.year3 = this.year4 +1;
        this.year4 = this.year3 +11;
      },
      selectYear(year,index){
        if (this.dateYear[index].isDisabled) return;

        // 当前值
        this.current = this.dateFormat(year);
        // test
        this.$refs.picker1.value = this.current;
        let element = this.$refs.picker1;
        let evObj = document.createEvent('Event');
        evObj.initEvent('input', true, true);
        element.dispatchEvent(evObj);
        // css控制
        if (this.dateYear[index].active){
          this.dateYear.forEach((item, index) => {
            item.active = false;
          });
          this.dateYear[index].active = false;
        }else {
          this.dateYear.forEach((item, index) => {
            item.active = false;
          });
          this.dateYear[index].active = true;
          this.$emit('change',this.current);
          this.year5 = year;
        }
      },
      monthPreYear(){
        this.year2 = this.year2 -1;
      },
      monthNextYear(){
        this.year2 = this.year2 +1;
      },
      selectMonth(month,index){
        if (this.dateMonth[index].isDisabled) return;
        // 当前值
        this.current = this.dateFormat(this.year2,month);
        // test
        this.$refs.picker1.value = this.current;
        let element = this.$refs.picker1;
        let evObj = document.createEvent('Event');
        evObj.initEvent('input', true, true);
        element.dispatchEvent(evObj);
        // css控制
        if (this.dateMonth[index].active){
          this.dateMonth.forEach((item, index) => {
            item.active = false;
          });
          this.dateMonth[index].active = false;
        }else {
          this.dateMonth.forEach((item, index) => {
            item.active = false;
          });
          this.dateMonth[index].active = true;
          this.$emit('change',this.current);
          this.month2 = this.year2 + '-' + month;
        }
      },
      selectDateTime(){
        let hours,minutes,seconds;
        this.dateHours.forEach((item,index) => {
          if (item.current){
            hours = item.text;
          }
        });
        this.dateMinutes.forEach((item,index) => {
          if (item.current){
            minutes = item.text;
          }
        });
        this.dateSeconds.forEach((item,index) => {
          if (item.current){
            seconds = item.text;
          }
        });
        this.currentTime = hours + ':' + minutes + ':' + seconds;
        let currentVal = this.currentDate.split('-');
        this.current = this.dateFormat(currentVal[0],currentVal[1],currentVal[2],hours,minutes,seconds);
        // test
        this.$refs.picker1.value = this.current;
        let element = this.$refs.picker1;
        let evObj = document.createEvent('Event');
        evObj.initEvent('input', true, true);
        element.dispatchEvent(evObj);
        this.$emit('change',this.current);
        this.timePickerFlag = false;
      },
      selectDate(day,index){
        if (!day) return;
        if (this.type === 'date'){
          if (this.date[index].isDisabled) return;
          // 当前值
          this.current = this.dateFormat(this.year,this.month,day);
          // test
          this.$refs.picker1.value = this.current;
          let element = this.$refs.picker1;
          let evObj = document.createEvent('Event');
          evObj.initEvent('input', true, true);
          element.dispatchEvent(evObj);
          // css控制
          if (this.date[index].active){
            this.date.forEach((item, index) => {
              item.active = false;
            });
            this.date[index].active = false;
          }else {
            this.date.forEach((item, index) => {
              item.active = false;
            });
            this.date[index].active = true;
            this.$emit('change',this.current);
            this.day = this.year + '-' +this.month + '-' + day;
          }
        }
        if (this.type === 'datetime'){
          if (this.date[index].isDisabled) return;
          // 当前值
          this.current = this.dateFormat(this.year,this.month,day,0,0,0);
          // test
          this.$refs.picker1.value = this.current;
          let element = this.$refs.picker1;
          let evObj = document.createEvent('Event');
          evObj.initEvent('input', true, true);
          element.dispatchEvent(evObj);
          // css控制
          if (this.date[index].active){
            this.date.forEach((item, index) => {
              item.active = false;
            });
            this.date[index].active = false;
          }else {
            this.date.forEach((item, index) => {
              item.active = false;
            });
            this.date[index].active = true;
            this.$emit('change',this.current);
            this.currentDate = this.year + '-' + (this.month > 9 ? this.month : '0' + this.month) + '-' + (day > 9 ? day : '0' + day);
            this.currentTime = '00:00:00';
            // 初始化time值
            this.dateHours.forEach((item,index) => {
              if (item.text === '00'){
                item.current = true;
              }
            });
            this.dateMinutes.forEach((item,index) => {
              if (item.text === '00'){
                item.current = true;
              }
            });
            this.dateSeconds.forEach((item,index) => {
              if (item.text === '00'){
                item.current = true;
              }
            });
          }
        }
      },
      datePreYear(){
        this.year = this.year -1;
      },
      datePreMonth(){
        if (this.month === 1){
          this.month = 12;
          this.year = this.year -1;
        }else {
          this.month = this.month -1;
        }

      },
      dateNextMonth(){
        if (this.month === 12){
          this.month = 1;
          this.year = this.year + 1;
        }else {
          this.month = this.month +1;
        }
      },
      dateNextYear(){
        this.year = this.year +1;
      },
      isLeap(year){
        if((year%4==0 && year%100!=0) || year%400==0){
          return true;
        }
        else{
          return false;
        }
      },
      getWeek(dateString){
        let date;
        if(!dateString){
          date = new Date;
        }else{
          let dateArray = dateString.split("-");
          date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
        }
        return "星期" + "日一二三四五六".charAt(date.getDay());
      },
      getCalendarData(year,month,day,minDate,maxDate){
        let dateStrStart = year + '-' + month + '-1',
            dateStrEnd = '';
        let comDay = day.split('-');
        let objNull = { val:'',active:false,isDisabled: false };
        let monthDate = [31,0,31,30,31,30,31,31,30,31,30,31];
        let currentMonthDate = [];
        let minDateYear = new Date(minDate).getFullYear(),
            minDateMouth = new Date(minDate).getMonth() + 1,
            minDateDate = new Date(minDate).getDate(),
            maxDateYear = new Date(maxDate).getFullYear(),
            maxDateMouth = new Date(maxDate).getMonth() + 1,
            maxDateDate = new Date(maxDate).getDate();
        if (parseInt(month) === 2){
          // 2月
          if (this.isLeap(parseInt(year))){
            // 是润年
            monthDate[1] = 29;
          }else {
            // 是平年
            monthDate[1] = 28;
          }
        }
        let x = monthDate[parseInt(month) - 1];
        for (let i=0;i<x;i++){
          let obj = {};
          obj.val = i+1;
          obj.text = i+1;
          obj.active = false;
          if (year === parseInt(comDay[0]) && month === parseInt(comDay[1]) && obj.val === parseInt(comDay[2])){
            obj.active = true;
          }else {
            obj.active = false;
          }

          // 添加minDate maxDate标记

          if (minDate){
            if (year < minDateYear){
              obj.isDisabled = true;
            }else if (year === minDateYear){
              if (month < minDateMouth){
                obj.isDisabled = true;
              }else if (month === minDateMouth){
                if (obj.val < minDateDate){
                  obj.isDisabled = true;
                }
              }
            }
          }
          if (maxDate){
            if (year > maxDateYear){
              obj.isDisabled = true;
            }else if (year === maxDateYear){
              if (month > maxDateMouth){
                obj.isDisabled = true;
              }else if (month === maxDateMouth){
                if (obj.val > maxDateDate){
                  obj.isDisabled = true;
                }
              }
            }
          }
          currentMonthDate.push(obj);
        }
        dateStrEnd = year + '-' + month + '-' +monthDate[parseInt(month) - 1];
        switch (this.getWeek(dateStrStart)){
          case '星期日':
            break;
          case '星期一':
            for (let i=0;i<1;i++){
              currentMonthDate.unshift(objNull);
            }
            break;
          case '星期二':
            for (let i=0;i<2;i++){
              currentMonthDate.unshift(objNull);
            }
            break;
          case '星期三':
            for (let i=0;i<3;i++){
              currentMonthDate.unshift(objNull);
            }
            break;
          case '星期四':
            for (let i=0;i<4;i++){
              currentMonthDate.unshift(objNull);
            }
            break;
          case '星期五':
            for (let i=0;i<5;i++){
              currentMonthDate.unshift(objNull);
            }
            break;
          case '星期六':
            for (let i=0;i<6;i++){
              currentMonthDate.unshift(objNull);
            }
            break;
        }
        switch (this.getWeek(dateStrEnd)){
          case '星期日':
            for (let i=0;i<6;i++){
              currentMonthDate.push(objNull);
            }
            break;
          case '星期一':
            for (let i=0;i<5;i++){
              currentMonthDate.push(objNull);
            }
            break;
          case '星期二':
            for (let i=0;i<4;i++){
              currentMonthDate.push(objNull);
            }
            break;
          case '星期三':
            for (let i=0;i<3;i++){
              currentMonthDate.push(objNull);
            }
            break;
          case '星期四':
            for (let i=0;i<2;i++){
              currentMonthDate.push(objNull);
            }
            break;
          case '星期五':
            for (let i=0;i<1;i++){
              currentMonthDate.push(objNull);
            }
            break;
          case '星期六':
            break;
        }
        return currentMonthDate;
      },
      getCalendarYear(start,end,year,minDate,maxDate){
        let years = [];
        let minDateYear = new Date(minDate).getFullYear(),
            maxDateYear = new Date(maxDate).getFullYear();
        for (let i=start;i<=end;i++){
          let obj = {};
          obj.val = i;
          obj.text = i;
          if (obj.val === parseInt(year)){
            obj.active = true;
          }else {
            obj.active = false;
          }
          obj.isDisabled = false;
          // 添加minDate maxDate标记
          if (minDate){
            if (obj.val < minDateYear){
              obj.isDisabled = true;
            }
          }
          if (maxDate){
            if (obj.val > maxDateYear){
              obj.isDisabled = true;
            }
          }
          years.push(obj);
        }
        return years;
      },
      getCalendarMonth(curYear,curMonth,minDate,maxDate){
        let month = [
              {
                val: 1,
                text: '一月',
                active: false,
                isDisabled: false
              },
              {
                val: 2,
                text: '二月',
                active: false,
                isDisabled: false
              },
              {
                val: 3,
                text: '三月',
                active: false,
                isDisabled: false
              },
              {
                val: 4,
                text: '四月',
                active: false,
                isDisabled: false
              },
              {
                val: 5,
                text: '五月',
                active: false,
                isDisabled: false
              },
              {
                val: 6,
                text: '六月',
                active: false,
                isDisabled: false
              },
              {
                val: 7,
                text: '七月',
                active: false,
                isDisabled: false
              },
              {
                val: 8,
                text: '八月',
                active: false,
                isDisabled: false
              },
              {
                val: 9,
                text: '九月',
                active: false,
                isDisabled: false
              },
              {
                val: 10,
                text: '十月',
                active: false,
                isDisabled: false
              },
              {
                val: 11,
                text: '十一月',
                active: false,
                isDisabled: false
              },
              {
                val: 12,
                text: '十二月',
                active: false,
                isDisabled: false
              }
            ],
            comMonth = curMonth.split('-'),
            minDateYear = new Date(minDate).getFullYear(),
            minDateMouth = new Date(minDate).getMonth(),
            maxDateYear = new Date(maxDate).getFullYear(),
            maxDateMouth = new Date(maxDate).getMonth();

        // 检查时间范围
        month.forEach((item,index) => {
          if (curYear === parseInt(comMonth[0]) && item.val === parseInt(comMonth[1])){
            item.active = true;
          }
          if (this.minTime){
            if (curYear < minDateYear){
              item.isDisabled = true;
            }else if (curYear === minDateYear){
              if (item.val < minDateMouth){
                item.isDisabled = true;
              }
            }
          }
          if (this.maxTime){
            if (curYear > maxDateYear){
              item.isDisabled = true;
            }else if (curYear === maxDateYear){
              if (item.val > maxDateMouth){
                item.isDisabled = true;
              }
            }
          }
        });
        return month;
      },
      // month是加1的
      dateFormat(year = '1995',month = 1,day = 1,hours = 0,minutes = 0,seconds = 0,isTime = false){
        let rules = this.format,
            handleYear = year.toString(),
            handleMonth = parseInt(month),
            handleDay = parseInt(day),
            handleHours = parseInt(hours),
            handleMinutes = parseInt(minutes),
            handleSeconds = parseInt(seconds);
        if (this.format === 'default'){
          if (this.type === 'datetime'){
            rules = 'YYYY-MM-DD hh:mm:ss'
          }
          if (this.type === 'date'){
            rules = 'YYYY-MM-DD'
          }
          if (this.type === 'month'){
            rules = 'YYYY-MM'
          }
          if (this.type === 'year'){
            rules = 'YYYY'
          }
        }

        rules = rules.replace(/yyyy|YYYY/,handleYear);
        rules = rules.replace(/yy|YY/,handleYear.substr(-2));
        rules = rules.replace(/MM/,handleMonth > 9 ? handleMonth : '0' + handleMonth);
        rules = rules.replace(/M/g,handleMonth);
        rules = rules.replace(/dd|DD/,handleDay > 9 ? handleDay : '0' + handleDay);
        rules = rules.replace(/d|D/g,handleDay);

        rules = rules.replace(/hh|HH/,handleHours > 9 ? handleHours : '0' + handleHours);
        rules = rules.replace(/h|H/g,handleHours);
        rules = rules.replace(/mm/,handleMinutes > 9 ? handleMinutes : '0' + handleMinutes);
        rules = rules.replace(/m/g,handleMinutes);
        rules = rules.replace(/ss|SS/,handleSeconds > 9 ? handleSeconds : '0' + handleSeconds);
        rules = rules.replace(/s|S/g,handleSeconds);
        return rules;
      },
      initDateTime(){
        let initYear = new Date(this.defaultTime).getFullYear(),
            initMonth = new Date(this.defaultTime).getMonth() + 1,
            initDay = new Date(this.defaultTime).getDate(),
            initHours = new Date(this.defaultTime).getHours(),
            initMinutes = new Date(this.defaultTime).getMinutes(),
            initSeconds = new Date(this.defaultTime).getSeconds();
        switch (this.type){
          case 'datetime':
            this.year = initYear;
            this.month = initMonth;
            this.currentDate = initYear + '-' + (initMonth > 9 ? initMonth : '0' + initMonth) + '-' + (initDay > 9 ? initDay : '0' + initDay);
            this.currentTime = (initHours > 9 ? initHours : '0' + initHours) + ':' + (initMinutes > 9 ? initMinutes : '0'+initMinutes) + ':' + (initSeconds > 9 ? initSeconds : '0' + initSeconds);
            this.current = this.dateFormat(initYear,initMonth,initDay,initHours,initMinutes,initSeconds);
            // test
            this.$refs.picker1.value = this.current;
            let element1 = this.$refs.picker1;
            let evObj1 = document.createEvent('Event');
            evObj1.initEvent('input', true, true);
            element1.dispatchEvent(evObj1);
//            this.changeTime('Hours',initHours);
//            this.changeTime('Minutes',initMinutes);
//            this.changeTime('Seconds',initSeconds);
            break;
          case 'date':
            this.year = initYear;
            this.month = initMonth;
            this.day = initYear + '-' + initMonth + '-' + initDay;
            this.current = this.dateFormat(initYear,initMonth,initDay);
            // test
            this.$refs.picker1.value = this.current;
            let element2 = this.$refs.picker1;
            let evObj2 = document.createEvent('Event');
            evObj2.initEvent('input', true, true);
            element2.dispatchEvent(evObj2);
            break;
          case 'month':
            this.year2 = initYear;
            this.month2 = initYear + '-' +initMonth;
            this.current = this.dateFormat(initYear,initMonth);
            // test
            this.$refs.picker1.value = this.current;
            let element3 = this.$refs.picker1;
            let evObj3 = document.createEvent('Event');
            evObj3.initEvent('input', true, true);
            element3.dispatchEvent(evObj3);
            break;
          case 'year':
            this.year3 = initYear - 11;
            this.year4 = initYear;
            this.year5 = initYear;
            this.current = this.dateFormat(initYear);
            // test
            this.$refs.picker1.value = this.current;
            let element4 = this.$refs.picker1;
            let evObj4 = document.createEvent('Event');
            evObj4.initEvent('input', true, true);
            element4.dispatchEvent(evObj4);
            break;
        }
      },
      getOffsetTop(ele){
        let tmp = ele.offsetTop;
        let node= ele.offsetParent;
        while(node!= null){
          tmp += node.offsetTop;
          node= node.offsetParent;
        }
        return tmp;
      },
      getOffsetLeft(ele){
        let tmp = ele.offsetLeft;
        let node= ele.offsetParent;
        while(node!= null){
          tmp += node.offsetLeft;
          node= node.offsetParent;
        }
        return tmp;
      },
      formatTimestamp(options){
        let date,
            str = options.rules ? options.rules : "YYYY-MM-DD hh:mm:ss W",
            isNow = typeof(options.isNow) == "undefined" ? false : options.isNow,
            timestamp = options.timestamp ? options.timestamp : 0,
            week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        if (isNow){
          date = new Date();
        }else {
          if (timestamp.toString().length === 10){
            date = new Date(timestamp*1000);
          }
          if (timestamp.toString().length === 13) {
            date = new Date(timestamp);
          }
        }

        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

        str = str.replace(/MM/, date.getMonth() > 8 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
        str = str.replace(/M/g, date.getMonth() + 1);

        str = str.replace(/w|W/g, week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        return str;
      }
    },
    mounted(){
      // 点击外部取消弹窗
      document.body.addEventListener('click',()=>{
        this.pickerFlag = false;
        this.timePickerFlag = false;
      },false);
      // 时间选择器数据初始化
      this.initTimeItems();
      // 初始化默认值
      if (this.defaultTime){
        this.initDateTime();
      }else {
        // 没有默认值，初始化当前时间的值
        switch (this.type){
          case 'datetime':
            this.year = new Date().getFullYear();
            this.month = (new Date().getMonth())+1;
            break;
          case 'date':
            this.year = new Date().getFullYear();
            this.month = (new Date().getMonth())+1;
            break;
          case 'month':
            this.year2 = new Date().getFullYear();
            break;
          case 'year':
            this.year3 = new Date().getFullYear()-11;
            this.year4 = new Date().getFullYear();
            break;
        }
      }

      // 数据初始化
      switch (this.type){
        case 'datetime':
          this.date = this.getCalendarData(this.year,this.month,this.currentDate,this.minTime,this.maxTime);
          break;
        case 'date':
          this.date = this.getCalendarData(this.year,this.month,this.day,this.minTime,this.maxTime);
          break;
        case 'month':
          this.dateMonth = this.getCalendarMonth(this.year2,this.month2,this.minTime,this.maxTime);
          break;
        case 'year':
          this.dateYear = this.getCalendarYear(this.year3,this.year4,this.year5,this.minTime,this.maxTime);
          break;
      }

      if (!this.placeholder){
        if (this.type === 'date' || this.type === 'datetime'){
          this.placeholder = '请选择日期';
        }else if (this.type === 'month'){
          this.placeholder = '请选择月份';
        }else if (this.type === 'year'){
          this.placeholder = '请选择年份';
        }else {
          this.placeholder = '';
        }
      }
    },
    filters: {},
    watch:{
      year(curVal,oldVal){
        if (this.type === 'datetime'){
          this.date = this.getCalendarData(curVal,this.month,this.currentDate,this.minTime,this.maxTime);
        }
        if (this.type === 'date'){
          this.date = this.getCalendarData(curVal,this.month,this.day,this.minTime,this.maxTime);
        }

      },
      month(curVal,oldVal){
        if (this.type === 'datetime'){
          this.date = this.getCalendarData(this.year,curVal,this.currentDate,this.minTime,this.maxTime);
        }
        if (this.type === 'date'){
          this.date = this.getCalendarData(this.year,curVal,this.day,this.minTime,this.maxTime);
        }
      },
      year2(curVal,oldVal){
        this.dateMonth = this.getCalendarMonth(curVal,this.month2,this.minTime,this.maxTime);
      },
      year3(curVal,oldVal){
        this.dateYear = this.getCalendarYear(this.year3,this.year4,this.year5,this.minTime,this.maxTime);
      },
      defaultTime(curVal,oldVal){
        this.initDateTime();
      },
      minTime(curVal,oldVal){
        // 数据初始化
        switch (this.type){
          case 'datetime':
            this.date = this.getCalendarData(this.year,this.month,this.currentDate,this.minTime,this.maxTime);
            break;
          case 'date':
            this.date = this.getCalendarData(this.year,this.month,this.day,this.minTime,this.maxTime);
            break;
          case 'month':
            this.dateMonth = this.getCalendarMonth(this.year2,this.month2,this.minTime,this.maxTime);
            break;
          case 'year':
            this.dateYear = this.getCalendarYear(this.year3,this.year4,this.year5,this.minTime,this.maxTime);
            break;
        }
      },
      maxTime(curVal,oldVal){
        // 数据初始化
        switch (this.type){
          case 'datetime':
            this.date = this.getCalendarData(this.year,this.month,this.currentDate,this.minTime,this.maxTime);
            break;
          case 'date':
            this.date = this.getCalendarData(this.year,this.month,this.day,this.minTime,this.maxTime);
            break;
          case 'month':
            this.dateMonth = this.getCalendarMonth(this.year2,this.month2,this.minTime,this.maxTime);
            break;
          case 'year':
            this.dateYear = this.getCalendarYear(this.year3,this.year4,this.year5,this.minTime,this.maxTime);
            break;
        }
      }
    },
  }
</script>


<style scoped>
  .picker-ipt{
    box-sizing: border-box;
    position: relative;
    color: #606266;
  }
  .picker-ipt:hover{
    border-color: #409eff;
  }
  .picker-ipt-container{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .picker-ipt-ico{
    width: 32px;
  }
  .picker-ipt-ico i{
    display: block;
    padding: 0px 8px;
    width: 50%;
    color: #8a8a8a;
  }
  .picker-ipt-text{
    box-sizing: border-box;
    display: block;
    background:none;
    outline:none;
    border: 1px solid #ccc;
    border-radius: 0px;
    padding-left: 30px;
    font-size: 13px;
    color: transparent!important;
    text-align: left;
    position: relative;
    z-index: 10;
    left: -31px;
  }
  .picker-ipt-text:focus{
    border: none;
  }
  .picker-ipt-text::-webkit-input-placeholder{
    color: #aaa;
  }
  .picker-ipt-text:-moz-placeholder{
    color: #aaa;
  }
  .picker-ipt-text:-ms-input-placeholder{
    color: #aaa;
  }
  
  .picker-ipt-text2{
    box-sizing: border-box!important;
    background: none!important;
    border: none!important;
    border-radius: 0!important;
    color: #606266!important;
    min-width: 33px!important;
    width: 100%!important;
    outline: none!important;
    -webkit-appearance: none!important;
    -moz-appearance: none!important;
    appearance: none!important;
    transition: background .5s!important;
    box-shadow: none!important;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 11;
  }
  
  .picker{
    position: absolute;
    left: 0px;
    z-index: 14;
    max-height: 407px;
    width: 325px;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 4px;
    padding: 10px 10px 20px 10px;
  }
  .picker-header{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
  }
  .picker-header-item{
    box-sizing: border-box;
    /*flex: 1;*/
    margin: 0px 5px;
    cursor: pointer;
    width: 15px;
    height: 15px;
  }
  .picker-header-item i{
    font-size: 13px;
    display: block;
    color: #8a8a8a;
  }
  .picker-header-item i:hover{
    color: #409eff;
  }
  .picker-header-date{
    flex: 4;
    cursor: pointer;
    text-align: center;
  }
  .picker-week{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
  .picker-week-item{
    width: 14.28%;
    text-align: center;
  }
  .picker-date{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid #eee;
  }
  .picker-date-item{
    width: 14.28%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .picker-month-item{
    width: 25%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .picker-year-item{
    width: 25%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .picker-date-item-text{
    display: inline-block;
    width: 24px;
    line-height: 24px;
    color: #333;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
    text-align: center;
  }
  .picker-month-item-text,.picker-year-item-text{
    display: inline-block;
    padding: 2px 5px;
    color: #333;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
    text-align: center;
  }
  .current-date{
    border-radius: 50%;
    background: #409eff;
    color: #fff;
  }
  .disabled-current-date,
  .disabled-current-month,
  .disabled-current-year{
    color: #999;
    cursor: not-allowed;
  }
  .disabled-current-date:hover,
  .disabled-current-month:hover,
  .disabled-current-year:hover{
    color: #999!important;
  }
  .current-month,.current-year{
    border-radius: 3px;
    background: #409eff;
    color: #fff;
  }
  .picker-date-item-text:hover{
    color: #409eff;
  }
  .current-date:hover{
    color: #fff;
  }
  .picker-month-item-text:hover,
  .picker-year-item-text:hover{
    color: #409eff;
  }
  .current-month:hover,
  .current-year:hover{
    color: #fff;
  }
  
  .picker-datetime{
    display: flex;
    margin-bottom: 10px;
  }
  .picker-datetime-item{
    flex: 1;
    padding: 5px;
    text-align: center;
  }
  
  .picker-datetime-item span{
    display: inline-block;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    text-align: center;
    font-size: 13px;
  }
  .picker-datetime-item span:hover{
    border: 1px solid #409eff;
  }
  
  .picker-datetime-item.timePick{
    position: relative;
  }
  
  .picker-datetime-time{
    position: absolute;
    z-index: 15;
    width: 141px;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    padding: 5px 10px;
    background: #fff;
  }
  .datetime-content{
    display: flex;
    position: relative;
  }
  
  .datetime-content-select{
    position: absolute;
    z-index: 16;
    top: 70px;
    left: 0px;
    width: 141px;
    height: 35px;
    border-top: 1px solid #409eff;
    border-bottom: 1px solid #409eff;
  }
  
  .datetime-content-grounp{
    position: relative;
    z-index: 17;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 177px;
    overflow-y: scroll;
  }
  
  .datetime-content-grounp::-webkit-scrollbar{
    display: none;
  }
  
  .datetime-content-item1,
  .datetime-content-item2,
  .datetime-content-item3{
    flex: none;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #ccc;
    cursor: pointer;
    text-align: center;
  }
  .datetime-content-item1-current,
  .datetime-content-item2-current,
  .datetime-content-item3-current{
    color: #409eff;
  }
  .datetime-foot{
    display: flex;
    flex-direction: row-reverse;
  }
  .datetime-foot-btn{
    padding: 5px 5px 5px 0px;
    margin-left: 5px;
    font-size: 13px;
    color: #555;
    background: #fff;
    cursor: pointer;
  }
  .datetime-foot-btn.success{
    color: #409eff;
  }
</style>