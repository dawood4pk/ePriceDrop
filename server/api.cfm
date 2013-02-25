<cftry>
	<cffunction name="hash_hmac_sha256" output="false" returntype="string">
	   <cfargument name="signMsg" type="string" required="true" />
	   <cfargument name="signKey" type="string" required="true" />
	   <cfset var key = createObject("java", "javax.crypto.spec.SecretKeySpec").init(signKey.getBytes(), "HmacSHA256") />
	   <cfset var mac = createObject("java", "javax.crypto.Mac").getInstance("HmacSHA256") />
	   <cfset mac.init(key) />
	   <cfreturn toBase64(mac.doFinal(signMsg.getBytes())) />
	</cffunction>
	
	<cfset SecretAccessKey = "9N8XPp9XcWCOcwBcbPnPqjBm38/+GiEQHy/5/wNs" >
	<cfset AWSAccessKeyId = "AKIAJM6SUKYFP7RFRV2Q" >
	<cfset AssociateTag = "ws" >
	<cfset ItemId = #url.item# >
	<cfset Operation = "ItemLookup" >
	<cfset ResponseGroup = "ItemAttributes%2COffers%2CImages%2CReviews" >
	<cfset Service = "AWSECommerceService" >
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
	<cfdump var="#MyXMLDoc#">

<cfcatch>
	<cfdump var="#cfcatch#">
</cfcatch>
</cftry>