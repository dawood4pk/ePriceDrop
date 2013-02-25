<CFQUERY name="GetMemberData" datasource="epd">
	select * from member
	where email = <cfqueryparam cfsqltype="cf_sql_varchar" value="#url.usr_email#">
	and isactive = <cfqueryparam cfsqltype="cf_sql_bit" value="true">
</CFQUERY>
<cfset total_rows = GetMemberData.recordCount>
<cfif total_rows gt 0>
	<cfif GetMemberData.password EQ '#url.usr_password#'>
		<cfoutput>#GetMemberData.member_id#</cfoutput>
	<cfelse>
		-1
	</cfif>
<cfelse>
	0
</cfif>