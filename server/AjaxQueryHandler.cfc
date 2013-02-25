<!---<cfoutput>hello</cfoutput> <cfexit>--->
<cfcomponent displayname="AjaxQueryHandler" >
<!---cfcomponent Start--->
	
	<cffunction name="GetMemIdByUUID" access="remote" returntype="any">
		<CFQUERY name="GetMemberData" datasource="epd">
			select * from member
			where uuid = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_uuid#">
			and isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">
		</CFQUERY>
		<cfoutput>#GetMemberData.member_id#</cfoutput>
	</cffunction>

	<!---Get User's Product Details--->
	<cffunction name="GetUserItems" access="remote" returntype="any" returnFormat="JSON">

		<cfquery name="GetItems" datasource="epd">
			SELECT 		product.url, product.product_number, product.product_title, product_price.current_price,
						price_watch.target_price, price_watch.notify_on_any_drop, price_watch.notify_when_in_stock
			FROM		price_watch
			INNER JOIN 	product ON price_watch.product_id = product.product_id
			INNER JOIN	product_price ON product.product_id = product_price.product_id
			WHERE     	(product.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
			AND 		(product_price.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
			AND 		(price_watch.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
			AND 		(product_price.member_id = <cfqueryparam value="#url.MemberId#" cfsqltype="cf_sql_integer">)
		</cfquery>

		<cfoutput>

			<cfset isfirst = true>
			[
			<cfloop query="GetItems">
				<cfif NOT isfirst>,</cfif>
				<!----------------------------------------------------------------------->
				<cfset SecretAccessKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" >
				<cfset AWSAccessKeyId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" >
				<cfset AssociateTag = "ws" >
				<cfset ItemId = #GetItems.product_number# >
				<cfset Operation = "ItemLookup" >
				<cfset ResponseGroup = "ItemAttributes%2COffers%2CImages%2CReviews" >
				<cfset Service = "AWSECommerceService" >
				<!---<cfset Timestamp = #replace(url.urlTimeStamp,':','%3A','ALL')#>--->
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

				<cfset sImgPath = ''>
				<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.SmallImage.URL.XmlText")>
					<cfset sImgPath = "#MyXMLDoc.ItemLookupResponse.Items.Item.SmallImage.URL.XmlText#">
				</cfif>

				<cfset APICPrice = '$00.00' >
				<!---<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText")>
					<cfset APICPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText#">
				<cfelse>
					<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText")>
						<cfset APICPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText#">
					</cfif>
				</cfif>--->

				<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Price.FormattedPrice.XmlText")>
					<cfset APICPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Price.FormattedPrice.XmlText#">
				<cfelse>
					<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText")>
						<cfset APICPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText#">
					<cfelse>
						<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText")>
							<cfset APICPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText#">
						</cfif>
					</cfif>
				</cfif>

				<cfset Avail = ''>
				<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Availability.XmlText")>
					<cfset Avail = #MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Availability.XmlText#>
					<!---<cfdump var="#MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Availability.XmlText#">--->
				</cfif>
				<!----------------------------------------------------------------------->
				<cfset isAlert = 0 >

				<cfif (GetItems.notify_on_any_drop EQ 0) AND (GetItems.notify_when_in_stock EQ 0) AND  (replace(APICPrice,'$','') EQ GetItems.target_price)>
					<cfset isAlert = 1 >
				</cfif>

				<cfif (GetItems.notify_on_any_drop EQ 1) AND (GetItems.notify_when_in_stock EQ 0)  AND (replace(APICPrice,'$','') LT GetItems.current_price)>
					<cfset isAlert = 1 >
				</cfif>

				<cfif (GetItems.notify_on_any_drop EQ 0) AND (GetItems.notify_when_in_stock EQ 1) AND Avail EQ 'Usually ships in 24 hours'>
					<cfset isAlert = 1 >
				</cfif>
				<!----------------------------------------------------------------------->
				{"URL" : "#GetItems.url#","ProductNumber" : "#GetItems.product_number#","ProductTitle" : "#replace(GetItems.product_title,'"','\"','ALL')#","CurrentPrice" : "#GetItems.current_price#","TargetPrice" : "#GetItems.target_price#","AnyDrop" : "#GetItems.notify_on_any_drop#","InStock" : "#GetItems.notify_when_in_stock#","ImageSmall" : "#sImgPath#","IsHighLight" : "#isAlert#"}
				<cfif isfirst>
					<cfset isfirst = false>
				</cfif>
			</cfloop>
			]
		</cfoutput>
	</cffunction>
	<!---Get User's Product Details--->

	<cffunction name="hash_hmac_sha256" output="false" returntype="string">
		<cfargument name="signMsg" type="string" required="true" />
		<cfargument name="signKey" type="string" required="true" />
		<cfset var key = createObject("java", "javax.crypto.spec.SecretKeySpec").init(signKey.getBytes(), "HmacSHA256") />
		<cfset var mac = createObject("java", "javax.crypto.Mac").getInstance("HmacSHA256") />
		<cfset mac.init(key) />
		<cfreturn toBase64(mac.doFinal(signMsg.getBytes())) />
	</cffunction>

	<cffunction name="GetApi" access="remote" returntype="any" returnFormat="JSON">
		<cfset SecretAccessKey = "9N8XPp9XcWCOcwBcbPnPqjBm38/+GiEQHy/5/wNs" >

		<cfset AWSAccessKeyId = "AKIAJM6SUKYFP7RFRV2Q" >
		<cfset AssociateTag = "ws" >
		<cfset ItemId = #url.urlItemId# >
		<cfset Operation = "ItemLookup" >
		<cfset ResponseGroup = "ItemAttributes%2COffers%2CImages%2CReviews" >
		<cfset Service = "AWSECommerceService" >
		<!---<cfset Timestamp = #replace(url.urlTimeStamp,':','%3A','ALL')#>--->
		<cfset Timestamp = #DateFormat(DateAdd("h", 11, Now()), "yyyy-mm-dd")#&"T"&#TimeFormat(DateAdd("h", 11, Now()), "HH%3Amm%3Ass")#&"Z">
		<cfset Version = #DateFormat(Now(), "yyyy-mm-dd")#>

		<cfset NL=Chr(10) />

		<cfset HTTPVerb = "GET" >
		<cfset ValueOfHostHeaderInLowercase = "ecs.amazonaws.com" >
		<cfset HTTPRequestURI = "/onca/xml" >
		<cfset CanonicalizedQueryString = "AWSAccessKeyId="&#AWSAccessKeyId#&
									"&AssociateTag="&#AssociateTag#&
									"&ItemId="&#ItemId#&
									"&Operation="&#Operation#&
									"&ResponseGroup="&#ResponseGroup#&
									"&Service="&#Service#&
									"&Timestamp="&#Timestamp#&
									"&Version="&#Version#>
		<cfset StringToSign = #HTTPVerb#&#NL#&#ValueOfHostHeaderInLowercase#&#NL#&#HTTPRequestURI#&#NL#&#CanonicalizedQueryString# >
		<cfset Sig = URLEncodedFormat( hash_hmac_sha256(StringToSign, SecretAccessKey))>

		<cfset MyURL = "http://"&#ValueOfHostHeaderInLowercase#&#HTTPRequestURI#&"?"&#CanonicalizedQueryString#&"&Signature="&#Sig# >

		<cfhttp url="#MyURL#"  method="get">

		<cfset MyXMLDoc = xmlParse(Trim(cfhttp.filecontent))>

		<cfset CPrice = '$00.00' >

		<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Price.FormattedPrice.XmlText")>
			<cfset CPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.Offers.Offer.OfferListing.Price.FormattedPrice.XmlText#">
		<cfelse>
			<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText")>
				<cfset CPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.OfferSummary.LowestNewPrice.FormattedPrice.XmlText#">
			<cfelse>
				<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText")>
					<cfset CPrice = "#MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.ListPrice.FormattedPrice.XmlText#">
				</cfif>
			</cfif>
		</cfif>		

		<cfset sImgPath = ''>
		<cfif isdefined("MyXMLDoc.ItemLookupResponse.Items.Item.SmallImage.URL.XmlText")>
			<cfset sImgPath = "#MyXMLDoc.ItemLookupResponse.Items.Item.SmallImage.URL.XmlText#">
		</cfif>

		<cfoutput>
		[{"URL" : "#MyXMLDoc.ItemLookupResponse.Items.Item.DetailPageURL.XmlText#","Title" : "#replace(MyXMLDoc.ItemLookupResponse.Items.Item.ItemAttributes.Title.XmlText,'"','\"','ALL')#","CPrice" : "#CPrice#","ImageSmall" : "#sImgPath#"}]
		</cfoutput>
	</cffunction>

<!---cfcomponent end--->
</cfcomponent>