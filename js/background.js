var storage = chrome.storage.local;
var newCacheData = '';
var userid = '';

/*storage.set({'storage_cacheData': ''}, function() {
	console.log('Data is in Cache reset.');
});*/

storage.remove('storage_cacheData', function(isactive) {
	console.log('Cache Reset.');
 });

setInterval(function(){	
//alert('1');
	storage.get('storage_userid', function(itemsid) {
		if (itemsid.storage_userid && itemsid.storage_userid !='')
		{
			//alert('1.1');
			userid = itemsid.storage_userid;
			/////////////////////////////////////////////
			var ajxurl = 'http://64.91.230.110/data/AjaxQueryHandler.cfc?MemberId=' + userid;
			$.ajax({
				url: ajxurl,
				data:
				{
					method: 'GetUserItems'
				},
				success: function(data)
				{
					//alert('1.3');
					////////////////////////////Update Cache///////////////////////////////////////////////////////////
					var retJSONArray = jQuery.parseJSON( data );

					for(i=0; i<retJSONArray.length; i++)
					{
						var j = i+1;
						var fType = 'Price drops to $'+Math.round(retJSONArray[i].TargetPrice*Math.pow(10,2))/Math.pow(10,2);
						if (retJSONArray[i].AnyDrop == 1)
						{
							fType = 'price is lower';
						}
						else if(retJSONArray[i].InStock == 1)
						{
							fType = 'item is available';
						}

						colCriteris = '';
						/*chrome.browserAction.setIcon({path: 'http://64.91.230.110/data/normal_icon.png'})*/
						chrome.browserAction.setIcon({path: "/images/normal_icon.png"});
						if (retJSONArray[i].IsHighLight == 1)
						{
							var colCriteris = 'style="background:#83bb16;"';
							//var colCriteris = 'style="background:#80c908;"';
							/*chrome.browserAction.setIcon({path: 'http://64.91.230.110/data/dollar_sign.jpg'})*/
							var colorName = "Green";
							chrome.browserAction.setIcon({path: "/images/alert_icon.png"});
						}

						var imgPath = retJSONArray[i].ImageSmall;
						if (retJSONArray[i].ImageSmall == '')
						{
							imgPath = '../images/noimage.jpg';
						}

						/*var ItemURL = retJSONArray[i].URL;
						arTmp = ItemURL.split("?");
						intialItemURL = arTmp[0];
						remainingItemURL = arTmp[1];
						// /
						arTmp = remainingItemURL.split("&");*/
						
						var ItemURL = retJSONArray[i].URL;
						arTmp = ItemURL.split("/");
						subArray = arTmp[5].split("?");
						intialItemURL = 'http://'+arTmp[2]+'/'+arTmp[4]+'/'+subArray[0]+'?tag=epricedcom-20';

						//'+retJSONArray[i].MemberID+'

						<!--newCacheData =  newCacheData + '<div id="product_main_div_'+retJSONArray[i].ProductNumber+'" '+colCriteris+' class="main_cont"><div class="img_cont"><span id="lbl_number" class="numb">'+j+'.</span><span class="img"><a id="link_productImage" href="'+intialItemURL+'" target="_blank" ><img id="procuct_image" src="'+imgPath+'" alt="" /></a></span></div><div class="content2"><div class="anc_head"><a id="link_productName" href="'+intialItemURL+'" target="_blank" >'+retJSONArray[i].ProductTitle+'</a></div><div class="sml_cont"><div style="padding-bottom:4px;"><span class="price">Current Price:</span><span id="lbl_cPrice" class="mrn">$'+Math.round(retJSONArray[i].CurrentPrice*Math.pow(10,2))/Math.pow(10,2)+'</span></div><div style="padding-bottom:4px;"><span class="price">Notify if:</span><span id="lbl_Nprice" class="rd">'+fType+'</span></div></div><div class="btn_cont"><a href="'+intialItemURL+'" target="_blank" ><img id="btn_buynow" name="btn_buynow" style="cursor:pointer;" src="../images/btn_buynow.PNG" alt="Buy Now" /></a><a addthis:services_compact="facebook,twitter" addthis:services_expanded="facebook,twitter" addthis:url="'+intialItemURL+'" class="addthis_button" href="'+intialItemURL+'"><img id="btn_share" name="btn_share" style="cursor:pointer;" src="../images/btn_share.PNG" alt="Share" /></a><a href="http://64.91.230.110/data/RemoveP.cfm?redirect&usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ><img id="btn_delete_'+retJSONArray[i].ProductNumber+'_'+userid+'" name="btn_delete" style="cursor:pointer;" src="../images/btn_delete.PNG" alt="Delete" class="productDeleteC" /></a></div></div><div class="clear"></div></div><hr>';-->
						/*<a href="http://64.91.230.110/data/RemoveP.cfm?usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ></a>*/
						
						newCacheData =  newCacheData + = '<div id="product_main_div_'+retJSONArray[i].ProductNumber+'" '+colCriteris+' class="product1"><div class="product_item"><span class="img"><a id="link_productImage" href="'+intialItemURL+'" target="_blank" ><img id="procuct_image" src="'+imgPath+'" alt="" /></a></span></div><div class="product_detail"><p><a id="link_productName" href="'+intialItemURL+'" target="_blank" >'+retJSONArray[i].ProductTitle+'</a></p><div class="text1"><span class="Current">Current Price:</span><span id="lbl_cPrice" class="pound">$'+Math.round(retJSONArray[i].CurrentPrice*Math.pow(10,2))/Math.pow(10,2)+'</span></div><div class="text2"><span class="Current">Notify if:</span><a id="lbl_Nprice" class="lower">'+fType+'</a></div><div class="buttons"><a href="'+intialItemURL+'" target="_blank" ><img id="btn_buynow" name="btn_buynow" style="cursor:pointer;" src="../images/buy_now.PNG" alt="Buy Now" /></a><a addthis:services_compact="facebook,twitter" addthis:services_expanded="facebook,twitter" addthis:url="'+intialItemURL+'" class="addthis_button" href="'+intialItemURL+'"><img id="btn_share" name="btn_share" style="cursor:pointer;" src="../images/share.PNG" alt="Share" /></a><a href="http://64.91.230.110/data/RemoveP.cfm?redirect&usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ><img id="btn_delete_'+retJSONArray[i].ProductNumber+'_'+userid+'" name="btn_delete" style="cursor:pointer;" src="../images/delet.PNG" alt="Delete" class="productDeleteC" /></a></div></div></div><hr>';

					}
					storage.set({'storage_cacheData': newCacheData}, function() {
						newCacheData = '';
						console.log('Data is in Cache updated.');
						//alert('1.5');
					});
					////////////////////////////End of Cache///////////////////////////////////////////////////////////
					/*chrome.browserAction.setIcon({path: "/images/normal_icon.png"});
					var retJSONArray = jQuery.parseJSON( data );
					for(i=0; i<retJSONArray.length; i++)
					{
						//alert('loop');
						if (retJSONArray[i].IsHighLight == 1)
						{
							//alert('if');
							chrome.browserAction.setIcon({path: "/images/alert_icon.png"});
							return;
						}
					}*/
				}
			});
			//////////////////////////////////////////////
		}
	});
}, 300000); //300000
//note that 50000 is 50 seconds, not 5 minutes. 5 minutes would be 5 * 60 * 1000 = 300000