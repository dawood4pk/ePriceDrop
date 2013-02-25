<cftry>

<!--- Dump out result. --->

<!---<cfmail server="smtp.gmail.com"
      username="dawood4pk@gmail.com"
      password=""
      port="465"
      useSSL="true"
      to="dawood4pk@gmail.com"
      from="dawood4pk@gmail.com"  
      subject="Test Email from Coldfusion.">
      email: Hello Dawood.
     </cfmail>--->
	 

	<!---<cfdump var="#url#"><cfabort>--->
	<CFQUERY name="TotalEmailCheck" datasource="epd">
		SELECT  	member.member_id, member.email, product.url, product.product_number, product.product_title, member.first_name,
					member.last_name, price_watch.target_price, product_price.current_price, price_watch.notify_on_any_drop,
					price_watch.notify_when_in_stock
		FROM		member
		INNER JOIN	price_watch ON member.member_id = price_watch.member_id
		INNER JOIN	product ON price_watch.product_id = product.product_id
		INNER JOIN	product_price ON product.product_id = product_price.product_id
		WHERE     	(member.uuid = <cfqueryparam cfsqltype="cf_sql_varchar" value="X">)
		AND 		(product_price.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(product.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(price_watch.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(member.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
	</CFQUERY>
	<cfset total_rows = TotalEmailCheck.recordCount>

	<cfif total_rows GT 0>
		<cfloop query="TotalEmailCheck">
			<!--------------------------------------------------------------------------->
			<cfset SecretAccessKey = "9N8XPp9XcWCOcwBcbPnPqjBm38/+GiEQHy/5/wNs" >
			<cfset AWSAccessKeyId = "AKIAJM6SUKYFP7RFRV2Q" >
			<cfset AssociateTag = "ws" >
			<cfset ItemId = #TotalEmailCheck.product_number# >
			<cfset Operation = "ItemLookup" >
			<cfset ResponseGroup = "ItemAttributes%2COffers%2CImages%2CReviews" >
			<cfset Service = "AWSECommerceService" >
			<!---<cfset Timestamp = #replace(url.urlTimeStamp,':','%3A','ALL')#>--->
			<!---<cfset Timestamp = #DateFormat(Now(), "yyyy-mm-dd")#&"T"&#TimeFormat(Now(), "HH%3Amm%3Ass")#&"Z">--->
			<cfset Timestamp = #DateFormat(DateAdd("h", 11, Now()), "yyyy-mm-dd")#&"T"&#TimeFormat(DateAdd("h", 11, Now()), "HH%3Amm%3Ass")#&"Z">
			<cfset Version = #DateFormat(Now(), "yyyy-mm-dd")#>
			<cfset NL=Chr(10) />
			<cfset HTTPVerb = "GET" >
			<cfset ValueOfHostHeaderInLowercase = "ecs.amazonaws.com" >
			<cfset HTTPRequestURI = "/onca/xml" >
			<cfset CanonicalizedQueryString = "AWSAccessKeyId="&#AWSAccessKeyId#&"&AssociateTag="&#AssociateTag#&"&ItemId="&#ItemId#&"&Operation="&#Operation#&"&ResponseGroup="&#ResponseGroup#&"&Service="&#Service#&"&Timestamp="&#Timestamp#&"&Version="&#Version#>
			<cfset StringToSign = #HTTPVerb#&#NL#&#ValueOfHostHeaderInLowercase#&#NL#&#HTTPRequestURI#&#NL#&#CanonicalizedQueryString# >
			<cfset Sig = URLEncodedFormat( hash_hmac_sha256(StringToSign, SecretAccessKey))>
			<cfset MyURL = "http://"&#ValueOfHostHeaderInLowercase#&#HTTPRequestURI#&"?"&#CanonicalizedQueryString#&"&Signature="&#Sig# >
			<cfhttp url="#MyURL#"  method="get">
			<cfset MyXMLDoc = xmlParse(Trim(cfhttp.filecontent))>

			<cfset APICPrice = '$00.00' >
			<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Price.FormattedPrice.XmlText")>
				<cfset APICPrice="#MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Price.FormattedPrice.XmlText#">
			<cfelse>
				<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText")>
					<cfset APICPrice="#MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText#">
				<cfelse>
					<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText")>
						<cfset APICPrice="#MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText#">
					</cfif>
				</cfif>
			</cfif>

			<cfset Avail = ''>
			<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Availability.XmlText")>
				<cfset Avail = #MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Availability.XmlText#>
			</cfif>
			<!---product_price.current_price, price_watch.notify_on_any_drop, price_watch.notify_when_in_stock--->

			<!---<cfdump var="#replace(APICPrice,'$','')#" /><br>
			<cfdump var="#TotalEmailCheck.current_price#" /><br>
			<cfdump var="#(replace(APICPrice,'$','') EQ TotalEmailCheck.current_price)#" /><br><br>--->

			<cfif (TotalEmailCheck.notify_on_any_drop EQ 0) AND (TotalEmailCheck.notify_when_in_stock EQ 0) AND (replace(APICPrice,'$','') EQ TotalEmailCheck.target_price)>
				<cfmail to="#TotalEmailCheck.email#" from="support@clockshare.com" subject="ePriceDrop Alert." type="html" >
					Dear #TotalEmailCheck.last_name#,<br><br>

					One of the products that you followed on ePriceDrop has reached your desired condition. Please take a look, 						it may interest you:<br>
					<b>Following Product:</b> #TotalEmailCheck.product_title#<br>
					<b>Status:</b> <span style="color:green;">Price drops to $ #TotalEmailCheck.target_price#</span><br>
					<b>Product Page:</b> <a href="#TotalEmailCheck.url#">#TotalEmailCheck.url#</a><br><br>

					Kindest Regards,<br>
					ePriceDrop team
					<br>
				 </cfmail>			
			</cfif>
<br><br>
			<cfif (TotalEmailCheck.notify_on_any_drop EQ 1) AND (TotalEmailCheck.notify_when_in_stock EQ 0)  AND (replace(APICPrice,'$','') LT TotalEmailCheck.current_price)>
				<cfmail to="#TotalEmailCheck.email#" from="support@clockshare.com" subject="ePriceDrop Alert." type="html">
					Dear #TotalEmailCheck.last_name#,<br><br>

					One of the products that you followed on ePriceDrop has reached your desired condition. Please take a look, 						it may interest you:<br>
					<b>Following Product:</b> #TotalEmailCheck.product_title#<br>
					<b>Status:</b> <span style="color:green;">Price is lower</span><br>
					<b>Product Page:</b> <a href="#TotalEmailCheck.url#">#TotalEmailCheck.url#</a><br><br>

					Kindest Regards,<br>
					ePriceDrop team
					<br>
				 </cfmail>
			</cfif>
<br><br>
			<cfif (TotalEmailCheck.notify_on_any_drop EQ 0) AND (TotalEmailCheck.notify_when_in_stock EQ 1) AND (Avail EQ 'Usually ships in 24 hours')>

				<cfmail to="#TotalEmailCheck.email#" from="support@clockshare.com" subject="ePriceDrop Alert." type="html">
					Dear #TotalEmailCheck.last_name#,<br><br>

					One of the products that you followed on ePriceDrop has reached your desired condition. Please take a look, 						it may interest you:<br>
					<b>Following Product:</b> #TotalEmailCheck.product_title#<br>
					<b>Status:</b> <span style="color:green;">Item is available</span><br>
					<b>Product Page:</b> <a href="#TotalEmailCheck.url#">#TotalEmailCheck.url#</a><br><br>

					Kindest Regards,<br>
					ePriceDrop team
					<br>
				 </cfmail>

			</cfif>

			<!--------------------------------------------------------------------------->
		</cfloop>

<!---		<cfif false>
			<cfmail to="#form.emailaddress#"
				from="dawood4pk@gmail.com"
				subject="Amazon Updates"
				type="text">
				Dear #form.firstname#

				We, here at Amazon extenstion team, would like to thank you for joining.

				Best wishes
				Amazon extenstion team.
			</cfmail>
			<cfoutput>
				<p>Thank you #form.firstname# for registering.
				We have just sent you an email.</p>
			</cfoutput>
		</cfif>--->

	</cfif>

<cfcatch>
	<cfdump var="#cfcatch#">
</cfcatch>
</cftry>

<cffunction name="hash_hmac_sha256" output="false" returntype="string">
	<cfargument name="signMsg" type="string" required="true" />
	<cfargument name="signKey" type="string" required="true" />
	<cfset var key = createObject("java", "javax.crypto.spec.SecretKeySpec").init(signKey.getBytes(), "HmacSHA256") />
	<cfset var mac = createObject("java", "javax.crypto.Mac").getInstance("HmacSHA256") />
	<cfset mac.init(key) />
	<cfreturn toBase64(mac.doFinal(signMsg.getBytes())) />
</cffunction>

<!---<cffunction name="getObjTag" returnType="string" output="false">
    <cfargument name="obj" Type="string" required="true">
    <cfargument name="tagname" Type="string" required="true">

	<cfset var tmpArray = arrayNew(1)/>
	<cfset tmpArray = arguments.obj.split("<" & arguments.tagname.toUpperCase() & ">")/>
	<cfif arrayLen(tmpArray) gt 1>
		 <cfreturn tmpArray[2]/>
	<cfelse>
		<cfreturn ""/>
	</cfif>
</cffunction>--->