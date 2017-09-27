/**
 * Created by WEB-UID-JAVA on 2017/9/19.
 */
$(function(){
    $.ajax({
        type:"GET",
        url:"data/xz_productlist.php",
        success:function(data){
            var html="";
            for(var d of data){
                html+=`
              <tr>
                <th>
                  <div class="checkbox" style="margin: 0;">
                    <label>
                      <input type="checkbox">
                    </label>
                  </div>
                </th>
                <th>${d.lid}</th>
                <th>???</th>
                <th>${d.lname}</th>
                <th>${d.title}</th>
                <th>${d.spec}</th>
                <th>${d.price}</th>
                <th>
                   <a href="#">删除</a>
                   <a href="#">修改</a>
                   <a href="#">详情</a>
                </th>
              </tr>  
              `;
            }
            $("#tb1").html(html);
        },
        error:function(data){
            alert("您的网络有问题，请检查网络");
        }
    })
});