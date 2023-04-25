import Layout from "components/common/Layout"
import {getAgilityPageProps, getAgilityPaths} from "@agility/nextjs/node"
import {getModule} from "components/agility-pageModules"
import SiteHeader from "components/common/SiteHeader"

import {GetStaticProps, GetStaticPaths} from "next"
import { AgilityPageProps, ComponentWithInit } from "@agility/nextjs"

export const getStaticProps: GetStaticProps<AgilityPageProps> = async ({
	                                                                       preview,
	                                                                       params,
	                                                                       locale,
	                                                                       defaultLocale,
	                                                                       locales
                                                                       }) => {
	const globalComponents = {
		header: SiteHeader as ComponentWithInit<{}>,
	}

	const agilityProps = await getAgilityPageProps({
		preview,
		params,
		locale,
		getModule,
		defaultLocale,
		globalComponents
	})

	if (!agilityProps) {
		throw new Error(`Page not found`)
	}

	return {
		props: agilityProps,
		revalidate: 10,
	}
}

export const getStaticPaths: GetStaticPaths = async ({defaultLocale, locales}) => {
	let agilityPaths = await getAgilityPaths({
		preview: false,
		locales,
		defaultLocale,
	})

	return {
		paths: agilityPaths,
		fallback: true,
	}
}

const AgilityPage = (props:AgilityPageProps) => {
	return <Layout {...props} />
}

export default AgilityPage