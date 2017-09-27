//模块三：订单管理
//功能一：分页查询订单信息
function loadOrderByPage(pno,pgs){
    $.ajax({
        type:"POST",
        url:"data/orderlist.php",
        data:{pno:pno,pageSize:pgs},
        success:function(pager){
            //console.log(pager);
            var html="";
            for(var p of pager.data){
                html+=`
              <tr>
                <td>     
                      <input type="checkbox" class="olist">   
                </td>
                <td>${p.aid}</td>
                <td>${p.uname}</td>
                <td>${p.status}</td>
                <td>${p.order_time}</td>
                <td>${p.pay_time}</td>
                <td>${p.received_time}</td>
                <td>
                   <a href="${p.aid}" class="detail_p">详情</a>
                   <a href="${p.aid}_${p.status}" class="update_p">修改</a>
                   <a href="${p.aid}" class="del_p">删除</a>
                </td>
              </tr> 
               `;
            }
            $("#tb1").html(html);
            var html="";
            if(pager.pno-2>0){
                html+=`<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
            }
            if(pager.pno-1>0){
                html+=`<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
            }
            html+=`<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
            if(pager.pno+1<=pager.pageCount){
                html+=`<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
            }
            if(pager.pno+2<=pager.pageCount){
                html+=`<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
            }
            $("#pagination").html(html);
            $("#pagination").on("click","li a",function(e){
                e.preventDefault();
                var pno=$(this).attr("href");
                loadOrderByPage(pno,8);
            });
        },
        error:function(){
            alert("您的网络有问题，请检查网络");
        }
    });
}
loadOrderByPage(3,8);
//全选
//复选框：checked=true false
//属性比较特殊：prop
//获取全选按钮
//绑定单击事件
$("#all").click(function(){
    //获取全选按钮的checked状态
    var state=$(this).prop("checked");
    $(".olist").prop("checked",state);
});

//功能二：删除
$("#tb1").on("click","a.del_p",function(e){
    e.preventDefault();
   var aid=$(this).attr("href");
   var that=this;
   var rs=window.confirm("是否删除该订单？");
   if(rs==false){
       return;
   }
   $.ajax({
       type:"POST",
       url:"data/order_del.php",
       data:{aid:aid},
       success:function(pager){
           if(pager.code>0){
               var tr=$(that).parent().parent();
               tr.remove();
           }
       },
       error:function(){
           alert("您的网络有问题，请检查网络");
       }
   });
});