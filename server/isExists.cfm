<cfif isdefined("URL.id")>
	<CFQUERY name="isExists" datasource="epd">
		SELECT     	product.product_id, product.product_number, product.product_title
		FROM       	price_watch
		INNER JOIN	product ON price_watch.product_id = product.product_id
		INNER JOIN	product_price ON product.product_id = product_price.product_id
		WHERE     	(product.product_number = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_product_number#">)
		AND 		(product_price.member_id = <cfqueryparam cfsqltype="cf_sql_integer" value="#url.usr_member_id#">)
		AND 		(product.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(product_price.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(price_watch.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)

	</CFQUERY>
	<cfset total_rows = isExists.recordCount>
	<cfif total_rows gt 0>
		<cfoutput>#total_rows#</cfoutput>
	<cfelse>
		0
	</cfif>
</cfif>

<cfif isdefined("URL.uuid")>
	<CFQUERY name="isExists" datasource="epd">
		SELECT  	product.product_id, product.product_number, product.product_title
		FROM		price_watch
		INNER JOIN	product ON price_watch.product_id = product.product_id
		INNER JOIN	product_price ON product.product_id = product_price.product_id
		INNER JOIN	member ON price_watch.member_id = member.member_id
		WHERE     	(product.product_number = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_product_number#">)
		AND 		(product.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(product_price.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
		AND 		(price_watch.isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">)
        AND 		(member.uuid = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_uuid#">)
	</CFQUERY>
	<cfset total_rows = isExists.recordCount>
	<cfif total_rows gt 0>
		<cfoutput>#total_rows#</cfoutput>
	<cfelse>
		0
	</cfif>
</cfif>