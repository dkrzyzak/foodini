import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function debounce(fn: (...params: any) => void, wait: number): (...params: any) => void {
	let timer: NodeJS.Timeout;
	return function (...params: any) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...params);
		}, wait);
	};
}

const pathMap = new Map<string, number>();

const ScrollManager: FC = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathMap.has(pathname)) {
			window.scrollTo(0, pathMap.get(pathname)!);
		} else {
			pathMap.set(pathname, 0);
			window.scrollTo(0, 0);
		}
	}, [pathname]);

	useEffect(() => {
		const fn = debounce(() => {
			pathMap.set(pathname, window.scrollY);
		}, 200);

		window.addEventListener('scroll', fn);
		return () => window.removeEventListener('scroll', fn);
	}, [pathname]);

	return null;
};

export default ScrollManager;
