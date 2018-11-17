Page({
  /**
   * 页面的初始数据
   */
  data: {
    ducation: ["初中以下", "高中", "大专", "本科", "硕士", "博士"],
    sex: ["男", "女"],
    age: ["18岁以下", "18-24岁", "25-30岁", "30岁以上"],
    base: ["零基础", "绘画基础", "网络相关", "原型设计"],
    major: ["无专业", "计算机相关", "理工科", "文科"],
    logic: ["渣渣", "普通", "卓越"],
    userInfo: {
      ducation: 1, 
      sex: 0,
      age: 1,
      base: 1,
      major: 1,
      logic: 1
    },
    rule: [
      { //css
        xl: [1, 2, 3, 5, 5, 3],
        xb: [5, 5],
        nl: [5, 5, 5, 4],
        jc: [4, 5, 5, 5],
        zy: [5, 4, 4, 5],
        lj: [5, 5, 5]
      },
      { //js
        xl: [1, 2, 3, 5, 5, 5],
        xb: [5, 5],
        nl: [5, 5, 5, 4],
        jc: [3, 5, 5, 5],
        zy: [5, 4, 3, 5],
        lj: [5, 5, 5]
      },
      {  //Android
        xl: [0, 2, 3, 5, 5, 5],
        xb: [5, 5],
        nl: [4, 4, 5, 4],
        jc: [6, 6, 6, 6],
        zy: [5, 4, 6, 6],
        lj: [6, 6, 5]
      },
      {  //ios
        xl: [0, 2, 3, 5, 5, 5],
        xb: [5, 5],
        nl: [4, 4, 5, 4],
        jc: [4, 5, 3, 6],
        zy: [5, 4, 4, 5],
        lj: [3, 6, 5]
      },
      {  //JAVA
        xl: [-3, 0, 1, 3, 7, 9],
        xb: [7, 3],
        nl: [4, 4, 3, 6],
        jc: [3, 6, 7, 3],
        zy: [3, 6, 3, 6],
        lj: [7, 3, 3]
      },
      {  //op
        xl: [0, 3, 3, 5, 5, 3],
        xb: [5, -5],
        nl: [5, 5, 4, 2],
        jc: [4, 5, 6, 7],
        zy: [4, 2, 4, 5],
        lj: [6, 7, 4]
      },
      {  //pm
        xl: [2, 2, 3, 5, 5, 7],
        xb: [5, 5],
        nl: [3, 6, 4, 4],
        jc: [6, 4, 2, 9],
        zy: [4, 4, 6, 4],
        lj: [2, 9, 4]
      },
      {  //ui
        xl: [2, 2, 3, 5, 7, 5],
        xb: [4, 6],
        nl: [4, 7, 4, 3],
        jc: [2, 4, 5, 7],
        zy: [4, 3, 2, 4],
        lj: [5, 7, 4]
      },
    ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(this)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("页面渲染完毕")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("页面显示");


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("页面关闭")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("下拉")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉")

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindPickerChange: function(e) {
    console.log(e)
    console.log(this)
    let x = e.target.id;
    var that = this;

    switch (x) {
      case "ducation":
        that.setData({
          "userInfo.ducation": e.detail.value
        });
        break;
      case "sex":
        that.setData({
          "userInfo.sex": e.detail.value
        });
        break;
      case "age":
        that.setData({
          "userInfo.age": e.detail.value
        });
        break;
      case "base":
        that.setData({
          "userInfo.base": e.detail.value
        });
        break;
      case "major":
        that.setData({
          "userInfo.major": e.detail.value
        });
        break;
      case "logic":
        that.setData({
          "userInfo.logic": e.detail.value
        });
        break;
    }
    console.log(that.data)
  },
  submit:function(){
    var that=this.data;
    console.log(that);  
    // console.log(that.userInfo.ducation)
    console.log(that.rule[1].xl[that.userInfo.ducation]);
    //将rule中的数字给输出来
    // 统计每个职业的分数,选出最高的三个分数
    var score = [];
    for (var i = 0; i < that.rule.length;i++) {
    score[i] = {
      grade: that.rule[i].xl[that.userInfo.ducation] +
      that.rule[i].xb[that.userInfo.sex] +
      that.rule[i].nl[that.userInfo.age] +
      that.rule[i].jc[that.userInfo.base] +
      that.rule[i].zy[that.userInfo.major] +
      that.rule[i].lj[that.userInfo.logic],
      index:i
      //代表科目的身份
    }
    }
    console.log(score)
    //得到socre总分
    //排序sort()方法,冒泡排序
    function compare(prop) {
      return function(a,b) {
      var  value1 = a[prop];
      var  value2 = b[prop];
       return value2-value1
      }
    }
    score.sort(compare("grade"))
    console.log(score);
    var newScore = score.slice(0,3);
    
    wx.navigateTo({
        url: '../result/result?list=' + JSON.stringify(newScore),
    })
    console.log(newScore);
  }

})