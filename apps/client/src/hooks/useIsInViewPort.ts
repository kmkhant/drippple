import { useEffect, useMemo, useState } from "react";

export function useIsInViewport(
	ref:
		| React.MutableRefObject<null>
		| React.MutableRefObject<Element>
) {
	const [isIntersecting, setIsIntersecting] =
		useState<boolean>(false);

	if (typeof window !== "undefined") {
		const observer = useMemo(
			() =>
				new IntersectionObserver(([entry]) =>
					setIsIntersecting(entry.isIntersecting)
				),
			[]
		);

		useEffect(() => {
			if (ref.current) {
				observer.observe(ref.current);
			}

			return () => {
				observer.disconnect();
			};
		}, [ref, observer]);
	}

	return isIntersecting;
}
