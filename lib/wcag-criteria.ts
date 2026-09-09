export type TestMethod =
  | 'keyboard'
  | 'screen_reader'
  | 'visual'
  | 'automated'
  | 'manual';

export type TestStep = {
  order: number;
  method: TestMethod;
  instruction: string;
};

export type TestTool = {
  name: string;
  url?: string;
  free: boolean;
};

export type Criterion = {
  id: string;
  level: 'A' | 'AA';
  principle: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
  guideline: string;
  title: string;
  description: string;
  howToTest: TestStep[];
  tools: TestTool[];
  wcagUrl: string;
  lighthouseAuditIds?: string[]; // maps to Lighthouse audit IDs
};

export const wcagCriteria: Criterion[] = [

  // ── PERCEIVABLE ──────────────────────────────────────────────

  {
    id: '1.1.1',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Text Alternatives',
    title: 'Non-text Content',
    description: 'All non-text content has a text alternative that serves the equivalent purpose, except for specific situations such as controls, time-based media, tests, and decorative content.',
    tools: [
      { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/', free: true },
      { name: 'WAVE', url: 'https://wave.webaim.org/', free: true },
      { name: 'Screen Reader', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools or WAVE and check for missing or empty alt attribute violations on images.' },
      { order: 2, method: 'visual', instruction: 'Inspect all images on the page. Meaningful images should have descriptive alt text. Decorative images should have an empty alt attribute (alt="") and no title or aria-label.' },
      { order: 3, method: 'screen_reader', instruction: 'Enable VoiceOver (Mac: Cmd+F5) or NVDA (Windows: Ctrl+Alt+N). Navigate through images — each meaningful image should be announced with a descriptive name. Decorative images should be skipped silently.' },
      { order: 4, method: 'visual', instruction: 'Check that CAPTCHAs provide an audio or alternative method. Check that charts and graphs have text alternatives explaining the data.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    lighthouseAuditIds: [
  'image-alt',
  'input-image-alt',
  'role-img-alt',
  'image-redundant-alt',
  'object-alt',
],
  },

  {
    id: '1.2.1',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Time-based Media',
    title: 'Audio-only and Video-only (Prerecorded)',
    description: 'For prerecorded audio-only and video-only media, a text alternative is provided that presents equivalent information.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Identify any audio-only content (podcasts, audio clips). Verify a transcript is provided nearby or linked.' },
      { order: 2, method: 'visual', instruction: 'Identify any video-only content (silent animations, silent video). Verify either a text description or audio track describes the visual content.' },
      { order: 3, method: 'manual', instruction: 'Read the transcript or description and confirm it conveys all meaningful information from the media.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html',
  },

  {
    id: '1.2.2',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Time-based Media',
    title: 'Captions (Prerecorded)',
    description: 'Captions are provided for all prerecorded audio content in synchronized media.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Play any prerecorded video with audio. Enable captions and verify they are available.' },
      { order: 2, method: 'visual', instruction: 'Verify captions are synchronized with the audio — they should appear at the same time as the spoken words.' },
      { order: 3, method: 'manual', instruction: 'Read the captions while watching the video. Confirm they accurately represent the spoken content including speaker identification and relevant sound effects.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html',
  },

  {
    id: '1.2.3',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Time-based Media',
    title: 'Audio Description or Media Alternative (Prerecorded)',
    description: 'An alternative for time-based media or audio description is provided for prerecorded synchronized media.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'For each video, check whether an audio description track or full text transcript is available.' },
      { order: 2, method: 'manual', instruction: 'If an audio description is provided, enable it and verify it describes all meaningful visual content not conveyed by the audio alone.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html',
  },

  {
    id: '1.2.4',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Time-based Media',
    title: 'Captions (Live)',
    description: 'Captions are provided for all live audio content in synchronized media.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'If the page includes any live video streams or webcasts, verify real-time captions are provided.' },
      { order: 2, method: 'manual', instruction: 'Confirm the captions keep pace with live speech and accurately represent the content.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html',
  },

  {
    id: '1.2.5',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Time-based Media',
    title: 'Audio Description (Prerecorded)',
    description: 'Audio description is provided for all prerecorded video content in synchronized media.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'For each prerecorded video, check whether an audio description track is available in addition to any transcript.' },
      { order: 2, method: 'manual', instruction: 'Enable the audio description and verify it describes all meaningful visual content that the main audio does not cover.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html',
  },

  {
    id: '1.3.1',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Adaptable',
    title: 'Info and Relationships',
    description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
    tools: [
      { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/', free: true },
      { name: 'Chrome DevTools Accessibility Panel', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools and review any landmark, heading, list, or table structure violations.' },
      { order: 2, method: 'visual', instruction: 'Check that headings follow a logical hierarchy (h1, h2, h3) without skipping levels. Verify lists use ul/ol elements, not just visual indentation.' },
      { order: 3, method: 'manual', instruction: 'Open Chrome DevTools and inspect the Accessibility panel to review the accessibility tree. Confirm visual structure (sections, tables, forms) is reflected in semantic markup.' },
      { order: 4, method: 'visual', instruction: 'Check that form fields have associated labels, table headers use th elements, and required fields are indicated both visually and programmatically.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    lighthouseAuditIds: [
  'heading-order',
  'table-duplicate-name',
  'td-headers-attr',
  'th-has-data-cells',
  'definition-list',
  'dlitem',
  'list',
  'listitem',
  'landmark-complementary-is-top-level',
  'landmark-main-is-top-level',
  'landmark-no-duplicate-banner',
  'landmark-no-duplicate-contentinfo',
  'landmark-no-duplicate-main',
],
  },

  {
    id: '1.3.2',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Adaptable',
    title: 'Meaningful Sequence',
    description: 'If the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
    tools: [
      { name: 'Screen Reader', free: true },
      { name: 'Chrome DevTools', free: true },
    ],
    howToTest: [
      { order: 1, method: 'screen_reader', instruction: 'Use a screen reader to read through the page linearly. Confirm the reading order matches the visual and logical order of the content.' },
      { order: 2, method: 'manual', instruction: 'Disable CSS (in Chrome DevTools, open the Rendering tab and check "Disable CSS"). Verify the content order still makes sense without visual styling.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html',
  },

  {
    id: '1.3.3',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Adaptable',
    title: 'Sensory Characteristics',
    description: 'Instructions do not rely solely on sensory characteristics such as shape, color, size, visual location, orientation, or sound.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Search the page for instructions like "click the round button", "see the section on the right", or "the red fields are required". These must not be the only way to identify something.' },
      { order: 2, method: 'manual', instruction: 'Verify that any instruction referencing shape, color, or position also includes a text label or other non-sensory identifier.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html',
  },

  {
    id: '1.3.4',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Adaptable',
    title: 'Orientation',
    description: 'Content does not restrict its view and operation to a single display orientation unless the orientation is essential.',
    tools: [
      { name: 'Chrome DevTools Device Toolbar', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'In Chrome DevTools, open the Device Toolbar (Ctrl/Cmd+Shift+M) and toggle between portrait and landscape orientations.' },
      { order: 2, method: 'visual', instruction: 'Verify all content and functionality is available in both orientations. Nothing should be hidden or broken when rotated.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/orientation.html',
  },

  {
    id: '1.3.5',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Adaptable',
    title: 'Identify Input Purpose',
    description: 'The purpose of form inputs that collect personal information can be programmatically determined.',
    tools: [
      { name: 'Chrome DevTools', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Inspect form fields that collect personal data (name, email, phone, address, credit card). Verify each has an appropriate autocomplete attribute (e.g. autocomplete="given-name", autocomplete="email").' },
      { order: 2, method: 'visual', instruction: 'Check that the autocomplete values match the actual purpose of the field — "email" on an email field, "tel" on a phone field, etc.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html',
    lighthouseAuditIds: ['autocomplete-valid'],
  },

  {
    id: '1.4.1',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Use of Color',
    description: 'Color is not used as the only visual means of conveying information, indicating an action, or distinguishing a visual element.',
    tools: [
      { name: 'Manual Review', free: true },
      { name: 'Color Contrast Analyzer', url: 'https://www.tpgi.com/color-contrast-checker/', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Look for any information conveyed only through color — red for errors, green for success, colored chart lines. Each must have an additional indicator (icon, label, pattern, text).' },
      { order: 2, method: 'visual', instruction: 'Check links within body text. If links are only distinguished from surrounding text by color, they must also be underlined or have another non-color indicator.' },
      { order: 3, method: 'manual', instruction: 'View the page in grayscale using Chrome DevTools rendering options to emulate vision deficiencies. Verify all information remains clear.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
  },

  {
    id: '1.4.2',
    level: 'A',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Audio Control',
    description: 'If any audio plays automatically for more than 3 seconds, a mechanism is available to pause, stop, or control the volume.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Load the page and listen for any audio that starts playing automatically.' },
      { order: 2, method: 'visual', instruction: 'If audio plays automatically for more than 3 seconds, verify a pause, stop, or volume control is available at the top of the page or is the first interactive element.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html',
  },

  {
    id: '1.4.3',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Contrast (Minimum)',
    description: 'Text and images of text have a contrast ratio of at least 4.5:1, except for large text (3:1), incidental text, and logotypes.',
    tools: [
      { name: 'Colour Contrast Analyser', url: 'https://www.tpgi.com/color-contrast-checker/', free: true },
      { name: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/', free: true },
      { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools and check for color contrast violations.' },
      { order: 2, method: 'manual', instruction: 'Use the Colour Contrast Analyser to sample foreground and background colors from body text. Ratio must be at least 4.5:1.' },
      { order: 3, method: 'manual', instruction: 'For large text (18pt or 14pt bold), the minimum ratio is 3:1. Test large headings separately.' },
      { order: 4, method: 'visual', instruction: 'Pay special attention to placeholder text, disabled elements, and text over images — these are commonly missed.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    lighthouseAuditIds: ['color-contrast', 'color-contrast-enhanced'],
  },

  {
    id: '1.4.4',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Resize Text',
    description: 'Text can be resized up to 200% without loss of content or functionality.',
    tools: [
      { name: 'Browser Zoom', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Use the browser zoom to increase text size to 200% (Ctrl/Cmd + until 200% is shown in the browser).' },
      { order: 2, method: 'visual', instruction: 'Verify all text is still readable — no text is clipped, hidden, or overlapping. All functionality remains available.' },
      { order: 3, method: 'visual', instruction: 'Check that content reflows rather than requiring horizontal scrolling at 200% zoom.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html',
  },

  {
    id: '1.4.5',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Images of Text',
    description: 'If technologies can achieve the visual presentation, text is used to convey information rather than images of text.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Look for any images that contain text — banners, buttons, logos with text. These should use real text with CSS styling instead.' },
      { order: 2, method: 'manual', instruction: 'Right-click and inspect suspected text images. If the element is an img tag containing visible text, it fails unless it is a logotype or the text presentation is essential.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html',
  },

  {
    id: '1.4.10',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Reflow',
    description: 'Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions at 320px width.',
    tools: [
      { name: 'Chrome DevTools Device Toolbar', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'In Chrome DevTools, open the Device Toolbar and set the width to 320px.' },
      { order: 2, method: 'visual', instruction: 'Verify all content is readable without horizontal scrolling. Content should reflow into a single column.' },
      { order: 3, method: 'visual', instruction: 'Exception: data tables and complex maps may require two-dimensional scrolling — these are acceptable.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',
  },

  {
    id: '1.4.11',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Non-text Contrast',
    description: 'UI components and graphical objects have a contrast ratio of at least 3:1 against adjacent colors.',
    tools: [
      { name: 'Colour Contrast Analyser', url: 'https://www.tpgi.com/color-contrast-checker/', free: true },
      { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Use the Colour Contrast Analyser to check the contrast of form field borders, button boundaries, focus indicators, and icons against their background. Minimum ratio is 3:1.' },
      { order: 2, method: 'visual', instruction: 'Check checkboxes, radio buttons, and toggle switches — their visual boundary must meet 3:1 contrast.' },
      { order: 3, method: 'keyboard', instruction: 'Tab through the page and verify that the focus indicator (outline) has at least 3:1 contrast against the adjacent background.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
    lighthouseAuditIds: ['non-composited-animations'],
  },

  {
    id: '1.4.12',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Text Spacing',
    description: 'No loss of content occurs when text spacing is modified: line height 1.5x, letter spacing 0.12em, word spacing 0.16em, paragraph spacing 2x.',
    tools: [
      { name: 'Text Spacing Bookmarklet', url: 'https://www.html5accessibility.com/tests/tsbookmarklet.html', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Install the Text Spacing bookmarklet and activate it on the page. It applies the maximum spacing values from the WCAG criterion.' },
      { order: 2, method: 'visual', instruction: 'Verify no text is clipped, hidden, or overlapping after the spacing is applied. All content and functionality should remain intact.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html',
  },

  {
    id: '1.4.13',
    level: 'AA',
    principle: 'Perceivable',
    guideline: 'Distinguishable',
    title: 'Content on Hover or Focus',
    description: 'Where hovering or focusing reveals additional content, that content is dismissible, hoverable, and persistent.',
    tools: [
      { name: 'Keyboard', free: true },
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Identify any content that appears on hover — tooltips, dropdown menus, sub-navigation, popups.' },
      { order: 2, method: 'keyboard', instruction: 'Verify the same content appears when the trigger receives keyboard focus, not only on mouse hover.' },
      { order: 3, method: 'manual', instruction: 'Press Escape and verify the hover/focus content can be dismissed without moving focus.' },
      { order: 4, method: 'manual', instruction: 'Move the mouse over the revealed content — it should stay visible and not disappear when hovering over it.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html',
  },

  // ── OPERABLE ──────────────────────────────────────────────────

  {
    id: '2.1.1',
    level: 'A',
    principle: 'Operable',
    guideline: 'Keyboard Accessible',
    title: 'Keyboard',
    description: 'All functionality is available from a keyboard without requiring specific timings for individual keystrokes.',
    tools: [
      { name: 'Keyboard', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Put down your mouse. Press Tab to move forward through all interactive elements, Shift+Tab to move backward. Every button, link, form field, and control must be reachable.' },
      { order: 2, method: 'keyboard', instruction: 'Activate each interactive element using Enter or Space. Verify the action works identically to clicking with a mouse.' },
      { order: 3, method: 'keyboard', instruction: 'Test dropdown menus, date pickers, sliders, and custom widgets with the keyboard. They should follow expected ARIA keyboard patterns (arrow keys for lists, Escape to close).' },
      { order: 4, method: 'keyboard', instruction: 'Check for any functionality that requires mouse hover to reveal — tooltips, menus, reveal-on-hover buttons. These must also work with keyboard focus.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
  lighthouseAuditIds: ['accesskeys', 'custom-controls-labels', 'custom-controls-roles', 'focusable-controls'],
  },

  {
    id: '2.1.2',
    level: 'A',
    principle: 'Operable',
    guideline: 'Keyboard Accessible',
    title: 'No Keyboard Trap',
    description: 'If keyboard focus can be moved to a component using a keyboard interface, focus can be moved away using only a keyboard.',
    tools: [
      { name: 'Keyboard', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Tab through the entire page. At every interactive element, verify you can move focus away using Tab, Shift+Tab, Escape, or another documented key.' },
      { order: 2, method: 'keyboard', instruction: 'Open any modals, drawers, or overlays. Verify that Escape closes them and returns focus to the trigger. Focus should not escape the modal while it is open (intentional trapping is acceptable).' },
      { order: 3, method: 'keyboard', instruction: 'Test embedded iframes, media players, and third-party widgets — these are common sources of keyboard traps.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html',
  },

  {
    id: '2.1.4',
    level: 'A',
    principle: 'Operable',
    guideline: 'Keyboard Accessible',
    title: 'Character Key Shortcuts',
    description: 'If a keyboard shortcut uses only letter, punctuation, number, or symbol characters, a mechanism is available to turn it off or remap it.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Check whether the page or application has single-character keyboard shortcuts (e.g. pressing "S" to save).' },
      { order: 2, method: 'manual', instruction: 'If single-character shortcuts exist, verify a mechanism to turn them off or remap them is available in settings.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html',
  },

  {
    id: '2.2.1',
    level: 'A',
    principle: 'Operable',
    guideline: 'Enough Time',
    title: 'Timing Adjustable',
    description: 'For each time limit set by the content, the user can turn off, adjust, or extend the time limit.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Identify any timed interactions — session timeouts, auto-advancing carousels, auto-submit forms.' },
      { order: 2, method: 'manual', instruction: 'For session timeouts: verify the user is warned before expiry and given the option to extend. For carousels: verify auto-advance can be paused.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html',
  },

  {
    id: '2.2.2',
    level: 'A',
    principle: 'Operable',
    guideline: 'Enough Time',
    title: 'Pause, Stop, Hide',
    description: 'For moving, blinking, scrolling, or auto-updating content, a mechanism exists to pause, stop, or hide it.',
    tools: [
      { name: 'Keyboard', free: true },
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Identify any content that moves, blinks, scrolls, or auto-updates — carousels, ticker tapes, animations, live feeds.' },
      { order: 2, method: 'keyboard', instruction: 'Verify a pause, stop, or hide control is available and reachable by keyboard for any such content.' },
      { order: 3, method: 'visual', instruction: 'Check that no content blinks more than 3 times per second (this can trigger seizures).' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
  },

  {
    id: '2.3.1',
    level: 'A',
    principle: 'Operable',
    guideline: 'Seizures and Physical Reactions',
    title: 'Three Flashes or Below Threshold',
    description: 'Web pages do not contain anything that flashes more than three times in any one second period.',
    tools: [
      { name: 'PEAT (Photosensitive Epilepsy Analysis Tool)', url: 'https://trace.umd.edu/peat/', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Look for any flashing, strobing, or rapidly alternating content on the page.' },
      { order: 2, method: 'automated', instruction: 'If flashing content is present, run it through PEAT (Photosensitive Epilepsy Analysis Tool) to verify it is below the threshold.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html',
  },

  {
    id: '2.4.1',
    level: 'A',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Bypass Blocks',
    description: 'A mechanism is available to bypass blocks of content that are repeated on multiple pages.',
    tools: [
      { name: 'Keyboard', free: true },
      { name: 'Screen Reader', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Press Tab on the page. The very first focusable element should be a "Skip to main content" link. Press Enter to activate it and verify focus moves past the navigation to the main content.' },
      { order: 2, method: 'screen_reader', instruction: 'Alternatively, verify the page uses proper landmark regions (header, nav, main, footer) — screen reader users can navigate by landmark as a bypass mechanism.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html',
    lighthouseAuditIds: ['bypass', 'landmark-one-main', 'page-has-heading-one'],
  },

  {
    id: '2.4.2',
    level: 'A',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Page Titled',
    description: 'Web pages have titles that describe topic or purpose.',
    tools: [
      { name: 'Browser Tab', free: true },
      { name: 'axe DevTools', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Look at the browser tab — it should show a descriptive page title that identifies the current page and ideally the site name.' },
      { order: 2, method: 'manual', instruction: 'Inspect the page source and verify the title element is present, non-empty, and descriptive. "Home | Site Name" is acceptable. "Untitled" or an empty title fails.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html',
    lighthouseAuditIds: ['document-title'],
  },

  {
    id: '2.4.3',
    level: 'A',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Focus Order',
    description: 'If a page can be navigated sequentially, focusable components receive focus in an order that preserves meaning and operability.',
    tools: [
      { name: 'Keyboard', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Tab through the entire page from top to bottom. Focus should move in a logical reading order — generally left to right, top to bottom.' },
      { order: 2, method: 'keyboard', instruction: 'Open any modals, dropdowns, or dynamic content and verify focus moves into the new content appropriately.' },
      { order: 3, method: 'visual', instruction: 'Check that focus is never sent to a surprising or unrelated location. Activating a button should not send focus to a completely different part of the page without warning.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html',
  },

  {
    id: '2.4.4',
    level: 'A',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Link Purpose (In Context)',
    description: 'The purpose of each link can be determined from the link text alone, or from the link text together with its programmatically determined context.',
    tools: [
      { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/', free: true },
      { name: 'Screen Reader', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools and check for empty link violations.' },
      { order: 2, method: 'screen_reader', instruction: 'Use a screen reader to navigate by links only (NVDA: Insert+F7, VoiceOver: Ctrl+Option+U then arrow to Links). Each link should make sense out of context — avoid "click here", "read more", "learn more" without additional context.' },
      { order: 3, method: 'visual', instruction: 'Check that icon-only links have an aria-label or title that describes the destination.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html',
    lighthouseAuditIds: ['link-name', 'link-in-text-block'],
  },

  {
    id: '2.4.5',
    level: 'AA',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Multiple Ways',
    description: 'More than one way is available to locate a web page within a set of web pages.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Verify the site provides at least two ways to find pages: navigation menu, site search, sitemap, breadcrumbs, or links from related pages.' },
      { order: 2, method: 'manual', instruction: 'Exception: pages that are part of a process (checkout step 2 of 3) are exempt from this requirement.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html',
  },

  {
    id: '2.4.6',
    level: 'AA',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Headings and Labels',
    description: 'Headings and labels describe topic or purpose.',
    tools: [
      { name: 'Screen Reader', free: true },
      { name: 'axe DevTools', free: true },
    ],
    howToTest: [
      { order: 1, method: 'screen_reader', instruction: 'Navigate by headings using the screen reader (NVDA: H key, VoiceOver: Ctrl+Option+Cmd+H). Each heading should clearly describe the section it introduces.' },
      { order: 2, method: 'visual', instruction: 'Review all form field labels. Each label should clearly describe what information is expected — "First Name" not just "Name", "Email Address" not just "Email".' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html',
  },

  {
    id: '2.4.7',
    level: 'AA',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Focus Visible',
    description: 'Any keyboard operable interface has a mode of operation where the keyboard focus indicator is visible.',
    tools: [
      { name: 'Keyboard', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Tab through every interactive element on the page. At each stop, verify a visible focus indicator is shown — typically an outline or border around the element.' },
      { order: 2, method: 'visual', instruction: 'Check that the focus indicator has sufficient contrast and size to be clearly visible. A barely visible dotted outline on a white background fails.' },
      { order: 3, method: 'visual', instruction: 'Verify focus is never suppressed using outline: none or outline: 0 in CSS without a replacement indicator.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
   lighthouseAuditIds: ['focus-traps', 'focusable-controls', 'interactive-element-affordance'],
  },

  {
    id: '2.4.11',
    level: 'AA',
    principle: 'Operable',
    guideline: 'Navigable',
    title: 'Focus Not Obscured (Minimum)',
    description: 'When a user interface component receives keyboard focus, the component is not entirely hidden by author-created content such as sticky headers, footers, or cookie banners.',
    tools: [
      { name: 'Keyboard', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Tab through the page, paying attention to any sticky headers, footers, chat widgets, or cookie banners that overlay content.' },
      { order: 2, method: 'visual', instruction: 'At each focus stop, verify the focused element is at least partially visible and not completely covered by the overlay.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
  },

  {
    id: '2.5.1',
    level: 'A',
    principle: 'Operable',
    guideline: 'Input Modalities',
    title: 'Pointer Gestures',
    description: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless essential.',
    tools: [
      { name: 'Manual Review', free: true },
      { name: 'Touch Device', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Identify any functionality requiring multipoint gestures (pinch-to-zoom) or path-based gestures (swipe, drag along a path).' },
      { order: 2, method: 'manual', instruction: 'Verify a single-pointer alternative exists — e.g. zoom buttons alongside pinch-to-zoom, tap alongside swipe.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html',
  },

  {
    id: '2.5.2',
    level: 'A',
    principle: 'Operable',
    guideline: 'Input Modalities',
    title: 'Pointer Cancellation',
    description: 'For functionality operated using a single pointer, the down-event does not trigger completion, or the action can be aborted or undone.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Press down on a button or control and drag away before releasing. The action should not fire on mousedown/touchstart alone.' },
      { order: 2, method: 'manual', instruction: 'Verify the action completes on the up-event, and can be cancelled by moving the pointer off the control before release.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html',
  },

  {
    id: '2.5.3',
    level: 'A',
    principle: 'Operable',
    guideline: 'Input Modalities',
    title: 'Label in Name',
    description: 'For user interface components with labels that include text or images of text, the accessible name contains the visible label text.',
    tools: [
      { name: 'axe DevTools', free: true },
      { name: 'Screen Reader', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools and check for label-content-name-mismatch violations.' },
      { order: 2, method: 'screen_reader', instruction: 'Compare each visible button/link label to its accessible name (aria-label). The visible text must be included in the accessible name so voice-control users can reference it.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html',
    lighthouseAuditIds: ['label-content-name-mismatch'],
  },

  {
    id: '2.5.4',
    level: 'A',
    principle: 'Operable',
    guideline: 'Input Modalities',
    title: 'Motion Actuation',
    description: 'Functionality that can be operated by device motion or user motion can also be operated by conventional UI components, and motion actuation can be disabled to prevent accidental triggering, except when essential.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Identify any features triggered by shaking, tilting, or moving the device (shake-to-undo, tilt-to-scroll).' },
      { order: 2, method: 'manual', instruction: 'Verify a conventional UI control offers the same functionality, and that motion actuation can be turned off.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html',
  },

  {
    id: '2.5.7',
    level: 'AA',
    principle: 'Operable',
    guideline: 'Input Modalities',
    title: 'Dragging Movements',
    description: 'All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Identify any drag interactions — reorderable lists, sliders, drag-and-drop uploads.' },
      { order: 2, method: 'manual', instruction: 'Verify a single-pointer alternative exists, such as up/down buttons for reordering or a click-to-select-target flow instead of dragging.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
  },

  {
    id: '2.5.8',
    level: 'AA',
    principle: 'Operable',
    guideline: 'Input Modalities',
    title: 'Target Size (Minimum)',
    description: 'The size of the target for pointer inputs is at least 24 by 24 CSS pixels, except where an equivalent target is available, the target is inline, spacing compensates, or the size is essential.',
    tools: [
      { name: 'Chrome DevTools', free: true },
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Inspect small clickable targets — icon buttons, close icons, checkboxes — using Chrome DevTools to measure their rendered size.' },
      { order: 2, method: 'visual', instruction: 'Verify each target is at least 24x24 CSS pixels, or has enough spacing from adjacent targets that a 24px circle centered on it does not overlap another target.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
    lighthouseAuditIds: ['target-size'],
  },

  // ── UNDERSTANDABLE ────────────────────────────────────────────

  {
    id: '3.1.1',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Readable',
    title: 'Language of Page',
    description: 'The default human language of each web page can be programmatically determined.',
    tools: [
      { name: 'axe DevTools', free: true },
      { name: 'Chrome DevTools', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'View page source or inspect the html element. Verify the lang attribute is present and correct (e.g. lang="en" for English, lang="es" for Spanish).' },
      { order: 2, method: 'automated', instruction: 'Run axe DevTools — it will flag a missing or empty lang attribute on the html element.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html',
    lighthouseAuditIds: ['html-has-lang', 'html-lang-valid', 'valid-lang'],
  },

  {
    id: '3.1.2',
    level: 'AA',
    principle: 'Understandable',
    guideline: 'Readable',
    title: 'Language of Parts',
    description: 'The human language of each passage or phrase in the content can be programmatically determined.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Identify any content in a language different from the page default — foreign language quotes, phrases, or sections.' },
      { order: 2, method: 'manual', instruction: 'Inspect those elements and verify they have a lang attribute matching the language of that content (e.g. lang="fr" for French text on an English page).' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html',
  },

  {
    id: '3.2.1',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Predictable',
    title: 'On Focus',
    description: 'Receiving focus does not initiate a change of context.',
    tools: [
      { name: 'Keyboard', free: true },
    ],
    howToTest: [
      { order: 1, method: 'keyboard', instruction: 'Tab through every interactive element. Verify that simply receiving focus does not trigger a page change, form submission, new window, or significant layout change.' },
      { order: 2, method: 'keyboard', instruction: 'Pay special attention to select menus and radio buttons — focusing them should not automatically change the selection or navigate away.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html',
  },

  {
    id: '3.2.2',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Predictable',
    title: 'On Input',
    description: 'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of this behavior beforehand.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Interact with form controls — select menus, checkboxes, radio buttons. Verify that changing a value does not automatically submit the form or navigate to a new page without warning.' },
      { order: 2, method: 'visual', instruction: 'If any control triggers an automatic action on change, verify the user is informed of this behavior before encountering the control.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/on-input.html',
  },

  {
    id: '3.2.3',
    level: 'AA',
    principle: 'Understandable',
    guideline: 'Predictable',
    title: 'Consistent Navigation',
    description: 'Navigational mechanisms that are repeated on multiple pages appear in the same relative order each time they are repeated.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Navigate to at least three different pages on the site. Verify that the navigation menu, search bar, and other repeated elements appear in the same order and position on each page.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html',
  },

  {
    id: '3.2.4',
    level: 'AA',
    principle: 'Understandable',
    guideline: 'Predictable',
    title: 'Consistent Identification',
    description: 'Components that have the same functionality are identified consistently.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'visual', instruction: 'Identify repeated functional elements across pages — search buttons, close icons, submit buttons. Verify they use consistent labels, icons, and names across the site.' },
      { order: 2, method: 'manual', instruction: 'A search icon should always be labeled "Search", a close button always "Close" — not "Search" on one page and "Find" on another.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html',
  },

  {
    id: '3.2.6',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Predictable',
    title: 'Consistent Help',
    description: 'If a web page contains help mechanisms — such as a contact link, chat option, or human-authored help text — they occur in the same relative order across pages.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Identify help mechanisms on the site — contact info, live chat, FAQ links, help menus.' },
      { order: 2, method: 'manual', instruction: 'Visit at least three pages that repeat the help mechanism and verify it appears in the same relative order among other repeated content each time.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html',
  },

  {
    id: '3.3.1',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Input Assistance',
    title: 'Error Identification',
    description: 'If an input error is automatically detected, the item in error is identified and the error is described to the user in text.',
    tools: [
      { name: 'Manual Review', free: true },
      { name: 'Screen Reader', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Submit a form with intentional errors — blank required fields, invalid email format. Verify each error is identified in text describing what went wrong.' },
      { order: 2, method: 'screen_reader', instruction: 'With a screen reader active, submit the form with errors. Verify the errors are announced — either via focus moving to the error or via an aria-live region.' },
      { order: 3, method: 'visual', instruction: 'Verify errors are not conveyed by color alone — a red border without text is insufficient.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html',
  },

  {
    id: '3.3.2',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Input Assistance',
    title: 'Labels or Instructions',
    description: 'Labels or instructions are provided when content requires user input.',
    tools: [
      { name: 'axe DevTools', free: true },
      { name: 'Screen Reader', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools and check for form fields without labels.' },
      { order: 2, method: 'visual', instruction: 'Verify every form field has a visible label. Placeholder text alone is not a label — it disappears when the user types.' },
      { order: 3, method: 'manual', instruction: 'For fields with format requirements (phone number, date), verify instructions are provided before the field, not only after submission.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html',
   lighthouseAuditIds: ['label', 'label-content-name-mismatch', 'form-field-multiple-labels'],
  },

  {
    id: '3.3.3',
    level: 'AA',
    principle: 'Understandable',
    guideline: 'Input Assistance',
    title: 'Error Suggestion',
    description: 'If an input error is automatically detected and suggestions for correction are known, the suggestion is provided to the user.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Submit a form with an invalid email address. Verify the error message suggests a correction (e.g. "Enter a valid email address like name@example.com") not just "Invalid input".' },
      { order: 2, method: 'manual', instruction: 'Test password fields — if the password does not meet requirements, verify the error explains what is required.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html',
  },

  {
    id: '3.3.4',
    level: 'AA',
    principle: 'Understandable',
    guideline: 'Input Assistance',
    title: 'Error Prevention (Legal, Financial, Data)',
    description: 'For submissions that cause legal commitments or financial transactions, the user can review, correct, and confirm the information.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Identify any forms that result in financial transactions, legal commitments, or data deletion (purchases, account deletion, form submissions).' },
      { order: 2, method: 'manual', instruction: 'Verify at least one of: a review/confirmation step before final submission, the ability to correct information after submission, or a reversal mechanism (cancel, undo).' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html',
  },

  {
    id: '3.3.7',
    level: 'A',
    principle: 'Understandable',
    guideline: 'Input Assistance',
    title: 'Redundant Entry',
    description: 'Information previously entered by the user that is required again in the same process is either auto-populated or available for the user to select, except when re-entry is essential.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Go through any multi-step process — checkout, signup, application form — that asks for the same information more than once (e.g. shipping and billing address).' },
      { order: 2, method: 'manual', instruction: 'Verify previously entered information is auto-filled or offered as a selectable option ("Same as shipping address") rather than requiring the user to retype it.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html',
  },

  {
    id: '3.3.8',
    level: 'AA',
    principle: 'Understandable',
    guideline: 'Input Assistance',
    title: 'Accessible Authentication (Minimum)',
    description: 'A cognitive function test (such as remembering a password or solving a puzzle) is not required for authentication, unless an alternative method, a mechanism to assist the user, or a means to recognize the content is also available.',
    tools: [
      { name: 'Manual Review', free: true },
    ],
    howToTest: [
      { order: 1, method: 'manual', instruction: 'Review the login/sign-up flow for tests that rely purely on memory or transcription, such as typing a password with no paste/password-manager support, or a text-based CAPTCHA.' },
      { order: 2, method: 'manual', instruction: 'Verify at least one alternative is available: allowing paste and password managers, offering passkeys/SSO/email links, or using an object-recognition CAPTCHA instead of a cognitive puzzle.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html',
  },

  // ── ROBUST ────────────────────────────────────────────────────
  // Note: 4.1.1 Parsing was removed in WCAG 2.2 (obsolete due to modern
  // browser/parser behavior) and is intentionally omitted here.

  {
    id: '4.1.2',
    level: 'A',
    principle: 'Robust',
    guideline: 'Compatible',
    title: 'Name, Role, Value',
    description: 'For all user interface components, the name, role, and value can be programmatically determined; states, properties, and values can be set by the user; and notification of changes is available to assistive technology.',
    tools: [
      { name: 'axe DevTools', free: true },
      { name: 'Screen Reader', free: true },
      { name: 'Chrome DevTools Accessibility Panel', free: true },
    ],
    howToTest: [
      { order: 1, method: 'automated', instruction: 'Run axe DevTools and review all ARIA violations — incorrect roles, missing required properties, invalid attribute values.' },
      { order: 2, method: 'screen_reader', instruction: 'Navigate through all interactive elements with a screen reader. Each element should be announced with its name (label), role (button, link, checkbox), and state (checked, expanded, disabled).' },
      { order: 3, method: 'manual', instruction: 'Open Chrome DevTools and inspect the Accessibility panel for custom interactive components. Verify they have appropriate roles, accessible names, and states reflected in the accessibility tree.' },
      { order: 4, method: 'screen_reader', instruction: 'Interact with dynamic content — expanding accordions, toggling checkboxes, opening modals. Verify state changes are announced by the screen reader.' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html',
    lighthouseAuditIds: [
  'aria-allowed-attr',
  'aria-required-attr',
  'aria-valid-attr',
  'aria-valid-attr-value',
  'aria-hidden-body',
  'aria-hidden-focus',
  'aria-input-field-name',
  'aria-meter-name',
  'aria-progressbar-name',
  'aria-required-children',
  'aria-required-parent',
  'aria-roles',
  'aria-toggle-field-name',
  'aria-tooltip-name',
  'aria-treeitem-name',
  'button-name',
  'input-button-name',
  'select-name',
],
  },

  {
    id: '4.1.3',
    level: 'AA',
    principle: 'Robust',
    guideline: 'Compatible',
    title: 'Status Messages',
    description: 'Status messages can be programmatically determined through role or property so they can be presented to the user by assistive technology without receiving focus.',
    tools: [
      { name: 'Screen Reader', free: true },
      { name: 'axe DevTools', free: true },
    ],
    howToTest: [
      { order: 1, method: 'screen_reader', instruction: 'With a screen reader active, trigger status messages — form submission success, error messages, search results count, items added to cart. Verify they are announced without focus moving to the message.' },
      { order: 2, method: 'manual', instruction: 'Inspect status message elements in Chrome DevTools. Verify they use role="status" (polite), role="alert" (assertive), or aria-live="polite"/"assertive" as appropriate.' },
      { order: 3, method: 'manual', instruction: 'Success messages and non-urgent updates should use role="status" or aria-live="polite". Errors requiring immediate attention should use role="alert" or aria-live="assertive".' },
    ],
    wcagUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',
  },
];

// Helper to get criteria by principle
export const getCriteriaByPrinciple = (principle: Criterion['principle']) =>
  wcagCriteria.filter((c) => c.principle === principle);

// Helper to get criteria by level
export const getCriteriaByLevel = (level: 'A' | 'AA') =>
  wcagCriteria.filter((c) => c.level === level);

// Helper to get a single criterion by ID
export const getCriterionById = (id: string) =>
  wcagCriteria.find((c) => c.id === id);

// All unique Lighthouse audit IDs mapped to criterion IDs
export const lighthouseAuditMap = wcagCriteria.reduce<Record<string, string[]>>(
  (acc, criterion) => {
    criterion.lighthouseAuditIds?.forEach((auditId) => {
      if (!acc[auditId]) acc[auditId] = [];
      acc[auditId].push(criterion.id);
    });
    return acc;
  },
  {}
);