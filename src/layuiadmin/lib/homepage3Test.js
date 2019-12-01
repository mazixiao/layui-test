
    // 号码验证(手机 + 固话)
    function checkPhoness(phone){
      if(!(/^(0\d{2,3}-?)?\d{5,8}$/.test(phone)) && !(/^1[34578]\d{9}$/.test(phone))){
          return false;
      } else {
          return true;
      }
    };

    // 邮箱认证
    function checkEmail(email){
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (!re.test(email)) {
          return false;
      } else {
          return true;
      }
    };



// layui.use('layedit', function(){
//   var layedit = layui.layedit;
//   layedit.build('demo'); //建立编辑器
// });


layui.use(['form', 'layedit', 'laydate', 'layer'], function() {
  var form = layui.form,
  layer = layui.layer,
  //编辑器
  layedit = layui.layedit,
  laydate = layui.laydate,
  //由于layer弹层依赖jQuery，所以可以直接得到
  $ = layui.$,
  layer = layui.layer;
 
  //自定义验证规则
  form.verify({
    names: function(value){
      if(value === ''){
        return '姓名不能为空';
      }
    },

    phone: function(value){
      if(!checkPhoness(value)){
        return '请输入正确的号码格式';
      }
    },

    email: function(value){
      if(!checkEmail(value)){
        return '请输入正确的邮箱格式';
      }
    },
  });



  //建立编辑器
  layedit.build('demo11', {
    //设置编辑器高度
    height: 180, 
    tool: [
      //加粗
      'strong',
      //斜体
      'italic', 
      //下划线
      'underline', 
      //删除线
      'del', 
      //分割线
      '|' ,
      //左对齐
      'left',
      //居中对齐 
      'center', 
      //右对齐
      'right', 
      //超链接
      'link', 
      //清除链接
      'unlink', 
      //表情
      'face', 
      //插入图片
      'image', 
      //帮助
      'help' 
    ]

  });




  // 弹层 触发事件
  var layerActive = {
    didi: function() {
      var that = this; 
      //多窗口模式，层叠置顶
      layer.open({
        //开启遮罩关闭
        shadeClose: true, 
        type: 1 ,
        title: '当你选择该窗体时，即会在最顶端',
        area: ['500px', '260px'],
        shade: 0.5,
        maxmin: true,
        //为了演示，随机坐标
        offset: [ ] ,
        content: '我是内容滴滴滴',
        //只是为了演示
        btn: ['保存', '全部关闭'], 
        yes: function(){
          // $(that).click(); 
          layer.closeAll();
        },
        btn2: function(){
          layer.closeAll();
        },
        //重点1
        zIndex: 999, 
        success: function(layero){
          //重点2
          layer.setTop(layero); 
        }
      });
    },
    setTop: function(){
      var that = this; 
      //多窗口模式，层叠置顶
      layer.open({
        type: 2 //此处以iframe举例
        ,title: '当你选择该窗体时，即会在最顶端'
        ,area: ['390px', '260px']
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
          Math.random()*($(window).height()-300)
          ,Math.random()*($(window).width()-390)
        ] 
        ,content: '//layer.layui.com/test/settop.html'
        ,btn: ['继续弹出', '全部关闭'] //只是为了演示
        ,yes: function(){
          $(that).click(); 
        }
        ,btn2: function(){
          layer.closeAll();
        }
        
        ,zIndex: layer.zIndex //重点1
        ,success: function(layero){
          layer.setTop(layero); //重点2
        }
      });
    }
    ,confirmTrans: function(){
      //配置一个透明的询问框
      layer.msg('大部分参数都是可以公用的<br>合理搭配，展示不一样的风格', {
        time: 20000, //20s后自动关闭
        btn: ['明白了', '知道了', '哦']
      });
    }
    ,notice: function(){
      //示范一个公告层
      layer.open({
        type: 1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['火速围观', '残忍拒绝']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
        ,success: function(layero){
          var btn = layero.find('.layui-layer-btn');
          btn.find('.layui-layer-btn0').attr({
            href: 'http://www.layui.com/'
            ,target: '_blank'
          });
        }
      });
    }
    ,offset: function(othis){
      var type = othis.data('type')
      ,text = othis.text();
      
      layer.open({
        type: 1
        ,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        ,id: 'layerDemo'+type //防止重复弹出
        ,content: '<div style="padding: 20px 100px;">'+ text +'</div>'
        ,btn: '关闭全部'
        ,btnAlign: 'c' //按钮居中
        ,shade: 0 //不显示遮罩
        ,yes: function(){
          layer.closeAll();
        }
      });
    }
  };
  
  $('.layui-btn').on('click', function(){
    var othis = $(this), method = othis.data('method');
    layerActive[method] ? layerActive[method].call(this, othis) : '';
  });



  $("#tip-layer").click(function() {
    // layer.msg('玩命提示中...');
  
    layer.msg('玩命提示中玩命提示中玩命提示中玩命提示中玩命提示中玩命提示中玩命提示中...', {
      time: 20000, //20s后自动关闭
      btn: ['明白了', '知道了']
    });
  
  });








  
});



  layui.use(['table', 'carousel'], function(){
    var table = layui.table;
    // 轮播图
    var carousel = layui.carousel;
    table.render({
      elem: '#test'
      ,url: layui.setter.base + 'json/console/homepage3Test.js' //模拟接口
      ,cols: [[
        {field:'id', width:80, title: 'ID', sort: true}
        ,{field:'username', width:80, title: '用户名'}
        ,{field:'sex', width:80, title: '性别', sort: true}
        ,{field:'city', width:80, title: '城市'}
        ,{field:'sign', title: '签名', minWidth: 150}
        ,{field:'experience', width:80, title: '积分', sort: true}
        ,{field:'score', width:80, title: '评分', sort: true}
        ,{field:'classify', width:80, title: '职业'}
        ,{field:'wealth', width:135, title: '财富', sort: true}
      ]]
      ,page: true
    });

    table.render({
      elem: '#test2'
      ,url: layui.setter.base + 'json/console/homepage3Test.js' //模拟接口
      ,cols: [[
        {field:'id', width:80, title: 'ID', sort: false}
        ,{field:'username', width:80, title: '用户名'}
        ,{field:'sex', width:80, title: '性别', sort: true}
        ,{field:'city', width:80, title: '城市'}
        ,{field:'sign', title: '签名', minWidth: 150}
        ,{field:'experience', width:80, title: '积分', sort: true}
        ,{field:'score', width:80, title: '评分', sort: true}
        ,{field:'classify', width:80, title: '职业'}
        ,{field:'操作', width:135, title: '操作', sort: false}
      ,{width:178, align:'center',title: '操作', fixed: 'right', toolbar: '#test-table-operate-barDemo'}
      ]]
      ,page: true
    });





    //常规轮播
    carousel.render({
      elem: '#test1',
      arrow: 'always',
      interval: 1800,
      // anim: 'fade',
      height: '120px'
    });


  });

layui.use('layer', function(){ //独立版的layer无需执行这一句
  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
  
  $(".watch").hover(function() {
    $(this).find('img').show();
  }, function() {
    $(this).find('img').hide();
  })
  
});

