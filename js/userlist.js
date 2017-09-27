//模块二：用户管理
//功能点一：分页查询用户信息
function loadUserByPage(pno){
    $.ajax({
        type:"POST",
        url:"data/userlist.php",
        data:{pno:pno},
        success:function(pager){
            //console.log(data);
            var html="";
            for(var p of pager.data){
                html+=`
              <tr>
                <td>     
                      <input type="checkbox">   
                </td>
                <td>${p.uid}</td>
                <td>${p.avatar}</td>
                <td>${p.uname}</td>
                <td>${p.user_name}</td>
                <td>${p.gender}</td>
                <td>${p.email}</td>
                <td>
                   <a href="${p.uid}" class="detail_p">详情</a>
                   <a href="${p.uid}_${p.price}" class="update_p">修改</a>
                   <a href="${p.uid}" class="del_p">删除</a>
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
        },
        error:function(){
            alert("您的网络有问题，请检查网络");
        }
    });
}
loadUserByPage(3);
//功能点二：为不同页码绑定单据事件获取不同页中用户信息
$("#pagination").on("click","li a",function(e){
    e.preventDefault();
    var pno=$(this).attr("href");
    loadUserByPage(pno);
});
//功能点三：删除
$("#tb1").on("click","a.del_p",function(e){
    e.preventDefault();
    var uid=$(this).attr("href");
    var that=this;
    var rs=window.confirm("您是否要删除该数据");
    if(!rs){
        return;
    }
    $.ajax({
        type:"POST",
        url:"data/user_del.php",
        data:{uid:uid},
        success:function(data){
            //console.log(data);
            if(data.code>0){
                var tr=$(that).parent().parent();
                alert("删除成功");
                tr.remove();
            }
        },
        error:function(){
            alert("您的网络有问题，请检查网络");
        }
    });
});
//功能点四：更新{密码}
//功能点五：详细{头像上传功能}
