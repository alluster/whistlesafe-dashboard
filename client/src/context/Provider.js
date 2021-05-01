import React, { useState,useEffect } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useAuth0 } from "@auth0/auth0-react";

const Provider = ({ children }) => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [orgColor, setOrgColor] = useState("#000")
	const [logoUrl, setLogoUrl] = useState("./logo-dark.svg")
	const [orgId, setOrgId] = useState()
	const GetOrg = async () => {
		if (!isLoading) {
			await axios.get('/api/organisation', {
				params: {
					orgId: user.org_id
				}
			})
				.then(function (response) {
					let data = response.data
					setOrgColor(data.branding.colors.primary)
					setLogoUrl(data.branding.logo_url)
				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {
				});
		}
	}
	useEffect(() => {
		// if(isLoading) {setTimeout(function(){ window.location.reload(); }, 3000);}
		return () => {
			
		}
	}, [])
	return (
		<AppContext.Provider
			value={{
				orgColor,
				logoUrl,
				orgId,
				user,
				isAuthenticated,
				GetOrg,

			}}
		>
			{children}
		</AppContext.Provider>
	);
}
Provider.propTypes = {
	children: PropTypes.any
};

export default Provider;