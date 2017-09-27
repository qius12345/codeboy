//功能一：分页显示商品列表
//1、创建函数发送AJAX请求获取当前页的内容，并且创建分页条
//2、参数pno 当前页码1 2 3 4
function loadProductByPage(pno){
    //发送AJAX请求
    $.ajax({
        type:"GET",
        url:"data/xz_productlist_page.php",
        data:{pno:pno},
        success:function(pager){
            //console.log(pager);
            //5、获取返回数据
            //6、拼接字符串动态创建表格并且添加数据
            var html="";
            for(var p of pager.data){
                html+=`
              <tr>
                <td>         
                  <input type="checkbox">                    
                </td>
                <td>${p.lid}</td>
                <td>${p.sm}</td>
                <td>${p.fname}</td>
                <td>${p.title}</td>
                <td>${p.spec}</td>
                <td>${p.price}</td>
                <td>
                   <a href="${p.lid}" class="detail_p">详情</a>
                   <a href="${p.lid}_${p.price}" class="update_p">修改</a>
                   <a href="${p.lid}" class="del_p">删除</a>
                </td>
              </tr> 
               `;
            }
            $("#tb1").html(html);
            //7、获取总页数  pager.pageCount
            //8、拼接字符串动态创建页码
            var html="";
            //判断是否显示上上一页
            if(pager.pno-2>0){
                html+=`<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
            }
            //判断是否显示上一页
            if(pager.pno-1>0){
                html+=`<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
            }
            html+=`<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
            //判断是否显示下一页
            if(pager.pno+1<=pager.pageCount){
                html+=`<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
            }
            //判断是否显示下下一页
            if(pager.pno+2<=pager.pageCount){
                html+=`<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
            }
            $("#pagination").html(html);
        },
        error:function(pager){
            alert("网络出现故障，请检查");
        }
    });
}
loadProductByPage(4);
//为页面绑定单击事件，由于页码是动态生成
//使用事件代理机制完成绑定
$("#pagination").on("click","li a",function(e){
    e.preventDefault();
    var pno=$(this).attr("href");
    loadProductByPage(pno);
});

//功能二：删除指定商品
//1、获取商品的删除按钮绑定单击事件
//动态生成数据一定用事件代理绑定
$("#tb1").on("click","a.del_p",function(e){
   e.preventDefault();
   //console.log("1:"+this);
   //2、获取商品编号
   var lid=$(this).attr("href");
   var that=this;
   //console.log("2:"+lid);
//3、显示确认框，再次确认用户是否要删除该数据
   var rs=window.confirm("您是否要删除该数据？");
   if(rs==false){
       return;
   }
   //console.log("3:");
//4、发送AJAX请求 data/product_del.php
   $.ajax({
       type:"POST",
       url:"data/product_del.php",
       data:{lid:lid},
       success:function(data){
           //console.log(data);
           if(data.code>0){
               var tr=$(that).parent().parent();
               tr.remove();
           }
       },
       error:function(){
           alert("网络发生故障，请检查");
       }
   });
});

//功能三：完成商品更新操作
//1、获取更新按钮，绑定单击事件，使用事件代理
$("#tb1").on("click","a.update_p",function(e){
    e.preventDefault();
    //2、获得更新商品编号，商品价格
    var href=$(this).attr("href").split("_");
    var lid=href[0];
    var price=href[1];
    //console.log(lid);
    //console.log(price);
    //3、显示更新div
    $("#old_price").val(price);
    $("#lid").val(lid);
    $("#update_message").css("display","block");
    //4、并且将商品价格与商品编号添加到div中
});
//5、为更新div中“更新”按钮绑定点击事件
$("#btn2").click(function(){
    //6、获取商品价格与编号
    var p=$("#old_price").val();
    var l=$("#lid").val();
    $.ajax({
        type:"POST",
        url:"data/product_update_price.php",
        data:{lid:l,price:p},
        success:function(data){
            console.log(data);
            $("#update_message").css("display","none");
        },
        error:function(){
            alert("您的网络有问题，请检查网络");
        }
    });
});