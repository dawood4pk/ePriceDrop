var storage = chrome.storage.local;

var addthis_config = {
	  services_expanded: 'facebook, twitter',
	  services_exclude: 'badoo.com,bigadda.com,A97abi,Adfty,Adifni,amazonwishlist,amenme,aolmail,armenix,arto,aviary,azadegi,baang,baidu,bebo,bentio,biggerpockets,bitly,bizsugar,bland,blinklist,blip,blogger,bloggy,blogkeen,blogmarks,blogtrottr,blurpalicious,bolt,bobrdobr,bonzobox,socialbookmarkingnet,bookmarkycz,bookmerkende,bordom,box,brainify,bryderi,buddymarks,buzzzy,camyoo,cardthis,care2,chiq,cirip,citeulike,classicalplace,classicalplace,cleanprint,clipdo,cndig,colivia,technerd,connotea,cootopia,link,cosmiq,curateus,delicious,designbump,digaculturanet,digg,diggita,digo,digthiswebhost,digzign,diigo,dipdive,domelhor,dosti,dotnetkicks,douban,douban,draugiem,drimio,dropjack,dzone,edelight,efactor,ekudos,elefantapl,email,embarkons,eucliquei,evernote,extraplay,ezyspot,stylishhome,fabulously40,fark,farkinda,fashiolista,fashionburner,favable,faves,favlogde,favoritende,favorites,favoritus,flaker,flosspro,folkd,formspring,thefreedictionary,fresqui,friendfeed,funp,fwisp,gabbr,gamekicker,givealink,globalgrind,gmail,govn,godudu,goodnoows,google,greaterdebater,grono,habergentr,hackernews,hadashhot,hatena,gluvsnap,hedgehogs,hellotxt,historious,hotbookmark,hotklix,hotmail,w3validator,hyves,identica,ihavegot,index4,indexor,informazione,instapaper,investorlinks,iorbix,isociety,iwiw,jamespot,jappy,joliprint,jolly,jumptags,kaboodle,kaevur,kaixin,ketnooi,kindleit,kipup,kledy,kommenting,latafaneracat,librerio,aim,linkninja,linkagogo,linksgutter,linkshares,linkuj,livejournal,lockerblogger,logger24,mymailru,markme,mashbord,meinvz,mekusharim,memonic,memori,meneame,mendeley,live,mindbodygreen,misterwong,moemesto,moikrug,mototagz,mrcnetworkit,multiply,myaol,myhayastan,mylinkvault,myspace,n4g,naszaklasa,netlog,netvibes,netvouz,newsmeback,newstrust,newsvine,nujij,odnoklassniki_ru,oknotizie,oneview,orkut,oyyla,packg,pafnetde,pdfonline,pdfmyurl,phonefavs,pingfm,planypus,plaxo,plurk,pochvalcz,politicnote,posteezy,posterous,pratiba,print,printfriendly,pusha,qrfin,qrsrc,quantcast,qzone,raiseyourvo,ice,readitlater,reddit,rediff,redkum,researchgate,ridefix,scoopat,scoopit,sekoman,select2gether,sharer,shaveh,shetoldme,sinaweibo,skyrock,smiru,sodahead,sonico,speedtile,sphinn,spinsnap,yiid,springpad,squidoo,startaid,startlap,storyfollower,studivz,stuffpit,stumbleupon,stumpedia,svejo,symbaloo,taaza,tagza,tarpipe,thewebblend,thinkfinity,thisnext,throwpile,tipd,toly,topsitelernet,transferr,googletranslate,tuenti,tulinq,tumblr,tusul,tvinx,tweetmeme,twitthis,typepad,upnews,urlaubswerkde,urlcapt,viadeo,virb,visitezmonsite,vk,vkrugudruzei,voxopolis,vybralisme,vyoom,webnews,webshare,domaintoolswhois,windycitizen,wirefan,wordpress,worio,wykop,xanga,xing,yahoobkm,yahoomail,yammer,yardbarker,yemle,yigg,yoolink,yorumcuyum,youblr,youbookmarks,youmob,yuuby,zakladoknet,ziczac,zingme'
}
function validateForm()
{
	var x=document.forms["formSignup"]["usernameSU"].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	{
		$("#SUMessage").text('Not a valid e-mail address');
		$("#SUMessage").css('color', 'red');
		//alert("Not a valid e-mail address");
		return false;
	}
	else
	{
		return true;
	}
}

//Cookie++
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

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;+"; path=/";
}//domain=www.amazon.com;

function productDelete(txtObj)
{
	alert('function productDelete');
	if (confirm('Are you sure you want to delete Item?'))
	{
		var temp = txtObj.split("_");
		var ItemId = temp[2];
		var MemId = temp[3];
		$.ajax({
			  url: 'http://64.91.230.110/data/RemoveP.cfm?usr_product_number='+ItemId+'&usr_member_id='+MemId,
				  success: function(data)
				  {
					if (data.trim() == '1')
					{
						window.close();
						//window.open();
					}
				 }
			});
	}
	//alert(ItemId);
}	

function checkCookie()
{
	var userid = getCookie("ce4ama_userid");
	var username=getCookie("ce4ama_username");
	var uuid=getCookie("ce4ama_uuid");

	/*if (uuid!=null && uuid!="")
	{
		var ajxurl = 'http://64.91.230.110/data/AjaxQueryHandler.cfc?usr_uuid=' + uuid;
		$.ajax({
			url: ajxurl,
			data: 
			{
				method: 'GetMemIdByUUID'
			},
			success: function(data) 
			{
				userid = data.trim();
				setCookie("ce4ama_userid",data.trim(),365);
			}
		});
	}*/

	//saveChanges(username);
	storage.set({'storage_userid': userid}, function() {
		console.log('User ID Added.');
	 });
	/*storage.set({'storage_username': username}, function() {
		console.log('User Name Added.');
	 });*/
	storage.set({'storage_uuid': uuid}, function() {
		console.log('User UUID Added.');
	 });

	if (userid!=null && userid!="" && username!=null && username!="")
	{
		//var value = jaaulde.utils.cookies.get();
		//jaaulde.utils.cookies.get('username');
		//$.cookie('username');
		//Zane
		$("#userInfo").text('You are already logged in as ' + username);
		/*var dato = new Date();+'&urlTimeStamp='+dato.toISOString()*/

		/////////////////function loadUserItems()////////////////////
		function loadUserItems()
		{
			////////////////////////////////////////////////////////////////////
			var ajxurl = 'http://64.91.230.110/data/AjaxQueryHandler.cfc?MemberId=' + userid;
			$.ajax({
				url: ajxurl,
				data: 
				{
					method: 'GetUserItems'
				},
				success: function(data) 
				{
					var retJSONArray = jQuery.parseJSON( data );
					$('#itemDetails').children().remove().end();

					for(i=0; i<retJSONArray.length; i++)
					{
						//$("#itemDetails").html(retJSONArray[i].ProductNumber);
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

						var ItemURL = retJSONArray[i].URL;
						arTmp = ItemURL.split("/");
						subArray = arTmp[5].split("?");
						intialItemURL = 'http://'+arTmp[2]+'/'+arTmp[4]+'/'+subArray[0]+'?tag=epricedcom-20';
						//alert(arTmp[0]);
						//remainingItemURL = arTmp[1];
						//arTmp = remainingItemURL.split("&");

						//'+retJSONArray[i].MemberID+'
						//$('#itemDetails').append('<div name="awais" id="product_main_div_'+retJSONArray[i].ProductNumber+'" '+colCriteris+' class="main_cont"><div class="img_cont"><span id="lbl_number" class="numb">'+j+'.</span><span class="img"><a id="link_productImage" href="'+intialItemURL+'" target="_blank" ><img id="procuct_image" src="'+imgPath+'" alt="" /></a></span></div><div class="content2"><div class="anc_head"><a id="link_productName" href="'+intialItemURL+'" target="_blank" >'+retJSONArray[i].ProductTitle+'</a></div><div class="sml_cont"><div style="padding-bottom:4px;"><span class="price">Current Price:</span><span id="lbl_cPrice" class="mrn">$'+Math.round(retJSONArray[i].CurrentPrice*Math.pow(10,2))/Math.pow(10,2)+'</span></div><div style="padding-bottom:4px;"><span class="price">Notify if:</span><span id="lbl_Nprice" class="rd">'+fType+'</span></div></div><div class="btn_cont"><a href="'+intialItemURL+'" target="_blank" ><img id="btn_buynow" name="btn_buynow" style="cursor:pointer;" src="../images/buy_now.PNG" alt="Buy Now" /></a><a addthis:services_compact="facebook,twitter" addthis:services_expanded="facebook,twitter" addthis:url="'+intialItemURL+'" class="addthis_button" href="'+intialItemURL+'"><img id="btn_share" name="btn_share" style="cursor:pointer;" src="../images/share.PNG" alt="Share" /></a><a href="http://64.91.230.110/data/RemoveP.cfm?redirect&usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ><img id="btn_delete_'+retJSONArray[i].ProductNumber+'_'+userid+'" name="btn_delete" style="cursor:pointer;" src="../images/delet.PNG" alt="Delete" class="productDeleteC" /></a></div></div><div class="clear"></div></div><hr>');
						
						
//						/*<a href="http://64.91.230.110/data/RemoveP.cfm?usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ></a>*/
						$('#itemDetails').append('<div id="product_main_div_'+retJSONArray[i].ProductNumber+'" '+colCriteris+' class="product1"><div class="product_item"><span class="img"><a id="link_productImage" href="'+intialItemURL+'" target="_blank" ><img id="procuct_image" src="'+imgPath+'" alt="" /></a></span></div><div class="product_detail"><p><a id="link_productName" href="'+intialItemURL+'" target="_blank" >'+retJSONArray[i].ProductTitle+'</a></p><div class="text1"><span class="Current">Current Price:</span><span id="lbl_cPrice" class="pound">$'+Math.round(retJSONArray[i].CurrentPrice*Math.pow(10,2))/Math.pow(10,2)+'</span></div><div class="text2"><span class="Current">Notify if:</span><a id="lbl_Nprice" class="lower">'+fType+'</a></div><div class="buttons"><a href="'+intialItemURL+'" target="_blank" ><img id="btn_buynow" name="btn_buynow" style="cursor:pointer;" src="../images/buy_now.PNG" alt="Buy Now" /></a><a addthis:services_compact="facebook,twitter" addthis:services_expanded="facebook,twitter" addthis:url="'+intialItemURL+'" class="addthis_button" href="'+intialItemURL+'"><img id="btn_share" name="btn_share" style="cursor:pointer;" src="../images/share.PNG" alt="Share" /></a><a href="http://64.91.230.110/data/RemoveP.cfm?redirect&usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ><img id="btn_delete_'+retJSONArray[i].ProductNumber+'_'+userid+'" name="btn_delete" style="cursor:pointer;" src="../images/delet.PNG" alt="Delete" class="productDeleteC" /></a></div></div></div><hr>');
						/*<a href="http://64.91.230.110/data/RemoveP.cfm?usr_product_number='+retJSONArray[i].ProductNumber+'&usr_member_id='+userid+'" target="_blank" ></a>*/
					}
					storage.set({'storage_cacheData': $("#itemDetails").html()}, function() {
						console.log('Data is in Cache.');
					});
				}
			});
			///////////////////////////////////////////////////////////////////
		}
		///////////////end of function loadUserItems()////////////////////

		// Cache Code.	
		storage.get('storage_isCache', function(isactive) {
			if (isactive.storage_isCache && isactive.storage_isCache == '1')
			{
				//alert('1');
				loadUserItems();
				storage.remove('storage_isCache', function(isactive) {
					console.log('Cache Reset.');
				 });
			}
			else
			{
				storage.get('storage_cacheData', function(data) {
					if (data.storage_cacheData && data.storage_cacheData != '')
					{
						$('#itemDetails').append(data.storage_cacheData);
					}
					else
					{
						//alert('2');
						loadUserItems();
					}
				});
			}
		});

/*$(document).ready(function(){	
			$('.productDeleteC').on( "click" , function() {
				productDelete($('.productDeleteC').attr('id'));
			});
		});*/
		$("#alreadyLogIn").css("display", "block");
		$("#formSignupDIV").css("display", "none");
		$("#formSigninDIV").css("display", "none");
		$("#formGenerateUUIDDIV").css("display", "none");
		//$('#usrnameSI').val(username);
	}
}
//Cookie--
function openGenUUID()
{
	$("#alreadyLogIn").css("display", "none");
	$("#formSignupDIV").css("display", "none");
	$("#formSigninDIV").css("display", "none");
	$("#formGenerateUUIDDIV").css("display", "block");
}
function randomUUID()
{
	var s = [], itoh = '0123456789ABCDEF';

	// Make array of random hex digits. The UUID only has 32 digits in it, but we
	// allocate an extra items to make room for the '-'s we'll be inserting.
	for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
	
	// Conform to RFC-4122, section 4.4
	s[14] = 4;  // Set 4 high bits of time_high field to version
	s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence
	
	// Convert to hex chars
	for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
	
	// Insert '-'s
	s[8] = s[13] = s[18] = s[23] = '-';
	
	return s.join('');
}

function genUUID()
{
	setCookie("ce4ama_userid","",365);
	setCookie("ce4ama_username","",365);
	setCookie("ce4ama_uuid","",365);
	storage.remove('storage_userid', function(items) {
		console.log('Reset stored ID');
	 });
	/*storage.remove('storage_username', function(items) {
		console.log('Reset stored Name');
	 });*/
	storage.remove('storage_uuid', function(items) {
		console.log('Reset stored UUID');
	 });

	var fName= $("#usernameFnameUUID").val();
	var lName= $("#usernameLnameUUID").val();

	if ($('#usernameFnameUUID').attr('title')==0)
	{
		fName = '';
	}
	if ($('#usernameLnameUUID').attr('title')==0)
	{
		lName = '';
	}

	if (fName.trim()=='')
	{
		openGenUUID();
		$("#generateUUIDMessage").text('Please Enter First Name.');
		$("#generateUUIDMessage").css('color', 'red');
		$("#generateUUIDMessage").focus();
	}
	else if (lName.trim()=='')
	{
		$("#generateUUIDMessage").text('Please Enter Last Name.');
		$("#generateUUIDMessage").css('color', 'red');
		$("#generateUUIDMessage").focus();
	}
	else
	{
		var uid = randomUUID();
		$.ajax({
			  url: 'http://64.91.230.110/data/index.cfm?usr_fname='+fName.trim()+'&usr_lname='+lName.trim()+'&usr_email=X-'+uid+'&usr_password=X&usr_uuid='+uid,
			  success: function(data) {				
				if (data.trim() != 'Email already Exists!')
				{
					$("#formGenerateUUIDDIV").css("display", "none");
					setCookie("ce4ama_userid",data.trim(),365);
					setCookie("ce4ama_username",fName+' '+lName,365);
					setCookie("ce4ama_uuid",uid,365);
					$("#userInfo").text('You are already logged in as ' + fName+' '+lName);
					$("#alreadyLogIn").css("display", "block");
				}
			  }
			});
	}
}

////////////////////////////////////////////DOCUMENT READY////////////////////////////////////////////////////////////////
$(document).ready(function(){
	var userName = document.getElementById('usrnameSI');
	userName.onblur = function() {
		if(userName.value=='')
		{
			userName.value='User Name / Email';
		}
	}
	userName.onfocus = function() {
		if(userName.value=='User Name / Email')
		{
			userName.value='';
		}
	}

	var userPass = document.getElementById('usrpasswordSI');
	userPass.onblur = function() {
		if(userPass.value=='')
		{
			$(this).get(0).type='text';
			userPass.value='Password';
			$('#usrnameSI').attr('title', '0');
		}
	}
	userPass.onfocus = function() {
		if(userPass.value=='Password')
		{
			$(this).get(0).type='password';
			userPass.value='';
			$('#usrnameSI').attr('title', '1');
			//alert($('#usrnameSI').attr('title'));
		}
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var userFName = document.getElementById('usernameFnameSU');
	userFName.onblur = function() {
		if(userFName.value=='')
		{
			userFName.value='First Name';
			$('#usernameFnameSU').attr('title', '0');
		}
	}
	userFName.onfocus = function() {
		if(userFName.value=='First Name')
		{
			userFName.value='';
			$('#usernameFnameSU').attr('title', '1');
		}
	}

	var userLName = document.getElementById('usernameLnameSU');
	userLName.onblur = function() {
		if(userLName.value=='')
		{
			userLName.value='Last Name';
			$('#usernameLnameSU').attr('title', '0');
		}
	}
	userLName.onfocus = function() {
		if(userLName.value=='Last Name')
		{
			userLName.value='';
			$('#usernameLnameSU').attr('title', '1');
		}
	}

	var userNameSU = document.getElementById('usernameSU');
	userNameSU.onblur = function() {
		if(userNameSU.value=='')
		{
			userNameSU.value='Username (Email)';
			$('#usernameSU').attr('title', '0');
		}
	}
	userNameSU.onfocus = function() {
		if(userNameSU.value=='Username (Email)')
		{
			userNameSU.value='';
			$('#usernameSU').attr('title', '1');
		}
	}

	var userPassOne = document.getElementById('usrpassword');
	userPassOne.onblur = function() {
		if(userPassOne.value=='')
		{
			$(this).get(0).type='text';
			userPassOne.value='Password';
			$('#usrpassword').attr('title', '0');
		}
	}
	userPassOne.onfocus = function() {
		if(userPassOne.value=='Password')
		{
			$(this).get(0).type='password';
			userPassOne.value='';
			$('#usrpassword').attr('title', '1');
			//alert($('#usrnameSI').attr('title'));
		}
	}
	
	var userPassTwo = document.getElementById('usrpasswordR');
	userPassTwo.onblur = function() {
		if(userPassTwo.value=='')
		{
			$(this).get(0).type='text';
			userPassTwo.value='Password';
			$('#usrpasswordR').attr('title', '0');
		}
	}
	userPassTwo.onfocus = function() {
		if(userPassTwo.value=='Password')
		{
			$(this).get(0).type='password';
			userPassTwo.value='';
			$('#usrpasswordR').attr('title', '1');
			//alert($('#usrnameSI').attr('title'));
		}
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var userGFName = document.getElementById('usernameFnameUUID');
	userGFName.onblur = function() {
		if(userGFName.value=='')
		{
			userGFName.value='First Name';
			$('#usernameFnameUUID').attr('title', '0');
		}
	}
	userGFName.onfocus = function() {
		if(userGFName.value=='First Name')
		{
			userGFName.value='';
			$('#usernameFnameUUID').attr('title', '1');
		}
	}

	var userGLName = document.getElementById('usernameLnameUUID');
	userGLName.onblur = function() {
		if(userGLName.value=='')
		{
			userGLName.value='Last Name';
			$('#usernameLnameUUID').attr('title', '0');
		}
	}
	userGLName.onfocus = function() {
		if(userGLName.value=='Last Name')
		{
			userGLName.value='';
			$('#usernameLnameUUID').attr('title', '1');
		}
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	checkCookie();

	$('.openSignin').click(function() {
		setCookie("ce4ama_userid","",365);
		setCookie("ce4ama_username","",365);
		setCookie("ce4ama_uuid","",365);
		storage.remove('storage_userid', function(items) {
			console.log('Reset stored ID');
		 });
		/*storage.remove('storage_username', function(items) {
			console.log('Reset stored Name');
		 });*/
		storage.remove('storage_uuid', function(items) {
			console.log('Reset stored UUID');
		 });
		
		$("#formSignupDIV").css("display", "none"); 
		$("#formSigninDIV").css("display", "block"); 
		$("#alreadyLogIn").css("display", "none");
		$("#formGenerateUUIDDIV").css("display", "none");
		return false;
	});
	
	$('.openSignup').click(function() {
		setCookie("ce4ama_userid","",365);
		setCookie("ce4ama_username","",365);
		setCookie("ce4ama_uuid","",365);
		storage.remove('storage_userid', function(items) {
			console.log('Reset stored ID');
		 });
		/*storage.remove('storage_username', function(items) {
			console.log('Reset stored Name');
		 });*/
		storage.remove('storage_uuid', function(items) {
			console.log('Reset stored UUID');
		 });
		$("#formSignupDIV").css("display", "block"); 
		$("#formSigninDIV").css("display", "none"); 
		$("#alreadyLogIn").css("display", "none");
		$("#formGenerateUUIDDIV").css("display", "none");
		return false;
	
		//document.getElementById("formSignupDIV").style.display = 'block';
		//document.getElementById("formSigninDIV").style.display = 'none';
	
		//document.getElementById("formSignupDIV").setAttribute('display','block');;					
		//document.getElementById("formSigninDIV").setAttribute('display','none')
	});

	$('#savelog').on( "click" , function() {
		setCookie("ce4ama_userid","",365);
		setCookie("ce4ama_username","",365);
		setCookie("ce4ama_uuid","",365);
		storage.remove('storage_userid', function(items) {
			console.log('Reset stored ID');
		 });
		/*storage.remove('storage_username', function(items) {
			console.log('Reset stored Name');
		 });*/
		storage.remove('storage_uuid', function(items) {
			console.log('Reset stored UUID');
		 });
		var email = $("#usrnameSI").val();//document.getElementById("usernameSU").value;
		var pswd = $("#usrpasswordSI").val();//document.getElementById("usrpassword").value;

		if ($('#usrnameSI').attr('title')==0)
		{
			pswd = '';
		}

		$.ajax({
						  url: 'http://64.91.230.110/data/getM.cfm?usr_email='+email+'&usr_password='+pswd,
						  success: function(data) {
							//alert(data);
							if (data.trim() == '0')
							{
								$("#ActSuccMessage").text('Invalid Username');
								$("#ActSuccMessage").css('color', 'red');
							}
							else if (data.trim() == '-1')
							{
								 $("#ActSuccMessage").text('Invalid Password');
								 $("#ActSuccMessage").css('color', 'red');
								//alert('Invalid Username and/or Password');
							}
							else
							{
								//alert('Login Successful');
								setCookie("ce4ama_userid",data.trim(),365);
								setCookie("ce4ama_username",email,365);
								$("#userInfo").text('You are already logged in as ' + email);
								checkCookie();
								$("#alreadyLogIn").css("display", "block");
								$("#formSignupDIV").css("display", "none");
								$("#formSigninDIV").css("display", "none");
								//window.close();
							}
						  }
						});
	});

	$('.Signout').click(function() {

		if (confirm('Are you sure you want to Sign Out?'))
		{
			setCookie("ce4ama_userid","",365);
			setCookie("ce4ama_username","",365);
			setCookie("ce4ama_uuid","",365);	
			storage.remove('storage_userid', function(items) {
				console.log('Reset stored ID');
			 });
			/*storage.remove('storage_username', function(items) {
				console.log('Reset stored Name');
			 });*/
			storage.remove('storage_uuid', function(items) {
				console.log('Reset stored UUID');
			 });
			storage.remove('storage_isCache', function(isactive) {
				console.log('isCache Reset.');
			 });
			storage.remove('storage_cacheData', function(isactive) {
				console.log('cacheData Reset.');
			 });
			$("#formSignupDIV").css("display", "none");
			$("#alreadyLogIn").css("display", "none");
			$("#formSigninDIV").css("display", "block");

			window.close();
		}
	});

	$('#savesup').on( "click" , function() {
		setCookie("ce4ama_userid","",365);
		setCookie("ce4ama_username","",365);
		setCookie("ce4ama_uuid","",365);
		storage.remove('storage_userid', function(items) {
			console.log('Reset stored ID');
		 });
		/*storage.remove('storage_username', function(items) {
			console.log('Reset stored Name');
		 });*/
		storage.remove('storage_uuid', function(items) {
			console.log('Reset stored UUID');
		 });
		var fName= $("#usernameFnameSU").val();//document.getElementById("usernameFnameSU").value;
		var lName= $("#usernameLnameSU").val();//document.getElementById("usernameLnameSU").value;
		var email = $("#usernameSU").val();//document.getElementById("usernameSU").value;
		var pswd = $("#usrpassword").val();//document.getElementById("usrpassword").value;
		var pswdR = $("#usrpasswordR").val();//document.getElementById("usrpasswordR").value;

		if ($('#usernameFnameSU').attr('title')==0)
		{
			fName = '';
		}

		if ($('#usernameLnameSU').attr('title')==0)
		{
			lName = '';
		}
		
		if ($('#usernameSU').attr('title')==0)
		{
			email = '';
		}

		if ($('#usrpassword').attr('title')==0)
		{
			pswd = '';
		}

		if ($('#usrpasswordR').attr('title')==0)
		{
			pswdR = '';
		}

		if (fName.trim()=='')
		{
			$("#SUMessage").text('Please Enter First Name.');
			$("#SUMessage").css('color', 'red');
			//alert("Please Enter First Name.");
			$("#usernameFnameSU").focus();
		}
		else if (lName.trim()=='')
		{
			$("#SUMessage").text('Please Enter Last Name.');
			$("#SUMessage").css('color', 'red');
			//alert("Please Enter Last Name.");
			$("#usernameLnameSU").focus();
		}

		else if(email.trim()=='')
		{
			$("#SUMessage").text('Please Enter Email with Correct Format.');
			$("#SUMessage").css('color', 'red');
			//alert("Please Enter Email with Correct Format.");
			$("#usernameSU").focus();
		}
		else if(email.trim()!='')
		{
			if(validateForm())
			{
				if(pswd.trim() == pswdR.trim())
				{
					if (pswd.trim().length == 0)
					{
						$("#SUMessage").text('Please Enter Password.');
						$("#SUMessage").css('color', 'red');
						//alert("Please Enter Password.");
						$("#usrpassword").focus();
					}
					else
					{
						$.ajax({
						  url: 'http://64.91.230.110/data/index.cfm?usr_fname='+fName.trim()+'&usr_lname='+lName.trim()+'&usr_email='+email.trim()+'&usr_password='+pswd+'&usr_uuid=X',
						  success: function(data) {
							$("#SUMessage").text(data);
							$("#SUMessage").css('color', 'red');
							//alert(data);
							if (data.trim() != 'Email already Exists!')
							{
								$('#usrnameSI').val(email);
								$("#formSignupDIV").css("display", "none");
								$("#formSigninDIV").css("display", "block");
								$("#ActSuccMessage").text(data);
								$("#ActSuccMessage").css('color', 'green');
							}
						  }
						});
					}
				}
				else
				{
					$("#SUMessage").text('Password Mismatch.');
					$("#SUMessage").css('color', 'red');
					//alert("Password Mismatch.");
				}
			}
		}
	});

	/*$('#checkCookie').load(function() {
		checkCookie();
	});*/

	$('.openGenUUID').click(function() {
		openGenUUID();
	});

	$('#saveuuid').on( "click" , function() {
		genUUID();
	});

///////////////////////
});//doc ready end