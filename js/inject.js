/*onload = setTimeout(isgreen(1),1500);*/
var storage = chrome.storage.local;
//storage.set({'storage_isCache': '0'}, function() {});
/*storage.remove('storage_isCache', function(items) {
		console.log('Cache Reset.');
	 });*/

/*$(document).ready(function() {
	if ($(".twister_dropdown").length>0)
	{
		$('.twister_dropdown').change(function() {
		   ////////////////////////////////////////////
			storage.get('storage_userid', function(itemsid) {
				console.log(itemsid);
				if (itemsid.storage_userid)
				{
					//init(itemsid.storage_userid, 'id');
					storage.get('storage_uuid', function(items) {
						console.log(items);
						if (items.storage_uuid)
						{
							alert('if');
							init(items.storage_uuid, 'uuid');
						}
						else
						{
							alert('else');
							init(itemsid.storage_userid, 'id');
						}
					});
				}
				else
				{
					init(0, 'id');
				}
			});
			////////////////////////////////////////////
		});
	}
});*/

storage.get('storage_userid', function(itemsid) {
  	console.log(itemsid);
 	if (itemsid.storage_userid)
	{
    	//init(itemsid.storage_userid, 'id');
		storage.get('storage_uuid', function(items) {
			console.log(items);
			if (items.storage_uuid)
			{
				init(items.storage_uuid, 'uuid');
			}
			else
			{
				init(itemsid.storage_userid, 'id');
			}
		});
    }
	else
	{
		init(0, 'id');
	}
});

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=46)
    return false;

    return true;
}

function ValidateNumber(txtObj)
{
	//alert(txtObj.value);
    nToChk=txtObj.value;
    if(nToChk=="")
        return 0;
    if(parseFloat(nToChk)!=nToChk)
    {
        alert("Please enter a valid number.");
        txtObj.value="";
    }
}

function init(obj, objtype)
{
	//$("#twister-atf-emwa_feature_div").append
	//$("#buyboxDivId").before
	/*if ($(".buying").length>0)
	{
		alert('here you go.');
	}*/
	/*function changeTest()
	{
		alert('change here u go.');onchange="changeTest()"
	}*/

	/*$("body").append('<div id="infoDivee" style="display:block;color: #00529B; background-color: #BDE5F8; background-image: url("http://64.91.230.110/data/info.png");position: fixed; top: 50%; left: 41%; margin-top: -50px; font-weight:bold;border: 2px solid;padding:15px 10px 15px 70px;background-repeat: no-repeat;background-position: 10px center;width:20%;">In order to track prices, please click the $ above to register.</div>');*/
//.buying #buyboxDivId
	//$('#buyboxDivId').children().remove().end();

	/*$("#buyboxDivId").before('<div id="infoDiv" style="display:none;font-family:Arial, Helvetica, sans-serif; font-size:13px; border: 1px solid; margin: 10px 0px; padding:15px 10px 15px 50px; background-repeat: no-repeat; background-position: 10px center; color: #9F6000; background-color: #FEEFB3;">In order to track prices, please click the $ above to register.</div><div id="watchPriceDiv" style="display:none;"><img id="wpricebtn" style="margin-left: 30px;margin-bottom: 12px;cursor:pointer;" src="http://64.91.230.110/data/wpb.png" alt="Watch Price" /><br /></div><div id="watchDiv" style="display:none;"><label for="drpdwon">Notify Me when</label><select  id="drpdwon" name="drpdwon" style="width: 105px;margin-left: 4px;border-color: black;border-width: 1px;"><option id="isPDT" value="pdt" >price drops to</option><option id="isPIL" value="pil">price is lower</option><option id="isInStock" value="iia">item is available</option></select><br /><label id="curr" for="price" style="margin-bottom: 6px;margin-top: 9px;">$</label><input id="currAmnt" type="text" id="price" name="price" style="margin-bottom: 6px;margin-top: 9px;width: 99px;border-color: black;border-width: 1px;" /><img id="watchbtn" style="margin-left: 8px;margin-bottom: -5px;margin-top: 9px;cursor:pointer; float:right;" src="http://64.91.230.110/data/watch.png" alt="Watch" /><br /></div><div id="watchingDiv" style="display:none;"><img id="watchingbtn" style="margin-left: 20px;margin-bottom: -6px;" src="http://64.91.230.110/data/watching.png" alt="Watching" />&nbsp;<a href="#" style="color: blue;" id="remlink" >Remove</a><br /></div><div id="padding" ></div>');*/
	
	$("#buyboxDivId").before('<div style="width:225px;margin:0 auto;border:1px solid #999999;"><div id="watchingDiv" style="padding:9px 13px;display:none;"><div style="float:left;	width:67px;"><img src="http://64.91.230.110/data/logo.png" alt="ePriceDrop" /></div><div style="padding:0 0 0 22px;	margin:0;clear:both;"><h1 style="font:bold 19px Arial, Helvetica, sans-serif;color:#a6c947;padding:0 10px 0 0;margin:0 0 0 0;float:left;">Watching</h1><span style="padding:5px 0 0 0;margin:0 0 0 0;float:left;"><a id="remlink" href="#">Remove</a></span></div><div style="clear:both;"></div></div><div id="watchPriceDiv" style="padding:9px 13px;display:none;"><div style="float:left;	width:67px;"><img src="http://64.91.230.110/data/logo.png" alt="ePriceDrop" /></div><div id="infoDiv" style="display:none;background:#666666; font:12px Arial, Helvetica, sans-serif; color:#FFFFFF; width:160px; padding:10px; margin:0 0 10px 76px;">In order to track prices, plz click the $ above to register.</div><div style="padding:0;margin:0;float:left;clear:both;"><img id="wpricebtn" style="border: 0 none;margin: 0;padding: 0 0 10px 112px;" src="http://64.91.230.110/data/watch_price.png" alt="watch_price" /></div><div style="clear:both;"></div></div><div id="watchDiv" style="padding:9px 13px; display:none;"><div style="float:left;	width:67px;"><img src="http://64.91.230.110/data/logo.png" alt="ePriceDrop" /></div><div style="padding:0 0 0 15px;margin:0;float:left;clear:both;"><p style="  color: #000000;float: left; font: 11px Arial,Helvetica,sans-serif; margin: 0;padding: 15px 5px 0 0;">Notify Me when</p><div style="background:url(http://64.91.230.110/data/slect_arrow.png) no-repeat scroll right center transparent;height: 16px; overflow: hidden;  width: 100px;float:left;	padding:0 0 0 0; margin:15px 0 0 0;"><select id="drpdwon" name="drpdwon" style="font:11px Arial, Helvetica, sans-serif;color:#000;padding:0px 0 0 2px;background:url(http://64.91.230.110/data/slect_bg.png) no-repeat scroll 0 0 transparent;border: 0 none; height: 16px; width: 150px;-webkit-appearance: none;	float:left;outline:noen;"><option id="isPDT" value="pdt" style="font:11px Arial, Helvetica, sans-serif;padding:2px 2px 2px 4px;	margin:0 0 0 0;	color:#333333;" >price drops to</option><option id="isPIL" value="pil" style="font:11px Arial, Helvetica, sans-serif;padding:2px 2px 2px 4px;	margin:0 0 0 0;	color:#333333;">price is lower</option><option id="isInStock" value="iia" style="font:11px Arial, Helvetica, sans-serif;padding:2px 2px 2px 4px;	margin:0 0 0 0;	color:#333333;">item is available</option></select></div></div><div style="padding:0 0 0 15px;margin:0;float:left;clear:both;"><p id="curr" style="  color: #000000;float: left; font: 11px Arial,Helvetica,sans-serif; margin: 0;padding: 15px 5px 0 0;">$</p><div style="height: 16px; width: 100px;float:left;	padding:0 0 0 0; margin:15px 0 0 0;"><input id="currAmnt" name="currAmnt" type="text" style="font:11px Arial, Helvetica, sans-serif;color:#000;padding:0px 0 0 2px;border:1px solid; height: 16px; width: 100px;float:left; border-color:#CCCCCC;"/></div><img id="watchbtn" style="float: left;margin: 0;padding: 13px 0 0 12px;" src="http://64.91.230.110/data/watch.png" alt="Watch" /></div><div style="clear:both;"></div></div><div style="clear:both;"></div></div>');
	

	if ($(".availGreen").html() == 'In Stock.')
	{
		$("#isInStock").css("display", "none");
	}
	else
	{
		//$("#isPDT").css("display", "none");
		//$("#isPIL").css("display", "none");
	}

	if (!($(".availGreen").length>0) || $(".availGreen").html() == 'Pre-order Now' || $(".availGreen").html() == 'Pre-order now and reserve your place in line'  )
	{
		$("#isPDT").css("display", "none");
		$("#isPIL").css("display", "none");
		//
		$("#curr").css("display", "none");
		$("#currAmnt").css("display", "none");
		$("#watchbtn").css("float", "right");
		$("#padding").css("padding-bottom", "20px");

		$("select#drpdwon")[0].selectedIndex = 2;
	}
	//var optPDT = document.getElementById('isPDT');
	//var optPIL = document.getElementById('isPIL');
	//var optInStock = document.getElementById('isInStock');	

	var eSelect = document.getElementById('drpdwon');
	eSelect.onchange = function() {
		if(eSelect.selectedIndex === 0)
		{
			$("#curr").css("display", "block");
			$("#currAmnt").css("display", "block");
			$("#curr").css("float", "left");
			$("#currAmnt").css("float", "left");
			$("#watchbtn").css("float", "left");
			$("#padding").css("padding-bottom", "20px");
		}
		else
		{
			$("#curr").css("display", "none");
			$("#currAmnt").css("display", "none");
			$("#watchbtn").css("float", "right");
			$("#padding").css("padding-bottom", "20px");
		}
	}
	
	var eTextBox = document.getElementById('currAmnt');

	eTextBox.onkeypress = function() {
		//alert('onKeyPress..');
		return isNumberKey(event)
	}

	eTextBox.onblur = function() {
		//alert('onBlur..');
		ValidateNumber(this);
	}

	console.log(objtype);
	var firstTime = true;
	var Loc = window.location.pathname;
	var ArrWinLoc = Loc.split("/");
	var defaultURLIndex = 3;

	for(i = 0; i < ArrWinLoc.length; i++)
	{
		if (ArrWinLoc[i] == 'dp')
		{
			defaultURLIndex = i+1;
			break;
		}
	}
	//alert(defaultURLIndex);
	var ItemId = ArrWinLoc[defaultURLIndex];
	var MemberId = '';
	var uuid = '';
	if (objtype == "id")
	{
		//alert('ID');
		MemberId = obj;
	}
	if (objtype == "uuid")
	{
		//alert('UUID');
		uuid = obj;
		var ajxurl = 'http://64.91.230.110/data/AjaxQueryHandler.cfc?usr_uuid=' + uuid;
		$.ajax({
			url: ajxurl,
			data: 
			{
				method: 'GetMemIdByUUID'
			},
			success: function(data) 
			{
				MemberId = data.trim();
			}
		});
		
	}
	////////////////////////////////////////////////////////////////////////////
	
	//document.getElementsByName('Orders.Custom_Field_Custom1')[0].value = $.cookie('cronimagename', { path: '/', domain: 'serverl.xyz.com'});

	///////////////////////////////////////////////////////////////////////////

	var isExists = false;
	if (obj == 0)
	{
		$("#watchPriceDiv").css("display", "block");
	}
	else
	{
		$.ajax({
				  url: 'http://64.91.230.110/data/isExists.cfm?usr_product_number='+ItemId+'&usr_member_id='+MemberId+'&usr_uuid='+uuid+'&'+objtype,
				  success: function(data) 
				  {
					if (data.trim() == '0')
					{
						$("#watchPriceDiv").css("display", "block");					
					}
					else
					{
						$("#watchingDiv").css("display", "block");
						isExists = true;
					}
				 }
		});
	}

	$('#wpricebtn').click(function() {
		if (obj == 0)
		{
			//alert('In order to track prices, please click the $ above to register.');
			 $("#infoDiv").show();
             setTimeout('$("#infoDiv").hide()', 5000);
		}
		else
		{
			$("#watchPriceDiv").css("display", "none");
			$("#watchDiv").css("display", "block");
			$("#watchingDiv").css("display", "none");
		}
		//////////////////////////////////////////////////////////////////////////////////	
		/*storage.get('storage_userid', function(items) {
			if (items.storage_userid)
			{
				console.log(items.storage_userid);
				if(items.storage_userid)
				{
					alert('hi');
				}
			}
		});
		storage.get('storage_uuid', function(items) {
			// return a default value of '' if there is no storage_username value yet.
			if (items.storage_uuid)
			{
				console.log(items.storage_uuid);
			}
		});*/
		//////////////////////////////////////////////////////////////////////////////////
    });

	$('#watchbtn').click(function() {

		if (!firstTime)
			return;
		firstTime = false;
		var ItemURL = '';//window.location;
		//ItemURL = JSON.stringify(ItemURL);
		//arTmp = ItemURL.split("#");
		//ItemURL = arTmp[0];
		var ItemTitle = '';//$("#btAsinTitle").text();
		var PriceLarge = '';//$(".priceLarge").text();
		//arTmp = PriceLarge.split("$");
		//PriceLarge = arTmp[1];
		var Tprice = '0';
		var drpdwon = $("#drpdwon").val();
		var notify_on_any_drop = 0;
		if (drpdwon == 'pil')
		{
			notify_on_any_drop = 1;
		}
		var notify_when_in_stock = 0;
		if (drpdwon == 'iia')
		{
			notify_when_in_stock = 1;
		}
		if(drpdwon == 'pdt')
		{
			if(eTextBox.value=='')
			{
				alert("Please enter price.");
				firstTime = true;
				return;
			}
			else
			{
				Tprice = eTextBox.value;
			}
		}
		/*var dato = new Date();+'&urlTimeStamp='+dato.toISOString()*/

		var ajxurl = 'http://64.91.230.110/data/AjaxQueryHandler.cfc?urlItemId='+ItemId;
		$.ajax({
						url: ajxurl,
						data:
						{
							method: 'GetApi'
						},
						success: function(data)
						{
							//alert(data);
							var retJSONArray = jQuery.parseJSON( data );
							//alert('after');
							//$(".availGreen").text(retJSONArray[0].ImageSmall);
							ItemURL = retJSONArray[0].URL;
							ItemTitle = retJSONArray[0].Title;
							PriceLarge = retJSONArray[0].CPrice;
							arTmp = PriceLarge.split("$");
							PriceLarge = arTmp[1];
							var imgPath = retJSONArray[0].ImageSmall; 
							if (Tprice >=PriceLarge)
							{
								alert('Please enter an amount less than the current price.');
								firstTime = true;
								return;
							}

							/////////////////////////////////////////////////////////////////////////
							$.ajax({

									  url: 'http://64.91.230.110/data/setP.cfm?usr_url='+ItemURL+'&usr_product_number='+ItemId+'&usr_product_title='+ItemTitle+'&usr_current_price='+PriceLarge+'&usr_member_id='+MemberId+'&usr_target_price='+Tprice+'&usr_notify_on_any_drop='+notify_on_any_drop+'&usr_notify_when_in_stock='+notify_when_in_stock+'&usr_clicked_price='+PriceLarge,
									  success: function(data) {
										if (data.trim() == 'Your product watch created successfully!')
										{
											$("#watchPriceDiv").css("display", "none");
											$("#watchDiv").css("display", "none");
											$("#watchingDiv").css("display", "block");
											firstTime = true;
											isExists = true;
											storage.set({'storage_isCache': '1'}, function() {
												console.log('Change.');
											});
										}
										else
										{
											alert('Problem Saving Info.');
										}
									  }
									});
							/////////////////////////////////////////////////////////////////////////
						}
					});
    });

	$('#remlink').click(function() {
		$.ajax({
			  url: 'http://64.91.230.110/data/RemoveP.cfm?usr_product_number='+ItemId+'&usr_member_id='+MemberId,
			  success: function(data)
			  {
				if (data.trim() == '1')
				{
					isExists = false;
					$("#watchPriceDiv").css("display", "block");
					$("#watchDiv").css("display", "none");
					$("#watchingDiv").css("display", "none");

					storage.set({'storage_isCache': '1'}, function() {
						console.log('Change.');
					});
				}
				else
				{
					$("#watchingDiv").css("display", "block");
					$("#watchPriceDiv").css("display", "none");
					isExists = true;
				}
			 }
		});
    });
}