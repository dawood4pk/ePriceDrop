<cftry>
<CFQUERY name="CheckEmail" datasource="epd">
	select * from member where email = '#usr_email#'
</CFQUERY>
<cfset total_rows = CheckEmail.recordCount>
<cfif total_rows lt 1>
	<CFQUERY name="RatingEnter" datasource="epd">
		INSERT INTO member
		(
			first_name,
			last_name,
			email,
			password,
			uuid,
			update_date,
			isactive
		)
		values
		(
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_fname#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_lname#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_email#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_password#">,
			<cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_uuid#">,
			<cfqueryparam cfsqltype="cf_sql_date" value="#Now()#">,
			<cfqueryparam cfsqltype="cf_sql_bit" value="true">
		)

		SELECT member_id
		FROM member
		WHERE member_id = @@IDENTITY
	</CFQUERY>
	<cfoutput>#RatingEnter.member_id#</cfoutput>
<cfelse>
	Email already Exists!
</cfif>

<cfcatch>
	<cfdump var="#cfcatch#">
</cfcatch>
</cftry>