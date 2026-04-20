When generating dialog, modal, or overlay components in React, always use React Portals (createPortal) to render the component outside of the main DOM hierarchy (e.g., into a dedicated #modal-root element).

Ensure the dialog:

Is rendered using createPortal from ReactDOM
Uses a proper overlay (backdrop) layer
Handles accessibility basics (focus trap, ESC to close if applicable)
Keeps styling customizable (do not hardcode styles unless requested)
Avoids rendering modals inline in the component tree

Prefer clean, reusable modal structures and separation of concerns.