<cftry>
<!---<cfdump var="#url#"><cfabort>--->
<cftransaction>
	<CFQUERY name="InsertProduct" datasource="epd">
		INSERT INTO product
		(
			url,
			product_number,
			product_title,
			isactive
		)
		values
		(
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_url#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_product_number#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_product_title#">,
			<cfqueryparam cfsqltype="cf_sql_bit" value="true">
		)

		SELECT product_id
		FROM product
		WHERE product_id = @@IDENTITY
	</CFQUERY>
	<cfset New_product_id = #InsertProduct.product_id#>

	<CFQUERY name="InsertProductPrice" datasource="epd">
		INSERT INTO product_price
		(
			product_id,
			current_price,
			date_added,
			member_id,
			isactive
		)
		values
		(
			<cfqueryparam cfsqltype="cf_sql_integer" value="#New_product_id#">,
			<cfqueryparam cfsqltype="cf_sql_money" value="#url.usr_current_price#">,
			<cfqueryparam cfsqltype="cf_sql_date" value="#Now()#">,
			<cfqueryparam cfsqltype="cf_sql_integer" value="#url.usr_member_id#">,
			<cfqueryparam cfsqltype="cf_sql_bit" value="true">
		)
	</CFQUERY>

	<CFQUERY name="InsertPriceWatch" datasource="epd">
		INSERT INTO price_watch
		(
			product_id,
			member_id,
			target_price,
			notify_on_any_drop,
			notify_when_in_stock,
			date_added,
			date_updated,
			date_clicked_link,
			clicked_price,
			isactive
		)
		values 
		(
			<cfqueryparam cfsqltype="cf_sql_integer" value="#New_product_id#">,
			<cfqueryparam cfsqltype="cf_sql_integer" value="#url.usr_member_id#">,
			<cfqueryparam cfsqltype="cf_sql_money" value="#url.usr_target_price#">,
			<cfqueryparam cfsqltype="cf_sql_bit" value="#url.usr_notify_on_any_drop#">,
			<cfqueryparam cfsqltype="cf_sql_bit" value="#url.usr_notify_when_in_stock#">,
			<cfqueryparam cfsqltype="cf_sql_date" value="#Now()#">,
			<cfqueryparam cfsqltype="cf_sql_date" value="#Now()#">,
			<cfqueryparam cfsqltype="cf_sql_date" value="#Now()#">,
			<cfqueryparam cfsqltype="cf_sql_money" value="#url.usr_clicked_price#">,
			<cfqueryparam cfsqltype="cf_sql_bit" value="true">
		)
	</CFQUERY>
	Your product watch created successfully!
</cftransaction>

<cfcatch>
error
	<!---<cfdump var="#cfcatch#">--->
</cfcatch>
</cftry>