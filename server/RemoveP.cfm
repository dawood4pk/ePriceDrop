<cftry>
<CFQUERY name="GetPId" datasource="epd">
	SELECT 		product.product_id, product.url
	FROM		price_watch
	INNER JOIN 	product ON price_watch.product_id = product.product_id
	INNER JOIN	product_price ON product.product_id = product_price.product_id
	WHERE     	(product.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
	AND 		(product_price.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
	AND 		(price_watch.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
	AND 		(product.product_number = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_product_number#">)
	AND 		(product_price.member_id = <cfqueryparam value="#url.usr_member_id#" cfsqltype="cf_sql_integer">)
</CFQUERY>
<cfset total_rows = GetPId.recordCount>
<cfif total_rows gt 0>
	<cftransaction>
		<CFQUERY name="UpdateProduct" datasource="epd">
			UPDATE product
			SET isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="false">
			WHERE product_id = <cfqueryparam cfsqltype="cf_sql_integer" value="#GetPId.product_id#">
			AND	product_number = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_product_number#">
		</CFQUERY>
		<CFQUERY name="UpdateProductPrice" datasource="epd">
			UPDATE product_price
			SET isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="false">
			WHERE product_id = <cfqueryparam cfsqltype="cf_sql_integer" value="#GetPId.product_id#">
			AND	member_id = <cfqueryparam value="#url.usr_member_id#" cfsqltype="cf_sql_integer">
		</CFQUERY>
		<CFQUERY name="UpdatePriceWatch" datasource="epd">
			UPDATE price_watch
			SET isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="false">
			WHERE product_id = <cfqueryparam cfsqltype="cf_sql_integer" value="#GetPId.product_id#">
			AND	member_id = <cfqueryparam value="#url.usr_member_id#" cfsqltype="cf_sql_integer">
		</CFQUERY>
	</cftransaction>
	<cfif isdefined("url.redirect")>
		<cflocation url="#GetPId.url#" addtoken="no">
	</cfif>
	1
<cfelse>
	<cfif isdefined("url.redirect")>
		<cflocation url="#GetPId.url#" addtoken="no">
	</cfif>
	0
</cfif>

<cfcatch>
	error
	<!---<cfdump var="#cfcatch#">--->
</cfcatch>
</cftry>