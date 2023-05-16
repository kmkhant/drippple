import "../styles/globals.css";

import type { AppProps } from "next/app";

import Layout from "../src/Components/Layout/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import queryClient from "@/services/react-query";
import store, { persistor } from "@/store";
import { QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</QueryClientProvider>
			</PersistGate>
		</ReduxProvider>
	);
}

export default MyApp;
