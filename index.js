var page = {
	content:$('.content'),
	stat0: "",
	sort_key: 16,
	pn: 0,
	init:function(){
		this.getData();
		this.typeClick();
		this.sortkeyClick();
		this.pageClick();
	},
	typeClick:function(){
		var _this = this;
		$('.sort-type .tag').click(function(){
			$(this).addClass('selected').siblings().removeClass('selected');
			$('.page .page-num').eq(0).addClass('selected')
				.siblings().removeClass('selected');
			var tag = $(this).html();
			_this.stat0 = (tag == "全部" ? "" : tag);
			_this.pn = 0;
			_this.getData();
		});
	},
	sortkeyClick:function(){
		var _this = this;
		$('.sort-key .sort-item').click(function(){
			$(this).addClass('selected').siblings().removeClass('selected');
			_this.sort_key = $(this).attr('sort_key');
			_this.pn = 0;
			_this.getData();
		});
	},
	pageClick:function(){
		var _this = this;
		$('.page .page-num').click(function(){
			$(this).addClass('selected').siblings().removeClass('selected');
			_this.pn = ($(this).html()-1)*8;
			_this.getData();
		});
	},
	getData:function(){
		var _this = this;
		var Id = layer.open({
			type:3,
			offset:['350px','400px']
		});
		$.ajax({
			url:"https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=28286&query=电影&sort_type=1&rn=8",
			data:{
				stat0: _this.stat0,
				sort_key: _this.sort_key,
				pn: _this.pn
			},
			dataType:'jsonp',
			jsonp:'cb',
			success:function(data){
				_this.renderData(data);
				layer.close(Id);
			}
		});
	},
	renderData:function(r){
		var result = r.data[0].result;
		var con = '';
		for(var i=0,len=result.length; i<len; i++){
			con += '<div class="move-item">'
					+'<img src="'+result[i].kg_pic_url+'">'
					+'<p class="move-name">'+result[i].ename+'</p>'
					+'<p class="move-score">'+result[i].additional+'</p>'
				+'</div>';
		};
		this.content.html(con);
	}
}
page.init();