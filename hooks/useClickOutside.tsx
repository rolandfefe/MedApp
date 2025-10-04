// import { RefObject, useEffect } from 'react';

// function useClickOutside<T extends HTMLElement>(
//   ref: RefObject<T>,
//   handler: (event: MouseEvent | TouchEvent) => void
// ): void {
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent | TouchEvent) => {
//       if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
//         return;
//       }

//       handler(event);
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('touchstart', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, [ref, handler]);
// }

// export default useClickOutside;

import { RefObject, useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T>,
	handler: (event: MouseEvent | TouchEvent) => void
): void {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (!ref?.current) {
				return;
			}

			const target = event.target as Node;

			// Check if click is inside the main ref element
			if (ref.current.contains(target)) {
				return;
			}

			// Check if click is inside any child elements that should be considered "inside"
			// This includes Shadcn components like Select, Popover, etc.
			const childElements = ref.current.querySelectorAll("[data-click-inside]");
			for (const child of childElements) {
				if (child.contains(target)) {
					return;
				}
			}

			// Check for common Shadcn UI component containers
			const shadcnSelectors = [
				".select-container",
				"[data-radix-select]",
				"[data-radix-popover-trigger]",
				"[data-radix-dropdown-menu-trigger]",
				".dialog-content",
				".popover-content",
				".dropdown-menu-content",
				".select-content",
			];

			for (const selector of shadcnSelectors) {
				const shadcnElements = ref.current.querySelectorAll(selector);
				for (const element of shadcnElements) {
					if (element.contains(target)) {
						return;
					}
				}
			}

			handler(event);
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [ref, handler]);
}

export default useClickOutside;
