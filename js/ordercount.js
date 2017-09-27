//1、绘制销售统计图
//1、初始化图标
var myChart=echarts.init(document.getElementById('main'));
$.ajax({
    type:"GET",
    url:"data/ordercount.php",
    success:function(data){
        //console.log(data);
        var option = {
            title: {
                text: '学子商城销售统计'
            },
            tooltip: {},
            legend: {
                data:['销量统计']
            },
            xAxis: {
                data:data.name
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: data.data
            }]
        };
        myChart.setOption(option);
    },
    error:function(){
        alert("网络故障，请检查");
    }
});
//2、发送AJAX请求
//3、创建参数数组
//4、应用参数数组